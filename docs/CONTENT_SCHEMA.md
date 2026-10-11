# Klarsinn – Inhaltsschema für eine Woche

Datei beginnt mit: `window.KS_WEEKS = window.KS_WEEKS || [];`
Jede Woche: `KS_WEEKS.push({ ... });`

```js
KS_WEEKS.push({
  n: 1,                       // Wochennummer
  title: "Ankommen",          // kurz, 1–3 Wörter
  subtitle: "Was mentale Gesundheit wirklich ist",  // ein Satz/Phrase
  phase: 1,                   // 1 Fundament (W1–3), 2 Lebensstil (W4–6), 3 Gedanken & Gefühle (W7–9), 4 Verbindung & Richtung (W10–12)
  minutes: "15–20 Min. pro Tag",
  lead: "2–4 Sätze Einstieg, warm, direkt, Du-Form.",
  goals: ["Lernziel 1", "… (3–4 Ziele)"],
  input: [                    // 5–6 Wissenskapitel, jedes substanziell (180–320 Wörter)
    { h: "Kapitelüberschrift",
      body: "<p>Absatz … mit Quellen als [[key]] …</p><p>…</p>",   // nur <p>, <strong>, <em>, <ul><li>, <ol><li> erlaubt
      evidence: { label: "Was die Forschung zeigt", text: "1–3 Sätze mit konkretem Befund (Effektstärke, Stichprobe, Design) und [[key]]" }  // optional, bei mind. 3 Kapiteln
    }
  ],
  myth: { myth: "Verbreiteter Irrtum", fact: "Richtigstellung mit [[key]]" },
  takeaways: ["Kernaussage 1", "… (4–5)"],
  practice: {                 // angeleitete Übung (Text, Schritt für Schritt)
    title: "Name der Übung", duration: "10 Min.",
    intro: "1–2 Sätze, warum",
    steps: ["Schritt 1 …", "… (5–8 Schritte)"]
  },
  tools: ["checkin", "ifthen"],   // VORGEGEBEN, siehe unten
  toolIntro: "1–2 Sätze, wozu die interaktiven Werkzeuge dieser Woche dienen.",
  tasks: [                    // 6–7 konkrete Wochenaufgaben
    { title: "Kurztitel", desc: "Konkrete Anleitung, 1–2 Sätze", freq: "täglich" }   // freq: "täglich" | "einmalig" | "3× diese Woche" | "2× diese Woche" | "5× diese Woche"
  ],
  reflection: ["Reflexionsfrage 1", "… (4 Fragen)"],
  quiz: [                     // 4 Fragen, je 3–4 Optionen
    { q: "Frage?", options: ["A", "B", "C"], correct: 1, explain: "Erklärung mit [[key]]" }
  ],
  refs: ["key1", "key2"]      // alle in dieser Woche zitierten Schlüssel
});
```

## Regeln
- Sprache: Deutsch, Du-Form, fachlich präzise, aber verständlich. Professionell, warm, kein Kitsch, keine Emojis.
- Keine Gedankenstriche als Stilmittel (keine „—“-Einschübe). Kurze, klare Sätze.
- Zitiere NUR Schlüssel aus `js/refs.js`. Erfinde keine Quellen, keine Zahlen, die nicht in der Quelle stehen. Wenn unsicher über eine Zahl, formuliere qualitativ.
- Nicht heilversprechend; an passender Stelle: Programm ersetzt keine Therapie.
- Strings in doppelten Anführungszeichen; deutsche Anführungszeichen „…“ im Text verwenden (keine " im Text). Apostrophe ok.
- Datei muss mit `node -e "global.window={};require('./datei.js')"` fehlerfrei laden.

## Interaktive Werkzeuge (IDs, werden von der App gebaut)
- checkin: täglicher Stimmungs-Check-in (Stimmung 1–10, Energie, Stress, Notiz) mit Verlaufskurve
- ifthen: Wenn-dann-Planer (Implementation Intentions), speichert Pläne
- who5: WHO-5-Wohlbefindens-Index (Fragebogen)
- stressmap: Stress-Landkarte: Stressoren notieren, als veränderbar / nicht veränderbar einordnen, Bewältigungsweg (problemorientiert / emotionsorientiert) zuordnen
- breath: Atem-Taktgeber mit Mustern (Resonanzatmung 5,5/min, 4-6-Atmung, Box 4-4-4-4, physiologischer Seufzer)
- grounding: 5-4-3-2-1-Erdung, interaktiv Schritt für Schritt
- pmr: Progressive Muskelentspannung, geführter Timer durch Muskelgruppen
- sleeplog: Schlaftagebuch mit Berechnung der Schlafeffizienz
- activity: Aktivitätenplaner (Aktivität planen, Freude & Erfolg 0–10 bewerten, Bewegungsminuten)
- timer: Meditations-Timer mit Klangschale
- thoughts: Gedankenprotokoll (Situation, Gefühl %, automatischer Gedanke, Denkfalle, Belege dafür/dagegen, ausgewogener Gedanke, Gefühl danach %)
- worry: Sorgen-Parkplatz & Sorgenzeit + Entscheidungsbaum „lösbar?“
- defusion: Defusions-Übung (Gedanke eingeben → „Ich bemerke, dass ich den Gedanken habe, dass …“, Gedanken auf Blätter im Fluss)
- problem: 6-Schritte-Problemlöse-Assistent
- emotions: Gefühls-Finder (Gefühlswörter nach Familie, Intensität, Bedürfnis, Handlungsimpuls)
- writing: Expressives Schreiben (20-Minuten-Timer, privat)
- letter: Mitfühlender Brief an mich selbst
- circles: Beziehungskreise (innerer, mittlerer, äußerer Kreis)
- imessage: Ich-Botschaften-Baukasten (Beobachtung, Gefühl, Bedürfnis, Bitte)
- gratitude: Dankbarkeits- & Drei-gute-Dinge-Tagebuch
- values: Werte-Sortierung (Kartenstapel: sehr wichtig / wichtig / weniger wichtig) + Werte-Kompass
- plan: Mein persönlicher Kompass-Plan (Frühwarnzeichen, hilfreiche Strategien, Menschen, Notfallkontakte)
