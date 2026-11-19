-- ==============================================================================
-- UNLONELY — STAGE 5: DATA RETENTION, DELETION & SUBJECT ACCESS (SAR) SUITE
-- ==============================================================================
-- Purpose:
-- 1. Schema lifecycle extensions: Add status tracking timestamps, legal_hold,
--    and is_disputed flags to protect active records and support data subject rights.
-- 2. Sensitive vetting redaction: Auto-scrub criminal conviction details when a
--    companion candidate is rejected, or when an approved companion passes vetting.
-- 3. Automated lifecycle maintenance: Scheduled retention routines with strict
--    guardrails (never touches active, disputed, or legally held records).
-- 4. Secure admin functions: Atomic, safeguarded SAR JSON export and right-to-erasure
--    execution with built-in dry-run safety simulation.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STEP 1: SCHEMA MIGRATIONS (LIFECYCLE TIMESTAMPS & PROTECTION FLAGS)
-- ------------------------------------------------------------------------------

-- Client Requests (Enquiries & Client Intake)
ALTER TABLE public.client_requests
    ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    ADD COLUMN IF NOT EXISTS last_contact_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS legal_hold BOOLEAN DEFAULT FALSE NOT NULL,
    ADD COLUMN IF NOT EXISTS is_disputed BOOLEAN DEFAULT FALSE NOT NULL;

-- Companion Applications (Prospective & Active Companions)
ALTER TABLE public.companion_applications
    ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    ADD COLUMN IF NOT EXISTS decision_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS vetting_completed_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS dbs_cert_number TEXT,
    ADD COLUMN IF NOT EXISTS dbs_check_type TEXT,
    ADD COLUMN IF NOT EXISTS legal_hold BOOLEAN DEFAULT FALSE NOT NULL,
    ADD COLUMN IF NOT EXISTS is_disputed BOOLEAN DEFAULT FALSE NOT NULL;

-- Contact Messages (General Inquiries)
ALTER TABLE public.contact_messages
    ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS legal_hold BOOLEAN DEFAULT FALSE NOT NULL,
    ADD COLUMN IF NOT EXISTS is_disputed BOOLEAN DEFAULT FALSE NOT NULL;

-- ------------------------------------------------------------------------------
-- STEP 2: STATUS CHANGE TRACKING & VETTING REDACTION TRIGGERS
-- ------------------------------------------------------------------------------

-- Trigger function: Update status_updated_at and timestamps when status changes
CREATE OR REPLACE FUNCTION public.fn_track_status_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF (OLD.status IS DISTINCT FROM NEW.status) THEN
        NEW.status_updated_at := NOW();

        -- Specific timestamp tracking for companion applications
        IF TG_TABLE_NAME = 'companion_applications' THEN
            IF NEW.status IN ('approved', 'rejected') AND OLD.status NOT IN ('approved', 'rejected') THEN
                NEW.decision_at := NOW();
            END IF;

            -- Data Minimisation / Article 10 UK GDPR Redaction:
            -- If rejected, purge self-declared criminal conviction narrative immediately
            IF NEW.status = 'rejected' THEN
                NEW.conviction_details := '[REDACTED_UPON_REJECTION]';
            END IF;

            -- If approved and formal vetting recorded, purge raw narrative
            IF NEW.status = 'approved' AND NEW.vetting_completed_at IS NOT NULL THEN
                NEW.conviction_details := '[PURGED_POST_DBS_VERIFICATION]';
            END IF;
        END IF;

        -- Specific timestamp tracking for contact messages
        IF TG_TABLE_NAME = 'contact_messages' THEN
            IF NEW.status = 'responded' AND OLD.status <> 'responded' THEN
                NEW.resolved_at := NOW();
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_track_client_requests_status ON public.client_requests;
CREATE TRIGGER trg_track_client_requests_status
    BEFORE UPDATE ON public.client_requests
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_track_status_changes();

DROP TRIGGER IF EXISTS trg_track_companion_applications_status ON public.companion_applications;
CREATE TRIGGER trg_track_companion_applications_status
    BEFORE UPDATE ON public.companion_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_track_status_changes();

