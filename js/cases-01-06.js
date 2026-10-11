/* Klarsinn – Interaktive Fallstudien Module 1–6 */
window.KS_CASES = window.KS_CASES || [];

/* ===================================================================== */
/* MODUL 1 – ANKOMMEN                                                     */
/* ===================================================================== */
window.KS_CASES.push({
  n: 1,
  title: "Deniz und der große Neustart",
  person: "Deniz, 34, Erzieher in einer Kita, lebt allein, frisch getrennt",
  intro: "Deniz sitzt an einem Sonntagabend am Küchentisch und schreibt eine Liste. Ab morgen will er alles anders machen: jeden Tag um sechs aufstehen, joggen, meditieren, kein Handy nach 21 Uhr, Tagebuch schreiben, weniger Bier am Wochenende. Seit der Trennung vor vier Monaten fühlt er sich wie in Watte. Bei der Arbeit funktioniert er, die Kinder mögen ihn, aber abends ist er leer und am Wochenende liegt er viel auf dem Sofa. Krank fühlt er sich nicht, gut aber auch nicht. Eine Kollegin hat ihm Klarsinn empfohlen, und Deniz hat sich vorgenommen, diesmal „richtig durchzuziehen“. Er kennt sich: Im Januar hatte er schon einmal mit dem Laufen begonnen und nach zehn Tagen aufgehört, weil er an einem Tag krank war und danach „sowieso alles kaputt“ schien. Jetzt liegt die neue Liste vor ihm, sieben Punkte lang, und er spürt gleichzeitig Aufbruchsstimmung und ein leises Ziehen im Magen, weil er ahnt, wie das ausgehen könnte. Er öffnet die erste Woche des Programms.",
  steps: [
    {
      situation: "Im Programm stößt Deniz auf die Frage, wie es ihm eigentlich geht. Er zögert. „Ganz okay“, würde er sagen, wenn ihn jemand fragt. Gleichzeitig merkt er, dass er seit Wochen kaum etwas mit Freude macht und morgens schwer aus dem Bett kommt. Er überlegt, ob er die Standortbestimmung überspringen und direkt mit seiner Liste starten soll, denn Fragebögen findet er eher lästig. Andererseits weiß er nicht genau, wo er überhaupt steht.",
      question: "Womit sollte Deniz am sinnvollsten beginnen?",
      options: [
        { t: "Er füllt den WHO-5 aus und beginnt einen kurzen täglichen Check-in, um seinen Ausgangspunkt zu kennen.", score: 2, fb: "Der WHO-5 ist ein kurzer, gut untersuchter Fragebogen zum Wohlbefinden und eignet sich, um einen Ausgangswert festzuhalten und später Veränderungen zu sehen [[topp2015]]. Er macht außerdem sichtbar, dass Wohlbefinden eine eigene Dimension ist: Man kann „nicht krank“ und trotzdem wenig aufblühend sein [[keyes2002]]. Ein täglicher Check-in schärft den Blick für Muster, statt sich auf das Bauchgefühl zu verlassen." },
        { t: "Er überspringt die Messung und startet sofort mit allen sieben Vorsätzen, solange die Motivation hoch ist.", score: 0, fb: "Die Anfangsmotivation fühlt sich stark an, trägt aber selten. Ohne Ausgangswert weiß Deniz später nicht, ob sich etwas verändert hat, und sieben gleichzeitige Vorhaben überfordern die Selbststeuerung. Gewohnheiten entstehen durch Wiederholung in stabilen Situationen, nicht durch einen großen Kraftakt [[wood2007]]." },
        { t: "Er schreibt in ein paar Sätzen auf, wie es ihm geht, und verzichtet auf den Fragebogen.", score: 1, fb: "Freies Schreiben hilft, die eigene Lage in Worte zu fassen, und ist ein guter Anfang. Es lässt sich aber schlecht vergleichen, wenn Deniz in einigen Wochen wissen will, ob sich sein Befinden verändert hat. Ein standardisiertes Maß wie der WHO-5 ergänzt das sinnvoll [[topp2015]]." }
      ]
    },
    {
      situation: "Deniz erreicht beim WHO-5 einen eher niedrigen Wert. Das erschreckt ihn ein wenig, aber es passt zu dem, was er spürt. Im Text liest er, dass niedrige Werte ein Anlass sein können, genauer hinzuschauen. Er hat keine Gedanken, sich etwas anzutun, schläft aber unruhig und hat wenig Appetit. Nun will er seine Liste kürzen, weiß aber nicht, nach welchem Prinzip. Laufen und Meditieren klingen beide wichtig.",
      question: "Wie geht Deniz am besten mit seiner Vorsatzliste um?",
      options: [
        { t: "Er streicht alles bis auf zwei Vorsätze, die er sich am meisten vornimmt, und nimmt sich dafür jeden Tag eine Stunde.", score: 1, fb: "Die Reduktion ist ein richtiger Schritt. Eine Stunde täglich ist für jemanden, der abends erschöpft ist, aber eine hohe Hürde. Konkrete, erreichbare Ziele wirken besser als anspruchsvolle, aber vage Pläne, wenn die Kapazität begrenzt ist [[locke2002]]." },
        { t: "Er wählt ein kleines Verhalten, das ihm selbst wichtig ist, etwa zehn Minuten Spaziergang nach der Arbeit, und knüpft es an eine feste Situation.", score: 2, fb: "Ein kleines, selbst gewähltes Verhalten in einem stabilen Kontext ist die beste Grundlage für eine Gewohnheit [[lally2010]]. Ziele, die zu den eigenen Werten passen, werden ausdauernder verfolgt als Ziele aus Pflichtgefühl [[sheldon1999]]. Wichtig ist auch, die niedrigen Werte im Blick zu behalten und bei anhaltender Niedergeschlagenheit ärztlichen Rat zu suchen." },
        { t: "Er behält alle Punkte, denn wer sich wenig vornimmt, erreicht auch wenig.", score: 0, fb: "Viele gleichzeitige Vorsätze erhöhen die Wahrscheinlichkeit, dass alle scheitern, und das Scheitern schwächt die Selbstwirksamkeit [[bandura1977]]. Gerade nach einer belastenden Trennung braucht Deniz Erfolgserlebnisse, nicht eine Liste, die ihn täglich an das erinnert, was er nicht geschafft hat." }
      ]
    },
    {
      situation: "Deniz hat sich für den Spaziergang nach der Arbeit entschieden. Am ersten Tag klappt es gut. Am zweiten Tag regnet es, und als er nach Hause kommt, landet er direkt auf dem Sofa. Er merkt, dass „nach der Arbeit“ zu ungenau ist: Zwischen Kita und Sofa liegen nur fünf Minuten Weg, und das Sofa gewinnt. Er will den Plan robuster machen.",
      question: "Wie macht Deniz seinen Plan alltagstauglicher?",
      options: [
        { t: "Er nimmt sich vor, sich stärker zusammenzureißen, und schreibt „Disziplin!“ auf einen Zettel an der Tür.", score: 0, fb: "Willenskraft allein ist eine unzuverlässige Strategie, besonders wenn man müde ist. Appelle an die eigene Disziplin verändern die Situation nicht, in der das alte Verhalten automatisch abläuft [[wood2007]]. Hilfreicher ist es, den Auslöser und das Hindernis konkret zu planen." },
        { t: "Er verschiebt den Spaziergang auf das Wochenende, wenn er mehr Zeit hat.", score: 1, fb: "Das nimmt Druck heraus, löst aber das eigentliche Problem nicht. Seltene Wiederholungen ohne festen Auslöser lassen kaum eine Gewohnheit entstehen [[lally2010]]. Besser ist es, den Alltagsplan so umzubauen, dass er auch an schwierigen Tagen trägt." },
        { t: "Er formuliert einen Wenn-dann-Plan und einen Hindernis-Plan: „Wenn ich die Kita verlasse, gehe ich die Runde durch den Park. Wenn es regnet, nehme ich den Schirm aus dem Spind.“", score: 2, fb: "Wenn-dann-Pläne verknüpfen eine konkrete Situation mit einer Handlung und erhöhen die Umsetzung deutlich [[gollwitzer2006]]. Wer zusätzlich das wahrscheinlichste Hindernis vorab benennt und eine Antwort darauf plant, bleibt eher dran [[oettingen2015]]. Der Auslöser liegt jetzt vor dem Sofa, nicht danach." }
      ]
    },
    {
      situation: "Nach zwölf Tagen hat Deniz zehnmal seine Runde gedreht. Dann bekommt er eine Erkältung und setzt drei Tage aus. Am vierten Tag hört er die alte Stimme: „Siehst du, wie im Januar. Du ziehst nie etwas durch.“ Er ist kurz davor, das Programm abzubrechen. Gleichzeitig merkt er, dass die Spaziergänge ihm gutgetan haben und sein Check-in an diesen Tagen etwas besser ausfiel.",
      question: "Was hilft Deniz jetzt am meisten?",
      options: [
        { t: "Er macht einfach weiter, wo er aufgehört hat, und erinnert sich daran, dass einzelne Aussetzer den Aufbau einer Gewohnheit kaum zurückwerfen.", score: 2, fb: "In der Gewohnheitsstudie von Lally und Kolleginnen hatte ein verpasster Tag keinen nennenswerten Einfluss auf den Verlauf, und die Automatisierung brauchte meist deutlich länger als drei Wochen [[lally2010]]. Ein Ausrutscher ist kein Rückfall; gefährlich wird erst das „Jetzt ist eh alles egal“ [[marlatt1985]]. Der Blick auf seine Check-in-Daten stützt die Erfahrung, dass es wirkt." },
        { t: "Er beginnt die Zählung von vorn und nimmt sich vor, diesmal 21 Tage ohne Unterbrechung zu schaffen.", score: 0, fb: "Die „21 Tage“ sind ein Mythos, und das Neuanfangen nach jeder Lücke macht aus einer Pause ein Scheitern. Gewohnheiten bauen sich schrittweise auf, auch mit Unterbrechungen [[lally2010]]. Starre Alles-oder-nichts-Regeln erhöhen das Risiko, ganz aufzugeben [[marlatt1985]]." },
        { t: "Er pausiert das Programm, bis er sich wieder richtig fit fühlt.", score: 1, fb: "Krank eine Pause einzulegen ist vernünftig. Ein offenes Ende birgt aber die Gefahr, dass aus der Pause ein Abbruch wird. Ein konkreter Wiedereinstieg, etwa „Am Montag gehe ich die kleine Runde“, hält die Verbindung zum Vorhaben [[gollwitzer2006]]." }
      ]
    }
  ],
  outro: "Deniz geht am Montag wieder seine Runde, zuerst nur die halbe Strecke. Nach sechs Wochen ist der Spaziergang noch nicht völlig automatisch, aber an den meisten Tagen fragt er sich nicht mehr, ob er geht. Sein WHO-5 ist leicht gestiegen, nicht spektakulär, aber spürbar. Die Trennung beschäftigt ihn weiterhin, und an manchen Abenden ist er traurig. Er hat sich vorgenommen, seine Hausärztin anzusprechen, falls der Wert wieder fällt oder die Schlafprobleme bleiben. Seine Siebenerliste liegt noch in der Schublade. Als Nächstes will er einen zweiten kleinen Baustein hinzufügen, aber erst, wenn der erste trägt.",
  principles: [
    "Klein und konkret anfangen: ein selbst gewähltes Verhalten, verknüpft mit einer festen Situation.",
    "Wenn-dann-Pläne und vorab geplante Antworten auf Hindernisse sind wirksamer als Appelle an die Disziplin.",
    "Ein Ausrutscher ist kein Scheitern: Gewohnheiten brauchen Wochen und vertragen Lücken."
  ],
  refs: ["topp2015", "keyes2002", "wood2007", "locke2002", "lally2010", "sheldon1999", "bandura1977", "gollwitzer2006", "oettingen2015", "marlatt1985"]
});

