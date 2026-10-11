/* Klarsinn – Stripe-Webhook: schaltet nach erfolgreicher Zahlung den Zugang im Konto frei.
   Einrichtung: siehe SETUP.md, Abschnitt „Zahlungen mit Stripe“. */
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
admin.initializeApp();

const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");

exports.stripeWebhook = onRequest({ region: "europe-west3", secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET] }, async (req, res) => {
  const stripe = require("stripe")(STRIPE_SECRET_KEY.value());
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, req.headers["stripe-signature"], STRIPE_WEBHOOK_SECRET.value());
  } catch (err) {
    res.status(400).send("Ungültige Signatur");
    return;
  }
  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const [uid, variant] = String(s.client_reference_id || "").split("__");
    if (uid) {
      await admin.firestore().collection("users").doc(uid).set({
        license: { source: "stripe", variant: variant || null, session: s.id, amount: s.amount_total, currency: s.currency, at: new Date().toISOString() }
      }, { merge: true });
    }
  }
  res.json({ received: true });
});
