import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaVolumeUp } from "react-icons/fa";
import words from "../data/germanCoreVocabulary.json";
import nounGenderGuide from "../data/germanNounGenderGuide.json";
import adjectiveGuide from "../data/germanAdjectiveGuide.json";
import "./GermanCoreVocabularyPage.css";

const tabs = [
  { id: "verbs", label: "Verbs", note: "Learn the infinitive, the ich form, and the Partizip II." },
  { id: "adjectives", label: "Adjectives", note: "Learn descriptive words with a useful contrast or partner." },
  { id: "nouns", label: "Nouns", note: "Always learn the article and plural with each noun." },
];
const TOTAL_WORDS = words.verbs.length + words.adjectives.length + words.nouns.length;
const MODAL_AND_HELPER_VERBS = new Set(["sein", "haben", "werden", "können", "dürfen", "müssen", "sollen", "wollen", "mögen"]);

const getSavedWords = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("learnedGermanCoreWords") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
};

function GermanCoreVocabularyPage() {
  const [activeTab, setActiveTab] = useState("verbs");
  const [query, setQuery] = useState("");
  const [nounGroup, setNounGroup] = useState("All topics");
  const [learned, setLearned] = useState(getSavedWords);
  const [showLearned, setShowLearned] = useState(false);
  const active = tabs.find((tab) => tab.id === activeTab);
  const entries = words[activeTab];
  const selectedNounGroup = words.nounGroups.find((item) => item.name === nounGroup);
  const selectedNouns = words.nouns.slice(selectedNounGroup.start, selectedNounGroup.end);
  const articleCounts = Object.fromEntries(["der", "die", "das"].map((article) => [article, selectedNouns.filter((entry) => entry[0].startsWith(`${article} `) && entry[0] !== "die Leute").length]));
  const pluralOnlyCount = selectedNouns.filter((entry) => entry[0] === "die Leute").length;
  const articleOrder = ["der", "die", "das"].sort((a, b) => articleCounts[b] - articleCounts[a]);
  const commonArticle = articleCounts[articleOrder[0]] > articleCounts[articleOrder[1]] ? articleOrder[0] : null;
  const articleExamples = Object.fromEntries(["der", "die", "das"].map((article) => [article, selectedNouns.filter((entry) => entry[0].startsWith(`${article} `) && entry[0] !== "die Leute").slice(0, 2).map((entry) => entry[0])]));
  const visibleEntries = useMemo(() => entries
    .map((entry, index) => ({ entry, index, key: `${activeTab}-${index}` }))
    .filter(({ entry, index, key }) => {
      const group = words.nounGroups.find((item) => item.name === nounGroup);
      const matchesGroup = activeTab !== "nouns" || (index >= group.start && index < group.end);
      return matchesGroup && `${entry.join(" ")} ${activeTab}`.toLowerCase().includes(query.trim().toLowerCase()) && (showLearned || !learned.includes(key));
    }).sort((a, b) => activeTab === "verbs" ? Number(MODAL_AND_HELPER_VERBS.has(b.entry[0])) - Number(MODAL_AND_HELPER_VERBS.has(a.entry[0])) : a.index - b.index), [activeTab, entries, learned, nounGroup, query, showLearned]);

  const toggleLearned = (key) => setLearned((current) => {
    const next = current.includes(key) ? current.filter((item) => item !== key) : [...current, key];
    localStorage.setItem("learnedGermanCoreWords", JSON.stringify(next));
    return next;
  });

  const speak = (word) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "de-DE";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  };

  const renderDetails = (entry) => {
    if (activeTab === "verbs") return <><span>ich {entry[2]}</span><span>Partizip II · {entry[3]}</span></>;
    if (activeTab === "adjectives") return <span>Contrast / partner · {entry[2]}</span>;
    const [article, noun] = entry[0].split(" ");
    const articleClass = entry[0] === "die Leute" ? "plural" : article === "der" ? "masculine" : article === "die" ? "feminine" : "neuter";
    return <><span className={`core-article ${articleClass}`}>{article} {noun}</span><span>Plural · {entry[1] === "—" ? "usually uncountable" : entry[1]}</span></>;
  };

  return (
    <main className="core-vocab-page">
      <header className="core-vocab-hero">
        <p className="core-vocab-eyebrow">GERMAN · A1–B1 WORD BANK</p>
        <h1>Essential German words</h1>
        <p>Build a useful vocabulary foundation with {words.verbs.length} common verbs, {words.adjectives.length} adjectives, and {words.nouns.length} everyday nouns. Search, listen, and save words as you learn.</p>
        <div className="core-vocab-counts" aria-label="Words in this guide">
          <span><strong>{words.verbs.length}</strong> verbs</span><span><strong>{words.adjectives.length}</strong> adjectives</span><span><strong>{words.nouns.length}</strong> nouns with articles</span>
        </div>
      </header>

      <section className="core-vocab-tools" aria-label="Vocabulary controls">
        <div className="core-vocab-tabs" aria-label="Word type">
          {tabs.map((tab) => <button key={tab.id} type="button" aria-pressed={activeTab === tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)}>{tab.label}<span>{words[tab.id].length}</span></button>)}
        </div>
        <div className="core-vocab-progress"><span>{learned.length} of {TOTAL_WORDS} words learned</span><div className="core-vocab-progress-track"><span style={{ width: `${Math.min(learned.length / TOTAL_WORDS * 100, 100)}%` }} /></div></div>
        {activeTab === "nouns" && <label className="core-vocab-topic"><span>Noun topic</span><select value={nounGroup} onChange={(event) => setNounGroup(event.target.value)}>{words.nounGroups.map((group) => <option key={group.name}>{group.name}</option>)}</select></label>}
        <label className="core-vocab-search"><span>Search {active.label.toLowerCase()}</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={activeTab === "nouns" ? "Search noun, article, plural, or meaning" : "Search German or English"} /></label>
        <div className="core-vocab-hint"><span>{active.note} Showing {visibleEntries.length} of {entries.length} {active.label.toLowerCase()}.</span><label><input type="checkbox" checked={showLearned} onChange={(event) => setShowLearned(event.target.checked)} /> Include learned</label></div>
        {activeTab === "verbs" && <p className="core-vocab-study-note">Start with the modal and helper verbs, then learn everyday verbs in short phrases. Showing {visibleEntries.filter(({ entry }) => MODAL_AND_HELPER_VERBS.has(entry[0])).length} modal and helper verbs first.</p>}
        {activeTab === "nouns" && <div className="core-vocab-article-key" aria-label="Article colors"><span><i className="masculine" /> der</span><span><i className="feminine" /> die</span><span><i className="neuter" /> das</span><span><i className="plural" /> plural-only</span></div>}
        {activeTab === "nouns" && <aside className="core-vocab-insight" aria-live="polite">
          <div className="core-vocab-insight-heading"><strong>Article snapshot · {selectedNounGroup.name}</strong><span>{selectedNouns.length} nouns</span></div>
          <div className="core-vocab-article-counts"><span className="masculine">der · {articleCounts.der}</span><span className="feminine">die · {articleCounts.die}</span><span className="neuter">das · {articleCounts.das}</span>{pluralOnlyCount > 0 && <span className="plural-count">plural-only · {pluralOnlyCount}</span>}</div>
          <p>{commonArticle ? `In this list, ${commonArticle === "der" ? "masculine der" : commonArticle === "die" ? "feminine die" : "neuter das"} nouns are most common (${articleCounts[commonArticle]} of ${selectedNouns.length}).` : "No single article dominates this topic; compare the counts and examples below."} {selectedNounGroup.articleTip}</p>
          <small>Examples by gender: {["der", "die", "das"].filter((article) => articleCounts[article] > 0).map((article) => `${articleExamples[article].join(", ")} (${articleCounts[article]})`).join(" · ")}{pluralOnlyCount > 0 ? " · die Leute (plural only)" : ""}</small>
        </aside>}
      </section>

      {activeTab === "adjectives" && <details className="adjective-use-guide">
        <summary className="adjective-guide-summary"><span>ADJECTIVES · QUICK GUIDE</span><strong>Use adjectives naturally</strong><small>Basic form, endings before nouns, and comparisons</small></summary>
        <div className="adjective-guide-content">
          <p>{adjectiveGuide.intro}</p>
          <div className="adjective-rule-grid">{adjectiveGuide.lessons.map((lesson) => <article className="adjective-rule-card" key={lesson.title}>
            <span>{lesson.label}</span><h3>{lesson.title}</h3>
            <div className="adjective-rule-examples">{lesson.examples.map((example) => <div key={example.german}><strong lang="de">{example.german}</strong><small lang="en">{example.english}</small></div>)}</div>
            <p>{lesson.note}</p>
          </article>)}</div>
          <footer><span>{adjectiveGuide.caution}</span><Link to="/german-cases">Open adjective-ending and case charts →</Link></footer>
        </div>
      </details>}

      {activeTab === "nouns" && <details className="noun-gender-guide">
        <summary className="noun-gender-summary">
          <span>NOUNS · ARTICLE GUIDE</span><strong id="noun-gender-heading">Noun gender clues</strong>
          <small>Suffixes, categories, exceptions, and articles in sentences</small>
        </summary>
        <div className="noun-gender-content">
          <p className="noun-gender-intro">{nounGenderGuide.intro}</p>
          <div className="noun-rule-grid">
            {nounGenderGuide.rules.map((rule) => <article className="noun-rule-card" key={rule.group}>
              <span>{rule.likelihood}</span><h3>{rule.group}</h3>
              <ul>{rule.endings.map((ending) => <li key={ending}>{ending}</li>)}</ul>
              <p className="noun-rule-examples">{rule.examples.map((example) => <span lang="de" key={example}>{example}</span>)}</p>
              <p className="noun-rule-note">{rule.note}</p>
            </article>)}
          </div>
          <aside className="noun-rule-cautions"><strong>Keep in mind</strong><ul>{nounGenderGuide.cautions.map((caution) => <li key={caution}>{caution}</li>)}</ul></aside>
          <section className="noun-case-guide" aria-labelledby="noun-case-guide-heading">
            <div><h3 id="noun-case-guide-heading">{nounGenderGuide.caseGuide.title}</h3><p>{nounGenderGuide.caseGuide.intro}</p></div>
            <div className="noun-case-examples">{nounGenderGuide.caseGuide.examples.map((item) => <article key={item.case}>
              <span>{item.case}</span><strong lang="de">{item.form}</strong><p lang="de">{item.sentence}</p><small lang="en">{item.translation}{item.note ? ` · ${item.note}` : ""}</small>
            </article>)}</div>
            <footer><span>{nounGenderGuide.caseGuide.tip}</span><Link to="/german-cases">{nounGenderGuide.caseGuide.linkLabel} →</Link></footer>
          </section>
        </div>
      </details>}

      {activeTab === "verbs" && <details className="verb-learning-guide">
        <summary className="verb-guide-summary"><span>VERBS · QUICK GUIDE</span><strong>Build a verb sentence quickly</strong><small>Present-tense endings, modal word order, and the Perfekt</small></summary>
        <div className="verb-guide-content">
          <article><span>1 · PRESENT TENSE</span><p lang="de"><strong>ich lerne · du lernst · er lernt</strong></p><small lang="en">For most verbs, remove <em>-en</em> and add <em>-e, -st, -t</em>. With <em>wir/ihr/sie</em>: <em>lernen/lernt/lernen</em>.</small></article>
          <article><span>2 · WATCH THE STEM</span><p lang="de"><strong>ich fahre · du fährst · er fährt</strong></p><small lang="en">Some common verbs change their vowel in <em>du</em> and <em>er/sie/es</em>. Learn those forms as a pair; the other persons usually keep the infinitive stem.</small></article>
          <article><span>3 · MODAL + INFINITIVE</span><p lang="de"><strong>Ich kann heute kommen.</strong></p><small lang="en">The conjugated modal takes position 2; the second verb stays in the infinitive at the end.</small></article>
          <article><span>4 · PERFEKT: LEARN THE PAIR</span><p lang="de"><strong>Ich habe gelernt. · Ich bin gekommen.</strong></p><small lang="en">Most verbs use <em>haben</em>; many verbs of movement or change of state use <em>sein</em>. Learn the auxiliary with each participle.</small></article>
          <p className="verb-guide-tip"><strong>Quick practice:</strong> pick one verb, say it with <em>ich</em>, <em>du</em>, and <em>wir</em>, then make one sentence about your day. That trains recall and word order together.</p>
        </div>
      </details>}

      {activeTab === "verbs" && <details className="verb-learning-guide prefix-guide">
        <summary className="verb-guide-summary"><span>VERBS · PREFIXES</span><strong>Separable and inseparable verbs</strong><small>Spot the prefix, place it correctly, and remember the Perfekt pattern</small></summary>
        <div className="verb-prefix-content">
          <article className="verb-prefix-card separable">
            <span>SEPARABLE · prefix moves to the end</span>
            <p lang="de"><strong>anrufen → Ich rufe dich an.</strong></p>
            <p lang="de"><strong>aufstehen → Ich stehe früh auf.</strong></p>
            <small>In a main clause, the verb stem is conjugated and the prefix goes to the end. In the Perfekt, <em>ge</em> usually sits between prefix and stem: <em>angerufen, aufgestanden</em>.</small>
            <div className="verb-prefix-memory"><strong>Common separable prefixes</strong><span>an · auf · aus · ein · mit · nach · vor · weg · zu · zurück</span></div>
          </article>
          <article className="verb-prefix-card inseparable">
            <span>INSEPARABLE · stays attached</span>
            <p lang="de"><strong>besuchen → Ich besuche meine Freundin.</strong></p>
            <p lang="de"><strong>verstehen → Ich verstehe die Frage.</strong></p>
            <small>These prefixes stay attached in a main clause. Their Perfekt participle has no <em>ge</em>: <em>besucht, verstanden</em>.</small>
            <div className="verb-prefix-memory"><strong>Learn these as a set</strong><span>be · emp · ent · er · ge · miss · ver · zer</span></div>
          </article>
          <p className="verb-prefix-caution"><strong>Small caution:</strong> <em>um-, über-, unter-, durch-, wieder-</em> can be separable or inseparable depending on meaning and stress. Learn the whole verb with an example sentence.</p>
        </div>
      </details>}

      {visibleEntries.length ? <div className="core-vocab-list" aria-label={active.label}>
        {activeTab === "verbs" && visibleEntries.some(({ entry }) => MODAL_AND_HELPER_VERBS.has(entry[0])) && <h2 className="core-vocab-section-heading">Modal and helper verbs <span>Modal verbs change what you can, must, may, should, or want to do.</span></h2>}
        {visibleEntries.map(({ entry, key }, index) => {
          const isModalAndHelper = activeTab === "verbs" && MODAL_AND_HELPER_VERBS.has(entry[0]);
          const previousIsModalAndHelper = index > 0 && MODAL_AND_HELPER_VERBS.has(visibleEntries[index - 1].entry[0]);
          const firstCoreVerb = activeTab === "verbs" && !isModalAndHelper && (index === 0 || !previousIsModalAndHelper);
          const word = entry[0];
          const meaning = activeTab === "verbs" ? entry[1] : activeTab === "adjectives" ? entry[1] : entry[2];
          return <React.Fragment key={key}>{firstCoreVerb && <h2 className="core-vocab-section-heading">Everyday and useful verbs <span>Build vocabulary through actions and real situations.</span></h2>}<article className="core-vocab-row">
            <span className="core-vocab-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="core-vocab-word"><h2 lang="de">{word}</h2><div className="core-vocab-details">{renderDetails(entry)}</div></div>
            <p className="core-vocab-meaning" lang="en">{meaning}</p>
            <button type="button" className="core-vocab-audio" onClick={() => speak(word)} aria-label={`Listen to ${word}`} title="Listen"><FaVolumeUp /></button>
            <button type="button" className={`core-vocab-learned ${learned.includes(key) ? "is-learned" : ""}`} onClick={() => toggleLearned(key)} aria-label={learned.includes(key) ? `Mark ${word} as not learned` : `Mark ${word} as learned`} title={learned.includes(key) ? "Mark not learned" : "Mark learned"}><FaCheck /></button>
          </article></React.Fragment>;
        })}
      </div> : <div className="core-vocab-empty"><h2>No words found</h2><p className="mb-0">Try another spelling or include learned words in the list.</p></div>}

    </main>
  );
}

export default GermanCoreVocabularyPage;