/* ===================================================================== */
/* MODUL 2 – STRESS VERSTEHEN                                            */
/* ===================================================================== */
window.KS_CASES.push({
  n: 2,
  title: "Renate zwischen Büro und Pflege",
  person: "Renate, 52, Teamleiterin in einer Behörde, pflegt ihre demenzkranke Mutter",
  intro: "Renate leitet ein Team von elf Leuten. Seit einem Jahr gibt es eine neue Software, die ständig hakt, zwei Stellen sind unbesetzt, und die Beschwerden landen bei ihr. Nach Dienstschluss fährt sie dreimal pro Woche zu ihrer Mutter, die an einer beginnenden Demenz erkrankt ist, kauft ein, sortiert Tabletten und beantwortet zum fünften Mal dieselbe Frage. Ihr Mann unterstützt sie, so gut er kann, arbeitet aber selbst im Schichtdienst. Renate merkt, dass sie gereizter geworden ist. Sie hat seit Monaten Nackenschmerzen, wacht gegen vier Uhr auf und denkt an die Arbeit. Am Wochenende kann sie kaum abschalten, weil das Diensthandy auf dem Küchentisch liegt. Vor Kurzem hat sie im Auto an einer roten Ampel geweint, ohne genau zu wissen, warum. Sie sagt sich, dass andere es auch schaffen und sie sich nicht so anstellen soll. Eine Freundin hat ihr geraten, „einfach mal weniger zu machen“. Renate hat gelacht, weil sie nicht weiß, was sie weglassen könnte.",
  steps: [
    {
      situation: "Renate beginnt das Modul „Stress verstehen“. Sie liest über die Stressreaktion und erkennt sich in vielem wieder: Herzklopfen bei bestimmten E-Mails, flacher Atem, der verspannte Nacken. Sie fragt sich, ob mit ihr etwas nicht stimmt. Gleichzeitig hat sie das Gefühl, dass alles gleichzeitig auf sie einprasselt und sie gar nicht mehr unterscheiden kann, was sie eigentlich so belastet. Abends liegt sie wach und fühlt sich wie ein Gerät, bei dem alle Lämpchen gleichzeitig blinken.",
      question: "Was ist jetzt der hilfreichste erste Schritt?",
      options: [
        { t: "Sie sucht im Internet nach Stresstests und vergleicht sich mit anderen Menschen in ihrem Alter.", score: 0, fb: "Vergleiche mit anderen beantworten nicht die Frage, was Renate konkret belastet und was sie beeinflussen kann. Stress entsteht im Zusammenspiel von Anforderungen und eigener Bewertung der Ressourcen [[lazarus1984]]. Dafür braucht sie einen Blick auf ihre eigene Situation, nicht auf Durchschnittswerte." },
        { t: "Sie legt eine Stress-Landkarte an: Welche Belastungen gibt es, wie bewertet sie diese und welche Ressourcen hat sie jeweils?", score: 2, fb: "Das transaktionale Stressmodell beschreibt Stress als Ergebnis zweier Bewertungen: Ist das bedrohlich? Und reichen meine Mittel? [[lazarus1984]]. Eine Landkarte trennt das Knäuel in einzelne Fäden und zeigt, wo Renate handeln kann und wo sie eher Entlastung braucht. Dass ihr Körper reagiert, ist keine Schwäche, sondern eine normale Anpassungsreaktion, die bei Dauerbelastung zur Last werden kann [[mcewen1998]]." },
        { t: "Sie beschließt, die Symptome erst einmal auszuhalten, bis die Stellen wieder besetzt sind.", score: 1, fb: "Die Hoffnung auf Entlastung ist realistisch, aber unbestimmt. Anhaltende Belastung ohne Erholung kann die allostatische Last erhöhen, also den Verschleiß durch dauernde Anpassung [[mcewen1998]]. Abwarten ist nur sinnvoll, wenn sie in der Zwischenzeit gezielt für Erholung sorgt." }
      ]
    },
    {
      situation: "Auf der Landkarte stehen nun: Software-Probleme, Personalmangel, Beschwerden, die Pflege der Mutter, das ständige Erreichbarsein. Renate sieht, dass sie die Software nicht ändern kann, wohl aber, wie viele Termine sie bei ihrer Mutter selbst übernimmt. Beim Durchlesen fällt ihr ein Gedanke auf, der fast überall mitschwingt: „Wenn ich das nicht mache, bricht alles zusammen.“ Morgen steht ein schwieriges Gespräch mit der Abteilungsleitung an.",
      question: "Wie kann Renate mit der Bewertung ihrer Lage arbeiten?",
      options: [
        { t: "Sie prüft für jede Belastung, was davon veränderbar ist, plant einen kleinen Problemschritt und deutet ihre Aufregung vor dem Gespräch als Energie, die ihr hilft.", score: 2, fb: "Die Unterscheidung zwischen veränderbaren und nicht veränderbaren Belastungen lenkt die Kraft dahin, wo sie wirkt [[lazarus1984]]. Die Neubewertung der Erregung als funktional führte im Labor zu einer günstigeren Herz-Kreislauf-Reaktion [[jamieson2012]], und ein Verständnis von Stress als auch förderlich ging mit weniger Beschwerden einher [[crum2013]]. Das ändert nicht die Lage, aber ihren Umgang damit." },
        { t: "Sie sagt sich vor dem Gespräch immer wieder, dass sie ruhig bleiben muss und die Aufregung nicht zeigen darf.", score: 0, fb: "Der Versuch, Erregung zu unterdrücken, kostet zusätzliche Kraft und verstärkt oft das Gefühl, bedroht zu sein. Studien zeigen, dass es günstiger ist, die Erregung als Vorbereitung des Körpers auf eine Herausforderung zu verstehen [[jamieson2012]]. Herzklopfen ist hier ein Zeichen von Mobilisierung, nicht von Versagen." },
        { t: "Sie nimmt sich vor, positiver zu denken und sich zu sagen, dass alles halb so schlimm ist.", score: 1, fb: "Eine wohlwollende Haltung kann helfen, doch Schönreden passt nicht zu ihrer tatsächlichen Doppelbelastung und wirkt oft nicht glaubwürdig. Wirksamer ist eine realistische Neubewertung: Was ist bedrohlich, was ist herausfordernd, was kann ich beeinflussen [[lazarus1984]]?" }
      ]
    },
    {
      situation: "Das Gespräch verläuft besser als befürchtet: Eine Vertretung wird zugesagt. Mit ihrem Bruder vereinbart Renate, dass er einen der drei Besuche bei der Mutter übernimmt. Trotzdem schaltet sie abends kaum ab. Das Diensthandy liegt neben dem Teller, und auch beim Fernsehen kreisen ihre Gedanken um offene Vorgänge. Am Sonntag hat sie „frei“, fühlt sich danach aber nicht erholt. Ihr Mann sagt, sie sei „körperlich da, aber im Kopf im Büro“.",
      question: "Wie kann Renate ihre freie Zeit erholsamer gestalten?",
      options: [
        { t: "Sie nutzt die freie Zeit, um liegengebliebene Mails abzuarbeiten, damit der Montag leichter wird.", score: 0, fb: "Das verschiebt die Arbeit nur in die Erholungszeit. Gedankliches Abschalten von der Arbeit ist eine der wichtigsten Erholungserfahrungen, und ständige Erreichbarkeit erschwert genau das [[sonnentag2007]]. Ohne echte Erholung baut sich die Belastung über die Woche weiter auf [[sonnentag2018]]." },
        { t: "Sie legt sich mehr aufs Sofa, weil Ruhe die beste Erholung ist.", score: 1, fb: "Entspannung ist eine von vier Erholungserfahrungen, aber nicht die einzige [[sonnentag2007]]. Passives Liegen bei weiter kreisenden Gedanken erholt oft weniger als erwartet. Abschalten, Entspannen, etwas Neues meistern und selbst über die Zeit bestimmen ergänzen sich." },
        { t: "Sie führt ein Feierabend-Ritual ein: Diensthandy in die Schublade, eine Notiz für morgen, dann etwas, das sie wirklich abschalten lässt, etwa ihr Chor am Donnerstag.", score: 2, fb: "Ein Ritual markiert die Grenze zwischen Arbeit und Freizeit und erleichtert das gedankliche Abschalten [[sonnentag2007]]. Der Chor bietet zugleich Entspannung, Mastery und Selbstbestimmung, also mehrere Erholungserfahrungen auf einmal. Erholung in der freien Zeit schützt nachweislich vor den Folgen hoher Arbeitsanforderungen [[sonnentag2018]]." }
      ]
    },
    {
      situation: "Nach drei Wochen geht es Renate etwas besser, das Aufwachen um vier ist seltener. Beim Burnout-Check im Modul fällt ihr aber auf, dass sie sich der Arbeit innerlich entfremdet fühlt und Bürgerinnen und Bürger manchmal als „Fälle“ wahrnimmt, was ihr früher fremd war. Sie ist zynischer geworden. Auch die Erschöpfung ist nicht weg. Sie fragt sich, ob das noch normaler Stress ist.",
      question: "Wie sollte Renate mit diesem Befund umgehen?",
      options: [
        { t: "Sie wertet die Ergebnisse als Warnsignal, spricht mit ihrer Hausärztin und prüft, ob der betriebliche Gesundheitsdienst oder eine Beratung sie entlasten kann.", score: 2, fb: "Anhaltende Erschöpfung, Zynismus und Distanz zur Arbeit sind Kernmerkmale von Burnout [[maslach2016]]. Das Programm kann Erholung und Umgang mit Stress fördern, ersetzt aber keine ärztliche oder psychotherapeutische Abklärung. Frühe Unterstützung verhindert, dass sich die Belastung weiter verfestigt, und berücksichtigt auch die Arbeitsbedingungen, die nicht allein Renates Aufgabe sind [[bakker2007]]." },
        { t: "Sie nimmt sich vor, die Übungen aus dem Programm noch konsequenter zu machen, denn dann wird es schon besser.", score: 1, fb: "Die Übungen helfen ihr bereits, und dranzubleiben ist gut. Burnout entsteht aber wesentlich aus einem Missverhältnis zwischen Anforderungen und Ressourcen, das individuelle Techniken allein nicht auflösen [[maslach2016]]. Eine fachliche Einschätzung wäre hier ein wichtiger zusätzlicher Schritt." },
        { t: "Sie schiebt die Gedanken beiseite, schließlich hat sie schon schwierigere Zeiten erlebt.", score: 0, fb: "Frühere Bewältigung ist eine Ressource, doch das Ignorieren von Warnsignalen erhöht das Risiko, dass sich Erschöpfung chronifiziert [[maslach2016]]. Die Kombination aus Dauerbelastung und fehlender Erholung zeigt sich oft erst spät in körperlichen und psychischen Folgen [[mcewen1998]]." }
      ]
    }
  ],
  outro: "Renate geht zu ihrer Hausärztin, die sie für zwei Wochen krankschreibt und ihr eine psychosoziale Beratungsstelle für pflegende Angehörige nennt. Dort erfährt sie von Entlastungsleistungen, die ihre Mutter zusätzlich nutzen kann. Zurück im Büro übernimmt die Vertretung einen Teil der Beschwerden. Die Software hakt weiterhin, und an manchen Tagen ist die alte Gereiztheit wieder da. Doch Renate merkt früher, wann sie gegensteuern muss. Das Diensthandy bleibt nach 18 Uhr in der Schublade, und donnerstags singt sie wieder. Sie hat verstanden, dass ihr Stress kein persönliches Versagen ist, sondern eine Rechnung mit mehreren Posten.",
  principles: [
    "Stress entsteht aus Anforderungen und ihrer Bewertung: Eine Landkarte trennt Veränderbares von Nicht-Veränderbarem.",
    "Körperliche Erregung lässt sich als Mobilisierung deuten, statt sie zu bekämpfen.",
    "Erholung braucht echtes Abschalten; anhaltende Erschöpfung und Zynismus gehören fachlich abgeklärt."
  ],
  refs: ["lazarus1984", "mcewen1998", "jamieson2012", "crum2013", "sonnentag2007", "sonnentag2018", "maslach2016", "bakker2007"]
});

