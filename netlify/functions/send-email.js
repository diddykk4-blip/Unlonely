import nodemailer from 'nodemailer';

// Hostinger SMTP Configuration
// Values must be provided via environment variables in Netlify / server environment
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || 'support@unlonely.uk';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'Unlonely <support@unlonely.uk>';
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || 'support@unlonely.uk';

/**
 * Common responsive HTML wrapper adhering strictly to brand identity:
 * - Brand: Unlonely ("Alone No More.")
 * - Primary colour: Navy (#0A0F2C)
 * - Brand accent colour: Orange (#FF6B4A)
 * - Background: White (#FFFFFF)
 * - Supporting background: Light grey (#F5F5F5)
 * - Web-safe fallback stack with Sora and Inter styling
 */
function buildEmailTemplate({ heading, greeting, paragraphs, ctaText = 'Visit Unlonely', ctaUrl = 'https://unlonely.uk' }) {
  const contentHtml = paragraphs
    .map(
      p =>
        `<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${p}</p>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; background-color: #F5F5F5; -webkit-font-smoothing: antialiased; }
    table { border-spacing: 0; border-collapse: collapse; }
    td { padding: 0; }
    img { border: 0; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; border-radius: 0 !important; }
      .email-inner { padding: 24px 20px !important; }
      .header-padding { padding: 28px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F5F5; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(10, 15, 44, 0.06);">
          
          <!-- Navy Brand Header with Subtle Orange Accent -->
          <tr>
            <td class="header-padding" align="center" style="background-color: #0A0F2C; padding: 36px 30px; border-bottom: 3px solid #FF6B4A;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <h1 style="margin: 0; font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.5px;">
                      Unlonely
                    </h1>
                    <p style="margin: 4px 0 0 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500; color: #FF6B4A; letter-spacing: 0.5px;">
                      Alone No More.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="email-inner" style="padding: 36px 36px 28px 36px; background-color: #FFFFFF;">
              
              <!-- Welcome / Confirmation Heading -->
              <h2 style="margin: 0 0 20px 0; font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 600; color: #0A0F2C; line-height: 1.3;">
                ${heading}
              </h2>

              <!-- Personalised Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                ${greeting}
              </p>

              <!-- Paragraphs -->
              ${contentHtml}

              <!-- Subtle Orange Call to Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 24px 0;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #FF6B4A;">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; padding: 12px 28px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; border-radius: 8px;">
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.5; color: #333333; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Warm regards,<br>
                <strong style="color: #0A0F2C;">The Unlonely Team</strong>
              </p>
            </td>
          </tr>

          <!-- Professional Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #F5F5F5; border-top: 1px solid #EAEAEA; text-align: center;">
              <p style="margin: 0 0 4px 0; font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #0A0F2C;">
                Unlonely
              </p>
              <p style="margin: 0 0 10px 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #666666;">
                Alone No More.
              </p>
              <p style="margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #888888;">
                <a href="mailto:support@unlonely.uk" style="color: #0A0F2C; text-decoration: underline; font-weight: 500;">support@unlonely.uk</a>
                &nbsp;&bull;&nbsp;
                <a href="https://unlonely.uk" target="_blank" style="color: #0A0F2C; text-decoration: underline; font-weight: 500;">https://unlonely.uk</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Prepares template-specific content and subject
 */
export function getEmailConfig(template, firstNameRaw) {
  const firstName = (firstNameRaw || '').trim();
  const greeting = firstName ? `Hello ${firstName},` : 'Hello there,';

  switch (template) {
    case 'find-companion':
      return {
        subject: "Welcome to Unlonely – We've Received Your Request",
        html: buildEmailTemplate({
          heading: "We've Received Your Request",
          greeting,
          paragraphs: [
            "Welcome to Unlonely!",
            "Thank you for reaching out to us. We're glad you've taken the first step towards finding meaningful companionship.",
            "At Unlonely, we believe everyone deserves someone to talk to, share moments with and feel connected to. We're here to make that possible.",
            "We've successfully received your request, and our team will review the information you've provided. A member of our team will be in touch with you shortly to discuss the next steps and help you find a suitable companion.",
            "In the meantime, if you have any questions or additional information you'd like to share, please don't hesitate to contact us.",
            "Thank you for choosing Unlonely.",
            "<em>Because nobody should have to feel alone.</em>"
          ]
        })
      };

    case 'become-companion':
      return {
        subject: 'Welcome to Unlonely – Thank You for Your Interest',
        html: buildEmailTemplate({
          heading: 'Thank You for Your Interest',
          greeting,
          paragraphs: [
            'Welcome to Unlonely!',
            "Thank you for your interest in becoming a companion. We're delighted that you're considering joining us in making a meaningful difference in people's lives.",
            'At Unlonely, we believe that a simple conversation, a listening ear or a friendly presence can make a world of difference.',
            "We've successfully received your application, and our team will review the information you've submitted. We'll be in touch shortly to discuss the next steps in the application process.",
            'We appreciate your willingness to be part of something meaningful, and we look forward to learning more about you.',
            'Thank you for choosing to be part of Unlonely.',
            '<em>Together, we can make sure nobody has to feel alone.</em>'
          ]
        })
      };

    case 'contact':
    case 'reach-out':
    default:
      return {
        subject: 'Thank You for Reaching Out to Unlonely',
        html: buildEmailTemplate({
          heading: 'Thank You for Reaching Out',
          greeting,
          paragraphs: [
            'Thank you for getting in touch with Unlonely!',
            "We appreciate you taking the time to contact us. Whether you have a question, need more information about our services or simply want to learn more about what we do, we're always happy to hear from you.",
            'Your message has been successfully received, and a member of our team will review your enquiry and get back to you shortly.',
            "In the meantime, feel free to explore our website to learn more about how we're making meaningful companionship more accessible.",
            'Thank you for connecting with us.'
          ]
        })
      };
  }
}

/**
 * Creates a Nodemailer transporter.
 * Tries configured port (default 465 SSL), with automatic fallback to port 587 TLS.
 */
function createTransporter(port = SMTP_PORT) {
  const isSecure = port === 465;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: isSecure, // true for 465, false for 587
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: true
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000
  });
}

/**
 * Netlify Function handler
 */
export const handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON payload' })
    };
  }

  const { template, to, firstName } = body;

  if (!to || !to.includes('@')) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Valid recipient email is required' })
    };
  }

  // Check if SMTP password is configured
  if (!SMTP_PASSWORD) {
    console.warn('[Email Function] SMTP_PASSWORD is not set. Email cannot be delivered until credentials are configured.');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        warning: 'SMTP credentials not configured. Please set SMTP_PASSWORD in environment variables.'
      })
    };
  }

  const { subject, html } = getEmailConfig(template, firstName);

  const mailOptions = {
    from: EMAIL_FROM,
    to: to.trim(),
    replyTo: EMAIL_REPLY_TO,
    subject: subject,
    html: html
  };

  // Attempt delivery via primary port (465 SSL), fallback to port 587 (TLS) if needed
  try {
    const primaryTransporter = createTransporter(SMTP_PORT);
    const info = await primaryTransporter.sendMail(mailOptions);
    console.log('[Email Function] Email sent successfully (Primary Port):', info.messageId);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, messageId: info.messageId })
    };
  } catch (primaryErr) {
    console.warn('[Email Function] Delivery on primary port failed, attempting fallback to port 587 TLS:', primaryErr.message);

    if (SMTP_PORT === 465) {
      try {
        const fallbackTransporter = createTransporter(587);
        const info = await fallbackTransporter.sendMail(mailOptions);
        console.log('[Email Function] Email sent successfully via fallback port 587:', info.messageId);
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, messageId: info.messageId, fallbackUsed: true })
        };
      } catch (fallbackErr) {
        console.error('[Email Function] Fallback delivery failed:', fallbackErr.message);
        return {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: false,
            error: 'Failed to deliver email through both primary and fallback SMTP connections.'
          })
        };
      }
    }

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: primaryErr.message
      })
    };
  }
};
