import React, { useMemo, useState } from "react";
import { Form, Table } from "react-bootstrap";
import "./GermanIrregularVerbsPage.css";

const verbs = [
  ["A1", "beginnen", "beginnt", "begann", "begonnen", "haben", "to begin"],
  ["A1", "bleiben", "bleibt", "blieb", "geblieben", "sein", "to stay"],
  ["A1", "bringen", "bringt", "brachte", "gebracht", "haben", "to bring"],
  ["A1", "denken", "denkt", "dachte", "gedacht", "haben", "to think"],
  ["A1", "essen", "isst", "aß", "gegessen", "haben", "to eat"],
  ["A1", "fahren", "fährt", "fuhr", "gefahren", "sein / haben", "to travel / drive"],
  ["A1", "finden", "findet", "fand", "gefunden", "haben", "to find"],
  ["A1", "fliegen", "fliegt", "flog", "geflogen", "sein / haben", "to fly"],
  ["A1", "geben", "gibt", "gab", "gegeben", "haben", "to give"],
  ["A1", "gehen", "geht", "ging", "gegangen", "sein", "to go / walk"],
  ["A1", "haben", "hat", "hatte", "gehabt", "haben", "to have"],
  ["A1", "helfen", "hilft", "half", "geholfen", "haben", "to help"],
  ["A1", "kommen", "kommt", "kam", "gekommen", "sein", "to come"],
  ["A1", "laufen", "läuft", "lief", "gelaufen", "sein / haben", "to run / walk"],
  ["A1", "lesen", "liest", "las", "gelesen", "haben", "to read"],
  ["A1", "nehmen", "nimmt", "nahm", "genommen", "haben", "to take"],
  ["A1", "schlafen", "schläft", "schlief", "geschlafen", "haben", "to sleep"],
  ["A1", "schreiben", "schreibt", "schrieb", "geschrieben", "haben", "to write"],
  ["A1", "sehen", "sieht", "sah", "gesehen", "haben", "to see"],
  ["A1", "sein", "ist", "war", "gewesen", "sein", "to be"],
  ["A1", "sprechen", "spricht", "sprach", "gesprochen", "haben", "to speak"],
  ["A1", "trinken", "trinkt", "trank", "getrunken", "haben", "to drink"],
  ["A1", "verstehen", "versteht", "verstand", "verstanden", "haben", "to understand"],
  ["A1", "werden", "wird", "wurde", "geworden", "sein", "to become"],
  ["A2", "anfangen", "fängt an", "fing an", "angefangen", "haben", "to start"],
  ["A2", "anrufen", "ruft an", "rief an", "angerufen", "haben", "to phone / call"],
  ["A2", "aufstehen", "steht auf", "stand auf", "aufgestanden", "sein", "to get up"],
  ["A2", "einladen", "lädt ein", "lud ein", "eingeladen", "haben", "to invite"],
  ["A2", "empfehlen", "empfiehlt", "empfahl", "empfohlen", "haben", "to recommend"],
  ["A2", "fallen", "fällt", "fiel", "gefallen", "sein", "to fall"],
  ["A2", "gewinnen", "gewinnt", "gewann", "gewonnen", "haben", "to win"],
  ["A2", "halten", "hält", "hielt", "gehalten", "haben", "to hold / stop"],
  ["A2", "heißen", "heißt", "hieß", "geheißen", "haben", "to be called"],
  ["A2", "kennen", "kennt", "kannte", "gekannt", "haben", "to know a person / place"],
  ["A2", "lassen", "lässt", "ließ", "gelassen", "haben", "to let / leave"],
  ["A2", "leihen", "leiht", "lieh", "geliehen", "haben", "to lend / borrow"],
  ["A2", "lügen", "lügt", "log", "gelogen", "haben", "to tell a lie"],
  ["A2", "mitnehmen", "nimmt mit", "nahm mit", "mitgenommen", "haben", "to take along"],
  ["A2", "riechen", "riecht", "roch", "gerochen", "haben", "to smell"],
  ["A2", "schließen", "schließt", "schloss", "geschlossen", "haben", "to close / lock"],
  ["A2", "schwimmen", "schwimmt", "schwamm", "geschwommen", "sein / haben", "to swim"],
  ["A2", "singen", "singt", "sang", "gesungen", "haben", "to sing"],
  ["A2", "sitzen", "sitzt", "saß", "gesessen", "haben", "to sit"],
  ["A2", "steigen", "steigt", "stieg", "gestiegen", "sein", "to climb / rise"],
  ["A2", "sterben", "stirbt", "starb", "gestorben", "sein", "to die"],
  ["A2", "tragen", "trägt", "trug", "getragen", "haben", "to carry / wear"],
  ["A2", "treffen", "trifft", "traf", "getroffen", "haben", "to meet"],
  ["A2", "vergessen", "vergisst", "vergaß", "vergessen", "haben", "to forget"],
  ["A2", "verlieren", "verliert", "verlor", "verloren", "haben", "to lose"],
  ["A2", "ziehen", "zieht", "zog", "gezogen", "sein / haben", "to move / pull"],
  ["B1", "bieten", "bietet", "bot", "geboten", "haben", "to offer"],
  ["B1", "bitten", "bittet", "bat", "gebeten", "haben", "to ask / request"],
  ["B1", "brennen", "brennt", "brannte", "gebrannt", "haben", "to burn"],
  ["B1", "entscheiden", "entscheidet", "entschied", "entschieden", "haben", "to decide"],
  ["B1", "erziehen", "erzieht", "erzog", "erzogen", "haben", "to raise / educate"],
  ["B1", "fliehen", "flieht", "floh", "geflohen", "sein", "to flee"],
  ["B1", "fließen", "fließt", "floss", "geflossen", "sein", "to flow"],
  ["B1", "frieren", "friert", "fror", "gefroren", "haben / sein", "to freeze / feel cold"],
  ["B1", "genießen", "genießt", "genoss", "genossen", "haben", "to enjoy"],
  ["B1", "geschehen", "geschieht", "geschah", "geschehen", "sein", "to happen"],
  ["B1", "gießen", "gießt", "goss", "gegossen", "haben", "to pour / water"],
  ["B1", "gleichen", "gleicht", "glich", "geglichen", "haben", "to resemble"],
  ["B1", "graben", "gräbt", "grub", "gegraben", "haben", "to dig"],
  ["B1", "greifen", "greift", "griff", "gegriffen", "haben", "to grasp"],
  ["B1", "laden", "lädt", "lud", "geladen", "haben", "to load"],
  ["B1", "nennen", "nennt", "nannte", "genannt", "haben", "to name"],
  ["B1", "pfeifen", "pfeift", "pfiff", "gepfiffen", "haben", "to whistle"],
  ["B1", "raten", "rät", "riet", "geraten", "haben", "to advise / guess"],
  ["B1", "scheinen", "scheint", "schien", "geschienen", "haben", "to shine / seem"],
  ["B1", "schieben", "schiebt", "schob", "geschoben", "haben", "to push"],
  ["B1", "schießen", "schießt", "schoss", "geschossen", "haben", "to shoot"],
  ["B1", "schlagen", "schlägt", "schlug", "geschlagen", "haben", "to hit"],
  ["B1", "schmeißen", "schmeißt", "schmiss", "geschmissen", "haben", "to throw"],
  ["B1", "schneiden", "schneidet", "schnitt", "geschnitten", "haben", "to cut"],
  ["B1", "streiten", "streitet", "stritt", "gestritten", "haben", "to argue"],
  ["B1", "trügen", "trügt", "trog", "getrogen", "haben", "to deceive"],
  ["B1", "verbieten", "verbietet", "verbot", "verboten", "haben", "to forbid"],
  ["B1", "vergleichen", "vergleicht", "verglich", "verglichen", "haben", "to compare"],
  ["B1", "wachsen", "wächst", "wuchs", "gewachsen", "sein", "to grow"],
  ["B1", "werfen", "wirft", "warf", "geworfen", "haben", "to throw"],
  ["B2", "behalten", "behält", "behielt", "behalten", "haben", "to keep"],
  ["B2", "sich bewerben", "bewirbt sich", "bewarb sich", "beworben", "haben", "to apply"],
  ["B2", "binden", "bindet", "band", "gebunden", "haben", "to bind"],
  ["B2", "dringen", "dringt", "drang", "gedrungen", "sein / haben", "to penetrate / urge"],
  ["B2", "empfangen", "empfängt", "empfing", "empfangen", "haben", "to receive"],
  ["B2", "empfinden", "empfindet", "empfand", "empfunden", "haben", "to feel"],
  ["B2", "erschrecken", "erschrickt", "erschrak", "erschrocken", "sein", "to get frightened"],
  ["B2", "gelingen", "gelingt", "gelang", "gelungen", "sein", "to succeed"],
  ["B2", "gelten", "gilt", "galt", "gegolten", "haben", "to be valid"],
  ["B2", "klingen", "klingt", "klang", "geklungen", "haben", "to sound"],
  ["B2", "leiden", "leidet", "litt", "gelitten", "haben", "to suffer"],
  ["B2", "messen", "misst", "maß", "gemessen", "haben", "to measure"],
  ["B2", "meiden", "meidet", "mied", "gemieden", "haben", "to avoid"],
  ["B2", "reiben", "reibt", "rieb", "gerieben", "haben", "to rub"],
  ["B2", "reiten", "reitet", "ritt", "geritten", "sein / haben", "to ride a horse"],
  ["B2", "schaffen", "schafft", "schuf", "geschaffen", "haben", "to create"],
  ["B2", "scheiden", "scheidet", "schied", "geschieden", "haben / sein", "to separate / divorce"],
  ["B2", "schleichen", "schleicht", "schlich", "geschlichen", "sein", "to sneak"],
  ["B2", "schwellen", "schwillt", "schwoll", "geschwollen", "sein", "to swell"],
  ["B2", "sinken", "sinkt", "sank", "gesunken", "sein", "to sink"],
  ["B2", "springen", "springt", "sprang", "gesprungen", "sein", "to jump"],
  ["B2", "stechen", "sticht", "stach", "gestochen", "haben", "to sting"],
  ["B2", "stehlen", "stiehlt", "stahl", "gestohlen", "haben", "to steal"],
  ["B2", "stinken", "stinkt", "stank", "gestunken", "haben", "to stink"],
  ["B2", "stoßen", "stößt", "stieß", "gestoßen", "haben / sein", "to bump / push"],
  ["B2", "treiben", "treibt", "trieb", "getrieben", "haben / sein", "to drive / drift"],
  ["B2", "weisen", "weist", "wies", "gewiesen", "haben", "to point out"],
  ["B2", "wenden", "wendet", "wandte / wendete", "gewandt / gewendet", "haben", "to turn"],
  ["B2", "zwingen", "zwingt", "zwang", "gezwungen", "haben", "to force"],
  ["C1–C2", "bergen", "birgt", "barg", "geborgen", "haben", "to rescue"],
  ["C1–C2", "blasen", "bläst", "blies", "geblasen", "haben", "to blow"],
  ["C1–C2", "gebären", "gebiert / gebärt", "gebar", "geboren", "haben", "to give birth"],
  ["C1–C2", "gedeihen", "gedeiht", "gedieh", "gediehen", "sein", "to thrive"],
  ["C1–C2", "genesen", "genest", "genas", "genesen", "sein", "to recover"],
  ["C1–C2", "gleiten", "gleitet", "glitt", "geglitten", "sein", "to glide"],
  ["C1–C2", "glimmen", "glimmt", "glomm / glimmte", "geglommen / geglimmt", "haben", "to smolder"],
  ["C1–C2", "hauen", "haut", "hieb / haute", "gehauen", "haben", "to hit / chop"],
  ["C1–C2", "kneifen", "kneift", "kniff", "gekniffen", "haben", "to pinch"],
  ["C1–C2", "kriechen", "kriecht", "kroch", "gekrochen", "sein", "to crawl"],
  ["C1–C2", "melken", "melkt", "molk / melkte", "gemolken", "haben", "to milk"],
  ["C1–C2", "preisen", "preist", "pries", "gepriesen", "haben", "to praise"],
  ["C1–C2", "quellen", "quillt", "quoll", "gequollen", "sein", "to gush / swell"],
  ["C1–C2", "rinnen", "rinnt", "rann", "geronnen", "sein", "to trickle"],
  ["C1–C2", "saufen", "säuft", "soff", "gesoffen", "haben", "to drink heavily"],
  ["C1–C2", "saugen", "saugt", "sog / saugte", "gesogen / gesaugt", "haben", "to suck / vacuum"],
  ["C1–C2", "schleifen", "schleift", "schliff", "geschliffen", "haben", "to grind / sharpen"],
  ["C1–C2", "schlingen", "schlingt", "schlang", "geschlungen", "haben", "to wind / devour"],
  ["C1–C2", "schwinden", "schwindet", "schwand", "geschwunden", "sein", "to dwindle"],
  ["C1–C2", "schwören", "schwört", "schwor", "geschworen", "haben", "to swear"],
  ["C1–C2", "sinnen", "sinnt", "sann", "gesonnen", "haben", "to ponder"],
  ["C1–C2", "spinnen", "spinnt", "spann", "gesponnen", "haben", "to spin"],
  ["C1–C2", "sprießen", "sprießt", "spross", "gesprossen", "sein", "to sprout"],
  ["C1–C2", "stieben", "stiebt", "stob", "gestoben", "sein / haben", "to scatter"],
  ["C1–C2", "weichen", "weicht", "wich", "gewichen", "sein", "to yield / retreat"],
  ["C1–C2", "wringen", "wringt", "wrang", "gewrungen", "haben", "to wring"],
];

