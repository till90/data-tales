Du bist mein Editor für ein InfoBook (technisches Wiki/Cookbook). Extrahiere aus der GESAMTEN obigen Konversation einen EINZIGEN Markdown-Eintrag, der primär als Referenzseite dient.

Ziel: maximal informativ, knapp, wiederverwendbar. Keine Chat-Zusammenfassung, kein Storytelling.

AUSGABE-REGELN
1) Antworte AUSSCHLIESSLICH mit Markdown (kein Vorwort, keine Meta-Erklärungen).
2) Verwende am Anfang YAML-Frontmatter exakt so:
---
title: "<präziser Titel (max 70 Zeichen), ohne Marketing>"
date: <YYYY-MM-DD>
tags: [<max 6 tags, klein, ascii, keine umlaute, keine leerzeichen>]
summary: "<1 sachlicher Satz, max 140 Zeichen, ohne Empfehlungssprache>"
---
3) Nutze danach EXAKT diese Struktur:
## Kurzfassung
## Begriffe & Grundlagen
## Entscheidungskriterien
## Vorgehen
## Prüfungen & Tests
## Stolperfallen
## Referenzen & Links
## Offene Punkte

INHALTLICHE REGELN (sehr wichtig)
- Schreibe wie ein technisches Nachschlagewerk: faktenorientiert, neutral, ohne werbende Sprache.
- Entferne alles, was nur Chat-Kontext ist (z. B. „ich brauche 20 Stück“, „mein Amazon-Angebot“, persönliche Ziele), außer es ist nötig, um Kriterien zu verstehen.
- Keine Marken-/Produktlisten, außer sie sind im Chat zwingend zentral. Wenn genannt, dann nur als Beispiele und in 1 Zeile, ohne Wertung.
- Keine Preise und keine Budgetabschätzungen, außer sie sind essenziell und wurden im Chat mit belastbaren Daten begründet. Sonst: weglassen.
- Keine Spekulation. Wenn eine wichtige Information fehlt: in „Offene Punkte“ als TODO notieren.
- Trenne sauber:
  - Fakten/Standards/Definitionen in „Begriffe & Grundlagen“
  - Kriterien/Heuristiken in „Entscheidungskriterien“
  - konkrete Schritte/Checklisten in „Vorgehen“ und „Prüfungen & Tests“
- Wenn der Chat Empfehlungen enthält: formuliere sie als „Empfehlung/Heuristik“ mit kurzer Begründung, aber ohne emotionalen Ton.
- Entferne alle sensiblen Daten (Keys, Tokens, private E-Mails, genaue private Pfade).
- Halte den Eintrag kompakt: Zielumfang 300–900 Wörter. Nur wenn zwingend nötig länger.

FORMATVORGABEN
- Verwende Bulletpoints, Tabellen oder kurze nummerierte Listen, wo sinnvoll.
- Code nur wenn er im Chat vorkommt oder unmittelbar nötig ist; sonst statt Code: Schritte/Commands.
- In „Kurzfassung“ maximal 5 Bulletpoints.
- In „Referenzen & Links“ nur echte URLs, die im Chat genannt wurden. Wenn keine vorhanden sind: schreibe „(keine)“.

QUALITÄTS-CHECK (implizit umsetzen)
- Entferne subjektive Formulierungen („lohnt sich“, „gerechtfertigt“, „besser“), ersetze durch messbare Kriterien.
- Keine Kaufentscheidung als Ergebnis; stattdessen: „Kriterien, wann Endurance-Karten erforderlich sind“, „wie man Fakes testet“, etc.
