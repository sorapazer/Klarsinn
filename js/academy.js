/* Klarsinn – Akademie: Prüfungen, Wiederholungstrainer, Fallstudien, Abschlusszertifikat */
(function () {
  const KS = window.KS, esc = KS.esc;
  const W = () => (window.KS_WEEKS || []).slice().sort((a, b) => a.n - b.n);
  const PHN = { 1: "Fundament", 2: "Lebensstil", 3: "Gedanken & Gefühle", 4: "Verbindung & Richtung" };

  /* ---------- Fragenpool ---------- */
  let BANK = null;
  KS.bank = function () {
    if (BANK) return BANK; BANK = [];
    W().forEach((w) => w.quiz.forEach((q, i) => BANK.push(Object.assign({ id: "w" + w.n + "-" + i, n: w.n, phase: w.phase, src: "Grundlagen" }, q))));
    (window.KS_DEEP || []).forEach((d) => { const w = W().find((x) => x.n === d.n); d.quiz2.forEach((q, i) => BANK.push(Object.assign({ id: "d" + d.n + "-" + i, n: d.n, phase: w.phase, src: "Vertiefung" }, q))); });
    (window.KS_MASTER || []).forEach((m) => { const w = W().find((x) => x.n === m.n); m.lessons.forEach((l) => l.quiz.forEach((q, i) => BANK.push(Object.assign({ id: "m" + l.id + "-" + i, n: m.n, phase: w.phase, src: "Masterclass " + l.title }, q)))); });
    return BANK;
  };
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function shuffle(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------- Prüfungen ---------- */
  KS.EXAMS = {
    p1: { name: "Phasenprüfung Fundament", phase: 1, count: 12, pass: 70 },
    p2: { name: "Phasenprüfung Lebensstil", phase: 2, count: 12, pass: 70 },
    p3: { name: "Phasenprüfung Gedanken & Gefühle", phase: 3, count: 12, pass: 70 },
    p4: { name: "Phasenprüfung Verbindung & Richtung", phase: 4, count: 12, pass: 70 },
    final: { name: "Abschlussprüfung", phase: 0, count: 30, pass: 80 }
  };
  KS.examState = (k) => { const o = KS.obj("exams"); o[k] = o[k] || { best: 0, attempts: [] }; return o[k]; };
  KS.examPassed = (k) => KS.examState(k).best >= KS.EXAMS[k].pass;
  function buildExam(k, seed) {
    const E = KS.EXAMS[k], r = rng(seed);
    let pool = KS.bank().filter((q) => !E.phase || q.phase === E.phase);
    let pick;
    if (!E.phase) { const per = {}; pick = shuffle(pool, r).filter((q) => { per[q.n] = (per[q.n] || 0) + 1; return per[q.n] <= 3; }).slice(0, E.count); }
    else pick = shuffle(pool, r).slice(0, E.count);
    return pick.map((q) => ({ q, order: shuffle(q.options.map((_, i) => i), r) }));
  }
  KS.predicate = (s) => (s >= 95 ? "mit Auszeichnung" : s >= 88 ? "sehr gut" : s >= 80 ? "gut" : s >= 70 ? "bestanden" : "nicht bestanden");

  KS.viewExam = function (k) {
    const E = KS.EXAMS[k]; if (!E) return null; const st = KS.examState(k);
    return '<section class="fade-in exam" data-exam="' + k + '"><div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">' + (E.phase ? "Phase " + E.phase : "Akademie") + '</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">' + esc(E.name) + '</h2></div><a class="btn ghost small" href="#akademie">← Akademie</a></div>' +
      '<div class="exam-intro panel stack" data-intro><div class="kpis"><div class="kpi"><b>' + E.count + '</b><span>Fragen</span></div><div class="kpi"><b>' + E.pass + ' %</b><span>zum Bestehen</span></div><div class="kpi"><b>' + (st.best ? st.best + " %" : "–") + '</b><span>Bestes Ergebnis</span></div></div>' +
      '<p class="muted" style="margin:0">Die Fragen werden aus ' + (E.phase ? "allen Lektionen der Phase „" + PHN[E.phase] + "“" : "allen 60 Lektionen") + ' zufällig gezogen, die Antworten gemischt. Anders als in den Lektionen siehst du die Lösungen erst am Ende. Du kannst die Prüfung beliebig oft wiederholen, gewertet wird das beste Ergebnis.</p>' +
      (st.attempts.length ? '<div class="row" style="gap:6px">' + st.attempts.slice(0, 8).map((a) => '<span class="chip ' + (a.score >= E.pass ? "ok" : "glow") + ' num">' + KS.fmtD(a.at) + ": " + a.score + " %</span>").join("") + "</div>" : "") +
      '<div><button type="button" class="btn chunky big" data-start>' + (st.attempts.length ? "Neuer Versuch" : "Prüfung starten") + '</button></div></div><div data-run></div></section>';
  };
  KS.bindExam = function (k) {
    const root = document.querySelector('[data-exam="' + k + '"]'); if (!root) return;
    const E = KS.EXAMS[k];
    root.querySelector("[data-start]").onclick = () => {
      const items = buildExam(k, Date.now()); const ans = {}; let i = 0; const t0 = Date.now();
      root.querySelector("[data-intro]").hidden = true;
      const run = root.querySelector("[data-run]");
      const draw = () => {
        const it = items[i];
        run.innerHTML = '<div class="exam-top"><div class="ls-bar"><i style="width:' + (Object.keys(ans).length / items.length * 100) + '%"></i></div><span class="num faint">' + (i + 1) + " / " + items.length + '</span></div><div class="exam-nav">' + items.map((_, j) => '<button type="button" class="exam-dot' + (j === i ? " cur" : "") + (ans[j] !== undefined ? " done" : "") + '" data-j="' + j + '" aria-label="Frage ' + (j + 1) + '">' + (j + 1) + "</button>").join("") + '</div><div class="panel exam-q"><div class="ls-eyebrow">Modul ' + it.q.n + " · " + esc(it.q.src) + "</div><h3>" + esc(it.q.q) + '</h3><div class="ls-opts">' + it.order.map((o, p) => '<button type="button" class="ls-opt' + (ans[i] === o ? " sel" : "") + '" data-o="' + o + '"><span class="ls-key">' + "ABCD"[p] + "</span><span>" + esc(it.q.options[o]) + "</span></button>").join("") + '</div></div><div class="row" style="justify-content:space-between;margin-top:14px"><button type="button" class="btn ghost" data-pv' + (i ? "" : " disabled") + '>Zurück</button>' + (Object.keys(ans).length === items.length ? '<button type="button" class="btn chunky good" data-fin>Prüfung abgeben</button>' : "") + '<button type="button" class="btn chunky" data-nx>' + (i < items.length - 1 ? "Weiter" : "Zur ersten offenen Frage") + "</button></div>";
        run.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => { ans[i] = Number(b.dataset.o); if (i < items.length - 1) { i++; } draw(); }));
        run.querySelectorAll("[data-j]").forEach((b) => (b.onclick = () => { i = Number(b.dataset.j); draw(); }));
        const pv = run.querySelector("[data-pv]"); pv.onclick = () => { if (i) { i--; draw(); } };
        run.querySelector("[data-nx]").onclick = () => { if (i < items.length - 1) i++; else { const o = items.findIndex((_, j) => ans[j] === undefined); if (o >= 0) i = o; } draw(); };
        const fin = run.querySelector("[data-fin]"); if (fin) fin.onclick = finish;
      };
      const finish = () => {
        const right = items.filter((it, j) => ans[j] === it.q.correct).length; const score = Math.round(right / items.length * 100);
        const st = KS.examState(k); st.attempts.unshift({ at: new Date().toISOString(), score, min: Math.round((Date.now() - t0) / 60000) }); st.best = Math.max(st.best, score); KS.save();
        const ok = score >= E.pass; if (ok) KS.confetti();
        run.innerHTML = '<div class="exam-result ' + (ok ? "ok" : "no") + '"><div class="exam-score num">' + score + ' %</div><h3>' + (ok ? "Bestanden" + (k === "final" ? " · " + KS.predicate(score) : "") : "Noch nicht bestanden") + '</h3><p class="muted">' + right + " von " + items.length + " richtig. " + (ok ? "Stark. Unten siehst du alle Fragen mit Erklärung." : "Zum Bestehen brauchst du " + E.pass + " %. Schau dir die Erklärungen an, wiederhole die Lektionen und versuch es erneut.") + '</p><div class="row" style="justify-content:center"><a class="btn chunky" href="#akademie">Zur Akademie</a>' + (k === "final" && ok ? '<a class="btn ghost" href="#zertifikat">Zum Zertifikat</a>' : '<button type="button" class="btn ghost" data-again>Erneut versuchen</button>') + "</div></div>" +
          '<div class="stack" style="margin-top:16px">' + items.map((it, j) => { const ok2 = ans[j] === it.q.correct; return '<div class="q"><h4><span class="chip ' + (ok2 ? "ok" : "glow") + '">' + (ok2 ? "Richtig" : "Falsch") + "</span> " + (j + 1) + ". " + esc(it.q.q) + "</h4>" + (ok2 ? "" : '<div class="faint" style="font-size:.88rem">Deine Antwort: ' + esc(it.q.options[ans[j]] || "–") + "</div>") + '<div style="font-size:.9rem;margin-top:4px"><b>Richtig:</b> ' + esc(it.q.options[it.q.correct]) + '</div><div class="explain">' + KS.cite(esc(it.q.explain)) + "</div></div>"; }).join("") + "</div>";
        const ag = run.querySelector("[data-again]"); if (ag) ag.onclick = () => KS.rerender();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      draw();
    };
  };

  /* ---------- Wiederholungstrainer (Leitner) ---------- */
  const IV = [0, 1, 2, 4, 8, 16];
  KS.reviewPool = function () {
    const cur = KS.currentWeek ? (KS.currentWeek() || 1) : 1; const L = KS.obj("lessons");
    return KS.bank().filter((q) => q.n <= cur || L[q.n] || L[q.n + "d"]);
  };
  KS.dueCards = function () {
    const S = KS.obj("srs"), today = KS.today();
    return KS.reviewPool().filter((q) => { const s = S[q.id]; return !s || s.due <= today; });
  };
  KS.viewTrainer = function () {
    const S = KS.obj("srs"), pool = KS.reviewPool(), due = KS.dueCards();
    const boxes = [1, 2, 3, 4, 5].map((b) => pool.filter((q) => (S[q.id] || {}).box === b).length);
    const fresh = pool.filter((q) => !S[q.id]).length;
    return '<section class="fade-in trainer"><div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Akademie</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">Wiederholungstrainer</h2></div><a class="btn ghost small" href="#akademie">← Akademie</a></div>' +
      '<p class="reading muted" style="margin-top:-6px">Wissen bleibt, wenn man es in wachsenden Abständen wiederholt. Karten, die du sicher weißt, wandern ein Fach weiter und kommen erst nach 2, 4, 8 oder 16 Tagen wieder. Unsichere Karten kommen morgen erneut.</p>' +
      '<div class="leitner">' + ['<div class="lt-box new"><b class="num">' + fresh + "</b><span>Neu</span></div>"].concat(boxes.map((n, i) => '<div class="lt-box" style="--h:' + Math.min(100, 12 + n * 4) + '%"><i></i><b class="num">' + n + "</b><span>Fach " + (i + 1) + "</span></div>")).join("") + "</div>" +
      '<div class="panel" data-tr style="margin-top:16px"></div></section>';
  };
  KS.bindTrainer = function () {
    const box = document.querySelector("[data-tr]"); if (!box) return;
    const S = KS.obj("srs"); const r = rng(Date.now());
    let queue = shuffle(KS.dueCards(), r).slice(0, 20); let done = 0, known = 0;
    const draw = () => {
      if (!queue.length) { box.innerHTML = '<div class="exam-result ok" style="padding:20px"><div class="exam-score num">' + (done ? Math.round(known / done * 100) + " %" : "✓") + "</div><h3>" + (done ? "Runde geschafft" : "Heute ist nichts fällig") + '</h3><p class="muted">' + (done ? known + " von " + done + " Karten sicher gewusst. Komm morgen wieder." : "Alle Karten sind wiederholt. Neue Karten kommen mit jedem Modul dazu.") + '</p><a class="btn chunky" href="#akademie">Zur Akademie</a></div>'; if (done) KS.confetti(); return; }
      const q = queue[0];
      box.innerHTML = '<div class="row" style="justify-content:space-between"><span class="chip accent">Modul ' + q.n + " · " + esc(q.src) + '</span><span class="faint num">' + done + " erledigt · " + queue.length + ' offen</span></div><div class="flash" data-flip tabindex="0" role="button" aria-label="Karte umdrehen"><div class="flash-in"><div class="flash-front"><span class="eyebrow">Frage</span><h3>' + esc(q.q) + '</h3><span class="faint">Antwort im Kopf formulieren, dann tippen zum Umdrehen</span></div><div class="flash-back"><span class="eyebrow">Antwort</span><h3>' + esc(q.options[q.correct]) + '</h3><p class="reading" style="font-size:.95rem">' + KS.cite(esc(q.explain)) + '</p></div></div></div><div class="row" data-rate hidden style="justify-content:center"><button type="button" class="btn chunky alt" data-r="0">Wusste ich nicht</button><button type="button" class="btn chunky alt" data-r="1">Unsicher</button><button type="button" class="btn chunky good" data-r="2">Wusste ich</button></div>';
      const f = box.querySelector("[data-flip]");
      const flip = () => { f.classList.add("on"); box.querySelector("[data-rate]").hidden = false; };
      f.onclick = flip; f.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } };
      box.querySelectorAll("[data-r]").forEach((b) => (b.onclick = () => {
        const v = Number(b.dataset.r), s = S[q.id] || { box: 0 };
        s.box = v === 2 ? Math.min(5, (s.box || 0) + 1) : v === 1 ? Math.max(1, s.box || 1) : 1;
        const d = new Date(); d.setDate(d.getDate() + (v === 2 ? IV[s.box] : 1)); s.due = KS.dkey(d); S[q.id] = s; KS.save();
        done++; if (v === 2) known++; queue.shift(); if (v === 0) queue.push(q); draw();
      }));
    };
    draw();
  };

  /* ---------- Fallstudien ---------- */
  KS.cases = () => (window.KS_CASES || []).slice().sort((a, b) => a.n - b.n);
  KS.caseState = (n) => KS.obj("cases")[n];
  KS.caseTile = function (c) {
    const s = KS.caseState(c.n), max = c.steps.length * 2;
    return '<a class="ltile' + (s ? " fertig" : "") + '" href="#fall-' + c.n + '" style="--ph:var(--p' + ((W().find((w) => w.n === c.n) || {}).phase || 1) + ')"><span class="ltile-kind">Fallstudie · Modul ' + c.n + "</span><b>" + esc(c.title) + '</b><span class="ltile-sub">' + esc(c.person) + '</span><span class="ltile-foot"><span>' + c.steps.length + " Entscheidungen</span>" + (s ? '<span class="chip ok num">' + s.score + "/" + max + "</span>" : '<span class="chip accent">Neu</span>') + "</span></a>";
  };
  KS.viewCase = function (n) {
    const c = KS.cases().find((x) => x.n === n); if (!c) return null; const w = W().find((x) => x.n === n);
    return '<article class="fade-in case" style="--ph:var(--p' + w.phase + ')" data-case="' + n + '"><div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Fallstudie · Modul ' + n + " · " + esc(w.title) + '</div><h2 style="font-size:clamp(1.8rem,4vw,2.6rem)">' + esc(c.title) + '</h2></div><a class="btn ghost small" href="#akademie">← Akademie</a></div>' +
      '<div class="case-person"><div class="case-avatar">' + esc(c.person.trim().charAt(0)) + '</div><div><b>' + esc(c.person) + '</b><div class="faint" style="font-size:.85rem">Fiktiver Fall · ' + c.steps.length + ' Entscheidungen</div></div></div><div class="reading case-intro">' + KS.cite(esc(c.intro)) + '</div><div data-steps></div></article>';
  };
  KS.bindCase = function (n) {
    const c = KS.cases().find((x) => x.n === n); const root = document.querySelector('[data-case="' + n + '"]'); if (!c || !root) return;
    const host = root.querySelector("[data-steps]"); const picks = [];
    const draw = () => {
      let h = c.steps.map((s, i) => {
        if (i > picks.length) return "";
        const p = picks[i];
        return '<div class="case-step fade-in"><div class="case-num num">' + (i + 1) + '</div><div style="min-width:0"><p class="reading">' + KS.cite(esc(s.situation)) + "</p><h4>" + esc(s.question) + '</h4><div class="ls-opts">' + s.options.map((o, k) => '<button type="button" class="ls-opt' + (p !== undefined ? (o.score === 2 ? " right" : k === p ? (o.score === 1 ? " mid" : " wrong") : "") : "") + '" data-k="' + k + '" data-i="' + i + '"' + (p !== undefined ? " disabled" : "") + '><span class="ls-key">' + "ABC"[k] + "</span><span>" + esc(o.t) + "</span></button>").join("") + "</div>" + (p !== undefined ? '<div class="ls-fb ' + (s.options[p].score === 2 ? "ok" : s.options[p].score === 1 ? "mid" : "no") + '"><b>' + ["Eher nicht hilfreich.", "Teilweise hilfreich.", "Sehr hilfreich."][s.options[p].score] + "</b> " + KS.cite(esc(s.options[p].fb)) + (s.options[p].score < 2 ? '<div style="margin-top:8px"><b>Am hilfreichsten wäre:</b> ' + esc(s.options.find((o) => o.score === 2).t) + " " + KS.cite(esc(s.options.find((o) => o.score === 2).fb)) + "</div>" : "") + "</div>" : "") + "</div></div>";
      }).join("");
      if (picks.length === c.steps.length) {
        const score = picks.reduce((a, p, i) => a + c.steps[i].options[p].score, 0), max = c.steps.length * 2;
        h += '<div class="case-end fade-in"><div class="exam-score num">' + score + " / " + max + '</div><h3>Wie es weitergeht</h3><p class="reading">' + KS.cite(esc(c.outro)) + '</p><h4>Drei Prinzipien zum Mitnehmen</h4><ol class="takeaways">' + c.principles.map((p) => "<li><span>" + esc(p) + "</span></li>").join("") + '</ol><div class="row"><a class="btn chunky" href="#akademie">Zur Akademie</a><button type="button" class="btn ghost" data-redo>Fall neu bearbeiten</button></div></div>';
        const prev = KS.caseState(n); KS.obj("cases")[n] = { score: Math.max(score, prev ? prev.score : 0), at: new Date().toISOString() }; KS.save(); if (score >= max - 1) KS.confetti();
      }
      host.innerHTML = h;
      host.querySelectorAll("[data-k]:not([disabled])").forEach((b) => (b.onclick = () => { picks[Number(b.dataset.i)] = Number(b.dataset.k); draw(); setTimeout(() => { const st = host.querySelectorAll(".case-step"); const last = st[Math.min(picks.length, st.length - 1)]; if (last) last.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60); }));
      const rd = host.querySelector("[data-redo]"); if (rd) rd.onclick = () => { picks.length = 0; draw(); };
    };
    draw();
  };

  /* ---------- Zertifikat: Voraussetzungen ---------- */
  KS.certReqs = function () {
    const v = KS.variant(), L = KS.obj("lessons"), p = KS.obj("profile"), plan = KS.obj("plan");
    const base = W().filter((w) => (L[w.n] || {}).done).length;
    const masters = Object.keys(L).filter((k) => /^\d+[abc]$/.test(k) && L[k].done).length;
    const deeps = Object.keys(L).filter((k) => /^\d+d$/.test(k) && L[k].done).length;
    const phases = ["p1", "p2", "p3", "p4"].filter(KS.examPassed).length;
    const cases = Object.keys(KS.obj("cases")).length;
    const weeks = KS.VARIANTS[v].weeks, elapsed = p.start ? Math.floor(KS.daysBetween(p.start, KS.today()) / 7) + 1 : 0;
    const minW = Math.ceil(weeks * 0.75);
    const R = [
      { t: "Alle 12 Grundlagen-Lektionen abgeschlossen", have: base, need: 12 },
      { t: "4 Phasenprüfungen bestanden (je mindestens 70 %)", have: phases, need: 4 },
      { t: "Abschlussprüfung bestanden (mindestens 80 %)", have: KS.examPassed("final") ? 1 : 0, need: 1 },
      { t: "Fallstudien bearbeitet", have: cases, need: 8 },
      { t: "Persönlicher Kompass-Plan erstellt", have: (plan.signs || "").trim() && (plan.helps || "").trim() ? 1 : 0, need: 1, link: "#tool-plan" },
      { t: "Programmzeit: mindestens " + minW + " von " + weeks + " Wochen", have: Math.min(elapsed, minW), need: minW }
    ];
    if (v === "m6") R.splice(1, 0, { t: "Masterclasses abgeschlossen", have: masters, need: 18 }, { t: "Vertiefungs-Lektionen abgeschlossen", have: deeps, need: 12 });
    if (v === "m12") R.splice(1, 0, { t: "Alle 36 Masterclasses abgeschlossen", have: masters, need: 36 }, { t: "Alle 12 Vertiefungs-Lektionen abgeschlossen", have: deeps, need: 12 });
    R.forEach((r) => (r.ok = r.have >= r.need));
    return R;
  };
  KS.certEarned = () => KS.certReqs().every((r) => r.ok);
  KS.certProgress = () => { const R = KS.certReqs(); return R.reduce((a, r) => a + Math.min(1, r.have / r.need), 0) / R.length; };
  KS.learnUnits = function () {
    const L = KS.obj("lessons"); let min = 0;
    Object.entries(L).forEach(([k, s]) => { if (!s.done) return; let cards = 25; try { if (/^\d+$/.test(k)) cards = KS.buildCards(W().find((w) => w.n === Number(k))).length; else if (/d$/.test(k)) cards = KS.buildCards(KS.deepSource(parseInt(k, 10)), "deep").length; else cards = KS.buildCards(KS.masterSource(k), "master").length; } catch (e) { /* */ } min += cards * 1.1; });
    min += KS.list("practice").reduce((a, p) => a + p.minutes, 0);
    min += Object.keys(KS.obj("cases")).length * 20;
    Object.values(KS.obj("exams")).forEach((e) => (min += (e.attempts || []).reduce((a, x) => a + Math.max(5, x.min || 0), 0)));
    min += KS.list("checkins").length * 2 + KS.list("thoughts").length * 10 + KS.list("gratitude").length * 4 + KS.list("sleep").length * 2;
    return Math.round(min / 45);
  };
  const hash = (s) => { let x = 0x811c9dc5; for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 0x01000193) >>> 0; } return x; };

  /* ---------- Zertifikat: Darstellung (SVG, A4 quer) ---------- */
  KS.certSVG = function (sample) {
    const p = KS.obj("profile"), v = KS.variant(), V = KS.VARIANTS[v];
    const name = (p.certName || p.name || "Vorname Nachname").trim();
    const fe = KS.examState("final"); const score = fe.best || 0;
    const start = p.start || KS.today(); const end = (KS.obj("cert").issued || KS.today());
    const num = "KS-" + end.slice(0, 4) + "-" + (hash(name + start + v + score) % 1679616).toString(36).toUpperCase().padStart(4, "0") + "-" + V.weeks;
    const lessons = Object.values(KS.obj("lessons")).filter((s) => s.done).length;
    const issuer = (KS.SHOP && KS.SHOP.issuer) || {};
    const ink = "#14212B", gold = "#B08A3E", teal = "#1D5C7A", paper = "#FBF9F4";
    let guil = ""; for (let k = 0; k < 18; k++) { let d = ""; for (let x = 0; x <= 1123; x += 6) { const y = 18 + Math.sin(x / 22 + k * 0.7) * 6 + Math.sin(x / 61 + k) * 3; d += (x ? "L" : "M") + x + " " + y.toFixed(1); } guil += '<path d="' + d + '" fill="none" stroke="' + teal + '" stroke-opacity=".18" stroke-width=".6"/>'; }
    const rosette = (cx, cy) => { let s = ""; for (let k = 0; k < 36; k++) { const a = k * Math.PI / 18; s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="46" ry="14" transform="rotate(' + (a * 180 / Math.PI) + " " + cx + " " + cy + ')" fill="none" stroke="' + gold + '" stroke-opacity=".55" stroke-width=".7"/>'; } return s; };
    const mods = W().map((w) => w.n + ". " + w.title);
    const fd = (s) => { const d = KS.parseD(s); return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear(); };
    return '<svg class="cert-svg" viewBox="0 0 1123 794" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Abschlusszertifikat">' +
      '<rect width="1123" height="794" fill="' + paper + '"/><g>' + guil + '</g><g transform="translate(0 758)">' + guil + "</g>" +
      '<rect x="28" y="28" width="1067" height="738" fill="none" stroke="' + gold + '" stroke-width="3"/><rect x="38" y="38" width="1047" height="718" fill="none" stroke="' + gold + '" stroke-width=".8"/>' +
      ["M28 70 L70 28", "M1053 28 L1095 70", "M28 724 L70 766", "M1095 724 L1053 766"].map((d) => '<path d="' + d + '" stroke="' + gold + '" stroke-width="1.5"/>').join("") +
      '<g transform="translate(561 96)"><circle r="22" fill="none" stroke="' + teal + '" stroke-width="2.5"/><path d="M-15 4c5-6 10-6 15 0s10 6 15 0" fill="none" stroke="' + teal + '" stroke-width="2.5" stroke-linecap="round"/><circle cy="-7" r="4.5" fill="' + gold + '"/></g>' +
      '<text x="561" y="150" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="15" letter-spacing="8" fill="' + teal + '" font-weight="700">KLARSINN · PROGRAMM FÜR MENTALE GESUNDHEIT</text>' +
      '<text x="561" y="214" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="54" fill="' + ink + '" letter-spacing="6">ABSCHLUSSZERTIFIKAT</text>' +
      '<line x1="411" y1="238" x2="711" y2="238" stroke="' + gold + '" stroke-width="1.2"/>' +
      '<text x="561" y="278" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="18" font-style="italic" fill="#4B5A63">Hiermit wird bestätigt, dass</text>' +
      '<text x="561" y="338" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="46" fill="' + ink + '">' + esc(name) + "</text>" +
      '<line x1="331" y1="356" x2="791" y2="356" stroke="' + ink + '" stroke-opacity=".25"/>' +
      '<text x="561" y="392" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="17" fill="#33434C">das evidenzbasierte Programm <tspan font-weight="700">Klarsinn ' + esc(V.name) + " · " + esc(V.tag) + "</tspan></text>" +
      '<text x="561" y="418" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="17" fill="#33434C">im Zeitraum vom ' + fd(start) + " bis " + fd(end) + " mit dem Prädikat <tspan font-weight=\"700\">„" + KS.predicate(score) + "“</tspan> abgeschlossen hat.</text>" +
      [["Programmdauer", V.weeks + " Wochen"], ["Lernumfang", KS.learnUnits() + " UE à 45 Min."], ["Lektionen", String(lessons)], ["Abschlussprüfung", score + " %"]].map((k, i) => { const x = 236 + i * 217; return '<text x="' + x + '" y="466" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="11" letter-spacing="2" fill="' + teal + '" font-weight="700">' + k[0].toUpperCase() + '</text><text x="' + x + '" y="492" text-anchor="middle" font-family="Literata, Georgia, serif" font-size="20" fill="' + ink + '">' + k[1] + "</text>"; }).join("") +
      '<text x="561" y="530" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="11" letter-spacing="2" fill="' + teal + '" font-weight="700">INHALTE</text>' +
      mods.map((m, i) => '<text x="' + (i < 6 ? 300 : 600) + '" y="' + (552 + (i % 6) * 17) + '" font-family="Literata, Georgia, serif" font-size="12.5" fill="#33434C">' + esc(m) + "</text>").join("") +
      '<g transform="translate(160 650)">' + rosette(0, 0) + '<circle r="40" fill="' + paper + '" stroke="' + gold + '" stroke-width="2"/><circle r="33" fill="none" stroke="' + gold + '" stroke-width=".8"/><text y="-6" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="9" letter-spacing="1.5" fill="' + gold + '" font-weight="800">KLARSINN</text><path d="M0 2 l3 7 7 0 -5.5 4.5 2 7 -6.5 -4 -6.5 4 2 -7 -5.5 -4.5 7 0z" fill="' + gold + '"/><text y="34" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="7" letter-spacing="1" fill="' + gold + '">' + V.weeks + " WOCHEN</text></g>" +
      '<line x1="780" y1="690" x2="990" y2="690" stroke="' + ink + '" stroke-opacity=".5"/><text x="885" y="708" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="11" fill="#4B5A63">' + esc(issuer.name ? issuer.name + " · " + (issuer.role || "Programmleitung") : "Programmleitung") + "</text>" + (issuer.name ? '<text x="885" y="682" text-anchor="middle" font-family="Literata, Georgia, serif" font-style="italic" font-size="22" fill="' + ink + '">' + esc(issuer.name) + "</text>" : "") +
      '<text x="885" y="738" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="10" fill="#4B5A63">Ausgestellt am ' + fd(end) + " · Nr. " + num + "</text>" +
      '<text x="561" y="752" text-anchor="middle" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="8.5" fill="#6A7880">Bestätigt die erfolgreiche Teilnahme an einem Selbsthilfe- und Bildungsprogramm. Keine berufliche Qualifikation, keine Heilbehandlung.</text>' +
      (sample ? '<text x="561" y="470" text-anchor="middle" transform="rotate(-18 561 420)" font-family="Bricolage Grotesque, Helvetica, Arial, sans-serif" font-size="150" font-weight="800" fill="#B03A3A" fill-opacity=".14" letter-spacing="20">MUSTER</text>' : "") + "</svg>";
  };

  KS.viewCert = function () {
    const R = KS.certReqs(), earned = R.every((r) => r.ok), p = KS.obj("profile");
    if (earned && !KS.obj("cert").issued) { KS.obj("cert").issued = KS.today(); KS.save(); }
    return '<section class="fade-in"><div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Akademie</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">Abschlusszertifikat</h2></div><a class="btn ghost small" href="#akademie">← Akademie</a></div>' +
      '<div class="cert-layout"><div class="cert-frame' + (earned ? " earned" : "") + '">' + KS.certSVG(!earned) + "</div>" +
      '<div class="stack"><div class="panel stack"><div class="row" style="justify-content:space-between"><span class="lbl">' + (earned ? "Zertifikat erworben" : "Voraussetzungen") + '</span>' + KS.ring(KS.certProgress()) .replace('class="ring"', 'class="ring" style="width:70px;height:70px"') + "</div>" +
      '<ul class="reqs">' + R.map((r) => '<li class="' + (r.ok ? "ok" : "") + '"><span class="rq-ic">' + (r.ok ? "✓" : "") + '</span><span>' + esc(r.t) + '<small class="num">' + Math.min(r.have, r.need) + " / " + r.need + "</small></span></li>").join("") + "</ul></div>" +
      '<div class="panel stack"><div class="field"><label for="ce-name">Name auf dem Zertifikat</label><input type="text" id="ce-name" value="' + esc(p.certName || p.name || "") + '" placeholder="Vorname Nachname"></div>' +
      (earned ? (window.KS_EMBED ? '<p class="faint" style="font-size:.85rem;margin:0">In der Web-Version kannst du das Zertifikat als PNG herunterladen oder drucken.</p>' : '<div class="row"><button type="button" class="btn chunky" data-png>Als Bild herunterladen</button><button type="button" class="btn ghost" data-print>Drucken / PDF</button></div>') : '<p class="muted" style="margin:0;font-size:.9rem">Solange nicht alle Voraussetzungen erfüllt sind, siehst du eine Vorschau mit dem Vermerk „Muster“.</p>') + "</div></div></div></section>";
  };
  KS.bindCert = function () {
    const n = document.getElementById("ce-name"); if (n) n.onchange = () => { KS.obj("profile").certName = n.value.trim(); KS.save(); KS.rerender(); };
    const png = document.querySelector("[data-png]");
    if (png) png.onclick = () => {
      const svg = document.querySelector(".cert-svg").outerHTML; const img = new Image();
      img.onload = () => { const c = document.createElement("canvas"); c.width = 2246; c.height = 1588; const x = c.getContext("2d"); x.drawImage(img, 0, 0, 2246, 1588); try { const a = document.createElement("a"); a.href = c.toDataURL("image/png"); a.download = "Klarsinn-Zertifikat.png"; document.body.appendChild(a); a.click(); a.remove(); } catch (e) { KS.toast("Download nicht möglich"); } };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    };
    const pr = document.querySelector("[data-print]"); if (pr) pr.onclick = () => { document.documentElement.classList.add("print-cert"); window.print(); setTimeout(() => document.documentElement.classList.remove("print-cert"), 500); };
  };

  /* ---------- Akademie-Übersicht ---------- */
  KS.viewAcademy = function () {
    const due = KS.dueCards().length, R = KS.certReqs(), cp = KS.certProgress();
    const ex = (k) => { const E = KS.EXAMS[k], s = KS.examState(k), ok = s.best >= E.pass; return '<a class="ltile' + (ok ? " fertig" : "") + '" href="#pruefung-' + k + '" style="--ph:' + (E.phase ? "var(--p" + E.phase + ")" : "var(--glow)") + '"><span class="ltile-kind">' + (E.phase ? "Phase " + E.phase : "Abschluss") + "</span><b>" + esc(E.name) + '</b><span class="ltile-sub">' + E.count + " Fragen · ab " + E.pass + ' % bestanden</span><span class="ltile-foot"><span>' + (s.attempts.length ? s.attempts.length + " Versuche" : "noch offen") + "</span>" + (s.best ? '<span class="chip ' + (ok ? "ok" : "glow") + ' num">' + s.best + " %</span>" : '<span class="chip accent">Neu</span>') + "</span></a>"; };
    return '<section class="fade-in"><div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Akademie</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">Prüfen, üben, abschließen</h2></div></div>' +
      '<div class="academy-hero"><a class="cert-teaser" href="#zertifikat"><div class="cert-mini">' + KS.certSVG(!KS.certEarned()) + '</div><div><div class="eyebrow">Dein Ziel</div><h3>Abschlusszertifikat</h3><p class="muted">' + R.filter((r) => r.ok).length + " von " + R.length + ' Voraussetzungen erfüllt</p><div class="bar" style="height:10px"><i style="width:' + Math.round(cp * 100) + '%"></i></div></div></a>' +
      '<a class="panel trainer-teaser" href="#trainer"><div class="eyebrow">Heute</div><h3>Wiederholungstrainer</h3><div class="exam-score num">' + due + '</div><p class="muted" style="margin:0">' + (due ? "Karten sind fällig. Etwa " + Math.max(2, Math.round(Math.min(20, due) * 0.4)) + " Minuten." : "Alles wiederholt. Komm morgen wieder.") + "</p></a></div>" +
      '<div class="sec-h"><h2>Prüfungen</h2><span class="muted">' + KS.bank().length + " Fragen im Pool</span></div><div class=\"lib-row\">" + ["p1", "p2", "p3", "p4", "final"].map(ex).join("") + "</div>" +
      '<div class="sec-h"><h2>Fallstudien</h2><span class="muted">Wende das Gelernte an echten Situationen an</span></div><div class="lib-row">' + (KS.cases().length ? KS.cases().map(KS.caseTile).join("") : '<div class="empty">Fallstudien werden geladen.</div>') + "</div></section>";
  };
})();
