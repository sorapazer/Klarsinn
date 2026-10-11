/* Klarsinn – Inhalte Wochen 1–4 (Phase 1 Fundament, Beginn Phase 2 Lebensstil) */
window.KS_WEEKS = window.KS_WEEKS || [];

/* ===================================================================== */
/* WOCHE 1 – ANKOMMEN                                                     */
/* ===================================================================== */
window.KS_WEEKS.push({
  n: 1,
  title: "Ankommen",
  subtitle: "Was mentale Gesundheit wirklich ist und wie Veränderung gelingt",
  phase: 1,
  minutes: "15–20 Min. pro Tag",
  lead: "Schön, dass du da bist. In dieser ersten Woche geht es nicht darum, etwas zu leisten, sondern darum, anzukommen und einen klaren Blick zu gewinnen: Was bedeutet mentale Gesundheit eigentlich, woher kommen Belastungen, und wie entstehen Veränderungen, die bleiben? Du legst heute das Fundament für die nächsten zwölf Wochen.",
  goals: [
    "Du verstehst mentale Gesundheit als eigenständige Dimension und nicht nur als Abwesenheit von Krankheit.",
    "Du kannst mit dem biopsychosozialen Modell und dem Vulnerabilitäts-Stress-Modell erklären, wie Belastungen entstehen.",
    "Du weißt, wie Gewohnheiten entstehen und wie Wenn-dann-Pläne dir helfen, dranzubleiben.",
    "Du erfasst deinen Ausgangspunkt mit dem WHO-5 und beginnst eine tägliche Selbstbeobachtung."
  ],
  input: [
    {
      h: "Mentale Gesundheit: mehr als „nicht krank“",
      body: "<p>Die Weltgesundheitsorganisation beschreibt mentale Gesundheit als einen Zustand des Wohlbefindens, in dem Menschen mit den normalen Belastungen des Lebens umgehen, ihre Fähigkeiten entfalten, gut lernen und arbeiten und etwas zu ihrer Gemeinschaft beitragen können [[who2022]]. Diese Definition ist bemerkenswert, weil sie positiv formuliert ist. Sie fragt nicht zuerst, was fehlt, sondern was gelingt.</p><p>Die WHO betont außerdem, dass mentale Gesundheit kein fester Zustand ist, den man hat oder nicht hat. Sie bewegt sich auf einem Kontinuum und verändert sich im Lauf des Lebens, je nach Lebensumständen, Beziehungen, körperlicher Gesundheit und gesellschaftlichen Bedingungen [[who2022]]. Wer heute gut zurechtkommt, kann in einer belastenden Phase in Schwierigkeiten geraten. Und wer gerade kämpft, kann wieder in ruhigeres Fahrwasser kommen.</p><p>Für dich heißt das zweierlei. Erstens: Mentale Gesundheit betrifft alle Menschen, nicht nur diejenigen mit einer Diagnose. So wie du auf deinen Körper achtest, auch wenn du nicht krank bist, kannst du auch deine psychische Verfassung pflegen. Zweitens: Wohlbefinden ist beeinflussbar. Ein Teil davon liegt außerhalb deiner Kontrolle, etwa Veranlagung, Arbeitsbedingungen oder Verluste. Ein anderer Teil hängt mit Dingen zusammen, die du Schritt für Schritt gestalten kannst: Schlaf, Bewegung, der Umgang mit Stress und Gedanken, Beziehungen und das, was dir wichtig ist.</p><p>Genau hier setzt Klarsinn an. Das Programm vermittelt Wissen über psychische Gesundheit, sogenannte Gesundheitskompetenz. Diese Kompetenz umfasst, Belastungen früh zu erkennen, zu wissen, was hilft, und zu wissen, wann und wo man Unterstützung findet [[jorm2012]].</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Gesundheitskompetenz für psychische Gesundheit („mental health literacy“) umfasst Wissen über Vorbeugung, das Erkennen von Belastungen, Hilfsangebote und wirksame Selbsthilfe. Sie gilt als Voraussetzung dafür, dass Menschen früh und angemessen handeln [[jorm2012]]." }
    },
    {
      h: "Zwei Achsen statt einer: das Zwei-Kontinua-Modell",
      body: "<p>Oft wird psychische Gesundheit als eine einzige Linie gedacht: links „krank“, rechts „gesund“. Der Soziologe und Psychologe Corey Keyes hat gezeigt, dass dieses Bild zu einfach ist [[keyes2002]]. In seinem <strong>Zwei-Kontinua-Modell</strong> sind psychische Erkrankung und psychisches Wohlbefinden zwei verwandte, aber unterscheidbare Dimensionen.</p><p>Auf der einen Achse steht das Ausmaß psychischer Symptome, auf der anderen das Ausmaß an Wohlbefinden. Keyes unterscheidet beim Wohlbefinden zwischen <em>Aufblühen</em> (flourishing) und <em>Dahinkümmern</em> (languishing). Wer aufblüht, erlebt häufig positive Gefühle, Lebenszufriedenheit, Sinn, Wachstum und gute Beziehungen. Wer dahinkümmert, hat vielleicht keine Diagnose, fühlt sich aber leer, antriebslos und wenig verbunden.</p><p>Daraus ergeben sich vier Kombinationen:</p><ul><li>wenig Symptome und hohes Wohlbefinden: vollständige psychische Gesundheit</li><li>wenig Symptome, aber geringes Wohlbefinden: „nicht krank, aber auch nicht gut“</li><li>deutliche Symptome bei zugleich vorhandenen Kraftquellen</li><li>deutliche Symptome und geringes Wohlbefinden</li></ul><p>Das Modell hat praktische Folgen. Wenn Symptome abklingen, stellt sich Wohlbefinden nicht automatisch ein. Es braucht eigene Pflege. Umgekehrt kannst du auch in einer schwierigen Phase an deinem Wohlbefinden arbeiten: an Verbundenheit, an kleinen Momenten von Freude, an dem, was dir Sinn gibt. Klarsinn arbeitet deshalb an beiden Achsen. Wir lindern Belastung und stärken gleichzeitig das, was dich trägt.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "In einer US-Stichprobe Erwachsener (MIDUS) erfüllten nur etwa 17 % die Kriterien für „Aufblühen“. Wer dahinkümmerte, hatte deutlich mehr Fehltage und Einschränkungen als aufblühende Menschen [[keyes2002]]. Faktorenanalysen bestätigten, dass psychische Erkrankung und psychische Gesundheit zwei korrelierte, aber getrennte Faktoren bilden [[keyes2005]]." }
    },
    {
      h: "Woher Belastungen kommen: biopsychosozial gedacht",
      body: "<p>Warum geraten manche Menschen in einer schwierigen Phase aus dem Gleichgewicht und andere nicht? Zwei Modelle helfen beim Verstehen.</p><p>Das <strong>biopsychosoziale Modell</strong> des Mediziners George Engel geht davon aus, dass Gesundheit und Krankheit immer aus dem Zusammenspiel mehrerer Ebenen entstehen [[engel1977]]. Zur biologischen Ebene gehören etwa Gene, Hormone, Schlaf und körperliche Erkrankungen. Zur psychologischen Ebene gehören Denkmuster, Gefühle, Lernerfahrungen und Bewältigungsstrategien. Zur sozialen Ebene gehören Beziehungen, Arbeit, Geld, Wohnsituation und Diskriminierung. Keine Ebene erklärt allein, was passiert. Ein Beispiel: Anhaltender Druck im Job (sozial) führt zu Grübeln (psychologisch), das den Schlaf stört (biologisch), was wiederum die Stimmung und die Belastbarkeit senkt.</p><p>Das <strong>Vulnerabilitäts-Stress-Modell</strong> von Zubin und Spring ergänzt diesen Blick [[zubin1977]]. Jeder Mensch bringt eine individuelle Verletzlichkeit mit, geprägt durch Veranlagung und frühere Erfahrungen. Ob daraus eine psychische Erkrankung entsteht, hängt davon ab, wie viel Belastung hinzukommt und welche Schutzfaktoren vorhanden sind. Man kann sich das wie ein Fass vorstellen: Bei manchen ist es schon gut gefüllt, bei anderen kaum. Wenn genug Belastung hinzukommt, läuft es über.</p><p>Beide Modelle entlasten. Psychische Probleme sind keine Charakterschwäche, sondern das Ergebnis vieler Faktoren. Und sie zeigen Ansatzpunkte: du kannst Belastungen verringern, Schutzfaktoren stärken und an mehreren Ebenen gleichzeitig ansetzen. Kleine Veränderungen auf einer Ebene wirken oft auf die anderen zurück.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Engel formulierte das biopsychosoziale Modell 1977 in „Science“ als Gegenentwurf zu einem rein biomedizinischen Krankheitsverständnis [[engel1977]]. Zubin und Spring beschrieben im selben Jahr Vulnerabilität als relativ stabiles Merkmal, während Belastungsepisoden zeitlich begrenzt sind [[zubin1977]]." }
    },
    {
      h: "Du bist nicht allein: Zahlen aus Deutschland",
      body: "<p>Psychische Belastungen sind keine Randerscheinung. Die große Studie zur Gesundheit Erwachsener in Deutschland mit ihrem Zusatzmodul Psychische Gesundheit (DEGS1-MH) hat Erwachsene im Alter von 18 bis 79 Jahren mit standardisierten klinischen Interviews untersucht [[jacobi2014]]. Das Ergebnis: Innerhalb eines Jahres erfüllt mehr als jeder vierte Erwachsene die Kriterien für mindestens eine psychische Störung. Am häufigsten sind Angststörungen, gefolgt von Depressionen und Störungen durch Alkohol- oder Medikamentengebrauch.</p><p>Diese Zahlen bedeuten nicht, dass jeder vierte Mensch schwer krank ist. Sie umfassen auch leichtere und vorübergehende Verläufe. Aber sie zeigen deutlich: Psychische Belastungen gehören zum menschlichen Leben. Wahrscheinlich kennst du in deiner Familie, deinem Freundeskreis oder deinem Team Menschen, die schon einmal betroffen waren, auch wenn darüber selten gesprochen wird.</p><p>Die Studie zeigte auch, dass nur ein Teil der Betroffenen professionelle Hilfe in Anspruch nimmt [[jacobi2014]]. Gründe sind unter anderem Scham, fehlendes Wissen über Hilfsangebote und lange Wartezeiten. Weltweit beschreibt die WHO eine große Versorgungslücke zwischen Bedarf und tatsächlicher Behandlung [[who2022]].</p><p>Für dich kann diese Erkenntnis zweierlei bedeuten. Wenn es dir gerade schlecht geht, bist du in guter Gesellschaft und nicht „falsch“. Und es lohnt sich, früh hinzuschauen. Je früher Belastungen erkannt werden, desto mehr Möglichkeiten gibt es, gegenzusteuern.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "In DEGS1-MH lag die 12-Monats-Prävalenz psychischer Störungen bei Erwachsenen in Deutschland bei 27,7 %. Angststörungen waren die häufigste Gruppe, unipolare Depressionen die zweithäufigste [[jacobi2014]]." }
    },
    {
      h: "Warum Selbsthilfe wirkt und wo ihre Grenzen liegen",
      body: "<p>Kann ein Programm wie dieses überhaupt etwas bewirken? Die Forschung gibt eine ermutigende Antwort. Strukturierte Selbsthilfe auf Grundlage der kognitiven Verhaltenstherapie kann Beschwerden wie depressive Verstimmung und Ängste messbar lindern [[cuijpers2010]] [[karyotaki2021]]. Wirksam ist sie vor allem dann, wenn sie regelmäßig genutzt wird, konkrete Übungen enthält und Wissen mit praktischem Handeln verbindet.</p><p>Ein zentraler Wirkmechanismus ist die <strong>Selbstwirksamkeit</strong>: die Überzeugung, eine Situation durch eigenes Handeln beeinflussen zu können [[bandura1977]]. Sie wächst am stärksten durch eigene Erfolgserlebnisse. Deshalb enthält jede Woche kleine, machbare Aufgaben. Nicht die perfekte Umsetzung zählt, sondern die Erfahrung: „Ich kann etwas tun.“</p><p><strong>Wichtig:</strong> Klarsinn ersetzt keine Psychotherapie, keine ärztliche Behandlung und keine Diagnostik. Bitte hole dir professionelle Unterstützung, wenn</p><ul><li>Deine Beschwerden länger als zwei Wochen anhalten oder sich verstärken,</li><li>Du deinen Alltag, deine Arbeit oder Beziehungen kaum noch bewältigst,</li><li>Du Alkohol, Medikamente oder andere Substanzen nutzt, um durchzuhalten,</li><li>Du Gedanken hast, nicht mehr leben zu wollen, oder dich selbst zu verletzen.</li></ul><p>Erste Anlaufstellen sind deine Hausarztpraxis, psychotherapeutische Sprechstunden oder die Terminservicestelle unter 116 117. Die TelefonSeelsorge ist rund um die Uhr unter 0800 111 0 111 oder 0800 111 0 222 erreichbar. In akuter Gefahr wähle bitte die 112. Hilfe zu suchen ist kein Scheitern, sondern ein Zeichen von Selbstfürsorge.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Eine Meta-Analyse direkter Vergleichsstudien fand keinen bedeutsamen Unterschied zwischen begleiteter Selbsthilfe und persönlicher Psychotherapie bei Depression und Angststörungen [[cuijpers2010]]. Eine Netzwerk-Meta-Analyse mit individuellen Patientendaten bestätigte die Wirksamkeit internetbasierter KVT bei Depression, wobei begleitete Formate im Mittel besser abschnitten als unbegleitete [[karyotaki2021]]." }
    },
    {
      h: "Wie Gewohnheiten entstehen und warum Wenn-dann-Pläne helfen",
      body: "<p>Viele gute Vorsätze scheitern nicht am Wollen, sondern am Alltag. Gewohnheiten sind feste Verknüpfungen zwischen einer Situation und einer Handlung [[wood2007]]. Sind sie einmal gebildet, laufen sie weitgehend automatisch ab, ohne dass du Dich jedes Mal neu entscheiden musst. Genau das macht sie so wertvoll.</p><p>Wie lange dauert es, bis eine neue Gewohnheit sitzt? Die oft genannten „21 Tage“ sind ein Mythos. In einer Studie von Phillippa Lally und Kolleginnen wählten die Teilnehmenden ein neues Verhalten, etwa ein Glas Wasser zum Mittagessen oder einen kurzen Spaziergang, und führten es täglich in derselben Situation aus [[lally2010]]. Bis zur Automatisierung vergingen im Median 66 Tage, mit einer Spanne von 18 bis 254 Tagen. Einfache Verhaltensweisen wurden schneller automatisch als anspruchsvolle. Ein einzelner ausgelassener Tag warf den Prozess nicht nennenswert zurück.</p><p>Ein besonders wirksames Werkzeug sind <strong>Wenn-dann-Pläne</strong>, in der Forschung „Implementation Intentions“ genannt [[gollwitzer2006]]. Statt „Ich will mehr entspannen“ formulierst du: „<em>Wenn</em> ich nach der Arbeit die Wohnungstür schließe, <em>dann</em> mache ich drei Minuten Atemübung.“ Der Wenn-Teil legt einen konkreten Auslöser fest, der Dann-Teil eine konkrete Handlung. Dadurch erkennt dein Gehirn die passende Gelegenheit leichter und startet die Handlung fast von selbst.</p><p>Hilfreich ist es zudem, mögliche Hindernisse vorher zu bedenken: „Wenn ich zu müde bin, dann mache ich nur eine Minute.“ Diese Verbindung aus Wunsch, Hindernis und Plan erhöht die Umsetzung zusätzlich [[oettingen2015]].</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Eine Meta-Analyse über 94 unabhängige Tests mit mehr als 8.000 Teilnehmenden fand für Wenn-dann-Pläne einen mittleren bis großen Effekt auf die Zielerreichung (d = 0,65) [[gollwitzer2006]]. In der Gewohnheitsstudie mit 96 Teilnehmenden dauerte die Automatisierung im Median 66 Tage (Spanne 18–254) [[lally2010]]." }
    }
  ],
  myth: {
    myth: "Eine neue Gewohnheit braucht 21 Tage, und wer einen Tag auslässt, muss von vorn anfangen.",
    fact: "Bis ein Verhalten automatisch abläuft, vergingen in einer Alltagsstudie im Median 66 Tage, je nach Person und Verhalten zwischen 18 und 254 Tagen. Ein einzelner verpasster Tag hatte keinen nennenswerten Einfluss auf den Verlauf [[lally2010]]. Dranbleiben ist wichtiger als Perfektion."
  },
  takeaways: [
    "Mentale Gesundheit ist ein Zustand des Wohlbefindens, nicht nur die Abwesenheit von Krankheit.",
    "Wohlbefinden und psychische Symptome sind zwei eigene Achsen. Beide lassen sich beeinflussen.",
    "Belastungen entstehen aus dem Zusammenspiel von Körper, Psyche und Lebensumständen. Sie sind keine Charakterschwäche.",
    "Strukturierte Selbsthilfe wirkt, ersetzt aber keine Therapie, wenn Beschwerden anhalten oder schwer sind.",
    "Gewohnheiten brauchen Zeit. Konkrete Wenn-dann-Pläne machen den Start deutlich leichter."
  ],
  practice: {
    title: "Standortbestimmung: Ankommen bei dir",
    duration: "10 Min.",
    intro: "Bevor du etwas veränderst, lohnt sich ein ehrlicher, freundlicher Blick auf den Ausgangspunkt. Diese Übung verbindet einen kurzen Moment der Ruhe mit einer bewussten Selbstbeobachtung.",
    steps: [
      "Setz dich bequem hin, stell beide Füße auf den Boden und lass deine Hände locker auf den Oberschenkeln ruhen. Wenn es sich gut anfühlt, schließ die Augen.",
      "Nimm drei ruhige Atemzüge. Atme durch die Nase ein und etwas länger durch den Mund wieder aus.",
      "Frag dich: Wie geht es meinem Körper gerade? Achte auf Anspannung, Müdigkeit, Wärme oder Unruhe, ohne etwas ändern zu wollen.",
      "Frag dich: Welche Gefühle sind da? Benenne sie mit einem Wort, zum Beispiel „angespannt“, „ruhig“ oder „traurig“.",
      "Frag dich: Was beschäftigt meine Gedanken in diesen Tagen am meisten? Notiere ein bis drei Stichworte.",
      "Überlege, was dir in den letzten Wochen Kraft gegeben hat, und sei es noch so klein. Schreib mindestens eine Sache auf.",
      "Formuliere einen Satz, warum du dieses Programm machst: „Ich möchte in zwölf Wochen …“",
      "Öffne die Augen, nimm den Raum wahr und fülle anschließend den WHO-5-Fragebogen aus. Er ist dein Ausgangswert, nicht dein Urteil."
    ]
  },
  tools: ["who5", "checkin", "ifthen"],
  toolIntro: "Mit dem WHO-5, einem gut validierten Kurzfragebogen [[topp2015]], hältst du Deinen Ausgangspunkt beim Wohlbefinden fest, den du später vergleichen kannst. Der tägliche Check-in macht Muster in Stimmung, Energie und Stress sichtbar, und im Wenn-dann-Planer formulierst du Deine ersten konkreten Vorsätze.",
  tasks: [
    { title: "WHO-5 ausfüllen", desc: "Fülle den WHO-5-Fragebogen einmal in Ruhe aus und notiere deinen Wert. Er dient als Vergleichspunkt für die Wochen 6 und 12.", freq: "einmalig" },
    { title: "Täglicher Check-in", desc: "Trage jeden Abend Stimmung, Energie und Stress ein und ergänze eine kurze Notiz, was den Tag geprägt hat. Dauer: etwa zwei Minuten.", freq: "täglich" },
    { title: "Fester Klarsinn-Termin", desc: "Lege eine feste Tageszeit für das Programm fest und trage sie in deinen Kalender ein, zum Beispiel direkt nach dem Abendessen.", freq: "einmalig" },
    { title: "Erster Wenn-dann-Plan", desc: "Formuliere im Wenn-dann-Planer einen Plan für deinen täglichen Check-in, etwa: „Wenn ich mir abends die Zähne geputzt habe, dann mache ich meinen Check-in.“", freq: "einmalig" },
    { title: "Hindernis-Plan", desc: "Überlege, was dich am ehesten vom Dranbleiben abhält, und formuliere einen zweiten Plan dafür: „Wenn …, dann mache ich die Kurzversion.“", freq: "einmalig" },
    { title: "Kraftquellen sammeln", desc: "Notiere jeden zweiten Tag eine Sache, die dir gutgetan hat. So stärkst du bewusst die Achse des Wohlbefindens.", freq: "3× diese Woche" },
    { title: "Hilfe-Kontakte notieren", desc: "Speichere dir die Nummern deiner Hausarztpraxis, der 116 117 und der TelefonSeelsorge im Handy ab, auch wenn du sie gerade nicht brauchst.", freq: "einmalig" }
  ],
  reflection: [
    "Wo würdest du Dich gerade auf den beiden Achsen einordnen: bei den Belastungen und beim Wohlbefinden?",
    "Welche biologischen, psychologischen und sozialen Faktoren beeinflussen dein Befinden im Moment am stärksten?",
    "Welche Gewohnheit hat sich in deinem Leben schon einmal erfolgreich gefestigt, und was hat dabei geholfen?",
    "Woran würdest du nach zwölf Wochen merken, dass sich etwas zum Guten verändert hat?"
  ],
  quiz: [
    {
      q: "Was besagt das Zwei-Kontinua-Modell von Keyes?",
      options: ["Psychische Gesundheit ist das Gegenteil von psychischer Krankheit auf einer einzigen Skala.", "Psychische Erkrankung und psychisches Wohlbefinden sind zwei verwandte, aber getrennte Dimensionen.", "Psychische Gesundheit ist ausschließlich genetisch festgelegt.", "Wohlbefinden stellt sich automatisch ein, sobald Symptome verschwinden."],
      correct: 1,
      explain: "Keyes zeigte, dass Symptome und Wohlbefinden zwei korrelierte, aber unterscheidbare Faktoren sind. Man kann ohne Diagnose dahinkümmern oder trotz Symptomen Kraftquellen haben [[keyes2002]] [[keyes2005]]."
    },
    {
      q: "Wie lange dauerte es in der Studie von Lally und Kolleginnen im Median, bis ein neues Verhalten automatisch ablief?",
      options: ["21 Tage", "66 Tage", "7 Tage", "1 Jahr"],
      correct: 1,
      explain: "Der Median lag bei 66 Tagen, mit großer Spanne von 18 bis 254 Tagen. Einzelne verpasste Tage warfen den Prozess nicht zurück [[lally2010]]."
    },
    {
      q: "Welcher Plan ist ein gut formulierter Wenn-dann-Plan?",
      options: ["„Ich will mich mehr bewegen.“", "„Ab sofort lebe ich gesünder.“", "„Wenn ich mittags vom Schreibtisch aufstehe, dann gehe ich zehn Minuten um den Block.“", "„Irgendwann diese Woche gehe ich spazieren.“"],
      correct: 2,
      explain: "Ein Wenn-dann-Plan verknüpft einen konkreten Auslöser mit einer konkreten Handlung. Solche Pläne verbessern die Zielerreichung im Mittel deutlich (d = 0,65) [[gollwitzer2006]]."
    },
    {
      q: "Was beschreibt das Vulnerabilitäts-Stress-Modell?",
      options: ["Nur Menschen mit schwachem Charakter erkranken psychisch.", "Psychische Erkrankungen entstehen, wenn Belastungen auf eine individuelle Verletzlichkeit treffen und Schutzfaktoren nicht ausreichen.", "Stress ist immer schädlich und muss vollständig vermieden werden.", "Psychische Erkrankungen sind rein sozial verursacht."],
      correct: 1,
      explain: "Zubin und Spring beschrieben, dass jeder Mensch eine eigene Verletzlichkeit mitbringt. Erst das Zusammenspiel mit Belastungen und fehlenden Schutzfaktoren führt zu einer Erkrankung [[zubin1977]]."
    }
  ],
  refs: ["who2022", "jorm2012", "keyes2002", "keyes2005", "engel1977", "zubin1977", "jacobi2014", "cuijpers2010", "karyotaki2021", "bandura1977", "wood2007", "lally2010", "gollwitzer2006", "oettingen2015", "topp2015"]
});

