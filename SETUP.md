# Klarsinn online stellen: Schritt für Schritt

Diese Anleitung bringt Klarsinn als eigene Website mit eigener Domain, Google-Login und bezahltem Zugang ins Netz. Zeitaufwand: etwa 1 bis 2 Stunden.

---

## 1. Website auf GitHub Pages veröffentlichen (10 Minuten)

1. Auf GitHub ein Repository `klarsinn` anlegen (öffentlich; für private Repositories braucht GitHub Pages ein kostenpflichtiges Konto).
2. Den Inhalt dieses Ordners ins Hauptverzeichnis des Repositorys legen (`index.html` liegt dann ganz oben).
3. Im Repository: **Settings → Pages → Build and deployment → Source: „Deploy from a branch“ → Branch: `main` / Ordner `/ (root)` → Save**.
4. Nach 1 bis 2 Minuten ist die Seite erreichbar unter `https://<github-name>.github.io/klarsinn/`.

## 2. Eigene Domain verbinden (15 Minuten + Wartezeit)

Beispiel: `www.klarsinn.de` (Domain bei einem Anbieter wie IONOS, Strato, Namecheap oder Cloudflare kaufen).

1. Die Datei `CNAME.example` in `CNAME` umbenennen und als einzige Zeile die Domain eintragen, z. B. `www.klarsinn.de`.
2. Beim Domain-Anbieter in den DNS-Einstellungen eintragen:

   | Typ | Name | Wert |
   |---|---|---|
   | CNAME | `www` | `<github-name>.github.io` |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |

3. In GitHub: **Settings → Pages → Custom domain** die Domain eintragen, speichern, danach **Enforce HTTPS** anhaken (sobald verfügbar, kann bis zu 24 Stunden dauern).
4. Empfohlen: unter **GitHub → Settings (Profil) → Pages → Add a domain** die Domain verifizieren, damit niemand anderes sie übernehmen kann.

## 3. Google-Login einrichten (Firebase, 20 Minuten)

1. Auf <https://console.firebase.google.com> ein Projekt anlegen, z. B. „klarsinn“ (Google Analytics nicht nötig).
2. **Build → Authentication → Get started → Sign-in method → Google → aktivieren**, Support-E-Mail wählen, speichern.
3. **Authentication → Settings → Authorized domains**: die eigene Domain (`www.klarsinn.de`, `klarsinn.de`) und `<github-name>.github.io` hinzufügen.
4. **Build → Firestore Database → Create database → Production mode → Standort `europe-west3 (Frankfurt)`**.
5. **Firestore → Rules**: den Inhalt der Datei `firestore.rules` einfügen und **Publish**.
6. **Projekteinstellungen (Zahnrad) → Allgemein → Meine Apps → Web-App hinzufügen (</>)**. Die angezeigten Werte `apiKey`, `authDomain`, `projectId`, `appId` in `js/config.js` bei `firebase:` eintragen.
7. Optional: unter **Authentication → Settings → User actions** die Kontolöschung durch Nutzer zulassen.

Danach erscheint oben rechts „Anmelden“. Mit `requireLogin: true` in `js/config.js` muss man sich vor dem Start anmelden. Fortschritt, Zertifikat und Zugang liegen dann im Konto und sind auf allen Geräten verfügbar.

**Gutscheine:** Neue Codes in `firestore.rules` (Liste `['JESUS']`) und in `js/shop.js` (Prüfsumme) ergänzen. Die Prüfung im Konto geschieht serverseitig durch die Sicherheitsregeln.

## 4. Zahlungen mit Stripe (30 Minuten)

1. Konto bei <https://stripe.com> anlegen und verifizieren.
2. **Produktkatalog**: drei Produkte anlegen
   - Klarsinn 12 Wochen: 1.000 € einmalig
   - Klarsinn 6 Monate: 150 € monatlich, nach 6 Zahlungen beenden (Abo mit Endtermin oder Ratenzahlung)
   - Klarsinn 12 Monate: 70 € monatlich, nach 12 Zahlungen beenden
3. Für jedes Produkt einen **Payment Link** erstellen. Unter „Nach der Zahlung“ die Weiterleitung auf `https://www.klarsinn.de/#start` setzen.
4. Die drei Links in `js/shop.js` bei `paymentLinks` eintragen (`w12`, `m6`, `m12`).
5. Automatische Freischaltung: Firebase auf den Tarif **Blaze** umstellen (Abrechnung nach Nutzung, für kleine Projekte meist wenige Cent), dann im Ordner `functions`:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use <projekt-id>
   firebase functions:secrets:set STRIPE_SECRET_KEY        # sk_live_…
   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET    # whsec_…
   firebase deploy --only functions
   ```
6. In Stripe **Entwickler → Webhooks → Endpunkt hinzufügen**: die URL der Funktion `stripeWebhook` (wird beim Deploy angezeigt), Ereignis `checkout.session.completed`. Das Signing Secret als `STRIPE_WEBHOOK_SECRET` hinterlegen.

Die Seite hängt beim Klick auf „Zahlungspflichtig bestellen“ automatisch die Nutzerkennung an den Link an. Nach der Zahlung schaltet der Webhook den Zugang im Konto frei.

## 5. Rechtliches vor dem Start

- `impressum.html`, `datenschutz.html`, `agb.html`: gelb markierte Platzhalter ausfüllen und rechtlich prüfen lassen.
- Werbeaussagen auf Heilversprechen prüfen (Heilmittelwerbegesetz). Klarsinn ist als Selbsthilfe- und Bildungsangebot formuliert.
- Die Inhalte (Zahlen in Lektionen) fachlich gegenlesen lassen.
- Name für die Unterschrift im Zertifikat: `js/shop.js` → `issuer`.

## Was die Technik leistet und was nicht

- Ohne Firebase läuft alles im Browser (localStorage); die Freischaltung lässt sich dann technisch umgehen.
- Mit Firebase sind Konto, Zugang und Fortschritt serverseitig gesichert. Die Lerninhalte selbst liegen als öffentliche Dateien auf GitHub Pages und sind für Technikkundige grundsätzlich abrufbar. Für vollständigen Schutz der Inhalte bräuchte es Hosting mit serverseitiger Zugriffskontrolle (z. B. Firebase Hosting + Cloud Functions oder eine Kursplattform).
