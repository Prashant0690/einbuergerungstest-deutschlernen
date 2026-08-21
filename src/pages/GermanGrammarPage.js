import React, { useState } from "react";
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GermanGrammarPage.css";

const grammarTopics = [
  {
    id: "sentence",
    label: "Sentence order",
    rule: "In a main clause, the conjugated verb is in position two.",
    pattern: "Subject + verb + time + manner + place",
    example: {
      german: "Ich lerne heute zu Hause Deutsch.",
      english: "I am learning German at home today.",
    },
    memory: "Verb second: find the action first.",
  },
  {
    id: "cases",
    label: "The four cases",
    rule: "Articles show the role a noun has in a sentence.",
    pattern: "Nominativ: der | Akkusativ: den | Dativ: dem | Genitiv: des",
    example: {
      german: "Der Mann gibt dem Kind den Ball.",
      english: "The man gives the child the ball.",
    },
    memory: "Who acts? (Nominativ) What? (Akkusativ) To whom? (Dativ)",
  },
  {
    id: "gender",
    label: "Gender & plurals",
    rule: "Learn every noun together with its article and plural form.",
    pattern: "der Tisch - die Tische | die Lampe - die Lampen | das Buch - die Bücher",
    example: {
      german: "Das Buch liegt auf dem Tisch.",
      english: "The book is on the table.",
    },
    memory: "Never learn a noun alone: article + word + plural.",
  },
  {
    id: "tenses",
    label: "Useful tenses",
    rule: "Use Präsens for now and near future; Perfekt for finished everyday events.",
    pattern: "Ich gehe. | Ich habe gelernt. | Ich bin gefahren.",
    example: {
      german: "Gestern habe ich meine Freundin besucht.",
      english: "Yesterday I visited my friend.",
    },
    memory: "Most verbs use haben; movement or change of state often uses sein.",
  },
  {
    id: "questions",
    label: "Questions & negatives",
    rule: "Yes/no questions begin with the verb. Use nicht to negate actions and kein for nouns without an article.",
    pattern: "Kommst du? | Ich komme nicht. | Ich habe kein Auto.",
    example: {
      german: "Warum lernst du heute nicht?",
      english: "Why are you not studying today?",
    },
    memory: "Verb first asks; nicht says 'not'; kein says 'no/not a'.",
  },
  {
    id: "subordinate",
    label: "Subordinate clauses",
    rule: "After weil, dass, and wenn, the conjugated verb moves to the end.",
    pattern: "..., weil ich morgen arbeiten muss.",
    example: {
      german: "Ich bleibe zu Hause, weil es regnet.",
      english: "I am staying at home because it is raining.",
    },
    memory: "Signal word spotted? Save the verb for the end.",
  },
];

function GermanGrammarPage() {
  const [selectedTopicId, setSelectedTopicId] = useState(grammarTopics[0].id);
  const [showTranslation, setShowTranslation] = useState(false);
  const selectedTopic = grammarTopics.find((topic) => topic.id === selectedTopicId);

  const selectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setShowTranslation(false);
  };

  return (
    <section className="grammar-resource">
      <header className="grammar-hero text-center">
        <p className="grammar-eyebrow">GERMAN QUICK REFERENCE</p>
        <h1>German grammar, made memorable</h1>
        <p className="lead mb-0">
          Learn one clear rule, see it in context, and keep a short memory cue for everyday German.
        </p>
      </header>

      <Row className="g-4">
        <Col lg={4}>
          <Card className="grammar-topic-card h-100">
            <Card.Body>
              <Card.Title as="h2">Choose a building block</Card.Title>
              <Card.Text className="text-muted">
                Start with the patterns you will use most often.
              </Card.Text>
              <Nav variant="pills" className="grammar-topic-list">
                {grammarTopics.map((topic) => (
                  <Nav.Item key={topic.id}>
                    <Nav.Link
                      active={topic.id === selectedTopicId}
                      onClick={() => selectTopic(topic.id)}
                    >
                      {topic.label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="grammar-lesson-card h-100">
            <Card.Body className="p-md-4">
              <p className="grammar-eyebrow mb-2">FOCUS RULE</p>
              <h2>{selectedTopic.label}</h2>
              <p className="grammar-rule">{selectedTopic.rule}</p>

              <div className="grammar-pattern" aria-label="Grammar pattern">
                {selectedTopic.pattern}
              </div>

              <div className="grammar-example">
                <p className="mb-1 text-muted">Say it out loud</p>
                <p className="grammar-german mb-2">{selectedTopic.example.german}</p>
                {showTranslation && (
                  <p className="grammar-translation mb-0">
                    {selectedTopic.example.english}
                  </p>
                )}
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mt-3"
                  onClick={() => setShowTranslation((visible) => !visible)}
                >
                  {showTranslation ? "Hide translation" : "Show translation"}
                </Button>
              </div>

              <div className="grammar-memory-cue">
                <strong>Memory cue</strong>
                <span>{selectedTopic.memory}</span>
              </div>
              {selectedTopic.id === "cases" && (
                <Button as={Link} to="/german-cases" variant="primary" className="mt-3">
                  Open the Cases Master
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="grammar-routine mt-4">
        <Card.Body>
          <h2>Three-minute study routine</h2>
          <Row className="g-3">
            <Col md={4}><p><strong>1. Read</strong><br />Say the rule and pattern once.</p></Col>
            <Col md={4}><p><strong>2. Recall</strong><br />Hide the translation and explain the example.</p></Col>
            <Col md={4}><p><strong>3. Reuse</strong><br />Make one sentence about your own day.</p></Col>
          </Row>
        </Card.Body>
      </Card>
    </section>
  );
}

export default GermanGrammarPage;
