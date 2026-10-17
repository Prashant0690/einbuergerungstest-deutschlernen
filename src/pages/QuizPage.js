import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { loadGeneralQuestions, loadStateQuestions } from "../data/content";
import { getImageUrl, processAnswer, updateAnswerArray } from "../utils/quizUtils";

const TEST_MINUTES = 60;
const TOTAL_QUESTIONS = 33;
const GENERAL_COUNT = 30;
const STATE_COUNT = 3;

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function QuizPage() {
  const { bundesland } = useQuizContext();
  const storageKey = `citizenshipExam_${bundesland}`;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [expiresAt, setExpiresAt] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(TEST_MINUTES * 60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const makeExam = useCallback(() => {
    const general = shuffle(loadGeneralQuestions()).slice(0, GENERAL_COUNT);
    const state = shuffle(loadStateQuestions()[bundesland] || []).slice(0, STATE_COUNT);
    return shuffle([...general, ...state]);
  }, [bundesland]);

  useEffect(() => {
    if (!bundesland) {
      setQuestions([]);
      return;
    }
    let saved;
    try { saved = JSON.parse(sessionStorage.getItem(storageKey) || "null"); } catch { saved = null; }
    if (saved && Array.isArray(saved.questions) && saved.questions.length === TOTAL_QUESTIONS) {
      setQuestions(saved.questions);
      setAnswers(saved.answers || []);
      setCurrentIndex(saved.currentIndex || 0);
      setExpiresAt(saved.expiresAt);
      setSubmitted(Boolean(saved.submitted));
    } else {
      const nextQuestions = makeExam();
      const nextExpiresAt = Date.now() + TEST_MINUTES * 60 * 1000;
      setQuestions(nextQuestions);
      setAnswers([]);
      setCurrentIndex(0);
      setExpiresAt(nextExpiresAt);
      setSubmitted(false);
      sessionStorage.setItem(storageKey, JSON.stringify({ questions: nextQuestions, answers: [], currentIndex: 0, expiresAt: nextExpiresAt, submitted: false }));
    }
  }, [bundesland, storageKey, makeExam]);

  useEffect(() => {
    if (!questions.length || !expiresAt || submitted) return undefined;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) setSubmitted(true);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [questions.length, expiresAt, submitted]);

  useEffect(() => {
    if (!questions.length || !expiresAt) return;
    sessionStorage.setItem(storageKey, JSON.stringify({ questions, answers, currentIndex, expiresAt, submitted }));
  }, [questions, answers, currentIndex, expiresAt, submitted, storageKey]);

  const selectedFor = (question) => answers.find((answer) => answer.id === question.id && answer.region === question.region);
  const answerCount = answers.length;
  const currentQuestion = questions[currentIndex];
  const results = useMemo(() => answers.reduce((totals, answer) => {
    totals[answer.isCorrect ? "correct" : "incorrect"] += 1;
    return totals;
  }, { correct: 0, incorrect: 0 }), [answers]);
  const unattempted = Math.max(0, questions.length - answerCount);
  const clock = `${String(Math.floor(secondsLeft / 3600)).padStart(2, "0")}:${String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const submit = () => setSubmitted(true);
  const selectOption = (question, optionText) => setAnswers((previous) => updateAnswerArray(previous, processAnswer(question, optionText)));
  const startNew = () => {
    const nextQuestions = makeExam();
    const nextExpiresAt = Date.now() + TEST_MINUTES * 60 * 1000;
    setQuestions(nextQuestions); setAnswers([]); setCurrentIndex(0); setExpiresAt(nextExpiresAt); setSecondsLeft(TEST_MINUTES * 60); setSubmitted(false);
  };

  if (!bundesland) return <div className="container mt-4"><div className="empty-search p-4"><h1 className="h4">Choose your Bundesland to start</h1><p>Select your state in the header to include the three state-specific exam questions.</p><Link to="/">Back to overview</Link></div></div>;
  if (!questions.length) return <div className="container mt-4">Preparing your exam…</div>;

  return (
    <div className="container mt-4 exam-page">
      <section className="exam-topbar">
        <div><p className="path-kicker mb-1">Official-style exam simulation</p><h1 className="h3 mb-1">Einbürgerungstest · {bundesland}</h1><p className="text-muted mb-0">30 general questions + 3 from your state</p></div>
        {!submitted && <div className={`exam-clock ${secondsLeft < 300 ? "urgent" : ""}`} aria-live="polite"><span>Time remaining</span><strong>{clock}</strong></div>}
      </section>

      {!submitted ? <>
        <div className="exam-progress-row"><span>{answerCount} of {TOTAL_QUESTIONS} answered</span><span>{currentIndex + 1} of {TOTAL_QUESTIONS}</span></div>
        <div className="progress exam-progress" role="progressbar" aria-valuenow={answerCount} aria-valuemin="0" aria-valuemax={TOTAL_QUESTIONS}><div className="progress-bar" style={{ width: `${(answerCount / TOTAL_QUESTIONS) * 100}%` }} /></div>
        <div className="exam-layout mt-4">
          <aside className="exam-question-map"><h2 className="h6">Question map</h2><div className="exam-map-grid">{questions.map((question, index) => {
            const savedAnswer = selectedFor(question);
            return <button key={`${question.region}-${question.id}`} type="button" onClick={() => setCurrentIndex(index)} className={`exam-map-button ${index === currentIndex ? "current" : ""} ${savedAnswer ? "answered" : ""}`} aria-label={`Go to question ${index + 1}${savedAnswer ? ", answered" : ", unanswered"}`}>{index + 1}</button>;
          })}</div><p className="small text-muted mt-3 mb-0">Blue = current · Green = answered</p></aside>
          <section className="exam-question-card">
            <div className="d-flex justify-content-between align-items-center gap-2 mb-3"><span className="path-kicker">Question {currentIndex + 1}</span><span className="exam-region-tag">{currentQuestion.region === "All" ? "General" : currentQuestion.region}</span></div>
            {currentQuestion.answerType === "image" && <img src={getImageUrl(currentQuestion.region, currentQuestion.id)} className="exam-image" alt={currentQuestion.englishQuestion || currentQuestion.germanQuestion} />}
            <h2 className="h4 mb-4">{currentQuestion.germanQuestion}</h2>
            <div className="d-grid gap-2">{currentQuestion.options.map((option, index) => {
              const chosen = selectedFor(currentQuestion)?.selectedGermanOption === option.germanOption;
              return <button type="button" key={`${index}-${option.germanOption}`} className={`exam-option ${chosen ? "selected" : ""}`} onClick={() => selectOption(currentQuestion, option.germanOption)}><span className="exam-option-letter">{String.fromCharCode(65 + index)}</span><span>{option.germanOption}</span><span className="exam-option-check" aria-hidden="true">{chosen ? "✓" : ""}</span></button>;
            })}</div>
            <div className="exam-card-footer"><button type="button" className="btn btn-outline-primary" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}>← Previous</button><button type="button" className="btn btn-primary" onClick={() => currentIndex === TOTAL_QUESTIONS - 1 ? submit() : setCurrentIndex((index) => Math.min(TOTAL_QUESTIONS - 1, index + 1))}>{currentIndex === TOTAL_QUESTIONS - 1 ? "Finish exam" : "Next question →"}</button></div>
          </section>
        </div>
        <div className="exam-submit-row"><span>{unattempted ? `${unattempted} question${unattempted === 1 ? "" : "s"} still unanswered` : "All questions answered"}</span><button type="button" className="btn btn-outline-dark" onClick={() => { if (!unattempted || window.confirm(`You have ${unattempted} unanswered questions. Submit anyway?`)) submit(); }}>Submit exam</button></div>
      </> : <section className="exam-results mt-4">
        <p className="path-kicker mb-1">Exam complete</p><h2 className="display-6 fw-bold">{results.correct >= 17 ? "You passed the practice exam" : "Keep practising — you’re getting there"}</h2>
        <p className="lead">{results.correct} correct out of 33 · passing score: 17</p>
        <div className="row g-3 my-3"><div className="col-sm-4"><div className="result-stat"><strong>{results.correct}</strong><span>Correct</span></div></div><div className="col-sm-4"><div className="result-stat"><strong>{results.incorrect}</strong><span>Incorrect</span></div></div><div className="col-sm-4"><div className="result-stat"><strong>{unattempted}</strong><span>Unanswered</span></div></div></div>
        <div className="d-flex flex-wrap gap-2 mb-4"><button type="button" className="btn btn-primary" onClick={startNew}>Start a new exam</button><Link className="btn btn-outline-primary" to="/general-questions">Review the question bank</Link></div>
        <h3 className="h4 mb-3">Answer review</h3>
        <div className="d-grid gap-3">{questions.map((question, index) => {
          const answer = selectedFor(question);
          return <article className="review-card" key={`${question.region}-${question.id}`}><div className="d-flex justify-content-between gap-3"><h4 className="h6">{index + 1}. {question.germanQuestion}</h4><span className={`result-chip ${answer ? answer.isCorrect ? "correct" : "incorrect" : "unanswered"}`}>{answer ? answer.isCorrect ? "Correct" : "Review" : "Skipped"}</span></div><p className="mb-1">Your answer: {answer?.selectedGermanOption || "No answer"}</p>{(!answer || !answer.isCorrect) && <p className="text-success mb-0">Correct answer: {question.options.find((option) => option.isCorrect)?.germanOption}</p>}</article>;
        })}</div>
      </section>}
    </div>
  );
}

export default QuizPage;
