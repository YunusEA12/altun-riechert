<?php
/**
 * Anfrage-Formular -> zwei E-Mails.
 *
 * 1. An das gemeinsame Postfach (EMPFAENGER). Der Betreff beginnt mit "[Website-Anfrage]": Daran
 *    erkennt das System auf dem Server (Brain/Verwaltung, Postfach-Abgleich) die Anfrage und legt
 *    daraus einen Kontakt an. In Gmail sortiert ein Filter sie zusätzlich in das Label "A&R/Website-Anfragen".
 * 2. Eine kurze Eingangsbestätigung an die angegebene Adresse. Sie enthält bewusst KEINEN Text aus
 *    dem Formular, damit niemand das Formular nutzen kann, um fremden Leuten Inhalte zu schicken.
 *
 * Gespeichert wird nichts außer einer kurzen Sperre gegen Massen-Absendungen (IP-Hash, 10 Minuten).
 * Spam-Schutz: verstecktes Feld (Honeypot), Mindest-Ausfüllzeit, Längenbegrenzung, Sendelimit je IP,
 * Schutz gegen Header-Injection (Zeilenumbrüche werden aus allen Kopfzeilen entfernt).
 */

declare(strict_types=1);

const EMPFAENGER = 'altunriechert@gmail.com';
const BETREFF_PREFIX = '[Website-Anfrage]';
const MAX_JE_IP = 3;          // Anfragen je IP ...
const SPERRFENSTER = 600;     // ... in 10 Minuten
const MIN_SEKUNDEN = 3;       // schneller ausgefüllt = Bot

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function antwort(int $code, array $daten): void {
    http_response_code($code);
    echo json_encode($daten, JSON_UNESCAPED_UNICODE);
    exit;
}

function feld(string $name, int $max): string {
    $wert = isset($_POST[$name]) && is_string($_POST[$name]) ? $_POST[$name] : '';
    $wert = str_replace(["\r\n", "\r"], "\n", $wert);
    $wert = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $wert) ?? '';
    return mb_substr(trim($wert), 0, $max);
}

function einzeilig(string $wert): string {
    return trim(preg_replace('/\s+/u', ' ', $wert) ?? '');
}

function senden(string $an, string $betreff, string $text, array $kopf, string $absender): bool {
    if (getenv('AR_KONTAKT_TEST') === '1') {   // nur für lokale Tests: Mail in Datei statt versenden
        $datei = sys_get_temp_dir() . '/ar_kontakt_testmails.log';
        return (bool) file_put_contents($datei, "To: {$an}\nSubject: {$betreff}\n" . implode("\n", $kopf) . "\n\n{$text}\n=====\n", FILE_APPEND | LOCK_EX);
    }
    return mail($an, mb_encode_mimeheader($betreff, 'UTF-8', 'Q'), $text, implode("\r\n", $kopf), '-f' . $absender);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    antwort(405, ['ok' => false, 'fehler' => 'Nur POST.']);
}

$en = feld('sprache', 2) === 'en';
$t = $en
    ? ['pflicht' => 'Please enter your name.', 'mail' => 'Please enter a valid email address so we can reply.', 'ok' => 'Please confirm that we may use your details to answer your request.', 'viel' => 'Too many requests. Please try again in a few minutes or email us directly.', 'fehl' => 'Sending did not work.']
    : ['pflicht' => 'Bitte gib deinen Namen an.', 'mail' => 'Bitte gib eine gültige E-Mail-Adresse an, damit wir antworten können.', 'ok' => 'Bitte bestätige, dass wir deine Angaben für die Antwort nutzen dürfen.', 'viel' => 'Zu viele Anfragen. Bitte versuche es in ein paar Minuten erneut oder schreib uns direkt.', 'fehl' => 'Senden hat nicht geklappt.'];

// Honeypot: Menschen sehen das Feld nicht und lassen es leer.
if (feld('homepage', 200) !== '') {
    antwort(200, ['ok' => true]);
}
$start = (int) feld('t', 20);
if ($start > 0 && (time() - intdiv($start, 1000)) < MIN_SEKUNDEN) {
    antwort(200, ['ok' => true]);
}

// Sendelimit je IP (nur ein Hash wird kurz abgelegt, nicht die IP selbst).
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unbekannt';
$sperrdatei = sys_get_temp_dir() . '/ar_kontakt_' . hash('sha256', $ip . __FILE__) . '.json';
$jetzt = time();
$zeiten = [];
if (is_file($sperrdatei)) {
    $zeiten = array_filter((array) json_decode((string) file_get_contents($sperrdatei), true), fn($z) => is_int($z) && $z > $jetzt - SPERRFENSTER);
}
if (count($zeiten) >= MAX_JE_IP) {
    antwort(429, ['ok' => false, 'fehler' => $t['viel']]);
}

