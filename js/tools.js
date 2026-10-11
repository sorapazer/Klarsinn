/* Klarsinn – interaktive Werkzeuge */
(function () {
  const KS = window.KS;
  const esc = KS.esc;
  const T = (KS.tools = {});
  const order = [];
  function reg(t) { T[t.id] = t; order.push(t.id); }
  KS.toolOrder = order;

  /* gemeinsame Bausteine */
  function scale(name, n, from, val, labels) {
    let s = '<div class="scale" style="--n:' + n + '" role="radiogroup" data-scale="' + name + '">';
    for (let i = 0; i < n; i++) {
      const v = from + i;
      s += '<button type="button" role="radio" aria-checked="' + (val === v) + '" class="' + (val === v ? "on" : "") + '" data-v="' + v + '">' + (labels ? labels[i] : v) + "</button>";
    }
    return s + "</div>";
  }
  function bindScale(el, name, cb) {
    const g = el.querySelector('[data-scale="' + name + '"]'); if (!g) return;
    g.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      g.querySelectorAll("button").forEach((x) => { x.classList.remove("on"); x.setAttribute("aria-checked", "false"); });
      b.classList.add("on"); b.setAttribute("aria-checked", "true"); cb(Number(b.dataset.v));
    });
  }
  function pills(name, items, selected, multi) {
    return '<div class="pills" data-pills="' + name + '" data-multi="' + (multi ? 1 : 0) + '">' + items.map((it) => '<button type="button" class="pill' + (selected.includes(it) ? " on" : "") + '" aria-pressed="' + selected.includes(it) + '">' + esc(it) + "</button>").join("") + "</div>";
  }
  function bindPills(el, name, arr) {
    const g = el.querySelector('[data-pills="' + name + '"]'); if (!g) return;
    const multi = g.dataset.multi === "1";
    g.addEventListener("click", (e) => {
      const b = e.target.closest(".pill"); if (!b) return;
      const v = b.textContent;
      if (!multi) { arr.length = 0; g.querySelectorAll(".pill").forEach((x) => { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); }); }
      const i = arr.indexOf(v);
      if (i >= 0) { arr.splice(i, 1); b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); }
      else { arr.push(v); b.classList.add("on"); b.setAttribute("aria-pressed", "true"); }
    });
  }
  function head(t, extra) {
    return '<div class="tool-h"><div><div class="eyebrow">' + esc(t.cat) + "</div><h3>" + esc(t.name) + "</h3><p>" + t.desc + "</p></div>" + (extra || "") + "</div>";
  }
  function entries(listName, render, empty, limit) {
    const l = KS.list(listName).slice(0, limit || 50);
    if (!l.length) return '<div class="empty">' + empty + "</div>";
    return '<div class="entries">' + l.map((e) => '<div class="entry"><button type="button" class="del" data-del="' + e.id + '" aria-label="Eintrag löschen">Löschen</button>' + render(e) + "</div>").join("") + "</div>";
  }
  function bindDel(el, listName, rerender) {
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-del]"); if (!b) return;
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Wirklich löschen?"; setTimeout(() => { if (b.isConnected) { b.dataset.confirm = ""; b.textContent = "Löschen"; } }, 3000); return; }
      KS.remove(listName, b.dataset.del); KS.toast("Eintrag gelöscht"); rerender();
    });
  }
  const val = (el, sel) => (el.querySelector(sel) || {}).value || "";
  function fmtClock(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
  function logPractice(kind, minutes) { if (minutes > 0) KS.add("practice", { kind, minutes: Math.round(minutes * 10) / 10, d: KS.today() }); }
  KS.logPractice = logPractice;

  /* ---------------- 1 Stimmungs-Check-in ---------------- */
  reg({
    id: "checkin", name: "Täglicher Check-in", cat: "Selbstbeobachtung", weeks: [1, 2, 5, 7, 9],
    desc: "Zwei Minuten am Tag: Stimmung, Energie und Stress auf einer Skala von 1 bis 10. Muster werden erst über Wochen sichtbar.",
    mount(el) {
      const today = KS.today();
      const list = KS.list("checkins");
      const ex = list.find((c) => c.d === today) || {};
      const st = { mood: ex.mood || null, energy: ex.energy || null, stress: ex.stress || null };
      const series = [
        { label: "Stimmung", color: "var(--accent)", area: true, values: list.filter((c) => c.mood).map((c) => ({ x: c.d, y: c.mood })) },
        { label: "Energie", color: "var(--glow)", values: list.filter((c) => c.energy).map((c) => ({ x: c.d, y: c.energy })) },
        { label: "Stress", color: "var(--crit)", dash: true, values: list.filter((c) => c.stress).map((c) => ({ x: c.d, y: c.stress })) }
      ];
      const avg = (k) => { const v = list.slice(0, 7).map((c) => c[k]).filter(Boolean); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1).replace(".", ",") : "–"; };
      el.innerHTML = head(this, ex.d ? '<span class="chip ok">Heute erledigt</span>' : '<span class="chip glow">Heute offen</span>') +
        '<div class="grid2"><div class="stack">' +
        '<div class="field"><span class="lbl">Stimmung <span class="faint">(1 sehr gedrückt · 10 sehr gut)</span></span>' + scale("mood", 10, 1, st.mood) + "</div>" +
        '<div class="field"><span class="lbl">Energie <span class="faint">(1 erschöpft · 10 voller Energie)</span></span>' + scale("energy", 10, 1, st.energy) + "</div>" +
        '<div class="field"><span class="lbl">Stress <span class="faint">(1 entspannt · 10 maximal angespannt)</span></span>' + scale("stress", 10, 1, st.stress) + "</div>" +
        '<div class="field"><label for="ci-note">Was hat deinen Tag geprägt?</label><textarea id="ci-note" placeholder="Ein, zwei Sätze genügen.">' + esc(ex.note || "") + "</textarea></div>" +
        '<div class="row"><button class="btn" type="button" data-save>' + (ex.d ? "Check-in aktualisieren" : "Check-in speichern") + "</button></div></div>" +
        '<div class="stack"><div class="row" style="justify-content:space-between"><span class="lbl">Letzte 4 Wochen</span><span class="row" style="gap:12px;font-size:.78rem"><span><i class="phase-dot" style="background:var(--accent)"></i> Stimmung</span><span><i class="phase-dot" style="background:var(--glow)"></i> Energie</span><span><i class="phase-dot" style="background:var(--crit)"></i> Stress</span></span></div>' +
        (list.length ? KS.lineChart(series, { min: 1, max: 10, ticks: [1, 4, 7, 10], label: "Stimmungsverlauf" }) : '<div class="empty">Nach deinem ersten Check-in erscheint hier deine Verlaufskurve. Ab etwa sieben Einträgen lassen sich Muster erkennen.</div>') +
        '<div class="kpis"><div class="kpi"><b>' + avg("mood") + '</b><span>Ø Stimmung (7 Einträge)</span></div><div class="kpi"><b>' + avg("energy") + '</b><span>Ø Energie</span></div><div class="kpi"><b>' + list.length + "</b><span>Check-ins gesamt</span></div></div></div></div>";
      ["mood", "energy", "stress"].forEach((k) => bindScale(el, k, (v) => (st[k] = v)));
      el.querySelector("[data-save]").onclick = () => {
        if (!st.mood) { KS.toast("Bitte wähle mindestens deine Stimmung aus"); return; }
        const note = val(el, "#ci-note");
        const i = list.findIndex((c) => c.d === today);
        const e = { id: ex.id || KS.uid(), at: new Date().toISOString(), d: today, mood: st.mood, energy: st.energy, stress: st.stress, note };
        if (i >= 0) list[i] = e; else list.unshift(e);
        list.sort((a, b) => (a.d < b.d ? 1 : -1)); KS.save(); KS.toast("Check-in gespeichert"); this.mount(el);
      };
    }
  });

  /* ---------------- 2 Wenn-dann-Pläne ---------------- */
  reg({
    id: "ifthen", name: "Wenn-dann-Planer", cat: "Gewohnheiten", weeks: [1, 12],
    desc: "Wenn-dann-Pläne verknüpfen ein neues Verhalten mit einem festen Auslöser. Das macht die Umsetzung messbar wahrscheinlicher.",
    mount(el) {
      const ideas = [["ich morgens den ersten Kaffee aufsetze", "mache ich meinen Stimmungs-Check-in"], ["ich mich abends ins Bett lege", "notiere ich drei gute Dinge des Tages"], ["ich merke, dass ich grüble", "stehe ich auf und gehe fünf Minuten an die frische Luft"], ["ich mittags vom Schreibtisch aufstehe", "atme ich zwei Minuten langsam (4 Sekunden ein, 6 aus)"]];
      el.innerHTML = head(this) +
        '<div class="grid2"><div class="stack"><div class="field"><label for="it-when">Wenn … <span class="faint">(Situation: Ort, Zeit oder Auslöser)</span></label><input type="text" id="it-when" placeholder="ich nach dem Mittagessen den Teller abstelle"></div>' +
        '<div class="field"><label for="it-then">dann … <span class="faint">(konkretes, kleines Verhalten)</span></label><input type="text" id="it-then" placeholder="gehe ich zehn Minuten um den Block"></div>' +
        '<div class="field"><label for="it-obst">Mögliches Hindernis und mein Plan B</label><input type="text" id="it-obst" placeholder="Wenn es regnet, dann gehe ich zehn Minuten Treppen."></div>' +
        '<div class="row"><button class="btn" type="button" data-save>Plan speichern</button></div></div>' +
        '<div class="stack"><span class="lbl">Beispiele zum Übernehmen</span>' + ideas.map((x, i) => '<button type="button" class="opt" data-idea="' + i + '"><b>Wenn</b> ' + esc(x[0]) + ", <b>dann</b> " + esc(x[1]) + ".</button>").join("") + "</div></div>" +
        '<h4 style="margin-top:22px">Meine Pläne</h4>' +
        entries("ifthen", (e) => '<span class="when">' + KS.fmtDT(e.at) + '</span><div><b>Wenn</b> ' + esc(e.when) + ", <b>dann</b> " + esc(e.then) + ".</div>" + (e.obst ? '<div class="faint">Plan B: ' + esc(e.obst) + "</div>" : "") + '<div class="row"><button type="button" class="btn small ghost" data-hit="' + e.id + '">Heute umgesetzt</button><span class="chip ok num">' + (e.hits || []).length + "× umgesetzt</span></div>", "Noch kein Plan. Formuliere oben deinen ersten oder übernimm ein Beispiel.");
      el.querySelectorAll("[data-idea]").forEach((b) => (b.onclick = () => { const x = ideas[b.dataset.idea]; el.querySelector("#it-when").value = x[0]; el.querySelector("#it-then").value = x[1]; }));
      el.querySelector("[data-save]").onclick = () => {
        const w = val(el, "#it-when").trim(), t = val(el, "#it-then").trim();
        if (!w || !t) { KS.toast("Bitte fülle Wenn und Dann aus"); return; }
        KS.add("ifthen", { when: w, then: t, obst: val(el, "#it-obst").trim(), hits: [] }); KS.toast("Plan gespeichert"); this.mount(el);
      };
      el.querySelectorAll("[data-hit]").forEach((b) => (b.onclick = () => {
        const e = KS.list("ifthen").find((x) => x.id === b.dataset.hit); e.hits = e.hits || [];
        if (!e.hits.includes(KS.today())) e.hits.push(KS.today()); KS.save(); KS.toast("Stark. Jede Wiederholung festigt die Gewohnheit."); this.mount(el);
      }));
      bindDel(el, "ifthen", () => this.mount(el));
    }
  });

  /* ---------------- 3 WHO-5 ---------------- */
  const WHO = ["… war ich froh und guter Laune.", "… habe ich mich ruhig und entspannt gefühlt.", "… habe ich mich energisch und aktiv gefühlt.", "… habe ich mich beim Aufwachen frisch und ausgeruht gefühlt.", "… war mein Alltag voller Dinge, die mich interessieren."];
  const WHOL = ["Zu keinem Zeitpunkt", "Ab und zu", "Etwas weniger als die Hälfte der Zeit", "Etwas mehr als die Hälfte der Zeit", "Meistens", "Die ganze Zeit"];
  KS.who5Band = function (s) {
    if (s <= 28) return { cls: "crit", t: "Deutlich reduziertes Wohlbefinden", d: "Ein Wert bis 28 kann auf eine depressive Episode hinweisen. Das ist keine Diagnose, aber ein klarer Grund, zeitnah mit deiner Hausärztin, deinem Hausarzt oder einer psychotherapeutischen Praxis zu sprechen. Du kannst das Programm parallel nutzen." };
    if (s <= 50) return { cls: "warn", t: "Reduziertes Wohlbefinden", d: "Werte bis 50 gelten als Hinweis auf ein eingeschränktes Wohlbefinden. Beobachte den Verlauf. Wenn der Wert niedrig bleibt oder du dich zunehmend belastet fühlst, lass dich fachlich beraten." };
    return { cls: "ok", t: "Gutes Wohlbefinden", d: "Dein Wert liegt im Bereich guten Wohlbefindens. Das Programm hilft dir, dieses Niveau zu stärken und widerstandsfähiger zu werden." };
  };
  reg({
    id: "who5", name: "WHO-5-Wohlbefindens-Index", cat: "Fragebogen", weeks: [1, 6, 12],
    desc: "Fünf Fragen der Weltgesundheitsorganisation zu den letzten zwei Wochen. Ein international geprüfter Kurzfragebogen, ideal für Start, Halbzeit und Abschluss.",
    mount(el) {
      const ans = [null, null, null, null, null];
      const hist = KS.list("who5");
      el.innerHTML = head(this) +
        '<p class="lbl">In den letzten zwei Wochen …</p>' +
        WHO.map((q, i) => '<div class="who-q"><div>' + (i + 1) + ". " + esc(q) + "</div>" + scale("w" + i, 6, 0, null, WHOL) + "</div>").join("") +
        '<div class="row" style="margin-top:12px"><button class="btn" type="button" data-save>Auswerten und speichern</button><span class="faint" data-left>Noch 5 Fragen offen</span></div>' +
        '<div data-res style="margin-top:18px"></div>' +
        (hist.length ? '<h4 style="margin-top:22px">Bisherige Messungen</h4><div class="entries">' + hist.map((h, i) => {
          const prev = hist[i + 1]; const diff = prev ? h.score - prev.score : null;
          return '<div class="entry"><span class="when">' + KS.fmtDT(h.at) + (h.label ? " · " + esc(h.label) : "") + '</span><div class="row"><b class="num" style="font-size:1.3rem">' + h.score + '</b><span class="faint">von 100</span><span class="chip ' + KS.who5Band(h.score).cls + '">' + KS.who5Band(h.score).t + "</span>" + (diff !== null ? '<span class="chip ' + (diff >= 10 ? "ok" : diff <= -10 ? "glow" : "") + ' num">' + (diff > 0 ? "+" : "") + diff + " Punkte</span>" : "") + "</div></div>";
        }).join("") + "</div>" : "");
      const left = el.querySelector("[data-left]");
      WHO.forEach((_, i) => bindScale(el, "w" + i, (v) => { ans[i] = v; const n = ans.filter((a) => a === null).length; left.textContent = n ? "Noch " + n + (n === 1 ? " Frage" : " Fragen") + " offen" : "Alle Fragen beantwortet"; }));
      el.querySelector("[data-save]").onclick = () => {
        if (ans.some((a) => a === null)) { KS.toast("Bitte beantworte alle fünf Fragen"); return; }
        const score = ans.reduce((a, b) => a + b, 0) * 4;
        const w = KS.currentWeek ? KS.currentWeek() : null;
        KS.add("who5", { score, answers: ans.slice(), d: KS.today(), label: w ? "Programmwoche " + w : "" });
        const b = KS.who5Band(score);
        el.querySelector("[data-res]").innerHTML = '<div class="panel stack"><div class="row"><b class="num" style="font-family:var(--f-display);font-size:2.4rem">' + score + '</b><span class="faint">von 100</span><span class="chip ' + b.cls + '">' + b.t + '</span></div><div class="gauge"><div class="track"><span class="mark" style="left:' + score + '%"></span></div><div class="ticks"><span>0</span><span>28</span><span>50</span><span>100</span></div></div><p class="muted" style="margin:0">' + b.d + "</p>" + (score <= 28 ? '<a class="btn danger small" href="#hilfe">Hilfsangebote ansehen</a>' : "") + '<p class="faint" style="margin:0;font-size:.82rem">Eine Veränderung um 10 Punkte oder mehr gilt als bedeutsam. Quelle: ' + KS.cite("[[topp2015]]") + "</p></div>";
        KS.toast("Ergebnis gespeichert");
        setTimeout(() => { const r = el.querySelector("[data-res]").innerHTML; this.mount(el); el.querySelector("[data-res]").innerHTML = r; }, 50);
      };
    }
  });

  /* ---------------- 4 Stress-Landkarte ---------------- */
  reg({
    id: "stressmap", name: "Stress-Landkarte", cat: "Stress", weeks: [2],
    desc: "Sortiere deine Belastungen danach, ob du sie beeinflussen kannst. Veränderbares braucht einen nächsten Schritt, Unveränderbares einen guten Umgang.",
    mount(el) {
      const st = { ctrl: null };
      const l = KS.list("stressors");
      const col = (key, title, sub, hint) => {
        const items = l.filter((s) => s.ctrl === key);
        return '<div class="panel stack" style="background:var(--bg)"><div><h4>' + title + '</h4><p class="faint" style="margin:2px 0 0;font-size:.85rem">' + sub + "</p></div>" +
          (items.length ? items.map((s) => '<div class="entry"><button type="button" class="del" data-del="' + s.id + '">Löschen</button><div class="row"><b>' + esc(s.text) + '</b><span class="chip num">Belastung ' + s.load + '/10</span></div><label class="faint" style="font-size:.8rem" for="sm-' + s.id + '">' + hint + '</label><input type="text" id="sm-' + s.id + '" data-step="' + s.id + '" value="' + esc(s.step || "") + '" placeholder="Hier eintragen …"></div>').join("") : '<div class="empty">Noch nichts eingeordnet.</div>') + "</div>";
      };
      el.innerHTML = head(this) +
        '<div class="panel stack" style="background:var(--bg)"><div class="grid2"><div class="field"><label for="sm-text">Was belastet dich gerade?</label><input type="text" id="sm-text" placeholder="z. B. Abgabetermin Freitag, Streit mit Bruder, Lärm"></div>' +
        '<div class="field"><label for="sm-load">Wie stark? <span class="faint" data-lv>5/10</span></label><input type="range" id="sm-load" min="1" max="10" value="5"></div></div>' +
        '<div class="field"><span class="lbl">Kann ich daran etwas ändern?</span>' + pills("ctrl", ["Ja, ganz oder teilweise", "Nein, kaum"], [], false) + "</div>" +
        '<div class="row"><button class="btn" type="button" data-save>Einordnen</button></div></div>' +
        '<div class="grid2" style="margin-top:14px">' +
        col("yes", "Veränderbar", "Problemorientiert bewältigen: Was ist der kleinste nächste Schritt?", "Mein nächster konkreter Schritt") +
        col("no", "Kaum veränderbar", "Emotionsorientiert bewältigen: Was hilft mir, gut damit umzugehen?", "Was mir dabei hilft (z. B. Bewegung, reden, Akzeptanz)") + "</div>";
      const sel = [];
      bindPills(el, "ctrl", sel);
      const r = el.querySelector("#sm-load"); r.oninput = () => (el.querySelector("[data-lv]").textContent = r.value + "/10");
      el.querySelector("[data-save]").onclick = () => {
        const t = val(el, "#sm-text").trim(); if (!t || !sel.length) { KS.toast("Bitte Belastung eintragen und einordnen"); return; }
        KS.add("stressors", { text: t, load: Number(r.value), ctrl: sel[0].startsWith("Ja") ? "yes" : "no", step: "" }); this.mount(el);
      };
      el.querySelectorAll("[data-step]").forEach((i) => (i.onchange = () => { const s = l.find((x) => x.id === i.dataset.step); s.step = i.value; KS.save(); KS.toast("Gespeichert"); }));
      bindDel(el, "stressors", () => this.mount(el));
      void st;
    }
  });

  /* ---------------- 5 Atem-Taktgeber ---------------- */
  const PAT = {
    resonanz: { name: "Resonanzatmung", info: "5,5 Sekunden ein, 5,5 aus. Etwa 5,5 Atemzüge pro Minute, nahe der Frequenz, bei der die Herzratenvariabilität am stärksten schwingt.", ph: [["Einatmen", 5.5, 1], ["Ausatmen", 5.5, 0]] },
    "4-6": { name: "4-6-Atmung", info: "Die längere Ausatmung betont den beruhigenden Anteil des Nervensystems. Gut für den Alltag und vor dem Schlafen.", ph: [["Einatmen", 4, 1], ["Ausatmen", 6, 0]] },
    seufzer: { name: "Zyklisches Seufzen", info: "Durch die Nase tief einatmen, kurz nachatmen bis die Lunge ganz gefüllt ist, dann lang durch den Mund ausatmen. In einer Studie verbesserte es nach fünf Minuten täglich die Stimmung besonders deutlich.", ph: [["Tief einatmen", 3, 0.85], ["Nachatmen", 1.2, 1], ["Lang ausatmen", 6.5, 0]] },
    box: { name: "Box-Atmung", info: "4 Sekunden ein, 4 halten, 4 aus, 4 halten. Strukturiert und gut, um sich in angespannten Momenten zu sammeln.", ph: [["Einatmen", 4, 1], ["Halten", 4, 1], ["Ausatmen", 4, 0], ["Halten", 4, 0]] }
  };
  reg({
    id: "breath", name: "Atem-Taktgeber", cat: "Körper & Entspannung", weeks: [3, 4],
    desc: "Langsames Atmen mit verlängerter Ausatmung beruhigt messbar Herzschlag und Erregung. Folge einfach dem Kreis.",
    mount(el) {
      let pat = "resonanz", mins = 5, run = null;
      const draw = () => {
        el.innerHTML = head(this) +
          '<div class="row" style="justify-content:center;margin-bottom:6px"><div class="seg" data-pat>' + Object.keys(PAT).map((k) => '<button type="button" data-k="' + k + '" class="' + (k === pat ? "on" : "") + '">' + PAT[k].name + "</button>").join("") + "</div></div>" +
          '<p class="muted" style="text-align:center;max-width:60ch;margin:6px auto 0;font-size:.92rem">' + PAT[pat].info + "</p>" +
          '<div class="breath"><div class="orb-wrap"><div class="orb" data-orb></div><div class="orb-label" data-lbl>Bereit<small>' + mins + ' Minuten</small></div></div>' +
          '<div class="row" style="justify-content:center"><div class="seg" data-min>' + [1, 3, 5, 10].map((m) => '<button type="button" data-m="' + m + '" class="' + (m === mins ? "on" : "") + '">' + m + " Min.</button>").join("") + '</div></div>' +
          '<div class="row" style="justify-content:center"><button class="btn" type="button" data-go>Starten</button><label class="row" style="gap:6px;font-size:.88rem"><input type="checkbox" id="br-snd"> Leiser Ton beim Wechsel</label></div></div>';
        el.querySelectorAll("[data-pat] button").forEach((b) => (b.onclick = () => { stop(); pat = b.dataset.k; draw(); }));
        el.querySelectorAll("[data-min] button").forEach((b) => (b.onclick = () => { stop(); mins = Number(b.dataset.m); draw(); }));
        el.querySelector("[data-go]").onclick = () => (run ? stop(true) : start());
      };
      const orb = () => el.querySelector("[data-orb]");
      const lbl = () => el.querySelector("[data-lbl]");
      function start() {
        const P = PAT[pat].ph; let i = 0; const endAt = Date.now() + mins * 60000; const t0 = Date.now();
        el.querySelector("[data-go]").textContent = "Beenden"; KS.wake(true);
        run = { t: null, t0 };
        const step = () => {
          if (!run) return;
          const left = (endAt - Date.now()) / 1000;
          if (left <= 0 && i % P.length === 0) { finish(); return; }
          const [name, sec, size] = P[i % P.length];
          const o = orb(); if (!o) { stop(); return; }
          o.style.transitionDuration = sec + "s"; o.style.width = (38 + size * 52) + "%";
          lbl().innerHTML = esc(name) + "<small>" + fmtClock(Math.max(0, left)) + "</small>";
          if (el.querySelector("#br-snd") && el.querySelector("#br-snd").checked) KS.bell(true);
          i++; run.t = setTimeout(step, sec * 1000);
        };
        step();
      }
      function finish() {
        const m = (Date.now() - run.t0) / 60000; logPractice("Atmung", m); stop();
        if (lbl()) lbl().innerHTML = "Geschafft<small>Wie fühlst du dich jetzt?</small>";
        KS.bell(); KS.toast("Atemübung abgeschlossen");
      }
      function stop(log) {
        if (!run) return; clearTimeout(run.t);
        if (log) logPractice("Atmung", (Date.now() - run.t0) / 60000);
        run = null; KS.wake(false);
        const o = orb(); if (o) { o.style.transitionDuration = "1s"; o.style.width = "38%"; }
        const g = el.querySelector("[data-go]"); if (g) g.textContent = "Starten";
        if (lbl()) lbl().innerHTML = "Bereit<small>" + mins + " Minuten</small>";
      }
      draw();
      el._cleanup = () => stop();
    }
  });

  /* ---------------- 6 5-4-3-2-1 ---------------- */
  const GR = [[5, "Dinge, die du sehen kannst", "Schau dich bewusst um. Farben, Formen, Licht."], [4, "Dinge, die du spüren kannst", "Füße auf dem Boden, Stoff auf der Haut, Temperatur."], [3, "Dinge, die du hören kannst", "Nahe und ferne Geräusche, auch leise."], [2, "Dinge, die du riechen kannst", "Oder zwei Gerüche, die du magst."], [1, "Ding, das du schmecken kannst", "Oder einen Geschmack, den du gern hast."]];
  reg({
    id: "grounding", name: "5-4-3-2-1-Erdung", cat: "Körper & Entspannung", weeks: [3],
    desc: "Wenn Gefühle überrollen, holt diese Übung die Aufmerksamkeit über die Sinne zurück ins Hier und Jetzt.",
    mount(el) {
      let step = -1, before = null;
      const draw = () => {
        let body;
        if (step === -1) body = '<div class="stack"><span class="lbl">Wie stark ist deine Anspannung gerade? (0 bis 10)</span>' + scale("gb", 11, 0, before) + '<div><button class="btn" type="button" data-next>Beginnen</button></div></div>';
        else if (step < 5) {
          const [n, t, h] = GR[step];
          body = '<div class="stack"><div class="row"><span style="font-family:var(--f-display);font-size:3.2rem;font-weight:800;color:var(--accent);line-height:1">' + n + '</span><div><h4 style="font-size:1.2rem">' + t + '</h4><span class="faint">' + h + "</span></div></div>" +
            '<div class="grid2">' + Array.from({ length: n }, (_, i) => '<input type="text" aria-label="' + t + " " + (i + 1) + '" placeholder="' + (i + 1) + '.">').join("") + "</div>" +
            '<div class="row"><button class="btn" type="button" data-next>Weiter</button><span class="faint">Schritt ' + (step + 1) + " von 5. Du kannst die Felder auch nur in Gedanken füllen.</span></div></div>";
        } else body = '<div class="stack"><span class="lbl">Und jetzt? Wie stark ist deine Anspannung? (0 bis 10)</span>' + scale("ga", 11, 0, null) + '<div data-out></div><div><button class="btn ghost" type="button" data-reset>Noch einmal</button></div></div>';
        el.innerHTML = head(this) + body;
        bindScale(el, "gb", (v) => (before = v));
        bindScale(el, "ga", (v) => {
          KS.add("grounding", { before, after: v, d: KS.today() });
          const diff = before !== null ? before - v : null;
          el.querySelector("[data-out]").innerHTML = '<div class="note">' + (diff > 0 ? "Deine Anspannung ist um " + diff + " Punkte gesunken. Merk dir: Diese Übung steht dir jederzeit zur Verfügung." : "Manchmal braucht der Körper länger. Kombiniere die Übung mit ein paar langsamen Atemzügen.") + "</div>";
        });
        const nx = el.querySelector("[data-next]"); if (nx) nx.onclick = () => { step++; draw(); };
        const rs = el.querySelector("[data-reset]"); if (rs) rs.onclick = () => { step = -1; before = null; draw(); };
      };
      draw();
    }
  });

  /* ---------------- 7 PMR ---------------- */
  const PMRG = [["Hände und Unterarme", "Balle beide Hände zu Fäusten."], ["Oberarme", "Winkle die Arme an und drücke die Ellbogen gegen die Unterlage."], ["Gesicht", "Runzle die Stirn, kneife die Augen zusammen, beiße sanft die Zähne aufeinander."], ["Nacken und Schultern", "Ziehe die Schultern hoch Richtung Ohren."], ["Brust, Bauch und Rücken", "Atme ein, spanne den Bauch an und ziehe die Schulterblätter zusammen."], ["Gesäß und Oberschenkel", "Spanne Gesäß und Oberschenkel an, drücke die Fersen in den Boden."], ["Unterschenkel und Füße", "Ziehe die Zehen Richtung Nase."]];
  reg({
    id: "pmr", name: "Progressive Muskelentspannung", cat: "Körper & Entspannung", weeks: [3],
    desc: "Kurzform nach Jacobson in sieben Muskelgruppen: jeweils etwa 7 Sekunden anspannen, 30 Sekunden bewusst lösen. Dauer rund 5 Minuten.",
    mount(el) {
      let run = null;
      el.innerHTML = head(this) + '<div class="stack"><div class="panel" style="background:var(--bg);text-align:center"><div class="eyebrow" data-g>Bereit</div><h3 data-a style="font-size:1.6rem;margin:8px 0">Setz oder leg dich bequem hin</h3><p class="muted" data-i style="margin:0 auto;max-width:52ch">Spanne nur so stark an, dass du die Spannung deutlich spürst, ohne Schmerz. Bei Verletzungen die betroffene Gruppe auslassen.</p><div class="bar" style="margin-top:16px"><i data-p style="width:0%"></i></div><div class="num faint" data-c style="margin-top:6px">0:00</div></div><div class="row"><button class="btn" type="button" data-go>Starten</button><label class="row" style="gap:6px;font-size:.88rem"><input type="checkbox" id="pmr-snd" checked> Klang beim Wechsel</label></div></div>';
      const seq = [];
      PMRG.forEach(([g, how]) => { seq.push([g, "Anspannen", how, 7]); seq.push([g, "Lösen", "Lass los. Spüre den Unterschied zwischen Spannung und Entspannung. Atme ruhig weiter.", 30]); });
      seq.push(["Abschluss", "Nachspüren", "Spüre noch einen Moment in den ganzen Körper. Dann recke und strecke dich, öffne die Augen.", 30]);
      const total = seq.reduce((a, s) => a + s[3], 0);
      const $ = (s) => el.querySelector(s);
      const stop = (done) => { if (!run) return; clearInterval(run.iv); logPractice("PMR", (Date.now() - run.t0) / 60000); run = null; KS.wake(false); $("[data-go]").textContent = done ? "Noch einmal" : "Starten"; if (done) { $("[data-a]").textContent = "Gut gemacht"; $("[data-i]").textContent = "Regelmäßig geübt, gelingt die Entspannung immer schneller. Ziel: täglich einmal in dieser Woche."; } };
      $("[data-go]").onclick = () => {
        if (run) { stop(); return; }
        run = { t0: Date.now(), i: -1, until: 0 }; KS.wake(true); $("[data-go]").textContent = "Abbrechen";
        run.iv = setInterval(() => {
          const el2 = (Date.now() - run.t0) / 1000;
          let acc = 0, idx = 0; for (; idx < seq.length; idx++) { if (el2 < acc + seq[idx][3]) break; acc += seq[idx][3]; }
          if (idx >= seq.length) { KS.bell(); stop(true); return; }
          if (idx !== run.i) { run.i = idx; const s = seq[idx]; $("[data-g]").textContent = s[0]; $("[data-a]").textContent = s[1]; $("[data-i]").textContent = s[2]; if ($("#pmr-snd").checked) KS.bell(true); }
          $("[data-p]").style.width = (el2 / total * 100) + "%"; $("[data-c]").textContent = fmtClock(el2) + " / " + fmtClock(total) + " · noch " + Math.ceil(acc + seq[idx][3] - el2) + " s";
        }, 250);
      };
      el._cleanup = () => stop();
    }
  });

  /* ---------------- 8 Schlaftagebuch ---------------- */
  function mins(t) { if (!t) return null; const [h, m] = t.split(":").map(Number); return h * 60 + m; }
  KS.sleepCalc = function (e) {
    let bed = mins(e.bed), wake = mins(e.wake), up = mins(e.up);
    if (bed === null || wake === null) return null; if (up === null) up = wake;
    const norm = (t) => (t < bed ? t + 1440 : t);
    const tib = norm(up) - bed; const tst = norm(wake) - bed - (Number(e.lat) || 0) - (Number(e.waso) || 0);
    if (tib <= 0 || tst <= 0) return null;
    return { tib, tst, se: Math.round(tst / tib * 100) };
  };
  const hm = (m) => Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0");
  reg({
    id: "sleeplog", name: "Schlaftagebuch", cat: "Schlaf", weeks: [4],
    desc: "Trage jeden Morgen deine Nacht ein. Die Schlafeffizienz (Schlafzeit geteilt durch Bettzeit) ist der zentrale Wert der kognitiven Verhaltenstherapie bei Schlafstörungen.",
    mount(el) {
      const l = KS.list("sleep");
      const calc = l.map((e) => KS.sleepCalc(e)).filter(Boolean).slice(0, 7);
      const avg = (k) => (calc.length ? Math.round(calc.reduce((a, c) => a + c[k], 0) / calc.length) : null);
      const se = avg("se");
      const y = new Date(); y.setDate(y.getDate() - 1);
      el.innerHTML = head(this) +
        '<div class="grid2"><div class="stack">' +
        '<div class="grid2"><div class="field"><label for="sl-d">Nacht vom</label><input type="date" id="sl-d" value="' + KS.dkey(y) + '"></div><div class="field"><label for="sl-bed">Ins Bett gegangen</label><input type="time" id="sl-bed" value="23:00"></div>' +
        '<div class="field"><label for="sl-lat">Bis zum Einschlafen (Min.)</label><input type="number" min="0" id="sl-lat" value="20"></div><div class="field"><label for="sl-waso">Nachts wach (Min. gesamt)</label><input type="number" min="0" id="sl-waso" value="15"></div>' +
        '<div class="field"><label for="sl-wake">Endgültig aufgewacht</label><input type="time" id="sl-wake" value="06:45"></div><div class="field"><label for="sl-up">Aufgestanden</label><input type="time" id="sl-up" value="07:00"></div></div>' +
        '<div class="field"><span class="lbl">Wie erholsam war die Nacht?</span>' + scale("q", 5, 1, null, ["1 gar nicht", "2", "3", "4", "5 sehr"]) + "</div>" +
        '<div class="field"><label for="sl-n">Besonderheiten <span class="faint">(Koffein nach 14 Uhr, Alkohol, Bildschirm, Sorgen …)</span></label><input type="text" id="sl-n"></div>' +
        '<div><button class="btn" type="button" data-save>Nacht eintragen</button></div></div>' +
        '<div class="stack"><div class="kpis"><div class="kpi"><b>' + (se !== null ? se + " %" : "–") + '</b><span>Ø Schlafeffizienz</span></div><div class="kpi"><b>' + (calc.length ? hm(avg("tst")) : "–") + '</b><span>Ø Schlafdauer</span></div><div class="kpi"><b>' + (calc.length ? hm(avg("tib")) : "–") + "</b><span>Ø Zeit im Bett</span></div></div>" +
        (se !== null ? '<div class="note ' + (se >= 85 ? "" : "warn") + '">' + (se >= 85 ? "Deine Schlafeffizienz liegt bei 85 % oder höher. Das gilt als gut. Halte deine Aufstehzeit stabil." : "Unter 85 % bedeutet: Du liegst viel wach im Bett. Hilfreich ist, nur bei echter Müdigkeit ins Bett zu gehen, nach etwa 20 Minuten Wachliegen kurz aufzustehen und jeden Tag zur gleichen Zeit aufzustehen.") + "</div>" : '<div class="note">Nach zwei, drei Nächten siehst du hier deine Durchschnittswerte. Am aussagekräftigsten ist ein ganzes Wochenprotokoll.</div>') +
        '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.85rem" class="num"><thead><tr style="text-align:left;color:var(--ink-faint)"><th style="padding:6px 4px">Nacht</th><th>Schlaf</th><th>Bett</th><th>Effizienz</th><th>Erholung</th><th></th></tr></thead><tbody>' +
        l.slice(0, 14).map((e) => { const c = KS.sleepCalc(e); return '<tr style="border-top:1px solid var(--line)"><td style="padding:7px 4px">' + KS.fmtD(e.d) + "</td><td>" + (c ? hm(c.tst) : "–") + "</td><td>" + (c ? hm(c.tib) : "–") + '</td><td><span class="chip ' + (c && c.se >= 85 ? "ok" : "glow") + '">' + (c ? c.se + " %" : "–") + "</span></td><td>" + (e.q || "–") + '/5</td><td><button type="button" class="btn small ghost" data-del="' + e.id + '">×</button></td></tr>'; }).join("") +
        "</tbody></table></div></div></div>";
      let q = null; bindScale(el, "q", (v) => (q = v));
      el.querySelector("[data-save]").onclick = () => {
        const e = { d: val(el, "#sl-d"), bed: val(el, "#sl-bed"), lat: val(el, "#sl-lat"), waso: val(el, "#sl-waso"), wake: val(el, "#sl-wake"), up: val(el, "#sl-up"), q, note: val(el, "#sl-n") };
        if (!KS.sleepCalc(e)) { KS.toast("Bitte prüfe die Uhrzeiten"); return; }
        KS.data.sleep = l.filter((x) => x.d !== e.d); KS.add("sleep", e); KS.data.sleep.sort((a, b) => (a.d < b.d ? 1 : -1)); KS.save();
        KS.toast("Nacht eingetragen: Effizienz " + KS.sleepCalc(e).se + " %"); this.mount(el);
      };
      bindDel(el, "sleep", () => this.mount(el));
    }
  });

  /* ---------------- 9 Aktivitätenplaner ---------------- */
  const ACATS = ["Bewegung", "Natur", "Kontakt", "Freude", "Pflicht", "Erholung"];
  const AIDEAS = { Bewegung: ["20 Minuten zügig spazieren", "Treppe statt Aufzug", "Yoga-Video, 15 Minuten", "Radfahren zur Arbeit"], Natur: ["Mittagspause im Park", "Waldspaziergang am Wochenende", "Pflanzen auf dem Balkon versorgen"], Kontakt: ["Freundin anrufen", "Mit Kollegen Mittag essen", "Nachbarn grüßen und kurz plaudern"], Freude: ["Lieblingsmusik laut hören", "Etwas kochen, das ich mag", "Ein Kapitel lesen"], Pflicht: ["Einen Brief beantworten", "Zehn Minuten aufräumen", "Einen Arzttermin vereinbaren"], Erholung: ["Bad nehmen", "Ohne Handy Tee trinken", "Kurzer Mittagsschlaf, 20 Minuten"] };
  reg({
    id: "activity", name: "Aktivitätenplaner", cat: "Bewegung & Aktivierung", weeks: [5],
    desc: "Verhaltensaktivierung: Plane Aktivitäten, führe sie aus und bewerte danach Freude und Erfolgserleben. So wird sichtbar, was dir wirklich guttut.",
    mount(el) {
      const l = KS.list("activities");
      const wk = new Date(); wk.setDate(wk.getDate() - 6); const wkKey = KS.dkey(wk);
      const moveMin = l.filter((a) => a.done && a.d >= wkKey && (a.cat === "Bewegung" || a.cat === "Natur")).reduce((s, a) => s + (Number(a.min) || 0), 0);
      const done = l.filter((a) => a.done);
      const byCat = ACATS.map((c) => { const x = done.filter((a) => a.cat === c && a.joy != null); return [c, x.length ? (x.reduce((s, a) => s + a.joy, 0) / x.length) : null]; });
      let cat = "Bewegung";
      el.innerHTML = head(this) +
        '<div class="grid2"><div class="stack"><div class="field"><span class="lbl">Bereich</span>' + pills("cat", ACATS, [cat], false) + "</div>" +
        '<div class="field"><label for="ac-t">Aktivität</label><input type="text" id="ac-t" placeholder="z. B. 20 Minuten zügig spazieren"></div><div class="pills" data-ideas></div>' +
        '<div class="grid2"><div class="field"><label for="ac-d">Wann</label><input type="date" id="ac-d" value="' + KS.today() + '"></div><div class="field"><label for="ac-m">Dauer (Min.)</label><input type="number" id="ac-m" min="0" value="20"></div></div>' +
        '<div><button class="btn" type="button" data-save>Einplanen</button></div></div>' +
        '<div class="stack"><div><div class="row" style="justify-content:space-between"><span class="lbl">Bewegung &amp; Natur, letzte 7 Tage</span><b class="num">' + moveMin + ' / 150 Min.</b></div><div class="bar" style="height:10px;margin-top:6px"><i style="width:' + Math.min(100, moveMin / 150 * 100) + '%"></i></div><p class="faint" style="font-size:.8rem;margin:6px 0 0">WHO-Empfehlung: 150 bis 300 Minuten moderate Bewegung pro Woche.</p></div>' +
        '<div><span class="lbl">Ø Freude nach Bereich</span><div class="stack" style="gap:6px;margin-top:8px">' + byCat.map(([c, v]) => '<div class="row" style="gap:8px;flex-wrap:nowrap"><span style="width:84px;font-size:.85rem">' + c + '</span><div class="bar" style="flex:1"><i style="width:' + (v != null ? v * 10 : 0) + '%;background:var(--accent)"></i></div><span class="num faint" style="width:34px;text-align:right;font-size:.85rem">' + (v != null ? v.toFixed(1).replace(".", ",") : "–") + "</span></div>").join("") + "</div></div></div></div>" +
        '<h4 style="margin-top:22px">Geplant und erledigt</h4>' +
        entries("activities", (a) => '<span class="when">' + KS.fmtD(a.d) + " · " + esc(a.cat) + " · " + (a.min || 0) + " Min.</span><div><b>" + esc(a.title) + "</b></div>" +
          (a.done ? '<div class="row"><span class="chip ok">Erledigt</span><span class="chip num">Freude ' + a.joy + '/10</span><span class="chip num">Erfolg ' + a.mastery + "/10</span></div>" :
            '<div class="stack" style="gap:8px" data-rate="' + a.id + '"><span class="faint" style="font-size:.82rem">Nach der Aktivität bewerten:</span><div class="grid2"><div><span class="lbl" style="font-size:.8rem">Freude 0–10</span>' + scale("j" + a.id, 11, 0, null) + '</div><div><span class="lbl" style="font-size:.8rem">Erfolgserleben 0–10</span>' + scale("m" + a.id, 11, 0, null) + '</div></div><div><button type="button" class="btn small" data-done="' + a.id + '">Als erledigt speichern</button></div></div>'),
          "Noch keine Aktivität geplant. Beginne mit etwas Kleinem für heute oder morgen.", 30);
      const sel = [cat];
      const showIdeas = () => { el.querySelector("[data-ideas]").innerHTML = (AIDEAS[sel[0]] || []).map((i) => '<button type="button" class="pill">' + esc(i) + "</button>").join(""); };
      bindPills(el, "cat", sel); el.querySelector('[data-pills="cat"]').addEventListener("click", () => { if (!sel.length) sel.push(cat); showIdeas(); }); showIdeas();
      el.querySelector("[data-ideas]").onclick = (e) => { const b = e.target.closest(".pill"); if (b) el.querySelector("#ac-t").value = b.textContent; };
      el.querySelector("[data-save]").onclick = () => {
        const t = val(el, "#ac-t").trim(); if (!t) { KS.toast("Bitte eine Aktivität eintragen"); return; }
        KS.add("activities", { title: t, cat: sel[0] || cat, d: val(el, "#ac-d"), min: Number(val(el, "#ac-m")) || 0, done: false }); KS.data.activities.sort((a, b) => (a.done - b.done) || (a.d < b.d ? -1 : 1)); KS.save(); KS.toast("Eingeplant"); this.mount(el);
      };
      const rates = {};
      l.filter((a) => !a.done).forEach((a) => { rates[a.id] = {}; bindScale(el, "j" + a.id, (v) => (rates[a.id].j = v)); bindScale(el, "m" + a.id, (v) => (rates[a.id].m = v)); });
      el.querySelectorAll("[data-done]").forEach((b) => (b.onclick = () => {
        const r = rates[b.dataset.done]; if (r.j == null || r.m == null) { KS.toast("Bitte Freude und Erfolg bewerten"); return; }
        const a = l.find((x) => x.id === b.dataset.done); a.done = true; a.joy = r.j; a.mastery = r.m; a.doneAt = new Date().toISOString(); KS.save(); KS.toast("Erledigt. Gut gemacht."); this.mount(el);
      }));
      bindDel(el, "activities", () => this.mount(el));
    }
  });

  /* ---------------- 10 Meditations-Timer ---------------- */
  const ANCH = { Atem: "Lenke die Aufmerksamkeit auf das Ein- und Ausströmen des Atems. Wenn du abschweifst, bemerke es freundlich und kehre zurück.", Körper: "Wandere mit der Aufmerksamkeit langsam von den Füßen bis zum Scheitel. Nimm wahr, ohne zu verändern.", Geräusche: "Lass Geräusche kommen und gehen wie Wellen. Benenne sie nicht, höre nur.", Offen: "Ruhe in offenem Gewahrsein. Was auch immer auftaucht, Gedanken, Gefühle, Empfindungen, darf kommen und gehen.", Mitgefühl: "Wiederhole innerlich: Möge ich sicher sein. Möge ich freundlich mit mir sein. Möge ich Frieden finden. Dann für einen nahen Menschen." };
  reg({
    id: "timer", name: "Meditations-Timer", cat: "Achtsamkeit", weeks: [6, 10],
    desc: "Ein ruhiger Timer mit Klangschale zu Beginn und am Ende. Wähle einen Anker für deine Aufmerksamkeit.",
    mount(el) {
      let m = 5, a = "Atem", run = null;
      const total = KS.list("practice").filter((p) => p.kind === "Meditation").reduce((s, p) => s + p.minutes, 0);
      const draw = () => {
        el.innerHTML = head(this, '<span class="chip accent num">' + Math.round(total) + " Min. meditiert</span>") +
          '<div class="stack" style="justify-items:center;text-align:center"><div class="seg" data-a>' + Object.keys(ANCH).map((k) => '<button type="button" class="' + (k === a ? "on" : "") + '">' + k + "</button>").join("") + "</div>" +
          '<p class="muted" style="max-width:56ch;margin:0;font-family:var(--f-read)">' + ANCH[a] + "</p>" +
          '<div style="font-family:var(--f-display);font-weight:800;font-size:clamp(3.4rem,12vw,5.5rem);letter-spacing:-.04em;line-height:1" class="num" data-clock>' + fmtClock(m * 60) + "</div>" +
          '<div class="seg" data-m>' + [3, 5, 10, 15, 20].map((x) => '<button type="button" class="' + (x === m ? "on" : "") + '">' + x + " Min.</button>").join("") + '</div><button class="btn" type="button" data-go>Starten</button></div>';
        el.querySelectorAll("[data-a] button").forEach((b) => (b.onclick = () => { if (run) return; a = b.textContent; draw(); }));
        el.querySelectorAll("[data-m] button").forEach((b) => (b.onclick = () => { if (run) return; m = parseInt(b.textContent, 10); draw(); }));
        el.querySelector("[data-go]").onclick = () => (run ? stop(false) : start());
      };
      function start() {
        KS.bell(); KS.wake(true); const end = Date.now() + m * 60000; run = { t0: Date.now() };
        el.querySelector("[data-go]").textContent = "Beenden";
        run.iv = setInterval(() => { const left = (end - Date.now()) / 1000; const c = el.querySelector("[data-clock]"); if (c) c.textContent = fmtClock(left); if (left <= 0) stop(true); }, 250);
      }
      function stop(done) { if (!run) return; clearInterval(run.iv); logPractice("Meditation", (Date.now() - run.t0) / 60000); run = null; KS.wake(false); if (done) { KS.bell(); KS.toast("Sitzung beendet. Nimm dir noch einen Moment."); } draw(); }
      draw(); el._cleanup = () => stop(false);
    }
  });

  /* ---------------- 11 Gedankenprotokoll ---------------- */
  const TRAPS = ["Katastrophisieren", "Gedankenlesen", "Schwarz-Weiß-Denken", "Übergeneralisieren", "Muss-Sätze", "Emotionales Begründen", "Personalisieren", "Positives abwerten", "Etikettieren", "Wahrsagen"];
  KS.TRAPS = TRAPS;
  reg({
    id: "thoughts", name: "Gedankenprotokoll", cat: "Gedanken", weeks: [7],
    desc: "Das Standardwerkzeug der kognitiven Verhaltenstherapie. Ziel ist kein positives Denken, sondern ein ausgewogener, realistischer Blick.",
    mount(el) {
      const traps = [];
      el.innerHTML = head(this) +
        '<div class="stack"><div class="grid2"><div class="field"><label for="th-s">1. Situation <span class="faint">(Wer, was, wann, wo? Nur Fakten)</span></label><textarea id="th-s" placeholder="Dienstag, 15 Uhr: Meine Chefin antwortet nicht auf meine Mail."></textarea></div>' +
        '<div class="field"><label for="th-f">2. Gefühl(e) und Stärke</label><input type="text" id="th-f" placeholder="Angst, Ärger"><label for="th-f1" class="lbl" style="font-size:.8rem">Stärke vorher: <span data-f1>70</span> %</label><input type="range" id="th-f1" min="0" max="100" step="5" value="70"></div></div>' +
        '<div class="field"><label for="th-a">3. Automatischer Gedanke <span class="faint">(Was ging dir durch den Kopf? Welcher Gedanke ist der heißeste?)</span></label><textarea id="th-a" placeholder="Sie ist unzufrieden mit mir. Ich werde bestimmt bald gekündigt."></textarea></div>' +
        '<div class="field"><span class="lbl">4. Welche Denkfallen erkennst du?</span>' + pills("traps", TRAPS, [], true) + "</div>" +
        '<div class="grid2"><div class="field"><label for="th-pro">5. Was spricht für den Gedanken? <span class="faint">(Fakten, keine Deutungen)</span></label><textarea id="th-pro"></textarea></div>' +
        '<div class="field"><label for="th-con">6. Was spricht dagegen? <span class="faint">(Was würde eine gute Freundin sagen? Wie war es früher?)</span></label><textarea id="th-con"></textarea></div></div>' +
        '<div class="field"><label for="th-b">7. Ausgewogener Gedanke</label><textarea id="th-b" placeholder="Sie hat viele Termine. Eine fehlende Antwort heißt nicht, dass sie unzufrieden ist. Ich frage morgen kurz nach."></textarea></div>' +
        '<div class="field"><label class="lbl" for="th-f2">8. Stärke des Gefühls jetzt: <span data-f2>40</span> %</label><input type="range" id="th-f2" min="0" max="100" step="5" value="40"></div>' +
        '<div><button class="btn" type="button" data-save>Protokoll speichern</button></div></div>' +
        '<h4 style="margin-top:22px">Meine Protokolle</h4>' +
        entries("thoughts", (e) => '<span class="when">' + KS.fmtDT(e.at) + '</span><div><b>Situation:</b> ' + esc(e.s) + '</div><div><b>Gedanke:</b> „' + esc(e.a) + '“</div>' + (e.traps && e.traps.length ? '<div class="pills">' + e.traps.map((t) => '<span class="chip">' + esc(t) + "</span>").join("") + "</div>" : "") + '<div><b>Ausgewogen:</b> ' + esc(e.b) + '</div><div class="row"><span class="chip num">' + esc(e.f || "Gefühl") + " " + e.f1 + ' %</span>→<span class="chip ok num">' + e.f2 + " %</span></div>", "Noch kein Protokoll. Nimm eine Situation der letzten Tage, in der deine Stimmung plötzlich kippte.");
      bindPills(el, "traps", traps);
      ["f1", "f2"].forEach((k) => { const r = el.querySelector("#th-" + k); r.oninput = () => (el.querySelector("[data-" + k + "]").textContent = r.value); });
      el.querySelector("[data-save]").onclick = () => {
        const e = { s: val(el, "#th-s"), f: val(el, "#th-f"), f1: Number(val(el, "#th-f1")), a: val(el, "#th-a"), traps: traps.slice(), pro: val(el, "#th-pro"), con: val(el, "#th-con"), b: val(el, "#th-b"), f2: Number(val(el, "#th-f2")) };
        if (!e.s.trim() || !e.a.trim()) { KS.toast("Bitte mindestens Situation und Gedanken eintragen"); return; }
        KS.add("thoughts", e); KS.toast("Protokoll gespeichert"); this.mount(el);
      };
      bindDel(el, "thoughts", () => this.mount(el));
    }
  });

  /* ---------------- 12 Sorgen-Parkplatz ---------------- */
  reg({
    id: "worry", name: "Sorgen-Parkplatz & Sorgenzeit", cat: "Gedanken", weeks: [8],
    desc: "Parke Sorgen tagsüber hier und verschiebe das Nachdenken auf eine feste Sorgenzeit von 15 bis 20 Minuten. In der Sorgenzeit prüfst du jede Sorge: lösbar oder nicht?",
    mount(el) {
      const cfg = KS.obj("worrycfg"); const l = KS.list("worries");
      const open = l.filter((w) => !w.status);
      let run = null;
      el.innerHTML = head(this) +
        '<div class="grid2"><div class="stack"><div class="field"><label for="wo-t">Sorge parken</label><input type="text" id="wo-t" placeholder="Was, wenn die Untersuchung schlecht ausgeht?"></div><div><button class="btn" type="button" data-park>Parken</button></div>' +
        '<p class="faint" style="font-size:.85rem;margin:0">Notiere die Sorge kurz und lenke dich dann bewusst auf das, was du gerade tust. Du verdrängst sie nicht, du verschiebst sie.</p></div>' +
        '<div class="stack"><div class="field"><label for="wo-time">Meine tägliche Sorgenzeit</label><div class="row"><input type="time" id="wo-time" style="max-width:140px" value="' + esc(cfg.time || "17:30") + '"><span class="faint">nicht kurz vor dem Schlafen, immer am gleichen Ort</span></div></div>' +
        '<div class="row"><button class="btn glow" type="button" data-start>Sorgenzeit starten (15 Min.)</button><span class="num" data-clock style="font-weight:700"></span></div>' +
        '<div class="kpis"><div class="kpi"><b>' + open.length + '</b><span>geparkt</span></div><div class="kpi"><b>' + l.filter((w) => w.status === "solve").length + '</b><span>in Lösung</span></div><div class="kpi"><b>' + l.filter((w) => w.status === "let").length + "</b><span>losgelassen</span></div></div></div></div>" +
        '<h4 style="margin-top:22px">Geparkte Sorgen</h4>' +
        (open.length ? '<div class="entries">' + open.map((w) => '<div class="entry"><button type="button" class="del" data-del="' + w.id + '">Löschen</button><span class="when">' + KS.fmtDT(w.at) + "</span><b>" + esc(w.text) + '</b><span class="faint" style="font-size:.85rem">Ist das ein lösbares Problem, bei dem ich jetzt etwas tun kann?</span><div class="row"><button type="button" class="btn small" data-solve="' + w.id + '">Ja, nächster Schritt</button><button type="button" class="btn small ghost" data-let="' + w.id + '">Nein, ich lasse sie ziehen</button></div><div data-step="' + w.id + '" hidden><input type="text" placeholder="Mein nächster Schritt (konkret, mit Zeitpunkt)"><button type="button" class="btn small" style="margin-top:6px" data-ok="' + w.id + '">Speichern</button></div></div>').join("") + "</div>" : '<div class="empty">Keine offenen Sorgen geparkt.</div>') +
        (l.some((w) => w.status) ? '<h4 style="margin-top:18px">Bearbeitet</h4><div class="entries">' + l.filter((w) => w.status).slice(0, 15).map((w) => '<div class="entry"><span class="when">' + KS.fmtDT(w.at) + '</span><div class="row"><span class="chip ' + (w.status === "solve" ? "accent" : "ok") + '">' + (w.status === "solve" ? "Nächster Schritt" : "Losgelassen") + "</span>" + esc(w.text) + "</div>" + (w.step ? '<div class="faint">→ ' + esc(w.step) + "</div>" : "") + "</div>").join("") + "</div>" : "");
      el.querySelector("#wo-time").onchange = (e) => { cfg.time = e.target.value; KS.save(); KS.toast("Sorgenzeit gespeichert"); };
      el.querySelector("[data-park]").onclick = () => { const t = val(el, "#wo-t").trim(); if (!t) return; KS.add("worries", { text: t }); KS.toast("Geparkt. Zurück ins Jetzt."); this.mount(el); };
      el.querySelector("[data-start]").onclick = () => {
        if (run) return; const end = Date.now() + 15 * 60000; KS.bell(true); run = setInterval(() => { const left = (end - Date.now()) / 1000; const c = el.querySelector("[data-clock]"); if (!c) { clearInterval(run); return; } c.textContent = "noch " + fmtClock(left); if (left <= 0) { clearInterval(run); run = null; c.textContent = "Sorgenzeit vorbei. Wende dich bewusst etwas anderem zu."; KS.bell(); } }, 500);
      };
      el.querySelectorAll("[data-solve]").forEach((b) => (b.onclick = () => (el.querySelector('[data-step="' + b.dataset.solve + '"]').hidden = false)));
      el.querySelectorAll("[data-ok]").forEach((b) => (b.onclick = () => { const w = l.find((x) => x.id === b.dataset.ok); w.status = "solve"; w.step = b.previousElementSibling.value; KS.save(); this.mount(el); }));
      el.querySelectorAll("[data-let]").forEach((b) => (b.onclick = () => { const w = l.find((x) => x.id === b.dataset.let); w.status = "let"; KS.save(); KS.toast("Losgelassen. Du darfst sie wieder parken, falls sie zurückkommt."); this.mount(el); }));
      bindDel(el, "worries", () => this.mount(el));
      el._cleanup = () => run && clearInterval(run);
    }
  });

  /* ---------------- 13 Defusion ---------------- */
  reg({
    id: "defusion", name: "Abstand zu Gedanken", cat: "Gedanken", weeks: [8],
    desc: "Kognitive Defusion aus der Akzeptanz- und Commitment-Therapie: Du diskutierst nicht mit dem Gedanken, sondern betrachtest ihn als das, was er ist, eine Abfolge von Worten.",
    mount(el) {
      el.innerHTML = head(this) +
        '<div class="stack"><div class="field"><label for="df-t">Ein Gedanke, der dich festhält</label><input type="text" id="df-t" placeholder="Ich schaffe das nicht."></div>' +
        '<div class="field"><label for="df-n">Gib der wiederkehrenden Geschichte einen Namen (optional)</label><input type="text" id="df-n" placeholder="Die Ich-bin-nicht-gut-genug-Geschichte"></div>' +
        '<div class="field"><label class="lbl" for="df-b1">Wie sehr nimmt dich der Gedanke gerade gefangen? <span data-b1>7</span>/10</label><input type="range" id="df-b1" min="0" max="10" value="7"></div>' +
        '<div><button class="btn" type="button" data-go>Abstand nehmen</button></div><div data-out></div></div>';
      const r1 = el.querySelector("#df-b1"); r1.oninput = () => (el.querySelector("[data-b1]").textContent = r1.value);
      el.querySelector("[data-go]").onclick = () => {
        const t = val(el, "#df-t").trim().replace(/[.!]$/, ""); if (!t) { KS.toast("Bitte einen Gedanken eintragen"); return; }
        const n = val(el, "#df-n").trim();
        const lines = ["„" + t + ".“", "Ich habe den Gedanken, dass " + t.charAt(0).toLowerCase() + t.slice(1) + ".", "Ich bemerke, dass ich den Gedanken habe, dass " + t.charAt(0).toLowerCase() + t.slice(1) + "."];
        if (n) lines.push("Aha, da ist sie wieder: " + n + ". Danke, Verstand.");
        el.querySelector("[data-out]").innerHTML = '<div class="panel stack" style="background:var(--bg)"><span class="lbl">Lies die Sätze langsam nacheinander. Spüre, wie sich der Abstand verändert.</span>' +
          lines.map((l, i) => '<div class="fade-in" style="animation-delay:' + i * 0.6 + 's;font-family:var(--f-read);font-size:' + (1.3 - i * 0.08) + "rem;padding-left:" + i * 18 + 'px">' + esc(l) + "</div>").join("") +
          '<hr class="soft"><span class="lbl">Blätter im Fluss</span><p class="faint" style="margin:0;font-size:.88rem">Stell dir vor, du legst den Gedanken auf ein Blatt und lässt es vorbeitreiben. Du musst es nicht wegschieben, nur zusehen.</p>' +
          '<div style="position:relative;height:90px;overflow:hidden;border-radius:10px;background:linear-gradient(180deg,var(--accent-tint),var(--surface-2))" data-river></div>' +
          '<div class="field"><label class="lbl" for="df-b2">Und jetzt? <span data-b2>5</span>/10</label><input type="range" id="df-b2" min="0" max="10" value="5"></div><div><button type="button" class="btn small" data-save>Notieren</button></div></div>';
        const river = el.querySelector("[data-river]");
        const leaf = document.createElement("div");
        leaf.textContent = t; leaf.style.cssText = "position:absolute;top:28px;left:-60%;white-space:nowrap;background:var(--surface);border:1px solid var(--line);border-radius:999px 999px 999px 4px;padding:6px 14px;font-size:.9rem;box-shadow:var(--shadow);transition:left 14s linear;max-width:none";
        river.appendChild(leaf); requestAnimationFrame(() => requestAnimationFrame(() => (leaf.style.left = "110%")));
        const r2 = el.querySelector("#df-b2"); r2.oninput = () => (el.querySelector("[data-b2]").textContent = r2.value);
        el.querySelector("[data-save]").onclick = () => { KS.add("defusion", { t, n, b1: Number(r1.value), b2: Number(r2.value) }); KS.toast("Notiert"); };
      };
    }
  });

  /* ---------------- 14 Problemlöser ---------------- */
  const PSTEPS = ["Problem beschreiben", "Ziel festlegen", "Ideen sammeln", "Ideen bewerten", "Plan machen", "Auswerten"];
  reg({
    id: "problem", name: "Problemlöse-Assistent", cat: "Gedanken", weeks: [8],
    desc: "Sechs Schritte aus der Problemlösetherapie, einem gut untersuchten Verfahren. Für Sorgen, bei denen du tatsächlich etwas tun kannst.",
    mount(el) {
      const l = KS.list("problems");
      let cur = l.find((p) => !p.closed) || null;
      const draw = () => {
        if (!cur) {
          el.innerHTML = head(this) + '<div class="stack"><div class="field"><label for="pr-new">Welches Problem möchtest du angehen?</label><input type="text" id="pr-new" placeholder="z. B. Ich komme mit den Rechnungen nicht hinterher."></div><div><button class="btn" type="button" data-new>Loslegen</button></div></div>' +
            (l.length ? '<h4 style="margin-top:20px">Abgeschlossen</h4><div class="entries">' + l.map((p) => '<div class="entry"><span class="when">' + KS.fmtDT(p.at) + "</span><b>" + esc(p.problem) + "</b>" + (p.plan ? '<div class="faint">Plan: ' + esc(p.plan) + "</div>" : "") + (p.review ? '<div class="faint">Ergebnis: ' + esc(p.review) + "</div>" : "") + "</div>").join("") + "</div>" : "");
          el.querySelector("[data-new]").onclick = () => { const t = val(el, "#pr-new").trim(); if (!t) return; cur = KS.add("problems", { problem: t, step: 0, ideas: [] }); draw(); };
          return;
        }
        const s = cur.step || 0;
        let body = "";
        if (s === 0) body = '<div class="field"><label for="pr-a">Beschreibe das Problem so konkret wie möglich. Was genau passiert, wann, mit wem? Was macht es zum Problem?</label><textarea id="pr-a">' + esc(cur.detail || cur.problem) + "</textarea></div>";
        if (s === 1) body = '<div class="field"><label for="pr-a">Was wäre ein realistisches Ziel? Woran würdest du merken, dass es besser ist?</label><textarea id="pr-a" placeholder="Bis Ende des Monats sind alle offenen Rechnungen sortiert und ich weiß, was ich wann zahle.">' + esc(cur.goal || "") + "</textarea></div>";
        if (s === 2) body = '<p class="muted" style="margin:0">Sammle möglichst viele Ideen, ohne sie zu bewerten. Auch ungewöhnliche. Quantität vor Qualität.</p><div class="row"><input type="text" id="pr-a" placeholder="Idee …" style="flex:1;min-width:200px"><button type="button" class="btn small" data-add>Hinzufügen</button></div><div class="pills">' + cur.ideas.map((i) => '<span class="chip">' + esc(i.t) + "</span>").join("") + "</div>";
        if (s === 3) body = '<p class="muted" style="margin:0">Bewerte jede Idee: Wie gut bringt sie dich zum Ziel und wie machbar ist sie?</p>' + cur.ideas.map((i, k) => '<div class="entry"><b>' + esc(i.t) + '</b><div class="grid2"><div><span class="lbl" style="font-size:.8rem">Wirksamkeit</span>' + scale("e" + k, 5, 1, i.e || null) + '</div><div><span class="lbl" style="font-size:.8rem">Machbarkeit</span>' + scale("f" + k, 5, 1, i.f || null) + "</div></div></div>").join("");
        if (s === 4) { const best = cur.ideas.slice().sort((a, b) => ((b.e || 0) + (b.f || 0)) - ((a.e || 0) + (a.f || 0)))[0]; body = '<div class="note">Deine am besten bewertete Idee: <b>' + esc(best ? best.t : "–") + '</b></div><div class="field"><label for="pr-a">Konkreter Plan: Was tust du, wann, wo? Welche Hindernisse könnten kommen und was tust du dann?</label><textarea id="pr-a">' + esc(cur.plan || (best ? best.t + ". Wann: " : "")) + "</textarea></div>"; }
        if (s === 5) body = '<div class="field"><label for="pr-a">Nach der Umsetzung: Was hat funktioniert? Was hast du gelernt? Ist das Problem kleiner geworden?</label><textarea id="pr-a">' + esc(cur.review || "") + "</textarea></div>";
        el.innerHTML = head(this) + '<div class="stack"><div class="row" style="gap:6px">' + PSTEPS.map((p, i) => '<span class="chip ' + (i === s ? "accent" : i < s ? "ok" : "") + '">' + (i + 1) + ". " + p + "</span>").join("") + '</div><h4 style="font-size:1.1rem">' + esc(cur.problem) + "</h4>" + body +
          '<div class="row"><button type="button" class="btn ghost" data-back ' + (s === 0 ? "disabled" : "") + '>Zurück</button><button type="button" class="btn" data-next>' + (s === 5 ? "Abschließen" : "Weiter") + '</button><button type="button" class="btn ghost small" data-pause>Später weitermachen</button></div></div>';
        if (s === 3) cur.ideas.forEach((i, k) => { bindScale(el, "e" + k, (v) => { i.e = v; KS.save(); }); bindScale(el, "f" + k, (v) => { i.f = v; KS.save(); }); });
        const add = el.querySelector("[data-add]"); if (add) { const inp = el.querySelector("#pr-a"); const fn = () => { if (!inp.value.trim()) return; cur.ideas.push({ t: inp.value.trim() }); KS.save(); draw(); el.querySelector("#pr-a").focus(); }; add.onclick = fn; inp.onkeydown = (e) => { if (e.key === "Enter") fn(); }; }
        const keep = () => { const a = el.querySelector("#pr-a"); if (!a || s === 2) return; const map = { 0: "detail", 1: "goal", 4: "plan", 5: "review" }; if (map[s]) cur[map[s]] = a.value; };
        el.querySelector("[data-next]").onclick = () => { keep(); if (s === 2 && cur.ideas.length < 2) { KS.toast("Sammle mindestens zwei Ideen"); return; } if (s === 5) { cur.closed = true; KS.save(); KS.toast("Problemlösung abgeschlossen"); cur = null; draw(); return; } cur.step = s + 1; KS.save(); draw(); };
        el.querySelector("[data-back]").onclick = () => { keep(); cur.step = Math.max(0, s - 1); KS.save(); draw(); };
        el.querySelector("[data-pause]").onclick = () => { keep(); KS.save(); KS.toast("Gespeichert. Du findest das Problem hier wieder."); };
      };
      draw();
    }
  });

  /* ---------------- 15 Gefühls-Finder ---------------- */
  const EMO = { Freude: ["froh", "erleichtert", "zufrieden", "begeistert", "stolz", "dankbar", "verspielt", "hoffnungsvoll"], Traurigkeit: ["traurig", "enttäuscht", "einsam", "niedergeschlagen", "wehmütig", "verletzt", "leer", "hilflos"], Angst: ["besorgt", "nervös", "unsicher", "ängstlich", "panisch", "überfordert", "angespannt", "verunsichert"], Ärger: ["gereizt", "frustriert", "wütend", "ungeduldig", "empört", "genervt", "verbittert", "neidisch"], "Scham & Schuld": ["beschämt", "schuldig", "peinlich berührt", "bloßgestellt", "minderwertig", "reumütig"], Ruhe: ["ruhig", "gelassen", "entspannt", "geborgen", "ausgeglichen", "zentriert"], Erschöpfung: ["müde", "erschöpft", "ausgelaugt", "lustlos", "antriebslos", "abgestumpft"], Verbundenheit: ["verbunden", "zugehörig", "liebevoll", "zärtlich", "vertraut", "gerührt"] };
  const NEEDS = ["Sicherheit", "Ruhe", "Erholung", "Nähe", "Zugehörigkeit", "Anerkennung", "Autonomie", "Klarheit", "Sinn", "Gerechtigkeit", "Unterstützung", "Bewegung", "Spaß", "Ordnung", "Wertschätzung"];
  KS.NEEDS = NEEDS;
  reg({
    id: "emotions", name: "Gefühls-Finder", cat: "Gefühle", weeks: [9],
    desc: "Gefühle präzise zu benennen dämpft nachweislich ihre Wucht. Finde das passende Wort, die Stärke und das Bedürfnis dahinter.",
    mount(el) {
      const st = { fam: "Angst", words: [], needs: [], int: 5 };
      const draw = () => {
        el.innerHTML = head(this) +
          '<div class="stack"><div class="field"><span class="lbl">1. Welche Gefühlsfamilie passt am ehesten?</span><div class="seg" data-fam>' + Object.keys(EMO).map((f) => '<button type="button" class="' + (f === st.fam ? "on" : "") + '">' + f + "</button>").join("") + "</div></div>" +
          '<div class="field"><span class="lbl">2. Welches Wort trifft es genau? (mehrere möglich)</span>' + pills("words", EMO[st.fam], st.words, true) + "</div>" +
          '<div class="field"><label class="lbl" for="em-i">3. Wie stark? <span data-iv>' + st.int + '</span>/10</label><input type="range" id="em-i" min="0" max="10" value="' + st.int + '"></div>' +
          '<div class="grid2"><div class="field"><label for="em-b">4. Wo spürst du es im Körper?</label><input type="text" id="em-b" placeholder="Enge in der Brust, Kloß im Hals …"></div><div class="field"><label for="em-t">5. Auslöser</label><input type="text" id="em-t" placeholder="Was ist passiert?"></div></div>' +
          '<div class="field"><span class="lbl">6. Welches Bedürfnis steckt dahinter?</span>' + pills("needs", NEEDS, st.needs, true) + "</div>" +
          '<div class="grid2"><div class="field"><label for="em-u">7. Wozu drängt dich das Gefühl?</label><input type="text" id="em-u" placeholder="mich zurückziehen, jemanden anschreien …"></div><div class="field"><label for="em-h">8. Was wäre jetzt hilfreich?</label><input type="text" id="em-h" placeholder="kurz rausgehen, mit Lena reden …"></div></div>' +
          '<div><button class="btn" type="button" data-save>Gefühl festhalten</button></div></div><h4 style="margin-top:22px">Mein Gefühlstagebuch</h4>' +
          entries("emotions", (e) => '<span class="when">' + KS.fmtDT(e.at) + '</span><div class="row"><b>' + esc(e.words.join(", ") || e.fam) + '</b><span class="chip num">' + e.int + "/10</span>" + e.needs.map((n) => '<span class="chip accent">' + esc(n) + "</span>").join("") + "</div>" + (e.trig ? '<div class="faint">Auslöser: ' + esc(e.trig) + "</div>" : "") + (e.help ? '<div class="faint">Hilfreich: ' + esc(e.help) + "</div>" : ""), "Noch kein Eintrag. Probiere es mit dem Gefühl, das gerade am deutlichsten ist.", 20);
        el.querySelectorAll("[data-fam] button").forEach((b) => (b.onclick = () => { st.fam = b.textContent; st.words = []; draw(); }));
        bindPills(el, "words", st.words); bindPills(el, "needs", st.needs);
        const r = el.querySelector("#em-i"); r.oninput = () => { st.int = Number(r.value); el.querySelector("[data-iv]").textContent = r.value; };
        el.querySelector("[data-save]").onclick = () => {
          if (!st.words.length) { KS.toast("Wähle mindestens ein Gefühlswort"); return; }
          KS.add("emotions", { fam: st.fam, words: st.words.slice(), int: st.int, body: val(el, "#em-b"), trig: val(el, "#em-t"), needs: st.needs.slice(), urge: val(el, "#em-u"), help: val(el, "#em-h") });
          KS.toast("Gefühl benannt. Das allein hilft schon."); st.words = []; st.needs = []; draw();
        };
        bindDel(el, "emotions", draw);
      };
      draw();
    }
  });

  /* ---------------- 16 Expressives Schreiben ---------------- */
  reg({
    id: "writing", name: "Expressives Schreiben", cat: "Gefühle", weeks: [9],
    desc: "Nach Pennebaker: an vier Tagen je 15 bis 20 Minuten über tiefste Gedanken und Gefühle zu einem belastenden Erlebnis schreiben. Rechtschreibung egal, nur nicht aufhören.",
    mount(el) {
      const l = KS.list("writing"); let run = null;
      el.innerHTML = head(this, '<span class="chip accent">Tag ' + Math.min(4, l.length + 1) + " von 4</span>") +
        '<div class="note" style="font-family:var(--f-read)">Schreibe über deine tiefsten Gedanken und Gefühle zu einem Erlebnis, das dich sehr beschäftigt. Du kannst es mit deiner Vergangenheit, Gegenwart oder Zukunft verbinden, mit Beziehungen oder damit, wer du bist und sein möchtest. Wenn ein Thema dich überwältigt, wähle ein weniger belastendes oder pausiere.</div>' +
        '<div class="row" style="margin:14px 0"><button class="btn" type="button" data-go>20-Minuten-Timer starten</button><span class="num" data-clock style="font-weight:700"></span></div>' +
        '<textarea id="wr-t" style="min-height:260px" placeholder="Beginne einfach …"></textarea>' +
        '<div class="row" style="margin-top:10px"><button class="btn" type="button" data-save>Text speichern</button><button class="btn ghost" type="button" data-discard>Verwerfen ohne Speichern</button><span class="faint" style="font-size:.85rem">Verwerfen ist völlig in Ordnung. Die Wirkung entsteht durch das Schreiben selbst.</span></div>' +
        '<div class="field" style="margin-top:12px"><span class="lbl">Wie belastend war das Schreiben heute?</span>' + scale("wb", 10, 1, null) + "</div>" +
        (l.length ? '<h4 style="margin-top:20px">Bisherige Sitzungen</h4>' + entries("writing", (e) => '<span class="when">' + KS.fmtDT(e.at) + " · " + (e.words || 0) + " Wörter" + (e.load ? " · Belastung " + e.load + "/10" : "") + "</span>" + (e.text ? '<details><summary>Text anzeigen</summary><div style="font-family:var(--f-read);margin-top:6px">' + KS.nl2br(e.text) + "</div></details>" : '<span class="faint">Text nicht gespeichert</span>'), "") : "");
      let load = null; bindScale(el, "wb", (v) => (load = v));
      el.querySelector("[data-go]").onclick = () => { if (run) return; const end = Date.now() + 20 * 60000; run = setInterval(() => { const c = el.querySelector("[data-clock]"); if (!c) { clearInterval(run); return; } const left = (end - Date.now()) / 1000; c.textContent = left > 0 ? "noch " + fmtClock(left) : "Zeit ist um. Schreib den Gedanken zu Ende."; if (left <= 0) { clearInterval(run); KS.bell(); } }, 500); el.querySelector("#wr-t").focus(); };
      const words = () => (val(el, "#wr-t").trim().match(/\S+/g) || []).length;
      el.querySelector("[data-save]").onclick = () => { if (!words()) return; KS.add("writing", { text: val(el, "#wr-t"), words: words(), load }); clearInterval(run); KS.toast("Gespeichert"); this.mount(el); };
      el.querySelector("[data-discard]").onclick = () => { KS.add("writing", { text: "", words: words(), load }); clearInterval(run); KS.toast("Text verworfen, Sitzung gezählt"); this.mount(el); };
      bindDel(el, "writing", () => this.mount(el));
      el._cleanup = () => run && clearInterval(run);
    }
  });

  /* ---------------- 17 Mitfühlender Brief ---------------- */
  reg({
    id: "letter", name: "Mitfühlender Brief", cat: "Selbstmitgefühl", weeks: [10],
    desc: "Schreibe dir einen Brief aus der Sicht eines bedingungslos wohlwollenden Menschen. Drei Leitfragen führen dich durch die drei Komponenten des Selbstmitgefühls.",
    mount(el) {
      el.innerHTML = head(this) +
        '<div class="stack"><div class="field"><label for="le-0">Worum geht es? Wofür kritisierst du dich, was tut dir weh?</label><textarea id="le-0"></textarea></div>' +
        '<div class="field"><label for="le-1">Achtsamkeit: Wie würde der wohlwollende Mensch deinen Schmerz anerkennen, ohne ihn kleinzureden oder aufzubauschen?</label><textarea id="le-1" placeholder="Das ist gerade wirklich schwer für dich …"></textarea></div>' +
        '<div class="field"><label for="le-2">Gemeinsames Menschsein: Was würde er dir darüber sagen, dass Fehler und Schwächen zum Menschsein gehören?</label><textarea id="le-2" placeholder="Viele Menschen würden sich in dieser Lage ähnlich fühlen …"></textarea></div>' +
        '<div class="field"><label for="le-3">Freundlichkeit: Was würde er dir wünschen? Welchen freundlichen, ermutigenden nächsten Schritt würde er vorschlagen?</label><textarea id="le-3" placeholder="Ich wünsche dir, dass … Vielleicht könntest du …"></textarea></div>' +
        '<div class="row"><button class="btn" type="button" data-save>Brief speichern</button></div><div data-prev></div></div>' +
        '<h4 style="margin-top:22px">Meine Briefe</h4>' +
        entries("letters", (e) => '<span class="when">' + KS.fmtDT(e.at) + '</span><details><summary><b>' + esc((e.topic || "Brief").slice(0, 80)) + '</b></summary><div style="font-family:var(--f-read);margin-top:8px">Liebe*r ich,<br><br>' + KS.nl2br([e.p1, e.p2, e.p3].filter(Boolean).join("\n\n")) + "<br><br>In Verbundenheit</div></details>", "Noch kein Brief. Lies ihn nach ein paar Tagen noch einmal. Viele erleben ihn dann als besonders stärkend.");
      el.querySelector("[data-save]").onclick = () => { const e = { topic: val(el, "#le-0"), p1: val(el, "#le-1"), p2: val(el, "#le-2"), p3: val(el, "#le-3") }; if (!(e.p1 + e.p2 + e.p3).trim()) { KS.toast("Schreib mindestens einen Absatz"); return; } KS.add("letters", e); KS.toast("Brief gespeichert"); this.mount(el); };
      bindDel(el, "letters", () => this.mount(el));
    }
  });

  /* ---------------- 18 Beziehungskreise ---------------- */
  reg({
    id: "circles", name: "Beziehungskreise", cat: "Beziehungen", weeks: [11],
    desc: "Wer steht dir nah, wer ist eher Bekanntschaft? Die Landkarte zeigt, wo deine Unterstützung liegt und welche Beziehungen du pflegen möchtest.",
    mount(el) {
      const l = KS.list("people");
      const ring = { inner: [0.5, 16], middle: [0.5, 33], outer: [0.5, 46] };
      const place = (p, i, arr) => { const [, r] = ring[p.c]; const n = arr.length; const ang = -Math.PI / 2 + (i + 0.5) * (2 * Math.PI / Math.max(n, 1)) + (p.c === "middle" ? 0.4 : p.c === "outer" ? 0.2 : 0); return 'left:' + (50 + r * Math.cos(ang)).toFixed(1) + "%;top:" + (50 + r * Math.sin(ang)).toFixed(1) + "%"; };
      const by = (c) => l.filter((p) => p.c === c);
      el.innerHTML = head(this) + '<div class="grid2"><div><div class="circles"><div class="c c1"><span>Bekannte</span></div><div class="c c2"><span>Freundschaft</span></div><div class="c c3"><b class="me">Ich</b></div>' +
        ["inner", "middle", "outer"].map((c) => by(c).map((p, i, a) => '<span class="chip ' + (p.contact ? "ok" : "") + '" style="position:absolute;transform:translate(-50%,-50%);' + place(p, i, a) + ';font-size:.72rem;max-width:30%;overflow:hidden;text-overflow:ellipsis">' + esc(p.name) + "</span>").join("")).join("") +
        '</div><p class="faint" style="font-size:.8rem;text-align:center">Innen: engste Vertraute · Mitte: Freundschaften · Außen: Bekannte, Kolleginnen, Nachbarn. Grün: Kontakt diese Woche.</p></div>' +
        '<div class="stack"><div class="field"><label for="pe-n">Name</label><input type="text" id="pe-n" placeholder="Vorname oder Spitzname"></div><div class="field"><span class="lbl">Kreis</span>' + pills("c", ["Innerer Kreis", "Mittlerer Kreis", "Äußerer Kreis"], ["Mittlerer Kreis"], false) + '</div><div class="field"><label for="pe-x">Was gibt mir diese Beziehung? (optional)</label><input type="text" id="pe-x"></div><div><button class="btn" type="button" data-save>Hinzufügen</button></div>' +
        (l.length ? '<div class="entries">' + l.map((p) => '<div class="entry"><button type="button" class="del" data-del="' + p.id + '">Löschen</button><div class="row"><b>' + esc(p.name) + '</b><span class="chip">' + ({ inner: "innen", middle: "Mitte", outer: "außen" }[p.c]) + "</span></div>" + (p.x ? '<span class="faint">' + esc(p.x) + "</span>" : "") + '<label class="row" style="gap:6px;font-size:.85rem"><input type="checkbox" data-ct="' + p.id + '"' + (p.contact ? " checked" : "") + "> Kontakt diese Woche</label></div>").join("") + "</div>" : "") + "</div></div>";
      const sel = ["Mittlerer Kreis"]; bindPills(el, "c", sel);
      el.querySelector("[data-save]").onclick = () => { const n = val(el, "#pe-n").trim(); if (!n) return; const c = (sel[0] || "Mittlerer").startsWith("Inn") ? "inner" : (sel[0] || "").startsWith("Äu") ? "outer" : "middle"; KS.add("people", { name: n, c, x: val(el, "#pe-x"), contact: false }); this.mount(el); };
      el.querySelectorAll("[data-ct]").forEach((c) => (c.onchange = () => { const p = l.find((x) => x.id === c.dataset.ct); p.contact = c.checked; KS.save(); this.mount(el); }));
      bindDel(el, "people", () => this.mount(el));
    }
  });

  /* ---------------- 19 Ich-Botschaften ---------------- */
  const FEEL = ["besorgt", "enttäuscht", "frustriert", "traurig", "verunsichert", "gestresst", "verletzt", "ungeduldig", "erschöpft", "allein gelassen"];
  reg({
    id: "imessage", name: "Ich-Botschaften-Baukasten", cat: "Beziehungen", weeks: [11],
    desc: "Nach dem Modell der Gewaltfreien Kommunikation: Beobachtung, Gefühl, Bedürfnis, Bitte. So kannst du klar sagen, was dich stört, ohne anzugreifen.",
    mount(el) {
      const f = [], n = [];
      el.innerHTML = head(this) +
        '<div class="grid2"><div class="stack"><div class="field"><label for="im-o">1. Beobachtung <span class="faint">(was eine Kamera aufzeichnen würde)</span></label><input type="text" id="im-o" placeholder="Als du gestern beim Essen aufs Handy geschaut hast"><span class="hint" data-hint></span></div>' +
        '<div class="field"><span class="lbl">2. Mein Gefühl</span>' + pills("f", FEEL, f, true) + "</div>" +
        '<div class="field"><span class="lbl">3. Mein Bedürfnis</span>' + pills("n", NEEDS, n, true) + "</div>" +
        '<div class="field"><label for="im-b">4. Meine Bitte <span class="faint">(konkret, positiv formuliert, erfüllbar)</span></label><input type="text" id="im-b" placeholder="Wärst du bereit, das Handy beim Abendessen wegzulegen?"></div></div>' +
        '<div class="stack"><span class="lbl">Deine Ich-Botschaft</span><div class="panel" style="background:var(--bg);font-family:var(--f-read);font-size:1.12rem;line-height:1.6" data-out>…</div><div class="row"><button type="button" class="btn" data-copy>Kopieren</button><button type="button" class="btn ghost" data-save>Speichern</button></div><textarea data-fb hidden aria-label="Text zum Kopieren"></textarea>' +
        '<div class="note">Tipp: Vermeide „immer“ und „nie“. Sie machen aus einer Beobachtung ein Urteil, und das Gegenüber verteidigt sich, statt zuzuhören.</div></div></div>' +
        '<h4 style="margin-top:20px">Gespeicherte Botschaften</h4>' + entries("imessages", (e) => '<span class="when">' + KS.fmtDT(e.at) + '</span><div style="font-family:var(--f-read)">' + esc(e.text) + "</div>", "Noch keine gespeichert.");
      const build = () => {
        const o = val(el, "#im-o").trim(), b = val(el, "#im-b").trim();
        const t = (o ? o.charAt(0).toUpperCase() + o.slice(1) + ", " : "") + (f.length ? "war ich " + f.join(" und ") : "") + (n.length ? ", weil mir " + n.join(" und ") + " wichtig " + (n.length > 1 ? "sind" : "ist") : "") + (o || f.length ? ". " : "") + b;
        el.querySelector("[data-out]").textContent = t.trim() || "…";
        el.querySelector("[data-hint]").textContent = /\b(immer|nie|ständig|jedes Mal|niemals)\b/i.test(o) ? "Achtung: „immer“, „nie“ oder „ständig“ klingen nach Bewertung. Beschreibe eine konkrete Situation." : "";
        return t.trim();
      };
      el.addEventListener("input", build); el.addEventListener("click", () => setTimeout(build, 0));
      bindPills(el, "f", f); bindPills(el, "n", n);
      el.querySelector("[data-copy]").onclick = () => KS.copy(build(), el.querySelector("[data-fb]"));
      el.querySelector("[data-save]").onclick = () => { const t = build(); if (t.length < 10) return; KS.add("imessages", { text: t }); KS.toast("Gespeichert"); this.mount(el); };
      bindDel(el, "imessages", () => this.mount(el));
    }
  });

  /* ---------------- 20 Dankbarkeit ---------------- */
  reg({
    id: "gratitude", name: "Drei gute Dinge", cat: "Positive Psychologie", weeks: [6, 11],
    desc: "Notiere abends drei Dinge, die heute gut waren, und warum. In der Originalstudie hielt der Effekt auf das Wohlbefinden bis zu sechs Monate an.",
    mount(el) {
      const l = KS.list("gratitude");
      const days = new Set(l.map((e) => e.d));
      let streak = 0; const d = new Date(); if (!days.has(KS.dkey(d))) d.setDate(d.getDate() - 1);
      while (days.has(KS.dkey(d))) { streak++; d.setDate(d.getDate() - 1); }
      el.innerHTML = head(this, '<span class="chip glow num">' + streak + (streak === 1 ? " Tag" : " Tage") + " in Folge</span>") +
        '<div class="stack">' + [1, 2, 3].map((i) => '<div class="grid2"><div class="field"><label for="gr-' + i + '">' + i + '. Was war gut?</label><input type="text" id="gr-' + i + '"></div><div class="field"><label for="gr-w' + i + '">Warum ist es passiert? Was war mein Anteil?</label><input type="text" id="gr-w' + i + '"></div></div>').join("") +
        '<div><button class="btn" type="button" data-save>Speichern</button></div></div><h4 style="margin-top:22px">Mein Tagebuch</h4>' +
        entries("gratitude", (e) => '<span class="when">' + KS.fmtD(e.d) + "</span>" + e.items.map((x) => "<div>• <b>" + esc(x.t) + "</b>" + (x.w ? ' <span class="faint">, weil ' + esc(x.w) + "</span>" : "") + "</div>").join(""), "Noch keine Einträge. Auch kleine Dinge zählen: ein guter Kaffee, ein freundlicher Blick, ein erledigter Anruf.", 21);
      el.querySelector("[data-save]").onclick = () => { const items = [1, 2, 3].map((i) => ({ t: val(el, "#gr-" + i).trim(), w: val(el, "#gr-w" + i).trim() })).filter((x) => x.t); if (!items.length) { KS.toast("Trage mindestens ein gutes Ding ein"); return; } KS.add("gratitude", { d: KS.today(), items }); KS.toast("Gespeichert. Schön, dass es das heute gab."); this.mount(el); };
      bindDel(el, "gratitude", () => this.mount(el));
    }
  });

  /* ---------------- 21 Werte ---------------- */
  const VALS = [["Abenteuer", "Neues erleben, Risiken eingehen"], ["Achtsamkeit", "Präsent sein im Moment"], ["Authentizität", "Echt sein, zu mir stehen"], ["Autonomie", "Selbst bestimmen, wie ich lebe"], ["Lernen", "Wissen und Fähigkeiten erweitern"], ["Ehrlichkeit", "Aufrichtig sein, mit mir und anderen"], ["Familie", "Für meine Familie da sein"], ["Freundschaft", "Ein guter Freund, eine gute Freundin sein"], ["Fürsorge", "Mich um andere kümmern"], ["Gerechtigkeit", "Fair handeln, für andere eintreten"], ["Gesundheit", "Gut für Körper und Geist sorgen"], ["Großzügigkeit", "Teilen und geben"], ["Humor", "Leichtigkeit, lachen können"], ["Kreativität", "Gestalten, Neues erschaffen"], ["Mut", "Mich trauen, auch mit Angst"], ["Natur", "Verbunden mit der Natur leben"], ["Partnerschaft", "Eine liebevolle Beziehung gestalten"], ["Spiritualität", "Verbindung zu etwas Größerem"], ["Verantwortung", "Verlässlich sein, Zusagen halten"], ["Vertrauen", "Anderen und dem Leben vertrauen"], ["Leistung", "Etwas erreichen, gut sein in dem, was ich tue"], ["Gelassenheit", "Ruhig bleiben, annehmen können"], ["Freiheit", "Unabhängig und frei entscheiden"], ["Sicherheit", "Stabilität für mich und andere"], ["Respekt", "Andere und mich achten"], ["Beitrag", "Die Welt ein wenig besser machen"], ["Freude", "Spiel, Genuss und Spaß"], ["Geduld", "Abwarten können, nachsichtig sein"], ["Dankbarkeit", "Wertschätzen, was da ist"], ["Neugier", "Offen sein, Fragen stellen"], ["Schönheit", "Ästhetik und Kunst schätzen"], ["Gemeinschaft", "Teil von etwas sein, mich einbringen"]];
  reg({
    id: "values", name: "Werte-Kompass", cat: "Werte & Sinn", weeks: [12],
    desc: "Sortiere 32 Wertekarten, wähle deine fünf wichtigsten und prüfe, wie sehr dein Alltag gerade zu ihnen passt. Die Lücke zeigt, wo ein kleiner Schritt am meisten bewirkt.",
    mount(el) {
      const V = KS.obj("values"); V.sort = V.sort || {}; V.top = V.top || []; V.rate = V.rate || {};
      const draw = () => {
        const idx = VALS.findIndex((v) => !V.sort[v[0]]);
        let body;
        if (idx >= 0) {
          const [name, d] = VALS[idx];
          body = '<div class="stack" style="justify-items:center"><span class="faint num">Karte ' + (idx + 1) + " von " + VALS.length + '</span><div class="vcard" style="width:min(340px,100%)"><b>' + name + '</b><span class="muted">' + d + '</span></div><div class="row" style="justify-content:center"><button type="button" class="btn" data-s="3">Sehr wichtig</button><button type="button" class="btn ghost" data-s="2">Wichtig</button><button type="button" class="btn ghost" data-s="1">Weniger wichtig</button></div>' + (idx > 0 ? '<button type="button" class="btn small ghost" data-undo>Letzte Karte zurück</button>' : "") + "</div>";
        } else {
          const very = VALS.filter((v) => V.sort[v[0]] === 3).map((v) => v[0]);
          const imp = VALS.filter((v) => V.sort[v[0]] === 2).map((v) => v[0]);
          body = '<div class="vcols"><div><span class="lbl">Sehr wichtig (' + very.length + ')</span><p class="faint" style="font-size:.8rem;margin:2px 0 0">Tippe bis zu fünf als deine Kernwerte an.</p>' + pills("top", very, V.top, true) + '</div><div><span class="lbl">Wichtig</span><div class="pills" style="margin-top:8px">' + imp.map((v) => '<span class="chip">' + v + "</span>").join("") + '</div></div><div><span class="lbl">Weniger wichtig</span><div class="pills" style="margin-top:8px">' + VALS.filter((v) => V.sort[v[0]] === 1).map((v) => '<span class="chip">' + v[0] + "</span>").join("") + "</div></div></div>" +
            (V.top.length ? '<h4 style="margin-top:20px">Mein Werte-Kompass</h4><p class="faint" style="margin:4px 0 10px;font-size:.88rem">Für jeden Kernwert: Wie wichtig ist er dir (0–10) und wie sehr hast du in der letzten Woche danach gelebt (0–10)?</p><div class="stack">' + V.top.map((v) => { const r = V.rate[v] = V.rate[v] || { imp: 8, live: 5, step: "" }; const gap = r.imp - r.live; return '<div class="entry"><div class="row" style="justify-content:space-between"><b style="font-size:1.05rem">' + v + '</b>' + (gap >= 3 ? '<span class="chip glow">Lücke ' + gap + "</span>" : '<span class="chip ok">im Einklang</span>') + '</div><div class="grid2"><label class="field"><span class="lbl" style="font-size:.8rem">Wichtigkeit ' + r.imp + '</span><input type="range" min="0" max="10" value="' + r.imp + '" data-v="' + v + '" data-k="imp"></label><label class="field"><span class="lbl" style="font-size:.8rem">Gelebt ' + r.live + '</span><input type="range" min="0" max="10" value="' + r.live + '" data-v="' + v + '" data-k="live"></label></div><div class="bar" style="height:8px;position:relative"><i style="width:' + r.live * 10 + '%;background:var(--accent)"></i></div><label class="field"><span class="lbl" style="font-size:.8rem">Ein kleiner Schritt in Richtung ' + v + " diese Woche</span><input type=\"text\" data-step=\"" + v + '" value="' + esc(r.step) + '"></label></div>'; }).join("") + "</div>" : "") +
            '<div class="row" style="margin-top:14px"><button type="button" class="btn small ghost" data-reset>Karten neu sortieren</button></div>';
        }
        el.innerHTML = head(this) + body;
        el.querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => { V.sort[VALS[idx][0]] = Number(b.dataset.s); KS.save(); draw(); }));
        const u = el.querySelector("[data-undo]"); if (u) u.onclick = () => { delete V.sort[VALS[idx - 1][0]]; KS.save(); draw(); };
        const tp = el.querySelector('[data-pills="top"]'); if (tp) tp.addEventListener("click", (e) => { const b = e.target.closest(".pill"); if (!b) return; const v = b.textContent; const i = V.top.indexOf(v); if (i >= 0) V.top.splice(i, 1); else if (V.top.length < 5) V.top.push(v); else KS.toast("Höchstens fünf Kernwerte"); KS.save(); draw(); });
        el.querySelectorAll("input[type=range][data-v]").forEach((r) => (r.onchange = () => { V.rate[r.dataset.v][r.dataset.k] = Number(r.value); KS.save(); draw(); }));
        el.querySelectorAll("[data-step]").forEach((i) => (i.onchange = () => { V.rate[i.dataset.step].step = i.value; KS.save(); KS.toast("Gespeichert"); }));
        const rs = el.querySelector("[data-reset]"); if (rs) rs.onclick = () => { if (rs.dataset.c !== "1") { rs.dataset.c = "1"; rs.textContent = "Sicher? Erneut tippen"; return; } V.sort = {}; V.top = []; KS.save(); draw(); };
      };
      draw();
    }
  });

  /* ---------------- 22 Kompass-Plan ---------------- */
  const PLANF = [["signs", "Meine Frühwarnzeichen", "Woran merke ich (oder merken andere), dass es mir schlechter geht? Gedanken, Gefühle, Körper, Verhalten. z. B. schlafe schlechter, sage Verabredungen ab, grüble abends."], ["helps", "Was mir nachweislich guttut", "Welche Übungen und Gewohnheiten aus den 12 Wochen haben bei dir am besten gewirkt?"], ["routine", "Meine tägliche Basis", "Was ist mein Minimum an Selbstfürsorge, auch in vollen Wochen? z. B. 7 Stunden Schlaf, 20 Minuten draußen, ein Check-in."], ["avoid", "Was ich vermeiden möchte", "Fallen, in die ich leicht tappe: z. B. Rückzug, Alkohol zum Abschalten, Arbeiten bis spät."], ["people", "Meine Menschen", "Wen kann ich anrufen, wenn es schwer wird? Namen und Nummern."], ["pro", "Professionelle Unterstützung", "Hausarztpraxis, Psychotherapie, Beratungsstelle. Wann melde ich mich dort? z. B. wenn mein WHO-5-Wert unter 50 bleibt oder ich zwei Wochen kaum Freude empfinde."], ["insight", "Meine wichtigsten Erkenntnisse", "Was nehme ich aus diesen 12 Wochen mit?"]];
  reg({
    id: "plan", name: "Mein Kompass-Plan", cat: "Werte & Sinn", weeks: [12],
    desc: "Dein persönlicher Plan für die Zeit nach dem Programm: Frühwarnzeichen erkennen, früh gegensteuern, Unterstützung kennen. Rückfallprophylaxe beginnt, wenn es einem gut geht.",
    mount(el) {
      const P = KS.obj("plan");
      const helpful = (() => { const s = []; if (KS.list("checkins").length) s.push("Täglicher Check-in"); if (KS.list("practice").some((p) => p.kind === "Atmung")) s.push("Atemübungen"); if (KS.list("practice").some((p) => p.kind === "Meditation")) s.push("Meditation"); if (KS.list("activities").some((a) => a.done)) s.push("Geplante Aktivitäten"); if (KS.list("thoughts").length) s.push("Gedankenprotokoll"); if (KS.list("gratitude").length) s.push("Drei gute Dinge"); if (KS.list("sleep").length) s.push("Feste Aufstehzeit"); return s; })();
      el.innerHTML = head(this) + '<div class="stack">' + PLANF.map(([k, t, h]) => '<div class="field"><label for="pl-' + k + '">' + t + '</label><span class="hint">' + h + "</span>" + (k === "helps" && helpful.length ? '<div class="pills" data-sug>' + helpful.map((x) => '<button type="button" class="pill">' + x + "</button>").join("") + "</div>" : "") + '<textarea id="pl-' + k + '">' + esc(P[k] || "") + "</textarea></div>").join("") +
        '<div class="note crit"><b>Im Notfall:</b> TelefonSeelsorge 0800 111 0 111 oder 0800 111 0 222 (rund um die Uhr, kostenfrei) · Ärztlicher Bereitschaftsdienst 116 117 · Notruf 112</div>' +
        '<div class="row"><button class="btn" type="button" data-save>Plan speichern</button><button class="btn ghost" type="button" data-copy>Als Text kopieren</button></div><textarea data-fb hidden aria-label="Plan als Text"></textarea></div>';
      const sug = el.querySelector("[data-sug]"); if (sug) sug.onclick = (e) => { const b = e.target.closest(".pill"); if (!b) return; const ta = el.querySelector("#pl-helps"); ta.value = (ta.value ? ta.value.trim() + "\n" : "") + "• " + b.textContent; };
      const collect = () => { PLANF.forEach(([k]) => (P[k] = val(el, "#pl-" + k))); P.updated = new Date().toISOString(); KS.save(); };
      el.querySelector("[data-save]").onclick = () => { collect(); KS.toast("Dein Kompass-Plan ist gespeichert"); };
      el.querySelector("[data-copy]").onclick = () => { collect(); KS.copy("MEIN KOMPASS-PLAN\n\n" + PLANF.map(([k, t]) => t.toUpperCase() + "\n" + (P[k] || "–")).join("\n\n") + "\n\nNOTFALL: TelefonSeelsorge 0800 111 0 111 · 0800 111 0 222 · Bereitschaftsdienst 116 117 · Notruf 112", el.querySelector("[data-fb]")); };
    }
  });
})();
