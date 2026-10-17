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
  ["Main statement", "Subject + conjugated modal (position 2) + ... + infinitive (at the end)", "Ich muss morgen früher aufstehen.", "I have to get up earlier tomorrow."],
  ["Yes / no question", "Conjugated modal + subject + ... + infinitive", "Darf ich hier kurz warten?", "May I wait here for a moment?"],
  ["W-question", "Question word + modal + subject + ... + infinitive", "Wann kannst du den Bericht fertigstellen?", "When can you finish the report?"],
  ["Negation", "Subject + modal + nicht + ... + infinitive", "Du musst heute nicht arbeiten.", "You don’t have to work today (it is not necessary)."],
  ["Past statement", "Subject + past modal + ... + infinitive", "Wir konnten den Zug noch erreichen.", "We were still able to catch the train."],
];

const practiceSentences = [
  {
    id: "m1", focus: "Ability · können",
    tense: "present",
    english: "I can submit the application online.",
    german: ["Ich", "kann", "den Antrag", "online", "einreichen."],
    roles: ["case-nom", "case-verb", "case-acc", "case-other", "case-verb"],
    rule: "Können expresses ability or possibility. The conjugated form kann is in position two; einreichen stays infinitive at the end.",
  },
  {
    id: "m2", focus: "Obligation · müssen",
    tense: "present",
    english: "We have to give the teacher an answer.",
    german: ["Wir", "müssen", "der Lehrerin", "eine Antwort", "geben."],
    roles: ["case-nom", "case-verb", "case-dat", "case-acc", "case-verb"],
    rule: "Müssen expresses necessity. The person receiving the answer is Dativ (der Lehrerin); the thing given is Akkusativ (eine Antwort).",
  },
  {
    id: "m3", focus: "Permission · dürfen",
    tense: "present",
    english: "May I open the window?",
    german: ["Darf", "ich", "das Fenster", "öffnen?"],
    roles: ["case-verb", "case-nom", "case-acc", "case-verb"],
    rule: "Dürfen asks for or gives permission. In a yes/no question, the conjugated modal moves to position one; öffnen remains at the end.",
  },
  {
    id: "m4", focus: "Advice · sollen",
    tense: "present",
    english: "You should drink more water.",
    german: ["Du", "solltest", "mehr Wasser", "trinken."],
    roles: ["case-nom", "case-verb", "case-acc", "case-verb"],
    rule: "Solltest gives advice here. The infinitive trinken goes at the end; mehr Wasser is its Akkusativ object.",
  },
  {
    id: "m5", focus: "Polite request · möchten",
    tense: "present",
    english: "We would like to reserve a table for two.",
    german: ["Wir", "möchten", "einen Tisch für zwei", "reservieren."],
    roles: ["case-nom", "case-verb", "case-acc", "case-verb"],
    rule: "Möchten is the polite present form used for wishes. Reservieren remains an infinitive at the end.",
  },
  {
    id: "m6", focus: "Intention · wollen",
    tense: "present",
    english: "She wants to move to Hamburg next year.",
    german: ["Sie", "will", "nächstes Jahr nach Hamburg", "ziehen."],
    roles: ["case-nom", "case-verb", "case-other", "case-verb"],
    rule: "Will is the first-person/third-person singular form of wollen. The main infinitive ziehen goes at the end.",
  },
  {
    id: "m7", focus: "Past intention · wollen",
    tense: "past",
    english: "He wanted to start a German course last month.",
    german: ["Er", "wollte", "letzten Monat", "einen Deutschkurs", "beginnen."],
    roles: ["case-nom", "case-verb", "case-other", "case-acc", "case-verb"],
    rule: "Wollte is the simple past of wollen. Time phrases can move before the direct object; beginnen stays at the end.",
  },
  {
    id: "m8", focus: "Past permission · dürfen",
    tense: "past",
    english: "You were allowed to bring your child to school.",
    german: ["Du", "durftest", "dein Kind", "zur Schule", "bringen."],
    roles: ["case-nom", "case-verb", "case-acc", "case-dat", "case-verb"],
    rule: "Durftest is the simple past of dürfen and expresses permission in the past. The infinitive bringen closes the sentence.",
  },
  {
    id: "m9", focus: "Past necessity · müssen",
    tense: "past",
    english: "I had to wait for an hour.",
    german: ["Ich", "musste", "eine Stunde", "warten."],
    roles: ["case-nom", "case-verb", "case-acc", "case-verb"],
    rule: "Musste is the simple past of müssen. Unlike English, German uses this regular past modal form for a past obligation.",
  },
  {
    id: "m10", focus: "Past ability · können",
    tense: "past",
    english: "They could not find the address.",
    german: ["Sie", "konnten", "die Adresse", "nicht finden."],
    roles: ["case-nom", "case-verb", "case-acc", "case-verb"],
    rule: "Konnten expresses past ability. With a negative, nicht appears before the infinitive phrase at the end.",
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
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {modalPatterns.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td><strong>{row[2]}</strong></td>
                    <td>{row[3]}</td>
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
                <div className="modal-practice-heading"><span className="practice-number">{sentence.id.replace(/\D/g, "")}</span><div><span className="practice-kicker">{sentence.focus}</span><p className="practice-language practice-english mb-0">{sentence.english}</p></div></div>
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
