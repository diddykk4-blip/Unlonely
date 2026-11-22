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

$template = isset($body['template']) ? trim($body['template']) : 'contact';
$firstNameRaw = isset($body['firstName']) ? trim($body['firstName']) : '';
$firstName = htmlspecialchars($firstNameRaw, ENT_QUOTES, 'UTF-8');
$greeting = !empty($firstName) ? "Hello " . $firstName . "," : "Hello there,";

// Build templates matching Unlonely brand identity
function buildEmailTemplate($heading, $greeting, $paragraphs) {
    $contentHtml = "";
    foreach ($paragraphs as $p) {
        $contentHtml .= '<p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">' . $p . '</p>';
    }

    return '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>' . htmlspecialchars($heading) . '</title>
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
            <td class="email-inner" style="padding: 36px 36px 28px 36px; background-color: #FFFFFF;">
              
              <!-- Welcome / Confirmation Heading -->
              <h2 style="margin: 0 0 20px 0; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 600; color: #0A0F2C; line-height: 1.3;">
                ' . htmlspecialchars($heading) . '
              </h2>

              <!-- Personalised Greeting -->
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #0A0F2C; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
                ' . $greeting . '
              </p>

              <!-- Paragraphs -->
              ' . $contentHtml . '

              <!-- Subtle Orange Call to Action Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 24px 0;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #FF6B4A;">
                    <a href="https://unlonely.uk" target="_blank" style="display: inline-block; padding: 12px 28px; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none; border-radius: 8px;">
                      Visit Unlonely
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.5; color: #333333; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif;">
                Warm regards,<br>
                <strong style="color: #0A0F2C;">The Unlonely Team</strong>
              </p>
            </td>
          </tr>

          <!-- Professional Footer -->
          <tr>
            <td style="padding: 24px 30px; background-color: #F5F5F5; border-top: 1px solid #EAEAEA; text-align: center;">
              <p style="margin: 0 0 4px 0; font-family: \'Sora\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; color: #0A0F2C;">
                Unlonely
              </p>
              <p style="margin: 0 0 10px 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #666666;">
                Alone No More.
              </p>
              <p style="margin: 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #888888;">
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
</html>';
}

switch ($template) {
    case 'find-companion':
        $subject = "Welcome to Unlonely – We've Received Your Request";
        $heading = "We've Received Your Request";
        $paragraphs = [
            "Welcome to Unlonely!",
            "Thank you for reaching out to us. We're glad you've taken the first step towards finding meaningful companionship.",
            "At Unlonely, we believe everyone deserves someone to talk to, share moments with and feel connected to. We're here to make that possible.",
            "We've successfully received your request, and our team will review the information you've provided. A member of our team will be in touch with you shortly to discuss the next steps and help you find a suitable companion.",
            "In the meantime, if you have any questions or additional information you'd like to share, please don't hesitate to contact us.",
            "Thank you for choosing Unlonely.",
            "<em>Because nobody should have to feel alone.</em>"
        ];
        break;

    case 'become-companion':
        $subject = "Welcome to Unlonely – Thank You for Your Interest";
        $heading = "Thank You for Your Interest";
        $paragraphs = [
            "Welcome to Unlonely!",
            "Thank you for your interest in becoming a companion. We're delighted that you're considering joining us in making a meaningful difference in people's lives.",
            "At Unlonely, we believe that a simple conversation, a listening ear or a friendly presence can make a world of difference.",
            "We've successfully received your application, and our team will review the information you've submitted. We'll be in touch shortly to discuss the next steps in the application process.",
            "We appreciate your willingness to be part of something meaningful, and we look forward to learning more about you.",
            "Thank you for choosing to be part of Unlonely.",
            "<em>Together, we can make sure nobody has to feel alone.</em>"
        ];
        break;

    case 'contact':
    case 'reach-out':
    default:
        $subject = "Thank You for Reaching Out to Unlonely";
        $heading = "Thank You for Reaching Out";
        $paragraphs = [
            "Thank you for getting in touch with Unlonely!",
            "We appreciate you taking the time to contact us. Whether you have a question, need more information about our services or simply want to learn more about what we do, we're always happy to hear from you.",
            "Your message has been successfully received, and a member of our team will review your enquiry and get back to you shortly.",
            "In the meantime, feel free to explore our website to learn more about how we're making meaningful companionship more accessible.",
            "Thank you for connecting with us."
        ];
        break;
}

$htmlMessage = buildEmailTemplate($heading, $greeting, $paragraphs);

// SMTP Hostinger Socket Sender
function sendSmtpMail($host, $port, $user, $pass, $from, $to, $subject, $html) {
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

    $sendCmd("MAIL FROM: <$from>", 250);
    $sendCmd("RCPT TO: <$to>", 250);
    $sendCmd("DATA", 354);

    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: Unlonely <$from>",
        "Reply-To: $from",
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

// Check if credentials are set via getenv, config file, or environment
$configFile = __DIR__ . '/smtp_config.php';
$smtpPass = getenv('SMTP_PASSWORD') ?: (file_exists($configFile) ? include($configFile) : '');
$smtpUser = getenv('SMTP_USER') ?: 'support@unlonely.uk';
$smtpHost = getenv('SMTP_HOST') ?: 'smtp.hostinger.com';

if (empty($smtpPass)) {
    // If no SMTP password configured yet, log and respond gracefully
    echo json_encode([
        "success" => false,
        "warning" => "SMTP credentials not yet configured in Hostinger environment. Configure in api/smtp_config.php or environment."
    ]);
    exit;
}

// Attempt Port 465 SSL first, fallback to 587 TLS
try {
    sendSmtpMail($smtpHost, 465, $smtpUser, $smtpPass, $smtpUser, $to, $subject, $htmlMessage);
    echo json_encode(["success" => true, "method" => "smtp-ssl-465"]);
} catch (Exception $e465) {
    try {
        sendSmtpMail($smtpHost, 587, $smtpUser, $smtpPass, $smtpUser, $to, $subject, $htmlMessage);
        echo json_encode(["success" => true, "method" => "smtp-tls-587-fallback"]);
    } catch (Exception $e587) {
        // Last resort fallback: standard PHP mail()
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: Unlonely <" . $smtpUser . ">\r\n";
        $headers .= "Reply-To: " . $smtpUser . "\r\n";
        
        $mailSuccess = @mail($to, $subject, $htmlMessage, $headers);
        if ($mailSuccess) {
            echo json_encode(["success" => true, "method" => "php-mail-fallback"]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false, 
                "error" => "SMTP delivery failed: " . $e465->getMessage() . " | " . $e587->getMessage()
            ]);
        }
    }
}