$name = einzeilig(feld('name', 120));
$email = einzeilig(feld('email', 200));
$betrieb = einzeilig(feld('betrieb', 150));
$telefon = einzeilig(feld('telefon', 60));
$website = einzeilig(feld('website', 200));
$bereich = einzeilig(feld('bereich', 80));
$nachricht = feld('nachricht', 3000);

if ($name === '') {
    antwort(422, ['ok' => false, 'fehler' => $t['pflicht']]);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    antwort(422, ['ok' => false, 'fehler' => $t['mail']]);
}
if (feld('einwilligung', 5) !== '1') {
    antwort(422, ['ok' => false, 'fehler' => $t['ok']]);
}

$host = explode(':', strtolower($_SERVER['HTTP_HOST'] ?? 'localhost'))[0];
$host = preg_replace('/[^a-z0-9.-]/', '', $host) ?: 'localhost';
$host = preg_replace('/^www\./', '', $host);
$absender = 'website@' . $host;

// 1. Anfrage an das Postfach. Feldnamen passen zum Postfach-Abgleich des Systems (parse_inquiry).
$text = "Neue Anfrage über die Website\n\n"
    . "Name: {$name}\n"
    . "E-Mail: {$email}\n"
    . "Firma: " . ($betrieb !== '' ? $betrieb : '–') . "\n"
    . "Telefon: " . ($telefon !== '' ? $telefon : '–') . "\n"
    . "Website: " . ($website !== '' ? $website : '–') . "\n"
    . "Bereich: " . ($bereich !== '' ? $bereich : 'Kurz-Check') . "\n"
    . "Sprache: " . ($en ? 'Englisch' : 'Deutsch') . "\n\n"
    . "Nachricht:\n" . ($nachricht !== '' ? $nachricht : '(keine)') . "\n\n"
    . "--\nGesendet über das Anfrage-Formular am " . date('d.m.Y H:i') . " Uhr. Antworten gehen direkt an {$email}.\n";
$kopf = [
    'From: =?UTF-8?Q?Website?= <' . $absender . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: Anfrage-Formular',
];
$titel = $betrieb !== '' ? $betrieb : $name;
if (!senden(EMPFAENGER, BETREFF_PREFIX . ' ' . ($bereich !== '' ? $bereich . ': ' : '') . $titel, $text, $kopf, $absender)) {
    antwort(502, ['ok' => false, 'fehler' => $t['fehl'], 'fallback' => true]);
}

// 2. Eingangsbestätigung – fester Text ohne Formularinhalte.
$bestaetigung = $en
    ? "Hello,\n\nthank you for your interest. We have received your request and will get back to you shortly.\n\n"
      . "Kind regards\nYunus Altun, Calvin Riechert and Hamza\nAltun & Riechert\nAchardweg 17, 70435 Stuttgart\naltunriechert@gmail.com\n\n"
      . "You are receiving this email because this address was entered in the request form on our website. If that was not you, please ignore this email.\n"
    : "Guten Tag,\n\nvielen Dank für Ihr Interesse. Ihre Anfrage ist bei uns eingegangen, wir melden uns zeitnah bei Ihnen.\n\n"
      . "Viele Grüße\nYunus Altun, Calvin Riechert und Hamza\nAltun & Riechert\nAchardweg 17, 70435 Stuttgart\naltunriechert@gmail.com\n\n"
      . "Sie erhalten diese E-Mail, weil diese Adresse im Anfrage-Formular auf unserer Website angegeben wurde. Falls Sie das nicht waren, ignorieren Sie diese Nachricht bitte.\n";
$kopf2 = [
    'From: =?UTF-8?Q?Altun_&_Riechert?= <' . $absender . '>',
    'Reply-To: ' . EMPFAENGER,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'Auto-Submitted: auto-replied',
    'X-Auto-Response-Suppress: All',
];
senden($email, $en ? 'Thank you for your request – Altun & Riechert' : 'Danke für Ihre Anfrage – Altun & Riechert', $bestaetigung, $kopf2, $absender);

$zeiten[] = $jetzt;
@file_put_contents($sperrdatei, json_encode(array_values($zeiten)), LOCK_EX);
antwort(200, ['ok' => true]);