/* ===================================================================== */
/* WOCHE 2 – STRESS VERSTEHEN                                             */
/* ===================================================================== */
window.KS_WEEKS.push({
  n: 2,
  title: "Stress verstehen",
  subtitle: "Wie Belastung im Körper und im Kopf entsteht und was wirklich erholt",
  phase: 1,
  minutes: "15–20 Min. pro Tag",
  lead: "Stress hat einen schlechten Ruf, dabei ist er zunächst eine kluge Reaktion deines Körpers. Problematisch wird er, wenn er nicht mehr endet. Diese Woche lernst du, was bei Stress in dir passiert, warum dieselbe Situation Menschen ganz unterschiedlich belastet, und welche Formen von Erholung tatsächlich wirken.",
  goals: [
    "Du kannst die körperliche Stressreaktion mit Sympathikus, HPA-Achse und Cortisol erklären.",
    "Du verstehst, warum Bewertung und Bewältigung darüber entscheiden, wie stark Stress dich belastet.",
    "Du kennst die Merkmale von Burnout und die vier Wege der Erholung.",
    "Du erstellst eine persönliche Stress-Landkarte mit passenden Bewältigungswegen."
  ],
  input: [
    {
      h: "Was im Körper passiert: die Stressreaktion",
      body: "<p>Stell dir vor, du bekommst kurz vor Feierabend eine E-Mail: „Wir müssen reden. Morgen 8 Uhr.“ Innerhalb von Sekunden verändert sich etwas in dir. Das Herz schlägt schneller, die Atmung wird flacher, die Muskeln spannen sich an. Das ist die Stressreaktion, ein uraltes Programm, das dich auf Handeln vorbereitet.</p><p>Sie läuft auf zwei Wegen ab. Der <strong>schnelle Weg</strong> führt über den Sympathikus, den aktivierenden Teil des autonomen Nervensystems. Er sorgt dafür, dass das Nebennierenmark Adrenalin und Noradrenalin ausschüttet. Puls und Blutdruck steigen, Energie wird bereitgestellt, die Aufmerksamkeit verengt sich auf die mögliche Gefahr.</p><p>Der <strong>langsamere Weg</strong> ist die sogenannte HPA-Achse: Hypothalamus, Hypophyse und Nebennierenrinde. Am Ende dieser Kette steht das Hormon <strong>Cortisol</strong>. Es mobilisiert über Minuten bis Stunden Energiereserven, beeinflusst das Immunsystem und wirkt im Gehirn auf Gedächtnis und Aufmerksamkeit. Cortisol bremst über eine Rückkopplung die eigene Ausschüttung wieder, sodass sich das System normalerweise selbst beruhigt [[mcewen1998]].</p><p>Diese Reaktion ist nicht dein Feind. Sie hat Menschen über Jahrtausende geholfen, mit Gefahren fertig zu werden, und sie hilft dir heute bei Prüfungen, sportlichen Leistungen oder wenn du schnell reagieren musst. Schwierig wird es, wenn sie zu oft, zu lange oder unpassend anspringt. Dann wird aus einer hilfreichen Notfallreaktion eine Dauerbelastung. Das Ziel dieser Woche ist deshalb nicht, Stress abzuschaffen, sondern ihn zu verstehen und wieder ins Gleichgewicht zu bringen.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "McEwen beschreibt, dass dieselben Stressmediatoren wie Cortisol und Adrenalin kurzfristig schützen und anpassen, bei chronischer Aktivierung aber Herz-Kreislauf-System, Stoffwechsel, Immunsystem und Gehirn schädigen können [[mcewen1998]]." }
    },
    {
      h: "Allostase: wenn Anpassung zur Last wird",
      body: "<p>Der Neuroendokrinologe Bruce McEwen hat für die Anpassungsleistung des Körpers den Begriff <strong>Allostase</strong> geprägt: Stabilität durch Veränderung [[mcewen1998]]. Der Körper hält sein Gleichgewicht, indem er sich ständig an neue Anforderungen anpasst. Das ist gesund. Problematisch wird es, wenn diese Anpassungen sich anhäufen. Diese Abnutzung nennt McEwen <strong>allostatische Last</strong>.</p><p>Er beschreibt vier typische Muster, in denen sie entsteht:</p><ol><li><strong>Wiederholte Treffer:</strong> Viele Stressoren folgen dicht aufeinander, ohne Pause dazwischen.</li><li><strong>Fehlende Gewöhnung:</strong> Der Körper reagiert auf dieselbe Belastung immer wieder in voller Stärke, statt sich daran zu gewöhnen.</li><li><strong>Fehlendes Abschalten:</strong> Die Stressreaktion endet nicht, wenn die Belastung vorbei ist, etwa weil du gedanklich weiter bei der Sache bist.</li><li><strong>Unzureichende Reaktion:</strong> Ein System reagiert zu schwach, sodass andere Systeme überkompensieren.</li></ol><p>Besonders das dritte Muster ist im modernen Alltag verbreitet. Die eigentliche Belastung, etwa ein Konflikt, dauert vielleicht nur zehn Minuten. Doch das Grübeln darüber hält die Aktivierung am Abend und in der Nacht aufrecht. Der Körper unterscheidet kaum zwischen einer realen Bedrohung und einer, die du Dir lebhaft vorstellst.</p><p>Das ist eine wichtige Erkenntnis, denn sie zeigt einen Ansatzpunkt: Nicht jede Belastung lässt sich vermeiden. Aber du kannst beeinflussen, ob und wie schnell dein System danach wieder herunterfährt. Genau darum geht es in den folgenden Kapiteln zu Erholung und in der nächsten Woche zur Beruhigung des Körpers.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "In seinem Überblick im „New England Journal of Medicine“ beschreibt McEwen allostatische Last als kumulative Belastung durch chronische oder schlecht regulierte Stressreaktionen und unterscheidet vier Muster, darunter das ausbleibende Abschalten nach Ende der Belastung [[mcewen1998]]." }
    },
    {
      h: "Nicht die Situation, sondern die Bewertung",
      body: "<p>Warum bringt dieselbe Präsentation die eine Person um den Schlaf, während eine andere sie gelassen angeht? Das <strong>transaktionale Stressmodell</strong> von Richard Lazarus und Susan Folkman gibt eine Antwort: Stress entsteht aus der Wechselwirkung zwischen Situation und Person, genauer aus ihrer Bewertung [[lazarus1984]].</p><p>In der <strong>primären Bewertung</strong> fragst du Dich, oft blitzschnell und unbewusst: Ist das für mich relevant? Ist es harmlos, positiv oder stressreich? Wenn stressreich, dann als Schaden oder Verlust, als Bedrohung oder als Herausforderung. In der <strong>sekundären Bewertung</strong> fragst du: Was kann ich tun? Habe ich die nötigen Fähigkeiten, Zeit, Unterstützung? Stress entsteht vor allem dann, wenn die Anforderungen deine wahrgenommenen Möglichkeiten übersteigen.</p><p>Anschließend folgt die Bewältigung, das <strong>Coping</strong>. Lazarus und Folkman unterscheiden zwei Hauptformen:</p><ul><li><strong>Problemorientiertes Coping</strong> verändert die Situation selbst: planen, Informationen einholen, Aufgaben abgeben, Grenzen setzen, ein Gespräch führen.</li><li><strong>Emotionsorientiertes Coping</strong> verändert den Umgang mit den Gefühlen: sich beruhigen, Unterstützung suchen, die Lage neu bewerten, akzeptieren, was nicht zu ändern ist.</li></ul><p>Keine der beiden Formen ist grundsätzlich besser. Entscheidend ist die Passung. Bei veränderbaren Belastungen lohnt sich meist problemorientiertes Handeln. Bei nicht veränderbaren Belastungen, etwa einer Erkrankung oder einem Verlust, sind emotionsorientierte Wege oft hilfreicher. Diese Unterscheidung ist der Kern deiner Stress-Landkarte in dieser Woche.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Lazarus und Folkman definieren psychologischen Stress als eine Beziehung zwischen Person und Umwelt, die als die eigenen Ressourcen beanspruchend oder übersteigend bewertet wird. Coping verstehen sie als sich verändernde kognitive und behaviorale Anstrengungen, mit diesen Anforderungen umzugehen [[lazarus1984]]." }
    },
    {
      h: "Wie du über Stress denkst, verändert ihn",
      body: "<p>Ein gewisses Maß an Aktivierung ist hilfreich. Schon 1908 beobachteten Yerkes und Dodson, dass Lernleistung bei mittlerer Reizstärke am besten war und dass das günstige Maß von der Schwierigkeit der Aufgabe abhing [[yerkes1908]]. Daraus wurde später die populäre „umgekehrte U-Kurve“: Zu wenig Aktivierung macht träge, zu viel macht fahrig, dazwischen liegt ein Bereich guter Leistung. Das ist eine Vereinfachung, aber eine nützliche.</p><p>Neuere Forschung zeigt zudem: Wie du über Stress denkst, beeinflusst, wie er wirkt. Alia Crum und Kollegen unterscheiden zwischen zwei <strong>Stress-Mindsets</strong> [[crum2013]]. Wer Stress vor allem als schädlich sieht, versucht ihn zu vermeiden. Wer Stress auch als potenziell förderlich sieht, etwa als Zeichen, dass etwas wichtig ist, oder als Chance zu wachsen, geht anders damit um. In ihren Studien ließ sich dieses Mindset schon durch kurze Videos verändern, und ein förderliches Mindset ging mit weniger Beschwerden und besserer Arbeitsleistung einher.</p><p>Ähnliches zeigen Jeremy Jamieson und Kolleginnen [[jamieson2012]]. Personen, denen vor einer belastenden Aufgabe erklärt wurde, dass Herzklopfen und schnelle Atmung den Körper mit Energie versorgen, zeigten ein günstigeres Herz-Kreislauf-Muster und ließen sich weniger von bedrohlichen Reizen ablenken.</p><p>Für deinen Alltag bedeutet das: du musst dein Herzklopfen vor einem schwierigen Gespräch nicht wegdrücken. Du kannst dir sagen: „Mein Körper macht sich bereit. Das zeigt, dass mir die Sache wichtig ist.“ Das ersetzt nicht den Abbau von Überlastung, aber es verändert den Umgang mit unvermeidbaren Herausforderungen.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Ein experimentell vermitteltes „Stress-als-Chance“-Mindset ging bei Beschäftigten mit weniger gesundheitlichen Beschwerden und besserer Arbeitsleistung einher [[crum2013]]. Die Neubewertung körperlicher Erregung führte im Labor zu effizienterer Herz-Kreislauf-Reaktion und geringerer Aufmerksamkeitsverzerrung hin zu Bedrohung [[jamieson2012]]." }
    },
    {
      h: "Burnout: wenn die Reserven aufgebraucht sind",
      body: "<p>Wenn Belastungen lange anhalten und Erholung dauerhaft zu kurz kommt, kann ein Zustand entstehen, den Christina Maslach als <strong>Burnout</strong> beschrieben hat [[maslach2016]]. Er ist durch drei Dimensionen gekennzeichnet:</p><ul><li><strong>Erschöpfung:</strong> das Gefühl, emotional und körperlich ausgelaugt zu sein, auch nach freien Tagen.</li><li><strong>Zynismus und Distanzierung:</strong> innerer Rückzug von der Arbeit und den Menschen, mit denen man arbeitet, oft als Schutz vor Überforderung.</li><li><strong>Verringerte Leistungsfähigkeit:</strong> das Erleben, nichts mehr zu schaffen und wenig zu bewirken.</li></ul><p>Maslach und Leiter betonen, dass Burnout nicht in erster Linie ein individuelles Versagen ist, sondern aus einem Missverhältnis zwischen Person und Arbeitsumfeld entsteht. Sie nennen sechs Bereiche, in denen solche Passungsprobleme häufig auftreten: Arbeitsmenge, Kontrolle und Handlungsspielraum, Anerkennung, Gemeinschaft, Fairness und Werte [[maslach2016]]. Wer zu viel leisten muss, wenig Einfluss hat, kaum Wertschätzung erfährt, sich isoliert oder ungerecht behandelt fühlt oder etwas tun muss, das den eigenen Werten widerspricht, ist besonders gefährdet.</p><p>Wichtig ist auch die Abgrenzung. Burnout ist in der internationalen Klassifikation keine eigenständige psychische Erkrankung, sondern ein arbeitsbezogenes Phänomen. Die Erschöpfung kann sich aber mit einer Depression überschneiden oder in eine übergehen. Wenn du Dich über Wochen leer, hoffnungslos und freudlos fühlst, auch außerhalb der Arbeit, lass das bitte ärztlich oder psychotherapeutisch abklären. Das schützt dich davor, eine behandelbare Depression zu übersehen.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Maslach und Leiter fassen Jahrzehnte der Burnout-Forschung zusammen: Burnout umfasst Erschöpfung, Zynismus und Ineffektivität und hängt eng mit Passungsproblemen in sechs Bereichen des Arbeitslebens zusammen. Wirksame Ansätze setzen deshalb sowohl bei der Person als auch bei den Arbeitsbedingungen an [[maslach2016]]." }
    },
    {
      h: "Erholung und Resilienz: die „gewöhnliche Magie“",
      body: "<p>Erholung ist mehr als Nichtstun. Die Arbeitspsychologin Sabine Sonnentag und Charlotte Fritz haben vier <strong>Erholungserfahrungen</strong> beschrieben, die nachweislich mit Wohlbefinden zusammenhängen [[sonnentag2007]]:</p><ol><li><strong>Gedankliches Abschalten:</strong> in der freien Zeit nicht an Arbeit oder Pflichten denken.</li><li><strong>Entspannung:</strong> Aktivitäten mit niedriger Aktivierung, etwa ein ruhiger Spaziergang, Musik oder ein Bad.</li><li><strong>Mastery-Erlebnisse:</strong> etwas Neues lernen oder sich herausfordern, zum Beispiel beim Sport, Kochen oder Musizieren.</li><li><strong>Kontrolle:</strong> selbst bestimmen, was du mit deiner Zeit machst.</li></ol><p>Sonnentag beschreibt außerdem ein <strong>Erholungsparadox</strong>: Gerade wenn die Belastung hoch ist und Erholung am dringendsten wäre, gelingt sie am schlechtesten [[sonnentag2018]]. Wer erschöpft ist, scrollt eher auf dem Sofa, als zum Sport zu gehen, und wer unter Druck steht, kann schwerer abschalten. Deshalb lohnt es sich, Erholung bewusst zu planen, statt auf den richtigen Moment zu warten.</p><p>Und schließlich eine ermutigende Nachricht: <strong>Resilienz</strong>, also die Fähigkeit, sich nach Belastungen wieder zu erholen oder trotz Widrigkeiten gut zurechtzukommen, ist keine seltene Superkraft. Die Entwicklungspsychologin Ann Masten nennt sie „ordinary magic“, gewöhnliche Magie [[masten2001]]. Sie entsteht aus alltäglichen Ressourcen: tragfähigen Beziehungen, dem Gefühl, etwas bewirken zu können, der Fähigkeit, Gefühle zu regulieren, und einem Umfeld, das unterstützt. Auch nach schweren Verlusten ist ein stabiler, widerstandsfähiger Verlauf bei vielen Menschen häufiger als lange angenommen [[bonanno2004]]. Resilienz lässt sich pflegen, und genau das tust du in diesem Programm.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Mit dem Recovery Experience Questionnaire wurden die vier Erholungserfahrungen Abschalten, Entspannung, Mastery und Kontrolle als unterscheidbare Faktoren bestätigt, die mit besserem Befinden zusammenhängen [[sonnentag2007]]. Masten folgert aus Jahrzehnten der Entwicklungsforschung, dass Resilienz meist aus gewöhnlichen menschlichen Anpassungssystemen entsteht [[masten2001]]." }
    }
  ],
  myth: {
    myth: "Stress ist immer schädlich und sollte so weit wie möglich vermieden werden.",
    fact: "Kurzfristige Stressreaktionen sind eine sinnvolle Anpassung und können Leistung unterstützen. Belastend wird vor allem chronische Aktivierung ohne Erholung [[mcewen1998]]. Wer Stress auch als potenziell förderlich betrachtet, reagiert in Studien günstiger darauf [[crum2013]]."
  },
  takeaways: [
    "Die Stressreaktion ist eine sinnvolle Notfallreaktion. Zum Problem wird sie, wenn sie nicht mehr endet.",
    "Ob eine Situation Stress auslöst, hängt stark von deiner Bewertung und deinen wahrgenommenen Möglichkeiten ab.",
    "Veränderbare Belastungen brauchen eher problemorientiertes, nicht veränderbare eher emotionsorientiertes Coping.",
    "Erholung gelingt über Abschalten, Entspannung, Mastery und Kontrolle und sollte gerade in stressigen Zeiten geplant werden.",
    "Resilienz ist „gewöhnliche Magie“: Sie wächst aus Beziehungen, Selbstwirksamkeit und alltäglichen Ressourcen."
  ],
  practice: {
    title: "Stress-Inventur mit Neubewertung",
    duration: "12 Min.",
    intro: "Diese Übung macht deine aktuellen Stressoren sichtbar und hilft dir, für jeden einen passenden Umgang zu finden. Sie bildet die Grundlage für deine Stress-Landkarte.",
    steps: [
      "Nimm dir einen Zettel oder öffne die Stress-Landkarte. Atme zweimal tief aus, bevor du beginnst.",
      "Schreib alle Dinge auf, die dich im Moment belasten, große wie kleine. Sortiere noch nicht, sammle nur.",
      "Bewerte jeden Stressor auf einer Skala von 0 bis 10: Wie stark belastet er dich?",
      "Frage bei jedem Punkt: Kann ich daran etwas ändern, ganz oder teilweise? Markiere ihn als „veränderbar“ oder „nicht veränderbar“.",
      "Notiere bei veränderbaren Stressoren einen ersten, kleinen problemorientierten Schritt, zum Beispiel eine E-Mail schreiben oder um Hilfe bitten.",
      "Notiere bei nicht veränderbaren Stressoren einen emotionsorientierten Weg, etwa mit einer vertrauten Person sprechen, eine Atemübung oder bewusste Akzeptanz.",
      "Wähle den Stressor mit der höchsten Bewertung und formuliere eine hilfreiche Neubewertung: „Das ist schwer, und gleichzeitig zeigt mein Stress, dass mir … wichtig ist.“",
      "Schließe ab, indem du eine Erholungsaktivität für heute festlegst, die zu einer der vier Erholungserfahrungen passt."
    ]
  },
  tools: ["stressmap", "checkin"],
  toolIntro: "In der Stress-Landkarte ordnest du Deine Belastungen danach, ob sie veränderbar sind, und ordnest ihnen einen passenden Bewältigungsweg zu. Der tägliche Check-in zeigt dir, wie Stress, Energie und Stimmung über die Woche zusammenhängen.",
  tasks: [
    { title: "Stress-Landkarte anlegen", desc: "Trage mindestens fünf aktuelle Stressoren ein, ordne sie als veränderbar oder nicht veränderbar ein und weise jedem einen Bewältigungsweg zu.", freq: "einmalig" },
    { title: "Check-in fortsetzen", desc: "Mache weiterhin täglich deinen Check-in und notiere bei hohem Stress kurz, was der Auslöser war.", freq: "täglich" },
    { title: "Ein kleiner Problemschritt", desc: "Setze für einen veränderbaren Stressor einen konkreten ersten Schritt um. Plane ihn als Wenn-dann-Plan.", freq: "2× diese Woche" },
    { title: "Erholung bewusst planen", desc: "Plane jeden Tag eine Erholungsaktivität und notiere, welche der vier Erholungserfahrungen sie anspricht: Abschalten, Entspannung, Mastery oder Kontrolle.", freq: "täglich" },
    { title: "Feierabend-Ritual", desc: "Beende deinen Arbeitstag mit einem kurzen Abschluss: notiere offene Punkte für morgen und sag dir bewusst „Für heute ist Schluss“.", freq: "5× diese Woche" },
    { title: "Erregung neu deuten", desc: "Wenn du vor einer Herausforderung Herzklopfen spürst, sag dir: „Mein Körper stellt mir Energie bereit.“ Notiere danach, wie es lief.", freq: "3× diese Woche" },
    { title: "Burnout-Check", desc: "Prüfe einmal ehrlich, ob du Erschöpfung, inneren Rückzug und ein Gefühl von Wirkungslosigkeit bei dir bemerkst, und in welchen der sechs Arbeitsbereiche es hakt.", freq: "einmalig" }
  ],
  reflection: [
    "Welche Situationen bewertest du eher als Bedrohung und welche eher als Herausforderung? Was macht den Unterschied?",
    "Welcher deiner Stressoren hält dich auch dann noch beschäftigt, wenn er eigentlich vorbei ist?",
    "Welche der vier Erholungserfahrungen kommt in deinem Leben gerade am kürzesten?",
    "Welche alltäglichen Ressourcen haben dir in früheren schwierigen Zeiten geholfen, wieder auf die Beine zu kommen?"
  ],
  quiz: [
    {
      q: "Was ist mit „allostatischer Last“ gemeint?",
      options: ["Ein einmaliger, sehr starker Schreck", "Die kumulative Abnutzung durch chronische oder schlecht regulierte Stressreaktionen", "Ein Hormon, das bei Entspannung ausgeschüttet wird", "Die Fähigkeit, Stress vollständig auszublenden"],
      correct: 1,
      explain: "McEwen beschreibt allostatische Last als den Preis, den der Körper zahlt, wenn Anpassungsreaktionen zu häufig, zu lange oder unpassend aktiv sind [[mcewen1998]]."
    },
    {
      q: "Im transaktionalen Modell von Lazarus und Folkman fragt die sekundäre Bewertung vor allem:",
      options: ["Ist die Situation für mich relevant?", "Welche Möglichkeiten und Ressourcen habe ich, um damit umzugehen?", "Wie viel Cortisol schüttet mein Körper aus?", "Wer ist schuld an der Situation?"],
      correct: 1,
      explain: "Die primäre Bewertung prüft die Bedeutung der Situation, die sekundäre Bewertung die eigenen Bewältigungsmöglichkeiten. Stress entsteht, wenn Anforderungen die wahrgenommenen Ressourcen übersteigen [[lazarus1984]]."
    },
    {
      q: "Welche der folgenden gehört NICHT zu den vier Erholungserfahrungen nach Sonnentag und Fritz?",
      options: ["Gedankliches Abschalten", "Mastery-Erlebnisse", "Ständige Erreichbarkeit", "Kontrolle über die freie Zeit"],
      correct: 2,
      explain: "Die vier Erholungserfahrungen sind Abschalten, Entspannung, Mastery und Kontrolle. Ständige Erreichbarkeit erschwert gerade das gedankliche Abschalten [[sonnentag2007]]."
    },
    {
      q: "Was zeigte die Studie von Jamieson und Kolleginnen zur Neubewertung von Erregung?",
      options: ["Erregung sollte immer unterdrückt werden.", "Wer körperliche Erregung als hilfreiche Energie deutete, zeigte ein günstigeres Herz-Kreislauf-Muster.", "Neubewertung hatte keinerlei Wirkung.", "Nur Medikamente können Stressreaktionen verändern."],
      correct: 1,
      explain: "Teilnehmende, die Erregung als funktional verstehen lernten, zeigten unter Stress eine effizientere kardiovaskuläre Reaktion und weniger Aufmerksamkeitsverzerrung zu Bedrohung [[jamieson2012]]."
    }
  ],
  refs: ["mcewen1998", "lazarus1984", "yerkes1908", "crum2013", "jamieson2012", "maslach2016", "sonnentag2007", "sonnentag2018", "masten2001", "bonanno2004"]
});

