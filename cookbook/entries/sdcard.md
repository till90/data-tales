---
title: "microSD-Standards, Leistungsklassen und Einsatz im Dauerbetrieb"
date: 2025-12-17
tags: [microsd,storage,sdhc,sdxc,endurance]
summary: "Referenz zu microSD-Standards, Geschwindigkeitsklassen und Kriterien für zuverlässigen Einsatz im Dauerbetrieb."
---

## Kurzfassung
- microSD unterscheidet sich primär nach **Kapazitätsstandard**, **Dateisystem** und **Geschwindigkeits-/Busklasse**.
- **Kompatibilität** ist geräteabhängig (SDHC vs. SDXC).
- Marketingangaben nennen oft **Lesegeschwindigkeit**, nicht garantierte **Schreibdauerleistung**.
- Für Daueraufzeichnung sind **Endurance/Industrial**-Karten vorgesehen.
- Verifikation durch **Kapazitäts- und Dauerschreibtests** ist empfohlen.

## Begriffe & Grundlagen
### Kapazitätsstandards
| Standard | Kapazität | Dateisystem (Standard) | Hinweis |
|---|---:|---|---|
| SDSC | bis 2 GB | FAT16 | ältester Standard |
| SDHC | >2–32 GB | FAT32 | weit verbreitet |
| SDXC | >32 GB–2 TB | exFAT | benötigt SDXC-fähige Geräte |
| SDUC | >2–128 TB | exFAT | selten, neu |

### Geschwindigkeits- & Busklassen
- **Speed Class**: C2 / C4 / C6 / **C10** (min. MB/s Schreiben; historisch)
- **UHS**: **UHS-I**, UHS-II, UHS-III (Bus/Pinout; höhere Maximalraten)
- **Video Speed Class**: V6 / V10 / **V30** / V60 / V90 (garantierte min. MB/s für Video)

### Endurance/Industrial
- Optimiert für **hohe Schreibzyklen** (z. B. Loop-Recording).
- Hersteller geben teils **Aufzeichnungsstunden** oder **TBW** an.
- Fokus auf **stabile Schreibgeschwindigkeit** und **Lebensdauer**, nicht Spitzenleistung.

## Entscheidungskriterien
- **Kompatibilität**: Gerät muss den Kapazitätsstandard (SDHC/SDXC) unterstützen.
- **Schreibdauerleistung**: Garantierte Mindestschreibrate (z. B. C10/U1 oder V30).
- **Einsatzprofil**:
  - sporadisch: Standardkarten ausreichend
  - kontinuierlich: Endurance/Industrial
- **Transparenz**: Klare Spezifikationen (Garantie, Haltbarkeitsangaben).
- **Qualitätssicherung**: Etablierte Lieferkette und Rückgabemöglichkeit.

## Vorgehen
1. **Standard festlegen** (SDHC vs. SDXC) gemäß Gerätehandbuch.
2. **Mindestklasse wählen** (C10/U1 für Full HD; höhere Klassen bei Bedarf).
3. **Einsatzprofil prüfen** (Dauerbetrieb → Endurance/Industrial).
4. **Dateisystem beachten** (FAT32 vs. exFAT; ggf. Neuformatierung).
5. **Chargenprüfung planen** (Stichproben testen).

## Prüfungen & Tests
- **Kapazitätstest**: Vollständiges Beschreiben/Lesen der Karte.
- **Dauerschreibtest**: Mehrstündiges kontinuierliches Schreiben.
- **Geschwindigkeitstest**: Verifikation der Mindestschreibrate.
- **Stabilität**: Wiederholtes Mount/Unmount, Fehlerprotokolle prüfen.

## Stolperfallen
- Verwechslung von **Maximal-Leseangaben** mit garantierter Schreibleistung.
- **No-Name-Bulk** ohne verifizierbare Spezifikationen.
- Fehlende **Endurance-Eignung** bei Daueraufzeichnung.
- **exFAT** auf Geräten ohne SDXC-Unterstützung.
- Ungetestete Serienabweichungen innerhalb einer Charge.

## Referenzen & Links
- https://www.idealo.de/
- https://semiconductor.samsung.com/consumer-storage/memory-card/micro-sd-pro-endurance/
- https://shop.sandisk.com/products/memory-cards/microsd-cards/sandisk-high-endurance-uhs-i-microsd
- https://forum.level1techs.com/
- https://www.reddit.com/r/raspberry_pi/
- https://dashcamtalk.com/
- https://cansonic.com/blogs/news/how-to-select-the-best-sd-card-for-your-dash-cam
- https://bulkmemorycards.com/

## Offene Punkte
- TODO: Konkrete Mindestklasse für 4K je nach Codec/Bitrate festlegen.
- TODO: Einheitliche Testprozedur (Tools, Dauer, Akzeptanzkriterien) dokumentieren.
