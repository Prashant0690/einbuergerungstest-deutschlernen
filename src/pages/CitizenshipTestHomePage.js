/*
Einbürgerungstest und Deutschlernen
Copyright (C) 2023 Prashant Tiwari

This program is a personal project and free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Project Name: einbuergerungstest-deutschlernen
Folder Name: einbuergerungstest-deutschlernen
*/
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CitizenshipTestHomePage() {
  const topicCards = [
    {
      title: "History",
      description:
        "Learn about major events in German history and their impact on society and democracy.",
    },
    {
      title: "Politics",
      description:
        "Understand federal institutions, constitutional principles, elections, and civic participation.",
    },
    {
      title: "Society and Culture",
      description:
        "Explore values, diversity, social life, and integration topics relevant for daily life in Germany.",
    },
    {
      title: "Law and Rights",
      description:
        "Study core rights and duties, legal protections, and important rules for residents and citizens.",
    },
    {
      title: "Geography",
      description:
        "Review German states, major cities, landscapes, and regional structure across the country.",
    },
    {
      title: "Economy",
      description:
        "Build understanding of Germany's social market economy, jobs, and role in the EU.",
    },
    {
      title: "Symbols and Identity",
      description:
        "Learn national symbols, democratic identity, historical memory, and civic traditions.",
    },
  ];

  return (
    <div className="container mt-4">
      <section className="home-hero text-center">
        <p className="text-uppercase fw-semibold text-primary mb-2">Einbürgerungstest Preparation</p>
        <h1 className="display-5 fw-bold mb-3">Learn smarter for the German citizenship test</h1>
        <p className="lead mb-0">
          Practice with official-style questions, state-specific content, and focused learning resources in one place.
        </p>
      </section>

      <section className="mt-5">
        <h2 className="text-center mb-4">Official Test Format</h2>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="exam-highlight-card p-4 h-100">
              <h3 className="h5">Question pool</h3>
              <p className="mb-0">
                300 general questions plus 10 state-specific questions for each Bundesland.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="exam-highlight-card p-4 h-100">
              <h3 className="h5">Exam composition</h3>
              <p className="mb-0">
                33 total questions: 30 general and 3 state-specific.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="exam-highlight-card p-4 h-100">
              <h3 className="h5">Passing threshold</h3>
              <p className="mb-0">
                You need at least 17 correct answers to pass.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5">
        <h2 className="text-center mb-4">Explore Key Topics</h2>
        <div className="row g-3">
          {topicCards.map((topic, index) => (
            <div className="col-md-6" key={topic.title}>
              <div className="topic-card p-4">
                <h4 className="h5">{index + 1}. {topic.title}</h4>
                <p className="mb-0">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-center mb-4">Start Practicing</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="quick-link-card p-4 h-100">
              <h3 className="h5"><Link to="/general-questions">General Questions</Link></h3>
              <p className="mb-0">Practice all 300 general questions from the official catalog.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="quick-link-card p-4 h-100">
              <h3 className="h5"><Link to="/state-questions">State Questions</Link></h3>
              <p className="mb-0">Train with the 10 state questions for your selected Bundesland.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="quick-link-card p-4 h-100">
              <h3 className="h5"><Link to="/quiz-selection">Exam Simulation</Link></h3>
              <p className="mb-0">Take a 33-question mock test (30 general + 3 state questions).</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="quick-link-card p-4 h-100">
              <h3 className="h5"><Link to="/VocabularyPage">Essential Vocabulary</Link></h3>
              <p className="mb-0">Strengthen your German vocabulary for the test and everyday life.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <p className="text-muted">
          Educational tool only. For official and legally binding information, always verify with BAMF resources.
        </p>
        <Link className="btn btn-outline-primary" to="/learningPage">
          Learn key topics <FaArrowRight className="ms-2" />
        </Link>
      </div>
    </div>
  );
}

export default CitizenshipTestHomePage;
