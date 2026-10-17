import React from "react";
import { Link } from "react-router-dom";
import guide from "../data/germanWhQuestionsGuide.json";
import "./GermanWhQuestionsPage.css";

function GermanWhQuestionsPage() {
  return (
    <main className="wh-guide">
      <header className="wh-hero">
        <p className="wh-eyebrow">GERMAN · A1–A2 QUICK GUIDE</p>
        <h1>Ask better questions in German</h1>
        <p>Choose the right question word, keep the conjugated verb in second position, and answer with the information you need.</p>
        <div className="wh-hero-rule"><strong>The key pattern</strong><span>Question phrase + conjugated verb + subject + rest?</span></div>
      </header>

      <nav className="wh-index" aria-label="Guide sections">
        {guide.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.navLabel}</a>)}
      </nav>

      <section className="wh-section" id="question-words">
        <div className="wh-section-heading"><span>01</span><div><p>Start here</p><h2>Choose the question word</h2></div></div>
        <div className="wh-word-grid">
          {guide.words.map((item) => (
            <article className="wh-word-card" key={item.word}>
              <h3>{item.word}</h3><p className="wh-meaning">{item.meaning}</p>
              <p className="wh-example" lang="de">{item.example}</p>
              <p className="wh-translation">{item.translation}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wh-section" id="easy-to-confuse">
        <div className="wh-section-heading"><span>02</span><div><p>Small word, big difference</p><h2>Words learners often mix up</h2></div></div>
        <div className="wh-contrast-grid">
          {guide.contrasts.map((item) => (
            <article className="wh-contrast-card" key={item.title}>
              <h3>{item.title}</h3>
              {item.items.map((example) => <p key={example.german}><strong lang="de">{example.german}</strong><span>{example.meaning}</span></p>)}
              <small>{item.tip}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="wh-section" id="word-order">
        <div className="wh-section-heading"><span>03</span><div><p>Build the question</p><h2>Keep the conjugated verb in position two</h2></div></div>
        <p className="wh-section-intro">Count the whole question phrase as the first position. The verb comes next—even when the phrase contains more than one word.</p>
        <div className="wh-pattern-list">
          {guide.patterns.map((item) => (
            <article className="wh-pattern-card" key={item.label}>
              <div><h3>{item.label}</h3><p>{item.structure}</p></div>
              <div><p className="wh-example" lang="de">{item.example}</p><p className="wh-translation">{item.translation}</p></div>
            </article>
          ))}
        </div>
        <aside className="wh-note"><strong>Remember:</strong> In Perfekt, the helper verb stays in position two and the participle goes to the end. With a modal, the modal is in position two and the infinitive goes to the end.</aside>
      </section>

      <section className="wh-section" id="practice">
        <div className="wh-section-heading"><span>04</span><div><p>Recall, then check</p><h2>Build a question and answer</h2></div></div>
        <p className="wh-section-intro">Read the situation, say the German question aloud, then open the answer. Notice how the answer gives the missing information.</p>
        <div className="wh-practice-grid">
          {guide.practice.map((item, index) => (
            <details className="wh-practice-card" key={item.prompt}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><span>{item.prompt}</span></summary>
              <div className="wh-practice-answer">
                <p className="wh-example" lang="de">{item.question}</p><p className="wh-translation">{item.questionTranslation}</p>
                <p className="wh-example" lang="de">{item.answer}</p><p className="wh-translation">{item.answerTranslation}</p>
                <small>{item.tip}</small>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="wh-footer"><p>Ready to practise another sentence pattern?</p><Link to="/german-modal-verbs">Continue with modal verbs <span aria-hidden="true">→</span></Link></footer>
    </main>
  );
}

export default GermanWhQuestionsPage;
