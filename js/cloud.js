/* Klarsinn – Google-Login und Synchronisierung über Firebase (Auth + Firestore) */
(function () {
  const KS = window.KS, esc = KS.esc, C = window.KS_CONFIG || {};
  const cloud = (KS.cloud = { enabled: !!(C.firebase && C.firebase.apiKey), ready: false, user: null });
  const G = '<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  KS.googleIcon = G;

  /* Kopfzeilen-Button */
  function renderButton() {
    const host = document.getElementById("account"); if (!host) return;
    if (!cloud.enabled) { host.innerHTML = ""; return; }
    if (!cloud.ready) { host.innerHTML = '<span class="acc-btn faint">…</span>'; return; }
    if (!cloud.user) { host.innerHTML = '<button type="button" class="acc-btn" data-login>' + G + "<span>Anmelden</span></button>"; return; }
    const u = cloud.user;
    host.innerHTML = '<details class="acc-menu"><summary class="acc-btn" aria-label="Konto">' + (u.photo ? '<img src="' + esc(u.photo) + '" alt="" referrerpolicy="no-referrer">' : '<span class="acc-ini">' + esc((u.name || u.email || "?").charAt(0)) + "</span>") + '</summary><div class="acc-pop"><b>' + esc(u.name || "") + '</b><span class="faint">' + esc(u.email || "") + '</span><span class="chip ' + (cloud.syncOk ? "ok" : "") + '" data-syncst>' + (cloud.syncOk ? "Synchronisiert" : "Synchronisiere …") + '</span><a href="#daten">Meine Daten</a><button type="button" class="btn small ghost" data-logout>Abmelden</button></div></details>';
  }
  KS.renderAccount = renderButton;

  if (!cloud.enabled) { document.addEventListener("DOMContentLoaded", renderButton); return; }

  /* Firebase laden */
  const v = C.firebaseVersion || "10.12.2";
  const load = (src) => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  let auth, db, pushT = null, applying = false;

  const _save = KS.save;
  KS.save = function () {
    KS.data._ts = Date.now();
    _save();
    if (cloud.user && !applying) { clearTimeout(pushT); pushT = setTimeout(push, 2000); setSync(false); }
  };
  function setSync(ok) { cloud.syncOk = ok; const el = document.querySelector("[data-syncst]"); if (el) { el.textContent = ok ? "Synchronisiert" : "Synchronisiere …"; el.className = "chip " + (ok ? "ok" : ""); } }
  const ref = () => db.collection("users").doc(cloud.user.uid);

  async function push() {
    if (!cloud.user) return;
    try {
      await ref().set({ data: JSON.stringify(KS.data), updatedAt: firebase.firestore.FieldValue.serverTimestamp(), name: cloud.user.name || "", email: cloud.user.email || "" }, { merge: true });
      setSync(true);
    } catch (e) { console.error(e); KS.toast("Synchronisierung fehlgeschlagen. Deine Daten bleiben lokal gespeichert."); }
  }
  async function pull() {
    const snap = await ref().get(); const d = snap.exists ? snap.data() : null;
    let remote = null; try { remote = d && d.data ? JSON.parse(d.data) : null; } catch (e) { remote = null; }
    const local = KS.data;
    const localHas = !!(local.profile && local.profile.start), remoteHas = !!(remote && remote.profile && remote.profile.start);
    applying = true;
    if (remote && (!localHas || (remoteHas && (remote._ts || 0) > (local._ts || 0)))) KS.replaceData(remote);
    const p = KS.obj("profile");
    if (d && d.license) p.license = Object.assign({ name: d.license.source === "voucher" ? "Freischaltung per Gutschein" : "Gekauft" }, d.license, { cloud: true });
    else if (p.license && p.license.cloud) delete p.license;
    if (!p.name && cloud.user.name) p.name = cloud.user.name.split(" ")[0];
    KS.save(); applying = false;
    await push();
  }
  cloud.redeem = async function (code, variant) {
    if (!cloud.user) return false;
    try {
      await ref().set({ license: { source: "voucher", code: String(code).trim().toUpperCase(), variant: variant, at: new Date().toISOString() } }, { merge: true });
      return true;
    } catch (e) { console.error(e); return false; }
  };
  cloud.login = async function () {
    try { await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); }
    catch (e) { if (e && e.code === "auth/popup-blocked") await auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); else if (e && e.code !== "auth/popup-closed-by-user") KS.toast("Anmeldung fehlgeschlagen: " + (e.message || e.code)); }
  };
  cloud.logout = async function () {
    clearTimeout(pushT); await push(); await auth.signOut();
    try { localStorage.removeItem("klarsinn.v1"); } catch (e) { /* */ }
    KS.data = {}; KS.toast("Abgemeldet"); location.hash = "#start"; KS.rerender && KS.rerender();
  };
  cloud.deleteAccountData = async function () { if (!cloud.user) return; await ref().delete(); };

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-login]")) { e.preventDefault(); cloud.login(); }
    if (e.target.closest("[data-logout]")) { e.preventDefault(); cloud.logout(); }
  });

  (async () => {
    try {
      await load("https://www.gstatic.com/firebasejs/" + v + "/firebase-app-compat.js");
      await load("https://www.gstatic.com/firebasejs/" + v + "/firebase-auth-compat.js");
      await load("https://www.gstatic.com/firebasejs/" + v + "/firebase-firestore-compat.js");
      firebase.initializeApp(C.firebase); auth = firebase.auth(); db = firebase.firestore();
      auth.onAuthStateChanged(async (u) => {
        cloud.user = u ? { uid: u.uid, name: u.displayName, email: u.email, photo: u.photoURL } : null;
        cloud.ready = true; renderButton();
        if (u) { try { await pull(); } catch (e) { console.error(e); KS.toast("Konto konnte nicht geladen werden."); } KS.toast("Angemeldet als " + (u.displayName || u.email)); }
        KS.rerender && KS.rerender(); renderButton();
      });
    } catch (e) { console.error(e); cloud.enabled = false; cloud.ready = true; renderButton(); }
  })();
})();
