/* Klarsinn – zweite Reihe interaktiver Grafiken und Lernspiele (je Modul eine weitere) */
(function () {
  const KS = window.KS, esc = KS.esc;
  const X = (KS.explorables2 = {});
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const alive = (el, iv) => { if (!el.isConnected) { clearInterval(iv); return false; } return true; };

  /* generisches Zuordnungsspiel */
  function sortGame(el, items, cats, after, explainFor) {
    let i = 0, ok = 0;
    const draw = () => {
      if (i >= items.length) {
        el.innerHTML = '<div class="xp-box xp-end" style="text-align:center"><div class="xp-score num">' + ok + " / " + items.length + "</div><p style=\"margin:6px 0 0\">" + after + '</p><button type="button" class="btn small ghost" data-re style="margin-top:10px">Noch einmal</button></div>';
        el.querySelector("[data-re]").onclick = () => { i = 0; ok = 0; draw(); };
        if (ok === items.length) KS.confetti && KS.confetti();
        return;
      }
      el.innerHTML = '<div class="xp-sort"><div class="row" style="justify-content:space-between;margin-bottom:8px"><span class="faint num" style="font-size:.85rem">Karte ' + (i + 1) + " von " + items.length + '</span><span class="chip ok num">' + ok + ' richtig</span></div><div class="bar" style="margin-bottom:12px"><i style="width:' + i / items.length * 100 + '%"></i></div><div class="vcard fade-in"><b style="font-size:1.15rem;font-family:var(--f-read);font-weight:600">' + esc(items[i][0]) + '</b></div><div class="xp-choices">' + cats.map((c, k) => '<button type="button" class="ls-opt" data-c="' + k + '"><span class="ls-key">' + "ABCDEFGH"[k] + "</span><span>" + esc(c) + "</span></button>").join("") + '</div><div data-out></div></div>';
      el.querySelectorAll("[data-c]").forEach((b) => (b.onclick = () => {
        const k = Number(b.dataset.c), right = k === items[i][1]; if (right) ok++;
        el.querySelectorAll("[data-c]").forEach((x) => { x.disabled = true; const kk = Number(x.dataset.c); if (kk === items[i][1]) x.classList.add("right"); else if (kk === k) x.classList.add("wrong"); });
        el.querySelector("[data-out]").innerHTML = '<div class="ls-fb ' + (right ? "ok" : "no") + '"><b>' + (right ? "Richtig." : "Nicht ganz.") + "</b> " + (explainFor ? explainFor(items[i]) : "") + '</div><div class="row" style="margin-top:10px"><button type="button" class="btn small chunky" data-n>Nächste Karte</button></div>';
        el.querySelector("[data-n]").onclick = () => { i++; draw(); };
      }));
    };
    draw();
  }

  /* B1 · Gewohnheitskurve */
  X[1] = {
    title: "Wie lange dauert eine Gewohnheit?", hint: "Verschiebe die Tage, wähle das Verhalten",
    mount(el) {
      let kind = 0; const K = [[0.06, "Ein Glas Wasser zum Frühstück"], [0.032, "10 Minuten Spaziergang nach dem Essen"], [0.016, "50 Sit-ups vor dem Kaffee"]];
      el.innerHTML = '<div class="seg" data-k style="margin-bottom:8px">' + K.map((k, i) => '<button type="button" class="' + (i ? "" : "on") + '">' + ["Leicht", "Mittel", "Anspruchsvoll"][i] + "</button>").join("") + '</div><svg viewBox="0 0 400 220" class="xp-svg" role="img" aria-label="Gewohnheitskurve"><line x1="40" y1="185" x2="390" y2="185" stroke="var(--line)" stroke-width="2"/><line x1="40" y1="20" x2="40" y2="185" stroke="var(--line)" stroke-width="2"/><line data-m66 y1="20" y2="185" stroke="var(--glow)" stroke-dasharray="4 4"/><text data-t66 y="16" text-anchor="middle" class="xp-ax" style="fill:var(--glow)">Median 66 Tage</text><path data-c fill="none" stroke="var(--accent)" stroke-width="3.5"/><path data-a fill="var(--accent)" opacity=".1"/><circle data-d r="9" fill="var(--glow)" stroke="var(--surface)" stroke-width="3"/><text x="215" y="208" text-anchor="middle" class="xp-ax">Tage der Wiederholung</text><text x="14" y="105" text-anchor="middle" class="xp-ax" transform="rotate(-90 14 105)">Automatik</text><g class="xp-ax" data-tk></g></svg><label class="lbl" style="font-size:.85rem">Tag <b class="num" data-v>30</b></label><input type="range" min="0" max="250" value="30" data-r aria-label="Tage"><div class="xp-out" data-out></div>';
      const X0 = (d) => 40 + d / 250 * 350, Y0 = (a) => 185 - a * 160;
      el.querySelector("[data-tk]").innerHTML = [0, 50, 100, 150, 200, 250].map((d) => '<text x="' + X0(d) + '" y="198" text-anchor="middle">' + d + "</text>").join("");
      const m = el.querySelector("[data-m66]"); m.setAttribute("x1", X0(66)); m.setAttribute("x2", X0(66)); el.querySelector("[data-t66]").setAttribute("x", X0(66));
      const r = el.querySelector("[data-r]");
      const draw = () => {
        const k = K[kind][0]; let d = ""; for (let t = 0; t <= 250; t += 3) d += (t ? "L" : "M") + X0(t).toFixed(1) + " " + Y0(1 - Math.exp(-k * t)).toFixed(1);
        el.querySelector("[data-c]").setAttribute("d", d); el.querySelector("[data-a]").setAttribute("d", d + " L" + X0(250) + " 185 L40 185Z");
        const t = Number(r.value), a = 1 - Math.exp(-k * t); const dot = el.querySelector("[data-d]"); dot.setAttribute("cx", X0(t)); dot.setAttribute("cy", Y0(a));
        el.querySelector("[data-v]").textContent = t;
        el.querySelector("[data-out]").innerHTML = "<b>" + esc(K[kind][1]) + ":</b> nach " + t + " Tagen etwa <b class=\"num\">" + Math.round(a * 100) + " %</b> automatisch. " + (a > 0.95 ? "Das Verhalten läuft jetzt fast von selbst." : "Jede Wiederholung im gleichen Kontext zählt. Ein ausgelassener Tag ändert am Verlauf kaum etwas.") + ' <span class="faint">Schematisch nach ' + KS.cite("[[lally2010]]") + ": Spanne 18 bis 254 Tage.</span>";
      };
      r.oninput = draw;
      el.querySelectorAll("[data-k] button").forEach((b, i) => (b.onclick = () => { kind = i; el.querySelectorAll("[data-k] button").forEach((x, j) => x.classList.toggle("on", i === j)); draw(); }));
      draw();
    }
  };

  /* B2 · Stress-Eimer */
  X[2] = {
    title: "Das Stress-Fass", hint: "Fülle Belastungen ein und öffne Ventile",
    mount(el) {
      const S = [["Termindruck", 14], ["Streit", 12], ["Schlafmangel", 10], ["Geldsorgen", 14], ["Krankheit", 16], ["Lärm", 6]];
      const V = [["Bewegung", 0.5], ["Reden", 0.45], ["Pausen", 0.35], ["Schlaf", 0.55]];
      let lvl = 20; const open = new Set(); let cap = 100;
      el.innerHTML = '<div class="xp-barrel"><svg viewBox="0 0 240 260" class="xp-svg" style="max-width:260px;margin:0 auto" role="img" aria-label="Stress-Fass"><defs><clipPath id="bclip"><path d="M40 30 L200 30 L185 240 L55 240 Z"/></clipPath></defs><path d="M40 30 L200 30 L185 240 L55 240 Z" fill="var(--surface-2)"/><g clip-path="url(#bclip)"><rect data-w x="0" width="240" fill="var(--accent)" opacity=".75"/><path data-wave fill="var(--accent)" opacity=".9"/></g><path d="M40 30 L200 30 L185 240 L55 240 Z" fill="none" stroke="var(--ink-soft)" stroke-width="3"/><line data-cap x1="30" x2="210" stroke="var(--crit)" stroke-width="2" stroke-dasharray="5 4"/><text data-capt x="212" class="xp-ax" style="fill:var(--crit)">Grenze</text><g data-drops></g></svg></div>' +
        '<div class="grid2"><div><span class="lbl" style="font-size:.85rem">Belastungen einfüllen</span><div class="pills" data-s style="margin-top:6px">' + S.map((s, i) => '<button type="button" class="pill" data-i="' + i + '">+ ' + s[0] + "</button>").join("") + '</div></div><div><span class="lbl" style="font-size:.85rem">Ventile öffnen (Bewältigung)</span><div class="pills" data-v style="margin-top:6px">' + V.map((v, i) => '<button type="button" class="pill" data-i="' + i + '">' + v[0] + "</button>").join("") + '</div></div></div><label class="lbl" style="font-size:.85rem">Fassgröße (Verletzlichkeit): <span data-cv>mittel</span></label><input type="range" min="60" max="100" value="80" data-cap-r aria-label="Fassgröße"><div class="xp-out" data-out></div>';
      const capR = el.querySelector("[data-cap-r]");
      const Y = (v) => 240 - v / 100 * 210;
      let t = 0;
      const draw = () => {
        cap = Number(capR.value); el.querySelector("[data-cv]").textContent = cap > 90 ? "groß, robust" : cap > 72 ? "mittel" : "klein, verletzlich";
        const cy = Y(cap); const c = el.querySelector("[data-cap]"); c.setAttribute("y1", cy); c.setAttribute("y2", cy); el.querySelector("[data-capt]").setAttribute("y", cy + 4);
        const wy = Y(Math.min(lvl, 104)); const w = el.querySelector("[data-w]"); w.setAttribute("y", wy + 4); w.setAttribute("height", 260);
        let d = "M0 " + (wy + 4); for (let x = 0; x <= 240; x += 8) d += " L" + x + " " + (wy + Math.sin(x / 18 + t) * 3).toFixed(1); d += " L240 " + (wy + 6) + " L0 " + (wy + 6) + "Z"; el.querySelector("[data-wave]").setAttribute("d", d);
        const over = lvl > cap;
        el.querySelector("[data-out]").innerHTML = over ? '<b style="color:var(--crit)">Das Fass läuft über.</b> Wenn Belastungen die persönliche Grenze übersteigen, können Symptome entstehen. Öffne Ventile oder nimm Belastungen heraus.' : lvl > cap - 15 ? "<b>Knapp unter der Grenze.</b> Schon eine kleine zusätzliche Belastung kann jetzt viel auslösen. Das erklärt, warum manchmal „der Tropfen“ reicht." : "<b>Im grünen Bereich.</b> Belastung und Bewältigung halten sich die Waage. Das Modell folgt dem Vulnerabilitäts-Stress-Gedanken " + KS.cite("[[zubin1977]]") + ".";
      };
      el.querySelector("[data-s]").onclick = (e) => { const b = e.target.closest("[data-i]"); if (!b) return; lvl += S[b.dataset.i][1]; b.classList.add("pop"); setTimeout(() => b.classList.remove("pop"), 300); draw(); };
      el.querySelector("[data-v]").onclick = (e) => { const b = e.target.closest("[data-i]"); if (!b) return; const i = Number(b.dataset.i); if (open.has(i)) open.delete(i); else open.add(i); b.classList.toggle("on", open.has(i)); };
      capR.oninput = draw;
      const iv = setInterval(() => { if (!alive(el, iv)) return; t += 0.25; open.forEach((i) => (lvl = Math.max(5, lvl - V[i][1]))); draw(); }, 120);
      draw();
    }
  };

  /* B3 · Toleranzfenster */
  X[3] = {
    title: "Dein Toleranzfenster", hint: "Wie aktiviert bist du gerade?",
    mount(el) {
      el.innerHTML = '<svg viewBox="0 0 400 230" class="xp-svg" role="img" aria-label="Toleranzfenster"><rect x="0" y="10" width="400" height="60" data-hi fill="var(--crit)" opacity=".12"/><rect x="0" data-win width="400" fill="var(--ok)" opacity=".14"/><rect x="0" data-lo width="400" fill="var(--p1)" opacity=".12"/><text x="8" y="28" class="xp-q" style="fill:var(--crit)">Übererregung: Kampf, Flucht, Panik</text><text x="8" data-wt class="xp-q" style="fill:var(--ok)">Toleranzfenster: klar, verbunden, handlungsfähig</text><text x="8" y="214" class="xp-q" style="fill:var(--p1)">Untererregung: taub, leer, erstarrt</text><path data-line fill="none" stroke="var(--ink)" stroke-width="2.5"/><circle data-dot r="8" fill="var(--glow)" stroke="var(--surface)" stroke-width="3"/></svg><div class="grid2"><label class="field"><span class="lbl" style="font-size:.85rem">Aktivierung jetzt</span><input type="range" min="0" max="100" value="50" data-a></label><label class="field"><span class="lbl" style="font-size:.85rem">Breite des Fensters (Ressourcen)</span><input type="range" min="20" max="70" value="40" data-w></label></div><div class="xp-out" data-out></div>';
      const a = el.querySelector("[data-a]"), w = el.querySelector("[data-w]"); let t = 0;
      const Y = (v) => 220 - v / 100 * 210;
      const draw = () => {
        const ww = Number(w.value), top = 50 + ww / 2, bot = 50 - ww / 2;
        const hi = el.querySelector("[data-hi]"); hi.setAttribute("y", 10); hi.setAttribute("height", Y(top) - 10);
        const win = el.querySelector("[data-win]"); win.setAttribute("y", Y(top)); win.setAttribute("height", Y(bot) - Y(top));
        const lo = el.querySelector("[data-lo]"); lo.setAttribute("y", Y(bot)); lo.setAttribute("height", 220 - Y(bot));
        el.querySelector("[data-wt]").setAttribute("y", (Y(top) + Y(bot)) / 2 + 4);
        const v = Number(a.value); let d = ""; for (let x = 0; x <= 380; x += 5) { const vv = v + Math.sin(x / 30 + t) * 6 * Math.min(1, x / 120) - (380 - x) / 380 * (v - 50) * 0.6; d += (x ? "L" : "M") + x + " " + Y(clamp(vv, 2, 98)).toFixed(1); }
        el.querySelector("[data-line]").setAttribute("d", d); const dot = el.querySelector("[data-dot]"); dot.setAttribute("cx", 380); dot.setAttribute("cy", Y(clamp(v + Math.sin(380 / 30 + t) * 6, 2, 98)));
        el.querySelector("[data-out]").innerHTML = v > top ? "<b>Über dem Fenster.</b> Der Körper ist im Alarm. Jetzt helfen Herunterregulieren: lange Ausatmung, kaltes Wasser, Bewegung, 5-4-3-2-1." : v < bot ? "<b>Unter dem Fenster.</b> Alles fühlt sich gedämpft an. Jetzt helfen sanftes Aktivieren: aufstehen, Muskeln anspannen, etwas Kaltes trinken, mit jemandem sprechen." : "<b>Im Fenster.</b> Hier kannst du denken, fühlen und handeln zugleich. Regelmäßige Entspannung, Schlaf und gute Beziehungen machen das Fenster breiter " + KS.cite("[[siegel1999]]") + ".";
      };
      a.oninput = draw; w.oninput = draw;
      const iv = setInterval(() => { if (!alive(el, iv)) return; t += 0.12; draw(); }, 80); draw();
    }
  };

  /* B4 · Nacht-Balken und Schlafeffizienz */
  X[4] = {
    title: "Schlafeffizienz sichtbar machen", hint: "Stelle eine typische Nacht ein",
    mount(el) {
      el.innerHTML = '<svg viewBox="0 0 400 120" class="xp-svg" role="img" aria-label="Nachtverlauf"><g data-g></g></svg><div class="grid2"><label class="field"><span class="lbl" style="font-size:.85rem">Ins Bett: <b data-bv></b></span><input type="range" min="20" max="25" step="0.25" value="22.5" data-b></label><label class="field"><span class="lbl" style="font-size:.85rem">Aufstehen: <b data-uv></b></span><input type="range" min="5" max="10" step="0.25" value="7.5" data-u></label><label class="field"><span class="lbl" style="font-size:.85rem">Einschlafen dauert: <b data-lv></b> Min.</span><input type="range" min="0" max="120" step="5" value="40" data-l></label><label class="field"><span class="lbl" style="font-size:.85rem">Nachts wach: <b data-wv></b> Min.</span><input type="range" min="0" max="180" step="5" value="45" data-w></label></div><div class="xp-out" data-out></div>';
      const g = (k) => el.querySelector("[data-" + k + "]");
      const fmt = (h) => { h = (h + 24) % 24; return Math.floor(h) + ":" + String(Math.round((h % 1) * 60)).padStart(2, "0"); };
      const draw = () => {
        const b = Number(g("b").value), u = Number(g("u").value) + 24, lat = Number(g("l").value) / 60, waso = Number(g("w").value) / 60;
        const tib = u - b, tst = Math.max(0, tib - lat - waso), se = Math.round(tst / tib * 100);
        const X0 = (h) => 10 + (h - 20) / 14 * 380;
        let s = '<rect x="10" y="30" width="380" height="40" rx="8" fill="var(--surface-2)"/>';
        s += '<rect x="' + X0(b) + '" y="30" width="' + (X0(b + lat) - X0(b)) + '" height="40" fill="var(--glow)"/>';
        const sleepStart = b + lat, sleepLen = u - sleepStart; const gaps = waso > 0 ? [0.35, 0.7] : [];
        s += '<rect x="' + X0(sleepStart) + '" y="30" width="' + (X0(u) - X0(sleepStart)) + '" height="40" fill="var(--accent)"/>';
        gaps.forEach((p) => { const st = sleepStart + sleepLen * p; s += '<rect x="' + X0(st) + '" y="30" width="' + (X0(st + waso / 2) - X0(st)) + '" height="40" fill="var(--glow)"/>'; });
        [20, 22, 24, 26, 28, 30, 32, 34].forEach((h) => (s += '<text x="' + X0(h) + '" y="90" text-anchor="middle" class="xp-ax">' + fmt(h) + "</text>"));
        s += '<text x="10" y="20" class="xp-ax"><tspan style="fill:var(--accent);font-weight:800">■</tspan> Schlaf   <tspan style="fill:var(--glow);font-weight:800">■</tspan> wach im Bett</text>';
        s += '<text x="390" y="112" text-anchor="end" style="font-weight:800;font-size:15px;fill:' + (se >= 85 ? "var(--ok)" : "var(--crit)") + '">Effizienz ' + se + " %</text>";
        g("g").innerHTML = s; g("bv").textContent = fmt(b); g("uv").textContent = fmt(u); g("lv").textContent = g("l").value; g("wv").textContent = g("w").value;
        el.querySelector("[data-out]").innerHTML = "Im Bett: <b class=\"num\">" + tib.toFixed(1).replace(".", ",") + " h</b>, geschlafen: <b class=\"num\">" + tst.toFixed(1).replace(".", ",") + " h</b>. " + (se >= 85 ? "Gut: Das Bett ist vor allem ein Ort zum Schlafen." : "Viel Wachzeit im Bett schwächt die Verbindung Bett und Schlaf. Probiere aus, was passiert, wenn du später ins Bett gehst: Die Effizienz steigt, oft ohne dass die Schlafzeit sinkt. In der Praxis nur behutsam und bei starken Problemen mit fachlicher Begleitung " + KS.cite("[[spielman1987]][[riemann2017]]") + ".");
      };
      ["b", "u", "l", "w"].forEach((k) => (g(k).oninput = draw)); draw();
    }
  };

  /* B5 · Dosis-Wirkung Bewegung */
  X[5] = {
    title: "Wie viel Bewegung schützt?", hint: "Stelle deine Minuten pro Woche ein",
    mount(el) {
      el.innerHTML = '<svg viewBox="0 0 400 230" class="xp-svg" role="img" aria-label="Dosis-Wirkungs-Kurve Bewegung"><rect data-who x="0" y="20" height="165" fill="var(--ok)" opacity=".1"/><text data-whot y="34" class="xp-ax" style="fill:var(--ok)">WHO-Empfehlung</text><line x1="40" y1="185" x2="390" y2="185" stroke="var(--line)" stroke-width="2"/><path data-c fill="none" stroke="var(--p2)" stroke-width="3.5"/><circle data-d r="9" fill="var(--glow)" stroke="var(--surface)" stroke-width="3"/><text x="215" y="215" text-anchor="middle" class="xp-ax">Minuten moderate Bewegung pro Woche</text><g data-tk class="xp-ax"></g><text x="14" y="100" text-anchor="middle" class="xp-ax" transform="rotate(-90 14 100)">weniger Depressionsrisiko</text></svg><input type="range" min="0" max="300" step="10" value="60" data-r aria-label="Minuten pro Woche"><div class="pills" data-pre><button type="button" class="pill" data-m="70">10 Min. täglich gehen</button><button type="button" class="pill" data-m="150">5 × 30 Min.</button><button type="button" class="pill" data-m="210">30 Min. täglich</button></div><div class="xp-out" data-out></div>';
      const X0 = (m) => 40 + m / 300 * 350, R = (m) => 0.31 * (1 - Math.exp(-m / 95)), Y0 = (r) => 185 - r / 0.32 * 150;
      el.querySelector("[data-tk]").innerHTML = [0, 75, 150, 225, 300].map((m) => '<text x="' + X0(m) + '" y="200" text-anchor="middle">' + m + "</text>").join("") + [0, 10, 20, 30].map((p) => '<text x="34" y="' + (Y0(p / 100) + 4) + '" text-anchor="end">' + p + "%</text>").join("");
      const who = el.querySelector("[data-who]"); who.setAttribute("x", X0(150)); who.setAttribute("width", X0(300) - X0(150)); el.querySelector("[data-whot]").setAttribute("x", X0(150) + 6);
      let d = ""; for (let m = 0; m <= 300; m += 5) d += (m ? "L" : "M") + X0(m).toFixed(1) + " " + Y0(R(m)).toFixed(1); el.querySelector("[data-c]").setAttribute("d", d);
      const r = el.querySelector("[data-r]");
      const draw = () => { const m = Number(r.value); const dt = el.querySelector("[data-d]"); dt.setAttribute("cx", X0(m)); dt.setAttribute("cy", Y0(R(m))); el.querySelector("[data-out]").innerHTML = "<b class=\"num\">" + m + " Minuten</b> pro Woche: geschätzt rund <b class=\"num\">" + Math.round(R(m) * 100) + " %</b> geringeres Depressionsrisiko. " + (m < 150 ? "Gute Nachricht: Der größte Gewinn liegt bei den ersten Minuten. Schon die Hälfte der Empfehlung bringt viel." : "Über der Empfehlung steigt der Schutz nur noch wenig. Regelmäßigkeit ist wichtiger als Intensität.") + ' <span class="faint">Vereinfachte Kurve nach ' + KS.cite("[[pearce2022]]") + ": etwa 18 % bei halber, 25 % bei voller Empfehlung.</span>"; };
      r.oninput = draw; el.querySelector("[data-pre]").onclick = (e) => { const b = e.target.closest("[data-m]"); if (b) { r.value = b.dataset.m; draw(); } };
      draw();
    }
  };

  /* B6 · Atemzählen */
  X[6] = {
    title: "Atemzüge zählen", hint: "Tippe bei jedem Ausatmen, zähle bis 10",
    mount(el) {
      let n = 0, rounds = 0, wander = 0;
      el.innerHTML = '<div class="xp-count"><div class="xp-dots" data-dots>' + Array.from({ length: 10 }, (_, i) => '<span data-i="' + i + '"></span>').join("") + '</div><div class="xp-big num" data-n>0</div><div class="row" style="justify-content:center"><button type="button" class="btn chunky big" data-ex>Ausatmen</button><button type="button" class="btn chunky alt" data-wd>Ich war abgeschweift</button></div><div class="row" style="justify-content:center;gap:16px;margin-top:6px"><span class="chip ok num" data-r>0 Runden</span><span class="chip num" data-w>0 × bemerkt</span></div></div><div class="xp-out">Atme natürlich. Tippe bei jedem Ausatmen. Bei 10 beginnst du von vorn. Wenn du merkst, dass du abgeschweift bist, tippe auf „abgeschweift“: Das Bemerken ist der eigentliche Trainingsmoment der Achtsamkeit.</div>';
      const upd = () => { el.querySelectorAll("[data-dots] span").forEach((s, i) => s.classList.toggle("on", i < n)); el.querySelector("[data-n]").textContent = n; el.querySelector("[data-r]").textContent = rounds + (rounds === 1 ? " Runde" : " Runden"); el.querySelector("[data-w]").textContent = wander + " × bemerkt"; };
      el.querySelector("[data-ex]").onclick = () => { n++; if (n > 10) n = 1; if (n === 10) { rounds++; KS.bell(true); } upd(); };
      el.querySelector("[data-wd]").onclick = () => { wander++; n = 0; upd(); KS.toast("Gut bemerkt. Zurück zu 1."); };
    }
  };

  /* B7 · Denkfallen-Detektiv */
  X[7] = {
    title: "Denkfallen-Detektiv", hint: "Welche Denkfalle steckt im Satz?",
    mount(el) {
      const T = ["Katastrophisieren", "Gedankenlesen", "Schwarz-Weiß-Denken", "Übergeneralisieren", "Muss-Sätze", "Etikettieren"];
      const I = [["„Wenn ich die Präsentation verhaue, ist meine Karriere vorbei.“", 0], ["„Sie hat so komisch geguckt, sie hält mich bestimmt für inkompetent.“", 1], ["„Wenn es nicht perfekt ist, ist es ein Totalausfall.“", 2], ["„Nie klappt bei mir irgendwas.“", 3], ["„Ich darf auf keinen Fall Schwäche zeigen.“", 4], ["„Ich bin einfach ein Versager.“", 5], ["„Er hat nicht zurückgerufen, er will nichts mehr mit mir zu tun haben.“", 1], ["„Mein Herz klopft, bestimmt ist es ein Herzinfarkt.“", 0]];
      sortGame(el, I, T, "Denkfallen zu erkennen ist der erste Schritt der kognitiven Umstrukturierung. Im Gedankenprotokoll kannst du das an eigenen Gedanken üben " + KS.cite("[[beck1979]]") + ".", (it) => "Das ist <b>" + T[it[1]] + "</b>.");
    }
  };

  /* B8 · Warum oder Wie */
  X[8] = {
    title: "Grübeln oder Lösen?", hint: "Ordne die Fragen zu",
    mount(el) {
      const C = ["Grübeln: abstrakt, „Warum?“", "Konstruktiv: konkret, „Wie?“"];
      const I = [["Warum passiert immer mir so etwas?", 0], ["Was genau ist passiert, Schritt für Schritt?", 1], ["Was stimmt nicht mit mir?", 0], ["Was ist der kleinste nächste Schritt?", 1], ["Warum fühle ich mich ständig so schlecht?", 0], ["Wie habe ich eine ähnliche Lage früher gemeistert?", 1], ["Was sagt das über mich als Mensch aus?", 0], ["Wen könnte ich um Rat fragen?", 1]];
      sortGame(el, I, C, "Abstrakte Warum-Fragen halten das Grübeln am Laufen. Konkrete Wie-Fragen führen zu Handlungen und senken die Belastung " + KS.cite("[[watkins2008]]") + ".", (it) => (it[1] ? "Konkret und handlungsorientiert." : "Abstrakt und bewertend, typisch für Grübeln."));
    }
  };

  /* B9 · Gefühlswelle */
  X[9] = {
    title: "Auf der Welle reiten", hint: "Starte die Welle und beobachte",
    mount(el) {
      el.innerHTML = '<svg viewBox="0 0 400 200" class="xp-svg" role="img" aria-label="Gefühlswelle"><line x1="20" y1="170" x2="390" y2="170" stroke="var(--line)" stroke-width="2"/><text x="20" y="190" class="xp-ax">Zeit →</text><text x="14" y="95" text-anchor="middle" class="xp-ax" transform="rotate(-90 14 95)">Intensität</text><path data-a fill="var(--p3)" opacity=".15"/><path data-p fill="none" stroke="var(--p3)" stroke-width="3.5" stroke-linecap="round"/><circle data-s r="9" fill="var(--glow)" stroke="var(--surface)" stroke-width="3" cx="20" cy="160"/><text data-l x="200" y="30" text-anchor="middle" style="font-weight:800;font-size:15px;fill:var(--ink)"></text></svg><div class="row" style="justify-content:center"><button type="button" class="btn chunky" data-go>Welle starten</button><button type="button" class="btn chunky alt" data-feed disabled>Grübeln (Welle füttern)</button></div><div class="xp-out" data-out>Gefühle und Impulse verlaufen wie Wellen: Sie steigen an, erreichen einen Höhepunkt und klingen ab, wenn wir sie nicht durch Grübeln oder Handeln füttern.</div>';
      let pts = [], t = 0, iv = null, boost = 0;
      const draw = () => { const X0 = (i) => 20 + i * 2; const d = pts.map((v, i) => (i ? "L" : "M") + X0(i) + " " + (170 - v * 140).toFixed(1)).join(" "); el.querySelector("[data-p]").setAttribute("d", d); if (pts.length > 1) el.querySelector("[data-a]").setAttribute("d", d + " L" + X0(pts.length - 1) + " 170 L20 170Z"); const s = el.querySelector("[data-s]"); s.setAttribute("cx", X0(pts.length - 1 || 0)); s.setAttribute("cy", 170 - (pts[pts.length - 1] || 0) * 140 - 10); };
      el.querySelector("[data-go]").onclick = () => {
        clearInterval(iv); pts = []; t = 0; boost = 0; el.querySelector("[data-feed]").disabled = false;
        iv = setInterval(() => {
          if (!alive(el, iv)) return; t++;
          const base = t < 50 ? Math.sin(t / 50 * Math.PI / 2) : Math.exp(-(t - 50) / 40);
          boost *= 0.985; const v = clamp(0.9 * base + boost, 0, 1); pts.push(v);
          el.querySelector("[data-l]").textContent = t < 40 ? "Anstieg: benennen, atmen" : t < 65 ? "Höhepunkt: nicht handeln, beobachten" : v > 0.25 ? "Abklingen: die Welle trägt dich" : "Vorbei. Du hast sie überstanden.";
          draw(); if (pts.length >= 180) { clearInterval(iv); el.querySelector("[data-feed]").disabled = true; el.querySelector("[data-out]").innerHTML = boost > 0.05 ? "<b>Die Welle hat länger gedauert.</b> Jedes Grübeln hat ihr neue Energie gegeben." : "<b>Geschafft.</b> Ohne Futter klingt die Intensität von selbst ab. Das ist die Grundidee des „Urge Surfing“ und der Akzeptanz von Gefühlen " + KS.cite("[[hayes2012]]") + "."; }
        }, 60);
      };
      el.querySelector("[data-feed]").onclick = () => { boost = Math.min(0.6, boost + 0.3); };
    }
  };

  /* B10 · Kritiker oder Freund */
  X[10] = {
    title: "Innerer Kritiker oder guter Freund?", hint: "Wähle die mitfühlende Antwort",
    mount(el) {
      const Q = [["Ich habe die Frist verpasst. Ich bin so unfähig.", ["Stimmt, du kriegst nie etwas hin.", "Das ist ärgerlich und tut weh. Fristen verpassen passiert vielen. Was brauchst du jetzt, um es nachzuholen?", "Ist doch egal, die Frist war sowieso unwichtig."], 1], ["Alle anderen haben ihr Leben im Griff, nur ich nicht.", ["Es fühlt sich gerade so an. Viele Menschen kämpfen, man sieht es nur nicht. Du bist damit nicht allein.", "Arme du, dir geht es wirklich schlechter als allen anderen.", "Reiß dich zusammen und hör auf zu jammern."], 0], ["Ich habe im Streit überreagiert.", ["Das war daneben, du bist ein schrecklicher Mensch.", "Der andere war schuld, du hast alles richtig gemacht.", "Du warst überfordert, das ist menschlich. Du kannst Verantwortung übernehmen und dich entschuldigen."], 2], ["Ich habe schon wieder nicht trainiert.", ["Du bist einfach faul.", "Heute war viel los. Was wäre ein kleiner, freundlicher Schritt für morgen?", "Sport ist eh überbewertet."], 1]];
      const items = Q.map((q) => [q[0], q[2]]);
      let idx = 0;
      const host = el;
      const draw = () => {
        if (idx >= Q.length) { host.innerHTML = '<div class="xp-box xp-end"><b>Geschafft.</b> Selbstmitgefühl ist weder Selbstkritik noch Schönreden. Es erkennt den Schmerz an, erinnert an das gemeinsame Menschsein und ermutigt freundlich zum nächsten Schritt ' + KS.cite("[[neff2003]][[breines2012]]") + '. <button type="button" class="btn small ghost" data-re>Noch einmal</button></div>'; host.querySelector("[data-re]").onclick = () => { idx = 0; draw(); }; return; }
        const q = Q[idx];
        host.innerHTML = '<div class="xp-chat"><div class="xp-bubble crit">' + esc(q[0]) + '</div><span class="faint" style="font-size:.8rem">Was würde ein guter Freund antworten?</span>' + q[1].map((o, k) => '<button type="button" class="ls-opt" data-k="' + k + '"><span class="ls-key">' + "ABC"[k] + "</span><span>" + esc(o) + "</span></button>").join("") + '<div data-out></div></div>';
        host.querySelectorAll("[data-k]").forEach((b) => (b.onclick = () => { const k = Number(b.dataset.k), ok = k === q[2]; host.querySelectorAll("[data-k]").forEach((x) => { x.disabled = true; if (Number(x.dataset.k) === q[2]) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); }); host.querySelector("[data-out]").innerHTML = '<div class="ls-fb ' + (ok ? "ok" : "no") + '">' + (ok ? "<b>Genau.</b> Anerkennen, verbinden, ermutigen." : "<b>Eher nicht.</b> " + (k === 0 || q[1][k].match(/faul|schrecklich|zusammen|nie/) ? "Das ist die Stimme des Kritikers." : "Das ist Schönreden oder Selbstmitleid, nicht Mitgefühl.")) + '</div><button type="button" class="btn small chunky" style="margin-top:10px" data-n>Weiter</button>'; host.querySelector("[data-n]").onclick = () => { idx++; draw(); }; }));
      };
      void items; draw();
    }
  };

  /* B11 · Erwartung und Erleben */
  X[11] = {
    title: "Unterschätzte Gespräche", hint: "Gib zuerst deine Prognose ab",
    mount(el) {
      el.innerHTML = '<div class="xp-box"><span class="eyebrow">Gedankenexperiment</span><b>Du sitzt im Zug neben einer fremden Person. Wie angenehm wäre die Fahrt, wenn du ein Gespräch beginnst, im Vergleich zum Für-dich-Sein?</b></div><label class="lbl" style="font-size:.85rem">Meine Prognose: <span data-v>gleich angenehm</span></label><input type="range" min="-3" max="3" value="0" data-r aria-label="Prognose"><div class="row"><button type="button" class="btn small chunky" data-show>Was die Studie fand</button></div><svg viewBox="0 0 400 150" class="xp-svg" data-svg hidden role="img" aria-label="Erwartung und Erleben"><g data-g></g></svg><div class="xp-out" data-out></div>';
      const r = el.querySelector("[data-r]"), L = ["viel unangenehmer", "unangenehmer", "etwas unangenehmer", "gleich angenehm", "etwas angenehmer", "angenehmer", "viel angenehmer"];
      r.oninput = () => (el.querySelector("[data-v]").textContent = L[Number(r.value) + 3]);
      el.querySelector("[data-show]").onclick = () => {
        const svg = el.querySelector("[data-svg]"); svg.hidden = false;
        const bar = (y, v, c, label) => { const x0 = 200, w = v * 50; return '<text x="10" y="' + (y + 15) + '" class="xp-ax" style="font-weight:700">' + label + '</text><rect x="' + Math.min(x0, x0 + w) + '" y="' + y + '" width="' + Math.abs(w) + '" height="22" rx="6" fill="' + c + '"><animate attributeName="width" from="0" to="' + Math.abs(w) + '" dur=".6s"/></rect>'; };
        el.querySelector("[data-g]").innerHTML = '<line x1="200" y1="5" x2="200" y2="130" stroke="var(--line)" stroke-width="2"/><text x="200" y="146" text-anchor="middle" class="xp-ax">gleich</text><text x="390" y="146" text-anchor="end" class="xp-ax">angenehmer →</text><text x="10" y="146" class="xp-ax">← unangenehmer</text>' + bar(10, Number(r.value) || 0.05, "var(--accent)", "Deine Prognose") + bar(48, -1, "var(--ink-faint)", "Typische Erwartung") + bar(86, 1.6, "var(--ok)", "Tatsächliches Erleben");
        el.querySelector("[data-out]").innerHTML = "In Feldexperimenten erwarteten Pendelnde, ein Gespräch mit Fremden sei unangenehmer als Alleinsein. Wer es tatsächlich tat, erlebte die Fahrt jedoch als angenehmer " + KS.cite("[[epley2014]]") + '. Ähnlich bei Dankbarkeit: Wer sich bedankt, unterschätzt, wie sehr sich die andere Person freut ' + KS.cite("[[kumar2018]]") + '. <span class="faint">Balken schematisch, keine Originalwerte.</span>';
      };
    }
  };

  /* B12 · Lebensrad */
  X[12] = {
    title: "Dein Lebensrad", hint: "Bewerte jeden Bereich von 0 bis 10",
    mount(el) {
      const D = ["Gesundheit", "Partnerschaft", "Familie", "Freundschaft", "Arbeit & Lernen", "Freizeit", "Finanzen", "Sinn & Werte"];
      const W = KS.obj("wheel"); W.cur = W.cur || D.map(() => 5);
      const prev = (W.hist || [])[0];
      el.innerHTML = '<div class="xp-wheel"><svg viewBox="0 0 320 320" class="xp-svg" style="max-width:340px;margin:0 auto" role="img" aria-label="Lebensrad"><g data-g></g></svg><div class="stack" style="gap:6px" data-sl>' + D.map((d, i) => '<label class="xp-sl"><span>' + d + '</span><input type="range" min="0" max="10" value="' + W.cur[i] + '" data-i="' + i + '"><b class="num" data-v="' + i + '">' + W.cur[i] + "</b></label>").join("") + '</div></div><div class="row"><button type="button" class="btn small chunky" data-save>Momentaufnahme speichern</button>' + (prev ? '<span class="faint" style="font-size:.85rem">Gestrichelt: Aufnahme vom ' + KS.fmtD(prev.d) + "</span>" : "") + '</div><div class="xp-out" data-out></div>';
      const cx = 160, cy = 160, R = 120;
      const pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / D.length; return [cx + Math.cos(a) * R * v / 10, cy + Math.sin(a) * R * v / 10]; };
      const poly = (vals) => vals.map((v, i) => pt(i, v).map((n) => n.toFixed(1)).join(",")).join(" ");
      const draw = () => {
        let s = ""; [2, 4, 6, 8, 10].forEach((r) => (s += '<polygon points="' + poly(D.map(() => r)) + '" fill="none" stroke="var(--line)"/>'));
        D.forEach((d, i) => { const [x, y] = pt(i, 10); const [lx, ly] = pt(i, 12.3); s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="var(--line)"/><text x="' + lx + '" y="' + (ly + 4) + '" text-anchor="middle" class="xp-ax" style="font-size:10px">' + d.split(" ")[0] + "</text>"; });
        if (prev) s += '<polygon points="' + poly(prev.v) + '" fill="none" stroke="var(--ink-faint)" stroke-width="2" stroke-dasharray="5 4"/>';
        s += '<polygon points="' + poly(W.cur) + '" fill="var(--accent)" fill-opacity=".25" stroke="var(--accent)" stroke-width="3" stroke-linejoin="round"/>';
        W.cur.forEach((v, i) => { const [x, y] = pt(i, v); s += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="var(--glow)" stroke="var(--surface)" stroke-width="2"/>'; });
        el.querySelector("[data-g]").innerHTML = s;
        const lo = W.cur.map((v, i) => [v, D[i]]).sort((a, b) => a[0] - b[0])[0];
        el.querySelector("[data-out]").innerHTML = "Ein rundes Rad rollt besser. Am niedrigsten bewertet: <b>" + lo[1] + "</b>. Welcher kleine Schritt würde diesen Bereich um einen Punkt verbessern? Verbinde ihn mit einem deiner Werte.";
      };
      el.querySelectorAll("[data-i]").forEach((r) => (r.oninput = () => { W.cur[r.dataset.i] = Number(r.value); el.querySelector('[data-v="' + r.dataset.i + '"]').textContent = r.value; draw(); }));
      el.querySelectorAll("[data-i]").forEach((r) => (r.onchange = () => KS.save()));
      el.querySelector("[data-save]").onclick = () => { W.hist = W.hist || []; W.hist.unshift({ d: KS.today(), v: W.cur.slice() }); KS.save(); KS.toast("Momentaufnahme gespeichert"); };
      draw();
    }
  };

  KS.mountExplorable2 = function (el, n) {
    const x = X[n]; if (!x) return false;
    el.innerHTML = '<div class="xp"><div class="xp-h"><span class="xp-badge">Interaktiv</span><h4>' + esc(x.title) + '</h4><span class="faint" style="font-size:.85rem">' + esc(x.hint) + '</span></div><div class="xp-body"></div></div>';
    try { x.mount(el.querySelector(".xp-body")); } catch (e) { console.error(e); }
    return true;
  };
})();
