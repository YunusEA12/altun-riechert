# Gemini-Bewertung (25.10.2026)

Originaltext, von Yunus in den Chat eingefügt und hier unverändert abgelegt.

---

Hallo Claude, wir haben die Ordnerstruktur, die aktuelle `index.html` und das Regelwerk in `CLAUDE.md` analysiert. Bitte führe folgende Korrekturen und Vorbereitungen direkt im Projekt aus:

### 1. Sicherheitsrisiko beheben (`.gitignore` anlegen)
- Erstelle im Projekt-Root eine `.gitignore`.
- Schließe darin `_briefe/` unbedingt aus, da `make_letters.py` vertrauliche Firmendaten enthält und GitHub Pages mit `.nojekyll` diese Dateien sonst öffentlich ausliefern würde.
- Ergänze Standard-Einträge: `.DS_Store`, `Thumbs.db`, `.env`, `*.log`, `__pycache__/`, `obsidian-vault/`.
- Entferne `_briefe/` aus dem Git-Index (`git rm -r --cached _briefe`), falls es bereits gestrackt ist.

### 2. Ordnerstruktur mit `CLAUDE.md` harmonisieren
In `CLAUDE.md` gibt es noch Divergenzen zur realen Ordnerstruktur:
1. **Ordner `referenz/` anlegen:** Lege den in Phase 0 definierten Ordner `referenz/` an, in dem wir Screenshots und Analyse-Dumps der Referenzseite (`lpas.com`) ablegen.
2. **Ordner `brand_assets/` befüllen:** Der Ordner ist aktuell leer, obwohl `CLAUDE.md` verlangt, vor jedem Design dort reinzuschauen. Erstelle bitte dort:
   - Ein sauberes SVG für unser Logo: Kachel „A&R“ in Petrol (`#123B40`), das „&“-Zeichen in Amber (`#E39A2D`), mit dem Zusatz „Digital für Betriebe · Region Stuttgart“.
   - Eine Datei `brand_assets/tokens.css` oder `brand.json` mit unseren Marken-Farben und Font-Definitionen.
3. **Klärung `src/content/site.json` vs. statisches HTML:**
   - In `CLAUDE.md` steht, dass alle Texte in `src/content/site.json` stehen sollen und Platzhalter in `public/images/placeholder/`.
   - Bislang liegen die Dateien flach (`index.html`, `style.css`, `images/placeholder/`).
   - **Aufgabe:** Richte entweder die `src/content/site.json` ein (und erstelle ein schlankes Build-Skript / Node/Python, das daraus `index.html` und `/en/index.html` erzeugt) ODER passe die Pfade in `CLAUDE.md` an die flache Struktur an, falls wir bei reinem Hand-HTML bleiben.

### 3. Bugs im aktuellen Stand beheben
- In der bestehenden `index.html` verlinkt Zeile 11 auf `<link rel="stylesheet" href="assets/site.css">` und Zeile 329 auf `assets/site.js`. Ein Ordner `assets/` existiert nicht (das Stylesheet liegt als `style.css` im Root). Bitte die Pfade korrigieren, damit die Seite lokal fehlerfrei dargestellt wird.

### 4. Smartphone-UX bei der Kontaktaufnahme optimieren
- In `CLAUDE.md` (Abschnitt 6 und 10) ist als Kontaktweg nur „Mail-Button mit Adresse kopieren“ vermerkt.
- Auf dem Smartphone (unser primärer Fokus!) ist „Adresse kopieren“ umständlich.
- Ergänze den Mail-Button um einen direkten Link:
  `<a href="mailto:altunriechert@gmail.com?subject=Kurz-Check">`
  So öffnet sich auf dem Handy mit nur einem Tipp die Mail-App mit fertigem Betreff. Der Button „Adresse kopieren“ kann als sekundäre Option daneben bleiben.

### 5. `CLAUDE.md` Checklist-Update
Hake die erledigten Punkte in Abschnitt 13 ab, sobald die Struktur und Assets angelegt sind.
