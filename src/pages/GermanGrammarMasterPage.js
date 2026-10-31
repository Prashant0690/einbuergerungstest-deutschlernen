import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./GermanGrammarMasterPage.css";

const pronouns = ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"];
const present = [
  ["habe", "bin", "werde"], ["hast", "bist", "wirst"], ["hat", "ist", "wird"],
  ["haben", "sind", "werden"], ["habt", "seid", "werdet"], ["haben", "sind", "werden"],
];
const past = [
  ["hatte", "war", "wurde"], ["hattest", "warst", "wurdest"], ["hatte", "war", "wurde"],
  ["hatten", "waren", "wurden"], ["hattet", "wart", "wurdet"], ["hatten", "waren", "wurden"],
];
const regularPresent = [
  ["ich", "-e", "mache"], ["du", "-st", "machst"], ["er / sie / es", "-t", "macht"],
  ["wir", "-en", "machen"], ["ihr", "-t", "macht"], ["sie / Sie", "-en", "machen"],
];
const regularPast = [["ich", "machte"], ["du", "machtest"], ["er / sie / es", "machte"], ["wir", "machten"], ["ihr", "machtet"], ["sie / Sie", "machten"]];
const stemChanges = [["fahren", "du fährst · er fährt", "a → ä"], ["lesen", "du liest · er liest", "e → ie"], ["sehen", "du siehst · er sieht", "e → ie"], ["sprechen", "du sprichst · er spricht", "e → i"]];
const tenseExercises = [
  ["Gestern ___ ich sehr müde. (sein · Präteritum)", "war", "Präteritum of sein: ich war."],
  ["Ich habe meine Hausaufgaben ___. (machen · Partizip II)", "gemacht", "Regular participle: ge- + mach- + -t."],
  ["Sie ___ gestern nach Berlin. (fahren · Präteritum)", "fuhr", "Präteritum of fahren: sie fuhr."],
  ["Wir sind früh ___. (aufstehen · Partizip II)", "aufgestanden", "Separable prefix + ge + stem + participle ending."],
  ["Er hatte bereits ___, bevor ich ankam. (essen · Partizip II)", "gegessen", "Plusquamperfekt uses hatte + Partizip II."],
  ["Ich muss morgen früh ___. (aufstehen · infinitive)", "aufstehen", "After a modal verb, keep the infinitive together at the end."],
  ["Ich ___ gerade Deutsch. (lernen · Präsens)", "lerne", "Präsens + gerade expresses an action happening right now."],
  ["Sie hat ihre Mutter ___. (anrufen · Partizip II)", "angerufen", "Separable an- + ge + rufen forms angerufen."],
];

