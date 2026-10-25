# Referenz-Analyse: lpas.com (Startseite)

Stand: 25.10.2026 · Analysiert im Browser-Pane bei 1440px und 375px.
Übernommen werden **Layout, Abstände, Schriftgrößen und Effekte**. Nicht übernommen: Texte, Fotos, Videos, Logo, die Schrift Aeonik (kommerziell) und die Skripte der Seite (GSAP, Lenis, Swup). Alles ist eigener Code mit eigenen Inhalten.

> Vorher wurde die Unterseite `/markets/higher-education/` analysiert. Yunus hat klargestellt, dass die **Startseite** die Vorlage ist. Diese Datei ersetzt die alte Analyse.

---

## Aufbau der Startseite

| # | Referenz | Maße (Desktop 1440px) | Bei uns |
|---|----------|----------------------|---------|
| 0 | Ladebildschirm, 4 Wörter | Vollbild, dunkel | „Prüfen. Planen. Bauen. Begleiten.“ |
| 1 | **Fixierter Hero mit Panels**: Hintergrundvideo links (1240px breit), 3 kleine Labels auf ~49 % Höhe, H1 75px unten links. Rechts ragt ein Panel-Streifen herein; beim Scrollen fahren **5 Panels** (je 771px breit: Bild oben, farbiges Band 285px unten) nach links über den Hero | Pin-Strecke ca. 4.300px | Teamfoto-Platzhalter als Hintergrund. 5 Panels = unsere Leistungen: Webseiten, Sichtbar, KI-Assistent, Automatisierung, Fachkräfte. Panel-Farben `#625653`, `#925434`, `#C9D3DF`, `#707569`, `#E3C1AA` wie in der Vorlage |
| 2 | **Intro**: H2 56px (658px breit), darunter kleines Label links + Fließtext ab 25 % Breite + Pfeil-Link | 200px Abstand nach dem Hero | „Über uns“ mit eigenem Text, Link „Kurz-Check anfragen“ |
| 3 | **Projekte**: H2 38px, darunter „Alle“-Link links und Filterleiste rechts (Bereiche mit hochgestellter Anzahl). Raster: großes Bild + 2 kleine (unten bündig), zweite Reihe gespiegelt | 100px Abstand | Muster-Website „Musterle“ + Platzhalter für Pilot- und KI-Projekte. Filter = unsere 5 Leistungen |
| 4 | **Neuigkeiten-Liste**: H2 28px mit Linie, Zeilen mit Titel / Kurztext grau / Datum / Pfeil, darunter „Alle“-Link | Zeilenhöhe 58px | „Aktuelles“: Pilotprogramm, Muster-Website, 2 Platzhalter |
| 5 | **Footer**: Vollbild-Bild mit großer Bereichsliste (50px), darunter dunkler Bereich mit Navigation, Kontaktblöcken, Rechtlichem | 900px + Rest | wie zuvor, mit Stuttgarter Anschrift, E-Mail, „Adresse kopieren“, Impressum, Datenschutz |

**Header:** Logo links, rechts Menü-Button. Beim Scrollen blendet das Logo aus, nur der Menü-Button bleibt. Bei uns zusätzlich **DE | EN** (blendet mit dem Logo aus).

## Design-Werte

- **Schrift:** Referenz nutzt eine Schrift in Regular. Bei uns **Archivo** (lokal). Stufen: 75 / 56 / 50 / 38 / 28 / 16 / 14 / 12px.
- **Farben:** Text `#111111`, `#262626`; Grau `#747474`, `#A3A3A3`; Linien `#D6D6D6`; Footer `#262626`. Panel-Farben siehe oben. **Noch nicht auf Petrol/Amber umgestellt** – alle Werte stehen als Tokens oben in `assets/site.css`.
- **Abstände:** Seitenrand 50px, Raster-Lücke 10px, Sektionsabstände 100–200px.
- **Effekte:** fixierter Hero mit seitlich fahrenden Panels (eigenes JS), Bild-Zoom beim Hover, unterstrichene Pfeil-Links, Einblenden beim Scrollen. `prefers-reduced-motion` wird respektiert.

## Mobile

Auf dem Handy wird nichts fixiert: Hero oben, die 5 Panels stehen untereinander, alle Raster einspaltig. Kein horizontales Scrollen (geprüft bei 375px).

## Offene Punkte

1. **Markenfarben:** Grautöne und Panel-Farben auf Petrol `#123B40` / Amber `#E39A2D` umstellen?
2. **Länge:** Die Seite hat jetzt 4 Inhaltsbereiche plus Footer. Das passt zur Regel „max. 6 Sektionen“. Team und Ablauf fehlen noch und kommen mit euren Ideen dazu.
3. **Echte Bilder:** Teamfoto, Bilder pro Leistung, Projektbilder.