/* ===================================================================== */
/* WOCHE 3 – DEN KÖRPER BERUHIGEN                                         */
/* ===================================================================== */
window.KS_WEEKS.push({
  n: 3,
  title: "Den Körper beruhigen",
  subtitle: "Atmung, Muskelentspannung und Erdung als direkte Wege zur Ruhe",
  phase: 1,
  minutes: "15–20 Min. pro Tag",
  lead: "Wenn der Kopf voll ist, ist der Körper oft der schnellste Zugang zur Ruhe. Diese Woche lernst du Techniken, die direkt am Nervensystem ansetzen: langsames Atmen, gezielte Muskelentspannung und Erdung. Sie sind einfach, jederzeit verfügbar und gut erforscht.",
  goals: [
    "Du verstehst das Zusammenspiel von Sympathikus und Parasympathikus und die Rolle der Herzratenvariabilität.",
    "Du kennst die Evidenz zu langsamer Atmung, zyklischem Seufzen und Progressiver Muskelentspannung.",
    "Du kannst dein Toleranzfenster beschreiben und erkennst, wann du es verlässt.",
    "Du übst täglich eine Beruhigungstechnik und hast eine Notfalltechnik für akute Anspannung."
  ],
  input: [
    {
      h: "Gaspedal und Bremse: dein autonomes Nervensystem",
      body: "<p>Viele Körperfunktionen laufen ohne dein bewusstes Zutun: Herzschlag, Verdauung, Blutdruck, Schwitzen. Gesteuert werden sie vom <strong>autonomen Nervensystem</strong>. Es hat zwei große Gegenspieler, die sich wie Gaspedal und Bremse ergänzen.</p><p>Der <strong>Sympathikus</strong> ist das Gaspedal. Er aktiviert den Körper, beschleunigt Herzschlag und Atmung, stellt Energie bereit und schärft die Aufmerksamkeit für mögliche Gefahren. In Woche 2 hast du ihn als Teil der Stressreaktion kennengelernt. Der <strong>Parasympathikus</strong> ist die Bremse. Er verlangsamt den Herzschlag, fördert Verdauung und Regeneration und ist mit Zuständen von Ruhe und Sicherheit verbunden. Ein wichtiger Nerv des Parasympathikus ist der Vagusnerv, der unter anderem das Herz erreicht.</p><p>Gesund ist nicht, wenn die Bremse immer getreten ist, sondern wenn beide Systeme flexibel zusammenspielen. Ein Zeichen dieser Flexibilität ist die <strong>Herzratenvariabilität (HRV)</strong>. Dein Herz schlägt nicht wie ein Metronom. Die Abstände zwischen den Schlägen schwanken ständig leicht. Beim Einatmen wird der Herzschlag etwas schneller, beim Ausatmen etwas langsamer. Eine höhere HRV in Ruhe gilt als Hinweis auf ein anpassungsfähiges Nervensystem [[lehrer2014]].</p><p>Das Besondere: Die Atmung ist die einzige Funktion des autonomen Nervensystems, die du auch willentlich steuern kannst. Damit ist sie eine Art Hintertür. Wenn du bewusst langsamer und mit verlängerter Ausatmung atmest, sendest du Deinem Nervensystem ein Signal der Sicherheit. Das ist kein esoterischer Trick, sondern Physiologie, die gut untersucht ist [[zaccaro2018]].</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Lehrer und Gevirtz beschreiben, wie Atmung, Herzschlag und Blutdruckregulation über den Baroreflex gekoppelt sind. Langsames Atmen verstärkt die natürlichen Schwankungen der Herzfrequenz und trainiert so die Regulationsfähigkeit [[lehrer2014]]." }
    },
    {
      h: "Langsam atmen: Resonanzfrequenz und HRV",
      body: "<p>Ein Mensch atmet in Ruhe typischerweise etwa 12 bis 20 Mal pro Minute. Wird die Atmung deutlich verlangsamt, verändert sich das Zusammenspiel von Herz und Kreislauf. Bei einer bestimmten Atemfrequenz schwingen Herzschlag und Blutdruck besonders stark im Takt mit der Atmung. Dieser Punkt heißt <strong>Resonanzfrequenz</strong>. Bei den meisten Erwachsenen liegt er bei etwa sechs Atemzügen pro Minute, individuell meist zwischen etwa 4,5 und 7 [[lehrer2014]].</p><p>In diesem Bereich wird die HRV deutlich größer. Lehrer und Gevirtz erklären das über den Baroreflex, einen Regelkreis, der den Blutdruck stabil hält. Langsame Atmung in Resonanz trainiert diesen Regelkreis, ähnlich wie ein Muskel trainiert wird. Im HRV-Biofeedback lernen Menschen, mithilfe einer Anzeige ihre persönliche Resonanzfrequenz zu finden und zu üben.</p><p>Eine systematische Übersichtsarbeit von Zaccaro und Kollegen hat untersucht, was langsames Atmen mit unter zehn Atemzügen pro Minute im Körper und im Erleben bewirkt [[zaccaro2018]]. Die Befunde zeigen eine Zunahme der HRV und Veränderungen der Hirnaktivität, die mit Entspannung vereinbar sind. Auf der Erlebensebene berichteten die Teilnehmenden mehr Ruhe, Entspannung und Wachheit sowie weniger Angst, Ärger und Erregung.</p><p>So kannst du beginnen: Atme etwa fünf Sekunden ein und fünf bis sechs Sekunden aus, das ergibt rund 5,5 bis 6 Atemzüge pro Minute. Atme ruhig durch die Nase, ohne zu pressen. Wenn dir schwindelig wird, atme flacher und weniger tief, nicht nur langsamer. Der Atem-Taktgeber in dieser Woche hilft dir, den Rhythmus zu halten.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Die systematische Übersicht von Zaccaro und Kollegen fand, dass langsames Atmen (unter 10 Atemzüge pro Minute) mit erhöhter HRV, mehr Entspannung und Wohlbefinden sowie weniger Angst, Depressivität und Ärger einhergeht. Die Autorinnen und Autoren weisen auf die begrenzte Zahl und Heterogenität der Studien hin [[zaccaro2018]]." }
    },
    {
      h: "Fünf Minuten am Tag: das zyklische Seufzen",
      body: "<p>Wie viel Atemübung braucht es, um einen Unterschied zu spüren? Eine randomisierte Studie der Stanford University hat genau das untersucht [[balban2023]]. Die Teilnehmenden übten einen Monat lang täglich fünf Minuten zu Hause, aufgeteilt auf vier Gruppen:</p><ul><li><strong>Zyklisches Seufzen:</strong> zweimal durch die Nase einatmen (ein voller Atemzug, dann ein kurzes Nachatmen), dann lang und langsam durch den Mund ausatmen.</li><li><strong>Box-Atmung:</strong> gleich lange Phasen für Einatmen, Halten, Ausatmen und Halten.</li><li><strong>Zyklische Hyperventilation:</strong> betontes, schnelles Einatmen mit kurzem Ausatmen.</li><li><strong>Achtsamkeitsmeditation:</strong> passive Beobachtung des Atems als Vergleichsgruppe.</li></ul><p>Alle Gruppen profitierten. Die Atemübungen steigerten den positiven Affekt jedoch stärker als die Achtsamkeitsmeditation. Den größten Zuwachs an positivem Affekt zeigte das zyklische Seufzen, das zugleich die Atemfrequenz in Ruhe am deutlichsten senkte. Die Forschenden vermuten, dass die betonte, verlängerte Ausatmung dabei eine besondere Rolle spielt.</p><p>Das zyklische Seufzen eignet sich auch für akute Momente: Schon ein bis drei Seufzer können sich beruhigend anfühlen. Für den nachhaltigen Effekt aus der Studie gilt aber: regelmäßig üben, etwa fünf Minuten täglich.</p><p>Eine Einordnung gehört dazu. Es handelte sich um eine einzelne Studie mit gesunden Erwachsenen, die online durchgeführt wurde. Das heißt nicht, dass Meditation unwirksam ist; sie hat ihre eigenen gut belegten Effekte. Es zeigt aber, dass schon sehr kurze, strukturierte Atemübungen einen spürbaren Beitrag zum Wohlbefinden leisten können.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "In der randomisierten Studie von Balban und Kollegen steigerten fünf Minuten tägliche Atemübung über einen Monat den positiven Affekt stärker als Achtsamkeitsmeditation. Zyklisches Seufzen zeigte den größten Zuwachs an positivem Affekt und die stärkste Senkung der Atemfrequenz in Ruhe [[balban2023]]." }
    },
    {
      h: "Progressive Muskelentspannung: Anspannen, um loszulassen",
      body: "<p>Anspannung sitzt nicht nur im Kopf, sondern auch in den Muskeln: hochgezogene Schultern, ein fester Kiefer, verkrampfte Hände. Oft merkst du sie erst, wenn sie bereits schmerzt. Der amerikanische Arzt Edmund Jacobson entwickelte in den 1920er- und 1930er-Jahren die <strong>Progressive Muskelentspannung (PMR)</strong> [[jacobson1938]]. Sein Grundgedanke: Wer lernt, Anspannung und Entspannung in den Muskeln bewusst wahrzunehmen, kann auch gezielt loslassen.</p><p>Das Prinzip ist einfach. Du spannst nacheinander verschiedene Muskelgruppen für etwa fünf bis sieben Sekunden an, zum Beispiel die Hände, Arme, Schultern, das Gesicht, den Bauch und die Beine. Dann lässt du schlagartig los und spürst für etwa 20 bis 30 Sekunden nach, wie sich die Entspannung ausbreitet. Durch den Kontrast wird der Unterschied deutlich spürbar.</p><p>Jacobsons ursprüngliches Verfahren war sehr umfangreich. Heute werden meist verkürzte Fassungen genutzt, etwa mit 16 oder 7 Muskelgruppen. Mit etwas Übung lassen sich Gruppen zusammenfassen, bis du schließlich lernst, dich allein durch Erinnern oder ein Signalwort zu entspannen.</p><p>Ein paar Hinweise für die Praxis:</p><ul><li>Spanne nur so stark an, dass du die Spannung deutlich spürst, ohne dass es schmerzt.</li><li>Lass bei Verletzungen oder Schmerzen die betreffende Körperregion aus oder spanne nur sanft an.</li><li>Übe anfangs in ruhiger Umgebung, am besten täglich zur selben Zeit.</li><li>PMR eignet sich gut als Einschlafhilfe, wirkt aber auch tagsüber.</li></ul><p>Der Effekt baut sich mit Übung auf. Gib dir mindestens zwei bis drei Wochen, bevor du die Methode bewertest.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Eine Meta-Analyse zu Entspannungsverfahren bei Angst, darunter PMR, angewandte Entspannung und autogenes Training, fand über 27 Studien hinweg eine mittlere bis große Wirkung auf Angst (Cohen's d etwa 0,57) [[manzoni2008]]." }
    },
    {
      h: "Das Toleranzfenster: wann du gut regulieren kannst",
      body: "<p>Der Psychiater Daniel Siegel hat ein hilfreiches Bild geprägt: das <strong>Toleranzfenster</strong> [[siegel1999]]. Es beschreibt den Bereich innerer Erregung, in dem du Gefühle wahrnehmen, klar denken und angemessen handeln kannst. Innerhalb dieses Fensters darfst du durchaus aufgeregt, traurig oder angespannt sein. Du bleibst aber handlungsfähig und mit dir selbst in Kontakt.</p><p>Außerhalb des Fensters wird es schwieriger. Siegel beschreibt zwei Richtungen:</p><ul><li><strong>Übererregung:</strong> Das System ist zu hochgefahren. Typisch sind Herzrasen, Panik, Wut, Gedankenrasen, Reizbarkeit oder das Gefühl, gleich zu explodieren.</li><li><strong>Untererregung:</strong> Das System fährt herunter. Typisch sind Leere, Taubheit, Erstarrung, Abwesenheit oder das Gefühl, wie hinter Glas zu sein.</li></ul><p>Wie breit dein Fenster ist, hängt von vielen Faktoren ab: Schlaf, Stress, Hunger, Krankheit, früheren Erfahrungen und Unterstützung. Nach einer schlechten Nacht kann schon eine Kleinigkeit dich aus dem Fenster bringen. Das ist kein persönliches Versagen, sondern ein Hinweis auf deinen aktuellen Zustand.</p><p>Das Modell ist vor allem praktisch nützlich. Es hilft dir, deine Reaktionen ohne Selbstabwertung einzuordnen, und es zeigt, welche Technik wann passt. Bei Übererregung helfen beruhigende Techniken wie verlängerte Ausatmung oder PMR. Bei Untererregung helfen eher aktivierende und erdende Techniken: aufstehen, bewegen, kaltes Wasser, bewusstes Wahrnehmen der Umgebung. Ziel ist nicht, immer in der Mitte zu sein, sondern zurückzufinden und das Fenster mit der Zeit zu erweitern.</p><p>Wenn du sehr häufig außerhalb deines Fensters bist, etwa nach belastenden Erlebnissen, ist professionelle Begleitung sinnvoll.</p>"
    },
    {
      h: "Erdung: im Hier und Jetzt ankommen",
      body: "<p>Manchmal reicht eine Atemübung nicht, weil die Gedanken zu laut sind oder sich die Wirklichkeit fern anfühlt. Dann helfen <strong>Erdungstechniken</strong>. Sie lenken die Aufmerksamkeit bewusst nach außen, auf die Sinne und den gegenwärtigen Moment. Damit unterbrechen sie Grübelschleifen, Panikspiralen oder das Gefühl, innerlich wegzudriften, und helfen dir, in dein Toleranzfenster zurückzukehren [[siegel1999]].</p><p>Die bekannteste Erdungsübung ist die <strong>5-4-3-2-1-Technik</strong>. Du benennst nacheinander:</p><ol><li>fünf Dinge, die du siehst,</li><li>vier Dinge, die du spürst, etwa den Stuhl oder die Kleidung auf der Haut,</li><li>drei Dinge, die du hörst,</li><li>zwei Dinge, die du riechst,</li><li>eine Sache, die du schmeckst.</li></ol><p>Weitere Erdungsmöglichkeiten sind:</p><ul><li>die Füße fest auf den Boden drücken und das Gewicht spüren,</li><li>einen Gegenstand in die Hand nehmen und Oberfläche, Temperatur und Gewicht genau beschreiben,</li><li>kaltes Wasser über die Handgelenke laufen lassen,</li><li>sich laut sagen, wo man ist, welcher Tag ist und was man gerade tut.</li></ul><p>Erdungstechniken stammen vor allem aus der klinischen Praxis, etwa der Arbeit mit Angst und belastenden Erinnerungen. Sie sind als Erste-Hilfe-Werkzeuge gedacht, nicht als Behandlung. Ihr Vorteil ist, dass sie sofort, unauffällig und ohne Vorbereitung funktionieren, im Bus, im Meeting oder nachts im Bett.</p><p>Am besten übst du sie, wenn es dir gut geht. Dann sind sie im Ernstfall leichter abrufbar. Wähle zwei Techniken, die dir liegen, und mache sie zu deinem persönlichen Notfallset.</p>"
    }
  ],
  myth: {
    myth: "Entspannungstechniken wirken nur, wenn man lange meditiert oder viel Zeit investiert.",
    fact: "Schon fünf Minuten strukturierte Atemübung täglich über einen Monat steigerten in einer randomisierten Studie den positiven Affekt messbar, beim zyklischen Seufzen sogar stärker als Achtsamkeitsmeditation [[balban2023]]. Entscheidend ist die Regelmäßigkeit, nicht die Dauer."
  },
  takeaways: [
    "Die Atmung ist dein direkter Zugang zum autonomen Nervensystem. Eine verlängerte Ausatmung wirkt beruhigend.",
    "Langsames Atmen um etwa sechs Atemzüge pro Minute erhöht die Herzratenvariabilität und fördert Entspannung.",
    "Fünf Minuten zyklisches Seufzen täglich können den positiven Affekt spürbar steigern.",
    "Progressive Muskelentspannung ist ein gut belegtes Verfahren gegen Angst und Anspannung und wirkt mit Übung.",
    "Das Toleranzfenster hilft dir zu erkennen, ob du eher Beruhigung oder eher Erdung und Aktivierung brauchst."
  ],
  practice: {
    title: "Zyklisches Seufzen mit Körperscan",
    duration: "7 Min.",
    intro: "Diese Übung verbindet die in Studien wirksame Atemtechnik mit einer kurzen Wahrnehmung deines Körpers. Mach sie am besten täglich zur selben Zeit.",
    steps: [
      "Setz oder leg dich bequem hin. Lass die Schultern sinken und den Kiefer locker werden.",
      "Nimm wahr, wie du gerade atmest, ohne etwas zu verändern. Schätze deine Anspannung auf einer Skala von 0 bis 10 ein.",
      "Atme tief durch die Nase ein, bis die Lunge fast voll ist.",
      "Atme ohne auszuatmen noch einmal kurz durch die Nase nach, um die Lunge ganz zu füllen.",
      "Atme jetzt lang und langsam durch den Mund aus, bis die Lunge leer ist. Die Ausatmung darf deutlich länger sein als die Einatmung.",
      "Wiederhole diesen Zyklus in deinem eigenen ruhigen Tempo etwa fünf Minuten lang. Nutze bei Bedarf den Atem-Taktgeber.",
      "Lass danach den Atem wieder frei fließen und wandere mit der Aufmerksamkeit von den Füßen bis zum Kopf. Wo spürst du jetzt Ruhe, wo noch Spannung?",
      "Schätze deine Anspannung erneut von 0 bis 10 ein und notiere beide Werte im Check-in."
    ]
  },
  tools: ["breath", "pmr", "grounding"],
  toolIntro: "Der Atem-Taktgeber führt dich durch Resonanzatmung, 4-6-Atmung, Box-Atmung und den physiologischen Seufzer. Mit dem PMR-Timer wirst du durch die Muskelgruppen geführt, und die 5-4-3-2-1-Erdung begleitet dich Schritt für Schritt zurück ins Hier und Jetzt.",
  tasks: [
    { title: "Tägliche Atempraxis", desc: "Übe täglich fünf Minuten zyklisches Seufzen oder Resonanzatmung mit dem Atem-Taktgeber. Verknüpfe es mit einem festen Auslöser, etwa nach dem Mittagessen.", freq: "täglich" },
    { title: "PMR üben", desc: "Mache eine geführte Runde Progressive Muskelentspannung, zum Beispiel am Abend vor dem Schlafengehen.", freq: "3× diese Woche" },
    { title: "Erdung im Alltag", desc: "Übe die 5-4-3-2-1-Erdung in einem ruhigen Moment, damit sie dir im Ernstfall vertraut ist.", freq: "2× diese Woche" },
    { title: "Vorher-nachher-Messung", desc: "Notiere vor und nach jeder Übung deine Anspannung von 0 bis 10. So siehst du, was bei dir am besten wirkt.", freq: "täglich" },
    { title: "Mein Toleranzfenster", desc: "Schreibe auf, woran du merkst, dass du über- oder untererregt bist, und was dich jeweils zurückbringt.", freq: "einmalig" },
    { title: "Mikro-Pausen", desc: "Lege drei kurze Atempausen von je drei Seufzern in deinen Tag, etwa vor Meetings oder nach Telefonaten.", freq: "5× diese Woche" },
    { title: "Notfallset festlegen", desc: "Wähle zwei Techniken für akute Anspannung und schreib sie gut sichtbar auf, zum Beispiel ins Handy.", freq: "einmalig" }
  ],
  reflection: [
    "Woran merkst du in deinem Körper zuerst, dass du angespannt bist?",
    "Welche Situationen bringen dich am ehesten aus deinem Toleranzfenster, und in welche Richtung?",
    "Welche der Techniken dieser Woche hat sich für dich am natürlichsten angefühlt, und warum?",
    "Wie könntest du eine Beruhigungstechnik so in deinen Alltag einbauen, dass sie zur Gewohnheit wird?"
  ],
  quiz: [
    {
      q: "Bei welcher Atemfrequenz liegt die Resonanzfrequenz bei den meisten Erwachsenen ungefähr?",
      options: ["etwa 2 Atemzüge pro Minute", "etwa 6 Atemzüge pro Minute", "etwa 15 Atemzüge pro Minute", "etwa 25 Atemzüge pro Minute"],
      correct: 1,
      explain: "Die Resonanzfrequenz liegt meist um sechs Atemzüge pro Minute. Hier schwingen Herzschlag und Blutdruck besonders stark mit der Atmung, und die HRV steigt deutlich [[lehrer2014]]."
    },
    {
      q: "Was fanden Balban und Kollegen in ihrer randomisierten Studie?",
      options: ["Atemübungen hatten keinen Effekt auf die Stimmung.", "Fünf Minuten tägliche Atemübung steigerten den positiven Affekt stärker als Achtsamkeitsmeditation, am stärksten beim zyklischen Seufzen.", "Nur Hyperventilation verbesserte die Stimmung.", "Achtsamkeitsmeditation war allen Atemübungen deutlich überlegen."],
      correct: 1,
      explain: "Über einen Monat steigerten die Atemübungen den positiven Affekt stärker als Meditation. Zyklisches Seufzen zeigte den größten Effekt und senkte die Atemfrequenz in Ruhe am stärksten [[balban2023]]."
    },
    {
      q: "Wie funktioniert Progressive Muskelentspannung nach Jacobson?",
      options: ["Durch Dehnen aller Muskeln bis zum Schmerz", "Durch kurzes bewusstes Anspannen und anschließendes Loslassen einzelner Muskelgruppen", "Durch möglichst schnelles Atmen", "Durch Visualisierung einer Landschaft"],
      correct: 1,
      explain: "PMR nutzt den Kontrast zwischen Anspannung und Entspannung, um Muskelspannung wahrnehmbar und lösbar zu machen [[jacobson1938]]. Entspannungsverfahren zeigen eine mittlere bis große Wirkung auf Angst [[manzoni2008]]."
    },
    {
      q: "Jemand fühlt sich nach einem Streit leer, wie erstarrt und „hinter Glas“. Was ist nach dem Toleranzfenster-Modell eher hilfreich?",
      options: ["Weitere Beruhigung durch sehr langsames Atmen im Liegen", "Aktivierende und erdende Techniken wie aufstehen, bewegen und die Sinne nutzen", "Abwarten, bis das Gefühl von allein vergeht", "Sich zwingen, das Problem sofort zu lösen"],
      correct: 1,
      explain: "Leere und Erstarrung deuten auf Untererregung hin. Dann helfen eher aktivierende und erdende Techniken, um zurück ins Toleranzfenster zu finden [[siegel1999]]."
    }
  ],
  refs: ["lehrer2014", "zaccaro2018", "balban2023", "jacobson1938", "manzoni2008", "siegel1999"]
});

