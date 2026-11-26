<?php
// Prevent unauthorized script execution and enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// Error logging helper — writes to PHP error log (visible in Hostinger logs panel)
function logMailError($context, $message) {
    error_log("[Unlonely Mailer] [$context] $message");
}

$input = file_get_contents('php://input');
$body = json_decode($input, true);

if (!$body || empty($body['to'])) {
    http_response_code(400);
    echo json_encode(["error" => "Recipient email is required"]);
    exit;
}

$to = filter_var(trim($body['to']), FILTER_SANITIZE_EMAIL);
if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email address format"]);
    exit;
}

$template = isset($body['template']) ? trim($body['template']) : 'find-companion';
$firstNameRaw = isset($body['firstName']) ? trim($body['firstName']) : '';
$firstName = htmlspecialchars($firstNameRaw, ENT_QUOTES, 'UTF-8');
$greeting = !empty($firstName) ? "Hello " . $firstName . "," : "Hello there,";

/**
 * Builds responsive branded HTML email layout.
 * Brand: Unlonely ("Alone No More.")
 * Primary: Navy (#0A0F2C)
 * Brand accent: Orange (#FF6B4A)
 * Background: White (#FFFFFF) & Light grey (#F5F5F5)
 * Heading font: Sora
 * Body font: Inter
 */
function buildEmailTemplate($previewText, $contentHtml) {
    return '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Unlonely</title>
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
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
  <!-- Hidden preview text for email clients -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    ' . htmlspecialchars($previewText) . '
  </div>

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
                    <h1 style="margin: 0; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.5px;">
                      Unlonely
                    </h1>
                    <p style="margin: 4px 0 0 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500; color: #FF6B4A; letter-spacing: 0.5px;">
                      Alone No More.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td class="email-inner" style="padding: 36px 36px 32px 36px; background-color: #FFFFFF;">
              ' . $contentHtml . '
              
              <!-- Standard Email Signature -->
              <p style="margin: 28px 0 0 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
                Warmly,<br>
                <strong style="color: #0A0F2C;">The Unlonely Team</strong><br>
                <span style="color: #FF6B4A; font-weight: 500; font-size: 14px;">Alone No More.</span>
              </p>
            </td>
          </tr>

          <!-- Standard Email Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #F5F5F5; border-top: 1px solid #EAEAEA; text-align: center;">
              <p style="margin: 0 0 4px 0; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #0A0F2C;">
                Unlonely Ltd
              </p>
              <p style="margin: 0 0 10px 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #666666; line-height: 1.5;">
                Registered Office: 20 Belsham Street, Hackney, London, E9 6NG
              </p>
              <p style="margin: 0 0 8px 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #888888;">
                <a href="https://unlonely.uk/privacy-policy" target="_blank" style="color: #0A0F2C; text-decoration: underline; font-weight: 500;">Privacy Policy</a>
                &nbsp;&bull;&nbsp;
                <a href="https://unlonely.uk/terms" target="_blank" style="color: #0A0F2C; text-decoration: underline; font-weight: 500;">Terms &amp; Conditions</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:support@unlonely.uk" style="color: #0A0F2C; text-decoration: underline; font-weight: 500;">support@unlonely.uk</a>
              </p>
              <p style="margin: 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #888888;">
                <a href="https://unlonely.uk" target="_blank" style="color: #0A0F2C; text-decoration: none; font-weight: 500;">https://unlonely.uk</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>';
}

