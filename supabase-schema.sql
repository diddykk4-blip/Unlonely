-- ==============================================================================
-- UNLONELY DATABASE SCHEMA & SECURITY SETUP FOR SUPABASE
-- ==============================================================================

-- 1. CREATE TABLES
CREATE TABLE IF NOT EXISTS public.client_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'matched', 'archived')),
    who_is_this_for TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    dob DATE,
    pronouns TEXT,
    postcode TEXT NOT NULL,
    emergency_contact_name TEXT NOT NULL,
    emergency_contact_number TEXT NOT NULL,
    contact_method TEXT,
    best_time TEXT,
    interests JSONB DEFAULT '[]'::jsonb,
    interests_other TEXT,
    visit_frequency TEXT,
    visit_length TEXT,
    meet_location TEXT,
    additional_info TEXT,
    ideal_visit TEXT,
    accessibility_needs TEXT,
    allergies TEXT,
    confirm_service BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.companion_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'vetting', 'approved', 'rejected')),
    full_name TEXT NOT NULL,
    dob DATE NOT NULL,
    ni_number TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    transport TEXT,
    motivation TEXT,
    experience TEXT,
    impact_example TEXT,
    languages TEXT,
    interests JSONB DEFAULT '[]'::jsonb,
    interests_other TEXT,
    availability JSONB DEFAULT '[]'::jsonb,
    dbs_consent TEXT,
    referee_consent TEXT,
    criminal_conviction TEXT,
    conviction_details TEXT,
    dbs_update_service TEXT,
    confirm_true BOOLEAN DEFAULT FALSE NOT NULL,
    confirm_self_employed BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    interest TEXT,
    message TEXT NOT NULL
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companion_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 3. DROP EXISTING POLICIES (Safe now that tables exist)
DROP POLICY IF EXISTS "Public can submit client intake" ON public.client_requests;
DROP POLICY IF EXISTS "Authenticated admins can view client requests" ON public.client_requests;
DROP POLICY IF EXISTS "Authenticated admins can update client requests" ON public.client_requests;

DROP POLICY IF EXISTS "Public can submit companion application" ON public.companion_applications;
DROP POLICY IF EXISTS "Authenticated admins can view companion applications" ON public.companion_applications;
DROP POLICY IF EXISTS "Authenticated admins can update companion applications" ON public.companion_applications;

DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated admins can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated admins can update contact messages" ON public.contact_messages;

-- 4. PUBLIC INSERTS (Allows website visitors to submit forms)
CREATE POLICY "Public can submit client intake"
    ON public.client_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Public can submit companion application"
    ON public.companion_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Public can submit contact messages"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 5. HARDENED ACCESS CONTROL (DEFENSE-IN-DEPTH)
-- In accordance with UK GDPR security principles and unlonely's operational structure:
-- There is no public user login or customer portal. Submissions are strictly write-only for visitors.
-- Authorised staff view and manage submissions directly via the Supabase Cloud Dashboard (as postgres/service_role).
-- Broad "authenticated" SELECT and UPDATE policies have been removed so no user can view records via REST API.

-- Explicitly grant only INSERT to anon and authenticated
GRANT INSERT ON public.client_requests TO anon, authenticated;
GRANT INSERT ON public.companion_applications TO anon, authenticated;
GRANT INSERT ON public.contact_messages TO anon, authenticated;

-- Explicitly revoke SELECT, UPDATE, DELETE from anon and authenticated
REVOKE SELECT, UPDATE, DELETE ON public.client_requests FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.companion_applications FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.contact_messages FROM anon, authenticated;
