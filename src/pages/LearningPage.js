import React, { useMemo, useState } from "react";
import { Card, Form } from "react-bootstrap";
import historyData from "../data/notes/History.json";
import politicsData from "../data/notes/Politics.json";
import societyAndCultureData from "../data/notes/SocietyAndCulture.json";
import lawAndRightsData from "../data/notes/LawAndRights.json";
import geographyData from "../data/notes/Geography.json";
import economyData from "../data/notes/Economy.json";
import symbolsAndIdentityData from "../data/notes/SymbolsAndIdentity.json";

const sections = [historyData, politicsData, societyAndCultureData, lawAndRightsData, geographyData, economyData, symbolsAndIdentityData];

function LearningPage() {
  const [selectedSection, setSelectedSection] = useState(sections[0].section);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("english");
  const section = sections.find((item) => item.section === selectedSection) || sections[0];
  const entries = useMemo(() => section.subSections.filter((item) =>
    `${item.title} ${item.content.german} ${item.content.english}`.toLowerCase().includes(query.toLowerCase())
  ), [section, query]);

  return (
    <div className="container mt-4 learning-library">
      <section className="home-hero learning-library-hero">
        <p className="path-kicker mb-2">Citizenship knowledge, made clear</p>
        <h1 className="display-6 fw-bold mb-3">Understand the topic. Remember the answer.</h1>
        <p className="lead mb-0">Explore short explanations in German and English, then focus on the facts that matter for the exam.</p>
      </section>

      <div className="row g-4 mt-2">
        <aside className="col-lg-3">
          <div className="learning-topic-menu p-3">
            <label className="form-label fw-semibold" htmlFor="topic-search">Find a topic</label>
            <Form.Control id="topic-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics…" className="mb-3" />
            <div className="d-grid gap-2" role="group" aria-label="Knowledge topics">
              {sections.map((item) => (
                <button key={item.section} type="button" className={`topic-menu-button ${selectedSection === item.section ? "active" : ""}`} onClick={() => setSelectedSection(item.section)}>
                  <span>{item.section}</span><span className="topic-count">{item.subSections.length}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="col-lg-9" aria-label={`${section.section} learning notes`}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-3">
            <div><p className="path-kicker mb-1">Topic {sections.indexOf(section) + 1} of {sections.length}</p><h2 className="mb-0">{section.section}</h2></div>
            <div className="language-toggle" role="group" aria-label="Explanation language">
              <button type="button" className={language === "english" ? "active" : ""} onClick={() => setLanguage("english")}>English first</button>
              <button type="button" className={language === "german" ? "active" : ""} onClick={() => setLanguage("german")}>Deutsch zuerst</button>
            </div>
          </div>
          {entries.length ? entries.map((item, index) => (
            <Card key={item.title} className="knowledge-card mb-3">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3"><h3 className="h5 mb-0">{item.title}</h3><span className="knowledge-index">{String(index + 1).padStart(2, "0")}</span></div>
                <div className="knowledge-explanation">
                  <div><span className="knowledge-label">{language === "english" ? "In plain English" : "Auf Deutsch"}</span><p>{item.content[language]}</p></div>
                  <details><summary>{language === "english" ? "Read the other language" : "Andere Sprache anzeigen"}</summary><p className="mt-3 mb-0">{item.content[language === "english" ? "german" : "english"]}</p></details>
                </div>
                <div className="key-facts mt-4"><h4 className="h6 mb-3">Key facts to remember</h4><ul className="mb-0">{item.keyPoints.map((point, pointIndex) => <li key={`${item.title}-${pointIndex}`}>{point[language]}</li>)}</ul></div>
              </Card.Body>
            </Card>
          )) : <div className="empty-search p-4"><h3 className="h5">No matching notes</h3><p className="mb-0">Try another keyword or choose a different topic.</p></div>}
        </section>
      </div>
    </div>
  );
}

export default LearningPage;
