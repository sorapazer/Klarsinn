/* Klarsinn – Lektions-Player (Karte für Karte), XP, Serie, Konfetti */
(function () {
  const KS = window.KS, esc = KS.esc;

  /* ---------- Aktivität, Serie, XP ---------- */
  const _save = KS.save;
  KS.save = function () { const d = KS.obj("days"); d[KS.today()] = Math.min(99, (d[KS.today()] || 0) + 1); _save(); KS.refreshStats && KS.refreshStats(); };
  KS.streak = function () {
    const d = KS.obj("days"); let n = 0; const t = new Date();
    if (!d[KS.dkey(t)]) t.setDate(t.getDate() - 1);
    while (d[KS.dkey(t)]) { n++; t.setDate(t.getDate() - 1); }
    return n;
  };
  KS.xp = function () {
    const W = window.KS_WEEKS || []; let xp = 0;
    const ws = KS.obj("weeks"), ls = KS.obj("lessons");
    W.forEach((w) => {
      const s = ws[w.n]; if (s) {
        Object.values(s.t || {}).forEach((a) => (xp += a.filter(Boolean).length * 10));
        Object.entries(s.q || {}).forEach(([i, k]) => (xp += w.quiz[i] && w.quiz[i].correct === k ? 20 : 5));
        Object.values(s.r || {}).forEach((r) => r && r.trim() && (xp += 15));
        if (s.done) xp += 100;
      }
      if (ls[w.n] && ls[w.n].done) xp += 50;
    });
    Object.values(KS.obj("pweeks")).forEach((s) => { Object.values(s.t || {}).forEach((a) => (xp += a.filter(Boolean).length * 10)); Object.values(s.r || {}).forEach((r) => r && r.trim() && (xp += 15)); if (s.done) xp += 60; });
    Object.entries(KS.obj("deepq")).forEach(([n, s]) => { const d = (window.KS_DEEP || []).find((x) => String(x.n) === n); Object.entries(s.q || {}).forEach(([i, k]) => (xp += d && d.quiz2[i] && d.quiz2[i].correct === k ? 20 : 5)); });
    Object.keys(KS.obj("lessons")).forEach((k) => { if (/d$|[abc]$/.test(k) && KS.obj("lessons")[k].done) xp += 50; });
    Object.entries(KS.obj("masterq")).forEach(([id, s]) => { const l = KS.masterSource && KS.masterSource(id); Object.entries(s.q || {}).forEach(([i, k]) => (xp += l && l.quiz[i] && l.quiz[i].correct === k ? 20 : 5)); });
    ["checkins", "practice", "thoughts", "gratitude", "sleep", "activities", "emotions", "letters", "worries", "who5", "writing", "imessages", "ifthen", "stressors", "grounding", "defusion", "problems", "people"].forEach((k) => (xp += KS.list(k).length * 10));
    return xp;
  };
  const LV = ["Ankommende", "Entdeckerin", "Übende", "Wegbereiterin", "Kennerin", "Klarsicht", "Meisterin"];
  const LVN = ["Ankommende", "Entdecker:in", "Übende:r", "Wegbereiter:in", "Kenner:in", "Klarsicht", "Meister:in"];
  void LV;
  KS.level = function (xp) { const l = Math.floor(Math.sqrt(xp / 120)); const cur = 120 * l * l, nxt = 120 * (l + 1) * (l + 1); return { n: l + 1, name: LVN[Math.min(l, LVN.length - 1)], pct: (xp - cur) / (nxt - cur), toNext: nxt - xp }; };
  KS.flame = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 0 2 1 3 2 3 0-3-1.5-5.5.5-9z" fill="currentColor"/></svg>';
  KS.bolt = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg>';
  KS.refreshStats = function () {
    const el = document.getElementById("stats"); if (!el) return;
    const s = KS.streak(), x = KS.xp();
    el.innerHTML = '<span class="stat flame' + (s ? " on" : "") + '" title="Serie: aktive Tage in Folge">' + KS.flame + '<b class="num">' + s + '</b></span><span class="stat xpc" title="Erfahrungspunkte">' + KS.bolt + '<b class="num">' + x + "</b></span>";
  };

  /* ---------- Konfetti ---------- */
  KS.confetti = function () {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("canvas"); c.className = "confetti"; document.body.appendChild(c);
    const ctx = c.getContext("2d"); const dpr = devicePixelRatio || 1; c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const cs = getComputedStyle(document.documentElement); const cols = ["--accent", "--glow", "--p2", "--p3", "--p4"].map((v) => cs.getPropertyValue(v).trim());
    const P = Array.from({ length: 140 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .55, vx: (Math.random() - .5) * 14, vy: -Math.random() * 16 - 6, r: Math.random() * 6 + 4, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6, va: (Math.random() - .5) * .3 }));
    let f = 0; (function tick() { ctx.clearRect(0, 0, innerWidth, innerHeight); P.forEach((p) => { p.vy += .45; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore(); }); if (++f < 150) requestAnimationFrame(tick); else c.remove(); })();
  };

  /* ---------- Karten einer Woche bauen ---------- */
  function splitBody(html) {
    const blocks = (html.match(/<(p|ul|ol)[\s\S]*?<\/\1>/g) || [html]);
    const cards = []; let cur = "", words = 0;
    blocks.forEach((b) => { const wc = b.replace(/<[^>]+>/g, "").split(/\s+/).length; if (cur && (words + wc > 120 || (/^<p/.test(b) && words > 70))) { cards.push(cur); cur = ""; words = 0; } cur += b; words += wc; });
    if (cur) cards.push(cur);
    return cards;
  }
  KS.deepSource = function (n) {
    const w = (window.KS_WEEKS || []).find((x) => x.n === n), d = (window.KS_DEEP || []).find((x) => x.n === n);
    if (!w || !d) return null;
    return { n, phase: w.phase, deep: true, title: "Vertiefung: " + w.title, subtitle: "Neue Perspektiven, mehr Forschung, weitere Übungen", lead: (d.ueben && d.ueben.focus) || "", input: d.deep, quiz: d.quiz2, myth: null, takeaways: null, practice: d.practices[0] };
  };
  KS.buildCards = function (w, mode) {
    const master = mode === "master" || w.master;
    if (master) {
      const C = [{ type: "intro" }]; const qa = { 0: 0, 2: 1, 3: 2 };
      w.input.forEach((ch, i) => {
        splitBody(ch.body).forEach((b, j, arr) => C.push({ type: "text", ch: i, h: ch.h, html: b, first: j === 0, part: arr.length > 1 ? (j + 1) + "/" + arr.length : "" }));
        if (ch.evidence) C.push({ type: "evidence", ch: i, ev: ch.evidence });
        if (i === 1 && w.model) C.push({ type: "model" });
        if (qa[i] !== undefined && w.quiz[qa[i]]) C.push({ type: "quiz", qi: qa[i] });
      });
      if (w.practice) C.push({ type: "practice" });
      if (w.transfer) C.push({ type: "transfer" });
      C.push({ type: "finish" });
      return C;
    }
    const deep = mode === "deep" || w.deep;
    const C = [{ type: "intro" }];
    const quizAfter = deep ? { 0: 0, 1: 1, 2: 2 } : { 1: 0, 2: 1, 4: 2, 5: 3 };
    const xpAfter = deep ? 0 : Math.min(1, w.input.length - 1);
    const xp2After = deep ? -1 : Math.min(3, w.input.length - 1);
    w.input.forEach((ch, i) => {
      splitBody(ch.body).forEach((b, j, arr) => C.push({ type: "text", ch: i, h: ch.h, html: b, first: j === 0, part: arr.length > 1 ? (j + 1) + "/" + arr.length : "" }));
      if (ch.evidence) C.push({ type: "evidence", ch: i, ev: ch.evidence });
      if (i === xpAfter && (deep ? KS.explorables2 : KS.explorables)[w.n]) C.push({ type: deep ? "explore2" : "explore" });
      if (i === xp2After && KS.explorables2 && KS.explorables2[w.n]) C.push({ type: "explore2" });
      if (quizAfter[i] !== undefined && w.quiz[quizAfter[i]]) C.push({ type: "quiz", qi: quizAfter[i] });
    });
    if (deep && w.quiz[3]) C.push({ type: "quiz", qi: 3 });
    if (w.myth) C.push({ type: "myth" });
    if (w.takeaways) C.push({ type: "takeaways" });
    if (w.practice) C.push({ type: "practice" });
    C.push({ type: "finish" });
    return C;
  };

  /* ---------- Player ---------- */
  let ov = null;
  KS.openLesson = function (n0, startAt, mode, mkey) {
    const deep = mode === "deep", master = mode === "master";
    const w = master ? KS.masterSource(mkey) : deep ? KS.deepSource(n0) : (window.KS_WEEKS || []).find((x) => x.n === n0); if (!w) return;
    const n = n0, LK = master ? mkey : deep ? n + "d" : n;
    const Lall = KS.obj("lessons"); Lall[LK] = Lall[LK] || { pos: 0 };
    let ws;
    if (master) { const S = KS.obj("masterq"); S[mkey] = S[mkey] || { q: {} }; ws = S[mkey]; } else if (deep) { const S = KS.obj("deepq"); S[n] = S[n] || { q: {} }; ws = S[n]; } else { const S = KS.obj("weeks"); S[n] = S[n] || { t: {}, q: {}, r: {} }; ws = S[n]; }
    const cards = KS.buildCards(w, mode);
    let pos = typeof startAt === "number" ? startAt : (Lall[LK].done ? 0 : Math.min(Lall[LK].pos || 0, cards.length - 1));
    let xpGain = 0; const startXP = KS.xp();
    ov = document.createElement("div"); ov.className = "lesson"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Lektion Woche " + n);
    ov.style.setProperty("--ph", "var(--p" + w.phase + ")");
    ov.innerHTML = '<div class="ls-top"><button type="button" class="iconbtn" data-x aria-label="Lektion schließen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="ls-bar"><i data-bar></i></div><span class="ls-count num" data-count></span></div><div class="ls-stage"><div class="ls-card" data-card></div></div><div class="ls-foot"><button type="button" class="btn ghost" data-back>Zurück</button><button type="button" class="btn chunky" data-next>Weiter</button></div>';
    document.body.appendChild(ov); document.documentElement.classList.add("noscroll");
    const card = ov.querySelector("[data-card]"), next = ov.querySelector("[data-next]"), back = ov.querySelector("[data-back]");
    const close = () => { Lall[LK].pos = pos; KS.save(); ov.remove(); ov = null; document.documentElement.classList.remove("noscroll"); removeEventListener("keydown", key); if (KS.rerender) KS.rerender(); };
    const key = (e) => { if (e.key === "Escape") close(); else if (e.key === "ArrowRight" && !next.disabled && !/TEXTAREA|INPUT/.test(document.activeElement.tagName)) next.click(); else if (e.key === "ArrowLeft" && !/TEXTAREA|INPUT/.test(document.activeElement.tagName)) back.click(); };
    addEventListener("keydown", key);
    ov.querySelector("[data-x]").onclick = close;
    back.onclick = () => { if (pos > 0) { pos--; show(-1); } };
    next.onclick = () => { if (pos < cards.length - 1) { pos++; Lall[LK].pos = pos; KS.save(); show(1); } else close(); };

    function show(dir) {
      const c = cards[pos];
      ov.querySelector("[data-bar]").style.width = (pos / (cards.length - 1) * 100) + "%";
      ov.querySelector("[data-count]").textContent = (pos + 1) + " / " + cards.length;
      back.disabled = pos === 0; next.disabled = false; next.textContent = "Weiter"; next.className = "btn chunky";
      card.className = "ls-card " + (dir < 0 ? "in-left" : "in-right");
      void card.offsetWidth; card.classList.add("in");
      card.innerHTML = render(c);
      bind(c);
      card.scrollTop = 0; ov.querySelector(".ls-stage").scrollTop = 0;
    }
    function render(c) {
      const chap = (c.ch !== undefined) ? '<div class="ls-eyebrow">Kapitel ' + n + "." + (c.ch + 1) + " · " + esc(w.input[c.ch].h) + (c.part ? ' <span class="faint">' + c.part + "</span>" : "") + "</div>" : "";
      switch (c.type) {
        case "intro": return '<div class="ls-intro"><div class="ls-icon">' + KS.weekIcon(n, 44) + '</div><div class="ls-eyebrow">' + (master ? "Modul " + n + " · Masterclass" + (w.theory ? " · " + esc(w.theory) : "") : deep ? "Modul " + n + " · Vertiefungs-Lektion" : (KS.isLong && KS.isLong() ? "Modul " : "Woche ") + n + " · Lektion") + "</div><h2>" + esc(w.title) + '</h2><p class="ls-lead">' + esc(w.subtitle) + '</p><div class="ls-meta"><span>' + cards.length + " Karten</span><span>ca. " + Math.max(8, Math.round(cards.length * 0.6)) + " Min.</span><span>" + w.quiz.length + " Fragen</span></div>" + (w.lead ? "<div class=\"reading ls-text\">" + KS.cite(esc(w.lead)) + "</div>" : "") + "</div>";
        case "text": return chap + (c.first ? "<h2>" + esc(c.h) + "</h2>" : "") + '<div class="reading ls-text">' + KS.cite(c.html) + "</div>";
        case "evidence": return chap + '<div class="ls-ev"><div class="ls-ev-icon"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 14h9"/></svg></div><div class="ls-eyebrow">' + esc(c.ev.label || "Was die Forschung zeigt") + '</div><div class="ls-text reading">' + KS.cite(c.ev.text) + "</div></div>";
        case "explore": case "explore2": return '<div data-xp></div>';
        case "model": return '<div class="ls-eyebrow">Das Modell</div><div data-md></div>';
        case "transfer": return '<div class="ls-eyebrow">Dein Auftrag für die nächsten Tage</div><div class="ls-transfer"><div class="ls-ev-icon">' + KS.weekIcon(n, 30) + '</div><p class="ls-text reading">' + KS.cite(esc(w.transfer)) + '</p></div><div class="field"><label for="tr-note">Wann und wo setzt du das um?</label><textarea id="tr-note" data-tr>' + esc((KS.obj("transfer")[LK] || "")) + "</textarea></div>";
        case "quiz": { const q = w.quiz[c.qi]; const a = ws.q[c.qi]; return '<div class="ls-eyebrow">Kurz geprüft · Frage ' + (c.qi + 1) + " von " + w.quiz.length + "</div><h2>" + esc(q.q) + '</h2><div class="ls-opts">' + q.options.map((o, k) => '<button type="button" class="ls-opt' + (a !== undefined ? (k === q.correct ? " right" : k === a ? " wrong" : "") : "") + '" data-k="' + k + '"' + (a !== undefined ? " disabled" : "") + '><span class="ls-key">' + "ABCD"[k] + "</span><span>" + esc(o) + "</span></button>").join("") + '</div><div data-fb>' + (a !== undefined ? fb(q, a) : "") + "</div>"; }
        case "myth": return '<div class="ls-eyebrow">Mythos oder Fakt?</div><h2>„' + esc(w.myth.myth.replace(/^„|“$/g, "")) + '“</h2><p class="muted">Was meinst du: Stimmt das?</p><div class="row" data-mb><button type="button" class="btn chunky alt" data-m="1">Stimmt</button><button type="button" class="btn chunky" data-m="0">Stimmt nicht</button></div><div data-mf></div>';
        case "takeaways": return '<div class="ls-eyebrow">Das Wichtigste in Kürze</div><h2>Fünf Dinge, die du mitnimmst</h2><ol class="ls-take">' + w.takeaways.map((t, i) => '<li style="animation-delay:' + (i * 0.25) + 's">' + KS.cite(esc(t)) + "</li>").join("") + "</ol>";
        case "practice": return '<div class="ls-eyebrow">Jetzt ausprobieren · ' + esc(w.practice.duration) + "</div><h2>" + esc(w.practice.title) + '</h2><p class="ls-text reading">' + KS.cite(esc(w.practice.intro)) + '</p><ol class="steps">' + w.practice.steps.map((s) => "<li><span>" + esc(s) + "</span></li>").join("") + "</ol>";
        case "finish": { const lv = KS.level(KS.xp()); return '<div class="ls-finish"><div class="ls-trophy">' + KS.weekIcon(n, 54) + '</div><div class="ls-eyebrow">Lektion abgeschlossen</div><h2>Stark gemacht.</h2><p class="ls-lead">' + (master ? "Du hast die Masterclass „" + esc(w.title) + "“ abgeschlossen." : deep ? "Du hast die Vertiefung von Modul " + n + " abgeschlossen." : "Du hast das Wissen von " + (KS.isLong && KS.isLong() ? "Modul " : "Woche ") + n + " durchgearbeitet.") + ' Jetzt geht es um die Umsetzung im Alltag.</p><div class="ls-meta big"><span>' + KS.bolt + ' <b class="num">+' + Math.max(50, KS.xp() - startXP + xpGain) + '</b> XP</span><span>' + KS.flame + ' <b class="num">' + KS.streak() + '</b> Tage Serie</span><span>Level <b class="num">' + lv.n + "</b> · " + lv.name + '</span></div><div class="bar" style="height:10px;max-width:360px;margin:6px auto 0"><i style="width:' + Math.round(lv.pct * 100) + '%"></i></div><p class="faint" style="font-size:.85rem">Noch ' + lv.toNext + ' XP bis Level ' + (lv.n + 1) + '</p><div class="row" style="justify-content:center">' + (master ? '<a class="btn chunky" href="#lektionen" data-close>Zur Lektionsbibliothek</a><a class="btn ghost" href="#woche-' + n + '" data-close>Zum Modul ' + n + "</a>" : deep ? '<a class="btn chunky" href="#pw-' + (KS.pwOf(n, KS.variant() === "m12" ? "vertiefen" : "ueben") || 1) + '" data-close>Zur Praxiswoche</a>' : '<a class="btn chunky" href="#w' + n + '-aufgaben" data-close>Zu den Aufgaben</a><a class="btn ghost" href="#w' + n + '-werkzeuge" data-close>Zu den Werkzeugen</a>') + '</div></div>'; }
      }
      return "";
    }
    function fb(q, a) { return '<div class="ls-fb ' + (a === q.correct ? "ok" : "no") + '"><b>' + (a === q.correct ? "Richtig!" : "Nicht ganz.") + "</b> " + KS.cite(esc(q.explain)) + "</div>"; }
    function bind(c) {
      if (c.type === "explore") KS.mountExplorable(card.querySelector("[data-xp]"), n);
      if (c.type === "explore2") KS.mountExplorable2(card.querySelector("[data-xp]"), n);
      if (c.type === "model") KS.modelDiagram(card.querySelector("[data-md]"), w.model);
      if (c.type === "transfer") { const ta = card.querySelector("[data-tr]"); ta.oninput = () => { KS.obj("transfer")[LK] = ta.value; KS.save(); }; }
      if (c.type === "quiz" && ws.q[c.qi] === undefined) {
        next.disabled = true; next.textContent = "Wähle eine Antwort";
        card.querySelectorAll("[data-k]").forEach((b) => (b.onclick = () => {
          const k = Number(b.dataset.k), q = w.quiz[c.qi]; ws.q[c.qi] = k; KS.save();
          card.querySelectorAll("[data-k]").forEach((x, j) => { x.disabled = true; if (j === q.correct) x.classList.add("right"); else if (j === k) x.classList.add("wrong"); });
          card.querySelector("[data-fb]").innerHTML = fb(q, k);
          next.disabled = false; next.textContent = k === q.correct ? "Weiter  +20 XP" : "Weiter"; next.className = "btn chunky " + (k === q.correct ? "good" : "");
          if (k === q.correct) { b.classList.add("pop"); KS.bell(true); }
        }));
      }
      if (c.type === "myth") {
        card.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => {
          const right = b.dataset.m === "0";
          card.querySelector("[data-mb]").remove();
          card.querySelector("[data-mf]").innerHTML = '<div class="ls-fb ' + (right ? "ok" : "no") + '"><b>' + (right ? "Genau, ein Mythos." : "Verständlich, aber das ist ein Mythos.") + "</b> " + KS.cite(w.myth.fact) + "</div>";
        }));
      }
      if (c.type === "finish") {
        if (!Lall[LK].done) { Lall[LK].done = new Date().toISOString(); KS.save(); KS.confetti(); KS.bell(); }
        next.textContent = "Schließen";
        card.querySelectorAll("[data-close]").forEach((a) => a.addEventListener("click", () => { Lall[LK].pos = 0; KS.save(); ov.remove(); ov = null; document.documentElement.classList.remove("noscroll"); removeEventListener("keydown", key); }));
      }
    }
    show(1);
    next.focus();
  };
})();