/* ===================================================================== */
/* MODUL 3 – DEN KÖRPER BERUHIGEN                                        */
/* ===================================================================== */
window.KS_CASES.push({
  n: 3,
  title: "Lea und das Herzrasen im Hörsaal",
  person: "Lea, 22, Lehramtsstudentin im fünften Semester, jobbt nebenbei in einem Café",
  intro: "Lea sitzt in der Bibliothek, als es zum ersten Mal passiert. Ihr Herz rast plötzlich, die Hände kribbeln, sie bekommt das Gefühl, nicht genug Luft zu kriegen. Ihr wird schwindelig, und ein Gedanke schießt durch den Kopf: „Ich kippe gleich um.“ Sie rennt nach draußen, setzt sich auf eine Bank, und nach etwa einer Viertelstunde ist es vorbei. Zurück bleibt eine tiefe Erschöpfung und die Angst, dass es wieder passiert. Zwei Wochen später, in einer vollen Vorlesung, kommt das Herzrasen erneut. Seitdem setzt sich Lea nur noch in die letzte Reihe, nah am Ausgang. Sie trinkt keinen Kaffee mehr und meidet die Bibliothek. Die Prüfungsphase rückt näher, und im Café hat sie mehr Schichten übernommen, weil das Geld knapp ist. Ihre Mitbewohnerin meint, sie solle „einfach mal tief durchatmen“. Lea hat es versucht, und es wurde schlimmer: Je tiefer sie atmete, desto schwindliger wurde ihr. Jetzt hofft sie, dass das Modul ihr etwas Brauchbareres bietet.",
  steps: [
    {
      situation: "Bevor Lea mit den Übungen beginnt, liest sie im Modul, dass starke körperliche Beschwerden zunächst ärztlich abgeklärt werden sollten. Sie ist unsicher. Einerseits glaubt sie, dass „es nur die Psyche“ ist. Andererseits hat sie in den Momenten wirklich Angst um ihr Herz, und in ihrer Familie gibt es Herzprobleme. Ihren Hausarzt hat sie seit Jahren nicht gesehen, und ein Termin kostet sie eine Schicht im Café.",
      question: "Was sollte Lea jetzt tun?",
      options: [
        { t: "Sie lässt die Beschwerden einmal hausärztlich abklären und beginnt parallel mit den Atem- und Erdungsübungen.", score: 2, fb: "Herzrasen, Atemnot und Schwindel können viele Ursachen haben, deshalb gehört eine erste Abklärung dazu, besonders bei familiärer Vorbelastung. Ein unauffälliger Befund nimmt der Angst vor dem Herzinfarkt oft viel Kraft. Die Übungen schaden in der Zwischenzeit nicht; Panik ist eine heftige, aber nicht gefährliche Alarmreaktion des Körpers [[craig2002]]." },
        { t: "Sie wartet ab, ob es noch einmal passiert, und entscheidet dann.", score: 1, fb: "Abwarten ist verständlich, lässt aber die Unsicherheit bestehen, die ihre Angst weiter nährt. Gerade die Frage „Ist mit meinem Herzen etwas nicht in Ordnung?“ verstärkt die Aufmerksamkeit für Körpersignale. Eine Abklärung jetzt schafft eine bessere Grundlage für die Übungen." },
        { t: "Sie sucht im Internet nach ihren Symptomen, um herauszufinden, was sie hat.", score: 0, fb: "Symptomsuchen im Netz liefern meist eine Mischung aus harmlosen und bedrohlichen Erklärungen und steigern bei ängstlichen Menschen häufig die Sorge. Was Lea braucht, ist eine fachliche Einschätzung und ein Verständnis der Alarmreaktion ihres Körpers [[craig2002]]." }
      ]
    },
    {
      situation: "Der Hausarzt findet keinen organischen Befund und erklärt ihr, was bei einer Panikattacke im Körper passiert. Lea ist erleichtert, aber die Angst vor der nächsten Attacke bleibt. Sie liest im Modul über das autonome Nervensystem, Gaspedal und Bremse, und erkennt, warum ihr das tiefe Durchatmen nicht geholfen hat: Sie hat schnell und tief geatmet, was den Schwindel eher verstärkt hat.",
      question: "Welche Atemübung passt jetzt am besten zu Lea?",
      options: [
        { t: "Sie atmet in akuten Momenten möglichst tief und kräftig in eine Tüte, wie sie es in einem Film gesehen hat.", score: 0, fb: "Das Atmen in eine Tüte wird heute nicht mehr empfohlen, und forciertes Tiefatmen kann Schwindel und Kribbeln verstärken. Entscheidend ist nicht die Menge der Luft, sondern ein ruhiger, verlangsamter Rhythmus mit langer Ausatmung [[zaccaro2018]]." },
        { t: "Sie übt täglich fünf Minuten zyklisches Seufzen, zweimal einatmen und lang ausatmen, und verlangsamt so ihren Atem auch außerhalb von Krisen.", score: 2, fb: "Langsames Atmen mit betonter Ausatmung aktiviert die beruhigende Seite des Nervensystems [[zaccaro2018]]. In einer randomisierten Studie steigerten fünf Minuten täglicher Atemübung den positiven Affekt, beim zyklischen Seufzen besonders deutlich [[balban2023]]. Wer regelmäßig in ruhigen Momenten übt, kann die Technik unter Anspannung leichter abrufen." },
        { t: "Sie wendet die Atemübung nur dann an, wenn eine Panikattacke beginnt.", score: 1, fb: "Die Übung im akuten Moment einzusetzen ist richtig. Ohne vorheriges Training ist sie unter starker Angst aber schwer umzusetzen. Regelmäßiges Üben in ruhigen Phasen macht die Technik zugänglich, wenn sie gebraucht wird [[balban2023]]." }
      ]
    },
    {
      situation: "Lea übt seit zehn Tagen täglich. In der Vorlesung spürt sie wieder, wie ihr Herz schneller schlägt. Diesmal ist es weniger heftig, aber ihre Gedanken springen sofort zu „Gleich passiert es wieder“. Sie sitzt in der letzten Reihe und überlegt, ob sie gehen soll. Sie erinnert sich an ihr Notfallset aus dem Modul, das sie auf einer kleinen Karte im Federmäppchen notiert hat. Neben ihr schreibt jemand eifrig mit.",
      question: "Was hilft Lea in diesem Moment am meisten?",
      options: [
        { t: "Sie bleibt sitzen, atmet langsam mit verlängerter Ausatmung und nutzt die 5-4-3-2-1-Erdung: Sie benennt still, was sie sieht, hört und spürt.", score: 2, fb: "Erdungsübungen lenken die Aufmerksamkeit von den katastrophisierenden Gedanken auf die Gegenwart und helfen, ins Toleranzfenster zurückzufinden [[siegel1999]]. Zusammen mit langsamer Atmung wirkt das direkt auf das autonome Nervensystem [[zaccaro2018]]. Indem sie bleibt, macht sie die Erfahrung, dass die Welle von selbst abklingt." },
        { t: "Sie verlässt den Hörsaal sofort, um eine Attacke zu verhindern.", score: 0, fb: "Kurzfristig bringt Flucht Erleichterung, langfristig bestätigt sie die Überzeugung, dass die Situation gefährlich war. So wird Vermeidung zum Teil des Problems und schränkt Leas Alltag weiter ein [[craig2002]]. Die Erfahrung, dass die Angst auch ohne Flucht nachlässt, ist entscheidend." },
        { t: "Sie lenkt sich mit dem Handy ab, bis das Herzklopfen vorbei ist.", score: 1, fb: "Ablenkung kann kurzfristig helfen und ist besser als Flucht. Sie kann aber auch zu einer subtilen Form der Vermeidung werden, wenn Lea glaubt, nur dank des Handys „überlebt“ zu haben. Erdung richtet die Aufmerksamkeit bewusst auf das Hier und Jetzt, statt sie wegzuziehen [[siegel1999]]." }
      ]
    },
    {
      situation: "Die Panikattacken werden seltener. In der Prüfungswoche aber spürt Lea eine Dauerspannung: Kiefer zusammengebissen, Schultern hochgezogen, abends ist sie zu aufgedreht zum Einschlafen. Sie hat kaum Zeit, und eine halbe Stunde Entspannung am Stück erscheint ihr unmöglich. Ihre Kommilitonin schwört auf eine einstündige geführte Meditation. Lea hat drei Klausuren in neun Tagen und zwischendurch zwei Spätschichten. Sie spürt, dass sie etwas braucht, das in diesen vollen Alltag passt.",
      question: "Wie kann Lea ihre Körperspannung im Prüfungsstress am besten regulieren?",
      options: [
        { t: "Sie wartet mit Entspannungsübungen, bis die Prüfungen vorbei sind und sie wieder Zeit hat.", score: 0, fb: "Gerade unter hoher Belastung ist Regulation wichtig, und sie muss nicht viel Zeit kosten. Wer die Anspannung über Wochen aufstaut, riskiert Schlafprobleme und erneute Panik. Bereits wenige Minuten wirken nachweislich [[balban2023]]." },
        { t: "Sie probiert die einstündige Meditation, auch wenn sie dafür Lernzeit opfern muss.", score: 1, fb: "Meditation kann hilfreich sein, doch eine lange Einheit passt schlecht in ihren Alltag und wird vermutlich nicht durchgehalten. Entspannung muss nicht lang sein, um zu wirken [[balban2023]]. Kurze, regelmäßige Einheiten sind für Lea realistischer." },
        { t: "Sie baut kurze Mikro-Pausen ein: zwischen den Lerneinheiten eine Kurzform der progressiven Muskelentspannung, abends ein paar Minuten zyklisches Seufzen.", score: 2, fb: "Die progressive Muskelentspannung lehrt, Anspannung bewusst wahrzunehmen und loszulassen [[jacobson1938]], und reduziert nachweislich Angst [[manzoni2008]]. Kurze Einheiten lassen sich gut in einen vollen Tag einbauen und bauen die Anspannung ab, bevor sie sich aufstaut. Das zyklische Seufzen am Abend unterstützt das Herunterfahren vor dem Schlaf [[balban2023]]." }
      ]
    }
  ],
  outro: "Lea schreibt ihre Prüfungen. Bei einer spürt sie kurz das vertraute Herzrasen, atmet langsam aus und findet zurück zur Aufgabe. Die Bibliothek besucht sie wieder, anfangs nur für eine Stunde. Kaffee trinkt sie erneut, aber nicht nach dem Mittag. Die Angst vor der Angst ist nicht ganz verschwunden, und an schlechten Tagen setzt sie sich noch in die Nähe der Tür. Sie hat sich vorgenommen, sich an die psychologische Beratungsstelle ihrer Hochschule zu wenden, falls die Attacken wieder häufiger werden. Ihre Mitbewohnerin hat inzwischen gelernt, dass „tief durchatmen“ nicht dasselbe ist wie „langsam ausatmen“.",
  principles: [
    "Starke Körpersymptome zuerst ärztlich abklären lassen; ein Verständnis der Alarmreaktion nimmt ihr den Schrecken.",
    "Langsam und lang ausatmen statt tief einatmen, und regelmäßig üben, bevor es ernst wird.",
    "Erdung und kurze Entspannungseinheiten helfen, in der Situation zu bleiben, statt zu flüchten."
  ],
  refs: ["craig2002", "zaccaro2018", "balban2023", "siegel1999", "jacobson1938", "manzoni2008"]
});

