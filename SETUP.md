# Klarsinn online stellen: Schritt für Schritt

Diese Anleitung bringt Klarsinn als eigene, kostenlose Website mit eigener Domain, Google-Login und Unterstützungsmöglichkeiten ins Netz. Zeitaufwand: etwa 1 bis 2 Stunden.

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

Danach erscheint oben rechts „Anmelden“. Die Anmeldung ist optional (`requireLogin: false` in `js/config.js`); mit `true` muss man sich vor dem Start anmelden. Mit Konto liegen Fortschritt und Zertifikat im Konto und sind auf allen Geräten verfügbar.

## 4. Freiwillige Unterstützung einrichten (15 Minuten)

Klarsinn ist kostenlos. Unter „Unterstützen“ können Menschen freiwillig etwas beitragen. Alle Wege werden oben in `js/support.js` bei `KS.SUPPORT` eingetragen; leere Felder werden nicht angezeigt.

| Weg | Einrichtung | Eintrag in `js/support.js` |
|---|---|---|
| PayPal | Auf <https://www.paypal.com/paypalme> einen PayPal.me-Link anlegen | `paypal: "https://paypal.me/deinname"` (Beträge 5/10/25/50 € werden automatisch angehängt) |
| Karte, Apple Pay, Google Pay | Stripe-Konto, dann **Payment Link** mit Option „Kunden wählen den Betrag“ | `stripe: "https://buy.stripe.com/…"` |
| Ko-fi | Profil auf <https://ko-fi.com> | `kofi: "https://ko-fi.com/deinname"` |
| Monatlich | z. B. Steady, Patreon oder Stripe-Abo-Link | `monthly: "https://…"` |
| Überweisung | Kontodaten | `bank: { owner, iban, bic, reference }` |

**Wichtig zum Wort „Spende“:** Steuerlich absetzbare Spenden (mit Zuwendungsbestätigung) kann nur ein gemeinnütziger Träger annehmen, z. B. ein eingetragener Verein oder eine gGmbH. Als Privatperson oder Unternehmen sind die Beiträge freiwillige Schenkungen, und Einnahmen können einkommen- bzw. umsatzsteuerlich relevant sein. Die Seite verwendet deshalb „Unterstützen“ und „freiwilliger Beitrag“. Bitte steuerlich beraten lassen; bei größerem Aufkommen lohnt sich die Gründung eines gemeinnützigen Vereins.

## 5. Rechtliches vor dem Start

- `impressum.html`, `datenschutz.html`, `nutzungsbedingungen.html`: gelb markierte Platzhalter ausfüllen und rechtlich prüfen lassen.
- Werbeaussagen auf Heilversprechen prüfen (Heilmittelwerbegesetz). Klarsinn ist als Selbsthilfe- und Bildungsangebot formuliert.
- Die Inhalte (Zahlen in Lektionen) fachlich gegenlesen lassen.
- Name für die Unterschrift im Zertifikat: `js/support.js` → `issuer`.

## Was die Technik leistet

- Ohne Firebase läuft alles im Browser (localStorage). Mit Firebase werden Fortschritt und Zertifikat im Konto gespeichert und synchronisiert; die Sicherheitsregeln sorgen dafür, dass jede Person nur ihre eigenen Daten sieht.
- Da alles kostenlos ist, braucht es keinen Bezahlschutz und keine Server-Funktionen. Die Kosten bleiben minimal (Domain; Firebase im kostenlosen Spark-Tarif reicht für viele tausend Nutzerinnen und Nutzer).