// Select template content based on form type
switch ($template) {
    case 'find-companion':
        $subject = !empty($firstName) 
            ? "Thank you for reaching out to Unlonely, " . $firstName . "." 
            : "Thank you for reaching out to Unlonely.";
        $previewText = "We're glad you've taken this step. Here's what happens next.";
        
        $contentHtml = '
          <p style="margin: 0 0 18px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            ' . $greeting . '
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Taking the first step towards finding companionship can sometimes be difficult, so thank you for reaching out. We\'re glad you\'ve come to Unlonely.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            We believe everyone deserves a friendly face, meaningful conversations and someone to share life\'s everyday moments with.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Unlonely is a companionship service, not a medical or personal care agency. Our focus is on genuine human connection, shared interests and helping people feel less isolated.
          </p>
          <p style="margin: 24px 0 12px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Here\'s what happens next:
          </p>
          <ul style="margin: 0 0 20px 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            <li style="margin-bottom: 8px;">Our team will review the information you\'ve submitted.</li>
            <li style="margin-bottom: 8px;">We\'ll consider your preferences, interests and location when exploring a suitable companion match.</li>
            <li style="margin-bottom: 8px;">We\'ll contact you to discuss the next steps and arrange an introductory conversation or visit where appropriate.</li>
          </ul>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            We want to make sure that any introduction is based on your individual preferences and what you\'re comfortable with.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            If you have any questions in the meantime, simply reply to this email. Our team will be happy to help.
          </p>
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Thank you for considering Unlonely.
          </p>
        ';
        break;

    case 'become-companion':
        $subject = "Thank you for applying to become an Unlonely companion!";
        $previewText = "We're glad you're interested in making a difference through companionship.";
        
        $contentHtml = '
          <p style="margin: 0 0 18px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            ' . $greeting . '
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Thank you for taking the time to apply to become an Unlonely companion.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            We\'re delighted that you\'re interested in being part of a service that helps people feel more connected, supported and less alone.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            At Unlonely, we believe that meaningful companionship can make a real difference in someone\'s everyday life. Sometimes, a friendly conversation, a shared interest or simply having someone to spend time with can mean more than words can express.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            By applying, you\'ve taken the first step towards becoming part of our companion community.
          </p>
          <p style="margin: 24px 0 12px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            What happens next?
          </p>
          <ul style="margin: 0 0 20px 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            <li style="margin-bottom: 8px;">Our team will review the information you\'ve provided in your application.</li>
            <li style="margin-bottom: 8px;">We may contact you if we need any additional information or clarification.</li>
            <li style="margin-bottom: 8px;">We\'ll explain the next steps in our selection and onboarding process.</li>
          </ul>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            We appreciate your interest and the time you\'ve invested in applying.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            If you have any questions, you can simply reply to this email and our team will be happy to assist.
          </p>
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Thank you for considering becoming part of Unlonely.
          </p>
        ';
        break;

    case 'post-op-recovery':
    case 'recovery':
    default:
        $subject = !empty($firstName) 
            ? "Thank you for reaching out to Unlonely, " . $firstName . "." 
            : "Thank you for reaching out to Unlonely.";
        $previewText = "We're here to help you explore companionship during your recovery.";
        
        $contentHtml = '
          <p style="margin: 0 0 18px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            ' . $greeting . '
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Thank you for reaching out to Unlonely.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            We understand that the period following an operation can be a time when having someone around makes a real difference.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Whether you\'re looking for a friendly face, someone to share a conversation with or companionship during everyday activities, we\'re glad you\'ve considered Unlonely.
          </p>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Our Post-Op Recovery companionship service is designed around human connection and helping people feel less alone during their recovery journey.
          </p>
          <p style="margin: 24px 0 12px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            What happens next?
          </p>
          <ul style="margin: 0 0 20px 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            <li style="margin-bottom: 8px;">Our team will review the information you\'ve submitted.</li>
            <li style="margin-bottom: 8px;">We\'ll consider your preferences and the companionship you\'re looking for.</li>
            <li style="margin-bottom: 8px;">A member of our team will contact you to discuss your request and explain the available options.</li>
          </ul>
          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            We understand that everyone\'s circumstances are different, so we\'ll take the time to understand what you\'re looking for before discussing the next steps.
          </p>
          
          <div style="margin: 24px 0; padding: 18px 20px; background-color: #FFF6F3; border-left: 4px solid #FF6B4A; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #0A0F2C; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
              A little reassurance
            </p>
            <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.6; color: #555555; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
              Unlonely provides companionship, not medical treatment or professional healthcare.
            </p>
            <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.6; color: #555555; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
              Our companions do not provide nursing, administer medication, perform medical procedures or replace professional medical or personal care services.
            </p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #555555; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
              If you have medical concerns or need assistance with your recovery, please contact your healthcare provider.
            </p>
          </div>

          <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            If you have any questions about your request, simply reply to this email. Our team will be happy to help.
          </p>
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
            Thank you for considering Unlonely.
          </p>
        ';
        break;
}

$htmlMessage = buildEmailTemplate($previewText, $contentHtml);

// Sender Configuration
$senderName = "The Unlonely Team";
$senderEmail = "support@unlonely.uk";
$fromHeader = "The Unlonely Team <support@unlonely.uk>";

// Audience-specific Reply-To & Internal Notification routing
switch ($template) {
    case 'find-companion':
        $replyToHeader = "enquiries@unlonely.uk";
        $internalNotificationRecipient = "enquiries@unlonely.uk";
        break;
    case 'become-companion':
        $replyToHeader = "recruitments@unlonely.uk";
        $internalNotificationRecipient = "recruitments@unlonely.uk";
        break;
    case 'post-op-recovery':
    case 'recovery':
    default:
        $replyToHeader = "support@unlonely.uk";
        $internalNotificationRecipient = "support@unlonely.uk";
        break;
}

