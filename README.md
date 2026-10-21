# Altun & Riechert – Website

Statische Website für GitHub Pages. Keine externen Ressourcen: Schriften liegen in `fonts/` bzw. `beispiel/fonts/` (SIL OFL 1.1), keine Cookies, kein Tracking.

- `index.html`, `impressum.html`, `datenschutz.html`, `style.css` – Website Altun & Riechert
- `beispiel/` – Muster-Website „Malerwerkstatt Musterle“ (erfundener Betrieb, als Beispiel gekennzeichnet)
- `_briefe/make_letters.py` – Erzeugt die Serienbriefe an Betriebe (HTML → PDF)

## Branches

- `main`: aktueller Stand für den Livegang
- `test`: Testumgebung für die neue Gestaltung (Bricolage-Überschriften, Vorher-nachher-Vergleich, Paketkarten mit Preisen, Anfrageformular per E-Mail)

**Noch nicht online schalten:** Im Impressum fehlen Telefonnummer und die Angabe zur Umsatzsteuer, in der Datenschutzerklärung der Hinweis auf den AV-Vertrag mit IONOS. Danach `noindex` in `index.html`, `impressum.html` und `datenschutz.html` entfernen (die Muster-Website unter `beispiel/` behält es) und bei IONOS hochladen, z. B. per IONOS Deploy Now mit diesem Repo.
