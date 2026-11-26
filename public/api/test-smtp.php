<?php
/**
 * SMTP Diagnostic Test Script — Unlonely
 * ========================================
 * USE: Upload to Hostinger at public_html/api/test-smtp.php
 * TEST: Visit https://unlonely.uk/api/test-smtp.php?to=YOUR_EMAIL
 *
 * DELETE THIS FILE after debugging is complete.
 * Never leave diagnostic scripts on a production server.
 */

// Block access unless a valid test token is provided
// Change this to something only you know, e.g. ?token=unlonely-debug-2024
$secret = 'unlonely-debug-2024';
if (!isset($_GET['token']) || $_GET['token'] !== $secret) {
    http_response_code(403);
    die(json_encode(['error' => 'Forbidden. Provide ?token=unlonely-debug-2024 in the URL.']));
}

header('Content-Type: application/json; charset=UTF-8');

$to = isset($_GET['to']) ? trim($_GET['to']) : '';
if (empty($to) || !filter_var($to, FILTER_VALIDATE_EMAIL)) {
    die(json_encode(['error' => 'Provide a valid recipient email: ?to=you@example.com&token=...']));
}

$results = [];

// Step 1: Check smtp_config.php exists and returns a password
$configFile = __DIR__ . '/smtp_config.php';
$results['config_file_exists'] = file_exists($configFile);

$smtpPass = '';
if ($results['config_file_exists']) {
    $smtpPass = include($configFile);
    $results['smtp_pass_loaded'] = !empty($smtpPass);
    $results['smtp_pass_length'] = strlen((string)$smtpPass);
} else {
    $results['smtp_pass_loaded'] = false;
}

$smtpUser = 'support@unlonely.uk';
$smtpHost = 'smtp.hostinger.com';

// Step 2: Test socket connectivity to port 465
$results['port_465_connect'] = false;
$results['port_465_banner'] = '';
try {
    $ctx = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true]]);
    $sock465 = @stream_socket_client('ssl://' . $smtpHost . ':465', $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $ctx);
    if ($sock465) {
        $results['port_465_connect'] = true;
        $banner = fgets($sock465, 512);
        $results['port_465_banner'] = trim($banner);
        fclose($sock465);
    } else {
        $results['port_465_error'] = "$errstr ($errno)";
    }
} catch (Exception $e) {
    $results['port_465_error'] = $e->getMessage();
}

// Step 3: Test socket connectivity to port 587
$results['port_587_connect'] = false;
$results['port_587_banner'] = '';
try {
    $ctx2 = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true]]);
    $sock587 = @stream_socket_client($smtpHost . ':587', $errno2, $errstr2, 10, STREAM_CLIENT_CONNECT, $ctx2);
    if ($sock587) {
        $results['port_587_connect'] = true;
        $banner2 = fgets($sock587, 512);
        $results['port_587_banner'] = trim($banner2);
        fclose($sock587);
    } else {
        $results['port_587_error'] = "$errstr2 ($errno2)";
    }
} catch (Exception $e2) {
    $results['port_587_error'] = $e2->getMessage();
}

// Step 4: Attempt a full SMTP AUTH + send on port 465 (if credentials loaded)
$results['send_attempt'] = 'skipped - no smtp password';
if (!empty($smtpPass)) {
    try {
        $log = [];
        $ctx3 = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true]]);
        $sock = @stream_socket_client('ssl://' . $smtpHost . ':465', $errno3, $errstr3, 15, STREAM_CLIENT_CONNECT, $ctx3);
        if (!$sock) {
            throw new Exception("Cannot connect port 465: $errstr3 ($errno3)");
        }

        $readline = function() use ($sock, &$log) {
            $buf = '';
            while ($line = fgets($sock, 512)) {
                $buf .= $line;
                $log[] = '< ' . trim($line);
                if (substr($line, 3, 1) === ' ') break;
            }
            return $buf;
        };
        $writeline = function($cmd, $expected) use ($sock, &$log, $readline) {
            if (!empty($cmd)) {
                fputs($sock, $cmd . "\r\n");
                $log[] = '> ' . (strpos($cmd, base64_decode('c3VwcG9ydA==')) !== false ? '[AUTH DATA REDACTED]' : $cmd);
            }
            $resp = $readline();
            if ($expected && substr($resp, 0, 3) !== strval($expected)) {
                throw new Exception("Expected $expected, got: " . trim($resp));
            }
            return $resp;
        };

        $readline(); // banner
        $log[] = '< [banner received]';

        $writeline('EHLO ' . gethostname(), 250);
        $writeline('AUTH LOGIN', 334);
        $writeline(base64_encode($smtpUser), 334);
        $writeline(base64_encode($smtpPass), 235);
        $writeline("MAIL FROM: <support@unlonely.uk>", 250);
        $writeline("RCPT TO: <$to>", 250);
        $writeline("DATA", 354);

        $testSubject = "=?UTF-8?B?" . base64_encode("Unlonely SMTP Diagnostic Test") . "?=";
        $testBody = "<!DOCTYPE html><html><body><p>This is an SMTP diagnostic test from the Unlonely server.</p><p>If you received this, SMTP delivery is working correctly.</p><p>Sent to: $to</p></body></html>";
        $headers = implode("\r\n", [
            "MIME-Version: 1.0",
            "Content-Type: text/html; charset=UTF-8",
            "From: The Unlonely Team <support@unlonely.uk>",
            "Reply-To: support@unlonely.uk",
            "To: $to",
            "Subject: $testSubject",
            "Date: " . date("r"),
        ]);
        $writeline($headers . "\r\n\r\n" . $testBody . "\r\n.", 250);
        $writeline("QUIT", 221);
        fclose($sock);

        $results['send_attempt'] = 'success';
        $results['smtp_log'] = $log;

    } catch (Exception $eSend) {
        $results['send_attempt'] = 'failed';
        $results['send_error'] = $eSend->getMessage();
        $results['smtp_log'] = $log ?? [];
    }
}

// Step 5: PHP info summary
$results['php_version'] = PHP_VERSION;
$results['server_hostname'] = gethostname();
$results['openssl_available'] = function_exists('openssl_open');
$results['curl_available'] = function_exists('curl_init');

echo json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
