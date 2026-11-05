# Claude-Bericht 05.11.2026 – Umbenennung „Altun KI & Web“

Auftrag Calvin: neuer Name statt „Altun & Riechert“, neues Logo, Gespräche im Team.

## Geändert
- Name überall „Altun KI & Web“: Titel, og-Tags, Logo-Kacheln (jetzt „A“ + „KI“ in Amber), Footer, Impressum (Geschäftsbezeichnung), Datenschutz, Formular-Einwilligung (`assets/anfrage.js`), Absender/Betreff in `kontakt.php`, Muster-Website-Hinweis (`beispiel/index.html`, nur Text), Kommentare in CSS/JS.
- `brand_assets/logo.svg`, `images/og-image.png`, `icon.png` neu erzeugt.
- Team (DE/EN): „Hamza Altun und sein Team“; Karte „Das Team“ – Gespräche gemeinsam im Team, ohne Namen. Menü-Hinweis „Hamza Altun und Team“ auf allen Seiten.
- CLAUDE.md §2 ergänzt.

## Unverändert
- E-Mail altunriechert@gmail.com (enthält weiter „riechert“) und Gmail-Label „A&R/…“.

## Tests
- `security_check.py`: 0 Fehler, 2 bekannte Warnungen. Unittests OK. Screenshots 1440/375 geprüft.

## Offen
- Telefonnummer und USt-Angabe im Impressum; Anschrift als Hamzas Adresse bestätigen.
- Neue Mail-Adresse/Domain passend zum Namen; Markenrecherche „Altun KI“ (DPMA/EUIPO) vor dem Go-live.
- Briefe (`_briefe/`, Calvin) nennen noch den alten Namen.
