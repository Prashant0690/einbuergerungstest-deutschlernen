import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck, FaVolumeUp } from "react-icons/fa";
import words from "../data/deutschlearnen/conversational_german_words.json";

const REVIEW_KEY = "germanFlashcardReviewV2";
const SESSION_SIZES = [10, 20, 40, "all"];
const shuffle = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
const loadProgress = () => {
  try { return JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}"); } catch { return {}; }
};

function ConversationalGermanQuickLearning() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All packs");
  const [sessionSize, setSessionSize] = useState(20);
  const [promptLanguage, setPromptLanguage] = useState("english");
  const [progress, setProgress] = useState(loadProgress);
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [repeatedIds, setRepeatedIds] = useState([]);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const categories = useMemo(() => [...new Set(words.map((word) => word.Category))], []);
  const filteredWords = useMemo(() => words.filter((word) => {
    const matchesCategory = category === "All packs" || word.Category === category;
    const searchText = (word.GermanWord + " " + word.EnglishMeanings.join(" ") + " " + word.Note + " " + word.ExampleGerman).toLocaleLowerCase();
    return matchesCategory && searchText.includes(query.toLocaleLowerCase().trim());
  }), [category, query]);
  const categoriesDue = useMemo(() => filteredWords.filter((word) => progress[word.id] && progress[word.id].dueAt <= Date.now()).length, [filteredWords, progress]);
  const newCount = useMemo(() => filteredWords.filter((word) => !progress[word.id]).length, [filteredWords, progress]);

  const startSession = useCallback(() => {
    const now = Date.now();
    const records = progressRef.current;
    const due = filteredWords.filter((word) => records[word.id] && records[word.id].dueAt <= now);
    const fresh = filteredWords.filter((word) => !records[word.id]);
    const later = filteredWords.filter((word) => records[word.id] && records[word.id].dueAt > now).sort((a, b) => records[a.id].dueAt - records[b.id].dueAt);
    const ordered = [...shuffle(due), ...shuffle(fresh), ...later];
    setDeck(ordered.slice(0, sessionSize === "all" ? ordered.length : Number(sessionSize)));
    setCardIndex(0);
    setRevealed(false);
    setRepeatedIds([]);
  }, [filteredWords, sessionSize]);
  useEffect(() => { startSession(); }, [startSession]);

  const currentCard = deck[cardIndex];
  const masteredCount = words.filter((word) => (progress[word.id]?.stage || 0) >= 3).length;
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  };
  const setRating = (rating) => {
    if (!currentCard) return;
    const previous = progress[currentCard.id]?.stage || 0;
    const stage = rating === "again" ? 0 : rating === "hard" ? Math.max(1, previous) : Math.min(4, previous + 1);
    const intervals = { again: 5 * 60 * 1000, hard: 24 * 60 * 60 * 1000, good: [24 * 60 * 60 * 1000, 3 * 86400000, 7 * 86400000, 14 * 86400000][stage - 1] };
    const nextProgress = { ...progress, [currentCard.id]: { stage, dueAt: Date.now() + intervals[rating] } };
    setProgress(nextProgress);
    localStorage.setItem(REVIEW_KEY, JSON.stringify(nextProgress));
    if (rating === "again" && !repeatedIds.includes(currentCard.id)) {
      setDeck((previousDeck) => [...previousDeck, currentCard]);
      setRepeatedIds((previousIds) => [...previousIds, currentCard.id]);
    }
    setRevealed(false);
    setCardIndex((index) => index + 1);
  };
  const addWordToSession = (word) => {
    const existingIndex = deck.findIndex((item) => item.id === word.id);
    if (existingIndex >= 0) setCardIndex(existingIndex);
    else { setDeck((previous) => [...previous, word]); setCardIndex(deck.length); }
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mt-4 flashcard-page">
      <section className="flashcard-intro">
        <p className="path-kicker mb-2">Everyday German · 57 selected phrases</p>
        <h1>Learn useful German in context</h1>
        <p>Study a small set, recall each phrase, then rate how well you knew it. Approximate CEFR levels and tone notes help you choose the right expression.</p>
      </section>

      <section className="flashcard-toolbar mt-4" aria-label="Study settings">
        <div className="row g-3 align-items-end">
          <div className="col-lg-5"><label className="form-label" htmlFor="flashcard-search">Find a word or phrase</label><input id="flashcard-search" className="form-control" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search German, meaning, or example" /></div>
          <div className="col-sm-6 col-lg-3"><label className="form-label" htmlFor="flashcard-pack">Study pack</label><select id="flashcard-pack" className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}><option>All packs</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
          <div className="col-sm-6 col-lg-2"><label className="form-label" htmlFor="flashcard-size">Cards this session</label><select id="flashcard-size" className="form-select" value={sessionSize} onChange={(event) => setSessionSize(event.target.value === "all" ? "all" : Number(event.target.value))}>{SESSION_SIZES.map((size) => <option key={size} value={size}>{size === "all" ? "All matching" : size}</option>)}</select></div>
          <div className="col-lg-2"><label className="form-label" htmlFor="flashcard-direction">Recall from</label><select id="flashcard-direction" className="form-select" value={promptLanguage} onChange={(event) => { setPromptLanguage(event.target.value); setRevealed(false); }}><option value="english">English</option><option value="german">German</option></select></div>
        </div>
        <div className="flashcard-study-summary mt-3"><span><strong>{categoriesDue}</strong> due to review</span><span><strong>{newCount}</strong> new</span><span><strong>{masteredCount}</strong> confident</span></div>
      </section>

      {!filteredWords.length ? (
        <section className="flashcard-empty mt-4"><h2 className="h4">No matching phrases</h2><p>Try another search term or choose a different study pack.</p></section>
      ) : currentCard ? (
        <section className="flashcard-study-area mt-4" aria-live="polite">
          <div className="flashcard-session-meta"><span>{currentCard.Category} <span className="flashcard-meta-dot">·</span> {currentCard.CEFR}</span><span>Card {cardIndex + 1} of {deck.length}</span></div>
          <div className={"flashcard-main" + (revealed ? " is-revealed" : "")}>
            <span className="flashcard-prompt-label">{promptLanguage === "english" ? "Recall in German" : "Recall the meaning"}</span>
            <div className="flashcard-prompt-row"><h2 lang={promptLanguage === "english" ? "en" : "de"}>{promptLanguage === "english" ? currentCard.EnglishMeanings.join(" · ") : currentCard.GermanWord}</h2>{promptLanguage === "german" && <button type="button" className="flashcard-audio" onClick={() => speak(currentCard.GermanWord)} aria-label={"Hear " + currentCard.GermanWord}><FaVolumeUp /></button>}</div>
            {revealed ? (
              <div className="flashcard-answer">
                <div className="flashcard-answer-heading"><h3 lang="de">{currentCard.GermanWord}</h3><button type="button" className="flashcard-audio" onClick={() => speak(currentCard.GermanWord)} aria-label={"Hear " + currentCard.GermanWord}><FaVolumeUp /></button></div>
                <p className="flashcard-meaning">{currentCard.EnglishMeanings.join(" · ")}</p>
                <blockquote><p lang="de">{currentCard.ExampleGerman}</p><footer>{currentCard.ExampleEnglish}</footer></blockquote>
                <details className="flashcard-teacher-note"><summary>Teacher’s note · {currentCard.Register}</summary><p>{currentCard.Note}</p></details>
              </div>
            ) : <p className="flashcard-hint">Think of the German phrase before revealing the answer.</p>}
          </div>
          {!revealed ? <button type="button" className="btn btn-primary flashcard-reveal" onClick={() => setRevealed(true)}>Reveal answer</button> : (
            <div className="flashcard-rating"><p>How well did you remember it?</p><button type="button" className="rating-again" onClick={() => setRating("again")}><strong>Again</strong><span>Review it once more</span></button><button type="button" className="rating-hard" onClick={() => setRating("hard")}><strong>Hard</strong><span>Bring it back tomorrow</span></button><button type="button" className="rating-good" onClick={() => setRating("good")}><strong>Got it</strong><span>Move it further out</span></button></div>
          )}
        </section>
      ) : (
        <section className="flashcard-empty mt-4"><FaCheck /><h2 className="h4">That’s the session done.</h2><p>Your review choices are saved on this device. Come back later and due cards will be brought forward.</p><button type="button" className="btn btn-outline-primary" onClick={() => { setCategory("All packs"); setQuery(""); setSessionSize(20); }}>Start another short session</button></section>
      )}

      <details className="flashcard-word-list mt-4"><summary>Browse the {filteredWords.length} phrases in this pack</summary><div className="flashcard-list-grid">{filteredWords.map((word) => (
        <article key={word.id} className="flashcard-list-item"><div><h3 lang="de">{word.GermanWord}</h3><p>{word.EnglishMeanings.join(" · ")}</p><small>{word.Category} · {word.CEFR} · {word.Register}</small></div><button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addWordToSession(word)}>Study</button></article>
      ))}{!filteredWords.length && <p className="text-muted">No matching phrases. Try another search.</p>}</div></details>
    </div>
  );
}

export default ConversationalGermanQuickLearning;