const patterns = [
  ["ei → ie → ie", "bleiben – blieb – geblieben", "The vowel shifts through the past forms."],
  ["i → a → u", "trinken – trank – getrunken", "A common strong-verb pattern."],
  ["e → a → o", "sprechen – sprach – gesprochen", "Watch the present-tense change too: er spricht."],
  ["Mixed", "denken – dachte – gedacht", "The stem changes, but the past forms use weak endings."],
];
const verbCategoryOverrides = {
  beginnen: "Strong", bleiben: "Strong", bringen: "Mixed", denken: "Mixed", essen: "Strong", fahren: "Strong", finden: "Strong", fliegen: "Strong", geben: "Strong", gehen: "Strong", haben: "Irregular", helfen: "Strong", kommen: "Strong", laufen: "Strong", lesen: "Strong", nehmen: "Strong", schlafen: "Strong", schreiben: "Strong", sehen: "Strong", sein: "Irregular", sprechen: "Strong", trinken: "Strong", verstehen: "Strong", werden: "Irregular",
  brennen: "Mixed", kennen: "Mixed", nennen: "Mixed", wenden: "Mixed / weak", glimmen: "Strong / weak", hauen: "Strong / weak", melken: "Strong / weak", saugen: "Strong / weak",
};

const verbPersons = ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"];
const moechtenForms = ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"];
const coreVerbs = [
  { group: "Helpers", verb: "haben", meaning: "to have · auxiliary for most Perfekt verbs", present: ["habe", "hast", "hat", "haben", "habt", "haben"], past: ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"], perfect: ["habe gehabt", "hast gehabt", "hat gehabt", "haben gehabt", "habt gehabt", "haben gehabt"], example: "Ich habe heute Zeit. · I have time today." },
  { group: "Helpers", verb: "sein", meaning: "to be · auxiliary for many movement and change verbs", present: ["bin", "bist", "ist", "sind", "seid", "sind"], past: ["war", "warst", "war", "waren", "wart", "waren"], perfect: ["bin gewesen", "bist gewesen", "ist gewesen", "sind gewesen", "seid gewesen", "sind gewesen"], example: "Ich bin müde. · I am tired." },
  { group: "Helpers", verb: "werden", meaning: "to become · also builds Futur I", present: ["werde", "wirst", "wird", "werden", "werdet", "werden"], past: ["wurde", "wurdest", "wurde", "wurden", "wurdet", "wurden"], perfect: ["bin geworden", "bist geworden", "ist geworden", "sind geworden", "seid geworden", "sind geworden"], example: "Es wird kalt. · It is getting cold." },
  { group: "Modal verbs", verb: "können", meaning: "can · ability or possibility", present: ["kann", "kannst", "kann", "können", "könnt", "können"], past: ["konnte", "konntest", "konnte", "konnten", "konntet", "konnten"], perfect: ["habe gekonnt", "hast gekonnt", "hat gekonnt", "haben gekonnt", "habt gekonnt", "haben gekonnt"], example: "Ich kann gut schwimmen. · I can swim well." },
  { group: "Modal verbs", verb: "müssen", meaning: "must · necessity", present: ["muss", "musst", "muss", "müssen", "müsst", "müssen"], past: ["musste", "musstest", "musste", "mussten", "musstet", "mussten"], perfect: ["habe gemusst", "hast gemusst", "hat gemusst", "haben gemusst", "habt gemusst", "haben gemusst"], example: "Wir müssen heute arbeiten. · We have to work today." },
  { group: "Modal verbs", verb: "dürfen", meaning: "may · permission", present: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"], past: ["durfte", "durftest", "durfte", "durften", "durftet", "durften"], perfect: ["habe gedurft", "hast gedurft", "hat gedurft", "haben gedurft", "habt gedurft", "haben gedurft"], example: "Darf ich hier sitzen? · May I sit here?" },
  { group: "Modal verbs", verb: "sollen", meaning: "should · advice or reported expectation", present: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"], past: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"], perfect: ["habe gesollt", "hast gesollt", "hat gesollt", "haben gesollt", "habt gesollt", "haben gesollt"], example: "Du sollst mehr Wasser trinken. · You should drink more water." },
  { group: "Modal verbs", verb: "wollen", meaning: "want · intention", present: ["will", "willst", "will", "wollen", "wollt", "wollen"], past: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"], perfect: ["habe gewollt", "hast gewollt", "hat gewollt", "haben gewollt", "habt gewollt", "haben gewollt"], example: "Sie will morgen anrufen. · She wants to call tomorrow." },
  { group: "Modal verbs", verb: "mögen", meaning: "to like · möchten is its polite subjunctive form", present: ["mag", "magst", "mag", "mögen", "mögt", "mögen"], past: ["mochte", "mochtest", "mochte", "mochten", "mochtet", "mochten"], perfect: ["habe gemocht", "hast gemocht", "hat gemocht", "haben gemocht", "habt gemocht", "haben gemocht"], example: "Ich mag Musik. · I like music." },
];

const separableExamples = [
  ["aufstehen", "to get up", "Ich stehe um sieben Uhr auf.", "Ich muss früh aufstehen.", "Ich bin früh aufgestanden."],
  ["einkaufen", "to shop", "Wir kaufen heute ein.", "Wir wollen heute einkaufen.", "Wir haben heute eingekauft."],
  ["anrufen", "to call", "Sie ruft ihre Mutter an.", "Sie möchte ihre Mutter anrufen.", "Sie hat ihre Mutter angerufen."],
  ["fernsehen", "to watch TV", "Er sieht am Abend fern.", "Er darf am Abend fernsehen.", "Er hat am Abend ferngesehen."],
];
const verbExercises = [
  ["Gestern ___ ich sehr müde. (sein · Präteritum)", "war"],
  ["Ich habe meine Hausaufgaben ___. (machen · Partizip II)", "gemacht"],
  ["Sie ___ gestern nach Berlin. (fahren · Präteritum)", "fuhr"],
  ["Wir sind früh ___. (aufstehen · Partizip II)", "aufgestanden"],
  ["Er hatte bereits ___, bevor ich ankam. (essen · Partizip II)", "gegessen"],
  ["Ich muss morgen früh ___. (aufstehen · infinitive)", "aufstehen"],
  ["Ich ___ gerade Deutsch. (lernen · Präsens)", "lerne"],
  ["Sie hat ihre Mutter ___. (anrufen · Partizip II)", "angerufen"],
];

function CoreVerbTable({ verb }) {
  return <details className="core-verb-details">
    <summary><span><strong lang="de">{verb.verb}</strong><small>{verb.meaning}</small></span><span className="core-verb-summary-example" lang="de">{verb.example}</span></summary>
    <div className="core-verb-table-wrap"><Table className="core-verb-table"><thead><tr><th>Pronoun</th><th>Präsens</th><th>Präteritum</th><th>Perfekt</th></tr></thead><tbody>{verbPersons.map((person, index) => <tr key={person}><th>{person}</th><td lang="de">{verb.present[index]}</td><td lang="de">{verb.past[index]}</td><td lang="de">{verb.perfect[index]}</td></tr>)}</tbody></Table></div>
  </details>;
}

function GermanIrregularVerbsPage() {
  const [level, setLevel] = useState("A1");
  const [query, setQuery] = useState("");
  const filteredVerbs = useMemo(() => verbs.filter((verb) => (level === "All" || verb[0] === level) && verb.join(" ").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())), [level, query]);

  return (
    <main className="irregular-verbs-page">
      <header className="irregular-verbs-hero">
        <p className="path-kicker">A1–C2 · VERB REFERENCE</p>
        <h1>Irregular verbs, made easier to review</h1>
        <p>Learn each verb as a set: present change, simple past, past participle and the helper used in Perfekt. Filter by level, then study a small group at a time.</p>
        <div className="verb-formula"><span>Infinitive</span><b>→</b><span>Präteritum</span><b>→</b><span>Partizip II</span></div>
      </header>

      <section className="core-verbs-section" aria-labelledby="core-verbs-title">
        <div className="verb-section-heading"><div><p className="path-kicker">Start with these high-frequency verbs</p><h2 id="core-verbs-title">General verb conjugations</h2></div><p>These forms appear in everyday sentences and build other tenses. Open a verb to compare all person forms.</p></div>
        <div className="core-verb-groups">{["Helpers", "Modal verbs"].map((group) => <section key={group} aria-label={group}>
          <div className="core-verb-group-heading"><h3>{group === "Helpers" ? "haben · sein · werden" : "können · müssen · dürfen · sollen · wollen · mögen"}</h3><p>{group === "Helpers" ? "Have · be · become / future helper" : "Ability · necessity · permission · advice · intention · liking"}</p></div>
          {coreVerbs.filter((verb) => verb.group === group).map((verb) => <CoreVerbTable key={verb.verb} verb={verb} />)}
          {group === "Modal verbs" && <aside className="moechten-reference"><strong>Polite request form · möchten</strong><p><em>Möchten</em> is the polite subjunctive of <em>mögen</em>, not a separate infinitive. It is especially useful for ordering and polite wishes.</p><div>{verbPersons.map((person, index) => <span key={person}><small>{person}</small><strong lang="de">{moechtenForms[index]}</strong></span>)}</div><p lang="de"><em>Ich möchte einen Tee, bitte.</em> · I would like a tea, please.</p></aside>}
        </section>)}</div>
        <p className="core-modal-note"><strong>Modal verbs in Perfekt:</strong> the table shows the standalone form. When another infinitive follows, German usually puts both infinitives at the end: <em>Ich habe arbeiten müssen.</em> · I had to work. <em>Möchten</em> is the polite subjunctive form of <em>mögen</em>: <em>Ich möchte einen Tee.</em></p>
      </section>

      <section className="participle-rules-section" aria-labelledby="participle-rules-title">
        <div className="verb-section-heading"><div><p className="path-kicker">A pattern, then exceptions</p><h2 id="participle-rules-title">How to form Partizip II</h2></div><p>Learn the common shape, then memorize irregular forms with their helper.</p></div>
        <div className="participle-rule-grid">
          <article><strong>Regular / weak</strong><span>ge + stem + t</span><p><em>machen → gemacht</em><br /><em>arbeiten → gearbeitet</em> (-et helps pronunciation)</p></article>
          <article><strong>Strong / irregular</strong><span>often ge + changed stem + en</span><p><em>trinken → getrunken</em><br /><em>sehen → gesehen</em></p></article>
          <article><strong>Separable prefix</strong><span>prefix + ge + verb</span><p><em>einkaufen → eingekauft</em><br /><em>aufstehen → aufgestanden</em></p></article>
          <article><strong>No ge-</strong><span>inseparable prefix or -ieren</span><p><em>be-, emp-, ent-, er-, ge-, miss-, ver-, zer-</em><br /><em>besuchen → besucht</em><br /><em>studieren → studiert</em></p></article>
        </div>
        <p className="participle-rule-note">These are useful patterns, not exception-free formulas. For strong and mixed verbs, learn the infinitive, Präteritum and Partizip II together.</p>
      </section>

      <section className="separable-verbs-section" aria-labelledby="separable-verbs-title">
        <div className="verb-section-heading"><div><p className="path-kicker">Three sentence patterns</p><h2 id="separable-verbs-title">Separable verbs · trennbare Verben</h2></div><p>The prefix changes position depending on the sentence. Follow one verb through all three forms.</p></div>
        <div className="separable-rule-strip"><span><strong>Main clause</strong> Split the prefix: <em>Ich rufe dich an.</em></span><span><strong>With a modal</strong> Keep the infinitive together at the end: <em>Ich muss dich anrufen.</em></span><span><strong>Perfekt</strong> Join the prefix and participle: <em>Ich habe dich angerufen.</em></span></div>
        <div className="verb-table-wrap"><Table className="separable-verbs-table"><thead><tr><th>Infinitive · meaning</th><th>Present · prefix at end</th><th>After a modal</th><th>Perfekt</th></tr></thead><tbody>{separableExamples.map(([verb, meaning, presentForm, modalForm, perfectForm]) => <tr key={verb}><th><span lang="de">{verb}</span><small>{meaning}</small></th><td lang="de">{presentForm}</td><td lang="de">{modalForm}</td><td lang="de">{perfectForm}</td></tr>)}</tbody></Table></div>
      </section>

      <section className="verb-pattern-section" aria-labelledby="verb-pattern-title">
        <div className="verb-section-heading"><div><p className="path-kicker">Notice the vowel family</p><h2 id="verb-pattern-title">Four patterns worth remembering</h2></div><p>Patterns help you group verbs, but learn the complete three-form set.</p></div>
        <div className="verb-pattern-grid">{patterns.map(([pattern, example, note]) => <article key={pattern}><span>{pattern}</span><strong lang="de">{example}</strong><small>{note}</small></article>)}</div>
      </section>

      <section className="verb-reference-section" aria-labelledby="verb-table-title">
        <div className="verb-section-heading"><div><p className="path-kicker">{filteredVerbs.length} verbs</p><h2 id="verb-table-title">Find a form</h2></div><p>sein / haben can depend on whether the verb describes movement or takes an object. See the note below.</p></div>
        <div className="verb-filters">
          <Form.Group controlId="verb-search"><Form.Label>Search by verb or meaning</Form.Label><Form.Control type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. fahren, took, to invite" /></Form.Group>
          <fieldset><legend>Level</legend>{["All", "A1", "A2", "B1", "B2", "C1–C2"].map((item) => <button type="button" className={level === item ? "active" : ""} onClick={() => setLevel(item)} key={item}>{item}</button>)}</fieldset>
        </div>
        <div className="verb-table-wrap">
          <Table hover className="verb-master-table">
            <thead><tr><th>Infinitive</th><th>Type</th><th>Present · er/sie/es</th><th>Präteritum</th><th>Partizip II</th><th>Perfekt helper</th><th>English</th></tr></thead>
            <tbody>{filteredVerbs.map(([verbLevel, infinitive, present, past, participle, auxiliary, meaning]) => {
              const categoryKey = infinitive.replace(/^sich /, "");
              const category = verbCategoryOverrides[categoryKey] || "Strong";
              return <tr key={infinitive}><td><span className="verb-level">{verbLevel}</span><strong lang="de">{infinitive}</strong></td><td><span className={`verb-type verb-type-${category.startsWith("Mixed") ? "mixed" : category === "Irregular" ? "irregular" : "strong"}`}>{category}</span></td><td lang="de">{present}</td><td lang="de">{past}</td><td lang="de">{participle}</td><td><span className="verb-auxiliary">{auxiliary}</span></td><td>{meaning}</td></tr>;
            })}</tbody>
          </Table>
          {!filteredVerbs.length && <p className="verb-empty-state">No matching verb. Try a shorter spelling or change the level filter.</p>}
        </div>
        <div className="verb-teacher-notes"><article><strong>Perfekt needs a helper</strong><p><em>Ich bin nach Hause gegangen.</em> · I went home.</p><p><em>Ich habe das Buch gelesen.</em> · I read the book.</p></article><article><strong>Some verbs can use either</strong><p><em>Ich bin nach Berlin gefahren.</em> (travelled there)</p><p><em>Ich habe den Bus gefahren.</em> (drove the bus)</p><small>With verbs such as fahren, the meaning and sentence role affect the helper.</small></article><article><strong>Keep separable parts together</strong><p><em>anrufen – rief an – angerufen</em></p><p><em>aufstehen – stand auf – aufgestanden</em></p></article></div>
      </section>
      <section className="verb-practice-section" aria-labelledby="verb-practice-title">
        <p className="path-kicker">Try from memory</p><h2 id="verb-practice-title">Quick verb practice</h2><p>Read the sentence, supply the form, then open it to check.</p>
        <div className="verb-practice-list">{verbExercises.map(([prompt, answer], index) => <details key={prompt}><summary><span>{String(index + 1).padStart(2, "0")}</span>{prompt}</summary><div><strong lang="de">{answer}</strong></div></details>)}</div>
      </section>
    </main>
  );
}

export default GermanIrregularVerbsPage;
