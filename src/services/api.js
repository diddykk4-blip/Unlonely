import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Submit client intake or companion application to Supabase.
 * Falls back to local simulated response if Supabase credentials are not set yet.
 */
export const submitApplication = async (formType, data) => {
  const fields = data?.fields || data;

  if (isSupabaseConfigured && supabase) {
    if (formType === 'client_intake' || formType === 'client') {
      const payload = {
        who_is_this_for: fields.whoIsThisFor || null,
        first_name: fields.firstName || '',
        last_name: fields.lastName || '',
        email: fields.email || '',
        phone: fields.phone || '',
        dob: fields.dob || null,
        pronouns: fields.pronouns || null,
        postcode: fields.postcode || '',
        emergency_contact_name: fields.emergencyContactName || '',
        emergency_contact_number: fields.emergencyContactNumber || '',
        contact_method: fields.contactMethod || null,
        best_time: fields.bestTime || null,
        interests: fields.interests || [],
        interests_other: fields.interestsOther || null,
        visit_frequency: fields.visitFrequency || null,
        visit_length: fields.visitLength || null,
        meet_location: fields.meetLocation || null,
        additional_info: fields.additionalInfo || null,
        ideal_visit: fields.idealVisit || null,
        accessibility_needs: fields.accessibilityNeeds || null,
        allergies: fields.allergies || null,
        confirm_service: Boolean(fields.confirmService)
      };

      const { error } = await supabase
        .from('client_requests')
        .insert([payload]);

      if (error) {
        console.error('Supabase error inserting client request:', error);
        throw error;
      }

      return { success: true };
    }

    if (formType === 'companion_application' || formType === 'companion') {
      const payload = {
        full_name: fields.fullName || '',
        dob: fields.dob || null,
        ni_number: fields.niNumber || '',
        address: fields.address || '',
        phone: fields.phone || '',
        email: fields.email || '',
        transport: fields.transport || null,
        motivation: fields.motivation || null,
        experience: fields.experience || null,
        impact_example: fields.impactExample || null,
        languages: fields.languages || null,
        interests: fields.interests || [],
        interests_other: fields.interestsOther || null,
        availability: fields.availability || [],
        dbs_consent: fields.dbsConsent || null,
        referee_consent: fields.refereeConsent || null,
        criminal_conviction: fields.criminalConviction || null,
        conviction_details: fields.convictionDetails || null,
        dbs_update_service: fields.dbsUpdateService || null,
        confirm_true: Boolean(fields.confirmTrue),
        confirm_self_employed: Boolean(fields.confirmSelfEmployed)
      };

      const { error } = await supabase
        .from('companion_applications')
        .insert([payload]);

      if (error) {
        console.error('Supabase error inserting companion application:', error);
        throw error;
      }

      return { success: true };
    }
  }

  // Fallback simulator for offline/pre-credentials development
  console.log(`[Dev Simulation] Submitting ${formType} application...`, fields);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Dev Simulation] Successfully submitted ${formType} application!`);
      resolve({ success: true, message: 'Application submitted successfully (mock).' });
    }, 1200);
  });
};

/**
 * Submit contact page inquiries to Supabase
 */
export const submitContactInquiry = async ({ fullName, email, interest, message }) => {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ full_name: fullName, email, interest, message }]);

    if (error) {
      console.error('Supabase error sending contact message:', error);
      throw error;
    }

    return { success: true };
  }

  console.log('[Dev Simulation] Contact message submitted:', { fullName, email, interest, message });
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};