/* ===================================================================== */
/* MODUL 4 – ERHOLSAMER SCHLAF                                           */
/* ===================================================================== */
window.KS_CASES.push({
  n: 4,
  title: "Werner und die langen Nächte",
  person: "Werner, 67, pensionierter Elektromeister, seit einem Jahr verwitwet",
  intro: "Seit seine Frau Gisela gestorben ist, schläft Werner schlecht. Anfangs war das die Trauer, und er hat es hingenommen. Inzwischen liegt die Beerdigung über ein Jahr zurück, doch die Nächte sind geblieben. Werner geht gegen neun ins Bett, weil der Abend allein so lang ist. Dann liegt er wach, hört Radio, wälzt sich hin und her. Gegen Mitternacht schläft er ein, wacht um drei auf und bleibt oft bis fünf wach. Um acht steht er auf, weil er „ja sowieso nicht mehr schläft“. Nach dem Mittagessen fallen ihm im Sessel die Augen zu, manchmal für eine ganze Stunde. Abends trinkt er zwei Gläser Rotwein, „damit ich überhaupt müde werde“. Sein Sohn hat ihm vorgeschlagen, mit dem Hausarzt über Schlaftabletten zu sprechen. Werner ist skeptisch, er will nicht abhängig werden. Er hat eher widerwillig mit Klarsinn angefangen, weil seine Schwiegertochter es ihm eingerichtet hat. Jetzt ist er beim Modul über Schlaf angekommen und liest mit wachsendem Interesse.",
  steps: [
    {
      situation: "Im Modul liest Werner, dass das Schlaftagebuch der erste Schritt ist. Er soll eine Woche lang notieren, wann er ins Bett geht, wann er vermutlich einschläft, wie oft er aufwacht und wann er aufsteht. Werner findet das umständlich. Er wisse doch, dass er schlecht schlafe, sagt er sich. Außerdem fürchtet er, dass ihn das Aufschreiben nachts noch mehr wach hält.",
      question: "Wie sollte Werner mit dem Schlaftagebuch umgehen?",
      options: [
        { t: "Er lässt das Tagebuch weg und probiert sofort verschiedene Tipps aus, um keine Zeit zu verlieren.", score: 0, fb: "Ohne Daten weiß Werner nicht, wie viel er tatsächlich schläft und wie viel Zeit er wach im Bett verbringt. Genau diese Zahlen sind die Grundlage für die wirksamen Bausteine der kognitiven Verhaltenstherapie bei Insomnie [[trauer2015]]. Tipps nach dem Zufallsprinzip führen oft zu Enttäuschung." },
        { t: "Er führt das Tagebuch morgens in wenigen Minuten aus der Erinnerung, ohne nachts auf die Uhr zu schauen, und berechnet am Ende der Woche seine Schlafeffizienz.", score: 2, fb: "Das Schlaftagebuch ist ein Kernelement der KVT-I, die als Behandlung der ersten Wahl bei chronischer Insomnie gilt [[riemann2017]]. Die Einträge am Morgen genügen; nächtliches Uhrenschauen würde die Anspannung eher erhöhen [[harvey2002]]. Die Schlafeffizienz zeigt Werner, wie viel seiner Bettzeit er tatsächlich schläft." },
        { t: "Er schreibt jede Nacht genau auf, wann er wach wird, und schaut dafür regelmäßig auf den Wecker.", score: 1, fb: "Die Bereitschaft, genau zu protokollieren, ist gut. Häufiges nächtliches Uhrenschauen steigert aber das Grübeln über den verlorenen Schlaf und hält wach [[harvey2002]]. Ungefähre Schätzungen am Morgen reichen völlig aus." }
      ]
    },
    {
      situation: "Nach einer Woche zeigt das Tagebuch: Werner verbringt etwa elf Stunden im Bett, schläft aber nur gut sechs davon. Dazu kommt fast täglich ein langer Mittagsschlaf. Im Modul liest er über das Zwei-Prozess-Modell: Der Schlafdruck baut sich über den Tag auf und wird durch Nickerchen abgebaut. Werner fragt sich, was er zuerst ändern soll. Am liebsten würde er alles auf einmal angehen, aber er weiß auch, dass er nicht mehr der Jüngste ist.",
      question: "Was ist jetzt der wichtigste Ansatzpunkt?",
      options: [
        { t: "Er legt eine feste Aufstehzeit fest, geht erst ins Bett, wenn er wirklich schläfrig ist, und verkürzt den Mittagsschlaf deutlich.", score: 2, fb: "Der Schlafdruck baut sich mit der Wachzeit auf; ein langer Mittagsschlaf und frühes Zubettgehen schwächen ihn [[borbely1982]]. Eine feste Aufstehzeit stabilisiert den Rhythmus, und nur schläfrig ins Bett zu gehen ist ein Kern der Stimuluskontrolle [[bootzin1972]]. Die Begrenzung der Bettzeit verbessert bei chronischer Insomnie die Schlafqualität [[spielman1987]]." },
        { t: "Er geht noch früher ins Bett, um mehr Schlafgelegenheit zu haben.", score: 0, fb: "Das ist eine typische Falle: Mehr Zeit im Bett bedeutet meist mehr wache Zeit im Bett, nicht mehr Schlaf. Das Bett wird so noch stärker mit Wachliegen verknüpft [[bootzin1972]]. Gerade bei niedriger Schlafeffizienz hilft das Gegenteil [[spielman1987]]." },
        { t: "Er behält seine Zeiten bei, verzichtet aber auf den Rotwein am Abend.", score: 1, fb: "Alkohol erleichtert zwar das Einschlafen, stört aber den Schlaf in der zweiten Nachthälfte [[ebrahim2013]]. Den Wein wegzulassen ist deshalb sinnvoll. Das Kernproblem, die viel zu lange Bettzeit und der lange Mittagsschlaf, bleibt damit jedoch bestehen [[borbely1982]]." }
      ]
    },
    {
      situation: "Werner geht nun gegen halb zwölf ins Bett und steht um halb sieben auf. Den Mittagsschlaf hat er auf zwanzig Minuten begrenzt. Die ersten Tage sind hart, er ist tagsüber müde. Nachts wacht er weiterhin um drei auf und liegt dann wach, denkt an Gisela und an die leere Wohnung. Er weiß nicht, ob er liegen bleiben oder aufstehen soll.",
      question: "Was sollte Werner tun, wenn er nachts wach liegt?",
      options: [
        { t: "Er bleibt liegen, schaltet das Radio ein und hofft, dass er irgendwann wieder einschläft.", score: 1, fb: "Ruhig liegen zu bleiben ist besser, als sich zu ärgern, und Radio kann kurzfristig beruhigen. Langes Wachliegen verstärkt aber die Verknüpfung von Bett und Wachsein [[bootzin1972]]. Wenn er merkt, dass er nicht wieder einschläft, ist Aufstehen der wirksamere Weg." },
        { t: "Wenn er spürt, dass er nicht bald wieder einschläft, steht er auf, setzt sich bei gedämpftem Licht in den Sessel und kehrt erst schläfrig ins Bett zurück.", score: 2, fb: "Das ist die Kernregel der Stimuluskontrolle: Das Bett soll wieder mit Schlaf verknüpft werden, nicht mit Grübeln [[bootzin1972]]. Ein ruhiges Ritual außerhalb des Bettes, etwa Lesen bei gedämpftem Licht, senkt die Anspannung. KVT-I mit diesen Bausteinen wirkt nachweislich auch bei älteren Menschen [[trauer2015]]." },
        { t: "Er nimmt dann eine rezeptfreie Schlaftablette, damit er die Nacht nicht verliert.", score: 0, fb: "Rezeptfreie Schlafmittel lösen das zugrunde liegende Problem nicht und können gerade bei älteren Menschen Benommenheit und Stürze begünstigen. Die Leitlinie empfiehlt KVT-I als Behandlung der ersten Wahl, Medikamente höchstens kurzfristig und nach ärztlicher Rücksprache [[riemann2017]]." }
      ]
    },
    {
      situation: "Nach drei Wochen schläft Werner kompakter, die Schlafeffizienz ist gestiegen. Doch in den wachen Stunden ist es vor allem die Trauer, die ihn beschäftigt. Er weint öfter als früher, hat an wenig Freude und sagt seinem Sohn am Telefon, dass er manchmal denkt, es wäre nicht so schlimm, nicht mehr aufzuwachen. Er meint das „nicht ernst“, aber der Gedanke kommt wieder.",
      question: "Was ist jetzt der wichtigste Schritt?",
      options: [
        { t: "Er konzentriert sich weiter auf den Schlaf, denn wenn er besser schläft, verschwinden auch die dunklen Gedanken.", score: 0, fb: "Schlaf und Stimmung hängen eng zusammen [[scott2021]], doch Gedanken an den Tod dürfen nicht allein mit Schlafübungen beantwortet werden. Anhaltende Trauer mit Freudlosigkeit und solchen Gedanken gehört in fachliche Hände. Ein Selbsthilfeprogramm ersetzt hier keine Behandlung." },
        { t: "Er spricht offen mit seinem Hausarzt über die Gedanken und die Trauer und lässt sich psychotherapeutische Unterstützung vermitteln; in akuten Momenten nutzt er die Telefonseelsorge oder den Notruf.", score: 2, fb: "Gedanken an den Tod sind ein ernstes Signal und sollten immer fachlich besprochen werden, auch wenn sie „nicht ernst“ gemeint sind. Der Hausarzt kann eine Depression abklären und eine Behandlung einleiten; Schlafbehandlung und Psychotherapie ergänzen sich [[riemann2017]]. Die Hilfe-Kontakte aus Modul 1 sind genau für solche Momente da." },
        { t: "Er erzählt seiner Schwiegertochter davon und wartet ab, ob es mit der Zeit besser wird.", score: 1, fb: "Darüber zu sprechen ist ein wichtiger erster Schritt, und soziale Unterstützung schützt [[holtlunstad2010]]. Abwarten reicht bei Gedanken an den Tod aber nicht aus. Eine ärztliche oder psychotherapeutische Einschätzung sollte zeitnah folgen." }
      ]
    }
  ],
  outro: "Werner geht mit seinem Sohn zum Hausarzt. Der nimmt sich Zeit, fragt nach den Gedanken und vermittelt ihm einen Termin in einer psychotherapeutischen Sprechstunde. Dort wird eine depressive Episode im Rahmen der Trauer festgestellt, und Werner beginnt eine Behandlung. Die feste Aufstehzeit behält er bei, auch am Wochenende. Den Rotwein trinkt er nur noch sonntags zum Essen. Manche Nächte sind weiterhin unruhig, besonders rund um Giselas Geburtstag. Aber er liegt nicht mehr stundenlang wach im Bett, und das Bett fühlt sich nicht mehr wie ein Kampfplatz an. Mit einem Nachbarn geht er inzwischen morgens zum Bäcker, im Tageslicht.",
  principles: [
    "Ein Schlaftagebuch zeigt, wo das Problem liegt: oft zu viel wache Zeit im Bett.",
    "Feste Aufstehzeit, nur schläfrig ins Bett und bei langem Wachliegen aufstehen stärken den Schlafdruck und die Verknüpfung von Bett und Schlaf.",
    "Gedanken an den Tod gehören immer zu Ärztin, Arzt oder Psychotherapie; Schlafübungen ersetzen keine Behandlung."
  ],
  refs: ["trauer2015", "riemann2017", "harvey2002", "borbely1982", "bootzin1972", "spielman1987", "ebrahim2013", "scott2021", "holtlunstad2010"]
});

