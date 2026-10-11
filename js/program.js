/* Klarsinn – Programmvarianten (12 Wochen, 6 Monate, 12 Monate), Praxiswochen, Zeitachse, Aktivitätskalender */
(function () {
  const KS = window.KS, esc = KS.esc;
  const W = () => (window.KS_WEEKS || []).slice().sort((a, b) => a.n - b.n);
  const D = (n) => (window.KS_DEEP || []).find((d) => d.n === n);
  const PHN = { 1: "Fundament", 2: "Lebensstil", 3: "Gedanken & Gefühle", 4: "Verbindung & Richtung" };
  const phc = (p) => "var(--p" + p + ")";

  KS.VARIANTS = {
    w12: { name: "12 Wochen", tag: "Kompakt", weeks: 12, per: "1 Woche pro Thema", desc: "Ein Thema pro Woche. Intensiv und klar strukturiert, ideal für einen konzentrierten Neustart.", rhythm: ["Lernen"] },
    m6: { name: "6 Monate", tag: "Vertiefung", weeks: 26, per: "2 Wochen pro Thema", desc: "Jedes Thema über zwei Wochen: erst lernen, dann üben und vertiefen. Mit Rückblick- und Abschlusswoche.", rhythm: ["Lernen", "Üben"] },
    m12: { name: "12 Monate", tag: "Begleitung", weeks: 52, per: "1 Monat pro Thema", desc: "Ein Thema pro Monat in vier Schritten: Lernen, Üben, Vertiefen, Verankern. Nach jeder Phase eine Integrationswoche. Gewohnheiten haben so genug Zeit, wirklich automatisch zu werden.", rhythm: ["Lernen", "Üben", "Vertiefen", "Verankern"] }
  };
  KS.KIND = { lernen: "Lernen", ueben: "Üben", vertiefen: "Vertiefen", verankern: "Verankern", integration: "Integration", abschluss: "Abschluss" };
  KS.variant = () => { const v = KS.obj("profile").variant; return KS.VARIANTS[v] ? v : "w12"; };
  KS.isLong = () => KS.variant() !== "w12";

  KS.plan = function (v) {
    v = v || KS.variant(); const out = []; const mods = W();
    if (v === "w12") mods.forEach((w) => out.push({ m: w.n, kind: "lernen", phase: w.phase }));
    else if (v === "m6") { mods.forEach((w) => { out.push({ m: w.n, kind: "lernen", phase: w.phase }); out.push({ m: w.n, kind: "ueben", phase: w.phase }); }); out.push({ m: 12, kind: "integration", phase: 0 }); out.push({ m: 12, kind: "abschluss", phase: 0 }); }
    else [1, 2, 3, 4].forEach((p) => { mods.filter((w) => w.phase === p).forEach((w) => ["lernen", "ueben", "vertiefen", "verankern"].forEach((k) => out.push({ m: w.n, kind: k, phase: p }))); out.push({ m: mods.filter((w) => w.phase === p).slice(-1)[0].n, kind: "integration", phase: p }); });
    return out.map((e, i) => Object.assign(e, { pw: i + 1 }));
  };
  KS.currentPW = function () {
    const p = KS.obj("profile"); if (!p.start) return null; const n = KS.plan().length;
    return Math.max(1, Math.min(n, Math.floor(KS.daysBetween(p.start, KS.today()) / 7) + 1));
  };
  KS.pwOf = (m, kind) => (KS.plan().find((e) => e.m === m && e.kind === kind) || {}).pw;
  const pst = (k) => { const o = KS.obj("pweeks"); o[k] = o[k] || { t: {}, r: {} }; return o[k]; };
  KS.pst = pst;

  /* Inhalte einer Praxiswoche */
  const INTEG = {
    tasks: [{ title: "Rückblick lesen", desc: "Lies deine Reflexionen der letzten Wochen im Bereich „Mein Verlauf“ und markiere drei Sätze, die dir besonders wichtig sind.", freq: "einmalig" }, { title: "WHO-5 messen", desc: "Fülle den WHO-5-Fragebogen aus und vergleiche mit deiner ersten Messung.", freq: "einmalig" }, { title: "Lebensrad aktualisieren", desc: "Bewerte die acht Lebensbereiche neu und speichere eine Momentaufnahme.", freq: "einmalig" }, { title: "Lieblingsübung weiterführen", desc: "Wähle die eine Übung aus dieser Phase, die dir am meisten geholfen hat, und mache sie an fünf Tagen.", freq: "5× diese Woche" }, { title: "Täglicher Check-in", desc: "Behalte deinen Check-in bei. Er ist dein Frühwarnsystem.", freq: "täglich" }, { title: "Etwas feiern", desc: "Gönn dir bewusst etwas Gutes als Anerkennung für die Arbeit der letzten Wochen.", freq: "einmalig" }],
    reflection: ["Was hat sich seit Beginn dieser Phase verändert, in deinem Erleben oder in deinem Alltag?", "Welche Übung oder Erkenntnis willst du auf keinen Fall wieder verlieren?", "Was war schwierig, und was würdest du beim nächsten Mal anders machen?"]
  };
  const FINAL = {
    tasks: [{ title: "Abschluss-Messung WHO-5", desc: "Fülle den WHO-5 aus und vergleiche ihn mit deinem Startwert.", freq: "einmalig" }, { title: "Kompass-Plan fertigstellen", desc: "Vervollständige deinen Kompass-Plan mit Frühwarnzeichen, hilfreichen Strategien und Menschen.", freq: "einmalig" }, { title: "Brief an dein zukünftiges Ich", desc: "Schreibe einen kurzen Brief an dich in drei Monaten: Was willst du dir sagen, falls es schwerer wird?", freq: "einmalig" }, { title: "Werte-Kompass prüfen", desc: "Schau auf deine fünf Kernwerte. Plane für jeden einen kleinen Schritt im nächsten Monat.", freq: "einmalig" }, { title: "Erinnerungen setzen", desc: "Trage dir in deinen Kalender einen monatlichen Termin für Check-in, WHO-5 und Plan-Durchsicht ein.", freq: "einmalig" }, { title: "Täglicher Check-in", desc: "Bleib dran. Zwei Minuten am Tag.", freq: "täglich" }],
    reflection: ["Wer bist du heute im Vergleich zu dem Menschen, der dieses Programm begonnen hat?", "Welche drei Gewohnheiten nimmst du mit in den Alltag?", "Woran wirst du merken, dass du früh gegensteuern solltest, und was tust du dann?"]
  };
  function pwContent(e) {
    const w = W().find((x) => x.n === e.m), d = D(e.m) || {};
    if (e.kind === "integration") return { title: e.phase ? "Integration: " + PHN[e.phase] : "Rückblick & Integration", focus: e.phase ? "Eine Woche zum Durchatmen und Festigen. Du blickst auf die Phase „" + PHN[e.phase] + "“ zurück, misst dein Wohlbefinden und entscheidest, was du mitnimmst." : "Eine Woche zum Zurückblicken: Was hat sich verändert, was hilft dir am meisten, was willst du beibehalten?", tasks: INTEG.tasks, reflection: INTEG.reflection, tools: ["who5", "gratitude"], explore2: 12, review: true };
    if (e.kind === "abschluss") return { title: "Abschluss & Ausblick", focus: "Die letzte Woche. Du misst deinen Fortschritt, stellst deinen persönlichen Kompass-Plan fertig und bereitest dich auf die Zeit danach vor.", tasks: FINAL.tasks, reflection: FINAL.reflection, tools: ["who5", "plan", "values"], explore2: 12, review: true };
    const pk = d[e.kind] || { focus: "", tasks: [], reflection: [] };
    const long = KS.variant() === "m12";
    const o = { title: KS.KIND[e.kind] + ": " + w.title, focus: pk.focus, tasks: pk.tasks, reflection: pk.reflection, tools: w.tools, w, d };
    if (e.kind === "ueben") { o.practice = (d.practices || [])[0]; o.explore2 = e.m; if (!long) { o.deep = true; } }
    if (e.kind === "vertiefen") { o.deep = true; o.practice = (d.practices || [])[1]; }
    if (e.kind === "verankern") { o.practice = (d.practices || [])[1] && !long ? null : null; o.anchor = true; o.tools = ["ifthen"].concat(w.tools.filter((t) => t !== "who5")).slice(0, 3); }
    return o;
  }
  KS.pwContent = pwContent;
  KS.pwProgress = function (e) {
    const c = pwContent(e), s = pst(e.pw); let tot = 0, got = 0;
    c.tasks.forEach((t, i) => { const n = KS.boxesFor(t.freq); tot += n; got += (s.t[i] || []).filter(Boolean).length; });
    tot += c.reflection.length; got += c.reflection.filter((_, i) => (s.r[i] || "").trim()).length;
    return tot ? got / tot : 0;
  };

  /* Ansicht einer Praxiswoche */
  KS.viewPW = function (k) {
    const plan = KS.plan(); const e = plan[k - 1]; if (!e) return null;
    if (e.kind === "lernen") return null; // wird als Modulseite gerendert
    const c = pwContent(e), s = pst(k), V = KS.VARIANTS[KS.variant()];
    const ph = e.phase || 4; const prev = plan[k - 2], next = plan[k];
    const month = plan.filter((x) => x.m === e.m && x.kind !== "integration" && x.kind !== "abschluss");
    const label = (x) => (x.kind === "lernen" ? "#woche-" + x.m : "#pw-" + x.pw);
    const title = (x) => x ? (x.kind === "lernen" ? "Lernen: " + W().find((w) => w.n === x.m).title : pwContent(x).title) : "";
    let h = '<article class="fade-in" style="--ph:' + phc(ph) + '"><header class="whead pwhead"><div><div class="eyebrow" style="color:' + phc(ph) + '">Programmwoche ' + k + " von " + V.weeks + " · " + V.name + (e.phase ? " · Phase " + e.phase + ": " + PHN[e.phase] : "") + '</div><h1 style="margin-top:10px">' + esc(c.title) + '</h1><div class="sub">' + KS.cite(esc(c.focus)) + "</div>" +
      (month.length > 1 && !c.review ? '<div class="pw-steps">' + month.map((x) => '<a href="' + label(x) + '" class="pw-step' + (x.pw === k ? " on" : "") + ((x.kind === "lernen" ? (KS.obj("weeks")[x.m] || {}).done : pst(x.pw).done) ? " done" : "") + '"><span>' + KS.KIND[x.kind] + "</span><small>Woche " + x.pw + "</small></a>").join("") + "</div>" : "") +
      (c.deep && c.d && c.d.deep ? '<div class="lesson-cta"><button type="button" class="btn chunky big" data-lesson="' + e.m + '" data-mode="deep">' + ((KS.obj("lessons")[e.m + "d"] || {}).done ? "Vertiefungs-Lektion wiederholen" : "Vertiefungs-Lektion starten") + '</button><span class="faint" style="font-size:.85rem">' + KS.buildCards(KS.deepSource(e.m), "deep").length + " interaktive Karten</span></div>" : "") +
      '</div><div class="pw-tile">' + KS.weekIcon(e.m, 64) + "<b>" + KS.KIND[e.kind] + "</b></div></header>";
    h += '<div class="pw-body">';
    if (!c.review && KS.lessonsOf) {
      const all = KS.lessonsOf(e.m).filter((l) => l.mode === "master");
      const pick = KS.variant() === "m6" ? all : all.filter((l) => l.key.endsWith({ ueben: "a", vertiefen: "b", verankern: "c" }[e.kind]));
      if (pick.length) h += '<section class="wsec"><h2><small>Masterclass dieser Woche</small></h2><div class="lib-row">' + pick.map((l) => KS.lessonTile(e.m, l, false)).join("") + "</div></section>";
    }
    if (c.review) {
      const mods = W().filter((w) => !e.phase || w.phase === e.phase);
      h += '<section class="wsec"><h2><small>Rückblick</small></h2><div class="weeks">' + mods.map((w) => { const p = KS.weekProgress(w); return '<a class="wcard" href="#woche-' + w.n + '" style="--ph:' + phc(w.phase) + '"><div class="top-row"><span class="wn"><span class="wicon">' + KS.weekIcon(w.n, 20) + "</span>Modul " + w.n + "</span>" + ((KS.obj("weeks")[w.n] || {}).done ? '<span class="chip ok">Abgeschlossen</span>' : "") + "</div><div><h3>" + esc(w.title) + "</h3><p>" + esc(w.takeaways[0]) + '</p></div><div class="bar"><i style="width:' + Math.round(p * 100) + '%"></i></div></a>'; }).join("") + "</div></section>";
    }
    if (c.deep && c.d && c.d.deep) h += '<section class="wsec"><h2><small>Vertiefung</small></h2>' + c.d.deep.map((ch, i) => '<div class="chapter"><h3><span>' + e.m + "." + (7 + i) + "</span>" + esc(ch.h) + '</h3><div class="reading">' + KS.cite(ch.body) + "</div>" + (ch.evidence ? '<div class="evidence"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 14h9"/></svg><div><b>' + esc(ch.evidence.label || "Was die Forschung zeigt") + "</b>" + KS.cite(ch.evidence.text) + "</div></div>" : "") + "</div>").join("") + "</section>";
    if (c.explore2) h += '<section class="wsec"><h2><small>Interaktiv</small></h2><div data-explore2="' + c.explore2 + '"></div></section>';
    if (c.practice) h += '<section class="wsec"><h2><small>Neue Übung</small></h2><div class="panel"><div class="row" style="justify-content:space-between"><h3 style="font-size:1.3rem">' + esc(c.practice.title) + '</h3><span class="chip accent">' + esc(c.practice.duration) + '</span></div><p class="muted" style="font-family:var(--f-read);max-width:var(--measure)">' + KS.cite(esc(c.practice.intro)) + '</p><ol class="steps">' + c.practice.steps.map((st) => "<li><span>" + esc(st) + "</span></li>").join("") + "</ol></div></section>";
    if (c.anchor) h += '<section class="wsec"><h2><small>Verankern</small></h2><div class="anchor-grid"><div class="panel"><h3>Was bleibt?</h3><p class="muted">Nach rund zwei Monaten Wiederholung im gleichen Kontext werden Verhaltensweisen im Mittel deutlich automatischer ' + KS.cite("[[lally2010]]") + '. Lege jetzt fest, welche Übung aus diesem Modul bleiben soll, und verknüpfe sie mit einem festen Auslöser.</p></div><div data-explore2="1"></div></div></section>';
    h += '<section class="wsec"><h2><small>Werkzeuge</small></h2>' + c.tools.map((id) => '<div class="tool" data-tool="' + id + '"></div>').join("") + "</section>";
    h += '<section class="wsec"><h2><small>Aufgaben dieser Woche</small></h2><div class="tasks">' + c.tasks.map((t, i) => { const nb = KS.boxesFor(t.freq), arr = s.t[i] || [], cnt = arr.filter(Boolean).length; return '<div class="task' + (cnt >= nb ? " complete" : "") + '"><div><h4>' + esc(t.title) + ' <span class="chip" style="margin-left:4px">' + esc(t.freq) + "</span></h4><p>" + KS.cite(esc(t.desc)) + '</p></div><div class="boxes">' + Array.from({ length: nb }, (_, j) => '<button type="button" class="box' + (arr[j] ? " on" : "") + '" data-ptick="' + k + ":" + i + ":" + j + '" aria-pressed="' + !!arr[j] + '" aria-label="' + esc(t.title) + '">' + (arr[j] ? KS.check : nb === 7 ? "T" + (j + 1) : nb > 1 ? j + 1 + "." : "") + "</button>").join("") + "</div></div>"; }).join("") + "</div></section>";
    h += '<section class="wsec"><h2><small>Reflexion</small></h2><div class="stack">' + c.reflection.map((q, i) => '<div class="field"><label for="pr' + k + "-" + i + '">' + esc(q) + '</label><textarea id="pr' + k + "-" + i + '" data-prefl="' + k + ":" + i + '">' + esc(s.r[i] || "") + "</textarea></div>").join("") + "</div></section>";
    h += '<div class="complete-box' + (s.done ? " is-done" : "") + '"><div><h3 style="font-size:1.2rem">' + (s.done ? "Programmwoche " + k + " abgeschlossen" : "Woche abschließen") + '</h3><p class="muted" style="margin:4px 0 0">' + (s.done ? "Abgeschlossen am " + KS.fmtDT(s.done) + "." : "Wenn du die wichtigsten Aufgaben ausprobiert hast, schließe die Woche ab.") + "</p></div>" + (s.done ? '<button type="button" class="btn ghost small" data-pundone="' + k + '">Wieder öffnen</button>' : '<button type="button" class="btn chunky" data-pdone="' + k + '">Abschließen</button>') + "</div>";
    h += '<nav class="wnav">' + (prev ? '<a class="btn ghost" href="' + label(prev) + '">← ' + esc(title(prev)) + "</a>" : "<span></span>") + (next ? '<a class="btn ghost" href="' + label(next) + '">' + esc(title(next)) + " →</a>" : '<a class="btn ghost" href="#verlauf">Zum Rückblick →</a>') + "</nav></div></article>";
    return h;
  };
  KS.bindPW = function (k, mountTool) {
    document.querySelectorAll("#app [data-tool]").forEach((el) => mountTool(el, el.dataset.tool));
    document.querySelectorAll("#app [data-explore2]").forEach((el) => KS.mountExplorable2(el, Number(el.dataset.explore2)));
    document.querySelectorAll("#app [data-prefl]").forEach((ta) => { const [kk, i] = ta.dataset.prefl.split(":"); let t; const sv = () => { pst(kk).r[i] = ta.value; KS.save(); }; ta.oninput = () => { clearTimeout(t); t = setTimeout(sv, 400); }; ta.onblur = sv; });
  };
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-ptick]");
    if (b) {
      const [k, i, j] = b.dataset.ptick.split(":").map(Number); const s = pst(k); s.t[i] = s.t[i] || []; s.t[i][j] = !s.t[i][j]; KS.save();
      const on = s.t[i][j]; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
      const e = KS.plan()[k - 1]; const nb = KS.boxesFor(pwContent(e).tasks[i].freq);
      b.innerHTML = on ? KS.check : nb === 7 ? "T" + (j + 1) : nb > 1 ? j + 1 + "." : "";
      const task = b.closest(".task"); if (task) task.classList.toggle("complete", s.t[i].filter(Boolean).length >= nb);
      if (on) KS.toast("Erledigt");
      return;
    }
    const d = ev.target.closest("[data-pdone]"); if (d) { pst(d.dataset.pdone).done = new Date().toISOString(); KS.save(); KS.confetti(); KS.toast("Woche abgeschlossen"); KS.rerender(); return; }
    const u = ev.target.closest("[data-pundone]"); if (u) { delete pst(u.dataset.pundone).done; KS.save(); KS.rerender(); }
  });

  /* Zeitachse (Gantt) */
  KS.timeline = function () {
    const plan = KS.plan(), cur = KS.currentPW(), n = plan.length, V = KS.VARIANTS[KS.variant()];
    const op = { lernen: 1, ueben: .7, vertiefen: .5, verankern: .35, integration: 1, abschluss: 1 };
    const months = KS.variant() === "w12" ? [] : Array.from({ length: Math.ceil(n / 4.35) }, (_, i) => i);
    return '<div class="tl"><div class="tl-track" style="grid-template-columns:repeat(' + n + ',minmax(0,1fr))">' + plan.map((e) => { const done = e.kind === "lernen" ? (KS.obj("weeks")[e.m] || {}).done : pst(e.pw).done; const integ = e.kind === "integration" || e.kind === "abschluss"; return '<a href="' + (e.kind === "lernen" ? "#woche-" + e.m : "#pw-" + e.pw) + '" class="tl-seg' + (e.pw === cur ? " cur" : "") + (done ? " done" : "") + (integ ? " integ" : "") + '" style="--ph:' + (integ ? "var(--glow)" : phc(e.phase)) + ";--op:" + op[e.kind] + '" title="Woche ' + e.pw + ": " + esc(e.kind === "lernen" ? "Lernen · " + W().find((w) => w.n === e.m).title : pwContent(e).title) + '"><span class="sr">Woche ' + e.pw + "</span></a>"; }).join("") + "</div>" +
      (months.length ? '<div class="tl-months" style="grid-template-columns:repeat(' + months.length + ',minmax(0,1fr))">' + months.map((i) => "<span>M" + (i + 1) + "</span>").join("") + "</div>" : "") +
      '<div class="tl-legend">' + V.rhythm.map((r, i) => '<span><i style="opacity:' + [1, .7, .5, .35][i] + '"></i>' + r + "</span>").join("") + (KS.variant() !== "w12" ? '<span><i style="background:var(--glow)"></i>Integration</span>' : "") + (cur ? '<span class="faint">Du bist in Woche ' + cur + " von " + n + "</span>" : "") + "</div></div>";
  };

  /* Aktivitätskalender (Heatmap) */
  KS.heatmap = function (weeks) {
    weeks = weeks || 26; const days = KS.obj("days"); const end = new Date(); const start = new Date(end); start.setDate(end.getDate() - (weeks * 7 - 1) - ((end.getDay() + 6) % 7) + 6 - 6);
    const s0 = new Date(end); s0.setDate(end.getDate() - ((end.getDay() + 6) % 7) - (weeks - 1) * 7);
    const cell = 13, gap = 3, W0 = 26; let svg = '<svg class="chart heat" viewBox="0 0 ' + (W0 + weeks * (cell + gap)) + " " + (7 * (cell + gap) + 18) + '" role="img" aria-label="Aktivitätskalender">';
    ["Mo", "", "Mi", "", "Fr", "", "So"].forEach((l, i) => l && (svg += '<text x="0" y="' + (i * (cell + gap) + 11) + '">' + l + "</text>"));
    let lastM = -1; const MON = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    for (let wk = 0; wk < weeks; wk++) for (let d = 0; d < 7; d++) {
      const dt = new Date(s0); dt.setDate(s0.getDate() + wk * 7 + d); if (dt > end) continue;
      const k = KS.dkey(dt), v = days[k] || 0; const lvl = v === 0 ? 0 : v < 3 ? 1 : v < 7 ? 2 : v < 14 ? 3 : 4;
      if (d === 0 && dt.getMonth() !== lastM) { lastM = dt.getMonth(); svg += '<text x="' + (W0 + wk * (cell + gap)) + '" y="' + (7 * (cell + gap) + 14) + '">' + MON[lastM] + "</text>"; }
      svg += '<rect x="' + (W0 + wk * (cell + gap)) + '" y="' + d * (cell + gap) + '" width="' + cell + '" height="' + cell + '" rx="3" class="h' + lvl + '"><title>' + KS.fmtD(k) + ": " + (v ? v + " Aktionen" : "keine Aktivität") + "</title></rect>";
    }
    return '<div style="overflow-x:auto">' + svg + '</svg></div><div class="heat-legend faint">weniger <span class="h0"></span><span class="h1"></span><span class="h2"></span><span class="h3"></span><span class="h4"></span> mehr</div>';
  };

  /* Wochentags-Stimmung */
  KS.weekdayBars = function () {
    const ci = KS.list("checkins"); const sum = Array(7).fill(0), cnt = Array(7).fill(0);
    ci.forEach((c) => { const d = (KS.parseD(c.d).getDay() + 6) % 7; sum[d] += c.mood; cnt[d]++; });
    const L = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    if (!ci.length) return '<div class="empty">Sobald du einige Check-ins hast, siehst du hier, an welchen Wochentagen es dir im Schnitt besser oder schlechter geht.</div>';
    let s = '<svg class="chart" viewBox="0 0 360 170" role="img" aria-label="Stimmung nach Wochentag"><g class="grid">' + [0, 5, 10].map((t) => '<line x1="26" x2="356" y1="' + (140 - t * 12) + '" y2="' + (140 - t * 12) + '"/><text x="20" y="' + (144 - t * 12) + '" text-anchor="end">' + t + "</text>").join("") + "</g>";
    L.forEach((l, i) => { const v = cnt[i] ? sum[i] / cnt[i] : 0; const x = 36 + i * 46; s += '<rect x="' + x + '" y="' + (140 - v * 12) + '" width="30" height="' + v * 12 + '" rx="6" fill="' + (i >= 5 ? "var(--glow)" : "var(--accent)") + '"/><text x="' + (x + 15) + '" y="158" text-anchor="middle">' + l + "</text>" + (cnt[i] ? '<text x="' + (x + 15) + '" y="' + (134 - v * 12) + '" text-anchor="middle" style="fill:var(--ink);font-weight:700">' + v.toFixed(1).replace(".", ",") + "</text>" : ""); });
    return s + "</svg>";
  };

  /* Werkzeug-Nutzung */
  KS.usageBars = function () {
    const U = [["Check-ins", "checkins"], ["Atmung, PMR, Meditation", "practice"], ["Gedankenprotokolle", "thoughts"], ["Gefühle benannt", "emotions"], ["Drei gute Dinge", "gratitude"], ["Aktivitäten", "activities"], ["Schlafnächte", "sleep"], ["Sorgen geparkt", "worries"]].map(([l, k]) => [l, KS.list(k).length]);
    const max = Math.max(1, ...U.map((u) => u[1]));
    return '<div class="stack" style="gap:8px">' + U.map(([l, v]) => '<div class="row" style="flex-wrap:nowrap;gap:10px"><span style="width:44%;font-size:.86rem">' + l + '</span><div class="bar" style="flex:1;height:12px"><i style="width:' + v / max * 100 + '%;background:var(--accent)"></i></div><b class="num" style="width:30px;text-align:right">' + v + "</b></div>").join("") + "</div>";
  };

  /* Variantenauswahl (Karten) */
  KS.variantPicker = function (sel) {
    return '<div class="vpick" role="radiogroup" aria-label="Programmlänge">' + Object.entries(KS.VARIANTS).map(([k, v]) => '<button type="button" role="radio" aria-checked="' + (k === sel) + '" class="vopt' + (k === sel ? " on" : "") + '" data-variant="' + k + '"><span class="vtag">' + v.tag + "</span><b>" + v.name + "</b><small>" + v.per + '</small><span class="vbars">' + Array.from({ length: Math.min(v.weeks, 52) }, () => "<i></i>").join("") + "</span></button>").join("") + "</div>";
  };
})();
