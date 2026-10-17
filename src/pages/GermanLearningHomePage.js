// src/pages/GermanLearningHomePage.js
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import GermanRoleLegend from "../components/GermanRoleLegend";
import catalog from "../data/learningCatalog.json";

function GermanLearningHomePage() {
  const { tracks: learningTracks, support: supportCards } = catalog.german;

  return (
    <div className="container mt-4">
      <section className="home-hero text-center">
        <p className="text-uppercase fw-semibold text-primary mb-2">German learning and support</p>
        <h1 className="display-6 fw-bold mb-3">Choose a skill. Learn the rule. Use it with confidence.</h1>
        <p className="lead mb-0">Short, practical lessons help you move from useful words to accurate everyday German.</p>
      </section>

      <div className="row g-3 mt-3">
        <div className="col-md-4">
            <div className="exam-highlight-card p-4 h-100 text-center">
              <h2 className="h6 text-uppercase text-muted">1 · Learn</h2>
            <p className="mb-0">Train high-frequency words with audio support and quick repetition.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="exam-highlight-card p-4 h-100 text-center">
              <h2 className="h6 text-uppercase text-muted">2 · Understand</h2>
            <p className="mb-0">Refresh sentence structure, tense usage, and everyday expression patterns.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="exam-highlight-card p-4 h-100 text-center">
              <h2 className="h6 text-uppercase text-muted">3 · Practise</h2>
            <p className="mb-0">Master Nominativ, Akkusativ, Dativ, and Genitiv through guided practice.</p>
          </div>
        </div>
      </div>

      <h2 className="text-center mt-5 mb-3">Learning tracks</h2>
      <div className="row g-3 mt-1">
        {learningTracks.map((card) => (
          <div className="col-md-6" key={card.path}>
            <div className="quick-link-card p-4 h-100">
              <p className="path-kicker mb-2">{card.level}</p><h2 className="h5">
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
