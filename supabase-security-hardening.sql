-- ==============================================================================
-- UNLONELY — SUPABASE RLS SECURITY HARDENING SCRIPT
-- ==============================================================================
-- Purpose:
-- 1. Remove broad SELECT and UPDATE policies on authenticated role (which allowed any
--    authenticated user to view all submitted data).
-- 2. Preserve write-only (INSERT) access for website visitors (anon & authenticated).
-- 3. Hardens table-level GRANTs (Defense-in-depth) by revoking SELECT, UPDATE, DELETE.
-- 4. Preserves authorised staff access in the Supabase Cloud Dashboard (runs as postgres/service_role).
-- ==============================================================================

-- STEP 1: ENSURE ROW LEVEL SECURITY IS ACTIVE
ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companion_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- STEP 2: REMOVE PERMISSIVE AUTHENTICATED SELECT & UPDATE POLICIES
DROP POLICY IF EXISTS "Authenticated admins can view client requests" ON public.client_requests;
DROP POLICY IF EXISTS "Authenticated admins can update client requests" ON public.client_requests;

DROP POLICY IF EXISTS "Authenticated admins can view companion applications" ON public.companion_applications;
DROP POLICY IF EXISTS "Authenticated admins can update companion applications" ON public.companion_applications;

DROP POLICY IF EXISTS "Authenticated admins can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated admins can update contact messages" ON public.contact_messages;

-- STEP 3: ENSURE INSERT POLICIES ARE PROPERLY CONFIGURED (IDEMPOTENT)
DROP POLICY IF EXISTS "Public can submit client intake" ON public.client_requests;
CREATE POLICY "Public can submit client intake"
    ON public.client_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit companion application" ON public.companion_applications;
CREATE POLICY "Public can submit companion application"
    ON public.companion_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contact_messages;
CREATE POLICY "Public can submit contact messages"
    ON public.contact_messages
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- STEP 4: HARDEN TABLE-LEVEL PERMISSIONS (DEFENSE-IN-DEPTH)
-- Grant ONLY INSERT to anon and authenticated roles
GRANT INSERT ON public.client_requests TO anon, authenticated;
GRANT INSERT ON public.companion_applications TO anon, authenticated;
GRANT INSERT ON public.contact_messages TO anon, authenticated;

-- Explicitly revoke SELECT, UPDATE, DELETE from anon and authenticated roles
REVOKE SELECT, UPDATE, DELETE ON public.client_requests FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.companion_applications FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.contact_messages FROM anon, authenticated;
