/**
 * Client-side email triggering service.
 * Sends asynchronous POST request to the serverless Netlify function.
 * 
 * Guarantees:
 * 1. Non-blocking & fire-and-forget: email dispatch failures never interrupt or fail the user's form submission.
 * 2. Deduplication: prevents multiple dispatches on repeated clicks.
 * 3. Never exposes SMTP credentials or sensitive data in client-side code.
 */

// Tracks recently dispatched submissions (email + template) in memory to avoid duplicate sends
const dispatchedSubmissions = new Set();

export const triggerWelcomeEmail = async ({ template, to, firstName }) => {
  if (!to || typeof to !== 'string' || !to.includes('@')) {
    return { success: false, reason: 'missing-or-invalid-email' };
  }

  const cleanEmail = to.trim().toLowerCase();
  const dedupKey = `${template}:${cleanEmail}`;

  if (dispatchedSubmissions.has(dedupKey)) {
    console.info(`[Email Trigger] Duplicate dispatch prevented for: ${dedupKey}`);
    return { success: true, deduplicated: true };
  }

  dispatchedSubmissions.add(dedupKey);

  // Auto-clear deduplication key after 5 minutes so users can retry later if needed
  setTimeout(() => {
    dispatchedSubmissions.delete(dedupKey);
  }, 5 * 60 * 1000);

  try {
    // Fire to the Netlify serverless endpoint
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template,
        to: cleanEmail,
        firstName: (firstName || '').trim()
      })
    });

    if (!response.ok) {
      console.warn(`[Email Trigger] Serverless function responded with status: ${response.status}`);
      return { success: false, status: response.status };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    // Non-blocking catch to ensure website forms never break
    console.warn('[Email Trigger] Non-critical background email dispatch warning:', err.message);
    return { success: false, error: err.message };
  }
};