const sections = [
  { id: "present-tense", title: "1 · Use the Präsens", topic: "Present tense", summary: "Präsens describes what is happening now, habits, general facts and future plans when a time phrase makes the meaning clear.", examples: [["Ich lerne Deutsch.", "I learn / I am learning German."], ["Sie arbeitet in Hamburg.", "She works in Hamburg."], ["Morgen fahre ich nach Berlin.", "Tomorrow I am going to Berlin."]], tip: "German does not need a separate progressive ending like English -ing. Add gerade when you want to emphasize that something is happening right now." },
  { id: "finite-verb-position", title: "2 · Put the conjugated verb in the right place", topic: "Word order", summary: "In a main statement, the finite verb is the second sentence element. In a yes/no question, it comes first. A W-question starts with the question word, then the verb.", examples: [["Heute lerne ich Deutsch.", "Today I am learning German."], ["Lernst du heute Deutsch?", "Are you learning German today?"], ["Wann lernst du Deutsch?", "When are you learning German?"]], tip: "Position two means the second element, not necessarily the second word. If a time phrase begins the sentence, the subject usually follows the verb." },
  { id: "sentence-bracket", title: "3 · Keep the verb bracket together", topic: "Sentence structure", summary: "With a compound tense or modal verb, the finite helper/modal comes early in the clause and the participle or infinitive goes at the end.", examples: [["Ich habe gestern ein Buch gekauft.", "I bought a book yesterday."], ["Wir müssen heute länger arbeiten.", "We have to work longer today."], ["Morgen rufe ich meine Schwester an.", "Tomorrow I will call my sister."]], tip: "A separable prefix moves to the end in a simple main clause: Ich rufe dich an. In Perfekt, it joins the participle: Ich habe dich angerufen." },
  { id: "perfekt-auxiliary", title: "4 · Talk about the past with Perfekt", topic: "Present perfect · everyday past", summary: "Perfekt is the usual choice for completed events in everyday conversation. Put the conjugated helper in position two and Partizip II at the end.", examples: [["Ich habe Deutsch gelernt.", "I learned / have learned German."], ["Sie hat einen Film gesehen.", "She watched a film."], ["Wir sind nach Berlin gefahren.", "We went to Berlin."]], tip: "Learn the helper with the participle: hat gelernt, hat gesehen, ist gefahren. Most verbs take haben; common movement and change-of-state verbs often take sein." },
  { id: "present-participles", title: "5 · Build the Partizip II", topic: "Past participles", summary: "Regular verbs usually take ge- + stem + -t. Many strong verbs change their stem and end in -en. Mixed verbs change the stem but take -t.", examples: [["machen → gemacht", "regular / weak"], ["trinken → getrunken", "strong"], ["denken → gedacht", "mixed"]], tip: "Separable verbs place ge between prefix and stem: einkaufen → eingekauft. Inseparable prefixes and verbs ending in -ieren usually do not take ge-: verstanden, bezahlt, studiert." },
  { id: "preterite", title: "6 · Use Präteritum for stories and common helper verbs", topic: "Simple past", summary: "Präteritum is common in written stories and reports. In everyday speech, sein, haben and modal verbs also use it very often.", examples: [["Ich war gestern müde.", "I was tired yesterday."], ["Wir hatten keine Zeit.", "We had no time."], ["Er musste arbeiten.", "He had to work."]], tip: "Learn these high-frequency spoken forms early: war, hatte, konnte, musste, wollte, durfte, sollte." },
  { id: "plusquamperfekt", title: "7 · Show what happened earlier with Plusquamperfekt", topic: "Past before past", summary: "Use hatte or war plus Partizip II for an action completed before another past event. Keep the same haben/sein choice the verb uses in Perfekt.", examples: [["Ich hatte schon gegessen, bevor er kam.", "I had already eaten before he came."], ["Sie war nach Hause gegangen, bevor ich anrief.", "She had gone home before I called."]], tip: "Perfekt: habe/bin + participle. Plusquamperfekt: hatte/war + participle." },
  { id: "futur-one", title: "8 · Talk about the future with Futur I", topic: "werden + infinitive", summary: "Conjugate werden and place the main verb in the infinitive at the end. For everyday plans, Präsens plus a time phrase is often simpler.", examples: [["Ich werde morgen Deutsch lernen.", "I will study German tomorrow."], ["Sie werden ein neues Auto kaufen.", "They will buy a new car."], ["Morgen arbeite ich.", "I am working tomorrow."]], tip: "Futur I = werden (conjugated) + infinitive. Do not conjugate the main verb as well." },
  { id: "continuous-actions", title: "9 · Describe an action in progress", topic: "gerade · im Moment", summary: "German uses the ordinary Präsens or past tense for ongoing actions. Add gerade, im Moment or zurzeit when you want to emphasize ‘right now’ or ‘currently’.", examples: [["Ich arbeite gerade.", "I am working right now."], ["Ich habe gerade gearbeitet.", "I was just working."], ["Ich bin gerade am Arbeiten.", "I am in the middle of working. (colloquial)" ]], tip: "Do not invent a special tense for every English -ing form. The natural default is the regular German tense plus context." },
  { id: "tense-comparison", title: "10 · Compare the main past tenses", topic: "Quick comparison", summary: "Choose the tense by the time relationship and situation, not by translating English word-for-word.", examples: [["Ich lerne Deutsch.", "Present · I learn / am learning German."], ["Ich habe Deutsch gelernt.", "Perfekt · I learned / have learned German."], ["Ich lernte Deutsch.", "Präteritum · I learned German (narrative)."], ["Ich hatte Deutsch gelernt.", "Plusquamperfekt · I had learned German."]], tip: "For spoken conversation, start with Perfekt. Learn Präteritum especially for war, hatte and modal verbs." },
  { id: "subordinate-clauses", title: "11 · Send the verb to the end after a subordinating word", topic: "weil · dass · obwohl · wenn", summary: "A subordinate clause introduced by words such as weil, dass, obwohl or wenn places its finite verb at the end.", examples: [["Ich lerne Deutsch, weil ich in Deutschland lebe.", "I learn German because I live in Germany."], ["Sie sagt, dass sie heute keine Zeit hat.", "She says that she has no time today."], ["Obwohl es regnet, gehen wir spazieren.", "Although it is raining, we are going for a walk."]], tip: "If the subordinate clause comes first, the main clause verb follows the comma: Obwohl es regnet, gehen wir spazieren." },
  { id: "negation", title: "12 · Choose nicht or kein", topic: "Negation", summary: "Use kein to negate an indefinite or unmarked noun. Use nicht to negate verbs, adjectives, adverbs, proper names and specific noun phrases.", examples: [["Ich habe kein Auto.", "I do not have a car."], ["Das Haus ist nicht groß.", "The house is not big."], ["Ich kaufe das Auto nicht.", "I am not buying the car."], ["Das ist nicht mein Buch.", "That is not my book."]], tip: "Kein declines like ein: kein Auto, keine Zeit, keinen Termin. Nicht usually comes near the part being negated; its position depends on what you are correcting or denying." },
];

