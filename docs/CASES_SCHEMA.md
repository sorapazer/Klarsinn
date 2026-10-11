# Klarsinn – interaktive Fallstudien (1 je Modul)

Datei beginnt mit: `window.KS_CASES = window.KS_CASES || [];`
Je Fall: `window.KS_CASES.push({ ... });`

```js
{
  n: 2,                                  // Modulnummer
  title: "Mara und der Dauerstress",     // Titel
  person: "Mara, 38, Projektleiterin, zwei Kinder",   // fiktive Person (Vorname, Alter, Lebenssituation)
  intro: "Ausgangslage als Geschichte, 140–200 Wörter, konkret und lebensnah. Kein Gedankenstrich als Stilmittel.",
  steps: [                               // genau 4 Entscheidungsschritte, die aufeinander aufbauen
    {
      situation: "Was jetzt passiert (60–110 Wörter).",
      question: "Was wäre jetzt der hilfreichste nächste Schritt?",
      options: [                         // genau 3 Optionen, Reihenfolge der besten Option variieren
        { t: "Option (1–2 Sätze)", score: 2, fb: "Fachliche Rückmeldung, 2–4 Sätze, warum das hilft, mit [[key]]." },
        { t: "…", score: 1, fb: "Teilweise hilfreich, weil … aber …" },
        { t: "…", score: 0, fb: "Typischer Fehler, weil … [[key]]" }
      ]
    }
  ],
  outro: "Wie es weitergeht (80–130 Wörter), realistisch, nicht kitschig.",
  principles: ["Lernprinzip 1", "Lernprinzip 2", "Lernprinzip 3"],    // 3 übertragbare Prinzipien
  refs: ["alle", "zitierten", "keys"]
}
```

Regeln: Deutsch, du-Form (klein), fachlich präzise, warm, keine Klischees. Die Fälle sollen realistisch sein, verschiedene Lebenslagen, Altersgruppen und Geschlechter abbilden und die Methoden des Moduls (siehe js/weeks-*.js, js/deep-*.js, js/master-*.js) anwenden. Keine Gedankenstriche „—“ als Stilmittel, nur deutsche Anführungszeichen „…“ im Text. NUR Quellen-Schlüssel aus js/refs.js, keine erfundenen Zahlen. Wo es inhaltlich passt (z. B. Suizidgedanken, schwere Depression, Trauma), soll eine Option an professionelle Hilfe verweisen und diese als richtig bewertet werden; das Programm ersetzt keine Therapie.
