import React, { useMemo, useState } from "react";
import { Button, Card, Col, Nav, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GermanRoleLegend from "../components/GermanRoleLegend";
import "./GermanModalVerbsPage.css";

const persons = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

const modalVerbs = [
  {
    modal: "können",
    meaning: "can / be able to",
    present: ["kann", "kannst", "kann", "können", "könnt", "können"],
    past: ["konnte", "konntest", "konnte", "konnten", "konntet", "konnten"],
    perfect: "hat ... können",
    outlier: "German often uses simple past (konnte) more naturally than present perfect in modal-heavy spoken sentences.",
  },
  {
    modal: "müssen",
    meaning: "must / have to",
    present: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    past: ["musste", "musstest", "musste", "mussten", "musstet", "mussten"],
    perfect: "hat ... müssen",
    outlier: "English 'must' has no direct past form; German uses musste clearly for past obligation.",
  },
  {
    modal: "dürfen",
    meaning: "may / be allowed to",
    present: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    past: ["durfte", "durftest", "durfte", "durften", "durftet", "durften"],
    perfect: "hat ... dürfen",
    outlier: "English permission often uses 'can'; German distinguishes dürfen (permission) from können (ability).",
  },
  {
    modal: "sollen",
    meaning: "should / be supposed to",
    present: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    past: ["sollte", "solltest", "sollte", "sollten", "solltet", "sollten"],
    perfect: "hat ... sollen",
    outlier: "soll can report expectations from others, not only advice like English 'should'.",
  },
  {
    modal: "wollen",
    meaning: "want to",
    present: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    past: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
    perfect: "hat ... wollen",
    outlier: "German sounds stronger/directer with wollen than English 'want to' in polite contexts.",
  },
  {
    modal: "möchten",
    meaning: "would like to (polite)",
    present: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
    past: ["wollte", "wolltest", "wollte", "wollten", "wolltet", "wollten"],
    perfect: "hat ... wollen",
    outlier: "möchten is a polite present form; past polite intention typically shifts to wollte in natural usage.",
  },
];

const modalPatterns = [
  ["Main statement", "Subject + modal (position 2) + ... + infinitive (final)", "Ich muss morgen früher aufstehen."],
  ["Yes/No question", "Modal + subject + ... + infinitive", "Kannst du heute länger bleiben?"],
  ["WH question", "WH + modal + subject + ... + infinitive", "Warum willst du jetzt gehen?"],
  ["Past statement", "Subject + past modal + ... + infinitive", "Wir konnten gestern nicht kommen."],
];

const practiceSentences = [
  {
    id: "m1",
    tense: "present",
    english: ["I", "can", "the form", "today", "submit"],
    german: ["Ich", "kann", "das Formular", "heute", "abgeben"],
    roles: ["case-nom", "case-verb", "case-acc", "case-dat", "case-verb"],
    rule: "Present: modal in position 2, infinitive at end.",
  },
  {
    id: "m2",
    tense: "present",
    english: ["We", "must", "the teacher", "an answer", "give"],
    german: ["Wir", "müssen", "der Lehrerin", "eine Antwort", "geben"],
    roles: ["case-nom", "case-verb", "case-dat", "case-acc", "case-verb"],
    rule: "Present obligation with müssen.",
  },
  {
    id: "m3",
    tense: "past",
    english: ["He", "wanted to", "a German course", "last month", "start"],
    german: ["Er", "wollte", "einen Deutschkurs", "letzten Monat", "beginnen"],
    roles: ["case-nom", "case-verb", "case-acc", "case-dat", "case-verb"],
    rule: "Past intention usually uses wollte.",
  },
  {
    id: "m4",
    tense: "past",
    english: ["You", "were allowed to", "your child", "to school", "bring"],
    german: ["Du", "durftest", "dein Kind", "zur Schule", "bringen"],
    roles: ["case-nom", "case-verb", "case-acc", "case-dat", "case-verb"],
    rule: "Past permission with durfte/durftest.",
  },
];

function renderRoleSentence(parts, roles, keyPrefix) {
  return parts.map((part, index) => (
    <span className={`sentence-token ${roles[index]}`} key={`${keyPrefix}-${index}`}>
      {part}
    </span>
  ));
}

function GermanModalVerbsPage() {
  const [selectedModal, setSelectedModal] = useState(modalVerbs[0].modal);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [tense, setTense] = useState("present");
  const [tableMode, setTableMode] = useState("full");

  const activeModal = modalVerbs.find((item) => item.modal === selectedModal);
  const filteredPractice = useMemo(
    () => practiceSentences.filter((sentence) => sentence.tense === tense),
    [tense]
  );

  return (
    <section className="modal-master-page">
      <header className="modal-master-hero">
        <p className="cases-eyebrow">GERMAN MODAL VERBS MASTER</p>
        <h1>Complete modal-verb system: present + past</h1>
        <p className="lead mb-0">
          Full tables, single-verb deep focus, and outlier notes where German differs from English.
        </p>
        <Button as={Link} to="/german-wh-questions" variant="outline-primary" className="mt-3">
          Next: WH Questions Master
        </Button>
      </header>

      <Nav className="cases-jump-nav" aria-label="Modal verbs sections">
        <Nav.Link href="#forms">Complete forms</Nav.Link>
        <Nav.Link href="#patterns">Order patterns</Nav.Link>
        <Nav.Link href="#outliers">Outliers</Nav.Link>
        <Nav.Link href="#practice">Practice</Nav.Link>
      </Nav>

      <section id="forms" className="cases-section">
        <h2>Complete table + single verb mode</h2>
        <div className="practice-toolbar">
          <Nav variant="pills" className="complexity-tabs">
            <Nav.Item><Nav.Link active={tense === "present"} onClick={() => setTense("present")}>Present</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={tense === "past"} onClick={() => setTense("past")}>Past</Nav.Link></Nav.Item>
          </Nav>
          <Nav variant="pills" className="complexity-tabs">
            <Nav.Item><Nav.Link active={tableMode === "full"} onClick={() => setTableMode("full")}>Complete table</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={tableMode === "single"} onClick={() => setTableMode("single")}>Single verb focus</Nav.Link></Nav.Item>
          </Nav>
        </div>

        {tableMode === "full" ? (
          <Card className="preposition-card">
            <Card.Body>
              <Table bordered hover className="cases-table mb-0">
                <thead>
                  <tr>
                    <th>Person</th>
                    {modalVerbs.map((verb) => (
                      <th key={verb.modal}>{verb.modal}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {persons.map((person, personIndex) => (
                    <tr key={`${tense}-${person}`}>
                      <td>{person}</td>
                      {modalVerbs.map((verb) => (
                        <td key={`${verb.modal}-${person}`}>{tense === "present" ? verb.present[personIndex] : verb.past[personIndex]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            <Col lg={4}>
              <Card className="grammar-topic-card h-100">
                <Card.Body>
                  <Card.Title as="h3">Select one modal</Card.Title>
                  <Nav variant="pills" className="grammar-topic-list">
                    {modalVerbs.map((item) => (
                      <Nav.Item key={item.modal}>
                        <Nav.Link active={item.modal === selectedModal} onClick={() => setSelectedModal(item.modal)}>
                          {item.modal}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8}>
              <Card className="grammar-lesson-card h-100">
                <Card.Body>
                  <p className="cases-eyebrow mb-2">ACTIVE VERB</p>
                  <h3 className="mb-1">{activeModal.modal}</h3>
                  <p className="text-muted">{activeModal.meaning}</p>
                  <Table bordered hover className="cases-table">
                    <thead>
                      <tr>
                        <th>Person</th>
                        <th>{tense === "present" ? "Present" : "Past"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {persons.map((person, index) => (
                        <tr key={`${activeModal.modal}-${person}`}>
                          <td>{person}</td>
                          <td>{tense === "present" ? activeModal.present[index] : activeModal.past[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <p className="mb-0"><strong>Perfect reference:</strong> {activeModal.perfect}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </section>

      <section id="patterns" className="cases-section">
        <h2>Word order patterns</h2>
        <Card className="preposition-card">
          <Card.Body>
            <Table bordered hover className="cases-table mb-0">
              <thead>
                <tr>
                  <th>Use case</th>
                  <th>Structure</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {modalPatterns.map((row) => (
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
          {modalVerbs.map((verb) => (
            <Col md={6} key={`outlier-${verb.modal}`}>
              <Card className="case-tip h-100">
                <Card.Body>
                  <strong>{verb.modal}</strong>
                  <p className="mb-0 mt-2">{verb.outlier}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section id="practice" className="cases-section">
        <h2>Practice sentences and reference examples</h2>
        <p>Read English first. Reveal German and the rule check only when you are ready.</p>
        <GermanRoleLegend />
        <div className="practice-toolbar">
          <Button variant={showAllAnswers ? "primary" : "outline-primary"} onClick={() => setShowAllAnswers((visible) => !visible)}>
            {showAllAnswers ? "Hide all German answers" : "Show all German answers"}
          </Button>
        </div>
        <div className="practice-sentence-list">
          {filteredPractice.map((sentence) => (
            <Card className="practice-sentence" key={sentence.id}>
              <Card.Body>
                <p className="practice-language">{renderRoleSentence(sentence.english, sentence.roles, `${sentence.id}-en`)}</p>
                {showAllAnswers ? (
                  <div className="practice-answer">
                    <p className="practice-language">{renderRoleSentence(sentence.german, sentence.roles, `${sentence.id}-de`)}</p>
                    <p className="mb-0"><strong>Rule check:</strong> {sentence.rule}</p>
                  </div>
                ) : (
                  <details className="practice-reveal">
                    <summary>Show German answer and rule check</summary>
                    <p className="practice-language mt-3">{renderRoleSentence(sentence.german, sentence.roles, `${sentence.id}-de`)}</p>
                    <p className="mb-0"><strong>Rule check:</strong> {sentence.rule}</p>
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

export default GermanModalVerbsPage;
