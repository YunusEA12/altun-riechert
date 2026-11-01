# Claude-Bericht 01.11.2026 – Sicherheit und Abmahnrisiken

**Auftrag Yunus:** Website auf Sicherheit und Abmahnrisiken prüfen, „alles optimieren“, KI-Ratgeber (PDF) entfernen.
**Branch:** `zusammenfuehrung`. Kein Anwalt: rechtliche Einschätzungen sind als „sicher / wahrscheinlich / unklar“ markiert.

## Geändert

| Datei | Änderung | Grund |
|---|---|---|
| `kontakt.php` | Zeitstempel ist Pflicht (vorher: ohne `t` übersprungen) | Bot-Schutz ließ sich umgehen (getestet: 2 Mails) |
| `kontakt.php` | Origin-Prüfung: fremde Herkunft → 403 | Absendungen von fremden Seiten |
| `kontakt.php` | feste Absender-Adresse `website@bal-mio.de` statt Host aus der Anfrage | gefälschter Host ergab `website@boese-domain.example` |
| `kontakt.php` | Tageslimits: 40 Anfragen, 20 Eingangsbestätigungen | Missbrauch der Bestätigung gegen fremde Postfächer (§ 7 UWG, Absender-Ruf) |
| `kontakt.php`, `assets/anfrage.js` | Bestätigung duzt; Erfolgsmeldung „In der Regel bekommst du …“ | Du-Regel, Limit ehrlich abbilden |
| `.htaccess` (neu) | CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS | fehlende Sicherheits-Header |
| `downloads/ki-ratgeber.pdf` | gelöscht, 6 Links, CSS und Manifest-Eintrag entfernt | Entscheidung Yunus; Quellen ungeprüft (§ 5 UWG) |
| Panels/Hero Webseiten + KI-Assistent (DE/EN) | Videos → Übergangsgrafik; 4 Videodateien aus `public-files.json` | Herkunft/Lizenz unbekannt (§§ 72, 97 UrhG) |
| `assets/site.css`, `assets/site.js` | Kommentare ohne Hinweis auf fremde Vorlage | kein Anlass für Nachahmungs-Vorwürfe |
| `impressum.html` | sichtbare Platzhalter „[Telefonnummer]“, „[USt-IdNr …]“ entfernt; E-Mail + Formular als Kontaktwege | sichtbare Platzhalter = unvollständiges Impressum (§ 5 DDG, § 3a UWG). „GbR“ unverändert |
| Alt-Texte Fachkräfte/Automatisierung (DE/EN) | „KI-generiertes Symbolbild“ | Transparenz (KI-VO Art. 50) |
| `CLAUDE.md`, `docs/agenten-zusammenarbeit.md` | Regeln und Codex-Aufgaben | |

## Getestet

- **kontakt.php** lokal (PHP-Testserver, Mails in Datei): GET → 405; Header-Injection → keine `Bcc`-Zeile; ungültige Mail / fehlende Einwilligung → 422; Honeypot, ohne oder zu frischer Zeitstempel → keine Mail; fremde Origin → 403; gefälschter Host → Absender bleibt `website@bal-mio.de`; 25 Anfragen über wechselnde IPs → genau 20 Bestätigungen; ab Anfrage 41 → 429; 1 MB Nachricht → 3.000 Zeichen.
- **CSP** über lokalen Server mit denselben Headern: 9 Seiten × 375/1440 px, 0 Verstöße; Inline-Skripte, Schrift, Videos, Canvas, Formular laufen.
- 15 Seiten × 375/768/1280/1440: kein horizontales Scrollen, Button sichtbar, keine Konsolenfehler, keine externen Anfragen, keine 404.
- Lighthouse Start (Handy/Desktop) 94/99 Performance, 100 Barrierefreiheit, 100 Best Practices, SEO 63 nur wegen `noindex`.
- `security_check.py`: 0 Fehler, 2 Warnungen (Git-Historie, `anfrage.js:37` – geprüft, nur feste Texte). Tests OK. Export 4,2 MB statt ≈ 13 MB.

## Abmahnrisiken – Ergebnis

- **Kein Risiko (sicher):** Schriften (OFL, ohne Reserved Font Name, Lizenztexte dabei, lokal), Animationen/Effekte (eigener Code), Cookies/Tracking (keine), Google-Nennungen (beschreibend), Muster-Website (als Beispiel markiert, kein realer „Musterle“ gefunden).
- **Offen, nur Team/Anwalt:** Rechtsform „GbR“ im Impressum (unklar), Telefonnummer (wahrscheinlich nicht zwingend bei E-Mail + Formular, EuGH C-298/07), Bestätigungs-Mail an Dritte (unklar, OLG München 29 U 1682/12), Herkunft der zwei Videos, Repo öffentlich mit Firmendaten (sicher Datenschutzverstoß).

## Offen

- **Repo privat stellen** – nur Yunus/Calvin.
- `.htaccess` in den Export aufnehmen – Codex (SEC-HTACCESS).
- HTTPS-Weiterleitung im IONOS-Kundenbereich einschalten.
- Nach dem Hochladen: echte Testanfrage über das Formular; Header mit securityheaders.com prüfen. Die Live-Seite war aus dieser Umgebung nicht erreichbar.

## Für den Rechts-Chat

1. KI-Ratgeber (PDF) von der Website entfernt.
2. Impressum: Telefon-Zeile und USt-Platzhalter entfernt, Kontakt = E-Mail + Anfrage-Formular; „GbR“ unverändert – bitte prüfen.
3. Eingangsbestätigung des Formulars duzt und ist auf 20 pro Tag begrenzt.
4. Zwei Videos unklarer Herkunft nicht mehr auf der Seite; KI-Bilder als „KI-generiertes Symbolbild“ gekennzeichnet (Alt-Text).
