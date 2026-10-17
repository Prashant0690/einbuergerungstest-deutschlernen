import React, { useMemo, useState } from "react";
import { FaCheck, FaVolumeUp } from "react-icons/fa";
import vocabulary from "../data/vocabulary.json";

const savedLearned = () => {
  try { return JSON.parse(localStorage.getItem("learnedCitizenshipWords") || "[]"); } catch { return []; }
};

function VocabularyPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All topics");
  const [learned, setLearned] = useState(savedLearned);
  const categories = ["All topics", ...new Set(vocabulary.vocabulary.map((item) => item.category))];
  const visibleWords = useMemo(() => vocabulary.vocabulary.filter((item) => {
    const matchesCategory = category === "All topics" || category === item.category;
    const matchesQuery = `${item.word} ${item.translation} ${item.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  const toggleLearned = (word) => setLearned((previous) => {
    const next = previous.includes(word) ? previous.filter((item) => item !== word) : [...previous, word];
    localStorage.setItem("learnedCitizenshipWords", JSON.stringify(next));
    return next;
  });

  const speak = (word) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mt-4 vocabulary-page">
      <section className="home-hero learning-library-hero">
        <p className="path-kicker mb-2">German vocabulary · citizenship topics</p>
        <h1 className="display-6 fw-bold mb-2">Words worth knowing</h1>
        <p className="lead mb-0">Build the vocabulary to understand exam questions and talk about life in Germany.</p>
      </section>
      <section className="vocabulary-controls mt-4">
        <div className="vocabulary-progress"><div><span className="path-kicker">Your word list</span><strong>{learned.length} <span>of {vocabulary.vocabulary.length} learned</span></strong></div><div className="progress"><div className="progress-bar" style={{ width: `${(learned.length / vocabulary.vocabulary.length) * 100}%` }} /></div></div>
        <div className="row g-3 align-items-end mt-1"><div className="col-md-7"><label className="form-label fw-semibold" htmlFor="vocabulary-search">Search words</label><input id="vocabulary-search" className="form-control" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search German, English, or topic" /></div><div className="col-md-5"><label className="form-label fw-semibold" htmlFor="vocabulary-category">Filter by topic</label><select id="vocabulary-category" className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div></div>
        <p className="small text-muted mt-3 mb-0">Showing {visibleWords.length} {visibleWords.length === 1 ? "word" : "words"}. Select “I know this” to save your progress.</p>
      </section>
      {visibleWords.length ? <div className="row g-3 mt-1">{visibleWords.map((item) => {
        const isLearned = learned.includes(item.word);
        return <div className="col-sm-6 col-xl-4" key={item.word}><article className={`vocabulary-word-card ${isLearned ? "learned" : ""}`}><div className="d-flex justify-content-between gap-2 align-items-start"><span className="vocabulary-category">{item.category}</span><button type="button" className="speak-word" onClick={() => speak(item.word)} aria-label={`Listen to ${item.word}`} title="Listen"><FaVolumeUp /></button></div><h2 lang="de" className="h4 mt-3">{item.word}</h2><p lang="en" className="vocabulary-translation">{item.translation}</p><button type="button" className={`learned-toggle ${isLearned ? "active" : ""}`} onClick={() => toggleLearned(item.word)} aria-pressed={isLearned}>{isLearned && <FaCheck className="me-2" />}{isLearned ? "Learned" : "I know this"}</button></article></div>;
      })}</div> : <div className="empty-search mt-3 p-4"><h2 className="h5">No words found</h2><p className="mb-0">Try a different spelling or choose another topic.</p></div>}
    </div>
  );
}

export default VocabularyPage;