DROP TRIGGER IF EXISTS trg_track_contact_messages_status ON public.contact_messages;
CREATE TRIGGER trg_track_contact_messages_status
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_track_status_changes();

-- ------------------------------------------------------------------------------
-- STEP 3: SAFEGUARDED DATA RETENTION CLEANUP PROCEDURE
-- ------------------------------------------------------------------------------
-- Retention Schedule Enforced:
-- • Unsuccessful client enquiries (archived/new with no response): 12 months after last contact / creation
-- • Unsuccessful companion applications (rejected): 12 months after decision_at
-- • Resolved contact messages (responded): 12 months after resolved_at
-- • Exclusions: ACTIVE clients ('matched'), ACTIVE companions ('approved'), or records with legal_hold/is_disputed = TRUE
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.run_scheduled_retention_purge(p_dry_run BOOLEAN DEFAULT TRUE)
RETURNS TABLE (
    category TEXT,
    purged_count INTEGER,
    execution_mode TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clients_count INT;
    v_apps_count INT;
    v_contacts_count INT;
BEGIN
    -- 1. Identify Unsuccessful / Inactive Client Enquiries (> 12 months)
    IF p_dry_run THEN
        SELECT COUNT(*) INTO v_clients_count
        FROM public.client_requests
        WHERE status IN ('new', 'archived')
          AND status <> 'matched'
          AND legal_hold = FALSE
          AND is_disputed = FALSE
          AND COALESCE(last_contact_at, created_at) < NOW() - INTERVAL '12 months';

        SELECT COUNT(*) INTO v_apps_count
        FROM public.companion_applications
        WHERE status = 'rejected'
          AND legal_hold = FALSE
          AND is_disputed = FALSE
          AND COALESCE(decision_at, created_at) < NOW() - INTERVAL '12 months';

        SELECT COUNT(*) INTO v_contacts_count
        FROM public.contact_messages
        WHERE status = 'responded'
          AND legal_hold = FALSE
          AND is_disputed = FALSE
          AND COALESCE(resolved_at, created_at) < NOW() - INTERVAL '12 months';

        RETURN QUERY SELECT 'client_requests (inactive > 12m)'::TEXT, v_clients_count, 'DRY_RUN_PREVIEW'::TEXT;
        RETURN QUERY SELECT 'companion_applications (rejected > 12m)'::TEXT, v_apps_count, 'DRY_RUN_PREVIEW'::TEXT;
        RETURN QUERY SELECT 'contact_messages (resolved > 12m)'::TEXT, v_contacts_count, 'DRY_RUN_PREVIEW'::TEXT;
    ELSE
        WITH del_c AS (
            DELETE FROM public.client_requests
            WHERE status IN ('new', 'archived')
              AND status <> 'matched'
              AND legal_hold = FALSE
              AND is_disputed = FALSE
              AND COALESCE(last_contact_at, created_at) < NOW() - INTERVAL '12 months'
            RETURNING id
        )
        SELECT COUNT(*) INTO v_clients_count FROM del_c;

        WITH del_a AS (
            DELETE FROM public.companion_applications
            WHERE status = 'rejected'
              AND legal_hold = FALSE
              AND is_disputed = FALSE
              AND COALESCE(decision_at, created_at) < NOW() - INTERVAL '12 months'
            RETURNING id
        )
        SELECT COUNT(*) INTO v_apps_count FROM del_a;

        WITH del_m AS (
            DELETE FROM public.contact_messages
            WHERE status = 'responded'
              AND legal_hold = FALSE
              AND is_disputed = FALSE
              AND COALESCE(resolved_at, created_at) < NOW() - INTERVAL '12 months'
            RETURNING id
        )
        SELECT COUNT(*) INTO v_contacts_count FROM del_m;

        RETURN QUERY SELECT 'client_requests (inactive > 12m)'::TEXT, v_clients_count, 'PURGED_PERMANENTLY'::TEXT;
        RETURN QUERY SELECT 'companion_applications (rejected > 12m)'::TEXT, v_apps_count, 'PURGED_PERMANENTLY'::TEXT;
        RETURN QUERY SELECT 'contact_messages (resolved > 12m)'::TEXT, v_contacts_count, 'PURGED_PERMANENTLY'::TEXT;
    END IF;
END;
$$;

-- ------------------------------------------------------------------------------
-- STEP 4: SUBJECT ACCESS REQUEST (SAR) DOSSIER EXPORT FUNCTION (ARTICLE 15)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.export_data_subject_sar(p_email TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clean_email TEXT;
    v_dossier JSONB;
BEGIN
    v_clean_email := lower(trim(p_email));

    SELECT json_build_object(
        'request_metadata', json_build_object(
            'generated_at', NOW(),
            'query_email', v_clean_email,
            'controller', 'Unlonely Ltd',
            'legal_framework', 'UK GDPR / Data Protection Act 2018'
        ),
        'client_requests', (
            SELECT COALESCE(json_agg(
                json_build_object(
                    'id', r.id,
                    'created_at', r.created_at,
                    'status', r.status,
                    'who_is_this_for', r.who_is_this_for,
                    'first_name', r.first_name,
                    'last_name', r.last_name,
                    'email', r.email,
                    'phone', r.phone,
                    'dob', r.dob,
                    'pronouns', r.pronouns,
                    'postcode', r.postcode,
                    'emergency_contact_name', r.emergency_contact_name,
                    'emergency_contact_number', r.emergency_contact_number,
                    'contact_method', r.contact_method,
                    'best_time', r.best_time,
                    'interests', r.interests,
                    'interests_other', r.interests_other,
                    'visit_frequency', r.visit_frequency,
                    'visit_length', r.visit_length,
                    'meet_location', r.meet_location,
                    'accessibility_needs', r.accessibility_needs,
                    'allergies_or_considerations', r.allergies
                )
            ), '[]'::json)
            FROM public.client_requests r
            WHERE lower(r.email) = v_clean_email
        ),
        'companion_applications', (
            SELECT COALESCE(json_agg(
                json_build_object(
                    'id', a.id,
                    'created_at', a.created_at,
                    'status', a.status,
                    'full_name', a.full_name,
                    'dob', a.dob,
                    'address', a.address,
                    'phone', a.phone,
                    'email', a.email,
                    'transport', a.transport,
                    'languages', a.languages,
                    'interests', a.interests,
                    'availability', a.availability,
                    'dbs_update_service', a.dbs_update_service,
                    'dbs_check_type', a.dbs_check_type,
                    'vetting_completed_at', a.vetting_completed_at
                    -- Note: raw criminal conviction details are excluded or redacted per data protection safeguards
                )
            ), '[]'::json)
            FROM public.companion_applications a
            WHERE lower(a.email) = v_clean_email
        ),
        'contact_messages', (
            SELECT COALESCE(json_agg(
                json_build_object(
                    'id', m.id,
                    'created_at', m.created_at,
                    'status', m.status,
                    'full_name', m.full_name,
                    'email', m.email,
                    'interest', m.interest,
                    'message', m.message
                )
            ), '[]'::json)
            FROM public.contact_messages m
            WHERE lower(m.email) = v_clean_email
        )
    ) INTO v_dossier;

    RETURN v_dossier;
END;
$$;

-- ------------------------------------------------------------------------------
-- STEP 5: SAFEGUARDED RIGHT TO ERASURE PROCEDURE (ARTICLE 17)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.execute_data_subject_erasure(
    p_email TEXT,
    p_dry_run BOOLEAN DEFAULT TRUE
)
RETURNS TABLE (
    table_name TEXT,
    records_impacted INTEGER,
    action_status TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clean_email TEXT;
    v_active_clients INT;
    v_active_companions INT;
    v_legal_holds INT;
    v_cr_count INT;
    v_ca_count INT;
    v_cm_count INT;
BEGIN
    v_clean_email := lower(trim(p_email));

    -- Safety Check 1: Check for Legal Holds or Disputed Status
    SELECT COUNT(*) INTO v_legal_holds FROM (
        SELECT id FROM public.client_requests WHERE lower(email) = v_clean_email AND (legal_hold = TRUE OR is_disputed = TRUE)
        UNION ALL
        SELECT id FROM public.companion_applications WHERE lower(email) = v_clean_email AND (legal_hold = TRUE OR is_disputed = TRUE)
        UNION ALL
        SELECT id FROM public.contact_messages WHERE lower(email) = v_clean_email AND (legal_hold = TRUE OR is_disputed = TRUE)
    ) h;

    IF v_legal_holds > 0 THEN
        RAISE EXCEPTION 'ERASURE_BLOCKED: Data subject % has % record(s) subject to active legal hold or formal dispute.', v_clean_email, v_legal_holds;
    END IF;

    -- Safety Check 2: Check for Active Engagements (Safeguarding & Contractual Protection)
    SELECT COUNT(*) INTO v_active_clients FROM public.client_requests WHERE lower(email) = v_clean_email AND status = 'matched';
    SELECT COUNT(*) INTO v_active_companions FROM public.companion_applications WHERE lower(email) = v_clean_email AND status = 'approved';

    IF (v_active_clients > 0 OR v_active_companions > 0) THEN
        RAISE EXCEPTION 'ERASURE_BLOCKED: Data subject % is actively engaged in ongoing companionship (Active Clients: %, Active Companions: %). Relationship must be terminated before records can be erased.', v_clean_email, v_active_clients, v_active_companions;
    END IF;

    -- Execute or Dry Run Preview
    IF p_dry_run THEN
        SELECT COUNT(*) INTO v_cr_count FROM public.client_requests WHERE lower(email) = v_clean_email;
        SELECT COUNT(*) INTO v_ca_count FROM public.companion_applications WHERE lower(email) = v_clean_email;
        SELECT COUNT(*) INTO v_cm_count FROM public.contact_messages WHERE lower(email) = v_clean_email;

        RETURN QUERY SELECT 'client_requests'::TEXT, v_cr_count, 'WOULD_ERASE (DRY RUN)'::TEXT;
        RETURN QUERY SELECT 'companion_applications'::TEXT, v_ca_count, 'WOULD_ERASE (DRY RUN)'::TEXT;
        RETURN QUERY SELECT 'contact_messages'::TEXT, v_cm_count, 'WOULD_ERASE (DRY RUN)'::TEXT;
    ELSE
        WITH del_r AS (DELETE FROM public.client_requests WHERE lower(email) = v_clean_email RETURNING id)
        SELECT COUNT(*) INTO v_cr_count FROM del_r;

        WITH del_a AS (DELETE FROM public.companion_applications WHERE lower(email) = v_clean_email RETURNING id)
        SELECT COUNT(*) INTO v_ca_count FROM del_a;

        WITH del_m AS (DELETE FROM public.contact_messages WHERE lower(email) = v_clean_email RETURNING id)
        SELECT COUNT(*) INTO v_cm_count FROM del_m;

        RETURN QUERY SELECT 'client_requests'::TEXT, v_cr_count, 'PERMANENTLY_ERASED'::TEXT;
        RETURN QUERY SELECT 'companion_applications'::TEXT, v_ca_count, 'PERMANENTLY_ERASED'::TEXT;
        RETURN QUERY SELECT 'contact_messages'::TEXT, v_cm_count, 'PERMANENTLY_ERASED'::TEXT;
    END IF;
END;
$$;

-- ------------------------------------------------------------------------------
-- STEP 6: REVOKE PUBLIC PERMISSIONS ON ADMIN FUNCTIONS
-- ------------------------------------------------------------------------------
-- Ensure functions can ONLY be executed by authorized database superusers/service_role
REVOKE EXECUTE ON FUNCTION public.run_scheduled_retention_purge(BOOLEAN) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.export_data_subject_sar(TEXT) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.execute_data_subject_erasure(TEXT, BOOLEAN) FROM public, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.run_scheduled_retention_purge(BOOLEAN) TO service_role;
GRANT EXECUTE ON FUNCTION public.export_data_subject_sar(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION public.execute_data_subject_erasure(TEXT, BOOLEAN) TO service_role;
