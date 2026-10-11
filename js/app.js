/* Klarsinn – Ansichten & Navigation */
(function () {
  const KS = window.KS, esc = KS.esc, W = (window.KS_WEEKS || []).slice().sort((a, b) => a.n - b.n), R = window.KS_REFS;
  const app = document.getElementById("app");
  const PH = { 1: ["Fundament", "Verstehen, wie Belastung entsteht, und den Körper beruhigen"], 2: ["Lebensstil", "Schlaf, Bewegung und Aufmerksamkeit als Basis"], 3: ["Gedanken & Gefühle", "Flexibel denken, Grübeln lösen, Gefühle regulieren"], 4: ["Verbindung & Richtung", "Selbstmitgefühl, Beziehungen, Werte und dein Plan"] };
  const phc = (p) => "var(--p" + p + ")";
  const profile = () => KS.obj("profile");
  const wstate = (n) => { const w = KS.obj("weeks"); w[n] = w[n] || { t: {}, q: {}, r: {} }; return w[n]; };

  KS.currentWeek = function () {
    const pw = KS.currentPW(); if (!pw) return null;
    return KS.plan()[pw - 1].m;
  };
  const boxesFor = (f) => (/täglich/.test(f) ? 7 : /(\d)×/.test(f) ? Number(f.match(/(\d)×/)[1]) : 1);
  KS.boxesFor = boxesFor;
  const unit = () => (KS.isLong() ? "Modul" : "Woche");
  function weekProgress(w) {
    const s = wstate(w.n); let tot = 0, got = 0;
    w.tasks.forEach((t, i) => { const n = boxesFor(t.freq); tot += n; got += (s.t[i] || []).filter(Boolean).length; });
    tot += w.quiz.length; got += Object.keys(s.q).length;
    tot += w.reflection.length; got += Object.values(s.r).filter((x) => x && x.trim()).length;
    return tot ? got / tot : 0;
  }
  KS.weekProgress = weekProgress;

  const SHORT = { 1: "Ankommen", 2: "Stress", 3: "Körper", 4: "Schlaf", 5: "Bewegung", 6: "Achtsamkeit", 7: "Gedanken", 8: "Grübeln", 9: "Gefühle", 10: "Selbst&shy;mitgefühl", 11: "Verbunden&shy;heit", 12: "Werte" };
  /* ---------- Wegkarte ---------- */
  function route() {
    const cur = KS.currentWeek(); const done = W.filter((w) => wstate(w.n).done).length;
    const fillTo = cur ? ((cur - 1) / 11) * 92 : 0;
    return '<div class="route"><div class="route-track"><div class="route-fill" style="width:' + fillTo + '%"></div>' +
      W.map((w) => { const s = wstate(w.n); return '<a class="stop' + (s.done ? " done" : "") + (w.n === cur ? " current" : "") + '" style="--ph:' + phc(w.phase) + '" href="#woche-' + w.n + '" aria-label="Woche ' + w.n + ": " + esc(w.title) + (s.done ? " (abgeschlossen)" : "") + '"><span class="node">' + (s.done ? KS.check.replace("<svg", '<svg width="18" height="18"') : KS.weekIcon(w.n, 19)) + '</span><span class="t"><b class="num">' + w.n + ".</b> " + SHORT[w.n] + "</span></a>"; }).join("") +
      '</div><div class="route-phases">' + [1, 2, 3, 4].map((p) => '<div style="--ph:' + phc(p) + '">' + PH[p][0] + "</div>").join("") + "</div>" +
      '<p class="faint" style="margin:12px 0 0;font-size:.82rem">' + done + " von 12 Wochen abgeschlossen" + (cur ? " · Du bist in Woche " + cur : "") + "</p></div>";
  }

  /* ---------- Startseite / Dashboard ---------- */
  function viewStart() {
    const p = profile();
    if (!p.start || !KS.licensed()) return landing();
    const cpw = KS.currentPW(), ce = KS.plan()[cpw - 1];
    if (ce && ce.kind !== "lernen") return viewStartPW(cpw, ce);
    const cur = KS.currentWeek(); const w = W.find((x) => x.n === cur) || W[0]; const s = wstate(w.n);
    const prog = weekProgress(w);
    const ci = KS.list("checkins"); const todayCI = ci.find((c) => c.d === KS.today());
    const who = KS.list("who5"); const lastWho = who[0];
    const dayIdx = Math.min(6, KS.daysBetween(p.start, KS.today()) % 7);
    const daily = w.tasks.map((t, i) => [t, i]).filter(([t]) => /täglich/.test(t.freq)); const hasCI = daily.some(([t]) => /check-in/i.test(t.title));
    const prac = KS.list("practice").reduce((a, x) => a + x.minutes, 0);
    const doneTasks = Object.values(KS.obj("weeks")).reduce((a, ws) => a + Object.values(ws.t || {}).reduce((b, arr) => b + arr.filter(Boolean).length, 0), 0);
    const hr = new Date().getHours(); const hello = hr < 11 ? "Guten Morgen" : hr < 18 ? "Hallo" : "Guten Abend";
    const series = [{ color: "var(--accent)", area: true, values: ci.map((c) => ({ x: c.d, y: c.mood })) }];
    return '<div class="dash fade-in"><section class="panel now" style="--ph:' + phc(w.phase) + '"><div class="eyebrow">' + hello + (p.name ? ", " + esc(p.name) : "") + " · " + (KS.isLong() ? "Programmwoche " + KS.currentPW() + " von " + KS.VARIANTS[KS.variant()].weeks + " · Lernen" : "Tag " + (dayIdx + 1) + " von Woche " + w.n) + '</div>' +
      '<div class="row" style="flex-wrap:nowrap;align-items:center;gap:18px">' + KS.ring(prog, "Woche " + w.n) + '<div style="min-width:0"><span class="chip" style="color:' + phc(w.phase) + '">Phase ' + w.phase + " · " + PH[w.phase][0] + '</span><h2 style="margin-top:8px">' + esc(w.title) + '</h2><p class="muted" style="margin:6px 0 0;font-family:var(--f-read)">' + esc(w.subtitle) + "</p></div></div>" +
      lessonCTA(w) + '<div class="row"><a class="btn ghost" href="#woche-' + w.n + '">Wochenseite öffnen</a><a class="btn ghost" href="#programm">Alle Wochen</a></div>' +
      '<hr class="soft"><div class="lbl">Heute dran</div><ul class="todo">' +
      (hasCI ? "" : '<li><button type="button" class="box' + (todayCI ? " on" : "") + '" data-go="tool-checkin" aria-label="Check-in">' + (todayCI ? KS.check : "") + '</button><span><a href="#tool-checkin">Täglicher Check-in</a> <span class="faint">· 2 Min.</span></span></li>') +
      daily.map(([t, i]) => { const on = !!(s.t[i] || [])[dayIdx]; return '<li><button type="button" class="box' + (on ? " on" : "") + '" data-tick="' + w.n + ":" + i + ":" + dayIdx + '" aria-pressed="' + on + '" aria-label="' + esc(t.title) + ' heute erledigt">' + (on ? KS.check : "") + "</button><span><b>" + esc(t.title) + '</b>' + (/check-in/i.test(t.title) ? ' <a href="#tool-checkin" style="font-size:.85rem">' + (todayCI ? "erledigt, ansehen" : "jetzt ausfüllen") + "</a>" : "") + '<br><span class="faint" style="font-size:.86rem">' + esc(t.desc) + "</span></span></li>"; }).join("") + "</ul></section>" +
      '<section class="stack"><div class="panel stack"><div class="row" style="justify-content:space-between"><span class="lbl">Stimmung, letzte 4 Wochen</span><a href="#tool-checkin" style="font-size:.85rem">Check-in</a></div>' + (ci.length ? KS.lineChart(series, { min: 1, max: 10, ticks: [1, 5, 10], h: 180 }) : '<div class="empty">Dein erster Check-in startet die Verlaufskurve.</div>') + "</div>" +
      certCard() + levelCard() + '<div class="kpis"><div class="kpi"><b>' + ci.length + '</b><span>Check-ins</span></div><div class="kpi"><b>' + doneTasks + '</b><span>Aufgaben erledigt</span></div><div class="kpi"><b>' + Math.round(prac) + '</b><span>Übungsminuten</span></div></div>' +
      '<div class="panel stack"><div class="row" style="justify-content:space-between"><span class="lbl">Wohlbefinden (WHO-5)</span><a href="#tool-who5" style="font-size:.85rem">' + (lastWho ? "Erneut messen" : "Jetzt messen") + "</a></div>" +
      (lastWho ? '<div class="row"><b class="num" style="font-family:var(--f-display);font-size:2rem">' + lastWho.score + '</b><span class="faint">/100 am ' + KS.fmtD(lastWho.d) + '</span><span class="chip ' + KS.who5Band(lastWho.score).cls + '">' + KS.who5Band(lastWho.score).t + '</span></div><div class="gauge"><div class="track"><span class="mark" style="left:' + lastWho.score + '%"></span></div></div>' : '<p class="muted" style="margin:0">Miss dein Ausgangsniveau. So siehst du am Ende, was sich verändert hat.</p>') +
      ((cur >= 6 && who.length < 2) || (cur >= 12 && who.length < 3) ? '<div class="note">Zeit für die ' + (cur >= 12 ? "Abschluss" : "Halbzeit") + '-Messung.</div>' : "") + "</div></section></div>" +
      dashBottom(w);
  }

  function certCard() {
    const cp = KS.certProgress(), due = KS.dueCards().length;
    return '<a class="panel cert-dash" href="#zertifikat"><div class="cert-mini small">' + KS.certSVG(!KS.certEarned()) + '</div><div style="min-width:0;flex:1"><span class="lbl">Abschlusszertifikat</span><div class="bar" style="height:8px;margin:8px 0 4px"><i style="width:' + Math.round(cp * 100) + '%"></i></div><span class="faint" style="font-size:.8rem">' + Math.round(cp * 100) + " % der Voraussetzungen · " + due + " Lernkarten fällig</span></div></a>";
  }
  function sidePanels() {
    const ci = KS.list("checkins"), who = KS.list("who5"), lastWho = who[0];
    const series = [{ color: "var(--accent)", area: true, values: ci.map((c) => ({ x: c.d, y: c.mood })) }];
    return '<section class="stack">' + certCard() + '<div class="panel stack"><div class="row" style="justify-content:space-between"><span class="lbl">Stimmung, letzte 4 Wochen</span><a href="#tool-checkin" style="font-size:.85rem">Check-in</a></div>' + (ci.length ? KS.lineChart(series, { min: 1, max: 10, ticks: [1, 5, 10], h: 180 }) : '<div class="empty">Dein erster Check-in startet die Verlaufskurve.</div>') + "</div>" + levelCard() +
      '<div class="panel stack"><div class="row" style="justify-content:space-between"><span class="lbl">Wohlbefinden (WHO-5)</span><a href="#tool-who5" style="font-size:.85rem">' + (lastWho ? "Erneut messen" : "Jetzt messen") + "</a></div>" + (lastWho ? '<div class="row"><b class="num" style="font-family:var(--f-display);font-size:2rem">' + lastWho.score + '</b><span class="faint">/100 am ' + KS.fmtD(lastWho.d) + '</span><span class="chip ' + KS.who5Band(lastWho.score).cls + '">' + KS.who5Band(lastWho.score).t + '</span></div><div class="gauge"><div class="track"><span class="mark" style="left:' + lastWho.score + '%"></span></div></div>' : '<p class="muted" style="margin:0">Miss dein Ausgangsniveau.</p>') + "</div></section>";
  }
  function dashBottom(w) {
    return '<div class="sec-h"><h2>Dein Weg</h2><a href="#programm">Programmübersicht</a></div>' + KS.timeline() + (KS.isLong() ? "" : "") + '<div style="margin-top:14px">' + route() + "</div>" +
      '<div class="grid2" style="margin-top:16px"><div class="panel stack"><div class="row" style="justify-content:space-between"><span class="lbl">Aktivitätskalender</span><span class="stat flame on">' + KS.flame + '<b class="num">' + KS.streak() + "</b></span></div>" + KS.heatmap(20) + '</div><div class="panel stack"><span class="lbl">Stimmung nach Wochentag</span>' + KS.weekdayBars() + "</div></div>" +
      '<div class="sec-h"><h2>Werkzeuge für jetzt</h2><a href="#werkzeuge">Alle 22 Werkzeuge</a></div><div class="toolgrid">' + w.tools.map(toolCard).join("") + "</div>";
  }
  function viewStartPW(k, e) {
    const p = profile(), c = KS.pwContent(e), s = KS.pst(k), prog = KS.pwProgress(e), w = W.find((x) => x.n === e.m), V = KS.VARIANTS[KS.variant()];
    const dayIdx = Math.min(6, KS.daysBetween(p.start, KS.today()) % 7);
    const daily = c.tasks.map((t, i) => [t, i]).filter(([t]) => /täglich/.test(t.freq));
    const hr = new Date().getHours(); const hello = hr < 11 ? "Guten Morgen" : hr < 18 ? "Hallo" : "Guten Abend";
    return '<div class="dash fade-in"><section class="panel now" style="--ph:' + phc(e.phase || 4) + '"><div class="eyebrow">' + hello + (p.name ? ", " + esc(p.name) : "") + " · Programmwoche " + k + " von " + V.weeks + '</div><div class="row" style="flex-wrap:nowrap;align-items:center;gap:18px">' + KS.ring(prog, KS.KIND[e.kind]) + '<div style="min-width:0"><span class="chip" style="color:' + phc(e.phase || 4) + '">' + V.name + " · " + KS.KIND[e.kind] + '</span><h2 style="margin-top:8px">' + esc(c.title) + '</h2><p class="muted" style="margin:6px 0 0;font-family:var(--f-read)">' + esc(c.focus) + '</p></div></div><div class="row"><a class="btn chunky big" href="#pw-' + k + '">Zur Praxiswoche</a><a class="btn ghost" href="#woche-' + e.m + '">Modul ' + e.m + " ansehen</a></div>" +
      '<hr class="soft"><div class="lbl">Heute dran</div><ul class="todo">' + (daily.length ? daily.map(([t, i]) => { const on = !!(s.t[i] || [])[dayIdx]; return '<li><button type="button" class="box' + (on ? " on" : "") + '" data-ptick="' + k + ":" + i + ":" + dayIdx + '" aria-pressed="' + on + '" aria-label="' + esc(t.title) + '">' + (on ? KS.check : "") + "</button><span><b>" + esc(t.title) + '</b><br><span class="faint" style="font-size:.86rem">' + esc(t.desc) + "</span></span></li>"; }).join("") : '<li><span class="muted">Diese Woche gibt es keine täglichen Aufgaben. Schau in die <a href="#pw-' + k + '">Wochenaufgaben</a>.</span></li>') + "</ul></section>" + sidePanels() + "</div>" + dashBottom({ tools: c.tools });
  }
  function levelCard() {
    const x = KS.xp(), lv = KS.level(x), st = KS.streak();
    return '<div class="panel level"><div class="lv-badge num">' + lv.n + '</div><div style="min-width:0;flex:1"><div class="row" style="justify-content:space-between"><b>Level ' + lv.n + " · " + lv.name + '</b><span class="stat xpc">' + KS.bolt + '<b class="num">' + x + ' XP</b></span></div><div class="bar" style="height:10px;margin:8px 0 6px"><i style="width:' + Math.round(lv.pct * 100) + '%"></i></div><span class="faint" style="font-size:.82rem">Noch ' + lv.toNext + " XP bis Level " + (lv.n + 1) + ' · <span class="stat flame' + (st ? " on" : "") + '" style="padding:0 4px">' + KS.flame + '<b class="num">' + st + "</b></span> " + (st === 1 ? "Tag" : "Tage") + " in Folge aktiv</span></div></div>";
  }
  function landing() {
    return '<section class="hero fade-in"><div><div class="eyebrow">Evidenzbasiertes Selbsthilfeprogramm</div><h1>Dein Programm für einen <em>klaren Kopf</em> und ein ruhigeres Herz.</h1>' +
      '<p class="lead">Klarsinn verbindet Methoden aus kognitiver Verhaltenstherapie, Akzeptanz- und Commitment-Therapie, Achtsamkeit und Positiver Psychologie zu einem strukturierten Programm. 60 interaktive Lektionen, 36 davon als Masterclass mit Theorie in der Tiefe, dazu angeleitete Übungen, konkrete Aufgaben und 22 Werkzeuge.</p>' +
      '<div class="row"><a class="btn chunky big" href="#kaufen">Jetzt starten</a><a class="btn ghost" href="#lektionen">60 Lektionen ansehen</a></div></div>' +
      '<div class="hero-card" id="los"><div class="eyebrow">Dein Start</div><h2 style="font-size:1.5rem;margin:6px 0 4px">Wähle deinen Weg</h2><p class="faint" style="margin:0 0 12px;font-size:.88rem">Je länger das Programm, desto günstiger jede Woche.</p>' + KS.priceCards("m6", true) + '<div class="row" style="margin-top:14px"><a class="btn chunky big" href="#kaufen">Jetzt starten</a><button type="button" class="btn ghost" data-lesson="1">Kostenlose Probelektion</button></div><p class="faint" style="font-size:.8rem;margin:10px 0 0">Gutscheincode? Einfach beim Start eingeben.</p></div></section>' +
      '<div class="facts"><div><b>60</b><span>interaktive Lektionen, davon 36 Masterclasses</span></div><div><b>288</b><span>Wissenskapitel mit Studienbelegen</span></div><div><b>46</b><span>Werkzeuge, Grafiken und Lernspiele</span></div><div><b>' + Object.keys(R).length + '</b><span>wissenschaftliche Quellen</span></div></div>' +
      '<div class="sec-h"><h2>Drei Wege, ein Ziel</h2><a href="#programm">Alle Inhalte</a></div><div class="variants">' + Object.entries(KS.VARIANTS).map(([k, v]) => '<div class="panel vcardx"><span class="vtag">' + v.tag + "</span><h3>" + v.name + '</h3><p class="muted">' + v.desc + '</p><div class="tl-mini" style="grid-template-columns:repeat(' + KS.plan(k).length + ',1fr)">' + KS.plan(k).map((e) => '<i style="background:' + (/integration|abschluss/.test(e.kind) ? "var(--glow)" : phc(e.phase)) + ";opacity:" + ({ lernen: 1, ueben: .7, vertiefen: .5, verankern: .35 }[e.kind] || 1) + '"></i>').join("") + '</div><span class="faint" style="font-size:.82rem">' + v.weeks + " Wochen · " + v.per + "</span></div>").join("") + "</div>" +
      '<div class="sec-h"><h2>Zwölf Themen in vier Phasen</h2></div>' + route() +
      '<div class="sec-h"><div><div class="eyebrow">Lernen durch Ausprobieren</div><h2>Probier es direkt aus</h2></div><span class="muted">Zwei von zwölf interaktiven Grafiken</span></div><div class="demo-grid"><div data-explore="2" style="--ph:var(--p1)"></div><div data-explore="7" style="--ph:var(--p3)"></div></div>' +
      '<div class="sec-h"><h2>So funktioniert jede Woche</h2></div><div class="method">' +
      [["Lektion", "Eine interaktive Lektion, Karte für Karte: Wissen mit Studienbelegen, Grafiken zum Ausprobieren und Fragen mit sofortigem Feedback."], ["Üben", "Eine angeleitete Übung und interaktive Werkzeuge: Atem-Taktgeber, Gedankenprotokoll, Schlaftagebuch und mehr."], ["Umsetzen", "Sechs bis sieben konkrete Aufgaben für den Alltag. Du hakst ab und siehst deinen Fortschritt."], ["Reflektieren", "Reflexionsfragen und ein kurzes Quiz festigen das Gelernte. Alles bleibt in deinem Tagebuch."]].map(([t, d], i) => '<div class="panel"><span class="chip accent num">Schritt ' + (i + 1) + "</span><h3>" + t + "</h3><p>" + d + "</p></div>").join("") + "</div>" +
      '<div class="sec-h"><h2>Worauf das Programm aufbaut</h2></div><div class="grid2"><div class="reading"><p>Strukturierte Selbsthilfe nach kognitiv-verhaltenstherapeutischen Prinzipien kann bei leichten bis mittleren Belastungen deutlich entlasten, besonders wenn sie regelmäßig genutzt wird ' + KS.cite("[[cuijpers2010]][[karyotaki2021]]") + '. Klarsinn bündelt Methoden mit guter Studienlage: Psychoedukation, Verhaltensaktivierung, kognitive Umstrukturierung, Achtsamkeit, Akzeptanz, Selbstmitgefühl und Rückfallprophylaxe.</p><p>Gemessen wird dein Verlauf mit dem WHO-5-Wohlbefindens-Index, einem der weltweit am häufigsten eingesetzten Kurzfragebögen ' + KS.cite("[[topp2015]]") + ', zu Beginn, zur Halbzeit und am Ende.</p></div>' +
      '<div class="note warn" style="align-self:start"><b>Wichtig:</b> Klarsinn ersetzt keine ärztliche oder psychotherapeutische Behandlung. Wenn du seit mehr als zwei Wochen kaum Freude empfindest, stark erschöpft bist, nicht mehr schlafen kannst oder an Suizid denkst, wende dich bitte an deine Hausarztpraxis, die 116 117 oder in akuten Krisen an die TelefonSeelsorge (0800 111 0 111) oder den Notruf 112. <a href="#hilfe">Alle Hilfsangebote</a></div></div>';
  }

  function toolCard(id) {
    const t = KS.tools[id]; if (!t) return "";
    return '<a class="tcard" href="#tool-' + id + '"><em>' + esc(t.cat) + "</em><b>" + esc(t.name) + "</b><span>" + t.desc + "</span></a>";
  }

  /* ---------- Programmübersicht ---------- */
  function viewProgram() {
    const cur = KS.currentWeek();
    const V = KS.VARIANTS[KS.variant()], plan = KS.plan();
    return '<div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Programm · ' + V.name + " · " + V.tag + '</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">Zwölf Themen, vier Phasen</h2></div></div>' +
      '<p class="reading muted" style="margin-top:-6px">Die Themen bauen aufeinander auf: Zuerst verstehst du Stress und beruhigst den Körper, dann stärkst du die Basis aus Schlaf, Bewegung und Aufmerksamkeit. Darauf folgen Gedanken und Gefühle, zum Schluss Selbstmitgefühl, Beziehungen und deine Werte. Plane pro Tag etwa 15 bis 25 Minuten ein.</p>' +
      '<div class="panel stack" style="margin-bottom:16px"><div class="row" style="justify-content:space-between"><span class="lbl">Programmlänge wählen</span><span class="faint" style="font-size:.85rem">Dein Fortschritt bleibt beim Wechsel erhalten.</span></div>' + KS.variantPicker(KS.variant()) + '<p class="muted" style="margin:0">' + V.desc + "</p></div>" +
      KS.timeline() + '<div style="margin-top:14px">' + route() + "</div>" +
      [1, 2, 3, 4].map((p) => '<div class="sec-h"><div><div class="eyebrow" style="color:' + phc(p) + '">Phase ' + p + "</div><h2>" + PH[p][0] + '</h2></div><span class="muted">' + PH[p][1] + '</span></div><div class="weeks">' +
        W.filter((w) => w.phase === p).map((w) => { const pr = weekProgress(w), s = wstate(w.n); return '<a class="wcard" href="#woche-' + w.n + '" style="--ph:' + phc(p) + '"><div class="top-row"><span class="wn"><span class="wicon">' + KS.weekIcon(w.n, 20) + "</span>" + unit() + " " + w.n + "</span>" + (s.done ? '<span class="chip ok">Abgeschlossen</span>' : w.n === cur ? '<span class="chip glow">Aktuelle Woche</span>' : '<span class="chip">' + esc(w.minutes || "") + "</span>") + "</div><div><h3>" + esc(w.title) + "</h3><p>" + esc(w.subtitle) + '</p></div>' + (KS.isLong() ? '<div class="subweeks">' + plan.filter((e) => e.m === w.n && /lernen|ueben|vertiefen|verankern/.test(e.kind)).map((e) => '<span class="chip' + ((e.kind === "lernen" ? s.done : KS.pst(e.pw).done) ? " ok" : "") + '">W' + e.pw + " " + KS.KIND[e.kind] + "</span>").join("") + "</div>" : "") + '<div class="bar"><i style="width:' + Math.round(pr * 100) + '%"></i></div></a>'; }).join("") + "</div>").join("") +
      (KS.isLong() ? '<div class="sec-h"><h2>Integrations- und Abschlusswochen</h2></div><div class="weeks">' + plan.filter((e) => /integration|abschluss/.test(e.kind)).map((e) => '<a class="wcard" href="#pw-' + e.pw + '" style="--ph:var(--glow)"><div class="top-row"><span class="wn"><span class="wicon">' + KS.weekIcon(12, 20) + "</span>Woche " + e.pw + "</span>" + (KS.pst(e.pw).done ? '<span class="chip ok">Abgeschlossen</span>' : "") + "</div><div><h3>" + esc(KS.pwContent(e).title) + "</h3><p>" + esc(KS.pwContent(e).focus) + '</p></div><div class="bar"><i style="width:' + Math.round(KS.pwProgress(e) * 100) + '%"></i></div></a>').join("") + "</div>" : "");
  }

  /* ---------- Wochenseite ---------- */
  const IC_EV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 14h9"/></svg>';
  function viewWeek(n) {
    const w = W.find((x) => x.n === n); if (!w) return notFound();
    const s = wstate(n);
    const secs = [["einstieg", "Einstieg"], ["lektionen", "Lektionen"], ["wissen", "Wissen"], ["uebung", "Übung"], ["werkzeuge", "Werkzeuge"], ["aufgaben", "Aufgaben"], ["reflexion", "Reflexion"], ["quiz", "Quiz"], ["quellen", "Quellen"]];
    const tasksDone = w.tasks.every((t, i) => (s.t[i] || []).filter(Boolean).length >= boxesFor(t.freq));
    const ticks = { aufgaben: tasksDone, quiz: Object.keys(s.q).length === w.quiz.length, reflexion: w.reflection.every((_, i) => (s.r[i] || "").trim()) };
    const prev = W.find((x) => x.n === n - 1), next = W.find((x) => x.n === n + 1);
    return  '<article style="--ph:' + phc(w.phase) + '" class="fade-in"><header class="whead"><div><div class="eyebrow" style="color:' + phc(w.phase) + '">' + (KS.isLong() ? "Modul " + n + " von 12 · Programmwoche " + KS.pwOf(n, "lernen") + " · Lernen" : "Woche " + n + " von 12") + " · Phase " + w.phase + ": " + PH[w.phase][0] + "</div><h1 style=\"margin-top:10px\">" + esc(w.title) + '</h1><div class="sub">' + esc(w.subtitle) + '</div><div class="row" style="margin-top:14px"><span class="chip">' + esc(w.minutes || "") + '</span><span class="chip">' + w.input.length + " Kapitel</span><span class=\"chip\">" + w.tasks.length + ' Aufgaben</span><span class="chip glow num">' + Math.round(weekProgress(w) * 100) + ' % erledigt</span></div>' + lessonCTA(w) + '</div><div class="bignum" aria-hidden="true">' + String(n).padStart(2, "0") + "</div></header>" +
      '<div class="wlayout"><nav class="toc" aria-label="Abschnitte dieser Woche">' + secs.map(([id, t]) => '<a href="#w' + n + "-" + id + '" data-sec="' + id + '">' + t + (ticks[id] ? '<span class="tick">✓</span>' : "") + "</a>").join("") + "</nav><div style=\"min-width:0\">" +
      '<section class="wsec" id="w' + n + '-einstieg"><h2><small>Einstieg</small></h2><div class="reading"><p style="font-size:1.15rem">' + KS.cite(esc(w.lead)) + '</p></div><div class="lbl" style="margin-top:14px">Das nimmst du diese Woche mit</div><ul class="goals">' + w.goals.map((g) => "<li><span>" + esc(g) + "</span></li>").join("") + "</ul></section>" +
      '<section class="wsec" id="w' + n + '-lektionen"><h2><small>Lektionen dieses Moduls</small></h2><div class="lib-row">' + KS.lessonsOf(n).map((l, i) => KS.lessonTile(n, l, !KS.licensed() && !(n === 1 && i === 0))).join("") + (KS.licensed() ? KS.cases().filter((c) => c.n === n).map(KS.caseTile).join("") : "") + "</div></section>" +
      '<section class="wsec" id="w' + n + '-wissen"><h2><small>Wissen</small></h2>' + w.input.map((c, i) => '<div class="chapter"><h3><span>' + n + "." + (i + 1) + "</span>" + esc(c.h) + '</h3><div class="reading">' + KS.cite(c.body) + "</div>" + (c.evidence ? '<div class="evidence">' + IC_EV + "<div><b>" + esc(c.evidence.label || "Was die Forschung zeigt") + "</b>" + KS.cite(c.evidence.text) + "</div></div>" : "") + "</div>" + (i === Math.min(1, w.input.length - 1) ? '<div class="chapter" data-explore="' + n + '"></div>' : "") + (i === Math.min(3, w.input.length - 1) ? '<div class="chapter" data-explore2="' + n + '"></div>' : "")).join("") +
      (w.myth ? '<div class="lbl" style="margin-bottom:8px">Mythos und Fakt</div><div class="myth"><div><b>Verbreitete Annahme</b>' + esc(w.myth.myth) + "</div><div><b>Was stimmt</b>" + KS.cite(w.myth.fact) + "</div></div>" : "") +
      '<div class="lbl" style="margin:26px 0 10px">Das Wichtigste in Kürze</div><ol class="takeaways">' + w.takeaways.map((t) => "<li><span>" + KS.cite(esc(t)) + "</span></li>").join("") + "</ol></section>" +
      '<section class="wsec" id="w' + n + '-uebung"><h2><small>Angeleitete Übung</small></h2><div class="panel"><div class="row" style="justify-content:space-between"><h3 style="font-size:1.3rem">' + esc(w.practice.title) + '</h3><span class="chip accent">' + esc(w.practice.duration) + '</span></div><p class="muted" style="font-family:var(--f-read);max-width:var(--measure)">' + KS.cite(esc(w.practice.intro)) + '</p><ol class="steps" data-steps>' + w.practice.steps.map((st) => "<li><span>" + esc(st) + "</span></li>").join("") + '</ol><div class="row" style="margin-top:12px"><button type="button" class="btn small" data-walk>Schritt für Schritt durchgehen</button><span class="faint" style="font-size:.85rem" data-walkinfo></span></div></div></section>' +
      '<section class="wsec" id="w' + n + '-werkzeuge"><h2><small>Interaktive Werkzeuge</small></h2><p class="muted reading" style="margin-top:-4px">' + KS.cite(esc(w.toolIntro || "")) + "</p>" + w.tools.map((id) => '<div class="tool" data-tool="' + id + '"></div>').join("") + "</section>" +
      '<section class="wsec" id="w' + n + '-aufgaben"><h2><small>Wochenaufgaben</small></h2><div class="tasks">' + w.tasks.map((t, i) => { const nb = boxesFor(t.freq); const arr = s.t[i] || []; const c = arr.filter(Boolean).length; const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]; const lbl = (k) => (nb === 7 ? "T" + (k + 1) : nb === 1 ? "" : k + 1 + "."); void days; return '<div class="task' + (c >= nb ? " complete" : "") + '"><div><h4>' + esc(t.title) + ' <span class="chip" style="margin-left:4px">' + esc(t.freq) + "</span></h4><p>" + KS.cite(esc(t.desc)) + '</p></div><div class="boxes">' + Array.from({ length: nb }, (_, k) => '<button type="button" class="box' + (arr[k] ? " on" : "") + '" data-tick="' + n + ":" + i + ":" + k + '" aria-pressed="' + !!arr[k] + '" aria-label="' + esc(t.title) + (nb > 1 ? ", " + (nb === 7 ? "Tag " : "Mal ") + (k + 1) : "") + '">' + (arr[k] ? KS.check : lbl(k)) + "</button>").join("") + "</div></div>"; }).join("") + "</div></section>" +
      '<section class="wsec" id="w' + n + '-reflexion"><h2><small>Reflexion</small></h2><p class="muted reading" style="margin-top:-4px">Nimm dir am Ende der Woche zehn Minuten. Deine Antworten werden automatisch gespeichert und erscheinen in deinem Verlauf.</p><div class="stack">' + w.reflection.map((q, i) => '<div class="field"><label for="r' + n + "-" + i + '">' + esc(q) + '</label><textarea id="r' + n + "-" + i + '" data-refl="' + i + '">' + esc(s.r[i] || "") + "</textarea></div>").join("") + "</div></section>" +
      '<section class="wsec" id="w' + n + '-quiz"><h2><small>Wissens-Check</small></h2><div class="quiz">' + w.quiz.map((q, i) => quizItem(n, q, i, s.q[i])).join("") + "</div></section>" +
      '<section class="wsec" id="w' + n + '-quellen"><h2><small>Quellen dieser Woche</small></h2><ul class="refs">' + w.refs.slice().sort((a, b) => (R[a] ? R[a].r : a).localeCompare(R[b] ? R[b].r : b)).map((k) => (R[k] ? '<li id="ref-' + n + "-" + k + '">' + R[k].r + " " + KS.refLink(k) + "</li>" : "")).join("") + "</ul></section>" +
      '<div class="complete-box' + (s.done ? " is-done" : "") + '"><div><h3 style="font-size:1.2rem">' + (s.done ? "Woche " + n + " abgeschlossen" : "Bereit für den Abschluss?") + '</h3><p class="muted" style="margin:4px 0 0">' + (s.done ? "Abgeschlossen am " + KS.fmtDT(s.done) + ". Die Übungen bleiben dir erhalten, nutze sie weiter." : "Du musst nicht alles perfekt erledigt haben. Wichtig ist, dass du die Kernübung ausprobiert hast.") + "</p></div>" + (s.done ? '<button type="button" class="btn ghost small" data-undone>Wieder öffnen</button>' : '<button type="button" class="btn glow" data-done>Woche ' + n + " abschließen</button>") + "</div>" +
      '<nav class="wnav">' + (prev ? '<a class="btn ghost" href="#woche-' + prev.n + '">← Woche ' + prev.n + ": " + esc(prev.title) + "</a>" : "<span></span>") + (KS.isLong() ? '<a class="btn chunky" href="#pw-' + (KS.pwOf(n, "lernen") + 1) + '">Weiter zur Übungswoche →</a>' : next ? '<a class="btn ghost" href="#woche-' + next.n + '">Woche ' + next.n + ": " + esc(next.title) + " →</a>" : '<a class="btn ghost" href="#verlauf">Zum Rückblick →</a>') + "</nav></div></div></article>";
  }
  function quizItem(n, q, i, ans) {
    const answered = ans !== undefined;
    return '<div class="q" data-q="' + i + '"><h4>' + (i + 1) + ". " + esc(q.q) + "</h4>" + q.options.map((o, k) => '<button type="button" class="opt' + (answered && k === q.correct ? " right" : "") + (answered && k === ans && k !== q.correct ? " wrong" : "") + '" data-ans="' + n + ":" + i + ":" + k + '"' + (answered ? " disabled" : "") + ">" + esc(o) + "</button>").join("") + (answered ? '<div class="explain"><b>' + (ans === q.correct ? "Richtig. " : "Nicht ganz. ") + "</b>" + KS.cite(esc(q.explain)) + "</div>" : "") + "</div>";
  }

  function bindWeek(n) {
    const w = W.find((x) => x.n === n); if (!w) return; const s = wstate(n);
    app.querySelectorAll("[data-tool]").forEach((el) => mountTool(el, el.dataset.tool));
    app.querySelectorAll("[data-explore]").forEach((el) => KS.mountExplorable(el, Number(el.dataset.explore)));
    app.querySelectorAll("[data-explore2]").forEach((el) => KS.mountExplorable2(el, Number(el.dataset.explore2)));
    app.querySelectorAll("[data-refl]").forEach((ta) => { let t; ta.oninput = () => { clearTimeout(t); t = setTimeout(() => { s.r[ta.dataset.refl] = ta.value; KS.save(); }, 400); }; ta.onblur = () => { s.r[ta.dataset.refl] = ta.value; KS.save(); }; });
    app.querySelectorAll("[data-ans]").forEach((b) => (b.onclick = () => { const [, i, k] = b.dataset.ans.split(":").map(Number); s.q[i] = k; KS.save(); const q = w.quiz[i]; const box = b.closest(".q"); box.outerHTML = quizItem(n, q, i, k); bindWeek.quizRebind(n); }));
    const d = app.querySelector("[data-done]"); if (d) d.onclick = () => { s.done = new Date().toISOString(); KS.save(); KS.toast("Woche " + n + " abgeschlossen. Stark."); render(); window.scrollTo({ top: 0 }); };
    const u = app.querySelector("[data-undone]"); if (u) u.onclick = () => { delete s.done; KS.save(); render(); };
    const walk = app.querySelector("[data-walk]");
    if (walk) { let k = -1; const items = app.querySelectorAll("[data-steps] li"); walk.onclick = () => { k++; items.forEach((li, j) => li.classList.toggle("on", j === k)); if (k < items.length) { walk.textContent = k === items.length - 1 ? "Fertig" : "Nächster Schritt"; app.querySelector("[data-walkinfo]").textContent = "Schritt " + (k + 1) + " von " + items.length; items[k].scrollIntoView({ block: "nearest", behavior: "smooth" }); } else { k = -1; walk.textContent = "Noch einmal durchgehen"; app.querySelector("[data-walkinfo]").textContent = "Gut gemacht."; KS.logPractice("Übung W" + n, 0); } }; }
    // aktiven Abschnitt im Inhaltsverzeichnis markieren
    const links = app.querySelectorAll(".toc a");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { const id = e.target.id.split("-").pop(); links.forEach((a) => a.classList.toggle("active", a.dataset.sec === id)); } }), { rootMargin: "-30% 0px -60% 0px" });
      app.querySelectorAll(".wsec").forEach((x) => io.observe(x)); cleanups.push(() => io.disconnect());
    }
    app.querySelectorAll(".toc a").forEach((a) => (a.onclick = (e) => { e.preventDefault(); const t = document.getElementById(a.getAttribute("href").slice(1)); if (t) t.scrollIntoView({ behavior: "smooth" }); }));
  }
  bindWeek.quizRebind = (n) => { const w = W.find((x) => x.n === n), s = wstate(n); app.querySelectorAll("[data-ans]").forEach((b) => { if (b.onclick) return; b.onclick = () => { const [, i, k] = b.dataset.ans.split(":").map(Number); s.q[i] = k; KS.save(); b.closest(".q").outerHTML = quizItem(n, w.quiz[i], i, k); bindWeek.quizRebind(n); }; }); };

  /* Haken (global, auch auf Dashboard) */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tick]"); if (!b) return;
    const [n, i, k] = b.dataset.tick.split(":").map(Number); const s = wstate(n);
    s.t[i] = s.t[i] || []; s.t[i][k] = !s.t[i][k]; KS.save();
    const on = s.t[i][k]; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
    const w = W.find((x) => x.n === n); const nb = boxesFor(w.tasks[i].freq);
    b.innerHTML = on ? KS.check : (location.hash.startsWith("#woche") ? (nb === 7 ? "T" + (k + 1) : nb === 1 ? "" : k + 1 + ".") : "");
    const task = b.closest(".task"); if (task) task.classList.toggle("complete", s.t[i].filter(Boolean).length >= nb);
    if (on) KS.toast("Erledigt");
    const chip = app.querySelector(".whead .chip.glow"); if (chip) chip.textContent = Math.round(weekProgress(w) * 100) + " % erledigt";
  });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) location.hash = b.dataset.go; });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-lesson]"); if (b) { e.preventDefault(); if (!KS.licensed() && (b.dataset.mode || b.dataset.lesson !== "1")) { location.hash = "#kaufen"; return; } KS.openLesson(Number(b.dataset.lesson), b.dataset.restart ? 0 : undefined, b.dataset.mode, b.dataset.key); } });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-variant]"); if (!b) return; const g = b.closest(".vpick"); g.querySelectorAll(".vopt").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); }); if (profile().start) { profile().variant = b.dataset.variant; KS.save(); KS.toast("Programm: " + KS.VARIANTS[b.dataset.variant].name); render(); } });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-buy]"); if (b && !document.getElementById("buyForm")) location.hash = "#kaufen-" + b.dataset.buy; });
  function lessonCTA(w) {
    const L = KS.obj("lessons")[w.n] || {}; const total = KS.buildCards(w).length; const pos = L.pos || 0;
    const label = L.done ? "Lektion wiederholen" : pos > 0 ? "Lektion fortsetzen" : "Lektion starten";
    return '<div class="lesson-cta"><button type="button" class="btn chunky big" data-lesson="' + w.n + '"' + (L.done ? ' data-restart="1"' : "") + '>' + label + '</button><span class="faint" style="font-size:.85rem">' + (L.done ? '<span class="chip ok">Lektion abgeschlossen</span> ' : "") + total + " interaktive Karten · ca. " + Math.max(8, Math.round(total * 0.6)) + " Min." + (pos > 0 && !L.done ? " · Karte " + (pos + 1) + " von " + total : "") + "</span></div>";
  }

  /* ---------- Werkzeuge ---------- */
  let cleanups = [];
  function mountTool(el, id) {
    const t = KS.tools[id]; if (!t) { el.remove(); return; }
    try { t.mount(el); } catch (err) { el.innerHTML = '<div class="note crit">Dieses Werkzeug konnte nicht geladen werden.</div>'; console.error(err); }
    cleanups.push(() => el._cleanup && el._cleanup());
  }
  function viewTools() {
    const cats = [];
    KS.toolOrder.forEach((id) => { const c = KS.tools[id].cat; if (!cats.includes(c)) cats.push(c); });
    return '<div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Werkzeugkasten</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">22 Werkzeuge für jeden Tag</h2></div></div><p class="reading muted" style="margin-top:-6px">Alle Werkzeuge stehen dir jederzeit zur Verfügung, auch über die zwölf Wochen hinaus. Die Kennzeichnung zeigt, in welcher Woche sie eingeführt werden.</p>' +
      cats.map((c) => '<h3 style="margin:28px 0 12px;font-size:1.15rem">' + esc(c) + '</h3><div class="toolgrid">' + KS.toolOrder.filter((id) => KS.tools[id].cat === c).map((id) => toolCard(id).replace("</em>", " · Woche " + KS.tools[id].weeks.join(", ") + "</em>")).join("") + "</div>").join("");
  }
  function viewTool(id) {
    const t = KS.tools[id]; if (!t) return notFound();
    return '<div class="row" style="margin-bottom:14px"><a href="#werkzeuge" class="btn ghost small">← Alle Werkzeuge</a>' + t.weeks.map((n) => '<a class="chip" href="#woche-' + n + '">Woche ' + n + "</a>").join("") + '</div><div class="tool" data-tool="' + id + '"></div>';
  }

  /* ---------- Verlauf ---------- */
  function viewProgress() {
    const ci = KS.list("checkins"), who = KS.list("who5").slice().reverse(), prac = KS.list("practice");
    const weeksDone = W.filter((w) => wstate(w.n).done).length;
    const sleepC = KS.list("sleep").map(KS.sleepCalc).filter(Boolean);
    const avgSE = sleepC.length ? Math.round(sleepC.slice(0, 7).reduce((a, c) => a + c.se, 0) / Math.min(7, sleepC.length)) : null;
    const whoChart = who.length ? '<svg class="chart" viewBox="0 0 640 200" role="img" aria-label="WHO-5-Verlauf">' + (function () {
      const pad = 34, H = 200, Y = (v) => 14 + (1 - v / 100) * (H - 44); let s = '<g class="grid">' + [0, 28, 50, 100].map((t) => '<line x1="' + pad + '" x2="626" y1="' + Y(t) + '" y2="' + Y(t) + '"/><text x="' + (pad - 8) + '" y="' + (Y(t) + 4) + '" text-anchor="end">' + t + "</text>").join("") + "</g>";
      const X = (i) => (who.length === 1 ? 330 : pad + 30 + i * ((560 - 30) / (who.length - 1)));
      s += '<path d="' + who.map((h, i) => (i ? "L" : "M") + X(i) + " " + Y(h.score)).join(" ") + '" fill="none" stroke="var(--glow)" stroke-width="2.5"/>';
      s += who.map((h, i) => '<circle cx="' + X(i) + '" cy="' + Y(h.score) + '" r="5" fill="var(--glow)"/><text x="' + X(i) + '" y="' + (Y(h.score) - 10) + '" text-anchor="middle" style="fill:var(--ink);font-weight:700">' + h.score + '</text><text x="' + X(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + KS.fmtD(h.d) + "</text>").join("");
      return s;
    })() + "</svg>" : '<div class="empty">Noch keine Messung. <a href="#tool-who5">WHO-5 jetzt ausfüllen</a></div>';
    const first = who[0], last = who[who.length - 1];
    const refl = W.map((w) => { const s = wstate(w.n); const items = w.reflection.map((q, i) => [q, s.r[i]]).filter(([, a]) => a && a.trim()); return items.length ? '<details class="panel"><summary><b>Woche ' + w.n + ": " + esc(w.title) + '</b> <span class="faint">· ' + items.length + " Antworten</span></summary>" + items.map(([q, a]) => '<div style="margin-top:12px"><div class="lbl">' + esc(q) + '</div><div style="font-family:var(--f-read)">' + KS.nl2br(a) + "</div></div>").join("") + "</details>" : ""; }).join("");
    return '<div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Mein Verlauf</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">Was sich bewegt</h2></div><a class="btn ghost small" href="#daten">Daten sichern</a></div>' +
      '<div class="facts" style="margin-top:0"><div><b>' + weeksDone + '/12</b><span>Themen abgeschlossen</span></div><div><b>' + ci.length + '</b><span>Check-ins</span></div><div><b>' + Math.round(prac.reduce((a, p) => a + p.minutes, 0)) + '</b><span>Minuten Atmung, PMR, Meditation</span></div><div><b>' + (avgSE !== null ? avgSE + " %" : "–") + "</b><span>Ø Schlafeffizienz</span></div></div>" +
      '<div class="grid2"><div class="panel stack"><span class="lbl">Wohlbefinden (WHO-5) über das Programm</span>' + whoChart + (who.length >= 2 ? '<div class="note' + (last.score - first.score >= 10 ? "" : " warn") + '">Veränderung seit der ersten Messung: <b class="num">' + (last.score - first.score > 0 ? "+" : "") + (last.score - first.score) + " Punkte</b>. " + (last.score - first.score >= 10 ? "Das ist eine bedeutsame Verbesserung." : last.score - first.score <= -10 ? "Dein Wohlbefinden ist gesunken. Bitte sprich mit einer Fachperson darüber." : "Noch keine bedeutsame Veränderung (ab 10 Punkten). Veränderung braucht oft Zeit.") + "</div>" : "") + "</div>" +
      '<div class="panel stack"><span class="lbl">Stimmung, Energie und Stress (8 Wochen)</span>' + (ci.length ? KS.lineChart([{ color: "var(--accent)", area: true, values: ci.map((c) => ({ x: c.d, y: c.mood })) }, { color: "var(--glow)", values: ci.filter((c) => c.energy).map((c) => ({ x: c.d, y: c.energy })) }, { color: "var(--crit)", dash: true, values: ci.filter((c) => c.stress).map((c) => ({ x: c.d, y: c.stress })) }], { days: 56, min: 1, max: 10, ticks: [1, 4, 7, 10], h: 200 }) : '<div class="empty">Noch keine Check-ins.</div>') + "</div></div>" +
      '<div class="grid2" style="margin-top:16px"><div class="panel stack"><span class="lbl">Aktivitätskalender (26 Wochen)</span>' + KS.heatmap(26) + '</div><div class="panel stack"><span class="lbl">Stimmung nach Wochentag</span>' + KS.weekdayBars() + '</div></div><div class="grid2" style="margin-top:16px"><div class="panel stack"><span class="lbl">Was du am meisten nutzt</span>' + KS.usageBars() + '</div><div data-explore2="12"></div></div>' +
      '<div class="sec-h"><h2>Programmverlauf</h2></div>' + KS.timeline() +
      '<div class="sec-h"><h2>Fortschritt je Thema</h2></div><div class="panel stack">' + W.map((w) => { const p = weekProgress(w); return '<div class="row" style="flex-wrap:nowrap;gap:12px"><a href="#woche-' + w.n + '" style="width:min(220px,42%);font-size:.9rem;text-decoration:none;color:var(--ink)"><b class="num">' + w.n + ".</b> " + esc(w.title) + '</a><div class="bar" style="flex:1"><i style="width:' + Math.round(p * 100) + "%;background:" + phc(w.phase) + '"></i></div><span class="num faint" style="width:44px;text-align:right;font-size:.85rem">' + Math.round(p * 100) + " %</span></div>"; }).join("") + "</div>" +
      '<div class="sec-h"><h2>Meine Reflexionen</h2></div><div class="stack">' + (refl || '<div class="empty">Deine Antworten auf die Reflexionsfragen erscheinen hier, Woche für Woche.</div>') + "</div>";
  }

  /* ---------- Quellen ---------- */
  function viewSources() {
    const topics = []; Object.values(R).forEach((r) => { if (!topics.includes(r.topic)) topics.push(r.topic); });
    const used = {}; W.forEach((w) => w.refs.forEach((k) => (used[k] = (used[k] || []).concat(w.n))));
    return '<div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Wissenschaftliche Grundlage</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">' + Object.keys(R).length + ' Quellen</h2></div><input type="text" class="search" id="srcq" placeholder="Autor, Jahr oder Stichwort suchen" aria-label="Quellen durchsuchen"></div>' +
      '<p class="reading muted" style="margin-top:-6px">Alle Inhalte stützen sich auf begutachtete Fachartikel, Meta-Analysen, Leitlinien und Standardwerke. Zitiert wird nach APA 7. Bei Studien in PubMed führt der Link direkt zum Eintrag, sonst zur Suche in Google Scholar.</p><div id="srclist">' +
      topics.map((t) => '<div class="src-group"><h3>' + esc(t) + '</h3><ul class="refs">' + Object.entries(R).filter(([, r]) => r.topic === t).sort((a, b) => a[1].r.localeCompare(b[1].r)).map(([k, r]) => '<li id="src-' + k + '" data-s="' + esc(r.r.replace(/<[^>]+>/g, "").toLowerCase()) + '">' + r.r + " " + KS.refLink(k) + (used[k] ? ' <span class="faint" style="font-size:.78rem">· Woche ' + used[k].join(", ") + "</span>" : "") + "</li>").join("") + "</ul></div>").join("") + "</div>";
  }

  /* ---------- Hilfe ---------- */
  function viewHelp() {
    const card = (t, num, d) => '<div class="panel stack" style="gap:6px"><span class="lbl">' + t + '</span><span class="phone">' + num + '</span><span class="muted" style="font-size:.9rem">' + d + "</span></div>";
    return '<div class="callout fade-in"><div class="eyebrow" style="color:var(--crit)">Akute Krise</div><h2>Wenn du in Gefahr bist oder daran denkst, dir das Leben zu nehmen</h2><p style="margin:0;font-family:var(--f-read);font-size:1.05rem">Ruf sofort den <b>Notruf 112</b> an oder geh in die Notaufnahme der nächsten psychiatrischen Klinik. Du musst damit nicht allein bleiben. Diese Gefühle können sich verändern, und es gibt Menschen, die dir jetzt helfen.</p></div>' +
      '<div class="sec-h"><h2>Deutschland</h2></div><div class="help-grid">' +
      card("Notruf", "112", "Bei akuter Lebensgefahr, rund um die Uhr.") +
      card("TelefonSeelsorge", "0800 111 0 111", "Oder 0800 111 0 222 bzw. 116 123. Anonym, kostenfrei, rund um die Uhr. Chat und Mail: online.telefonseelsorge.de") +
      card("Ärztlicher Bereitschaftsdienst", "116 117", "Wenn die Hausarztpraxis geschlossen ist. Über die 116 117 erreichst du auch die Terminservicestelle für ein psychotherapeutisches Erstgespräch.") +
      card("Info-Telefon Depression", "0800 33 44 533", "Stiftung Deutsche Depressionshilfe und Suizidprävention. Information und Orientierung zu Hilfsangeboten.") +
      card("Nummer gegen Kummer", "116 111", "Für Kinder und Jugendliche. Elterntelefon: 0800 111 0 550.") +
      card("krisenchat", "krisenchat.de", "Psychosoziale Beratung per Chat für junge Menschen unter 25, rund um die Uhr.") + "</div>" +
      '<div class="sec-h"><h2>Österreich und Schweiz</h2></div><div class="help-grid">' + card("Österreich: Telefonseelsorge", "142", "Rund um die Uhr, kostenfrei. Notruf Rettung: 144.") + card("Schweiz: Die Dargebotene Hand", "143", "Rund um die Uhr. Für Jugendliche: 147 (Pro Juventute). Sanitätsnotruf: 144.") + card("Europaweit", "112", "Der Notruf 112 funktioniert in allen EU-Ländern und in der Schweiz.") + "</div>" +
      '<div class="sec-h"><h2>Wann professionelle Hilfe sinnvoll ist</h2></div><div class="grid2"><div class="reading"><p>Selbsthilfe ist wirksam, hat aber Grenzen. Bitte lass dich ärztlich oder psychotherapeutisch beraten, wenn eines der folgenden Zeichen länger als zwei Wochen anhält oder dich stark einschränkt:</p><ul><li>gedrückte Stimmung, innere Leere oder Hoffnungslosigkeit an den meisten Tagen</li><li>kaum noch Freude oder Interesse an Dingen, die dir früher wichtig waren</li><li>starke Erschöpfung, Schlafstörungen oder Appetitveränderungen</li><li>Ängste oder Panikattacken, die deinen Alltag bestimmen</li><li>Gedanken, dass das Leben keinen Sinn hat, oder Gedanken an Suizid</li><li>vermehrter Alkohol- oder Medikamentenkonsum, um Gefühle zu dämpfen</li><li>ein WHO-5-Wert von 28 oder darunter, oder unter 50 über mehrere Messungen</li></ul></div>' +
      '<div class="stack"><div class="panel"><h3>Erster Schritt</h3><p class="muted" style="margin:6px 0 0">Die Hausarztpraxis ist eine gute erste Anlaufstelle. In Deutschland kannst du außerdem ohne Überweisung eine psychotherapeutische Sprechstunde vereinbaren, zum Beispiel über die 116 117 oder direkt bei Praxen in deiner Nähe.</p></div><div class="panel"><h3>Mehr Wissen</h3><p class="muted" style="margin:6px 0 0">Verlässliche Informationen bieten die Stiftung Deutsche Depressionshilfe (deutsche-depressionshilfe.de), die Bundespsychotherapeutenkammer (bptk.de) und das Portal gesund.bund.de.</p></div></div></div>';
  }

  /* ---------- Daten ---------- */
  function viewData() {
    const size = JSON.stringify(KS.data).length;
    return '<div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Datenschutz</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">Meine Daten</h2></div></div>' +
      (KS.cloud && KS.cloud.enabled ? '<div class="panel stack" style="margin-bottom:16px"><h3>Konto</h3>' + (KS.cloud.user ? '<p class="muted" style="margin:0">Angemeldet als <b>' + esc(KS.cloud.user.email || "") + '</b>. Deine Daten werden automatisch in deinem Konto gespeichert (Google Firebase) und zwischen deinen Geräten synchronisiert.</p><div class="row"><button type="button" class="btn ghost" data-logout>Abmelden</button><button type="button" class="btn ghost" data-delcloud>Kontodaten löschen</button></div>' : '<p class="muted" style="margin:0">Melde dich an, um deinen Fortschritt geräteübergreifend zu speichern.</p><div><button type="button" class="btn" data-login>' + KS.googleIcon + ' Mit Google anmelden</button></div>') + "</div>" : "") +
      '<div class="grid2"><div class="panel stack"><h3>Wo deine Daten liegen</h3><p class="muted" style="margin:0">Alles, was du einträgst, bleibt ausschließlich im Speicher dieses Browsers auf diesem Gerät. Es gibt kein Konto, keinen Server und kein Tracking. Das heißt auch: Wenn du die Browserdaten löschst oder das Gerät wechselst, sind deine Einträge weg. Sichere sie deshalb ab und zu.</p><span class="chip num">' + (size / 1024).toFixed(1).replace(".", ",") + " KB gespeichert</span>" + (KS.storageOk ? "" : '<div class="note warn">Dein Browser erlaubt hier gerade kein dauerhaftes Speichern.</div>') + "</div>" +
      '<div class="panel stack"><h3>Sicherung</h3><div class="row"><button class="btn" type="button" data-exp>Sicherung kopieren</button>' + (window.KS_EMBED ? "" : '<button class="btn ghost" type="button" data-dl>Als Datei herunterladen</button>') + '</div><textarea id="dt-out" hidden aria-label="Sicherungsdaten"></textarea><hr class="soft"><h3>Wiederherstellen</h3><textarea id="dt-in" placeholder="Sicherung hier einfügen"></textarea><div class="row"><button class="btn ghost" type="button" data-imp>Einfügen und wiederherstellen</button><label class="btn ghost small" for="dt-file">Datei wählen</label><input type="file" id="dt-file" accept="application/json,.json" hidden></div></div></div>' +
      '<div class="panel stack" style="margin-top:16px;border-color:var(--crit)"><h3>Alles löschen</h3><p class="muted" style="margin:0">Löscht alle Einträge, Fortschritte und Einstellungen unwiderruflich aus diesem Browser.</p><div class="row"><button class="btn danger" type="button" data-reset>Alle Daten löschen</button><span data-resetinfo class="faint"></span></div></div>';
  }
  function bindData() {
    const dump = () => JSON.stringify({ app: "klarsinn", v: 1, exported: new Date().toISOString(), data: KS.data });
    app.querySelector("[data-exp]").onclick = () => KS.copy(dump(), app.querySelector("#dt-out"));
    if (app.querySelector("[data-dl]")) app.querySelector("[data-dl]").onclick = () => { try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([dump()], { type: "application/json" })); a.download = "klarsinn-sicherung-" + KS.today() + ".json"; document.body.appendChild(a); a.click(); a.remove(); KS.toast("Download gestartet. Falls nichts passiert, nutze „Sicherung kopieren“."); } catch (e) { KS.toast("Download nicht möglich. Bitte „Sicherung kopieren“ nutzen."); } };
    const imp = (txt) => { try { const o = JSON.parse(txt); if (!o || o.app !== "klarsinn" || !o.data) throw 0; KS.replaceData(o.data); KS.toast("Daten wiederhergestellt"); location.hash = "#start"; render(); } catch (e) { KS.toast("Das ist keine gültige Klarsinn-Sicherung"); } };
    app.querySelector("[data-imp]").onclick = () => imp(app.querySelector("#dt-in").value);
    app.querySelector("#dt-file").onchange = (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => imp(r.result); r.readAsText(f); };
    const dc = app.querySelector("[data-delcloud]"); if (dc) dc.onclick = async () => { if (dc.dataset.c !== "1") { dc.dataset.c = "1"; dc.textContent = "Wirklich alle Kontodaten löschen?"; return; } await KS.cloud.deleteAccountData(); KS.toast("Kontodaten gelöscht"); KS.cloud.logout(); };
    const rs = app.querySelector("[data-reset]"); rs.onclick = () => { if (rs.dataset.c !== "1") { rs.dataset.c = "1"; rs.textContent = "Ja, endgültig löschen"; app.querySelector("[data-resetinfo]").textContent = "Zum Bestätigen erneut klicken."; return; } KS.replaceData({}); KS.toast("Alle Daten gelöscht"); location.hash = "#start"; render(); };
  }

  function notFound() { return '<div class="empty">Diese Seite gibt es nicht. <a href="#start">Zur Übersicht</a></div>'; }

  /* ---------- Zitat-Popover ---------- */
  const pop = document.createElement("div");
  pop.setAttribute("role", "dialog"); pop.hidden = true;
  pop.style.cssText = "position:fixed;z-index:80;max-width:min(440px,calc(100vw - 32px));background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow);padding:14px 16px;font-size:.88rem;color:var(--ink-soft)";
  document.body.appendChild(pop);
  document.addEventListener("click", (e) => {
    const c = e.target.closest(".cite");
    if (!c) { if (!e.target.closest("[role=dialog]")) pop.hidden = true; return; }
    const r = R[c.dataset.ref]; if (!r) return;
    pop.innerHTML = '<div class="eyebrow" style="margin-bottom:6px">Quelle</div><div>' + r.r + '</div><div class="row" style="margin-top:8px;font-size:.82rem">' + KS.refLink(c.dataset.ref) + '<a href="#quellen">Alle Quellen</a></div>';
    pop.hidden = false;
    const b = c.getBoundingClientRect(); const ph = pop.offsetHeight, pw = pop.offsetWidth;
    let top = b.bottom + 8; if (top + ph > innerHeight - 10) top = Math.max(10, b.top - ph - 8);
    pop.style.top = top + "px"; pop.style.left = Math.max(16, Math.min(innerWidth - pw - 16, b.left - 20)) + "px";
  });
  addEventListener("scroll", () => (pop.hidden = true), { passive: true });
  addEventListener("keydown", (e) => { if (e.key === "Escape") pop.hidden = true; });

  /* ---------- Router ---------- */
  function render() {
    cleanups.forEach((f) => { try { f(); } catch (e) { /* ignore */ } }); cleanups = [];
    pop.hidden = true;
    let h = (location.hash || "#start").slice(1);
    if (h === "los") h = "kaufen";
    const FREE = /^(start|kaufen(-\w+)?|hilfe|quellen|daten|lektionen|programm|woche-1|w1-\w+)$/;
    if (!KS.licensed() && !FREE.test(h) && h !== "") { app.innerHTML = KS.paywall(); document.querySelectorAll(".nav a").forEach((a) => a.removeAttribute("aria-current")); window.scrollTo(0, 0); return; }
    let m, html, after = null;
    const sub = h.match(/^w(\d+)-(\w+)$/);
    if (sub) { h = "woche-" + sub[1]; }
    if (h === "start" || h === "") { html = viewStart(); after = profile().start && KS.licensed() ? () => app.querySelectorAll("[data-tool]").forEach((el) => mountTool(el, el.dataset.tool)) : bindLanding; }
    else if (h === "programm") html = viewProgram();
    else if ((m = h.match(/^woche-(\d+)$/))) { html = viewWeek(Number(m[1])); after = () => bindWeek(Number(m[1])); }
    else if ((m = h.match(/^pw-(\d+)$/))) { const k = Number(m[1]), e = KS.plan()[k - 1]; if (e && e.kind === "lernen") { html = viewWeek(e.m); after = () => bindWeek(e.m); } else { html = KS.viewPW(k) || notFound(); after = () => KS.bindPW(k, mountTool); } }
    else if ((m = h.match(/^kaufen(?:-(\w+))?$/))) { html = KS.viewCheckout(m[1]); after = KS.bindCheckout; }
    else if (h === "lektionen") { html = KS.viewLibrary(); after = KS.bindLibrary; }
    else if (h === "akademie") html = KS.viewAcademy();
    else if ((m = h.match(/^pruefung-(\w+)$/))) { const k = m[1]; html = KS.viewExam(k) || notFound(); after = () => KS.bindExam(k); }
    else if (h === "trainer") { html = KS.viewTrainer(); after = KS.bindTrainer; }
    else if ((m = h.match(/^fall-(\d+)$/))) { const k = Number(m[1]); html = KS.viewCase(k) || notFound(); after = () => KS.bindCase(k); }
    else if (h === "zertifikat") { html = KS.viewCert(); after = KS.bindCert; }
    else if (h === "werkzeuge") html = viewTools();
    else if ((m = h.match(/^tool-([a-z0-9]+)$/))) { html = viewTool(m[1]); after = () => app.querySelectorAll("[data-tool]").forEach((el) => mountTool(el, el.dataset.tool)); }
    else if (h === "verlauf") { html = viewProgress(); after = () => app.querySelectorAll("[data-explore2]").forEach((el) => KS.mountExplorable2(el, Number(el.dataset.explore2))); }
    else if (h === "quellen") { html = viewSources(); after = () => { const q = app.querySelector("#srcq"); q.oninput = () => { const v = q.value.toLowerCase().trim(); app.querySelectorAll("#srclist li").forEach((li) => (li.hidden = v && !li.dataset.s.includes(v))); app.querySelectorAll(".src-group").forEach((g) => (g.hidden = !g.querySelector("li:not([hidden])"))); }; }; }
    else if (h === "hilfe") html = viewHelp();
    else if (h === "daten") { html = viewData(); after = bindData; }
    else html = notFound();
    app.innerHTML = html; if (after) after();
    const top = h.split("-")[0];
    const map = { start: "start", kaufen: "kaufen", lektionen: "lektionen", akademie: "akademie", pruefung: "akademie", trainer: "akademie", fall: "akademie", zertifikat: "akademie", programm: "programm", woche: "programm", pw: "programm", werkzeuge: "werkzeuge", tool: "werkzeuge", verlauf: "verlauf", quellen: "quellen" };
    document.querySelectorAll(".nav a").forEach((a) => a.toggleAttribute("aria-current", a.dataset.r === map[top]) || a.setAttribute("aria-current", "page"));
    document.querySelectorAll(".nav a").forEach((a) => { if (a.dataset.r === map[top]) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.getElementById("nav").classList.remove("open");
    if (KS.renderAccount) KS.renderAccount();
    document.querySelectorAll('.nav [data-r="kaufen"]').forEach((a) => (a.hidden = KS.licensed()));
    const wt = h.match(/^woche-(\d+)$/); const wk = wt && W.find((x) => x.n === Number(wt[1]));
    document.title = wk ? "Woche " + wk.n + ": " + wk.title + " · Klarsinn" : "Klarsinn";
    if (sub) { const t = document.getElementById("w" + sub[1] + "-" + sub[2]); if (t) setTimeout(() => t.scrollIntoView(), 30); } else window.scrollTo(0, 0);
  }
  function bindLanding() {
    app.querySelectorAll("[data-explore]").forEach((el) => KS.mountExplorable(el, Number(el.dataset.explore)));
  }
  addEventListener("hashchange", render);
  KS.rerender = render;

  /* Theme & Menü */
  const root = document.documentElement;
  try { const t = localStorage.getItem("klarsinn.theme"); if (t) root.dataset.theme = t; } catch (e) { /* */ }
  document.getElementById("themeBtn").onclick = () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark"; try { localStorage.setItem("klarsinn.theme", root.dataset.theme); } catch (e) { /* */ }
  };
  const mb = document.getElementById("menuBtn");
  mb.onclick = () => { const n = document.getElementById("nav"); n.classList.toggle("open"); mb.setAttribute("aria-expanded", n.classList.contains("open")); };

  KS.refreshStats();
  render();
})();
