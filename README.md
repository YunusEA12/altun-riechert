# Altun & Riechert – Website

Statische Website (HTML/CSS/JS, kein Build-Schritt) für GitHub Pages. Keine externen Ressourcen: Schriften liegen lokal (SIL OFL 1.1), keine Cookies, kein Tracking. Regeln und Entscheidungen stehen in `CLAUDE.md`.

- `index.html` + `assets/site.css` + `assets/site.js` – Startseite (Design nach Vorlage lpas.com, eigene Inhalte; funktioniert auch ohne JavaScript)
- `impressum.html`, `datenschutz.html`, `style.css` – Rechtstexte (nutzen noch das alte Stylesheet)
- `beispiel/` – Muster-Website „Malerwerkstatt Musterle“ (erfundener Betrieb, als Beispiel gekennzeichnet, `noindex`)
- `brand_assets/` – Logo und Marken-Tokens
- `images/` – Bilder, `images/placeholder/` für Platzhalter
- `docs/` – Referenz-Analyse, Bewertungen, Ideen

Nicht im Repo (siehe `.gitignore`): `_briefe/` (Briefgenerator mit Firmendaten, gehört in ein privates Repo), `referenz/`, Obsidian-Vault.

**Lokal ansehen:** `python -m http.server 8765 --bind 127.0.0.1` und dann http://localhost:8765 öffnen.

**Noch nicht online schalten:** Im Impressum fehlen Telefonnummer, endgültige Rechtsform und ggf. USt-IdNr. Danach `noindex` auf den Hauptseiten entfernen (die Muster-Website behält es). Vor Veröffentlichung `python scripts/security_check.py` ausführen und mit `python scripts/build_public.py` ein geprüftes Paket unter `dist/` erzeugen. Nur dieses Paket veröffentlichen; der Repo-Root enthält interne Arbeitsdateien. Das Hosting ist noch nicht auf diesen Export umgestellt. Vorher prüfen, dass alle benötigten öffentlichen Dateien in `scripts/public-files.json` stehen und versioniert sind. Alte Git-Commits können weiterhin interne Daten enthalten.

**Review und Zusammenarbeit:** siehe `docs/agenten-zusammenarbeit.md`. Die tägliche lokale Sicherheitsprüfung ist in der Codex-App eingerichtet; Prüfberichte liegen unter `docs/` und gehören nicht ins öffentliche Exportpaket.
