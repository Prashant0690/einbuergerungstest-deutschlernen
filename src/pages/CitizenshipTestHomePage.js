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
import catalog from "../data/learningCatalog.json";

function CitizenshipTestHomePage() {
  const { pathways, topics: topicCards, examFormat, tools: trainingTools } = catalog.citizenship;

  return (
    <div className="container mt-4">
      <section className="home-hero text-center">
        <p className="text-uppercase fw-semibold text-primary mb-2">Citizenship preparation hub</p>
        <h1 className="display-5 fw-bold mb-3">Learn, practice, and pass with a clear study path</h1>
        <p className="lead mb-0">
          A modern learning experience designed for structured exam prep and steady progress.
        </p>
      </section>

      <section className="mt-4">
        <div className="row g-3">
          {pathways.map((pathway) => (
            <div key={pathway.title} className="col-md-6">
              <div className="learning-path-card p-4 h-100">
                <p className="path-kicker mb-2">{pathway.icon === "book" ? "Learn first" : "Practise next"}</p>
                <h2 className="h4">{pathway.title}</h2>
                <p className="mb-3">{pathway.description}</p>
                <Link className="btn btn-primary btn-sm" to={pathway.path}>
                  {pathway.cta} <FaArrowRight className="ms-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-center mb-4">Exam format</h2>
        <div className="row g-3">{examFormat.map((item) => <div className="col-md-4" key={item.label}><div className="exam-highlight-card p-4 h-100 text-center"><h3 className="h1 fw-bold text-primary mb-1">{item.value}</h3><p className="fw-semibold mb-2">{item.label}</p><p className="mb-0">{item.detail}</p></div></div>)}</div>
      </section>

      <div className="mt-5">
        <h2 className="text-center mb-4">Core knowledge map</h2>
        <div className="row g-3">
          {topicCards.map((topic, index) => (
            <div className="col-md-6" key={topic.title}>
              <div className="topic-card p-4 h-100">
                <h4 className="h5">{index + 1}. {topic.title}</h4>
                <p className="mb-0">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-center mb-4">Training studio</h2>
        <div className="row g-3">{trainingTools.map((tool) => <div className="col-md-6" key={tool.path}><div className="quick-link-card p-4 h-100"><h3 className="h5"><Link to={tool.path}>{tool.title}</Link></h3><p className="mb-0">{tool.description}</p></div></div>)}</div>
      </div>

      <div className="mt-5">
        <div className="support-surface p-4 p-md-5 text-center">
          <h2 className="mb-2">Need official support resources?</h2>
          <p className="text-muted mb-3">
            This website is an educational companion. Always verify legal details using BAMF.
          </p>
          <a
            className="btn btn-outline-primary"
            href="https://www.bamf.de/DE/Startseite/startseite_node.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open BAMF official website <FaArrowRight className="ms-2" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CitizenshipTestHomePage;
