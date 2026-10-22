<?php
/**
 * Kontaktformular -> E-Mail an das gemeinsame Postfach.
 *
 * Das Formular auf index.html schickt die Felder per fetch() hierher. Dieses Skript prüft sie und
 * verschickt genau eine Mail an EMPFAENGER. Der Betreff beginnt mit "[Website-Anfrage]" – daran
 * erkennt das Büro-System auf dem Server die Anfrage und legt daraus einen Kontakt an.
 *
 * Es wird nichts gespeichert außer einer kurzen Sperre gegen Massen-Absendungen (IP-Hash, 10 Minuten).
 * Spam-Schutz: verstecktes Feld (Honeypot), Mindest-Ausfüllzeit, Längenbegrenzung, Sendelimit je IP.
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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    antwort(405, ['ok' => false, 'fehler' => 'Nur POST.']);
}

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
    $zeiten = array_filter((array) json_decode((string) file_get_contents($sperrdatei), true), fn($t) => is_int($t) && $t > $jetzt - SPERRFENSTER);
}
if (count($zeiten) >= MAX_JE_IP) {
    antwort(429, ['ok' => false, 'fehler' => 'Zu viele Anfragen. Bitte versuchen Sie es in ein paar Minuten erneut oder schreiben Sie uns direkt.']);
}

$betrieb = einzeilig(feld('betrieb', 150));
$name = einzeilig(feld('name', 120));
$email = einzeilig(feld('email', 200));
$telefon = einzeilig(feld('telefon', 60));
$website = einzeilig(feld('website', 200));
$nachricht = feld('nachricht', 3000);
$einwilligung = feld('einwilligung', 5);

if ($betrieb === '' || $name === '') {
    antwort(422, ['ok' => false, 'fehler' => 'Bitte Betrieb und Ihren Namen angeben.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    antwort(422, ['ok' => false, 'fehler' => 'Bitte eine gültige E-Mail-Adresse angeben, damit wir antworten können.']);
}
if ($einwilligung !== '1') {
    antwort(422, ['ok' => false, 'fehler' => 'Bitte bestätigen Sie die Einwilligung zur Bearbeitung Ihrer Anfrage.']);
}

$text = "Neue Anfrage über die Website\n\n"
    . "Name: {$name}\n"
    . "E-Mail: {$email}\n"
    . "Firma: {$betrieb}\n"
    . "Telefon: " . ($telefon !== '' ? $telefon : '–') . "\n"
    . "Website: " . ($website !== '' ? $website : '–') . "\n"
    . "Bereich: Kostenloser Check\n\n"
    . "Nachricht:\n" . ($nachricht !== '' ? $nachricht : '(keine)') . "\n\n"
    . "--\nGesendet über das Kontaktformular am " . date('d.m.Y H:i') . " Uhr. Antworten gehen direkt an {$email}.\n";

$host = explode(':', strtolower($_SERVER['HTTP_HOST'] ?? 'localhost'))[0];
$host = preg_replace('/[^a-z0-9.-]/', '', $host) ?: 'localhost';
$host = preg_replace('/^www\./', '', $host);
$absender = 'website@' . $host;
$betreff = mb_encode_mimeheader(BETREFF_PREFIX . ' ' . $betrieb, 'UTF-8', 'Q');
$kopf = implode("\r\n", [
    'From: =?UTF-8?Q?Website?= <' . $absender . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: Kontaktformular',
]);

$ok = mail(EMPFAENGER, $betreff, $text, $kopf, '-f' . $absender);
if (!$ok) {
    antwort(502, ['ok' => false, 'fehler' => 'Senden hat nicht geklappt.', 'fallback' => true]);
}

$zeiten[] = $jetzt;
@file_put_contents($sperrdatei, json_encode(array_values($zeiten)), LOCK_EX);
antwort(200, ['ok' => true]);
