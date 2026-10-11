# Klarsinn – Masterclass-Lektionen (3 je Modul, Tiefe: Theorie + Modell + Übung)

Datei beginnt mit: `window.KS_MASTER = window.KS_MASTER || [];`
Je Modul: `window.KS_MASTER.push({ n: <Modul>, lessons: [ L1, L2, L3 ] });`

```js
{
  id: "2a",                               // Modulnummer + a/b/c
  title: "Das transaktionale Stressmodell", // Titel der Lektion (Name der Theorie/des Themas)
  subtitle: "Warum dieselbe Situation den einen stresst und den anderen nicht",
  theory: "Lazarus & Folkman",            // Urheber/Schule, kurz
  lead: "2–3 Sätze Einstieg: Warum lohnt es sich, diese Theorie zu verstehen?",
  input: [                                // 5 Kapitel, je 220–320 Wörter, echte Tiefe: Entstehung, Kernannahmen, Mechanismen, Evidenz, Kritik/Grenzen, Anwendung
    { h: "…", body: "<p>… [[key]] …</p>", evidence: { label: "Was die Forschung zeigt", text: "… [[key]]" } }   // evidence bei mind. 2 Kapiteln
  ],
  model: {                                // interaktives Modell-Diagramm: Nutzer:innen klicken Knoten an und lesen die Erklärung
    type: "cycle",                        // "cycle" (Kreislauf, 3–6 Knoten), "steps" (Abfolge, 3–6), "matrix" (2×2, genau 4 Knoten: oben links, oben rechts, unten links, unten rechts), "layers" (Ebenen, 3–5, von oben nach unten), "scale" (Kontinuum, 3–5, von links nach rechts)
    title: "Kurzer Titel des Modells",
    caption: "1 Satz, was das Diagramm zeigt",
    nodes: [ { label: "max. 3 Wörter", text: "2–3 Sätze Erklärung, gern mit Alltagsbeispiel" } ],
    axes: { x: ["links", "rechts"], y: ["unten", "oben"] }   // nur bei matrix
  },
  practice: { title: "…", duration: "10 Min.", intro: "…", steps: ["… (6–8 Schritte)"] },   // Übung, die direkt aus der Theorie folgt
  quiz: [ { q: "…?", options: ["…","…","…","…"], correct: 2, explain: "… [[key]]" } ],     // 3 anspruchsvolle Verständnisfragen (Anwendung, nicht nur Faktenabfrage)
  transfer: "Ein konkreter Alltagsauftrag für die nächsten Tage (1–2 Sätze).",
  refs: ["alle", "zitierten", "keys"]
}
```

Regeln: Deutsch, du-Form (klein), fachlich präzise und tief, aber verständlich. Keine Gedankenstriche „—“ als Stilmittel, nur deutsche Anführungszeichen „…“ im Text (keine ASCII-Doppelanführungszeichen in Strings). NUR Quellen-Schlüssel aus js/refs.js (inkl. der neuen Einträge am Ende der Datei). Keine erfundenen Zahlen; Zahlen nur, wenn du sie sicher aus der Quelle kennst, sonst qualitativ. Kritik und Grenzen einer Theorie offen benennen (z. B. Polyvagal-Theorie ist umstritten: Grossman & Taylor 2007). Inhalte der bestehenden Lern- und Vertiefungslektionen (js/weeks-*.js, js/deep-*.js) nicht wiederholen, sondern ergänzen.
