import React, { useState } from "react";
import { Button, Card, Col, Nav, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GermanRoleLegend from "../components/GermanRoleLegend";
import "./GermanWhQuestionsPage.css";

const basicWords = [
  ["Was?", "What?"],
  ["Wo?", "Where?"],
  ["Wann?", "When?"],
  ["Warum?", "Why?"],
  ["Wer?", "Who?"],
  ["Wie?", "How?"],
  ["Wie viel?", "How much?"],
  ["Wie viele?", "How many?"],
];

const additionalWords = [
  ["Wen?", "Whom? / masculine direct object"],
  ["Wem?", "To whom? / receiver"],
  ["Wessen?", "Whose? / possession"],
  ["Wohin?", "Where to? / direction"],
  ["Woher?", "Where from? / origin"],
  ["Welcher/Welche/Welches?", "Which?"],
  ["Seit wann?", "Since when?"],
  ["Wie lange?", "How long?"],
  ["Wie oft?", "How often?"],
  ["Mit wem?", "With whom?"],
];

const orderPatterns = [
  ["WH question", "WH-word + verb + subject + ...", "Warum lernst du Deutsch?"],
  ["Yes/No question", "Verb + subject + ...", "Lernst du heute Deutsch?"],
  ["Question with modal", "WH-word + modal + subject + ... + infinitive", "Wann musst du zum Amt gehen?"],
  ["Answer focus", "Begin with the information requested by the WH-word", "Wann? — Um 9 Uhr."],
];

const tenseExamples = [
  ["Present", "Wo wohnst du jetzt?", "Ich wohne in Berlin."],
  ["Past (Präteritum/Perfekt context)", "Wo hast du früher gewohnt?", "Ich habe früher in Hamburg gewohnt."],
];

const outliers = [
  "German WH questions require the conjugated verb immediately after the WH word; English allows helper constructions (do/does/did).",
  "Wen/Wem/Wessen are case-specific and have no exact one-word English equivalent in modern daily English.",
  "Wie viele changes form in German based on singular/plural noun context more visibly than English.",
  "Why-answers in German often begin with weil + verb-at-end subordinate clause: '..., weil ich arbeiten muss.'",
];

const qaPractice = [
  {
    id: "w1",
    questionEnglish: ["What", "can", "you", "today", "submit"],
    questionGerman: ["Was", "kannst", "du", "heute", "abgeben"],
    answerEnglish: ["I", "can", "the form", "today", "submit"],
    answerGerman: ["Ich", "kann", "das Formular", "heute", "abgeben"],
    roles: ["case-acc", "case-verb", "case-nom", "case-dat", "case-verb"],
    rule: "Was asks for thing/action focus; conjugated verb is always in position two.",
  },
  {
    id: "w2",
    questionEnglish: ["Where", "do", "you", "today", "work"],
    questionGerman: ["Wo", "arbeitest", "du", "heute", ""],
    answerEnglish: ["I", "work", "at home", "today", ""],
    answerGerman: ["Ich", "arbeite", "zu Hause", "heute", ""],
    roles: ["case-dat", "case-verb", "case-nom", "case-dat", "case-verb"],
    rule: "Wo asks static location (Wo?), not direction (Wohin?).",
  },
  {
    id: "w3",
    questionEnglish: ["When", "did", "you", "the exam", "write"],
    questionGerman: ["Wann", "hast", "du", "die Prüfung", "geschrieben"],
    answerEnglish: ["I", "wrote", "the exam", "yesterday", ""],
    answerGerman: ["Ich", "habe", "die Prüfung", "gestern", "geschrieben"],
    roles: ["case-dat", "case-verb", "case-nom", "case-acc", "case-verb"],
    rule: "In Perfekt, helper in position two and participle at the end.",
  },
  {
    id: "w4",
    questionEnglish: ["Why", "must", "your son", "a warm jacket", "wear"],
    questionGerman: ["Warum", "muss", "dein Sohn", "eine warme Jacke", "tragen"],
    answerEnglish: ["Because of the weather", "must", "my son", "a warm jacket", "wear"],
    answerGerman: ["Wegen des Wetters", "muss", "mein Sohn", "eine warme Jacke", "tragen"],
    roles: ["case-gen", "case-verb", "case-nom", "case-acc", "case-verb"],
    rule: "Reason can be answered by prepositional phrase or weil-clause.",
  },
];

function renderRoleSentence(parts, roles, keyPrefix) {
  return parts
    .filter(Boolean)
    .map((part, index) => (
      <span className={`sentence-token ${roles[index]}`} key={`${keyPrefix}-${index}`}>
        {part}
      </span>
    ));
}

function GermanWhQuestionsPage() {
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPractice = activeFilter === "all"
    ? qaPractice
    : qaPractice.filter((item) => item.questionGerman[0].toLowerCase() === activeFilter);

  return (
    <section className="wh-master-page">
      <header className="wh-master-hero">
        <p className="cases-eyebrow">GERMAN WH QUESTIONS MASTER</p>
        <h1>Question heading, word order, and high-accuracy answers</h1>
        <p className="lead mb-0">
          Senior-teacher format: core WH words first, advanced set next, then present/past question building.
        </p>
        <Button as={Link} to="/german-modal-verbs" variant="outline-primary" className="mt-3">
          Open Modal Verbs Master
        </Button>
      </header>

      <Nav className="cases-jump-nav" aria-label="WH sections">
        <Nav.Link href="#basic">Basic words</Nav.Link>
        <Nav.Link href="#additional">Additional words</Nav.Link>
        <Nav.Link href="#order">Order and heading</Nav.Link>
        <Nav.Link href="#outliers">Outliers</Nav.Link>
        <Nav.Link href="#practice">Guided practice</Nav.Link>
      </Nav>

      <section id="basic" className="cases-section">
        <h2>Basic question words</h2>
        <Card className="preposition-card">
          <Card.Body>
            <Table bordered hover className="cases-table mb-0">
              <thead>
                <tr>
                  <th>German WH word</th>
                  <th>English meaning</th>
                </tr>
              </thead>
              <tbody>
                {basicWords.map(([word, meaning]) => (
                  <tr key={word}>
                    <td><span className="wh-token">{word}</span></td>
                    <td>{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </section>

      <section id="additional" className="cases-section">
        <h2>Additional question words</h2>
        <Card className="preposition-card">
          <Card.Body>
            <Table bordered hover className="cases-table mb-0">
              <thead>
                <tr>
                  <th>German WH word</th>
                  <th>English meaning / use</th>
                </tr>
              </thead>
              <tbody>
                {additionalWords.map(([word, meaning]) => (
                  <tr key={word}>
                    <td>{word}</td>
                    <td>{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </section>

      <section id="order" className="cases-section">
        <h2>Question heading and order</h2>
        <Card className="preposition-card mb-3">
          <Card.Body>
            <Table bordered hover className="cases-table mb-0">
              <thead>
                <tr>
                  <th>Pattern</th>
                  <th>Structure</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {orderPatterns.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Card className="preposition-card">
          <Card.Body>
            <h3 className="h5">Present and past examples</h3>
            <Table bordered hover className="cases-table mb-0">
              <thead>
                <tr>
                  <th>Tense</th>
                  <th>Question</th>
                  <th>Model answer</th>
                </tr>
              </thead>
              <tbody>
                {tenseExamples.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </section>

      <section id="outliers" className="cases-section">
        <h2>Outliers from English (important)</h2>
        <Row className="g-3">
          {outliers.map((point) => (
            <Col md={6} key={point}>
              <Card className="case-tip h-100">
                <Card.Body>{point}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section id="practice" className="cases-section">
        <h2>Practice questions and model answers</h2>
        <p>Read English first. Predict the German question and answer. Reveal when ready.</p>
        <GermanRoleLegend />
        <div className="practice-toolbar">
          <Nav variant="pills" className="complexity-tabs">
            <Nav.Item><Nav.Link active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>All</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={activeFilter === "was"} onClick={() => setActiveFilter("was")}>Was</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={activeFilter === "wo"} onClick={() => setActiveFilter("wo")}>Wo</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={activeFilter === "wann"} onClick={() => setActiveFilter("wann")}>Wann</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={activeFilter === "warum"} onClick={() => setActiveFilter("warum")}>Warum</Nav.Link></Nav.Item>
          </Nav>
          <Button variant={showAllAnswers ? "primary" : "outline-primary"} onClick={() => setShowAllAnswers((v) => !v)}>
            {showAllAnswers ? "Hide all German examples" : "Show all German examples"}
          </Button>
        </div>
        <div className="practice-sentence-list">
          {filteredPractice.map((item) => (
            <Card className="practice-sentence" key={item.id}>
              <Card.Body>
                <p className="mb-2"><strong>Question prompt</strong></p>
                <p className="practice-language">{renderRoleSentence(item.questionEnglish, item.roles, `${item.id}-qe`)}</p>
                <p className="mb-2 mt-3"><strong>Model answer prompt</strong></p>
                <p className="practice-language">{renderRoleSentence(item.answerEnglish, item.roles, `${item.id}-ae`)}</p>
                {showAllAnswers ? (
                  <div className="practice-answer">
                    <p className="mb-2"><strong>German question</strong></p>
                    <p className="practice-language">{renderRoleSentence(item.questionGerman, item.roles, `${item.id}-qg`)}</p>
                    <p className="mb-2 mt-3"><strong>German model answer</strong></p>
                    <p className="practice-language">{renderRoleSentence(item.answerGerman, item.roles, `${item.id}-ag`)}</p>
                    <p className="mb-0"><strong>Rule check:</strong> {item.rule}</p>
                  </div>
                ) : (
                  <details className="practice-reveal">
                    <summary>Show German question, answer, and rule check</summary>
                    <p className="mb-2 mt-3"><strong>German question</strong></p>
                    <p className="practice-language">{renderRoleSentence(item.questionGerman, item.roles, `${item.id}-qg`)}</p>
                    <p className="mb-2 mt-3"><strong>German model answer</strong></p>
                    <p className="practice-language">{renderRoleSentence(item.answerGerman, item.roles, `${item.id}-ag`)}</p>
                    <p className="mb-0"><strong>Rule check:</strong> {item.rule}</p>
                  </details>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}

export default GermanWhQuestionsPage;