function AuxiliaryTable({ title, rows }) {
  return <div className="grammar-master-table-wrap"><h3>{title}</h3><Table className="grammar-master-table"><thead><tr><th>Pronoun</th><th>haben</th><th>sein</th><th>werden</th></tr></thead><tbody>{rows.map((forms, index) => <tr key={pronouns[index]}><th>{pronouns[index]}</th>{forms.map((form, formIndex) => <td key={formIndex} lang="de">{form}</td>)}</tr>)}</tbody></Table></div>;
}

function GermanGrammarMasterPage() {
  return (
    <main className="grammar-master-page">
      <header className="grammar-master-hero">
        <p className="path-kicker">A1–A2 · STUDY NOTES</p>
        <h1>German tenses and sentence patterns</h1>
        <p>Use these notes as a guide: learn one pattern, read the examples aloud, then try the short practice at the end.</p>
        <nav aria-label="Grammar topics">{sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.topic.split(" · ")[0]}</a>)}</nav>
      </header>

      <section className="tense-cheat-sheet" aria-labelledby="tense-cheat-title">
        <h2 id="tense-cheat-title">Start with these four ideas</h2>
        <div>
          <p><strong>Now, habits, plans:</strong> use Präsens. <em>Ich lerne Deutsch.</em></p>
          <p><strong>Everyday past:</strong> use Perfekt. <em>Ich habe Deutsch gelernt.</em></p>
          <p><strong>Common spoken past:</strong> remember <em>war, hatte</em> and modal forms like <em>musste</em>.</p>
          <p><strong>Past before another past:</strong> use Plusquamperfekt. <em>Ich hatte schon gegessen.</em></p>
        </div>
      </section>

      <section className="grammar-auxiliaries" aria-labelledby="grammar-aux-title">
        <div className="grammar-master-heading"><div><p className="path-kicker">Keep this nearby</p><h2 id="grammar-aux-title">haben · sein · werden</h2></div><p>These three verbs are used on their own and to build other tenses. Learn the present first, then the past forms.</p></div>
        <div className="grammar-aux-grid"><AuxiliaryTable title="Präsens · present" rows={present} /><AuxiliaryTable title="Präteritum · simple past" rows={past} /></div>
        <p className="grammar-aux-note"><strong>Useful spoken German:</strong> <em>hatte</em> and <em>war</em> are very common for past situations; modal verbs are also often used in Präteritum.</p>
      </section>

      <section className="grammar-auxiliaries grammar-present-reference" aria-labelledby="regular-present-title">
        <div className="grammar-master-heading"><div><p className="path-kicker">Build most present forms</p><h2 id="regular-present-title">Regular verb endings</h2></div><p>Remove <em>-en</em> to find the stem, then add the ending for the subject.</p></div>
        <div className="grammar-present-layout">
          <div className="grammar-master-table-wrap"><h3>machen · to do / make</h3><Table className="grammar-master-table"><thead><tr><th>Pronoun</th><th>Ending</th><th>Form</th></tr></thead><tbody>{regularPresent.map(([person, ending, form]) => <tr key={person}><th>{person}</th><td>{ending}</td><td lang="de">{form}</td></tr>)}</tbody></Table></div>
          <aside className="grammar-stem-change-card"><strong>Some common verbs change their stem vowel</strong><p>This often happens in the <em>du</em> and <em>er/sie/es</em> forms. The other endings still follow the usual pattern.</p>{stemChanges.map(([verb, form, pattern]) => <div key={verb}><span>{pattern}</span><strong lang="de">{verb}</strong><small>{form}</small></div>)}</aside>
        </div>
      </section>

      <section className="grammar-rule-list" aria-label="Grammar lessons">
        {sections.map((section, index) => <article className="grammar-master-lesson" id={section.id} key={section.id}>
          <div className="grammar-master-lesson-heading"><span>{String(index + 1).padStart(2, "0")}</span><div><p className="path-kicker">{section.topic}</p><h2>{section.title.replace(/^\d · /, "")}</h2></div></div>
          <p className="grammar-master-summary">{section.summary}</p>
          <div className="grammar-master-examples">{section.examples.map(([german, english]) => <div key={german}><strong lang="de">{german}</strong><span>{english}</span></div>)}</div>
          {section.id === "preterite" && <div className="grammar-supplemental-table"><p><strong>Regular Präteritum:</strong> add <em>-te</em> to the stem, then the person ending. With <em>machen</em>, the stem is <em>mach-</em>.</p><Table className="grammar-master-table"><thead><tr><th>Pronoun</th><th>Präteritum of machen</th></tr></thead><tbody>{regularPast.map(([person, form]) => <tr key={person}><th>{person}</th><td lang="de">{form}</td></tr>)}</tbody></Table><small>Strong verbs change their stem instead: <em>gehen → ging</em>, <em>sehen → sah</em>.</small></div>}
          <p className="grammar-master-tip"><strong>Teacher’s note</strong>{section.tip}</p>
        </article>)}
      </section>

      <section className="grammar-practice-section" aria-labelledby="grammar-practice-title">
        <p className="path-kicker">Recall before you reveal</p><h2 id="grammar-practice-title">Quick tense practice</h2>
        <p>Try to fill the blank from memory, then open the line to check the form and why it fits.</p>
        <div className="grammar-practice-list">{tenseExercises.map(([prompt, answer, why], index) => <details key={prompt}><summary><span>{String(index + 1).padStart(2, "0")}</span>{prompt}</summary><div><strong lang="de">{answer}</strong><p>{why}</p></div></details>)}</div>
      </section>

      <section className="grammar-master-next" aria-label="Related learning pages">
        <Link to="/german-irregular-verbs"><strong>Irregular verbs</strong><span>Search forms from A1 through C2 →</span></Link>
        <Link to="/german-grammar"><strong>Grammar essentials</strong><span>Continue with short guided lessons and checks →</span></Link>
        <Link to="/german-cases"><strong>German cases</strong><span>Review articles and pronouns in the four cases →</span></Link>
      </section>
    </main>
  );
}

export default GermanGrammarMasterPage;
