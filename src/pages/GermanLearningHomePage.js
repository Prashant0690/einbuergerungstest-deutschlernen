// src/pages/GermanLearningHomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import GermanRoleLegend from "../components/GermanRoleLegend";

function GermanLearningHomePage() {
  const learningTracks = [
    {
      title: "Conversational sprint",
      path: "/german-flashcard-sprint",
      description: "Master 98 high-frequency conversation words with fast, repeatable flashcard sessions.",
    },
    {
      title: "Grammar quick reference",
      path: "/german-grammar",
      description: "Refresh sentence structure, tenses, and common grammar rules with concise explanations.",
    },
    {
      title: "Cases master",
      path: "/german-cases",
      description: "Improve confidence with Nominativ, Akkusativ, Dativ, and Genitiv in context.",
    },
    {
      title: "Modal verbs master",
      path: "/german-modal-verbs",
      description: "Learn can, must, want, and should patterns with guided teacher-style practice.",
    },
    {
      title: "WH questions master",
      path: "/german-wh-questions",
      description: "Train German question words and answer structure with role-based sentence mapping.",
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

  const supportCards = [
    {
      title: "Citizenship knowledge library",
      description: "Review history, politics, law, geography, and society with bilingual topic explanations.",
      path: "/learningPage",
      cta: "Open library",
    },
    {
      title: "Official German exam context",
      description: "Use your language learning together with official citizenship resources from BAMF.",
      href: "https://www.bamf.de/DE/Startseite/startseite_node.html",
      cta: "Open BAMF",
    },
  ];

  return (
    <div className="container mt-4">
      <section className="home-hero text-center">
        <p className="text-uppercase fw-semibold text-primary mb-2">German learning and support</p>
        <h1 className="display-6 fw-bold mb-3">Your structured learning path for everyday German</h1>
        <p className="lead mb-0">
          A cleaner course-style experience to study vocabulary, grammar, and speaking confidence.
        </p>
      </section>

      <div className="row g-3 mt-3">
        <div className="col-md-4">
          <div className="exam-highlight-card p-4 h-100 text-center">
            <h2 className="h6 text-uppercase text-muted">Foundation</h2>
            <p className="mb-0">Train high-frequency words with audio support and quick repetition.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="exam-highlight-card p-4 h-100 text-center">
            <h2 className="h6 text-uppercase text-muted">Accuracy</h2>
            <p className="mb-0">Refresh sentence structure, tense usage, and everyday expression patterns.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="exam-highlight-card p-4 h-100 text-center">
            <h2 className="h6 text-uppercase text-muted">Mastery</h2>
            <p className="mb-0">Master Nominativ, Akkusativ, Dativ, and Genitiv through guided practice.</p>
          </div>
        </div>
      </div>

      <h2 className="text-center mt-5 mb-3">Learning tracks</h2>
      <div className="row g-3 mt-1">
        {learningTracks.map((card) => (
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

      <h2 className="text-center mt-5 mb-2">Sentence colour concept</h2>
      <p className="text-center text-muted mb-2">
        In German Learning, sentence parts use this shared colour scheme.
      </p>
      <GermanRoleLegend className="justify-content-center" />

      <h2 className="text-center mt-5 mb-3">Learning support</h2>
      <div className="row g-3">
        {supportCards.map((card) => (
          <div className="col-md-6" key={card.title}>
            <div className="learning-path-card p-4 h-100">
              <p className="path-kicker mb-2">Support</p>
              <h3 className="h5">{card.title}</h3>
              <p className="mb-3">{card.description}</p>
              {card.path ? (
                <Link className="btn btn-primary btn-sm" to={card.path}>
                  {card.cta} <FaArrowRight className="ms-2" />
                </Link>
              ) : (
                <a
                  className="btn btn-outline-primary btn-sm"
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card.cta} <FaArrowRight className="ms-2" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GermanLearningHomePage;