/* ===================================================================== */
/* MODUL 5 – IN BEWEGUNG KOMMEN                                          */
/* ===================================================================== */
window.KS_CASES.push({
  n: 5,
  title: "Malik und der Rückzug",
  person: "Malik, 41, Logistiker, seit drei Monaten arbeitslos, verheiratet, eine Tochter",
  intro: "Als das Lager seines Arbeitgebers geschlossen wurde, verlor Malik nach vierzehn Jahren seine Stelle. Die ersten Wochen hat er Bewerbungen geschrieben und war zuversichtlich. Dann kamen die Absagen, und mit jeder Absage wurde der Tag länger. Inzwischen steht er auf, wenn seine Frau zur Arbeit geht, bringt die neunjährige Amira zur Schule und setzt sich danach vor den Fernseher. Das Fußballtraining der Altherrenmannschaft, zu dem er früher jeden Dienstag ging, lässt er seit Wochen ausfallen. Seinen Freunden schreibt er kaum noch, weil er nicht erzählen will, dass er noch nichts gefunden hat. Er sagt sich, dass er erst wieder etwas unternehmen kann, wenn er sich besser fühlt. Seine Frau macht sich Sorgen und hat ihm Klarsinn ans Herz gelegt. Malik hat die ersten Module halbherzig durchgeklickt. Beim Modul „In Bewegung kommen“ liest er zum ersten Mal von einem Teufelskreis, der ihm erschreckend bekannt vorkommt.",
  steps: [
    {
      situation: "Im Modul wird der Teufelskreis des Rückzugs beschrieben: Wer sich niedergeschlagen fühlt, zieht sich zurück, erlebt dadurch weniger Positives, fühlt sich schlechter und zieht sich weiter zurück. Malik erkennt sich wieder. Gleichzeitig denkt er: „Ich kann doch nicht so tun, als ginge es mir gut.“ Er ist unsicher, wie er anfangen soll. Schon der Gedanke an das Fußballtraining fühlt sich an wie ein Berg, und er merkt, wie er wieder zur Fernbedienung greift.",
      question: "Was wäre jetzt der hilfreichste Gedanke für den Einstieg?",
      options: [
        { t: "Er versteht, dass Handeln der Motivation vorausgehen darf: Er muss sich nicht erst besser fühlen, um etwas zu tun, sondern kann durch Tun die Stimmung verändern.", score: 2, fb: "Das ist der Kern der Verhaltensaktivierung: Der Rückzug verringert positive Verstärkung im Alltag und hält die Niedergeschlagenheit aufrecht [[lewinsohn1974]]. Aktivität wird nach Plan, nicht nach Stimmung aufgenommen [[martell2001]]. Verhaltensaktivierung reduziert depressive Symptome deutlich und ist ähnlich wirksam wie kognitive Verhaltenstherapie [[ekers2014]]." },
        { t: "Er wartet auf einen Tag, an dem er sich motivierter fühlt, und legt dann richtig los.", score: 0, fb: "Genau dieses Warten hält den Teufelskreis in Gang. Motivation folgt bei gedrückter Stimmung oft erst dem Handeln, nicht umgekehrt [[martell2001]]. Je länger der Rückzug dauert, desto weniger positive Erfahrungen gibt es, die die Stimmung heben könnten [[lewinsohn1974]]." },
        { t: "Er nimmt sich vor, wieder positiver zu denken, damit er Lust auf Aktivitäten bekommt.", score: 1, fb: "Die Gedanken spielen eine Rolle, doch bei Rückzug ist der direktere Weg oft über das Verhalten. Wer auf die richtige Einstellung wartet, bleibt leicht im Sessel sitzen [[martell2001]]. Kleine Aktivitäten liefern Erfahrungen, die das Denken von selbst verändern können." }
      ]
    },
    {
      situation: "Malik macht die Aktivitäten-Inventur. Er notiert eine Woche lang, was er tut und wie er sich dabei fühlt. Das Ergebnis ist ernüchternd: viel Fernsehen und Handy, kaum Bewegung, wenig Kontakt. Die einzigen Lichtblicke sind der Schulweg mit Amira und ein Telefonat mit seinem Bruder. Er überlegt, wie er nun Aktivitäten plant. Auf seinem Zettel stehen bereits zwölf Dinge, die er „eigentlich mal wieder“ machen sollte, und allein die Liste macht ihn müde.",
      question: "Wie plant Malik seine ersten Aktivitäten am sinnvollsten?",
      options: [
        { t: "Er plant für jeden Tag ein volles Programm: Joggen, Bewerbungen, Wohnung renovieren und Freunde treffen.", score: 0, fb: "Ein volles Programm überfordert bei gedrückter Stimmung schnell und produziert Misserfolge, die den Rückzug bestätigen. Verhaltensaktivierung arbeitet mit kleinen, abgestuften Schritten [[martell2001]]. Erfolgserlebnisse stärken die Selbstwirksamkeit, Überforderung schwächt sie [[bandura1977]]." },
        { t: "Er sucht sich eine kleine Aktivität aus, die ihm früher Freude oder ein Gefühl von Können gegeben hat, etwa nach dem Schulweg zwanzig Minuten durch den Park gehen, und trägt sie fest in den Kalender ein.", score: 2, fb: "Verhaltensaktivierung setzt auf geplante Aktivitäten, die Freude oder ein Gefühl von Bewältigung bringen [[martell2001]]. Der feste Kalendereintrag nach einem bestehenden Ankerpunkt nutzt die Kraft von Wenn-dann-Plänen [[gollwitzer2006]]. Zeit im Grünen kann zudem das Grübeln verringern [[bratman2015]]." },
        { t: "Er nimmt sich vor, „mehr rauszugehen“, ohne sich festzulegen, wann und wohin.", score: 1, fb: "Die Absicht stimmt, ist aber zu vage, um im Alltag zu greifen. Konkrete Pläne mit festem Zeitpunkt werden deutlich häufiger umgesetzt als allgemeine Vorsätze [[gollwitzer2006]]. Je klarer die Aktivität beschrieben ist, desto leichter fällt der erste Schritt." }
      ]
    },
    {
      situation: "Malik geht seit zwei Wochen fast täglich seine Parkrunde. Er merkt, dass er danach etwas wacher ist. Jetzt überlegt er, zum Fußballtraining zurückzukehren. Gleichzeitig hat er Angst vor den Fragen der anderen: „Und, schon was Neues gefunden?“ Am Dienstag überlegt er, wieder abzusagen und lieber allein zu joggen. Im Gruppenchat hat der Trainer gefragt, ob er wieder dabei ist, und die Nachricht ist seit zwei Tagen unbeantwortet.",
      question: "Wie sollte Malik mit seiner Scheu vor dem Training umgehen?",
      options: [
        { t: "Er joggt lieber allein, denn Bewegung ist Bewegung, egal mit wem.", score: 1, fb: "Bewegung allein hilft der Stimmung schon, das zeigen viele Studien [[schuch2018]]. Doch das Ausweichen vor dem Training ist auch eine Form von Vermeidung, die den sozialen Rückzug weiterführt. Soziale Kontakte sind selbst ein wichtiger Schutzfaktor [[holtlunstad2010]]." },
        { t: "Er bleibt zu Hause, bis er einen neuen Job hat und etwas Positives erzählen kann.", score: 0, fb: "Damit macht er seine Teilhabe von etwas abhängig, das er nicht kontrollieren kann, und verlängert den Rückzug. Vermeidung ist in der Verhaltensaktivierung ein zentraler Ansatzpunkt, weil sie kurzfristig erleichtert, langfristig aber die Stimmung drückt [[martell2001]]. Die Isolation selbst ist ein Gesundheitsrisiko [[holtlunstad2010]]." },
        { t: "Er geht hin und legt sich vorher einen ehrlichen, kurzen Satz zurecht, etwa: „Ich suche noch, heute will ich einfach kicken.“", score: 2, fb: "So nimmt er die Aktivität trotz unangenehmer Gefühle auf und überprüft seine Befürchtung an der Wirklichkeit. Die Kombination aus Bewegung und sozialer Verbundenheit verstärkt die Wirkung auf die Stimmung [[schuch2018]] [[holtlunstad2010]]. Ein vorbereiteter Satz senkt die Hürde und gibt ihm Kontrolle über das Gespräch." }
      ]
    },
    {
      situation: "Das Training tut Malik gut, die Mannschaft reagiert verständnisvoll. Trotzdem merkt er seit Wochen, dass er morgens schwer hochkommt, kaum Appetit hat und sich wertlos fühlt. An manchen Tagen gelingt die Parkrunde nur mit großer Überwindung. Seine Frau fragt, ob er nicht mit jemandem darüber sprechen will. Malik zögert: „Ich mache doch schon so viel.“ Er hat das Gefühl, dass Hilfe zu holen bedeuten würde, versagt zu haben.",
      question: "Was ist jetzt der beste nächste Schritt?",
      options: [
        { t: "Er erhöht die Trainingsmenge, weil Bewegung ihm ja hilft.", score: 0, fb: "Bewegung wirkt, ersetzt aber bei anhaltenden depressiven Symptomen keine fachliche Abklärung [[noetel2024]]. Mehr vom Gleichen kann bei Erschöpfung zusätzlich unter Druck setzen. Wertlosigkeitsgefühle und Appetitverlust über Wochen sind Hinweise, die ernst genommen werden sollten." },
        { t: "Er macht wie bisher weiter und wartet ab, ob es mit einem neuen Job besser wird.", score: 1, fb: "Seine Aktivitäten beizubehalten ist richtig und schützt ihn. Abwarten bei anhaltenden Symptomen birgt aber das Risiko, dass sich eine Depression verfestigt. Eine fachliche Einschätzung kann klären, ob zusätzliche Unterstützung sinnvoll ist." },
        { t: "Er vereinbart einen Termin bei seiner Hausärztin, schildert offen seine Beschwerden und lässt abklären, ob eine Depression vorliegt und welche Behandlung passt.", score: 2, fb: "Anhaltende Antriebslosigkeit, Appetitverlust und Wertlosigkeitsgefühle sind typische Anzeichen einer Depression und gehören fachlich abgeklärt. Verhaltensaktivierung ist eine wirksame Behandlung [[ekers2014]], die auch von geschulten Fachkräften angeboten werden kann [[richards2016]]. Das Programm begleitet ihn weiter, ersetzt aber keine Therapie." }
      ]
    }
  ],
  outro: "Die Hausärztin bestätigt eine leichte bis mittelgradige depressive Episode und überweist Malik in eine psychotherapeutische Sprechstunde. Bis zum Therapiebeginn vergehen einige Wochen, in denen er seine Parkrunde und das Dienstagstraining fortsetzt. In der Therapie arbeitet er weiter an seinem Aktivitätenplan und an dem Gedanken, ohne Arbeit nichts wert zu sein. Eine Stelle hat er noch nicht, aber er hat sich für eine Weiterbildung zum Lagerfachwirt angemeldet. Manche Tage sind zäh. Doch Amira hat ihn neulich gefragt, ob er am Wochenende mit ihr Fahrrad fahren geht, und er hat ja gesagt, ohne nachzudenken.",
  principles: [
    "Handeln darf der Motivation vorausgehen: Aktivität nach Plan, nicht nach Stimmung.",
    "Kleine, konkrete und fest eingeplante Aktivitäten durchbrechen den Teufelskreis des Rückzugs.",
    "Anhaltende depressive Symptome gehören trotz eigener Fortschritte ärztlich oder psychotherapeutisch abgeklärt."
  ],
  refs: ["lewinsohn1974", "martell2001", "ekers2014", "bandura1977", "gollwitzer2006", "bratman2015", "schuch2018", "holtlunstad2010", "noetel2024", "richards2016"]
});