// SMTP Socket Sender
function sendSmtpMail($host, $port, $user, $pass, $fromEmail, $fromDisplay, $replyTo, $to, $subject, $html) {
    $timeout = 15;
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $prefix = ($port == 465) ? 'ssl://' : '';
    $socket = @stream_socket_client($prefix . $host . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);

    if (!$socket) {
        throw new Exception("Socket connection failed: $errstr ($errno)");
    }

    $read = fgets($socket, 512);

    $sendCmd = function($cmd, $expectedCode) use ($socket) {
        if (!empty($cmd)) {
            fputs($socket, $cmd . "\r\n");
        }
        $response = "";
        while ($str = fgets($socket, 512)) {
            $response .= $str;
            if (substr($str, 3, 1) === ' ') break;
        }
        if (!empty($expectedCode) && substr($response, 0, 3) !== strval($expectedCode)) {
            throw new Exception("SMTP Error [$cmd]: $response");
        }
        return $response;
    };

    $sendCmd("EHLO " . gethostname(), 250);

    if ($port == 587) {
        $sendCmd("STARTTLS", 220);
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $sendCmd("EHLO " . gethostname(), 250);
    }

    if (!empty($user) && !empty($pass)) {
        $sendCmd("AUTH LOGIN", 334);
        $sendCmd(base64_encode($user), 334);
        $sendCmd(base64_encode($pass), 235);
    }

    $sendCmd("MAIL FROM: <$fromEmail>", 250);
    $sendCmd("RCPT TO: <$to>", 250);
    $sendCmd("DATA", 354);

    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: " . $fromDisplay . " <" . $fromEmail . ">",
        "Reply-To: " . $replyTo,
        "To: $to",
        "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
        "Date: " . date("r"),
        "X-Mailer: Hostinger-PHP"
    ];

    $emailData = implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.";
    $sendCmd($emailData, 250);
    $sendCmd("QUIT", 221);
    fclose($socket);
    return true;
}

// Credentials resolution
$configFile = __DIR__ . '/smtp_config.php';
$smtpPass = getenv('SMTP_PASSWORD') ?: (file_exists($configFile) ? include($configFile) : '');
$smtpUser = getenv('SMTP_USER') ?: 'support@unlonely.uk';
$smtpHost = getenv('SMTP_HOST') ?: 'smtp.hostinger.com';

// Also check for Postmark Server API Token if Postmark is configured
$postmarkToken = getenv('POSTMARK_SERVER_TOKEN') ?: (defined('POSTMARK_SERVER_TOKEN') ? POSTMARK_SERVER_TOKEN : '');

// If Postmark API token is present, attempt delivery via Postmark API first
if (!empty($postmarkToken)) {
    $postmarkData = [
        "From" => $fromHeader,
        "To" => $to,
        "ReplyTo" => $replyToHeader,
        "Subject" => $subject,
        "HtmlBody" => $htmlMessage,
        "MessageStream" => "outbound"
    ];

    $ch = curl_init('https://api.postmarkapp.com/email');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postmarkData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: application/json',
        'Content-Type: application/json',
        'X-Postmark-Server-Token: ' . $postmarkToken
    ]);

    $pmResponse = curl_exec($ch);
    $pmHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($pmHttpCode === 200) {
        echo json_encode(["success" => true, "method" => "postmark-api", "replyTo" => $replyToHeader, "notificationRecipient" => $internalNotificationRecipient]);
        exit;
    }
}

if (empty($smtpPass)) {
    // Graceful response when credentials aren't configured yet in testing environment
    echo json_encode([
        "success" => false,
        "warning" => "SMTP credentials not yet configured. Set in api/smtp_config.php or environment."
    ]);
    exit;
}

// Attempt Port 465 SSL first, fallback to 587 TLS
try {
    sendSmtpMail($smtpHost, 465, $smtpUser, $smtpPass, $senderEmail, $senderName, $replyToHeader, $to, $subject, $htmlMessage);
    echo json_encode(["success" => true, "method" => "smtp-ssl-465", "replyTo" => $replyToHeader, "notificationRecipient" => $internalNotificationRecipient]);
} catch (Exception $e465) {
    try {
        sendSmtpMail($smtpHost, 587, $smtpUser, $smtpPass, $senderEmail, $senderName, $replyToHeader, $to, $subject, $htmlMessage);
        echo json_encode(["success" => true, "method" => "smtp-tls-587-fallback", "replyTo" => $replyToHeader, "notificationRecipient" => $internalNotificationRecipient]);
    } catch (Exception $e587) {
        // Last resort fallback: standard PHP mail()
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: " . $fromHeader . "\r\n";
        $headers .= "Reply-To: " . $replyToHeader . "\r\n";
        
        $mailSuccess = @mail($to, $subject, $htmlMessage, $headers);
        if ($mailSuccess) {
            echo json_encode(["success" => true, "method" => "php-mail-fallback", "replyTo" => $replyToHeader, "notificationRecipient" => $internalNotificationRecipient]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "error" => "SMTP delivery failed: " . $e465->getMessage() . " | " . $e587->getMessage()
            ]);
        }
    }
}
