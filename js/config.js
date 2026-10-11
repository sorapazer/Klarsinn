/* =====================================================================
   Klarsinn – Konfiguration
   Nach der Einrichtung von Firebase (siehe SETUP.md) hier die Werte
   aus „Projekteinstellungen → Allgemein → Meine Apps → SDK-Konfiguration“
   eintragen. Solange firebase auf null steht, läuft die Seite ohne Login
   und speichert alles nur im Browser.
   ===================================================================== */
window.KS_CONFIG = {
  firebase: null,
  /* Beispiel:
  firebase: {
    apiKey: "AIza...",
    authDomain: "klarsinn-xyz.firebaseapp.com",
    projectId: "klarsinn-xyz",
    appId: "1:123456789:web:abcdef"
  },
  */
  requireLogin: false,  // true: Programmstart nur mit Google-Konto; false: Login optional (Fortschritt sonst nur im Browser)
  firebaseVersion: "10.12.2"
};