/* ===================================================================== */
/* WOCHE 4 – ERHOLSAMER SCHLAF                                            */
/* ===================================================================== */
window.KS_WEEKS.push({
  n: 4,
  title: "Erholsamer Schlaf",
  subtitle: "Wie Schlaf funktioniert und was nachweislich hilft",
  phase: 2,
  minutes: "15–20 Min. pro Tag",
  lead: "Schlaf ist eine der stärksten Stellschrauben für deine psychische Gesundheit. Wer schlecht schläft, ist reizbarer, grübelt mehr und hält Stress schlechter aus. Diese Woche lernst du, wie Schlaf reguliert wird, warum gute Vorsätze allein oft nicht reichen und welche Strategien aus der kognitiven Verhaltenstherapie bei Schlafproblemen am besten belegt sind.",
  goals: [
    "Du verstehst das Zwei-Prozess-Modell und kennst den Schlafbedarf von Erwachsenen.",
    "Du weißt, dass besserer Schlaf die psychische Gesundheit nachweislich verbessert.",
    "Du kennst die Bausteine der KVT-I, insbesondere die Stimuluskontrolle, und ihre Grenzen in der Selbsthilfe.",
    "Du führst ein Schlaftagebuch und berechnest deine Schlafeffizienz."
  ],
  input: [
    {
      h: "Wie Schlaf gesteuert wird: das Zwei-Prozess-Modell",
      body: "<p>Warum wirst du abends müde und morgens wach? Der Schweizer Schlafforscher Alexander Borbély hat dafür ein bis heute grundlegendes Modell entwickelt: das <strong>Zwei-Prozess-Modell</strong> der Schlafregulation [[borbely1982]].</p><p><strong>Prozess S</strong> steht für den Schlafdruck. Er baut sich auf, je länger du wach bist, ähnlich wie ein Gefäß, das sich über den Tag füllt. Im Schlaf, besonders im Tiefschlaf, wird er wieder abgebaut. Ein langer Mittagsschlaf oder langes Ausschlafen leert das Gefäß teilweise, sodass abends weniger Schlafdruck vorhanden ist.</p><p><strong>Prozess C</strong> steht für den circadianen Rhythmus, deine innere Uhr. Sie folgt einem Rhythmus von etwa 24 Stunden und wird vor allem durch Tageslicht synchronisiert. Sie fördert tagsüber Wachheit und nachts Schlafbereitschaft, unabhängig davon, wie lange du schon wach bist.</p><p>Gut schlafen kannst du dann, wenn beide Prozesse zusammenpassen: wenn der Schlafdruck hoch ist und deine innere Uhr auf Nacht steht. Daraus ergeben sich praktische Hinweise:</p><ul><li>Ein regelmäßiger Aufstehzeitpunkt, auch am Wochenende, stabilisiert die innere Uhr.</li><li>Tageslicht am Morgen hilft, den Rhythmus zu synchronisieren.</li><li>Lange Nickerchen am Nachmittag oder frühes Zubettgehen ohne Müdigkeit verringern den Schlafdruck am Abend.</li><li>Wer nach einer schlechten Nacht lange im Bett bleibt, schwächt den Schlafdruck für die nächste Nacht.</li></ul><p>Dieses Modell erklärt, warum manche gut gemeinten Strategien gegen Schlafprobleme, etwa früher ins Bett gehen, das Problem oft verschärfen.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Borbély beschrieb 1982 die Schlafregulation als Zusammenspiel eines homöostatischen Prozesses (Schlafdruck, Prozess S), der während des Wachseins ansteigt und im Schlaf abfällt, und eines circadianen Prozesses (Prozess C) [[borbely1982]]." }
    },
    {
      h: "Wie viel Schlaf brauchst du?",
      body: "<p>Die US-amerikanische National Sleep Foundation hat mit einem Expertengremium aus Schlafmedizin, Psychologie und weiteren Fachgebieten die Literatur gesichtet und Empfehlungen für verschiedene Altersgruppen abgeleitet [[hirshkowitz2015]]. Für Erwachsene zwischen 18 und 64 Jahren gelten <strong>7 bis 9 Stunden</strong> als empfehlenswert. Für Menschen ab 65 Jahren liegt die Empfehlung bei 7 bis 8 Stunden. Jugendliche brauchen mit 8 bis 10 Stunden mehr.</p><p>Dazu kommen Bereiche, die für einzelne Menschen noch angemessen sein können, etwa 6 oder 10 Stunden bei jungen Erwachsenen. Weniger oder deutlich mehr gilt dagegen für die meisten als ungünstig. Schlafbedarf ist also individuell, aber nicht beliebig.</p><p>Wie findest du heraus, was du brauchst? Ein guter Hinweis ist, wie du Dich tagsüber fühlst. Wenn du ohne Wecker aufwachst, dich tagsüber überwiegend wach und leistungsfähig fühlst und nicht bei jeder ruhigen Gelegenheit einnickst, schläfst du wahrscheinlich ausreichend. Wenn du am Wochenende regelmäßig mehrere Stunden länger schläfst, deutet das auf ein Schlafdefizit unter der Woche hin.</p><p>Wichtig ist auch, Schlaf nicht nur an der Dauer zu messen. Ebenso bedeutsam sind die <strong>Regelmäßigkeit</strong> und die <strong>Qualität</strong>: wie schnell du einschläfst, wie oft und wie lange du nachts wach liegst und ob du Dich morgens erholt fühlst.</p><p>Ein gelegentlich schlechter Schlaf ist normal und kein Grund zur Sorge. Der Körper gleicht ein Defizit über einen erhöhten Schlafdruck in der folgenden Nacht teilweise aus. Problematisch wird es, wenn Schlafprobleme über Wochen anhalten.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Das Expertengremium der National Sleep Foundation empfiehlt auf Grundlage einer systematischen Literatursichtung für Erwachsene 7 bis 9 Stunden Schlaf, für ältere Erwachsene ab 65 Jahren 7 bis 8 Stunden [[hirshkowitz2015]]." }
    },
    {
      h: "Schlaf und Psyche: eine kausale Verbindung",
      body: "<p>Dass Menschen mit Depressionen oder Ängsten oft schlecht schlafen, ist lange bekannt. Lange wurde Schlaf dabei vor allem als Symptom gesehen. Neuere Forschung zeigt jedoch: Schlechter Schlaf ist nicht nur eine Folge, sondern auch eine <strong>Ursache</strong> psychischer Beschwerden. Und wer den Schlaf verbessert, verbessert damit die psychische Gesundheit.</p><p>Den bisher deutlichsten Beleg liefert eine Meta-Analyse von Alexander Scott und Kollegen [[scott2021]]. Sie wertete randomisierte kontrollierte Studien aus, in denen gezielt der Schlaf verbessert wurde, meist mit kognitiver Verhaltenstherapie für Insomnie. Gemessen wurde, ob sich danach auch die psychische Gesundheit verändert. Das Ergebnis war deutlich: Verbesserungen beim Schlaf gingen mit Verbesserungen bei Depression, Angst, Grübeln und Stress einher. Je stärker sich der Schlaf verbesserte, desto stärker verbesserte sich auch die psychische Gesundheit.</p><p>Eine besonders große Studie ist das <strong>OASIS-Projekt</strong> von Daniel Freeman und Kolleginnen [[freeman2017]]. Studierende an britischen Universitäten mit Schlafproblemen erhielten entweder eine digitale KVT für Insomnie oder die übliche Versorgung. Die digitale Therapie verbesserte nicht nur die Schlaflosigkeit, sondern verringerte auch paranoide Gedanken, Halluzinationserleben, depressive Symptome und Angst. Mediationsanalysen zeigten, dass diese Verbesserungen zu einem wesentlichen Teil über den besseren Schlaf vermittelt wurden.</p><p>Für dich bedeutet das: Arbeit am Schlaf ist keine Nebensache, sondern direkte Arbeit an deiner psychischen Gesundheit. Deshalb steht Schlaf am Anfang der Lebensstil-Phase dieses Programms.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Die Meta-Analyse von Scott und Kollegen über 65 randomisierte Studien mit rund 8.600 Teilnehmenden fand, dass verbesserter Schlaf zu einer mittleren Verbesserung der psychischen Gesundheit insgesamt führte (g = 0,53), mit einem Dosis-Wirkungs-Zusammenhang [[scott2021]]. In der OASIS-Studie mit 3.755 Studierenden verringerte digitale KVT-I Insomnie, Paranoia und Halluzinationserleben [[freeman2017]]." }
    },
    {
      h: "KVT-I: das Mittel der ersten Wahl",
      body: "<p>Wenn Schlafprobleme über längere Zeit bestehen, mindestens dreimal pro Woche auftreten und den Alltag beeinträchtigen, sprechen Fachleute von einer chronischen <strong>Insomnie</strong>. Für sie gibt es eine klar empfohlene Behandlung: die <strong>kognitive Verhaltenstherapie für Insomnie (KVT-I)</strong>. Die europäische Leitlinie unter Federführung von Dieter Riemann empfiehlt sie als Behandlung der ersten Wahl für Erwachsene jeden Alters [[riemann2017]]. Schlafmittel kommen allenfalls kurzfristig in Betracht, wenn KVT-I nicht ausreichend wirkt oder nicht verfügbar ist.</p><p>KVT-I besteht aus mehreren Bausteinen:</p><ul><li><strong>Psychoedukation</strong> über Schlaf und Schlafregulation, wie du sie in dieser Woche erhältst.</li><li><strong>Stimuluskontrolle:</strong> das Bett wieder mit Schlaf statt mit Wachliegen verknüpfen.</li><li><strong>Schlafrestriktion:</strong> die Bettzeit vorübergehend an die tatsächliche Schlafzeit anpassen, um den Schlafdruck zu erhöhen.</li><li><strong>Kognitive Techniken:</strong> belastende Gedanken über Schlaf überprüfen, etwa „Wenn ich nicht acht Stunden schlafe, ist der Tag ruiniert.“</li><li><strong>Entspannungsverfahren</strong> wie PMR oder Atemübungen aus Woche 3.</li><li><strong>Schlafhygiene</strong> als ergänzende Grundlage.</li></ul><p>Die Wirkung ist gut belegt. Im Unterschied zu Schlafmitteln hält sie auch nach Ende der Behandlung an. KVT-I wird inzwischen auch digital angeboten, in Deutschland teils als erstattungsfähige digitale Gesundheitsanwendung. Wenn du seit Monaten schlecht schläfst, sprich bitte mit deiner Hausärztin oder deinem Hausarzt. Abgeklärt werden sollten dabei auch körperliche Ursachen wie Schlafapnoe, das Restless-Legs-Syndrom oder Schilddrüsenstörungen.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Eine Meta-Analyse von 20 randomisierten Studien zur KVT-I bei chronischer Insomnie fand, dass Betroffene im Mittel rund 19 Minuten schneller einschliefen, rund 26 Minuten weniger nachts wach lagen und ihre Schlafeffizienz um knapp 10 Prozentpunkte steigerten [[trauer2015]]. Die europäische Leitlinie empfiehlt KVT-I als Erstbehandlung chronischer Insomnie [[riemann2017]]." }
    },
    {
      h: "Stimuluskontrolle und Bettzeit: das Bett neu verknüpfen",
      body: "<p>Wer oft lange wach liegt, lernt unbewusst: Bett bedeutet Grübeln, Anspannung und Frust. Diese Verknüpfung kann so stark werden, dass Menschen auf dem Sofa einnicken, im Bett aber hellwach werden. Die <strong>Stimuluskontrolle</strong> nach Richard Bootzin setzt genau hier an [[bootzin1972]]. Ihr Ziel ist, das Bett wieder fest mit schnellem Einschlafen zu verbinden. Die Regeln lauten:</p><ol><li>Geh nur ins Bett, wenn du wirklich schläfrig bist, nicht nur müde oder erschöpft.</li><li>Nutze das Bett nur zum Schlafen und für Sexualität, nicht zum Arbeiten, Fernsehen oder Scrollen.</li><li>Wenn du nach etwa 15 bis 20 Minuten nicht eingeschlafen bist, steh auf, geh in einen anderen Raum und mache etwas Ruhiges bei gedämpftem Licht. Kehre erst zurück, wenn du schläfrig bist. Schau dabei nicht auf die Uhr, schätze die Zeit grob.</li><li>Wiederhole Schritt 3 so oft wie nötig.</li><li>Steh jeden Morgen zur gleichen Zeit auf, egal wie viel du geschlafen hast.</li><li>Verzichte auf Nickerchen am Tag.</li></ol><p>Die ersten Nächte können anstrengend sein. Das ist normal und ein Zeichen, dass der Schlafdruck steigt.</p><p>Eine weitere wirksame, aber anspruchsvolle Methode ist die <strong>Schlafrestriktion</strong>, auch Bettzeitverdichtung genannt [[spielman1987]]. Dabei wird die Zeit im Bett vorübergehend auf die tatsächliche durchschnittliche Schlafzeit begrenzt und schrittweise wieder verlängert, sobald der Schlaf effizienter wird. Weil sie anfangs zu deutlicher Tagesmüdigkeit führen kann, solltest du sie <strong>nicht auf eigene Faust</strong> anwenden, sondern nur mit fachlicher Begleitung. Das gilt besonders, wenn du Auto fährst oder Maschinen bedienst, eine bipolare Störung, Epilepsie oder eine Schlafapnoe hast oder schwanger bist. Klarsinn konzentriert sich deshalb auf die Stimuluskontrolle und das Schlaftagebuch.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "Bootzin beschrieb die Stimuluskontrolle als Verfahren, das die Verknüpfung zwischen Bett und schlafunvereinbaren Aktivitäten löst [[bootzin1972]]. Spielman und Kollegen zeigten, dass die Begrenzung der Bettzeit bei chronischer Insomnie die Schlafqualität verbesserte [[spielman1987]]." }
    },
    {
      h: "Schlafhygiene, Koffein, Alkohol und deine Schlafeffizienz",
      body: "<p><strong>Schlafhygiene</strong> umfasst Empfehlungen zu Lebensstil und Umgebung: ein ruhiges, dunkles, kühles Schlafzimmer, regelmäßige Zeiten, Bewegung, kein schweres Essen spät am Abend. Diese Regeln sind sinnvoll, doch eine Übersichtsarbeit kommt zu dem Schluss, dass Schlafhygiene <em>allein</em> bei einer echten Insomnie meist nicht ausreicht [[irish2015]]. Sie ist ein Fundament, aber keine Therapie.</p><p>Zwei Faktoren verdienen besondere Aufmerksamkeit. <strong>Koffein</strong> wirkt länger, als viele denken. In einer Laborstudie störte eine hohe Koffeindosis den Schlaf selbst dann deutlich, wenn sie sechs Stunden vor dem Zubettgehen eingenommen wurde. Die gemessene Schlafdauer verkürzte sich dabei um mehr als eine Stunde [[drake2013]]. Eine sinnvolle Faustregel ist daher, Kaffee, schwarzen Tee, Cola und Energydrinks ab dem frühen Nachmittag zu meiden.</p><p><strong>Alkohol</strong> lässt viele Menschen schneller einschlafen. In der ersten Nachthälfte verändert er aber die Schlafarchitektur, unterdrückt den REM-Schlaf und stört in der zweiten Nachthälfte den Schlaf, mit häufigerem Aufwachen [[ebrahim2013]]. Als Schlafmittel ist Alkohol daher ungeeignet.</p><p>Ein zentrales Maß für deinen Schlaf ist die <strong>Schlafeffizienz</strong>:</p><p><strong>Schlafeffizienz = tatsächliche Schlafzeit ÷ Zeit im Bett × 100</strong></p><p>Beispiel: du liegst 8 Stunden im Bett (480 Minuten) und schläfst davon 6 Stunden (360 Minuten). Deine Schlafeffizienz beträgt 360 ÷ 480 × 100 = 75 %. Als Zielwert für guten Schlaf gilt eine Effizienz von <strong>85 % oder mehr</strong>. Werte darunter zeigen, dass du viel Zeit wach im Bett verbringst. Dein Schlaftagebuch berechnet diesen Wert automatisch und zeigt dir, wie er sich über die Woche entwickelt.</p>",
      evidence: { label: "Was die Forschung zeigt", text: "In der Studie von Drake und Kollegen verringerte Koffein, sechs Stunden vor dem Schlafengehen eingenommen, die objektiv gemessene Gesamtschlafzeit um mehr als eine Stunde [[drake2013]]. Eine Übersicht zu Alkohol zeigt eine Verkürzung der Einschlafzeit, aber eine Störung des Schlafs in der zweiten Nachthälfte [[ebrahim2013]]." }
    }
  ],
  myth: {
    myth: "Wer schlecht geschlafen hat, sollte früher ins Bett gehen oder morgens länger liegen bleiben, um nachzuholen.",
    fact: "Mehr Zeit im Bett senkt den Schlafdruck und erhöht die Zeit, die du wach im Bett verbringst [[borbely1982]]. Wirksamer ist es, nur schläfrig ins Bett zu gehen und zu einer festen Zeit aufzustehen, wie es die Stimuluskontrolle vorsieht [[bootzin1972]]."
  },
  takeaways: [
    "Schlaf wird durch Schlafdruck und innere Uhr gesteuert. Ein fester Aufstehzeitpunkt stabilisiert beide.",
    "Erwachsene brauchen meist 7 bis 9 Stunden Schlaf. Regelmäßigkeit und Qualität sind ebenso wichtig.",
    "Besserer Schlaf verbessert nachweislich die psychische Gesundheit, mit einem Dosis-Wirkungs-Zusammenhang.",
    "KVT-I ist die Behandlung der ersten Wahl bei chronischer Insomnie. Schlafhygiene allein reicht dafür meist nicht.",
    "Eine Schlafeffizienz von 85 % oder mehr ist ein gutes Ziel. Koffein am Nachmittag und Alkohol am Abend arbeiten dagegen."
  ],
  practice: {
    title: "Abendliches Abschaltritual",
    duration: "15 Min.",
    intro: "Ein festes Ritual hilft deinem Körper und Geist, den Übergang vom Tag zur Nacht zu finden. Es verbindet gedankliches Abschließen mit körperlicher Beruhigung.",
    steps: [
      "Beginne etwa 30 bis 60 Minuten vor dem Zubettgehen. Dimme das Licht und lege Bildschirme beiseite.",
      "Nimm einen Zettel und schreib alles auf, was dich noch beschäftigt: offene Aufgaben, Sorgen, Ideen. Notiere zu jedem Punkt, wann du Dich morgen darum kümmerst.",
      "Leg den Zettel bewusst weg, zum Beispiel in eine Schublade, und sag dir: „Für heute ist das erledigt.“",
      "Mach eine ruhige Tätigkeit, die dir guttut: lesen, ruhige Musik, eine Tasse Kräutertee, leichte Dehnübungen.",
      "Lege dich hin und atme fünf Minuten in der 4-6-Atmung: vier Sekunden ein, sechs Sekunden aus.",
      "Wenn du magst, schließe eine kurze PMR-Runde für Hände, Schultern und Gesicht an.",
      "Wenn du nach etwa 15 bis 20 Minuten nicht eingeschlafen bist, steh auf und wende die Regeln der Stimuluskontrolle an, ohne dich zu ärgern.",
      "Trage am nächsten Morgen deine Werte in das Schlaftagebuch ein."
    ]
  },
  tools: ["sleeplog", "breath"],
  toolIntro: "Im Schlaftagebuch trägst du jeden Morgen Bettzeit, Einschlafdauer und Wachzeiten ein und siehst deine Schlafeffizienz im Verlauf. Der Atem-Taktgeber unterstützt dich mit der 4-6-Atmung beim Herunterfahren am Abend.",
  tasks: [
    { title: "Schlaftagebuch führen", desc: "Trage jeden Morgen innerhalb von 30 Minuten nach dem Aufstehen Bettzeit, geschätzte Einschlafdauer, Wachzeiten in der Nacht und Aufstehzeit ein. Schätzen genügt, schau nachts nicht auf die Uhr.", freq: "täglich" },
    { title: "Feste Aufstehzeit", desc: "Lege eine Aufstehzeit fest, die du an allen sieben Tagen einhältst, auch am Wochenende, mit höchstens einer Stunde Abweichung.", freq: "täglich" },
    { title: "Stimuluskontrolle anwenden", desc: "Geh nur schläfrig ins Bett und steh auf, wenn du nach etwa 15 bis 20 Minuten nicht einschläfst. Nutze das Bett nicht für Handy, Laptop oder Fernsehen.", freq: "täglich" },
    { title: "Koffein-Grenze", desc: "Trinke ab 14 Uhr keine koffeinhaltigen Getränke mehr und beobachte im Schlaftagebuch, ob sich etwas verändert.", freq: "täglich" },
    { title: "Abschaltritual", desc: "Mache die angeleitete Abendübung mit Gedankenliste und 4-6-Atmung.", freq: "5× diese Woche" },
    { title: "Morgenlicht", desc: "Geh innerhalb der ersten Stunde nach dem Aufstehen für mindestens zehn Minuten nach draußen ins Tageslicht.", freq: "5× diese Woche" },
    { title: "Wochenbilanz Schlafeffizienz", desc: "Berechne am Ende der Woche deine durchschnittliche Schlafeffizienz. Liegt sie dauerhaft deutlich unter 85 % oder schläfst du seit Monaten schlecht, sprich mit deiner Hausarztpraxis über KVT-I.", freq: "einmalig" }
  ],
  reflection: [
    "Welche Gedanken gehen dir typischerweise durch den Kopf, wenn du nachts wach liegst?",
    "Was hast du bisher getan, um schlechten Schlaf auszugleichen, und was davon könnte nach dem Zwei-Prozess-Modell eher geschadet haben?",
    "Wie hängen in deinen Check-ins Schlaf, Stimmung und Stress zusammen?",
    "Welche eine Veränderung rund um deinen Schlaf möchtest du über diese Woche hinaus beibehalten?"
  ],
  quiz: [
    {
      q: "Was beschreibt Prozess S im Zwei-Prozess-Modell von Borbély?",
      options: ["Die innere Uhr mit einem 24-Stunden-Rhythmus", "Den Schlafdruck, der mit der Wachzeit ansteigt und im Schlaf abgebaut wird", "Die Schlafphasen REM und Non-REM", "Den Einfluss von Stresshormonen auf den Schlaf"],
      correct: 1,
      explain: "Prozess S ist der homöostatische Schlafdruck. Er steigt während des Wachseins und sinkt im Schlaf. Prozess C ist der circadiane Rhythmus [[borbely1982]]."
    },
    {
      q: "Du lagst 8 Stunden im Bett und hast davon 6 Stunden geschlafen. Wie hoch ist deine Schlafeffizienz?",
      options: ["60 %", "75 %", "85 %", "133 %"],
      correct: 1,
      explain: "Schlafeffizienz = Schlafzeit ÷ Bettzeit × 100, also 6 ÷ 8 × 100 = 75 %. Als Ziel gilt ein Wert von 85 % oder mehr. Die KVT-I verbessert die Schlafeffizienz nachweislich [[trauer2015]]."
    },
    {
      q: "Was ist laut europäischer Leitlinie die Behandlung der ersten Wahl bei chronischer Insomnie?",
      options: ["Schlafmittel als Dauertherapie", "Schlafhygiene-Regeln allein", "Kognitive Verhaltenstherapie für Insomnie (KVT-I)", "Ein Glas Wein vor dem Schlafengehen"],
      correct: 2,
      explain: "Die europäische Leitlinie empfiehlt KVT-I als Erstbehandlung bei Erwachsenen [[riemann2017]]. Schlafhygiene allein reicht bei echter Insomnie meist nicht aus [[irish2015]]."
    },
    {
      q: "Was zeigte die Studie von Drake und Kollegen zu Koffein?",
      options: ["Koffein wirkt nur bis zu einer Stunde nach der Einnahme.", "Selbst sechs Stunden vor dem Zubettgehen eingenommen, verkürzte Koffein die Schlafdauer um mehr als eine Stunde.", "Koffein verbessert die Tiefschlafqualität.", "Koffein hat am Abend keinen messbaren Einfluss auf den Schlaf."],
      correct: 1,
      explain: "Auch sechs Stunden vor dem Schlafengehen eingenommen, reduzierte Koffein die objektiv gemessene Schlafzeit um mehr als eine Stunde [[drake2013]]."
    }
  ],
  refs: ["borbely1982", "hirshkowitz2015", "scott2021", "freeman2017", "riemann2017", "trauer2015", "bootzin1972", "spielman1987", "irish2015", "drake2013", "ebrahim2013"]
});