/* ===================================================================== */
/* MODUL 6 – ACHTSAMKEIT & AUFMERKSAMKEIT                                */
/* ===================================================================== */
window.KS_CASES.push({
  n: 6,
  title: "Sabine und das Handy in der Hand",
  person: "Sabine, 46, Steuerfachangestellte in Teilzeit, zwei Kinder im Teenageralter",
  intro: "Sabine bemerkt es zum ersten Mal richtig, als ihre fünfzehnjährige Tochter Jule beim Abendessen sagt: „Mama, du hörst mir gar nicht zu.“ Sabine hatte gerade auf ihr Handy geschaut, nur kurz, wegen einer Nachricht aus der Elterngruppe. Danach war sie noch kurz bei den Nachrichten, dann bei einem Video. Als sie aufblickte, war Jule schon aufgestanden. Seitdem achtet Sabine darauf und erschrickt: Sie greift morgens noch im Bett zum Handy, prüft im Büro zwischen zwei Belegen Mails und soziale Medien, scrollt abends auf dem Sofa, bis sie müde ist. Gleichzeitig hat sie das Gefühl, nie wirklich bei etwas zu sein. Beim Spaziergang plant sie den Einkauf, bei der Arbeit denkt sie an den Streit mit ihrem Sohn, abends an die Steuererklärung eines Mandanten. Sie fühlt sich zerstreut und unruhig. Mit Meditation konnte sie bisher wenig anfangen: „Da sitze ich nur und denke an tausend Dinge.“ Jetzt ist sie im Modul „Achtsamkeit & Aufmerksamkeit“.",
  steps: [
    {
      situation: "Sabine probiert die Atem-Anker-Meditation aus, zehn Minuten. Nach wenigen Atemzügen ist sie in Gedanken beim Einkaufszettel, dann beim Streit mit ihrem Sohn. Sie merkt es erst nach einer Weile und ärgert sich: „Siehst du, ich kann das einfach nicht.“ Sie überlegt, die Übung abzubrechen. Auf dem Bildschirm läuft der Timer noch sieben Minuten, und sie spürt den Drang, schnell nachzusehen, ob Nachrichten gekommen sind.",
      question: "Wie sollte Sabine ihr Gedankenwandern verstehen?",
      options: [
        { t: "Sie schließt daraus, dass Meditation für ihren unruhigen Kopf nicht geeignet ist, und lässt sie weg.", score: 0, fb: "Das ist ein verbreitetes Missverständnis: Achtsamkeit bedeutet nicht, keine Gedanken zu haben. Der Geist wandert im Alltag in fast der Hälfte der Zeit ab [[killingsworth2010]]. Wer aufgibt, verpasst genau die Übung, die mit der Zeit die Aufmerksamkeitslenkung stärkt [[bishop2004]]." },
        { t: "Sie versucht beim nächsten Mal, sich noch stärker zu konzentrieren und jeden fremden Gedanken sofort wegzudrücken.", score: 1, fb: "Das Bemühen ist verständlich, doch Gedanken wegzudrücken lässt sie oft stärker zurückkommen [[wegner1987]]. Besser ist es, den Gedanken freundlich zu bemerken und die Aufmerksamkeit ohne Kampf zum Atem zurückzuführen." },
        { t: "Sie erkennt, dass das Bemerken des Abschweifens und das freundliche Zurückkehren zum Atem genau die Übung ist, und macht weiter.", score: 2, fb: "Achtsamkeit wird als bewusste Aufmerksamkeitslenkung mit einer offenen, nicht wertenden Haltung beschrieben [[bishop2004]]. Jedes Bemerken und Zurückkehren ist eine Wiederholung dieser Fertigkeit. Dass Gedanken wandern, ist normal: In rund 47 % der erfassten Momente sind Menschen gedanklich woanders [[killingsworth2010]]." }
      ]
    },
    {
      situation: "Sabine übt nun täglich, zuerst fünf Minuten. Sie will auch ihre Handynutzung angehen und beobachtet eine Woche lang ihre Bildschirmzeit. Das Ergebnis überrascht sie: knapp vier Stunden am Tag, davon fast die Hälfte in sozialen Medien. Ihr erster Impuls ist, alle Apps zu löschen und das Handy nur noch zum Telefonieren zu nutzen. Gleichzeitig weiß sie, dass sie schon zweimal radikale Vorsätze gefasst hat, die nach wenigen Tagen verpufft sind.",
      question: "Wie geht Sabine am sinnvollsten mit ihrer Handynutzung um?",
      options: [
        { t: "Sie löscht alle Apps sofort und kauft sich ein einfaches Tastenhandy.", score: 1, fb: "Ein radikaler Schnitt kann für manche funktionieren, ist aber schwer durchzuhalten, zumal sie die Elterngruppe und berufliche Kontakte braucht. Studien zeigen, dass bereits eine Begrenzung der Nutzung sozialer Medien das Wohlbefinden verbessern kann [[hunt2018]], ohne dass ein völliger Verzicht nötig ist." },
        { t: "Sie begrenzt die sozialen Medien auf feste Zeiten und kurze Dauer, richtet eine handyfreie Zone beim Essen und im Schlafzimmer ein und legt das Handy bei der Arbeit außer Sichtweite.", score: 2, fb: "Die Begrenzung sozialer Medien auf etwa zehn Minuten pro Plattform und Tag verringerte in einer Studie Einsamkeit und depressive Symptome [[hunt2018]]. Schon ein in Sichtweite liegendes Handy kann die verfügbare Denkkapazität verringern [[ward2017]]. Handyfreie Zonen schaffen Räume, in denen Aufmerksamkeit wieder bei den Menschen sein kann." },
        { t: "Sie nimmt sich vor, „bewusster“ mit dem Handy umzugehen, ohne konkrete Regeln aufzustellen.", score: 0, fb: "Der gute Vorsatz scheitert hier meist an der Gewohnheit: Das Greifen zum Handy läuft automatisch, ausgelöst durch Situationen wie Langeweile oder Wartezeiten [[wood2007]]. Ohne konkrete Regeln und Veränderungen der Umgebung ändert sich wenig." }
      ]
    },
    {
      situation: "Zehn Tage später liegt das Handy beim Abendessen in der Küchenschublade. Sabine merkt, wie oft ihre Hand trotzdem zur Hosentasche wandert, besonders wenn ein Gespräch stockt oder Langeweile aufkommt. Im Büro ertappt sie sich dabei, wie sie zwischen zwei Belegen gedanklich schon den Abend plant. Sie fragt sich, wie sie Achtsamkeit im Alltag verankern kann, ohne mehr Zeit für Meditation aufzuwenden.",
      question: "Wie kann Sabine Achtsamkeit am besten in ihren Alltag bringen?",
      options: [
        { t: "Sie verlängert ihre Meditation auf eine Stunde täglich, um schneller Fortschritte zu machen.", score: 0, fb: "Eine Stunde täglich ist mit Beruf und Familie kaum durchzuhalten und erhöht die Gefahr, ganz aufzuhören. Realistische Erwartungen und kurze, regelmäßige Übungen sind nachhaltiger. Wirkungen von Achtsamkeitsprogrammen sind belegt, aber moderat, und es kommt auf die Regelmäßigkeit an [[goyal2014]]." },
        { t: "Sie wählt einen achtsamen Anker im Alltag: Wenn sie zum Handy greifen will, nimmt sie zuerst drei bewusste Atemzüge und spürt, was gerade in ihr los ist.", score: 2, fb: "Ein fester Anker verbindet die Achtsamkeitsübung mit einer konkreten Alltagssituation, ähnlich einem Wenn-dann-Plan [[gollwitzer2006]]. Die kurze Pause unterbricht den automatischen Griff und macht bewusst, welcher Impuls dahintersteckt. Achtsames Gewahrsein von Impulsen kann helfen, gewohnheitsmäßiges Verhalten zu verändern [[brewer2011]]." },
        { t: "Sie versucht, den ganzen Tag über permanent achtsam zu sein.", score: 1, fb: "Die Absicht ist gut, aber dauerhafte Achtsamkeit ist ein unrealistisches Ziel und führt leicht zu Frust. Gedankenwandern ist normal [[killingsworth2010]]. Kleine, feste Momente der Achtsamkeit sind wirksamer als der Anspruch, immer präsent zu sein." }
      ]
    },
    {
      situation: "Nach drei Wochen fühlt sich Sabine ruhiger. Am Wochenende geht sie mit Jule spazieren, ohne Handy. Jule erzählt von einer Freundin, und Sabine merkt, wie ihre Gedanken wieder zur Arbeit wandern. Sie kehrt zurück, hört zu und bemerkt die Herbstsonne auf dem Weg. Ein Gedanke kommt: „Das sollte ich öfter genießen.“ Gleichzeitig spürt sie den vertrauten Impuls, den Moment irgendwie festzuhalten.",
      question: "Wie kann Sabine solche Momente vertiefen?",
      options: [
        { t: "Sie macht schnell ein Foto, um den Moment festzuhalten und später auf Instagram zu teilen.", score: 0, fb: "Das Foto zieht die Aufmerksamkeit aus dem Moment heraus und zurück zum Bildschirm. Gerade das Teilen lenkt den Blick darauf, wie der Moment bei anderen ankommt, statt ihn selbst zu erleben. Genießen gelingt besser, wenn die Aufmerksamkeit bei der Erfahrung bleibt [[bryant2007]]." },
        { t: "Sie nimmt sich vor, später darüber nachzudenken, was ihr am Spaziergang gefallen hat.", score: 1, fb: "Rückblickendes Genießen ist eine von mehreren Formen des Savorings und kann das Wohlbefinden stärken [[bryant2007]]. Im Augenblick selbst bewusst zu verweilen, verstärkt das Erleben jedoch zusätzlich." },
        { t: "Sie bleibt bewusst im Moment, nimmt Sonne, Geräusche und das Gespräch mit Jule wahr und erzählt ihr, wie schön sie den Nachmittag findet.", score: 2, fb: "Savoring, das bewusste Auskosten positiver Momente, ist eine erlernbare Fertigkeit und verstärkt positive Gefühle [[bryant2007]]. Das Teilen der Freude mit Jule verstärkt den Moment zusätzlich und stärkt die Beziehung [[gable2004]]. Achtsamkeit schafft hier den Raum, in dem Genießen überhaupt möglich wird." }
      ]
    }
  ],
  outro: "Sabine meditiert inzwischen an den meisten Tagen fünf bis zehn Minuten, meist morgens vor dem ersten Blick aufs Handy. Ihre Bildschirmzeit ist gesunken, nicht auf null, aber das Abendessen ist handyfrei, und das Handy schläft in der Küche. Ihre Gedanken wandern nach wie vor, beim Spaziergang, im Büro, auch beim Meditieren. Der Unterschied ist, dass sie es öfter bemerkt und sich weniger dafür verurteilt. Jule hat neulich gesagt, dass es „irgendwie entspannter“ geworden ist beim Essen. Ihr Sohn hält die handyfreie Zone noch für eine Zumutung, gibt sein Handy aber meistens ab.",
  principles: [
    "Gedankenwandern ist normal: Das Bemerken und Zurückkehren ist die eigentliche Übung.",
    "Konkrete Regeln und eine veränderte Umgebung wirken stärker als der Vorsatz, „bewusster“ zu sein.",
    "Kurze, fest verankerte Achtsamkeitsmomente und bewusstes Genießen lassen sich in jeden Alltag einbauen."
  ],
  refs: ["killingsworth2010", "bishop2004", "wegner1987", "hunt2018", "ward2017", "wood2007", "goyal2014", "gollwitzer2006", "brewer2011", "bryant2007", "gable2004"]
});
