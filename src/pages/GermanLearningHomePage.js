// src/pages/GermanLearningHomePage.js
import React from "react";
import { Link } from "react-router-dom";

function GermanLearningHomePage() {
  const learningCards = [
    {
      title: "Conversational German Flashcard Sprint",
      path: "/german-flashcard-sprint",
      description: "Master 98 high-frequency conversation words with random flashcards and timed auto-reveal mode.",
    },
    {
      title: "Grammar Quick Reference",
      path: "/german-grammar",
      description: "Refresh sentence structure, tenses, and common grammar rules with concise explanations.",
    },
    {
      title: "German Cases Master",
      path: "/german-cases",
      description: "Improve confidence with Nominativ, Akkusativ, Dativ, and Genitiv in context.",
    },
    {
      title: "German Cases Practice 400",
      path: "/german-cases-practice",
      description: "Work through all sections from the 400-question German cases practice document.",
    },
    {
      title: "Einbürgerung Vocabulary",
      path: "/VocabularyPage",
      description: "Build key vocabulary linked to Einbürgerungstest topics and everyday communication.",
    },
  ];

  return (
    <div className="container mt-4">
      <section className="home-hero text-center">
        <p className="text-uppercase fw-semibold text-primary mb-2">German Learning</p>
        <h1 className="display-6 fw-bold mb-3">Build practical German for everyday life</h1>
        <p className="lead mb-0">
          Strengthen vocabulary, grammar, and spoken confidence with focused, interactive learning paths.
        </p>
      </section>

      <div className="row g-3 mt-1">
        {learningCards.map((card) => (
          <div className="col-md-6" key={card.path}>
            <div className="quick-link-card p-4 h-100">
              <h2 className="h5">
                <Link to={card.path}>{card.title}</Link>
              </h2>
              <p className="mb-0">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GermanLearningHomePage;
