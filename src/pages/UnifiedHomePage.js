import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import catalog from "../data/learningCatalog.json";
import { useQuizContext } from "../context/QuizContext";

function UnifiedHomePage() {
  const { examFormat, examTopics, tools } = catalog.citizenship;
  const { tracks } = catalog.german;
  const { bundesland } = useQuizContext();
  const [progress, setProgress] = useState({ general: 0, state: 0, accuracy: 0 });

  useEffect(() => {
    const read = (key) => {
      try { return JSON.parse(localStorage.getItem(key) || sessionStorage.getItem(key) || "[]"); } catch { return []; }
    };
    const general = read("answeredQuestions");
    const state = bundesland ? read(`answeredQuestions_${bundesland}`) : [];
    const combined = [...general, ...state];
    const correct = combined.filter((answer) => answer.isCorrect).length;
    setProgress({ general: general.length, state: state.length, accuracy: combined.length ? Math.round((correct / combined.length) * 100) : 0 });
  }, [bundesland]);

  return (
    <div className="container mt-4 unified-home">
      <section className="home-hero unified-hero">
        <p className="path-kicker mb-2">One place to prepare and learn</p>
        <h1 className="display-5 fw-bold mb-3">Build your knowledge of life in Germany</h1>
        <p className="lead mb-4">Prepare for the Einbürgerungstest, strengthen your German, and connect what you learn to everyday life.</p>
        <div className="d-flex flex-wrap gap-2">
          <Link className="btn btn-primary" to="/general-questions">Practise test questions <FaArrowRight className="ms-2" /></Link>
          <Link className="btn btn-outline-primary" to="/german-learning">Explore German learning</Link>
        </div>
      </section>

      <section className="progress-overview mt-4" aria-label="Your study progress">
        <div className="progress-overview-copy"><span className="path-kicker">Your progress</span><h2 className="h5 mb-1">Pick up where you left off</h2><p className="text-muted mb-0">Your answers are saved on this device.</p></div>
        <div className="progress-overview-stat"><strong>{progress.general}<span> / 300</span></strong><span>General questions</span><div className="progress"><div className="progress-bar" style={{ width: `${Math.min(100, (progress.general / 300) * 100)}%` }} /></div></div>
        <div className="progress-overview-stat"><strong>{bundesland ? `${progress.state} / 10` : "Choose a state"}</strong><span>{bundesland || "State questions"}</span><div className="progress"><div className="progress-bar" style={{ width: `${Math.min(100, (progress.state / 10) * 100)}%` }} /></div></div>
        <div className="progress-overview-stat"><strong>{progress.accuracy}%</strong><span>Accuracy so far</span><div className="progress"><div className="progress-bar" style={{ width: `${progress.accuracy}%` }} /></div></div>
      </section>

      <section className="mt-5" aria-labelledby="citizenship-section-title">
        <div className="unified-section-heading"><div><p className="path-kicker mb-1">Section 1 · Citizenship preparation</p><h2 id="citizenship-section-title">Know the country. Get ready for the test.</h2></div><Link className="section-more" to="/learningPage">Explore topic library <FaArrowRight className="ms-1" /></Link></div>
        <p className="text-muted">Start with the topic library, practise the full question pool, or run a mock exam. Choose your Bundesland in the header for state-specific questions.</p>
        <div className="row g-3 mt-2">{examFormat.map((item) => <div className="col-md-4" key={item.label}><article className="exam-highlight-card p-4 h-100"><p className="path-kicker mb-2">{item.label}</p><h3 className="h2 fw-bold text-primary">{item.value}</h3><p className="mb-0">{item.detail}</p></article></div>)}</div>
        <h3 className="h5 mt-4 mb-3">What the general questions cover</h3>
        <div className="row g-3">{examTopics.map((topic, index) => <div className="col-md-4" key={topic.title}><article className="topic-card p-3 h-100"><p className="path-kicker mb-2">Topic {index + 1}</p><h4 className="h6">{topic.title}</h4><p className="small text-muted mb-0">{topic.detail}</p></article></div>)}</div>
        <div className="row g-3 mt-1">{tools.map((tool) => <div className="col-md-6 col-xl-3" key={tool.path}><Link className="unified-tool-card" to={tool.path}><span>{tool.title}</span><FaArrowRight /></Link></div>)}</div>
        <p className="small text-muted mt-3 mb-0">Exam details checked against current <a href="https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Einbuergerung/einbuergerung-node.html" target="_blank" rel="noopener noreferrer">BAMF guidance</a> and its <a href="https://oet.bamf.de/ords/oetut/f?p=514%3A1%3A0" target="_blank" rel="noopener noreferrer">official question catalogue</a>.</p>
      </section>

      <section className="mt-5" aria-labelledby="german-section-title">
        <div className="unified-section-heading"><div><p className="path-kicker mb-1">Section 2 · German learning</p><h2 id="german-section-title">Use German with more confidence.</h2></div><Link className="section-more" to="/german-learning">Open German learning <FaArrowRight className="ms-1" /></Link></div>
        <p className="text-muted">Build everyday vocabulary, understand useful grammar, and practise putting sentences together.</p>
        <div className="row g-3 mt-2">{tracks.map((track) => <div className="col-md-6 col-xl-4" key={track.path}><Link className="german-track-card" to={track.path}><span className="path-kicker">{track.level}</span><h3 className="h5 mt-2">{track.title}</h3><p className="mb-0">{track.description}</p></Link></div>)}</div>
      </section>

      <section className="mt-5 support-surface p-4 p-md-5">
        <h2 className="h4">A helpful way to study</h2>
        <p className="mb-0">Learn one topic, review the key facts in both languages, then answer related questions. Short, regular sessions make it easier to remember what you have learned.</p>
      </section>
    </div>
  );
}

export default UnifiedHomePage;
