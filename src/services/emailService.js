/**
 * Client-side email triggering service.
 * Sends an asynchronous POST to the Hostinger PHP mailer endpoint at /api/send-email.php.
 *
 * Guarantees:
 * 1. Non-blocking & fire-and-forget: email failures never interrupt a form submission.
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
    // POST to the Hostinger PHP endpoint — credentials remain server-side only
    const response = await fetch('/api/send-email.php', {
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
      console.warn(`[Email Trigger] PHP endpoint responded with status: ${response.status}`);
      return { success: false, status: response.status };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    // Non-blocking — website forms always succeed regardless of email outcome
    console.warn('[Email Trigger] Non-critical background email dispatch warning:', err.message);
    return { success: false, error: err.message };
  }
};
