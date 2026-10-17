import React from "react";
import { Link } from "react-router-dom";
import guide from "../data/germanGrammarGuide.json";
import "./GermanGrammarPage.css";

function GermanGrammarPage() {
  return (
    <main className="grammar-resource">
      <header className="grammar-hero">
        <p className="grammar-eyebrow">A1–A2 · QUICK REFERENCE</p>
        <h1>German Grammar Essentials</h1>
        <p>Learn the building blocks of clear German: sentence order, questions, cases, and more. Each short lesson pairs a practical rule with an example and a quick check.</p>
      </header>

      <nav className="grammar-index" aria-label="Grammar lessons">
        {guide.lessons.map((lesson, index) => (
          <a href={`#${lesson.id}`} key={lesson.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>{lesson.title}
          </a>
        ))}
      </nav>

      <div className="grammar-lesson-grid">
        {guide.lessons.map((lesson, index) => (
          <article className="grammar-lesson" id={lesson.id} key={lesson.id}>
            <header className="grammar-lesson-heading">
              <span className="grammar-lesson-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="grammar-topic">{lesson.topic}</p>
                <h2>{lesson.title}</h2>
              </div>
            </header>

            <p className="grammar-rule">{lesson.rule}</p>

            <div className="grammar-pattern">
              <span>Pattern</span>
              <p>{lesson.pattern}</p>
            </div>

            <figure className="grammar-example">
              <figcaption>Example</figcaption>
              <p className="grammar-german" lang="de">{lesson.example.german}</p>
              <p className="grammar-english" lang="en">{lesson.example.english}</p>
            </figure>

            <p className="grammar-memory"><strong>Remember</strong>{lesson.memory}</p>

            <details className="grammar-check">
              <summary>Try a quick check</summary>
              <div className="grammar-check-content">
                <p className="grammar-check-prompt">{lesson.check.prompt}</p>
                <p className="grammar-check-answer"><strong>Answer:</strong> {lesson.check.answer}</p>
                <p className="grammar-check-why">{lesson.check.why}</p>
                {lesson.check.link && (
                  <Link className="grammar-more-link" to={lesson.check.link.path}>
                    {lesson.check.link.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </details>
          </article>
        ))}
      </div>
    </main>
  );
}

export default GermanGrammarPage;
