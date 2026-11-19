import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Submit client intake or companion application to Supabase.
 * Falls back to local simulated response if Supabase credentials are not set yet.
 */
export const submitApplication = async (formType, data) => {
  const fields = data?.fields || data;

  if (isSupabaseConfigured && supabase) {
    if (formType === 'client_intake' || formType === 'client') {
      // Backend validation: trim whitespace and enforce 500-character limit
      const rawAdditionalInfo = typeof fields.additionalInfo === 'string' ? fields.additionalInfo.trim() : '';
      if (rawAdditionalInfo.length > 500) {
        throw new Error('Additional information exceeds the maximum permitted length of 500 characters.');
      }

      const payload = {
        who_is_this_for: fields.whoIsThisFor ? String(fields.whoIsThisFor).trim() : null,
        first_name: fields.firstName ? String(fields.firstName).trim() : '',
        last_name: fields.lastName ? String(fields.lastName).trim() : '',
        email: fields.email ? String(fields.email).trim() : '',
        phone: fields.phone ? String(fields.phone).trim() : '',
        dob: fields.dob || null,
        pronouns: fields.pronouns ? String(fields.pronouns).trim() : null,
        postcode: fields.postcode ? String(fields.postcode).trim() : '',
        emergency_contact_name: fields.emergencyContactName ? String(fields.emergencyContactName).trim() : '',
        emergency_contact_number: fields.emergencyContactNumber ? String(fields.emergencyContactNumber).trim() : '',
        contact_method: fields.contactMethod || null,
        best_time: fields.bestTime || null,
        interests: Array.isArray(fields.interests) ? fields.interests : [],
        interests_other: fields.interestsOther ? String(fields.interestsOther).trim() : null,
        visit_frequency: fields.visitFrequency || null,
        visit_length: fields.visitLength || null,
        meet_location: fields.meetLocation || null,
        additional_info: rawAdditionalInfo || null,
        ideal_visit: fields.idealVisit ? String(fields.idealVisit).trim() : null,
        accessibility_needs: fields.accessibilityNeeds ? String(fields.accessibilityNeeds).trim() : null,
        allergies: fields.allergies ? String(fields.allergies).trim() : null,
        confirm_service: Boolean(fields.confirmService)
      };

      const { error } = await supabase
        .from('client_requests')
        .insert([payload]);

      if (error) {
        console.error('Supabase error inserting client request');
        throw error;
      }

      return { success: true };
    }

    if (formType === 'companion_application' || formType === 'companion') {
      const payload = {
        full_name: fields.fullName ? String(fields.fullName).trim() : '',
        dob: fields.dob || null,
        ni_number: fields.niNumber ? String(fields.niNumber).trim() : '',
        address: fields.address ? String(fields.address).trim() : '',
        phone: fields.phone ? String(fields.phone).trim() : '',
        email: fields.email ? String(fields.email).trim() : '',
        transport: fields.transport || null,
        motivation: fields.motivation ? String(fields.motivation).trim() : null,
        experience: fields.experience ? String(fields.experience).trim() : null,
        impact_example: fields.impactExample ? String(fields.impactExample).trim() : null,
        languages: fields.languages ? String(fields.languages).trim() : null,
        interests: Array.isArray(fields.interests) ? fields.interests : [],
        interests_other: fields.interestsOther ? String(fields.interestsOther).trim() : null,
        availability: Array.isArray(fields.availability) ? fields.availability : [],
        dbs_consent: fields.dbsConsent || null,
        referee_consent: fields.refereeConsent || null,
        criminal_conviction: fields.criminalConviction || null,
        conviction_details: fields.convictionDetails ? String(fields.convictionDetails).trim() : null,
        dbs_update_service: fields.dbsUpdateService || null,
        confirm_true: Boolean(fields.confirmTrue),
        confirm_self_employed: Boolean(fields.confirmSelfEmployed)
      };

      const { error } = await supabase
        .from('companion_applications')
        .insert([payload]);

      if (error) {
        console.error('Supabase error inserting companion application');
        throw error;
      }

      return { success: true };
    }
  }

  // Fallback simulator for offline/pre-credentials development
  // Privacy note: personal details are not logged to browser console
  const rawAdditionalInfo = typeof fields.additionalInfo === 'string' ? fields.additionalInfo.trim() : '';
  if ((formType === 'client_intake' || formType === 'client') && rawAdditionalInfo.length > 500) {
    throw new Error('Additional information exceeds the maximum permitted length of 500 characters.');
  }

  console.log(`[Submission] Submitting ${formType} request...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Submission] ${formType} processed successfully.`);
      resolve({ success: true, message: 'Application submitted successfully.' });
    }, 1200);
  });
};

/**
 * Submit contact page inquiries to Supabase
 */
export const submitContactInquiry = async ({ fullName, email, interest, message }) => {
  const sanitizedName = (fullName || '').trim();
  const sanitizedEmail = (email || '').trim();
  const sanitizedInterest = (interest || '').trim();
  const sanitizedMessage = (message || '').trim();

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ 
        full_name: sanitizedName, 
        email: sanitizedEmail, 
        interest: sanitizedInterest, 
        message: sanitizedMessage 
      }]);

    if (error) {
      console.error('Supabase error sending contact message');
      throw error;
    }

    return { success: true };
  }

  // Privacy note: personal details omitted from console log
  console.log('[Submission] Contact message submitted.');
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};
