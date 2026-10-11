# Klarsinn – Vertiefungspaket je Modul (für die Varianten 6 und 12 Monate)

Datei beginnt mit: `window.KS_DEEP = window.KS_DEEP || [];`
Je Modul: `window.KS_DEEP.push({ ... });`

```js
window.KS_DEEP.push({
  n: 1,                                   // Modulnummer (= Woche im 12-Wochen-Programm)
  deep: [                                 // 3 Vertiefungskapitel, NEUE Aspekte (nicht wiederholen, was in der Lernwoche steht!), je 180–280 Wörter
    { h: "Überschrift", body: "<p>… [[key]] …</p>", evidence: { label: "Was die Forschung zeigt", text: "… [[key]]" } }  // evidence bei mind. 2 Kapiteln
  ],
  quiz2: [ { q: "…?", options: ["…","…","…"], correct: 0, explain: "… [[key]]" } ],   // 4 neue Fragen zu den Vertiefungskapiteln
  practices: [                            // 2 zusätzliche angeleitete Übungen (andere als in der Lernwoche)
    { title: "…", duration: "10 Min.", intro: "…", steps: ["…", "… (5–8)"] }
  ],
  ueben:     { focus: "1–2 Sätze: Worum geht es in der Übungswoche?",     tasks: [ {title, desc, freq} ×6 ], reflection: ["…" ×3] },
  vertiefen: { focus: "1–2 Sätze: Worum geht es in der Vertiefungswoche?", tasks: [ {title, desc, freq} ×6 ], reflection: ["…" ×3] },
  verankern: { focus: "1–2 Sätze: Gewohnheit dauerhaft verankern, Alltagstransfer, Hindernisse", tasks: [ {title, desc, freq} ×6 ], reflection: ["…" ×3] },
  refs: ["alle", "zitierten", "keys"]
});
```

freq: "täglich" | "einmalig" | "2× diese Woche" | "3× diese Woche" | "5× diese Woche"

Regeln wie CONTENT_SCHEMA.md: Deutsch, du-Form (klein), keine Gedankenstriche „—“ als Stilmittel, nur deutsche Anführungszeichen „…“ im Text, NUR Quellen-Schlüssel aus js/refs.js, keine erfundenen Zahlen. Aufgaben sollen sich über die drei Wochen steigern (üben → vertiefen → verankern) und die Werkzeuge des Moduls nutzen (Werkzeug-IDs stehen in der Lernwoche unter `tools`).
