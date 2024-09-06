import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaVolumeUp } from "react-icons/fa";
import conversational_german_words from "../data/deutschlearnen/conversational_german_words.json"

function ConversationalGermanQuickLearning() {
  const words = conversational_german_words;

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE"; // Set language to German
    utterance.rate = 0.85; // Slightly slower for easier learning
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
        Conversational German Quick Learning
      </h2>
      <Row className="g-4">
        {words.map((word, index) => {
          return (
            <Col sm={12} md={6} key={index}>
              <Card className="shadow-sm p-3 h-100">
                <Card.Body>
                  <Card.Header className="d-flex justify-content-between align-items-center mb-3" style={{ backgroundColor: "#f0f0f0", borderRadius: '5px', padding: '10px' }}>
                    <span style={{ fontWeight: '600', fontSize: '1.2rem', color: '#007bff' }}>
                      Wort {index + 1}: {word.GermanWord}
                    </span>
                    <FaVolumeUp
                      onClick={() => speakText(word.GermanWord)}
                      style={{ cursor: "pointer", fontSize: "1.8rem", color: "#007bff" }}
                      title="Click to hear word"
                    />
                  </Card.Header>
                  <Card.Title className="mb-3" style={{ fontSize: "1.5rem", fontWeight: "700", color: "#343a40", lineHeight: '1.5' }}>
                    Bedeutungen: {word.EnglishMeanings.join(", ")}
                  </Card.Title>

                  <Card.Subtitle className="mb-4" style={{ fontSize: "1.3rem", fontWeight: "600", color: "#007bff" }}>
                    <small><strong>Beispiele:</strong></small>
                  </Card.Subtitle>

                  {word.ExampleSentences.map((example, i) => (
                    <Card.Text key={i} className="mb-4" style={{ fontSize: "1.2rem", color: "#495057" }}>
                      <strong>{example.Sentence}</strong> <br />
                      <em>Translation: {example.Translation}</em>
                      <FaVolumeUp
                        onClick={() => speakText(example.Sentence)}
                        style={{ cursor: "pointer", fontSize: "1.5rem", marginLeft: "10px", color: "#007bff" }}
                        title="Click to hear sentence"
                      />
                    </Card.Text>
                  ))}

                  {word.Notes && (
                    <Card.Text className="text-muted" style={{ fontSize: "1rem" }}>
                      <strong>Notes:</strong> {word.Notes.join(", ")}
                    </Card.Text>
                  )}

                  {word.UsageTips && (
                    <Card.Text className="text-muted" style={{ fontSize: "1rem" }}>
                      <strong>Usage Tips:</strong> {word.UsageTips.join(", ")}
                    </Card.Text>
                  )}
                </Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="outline-primary" onClick={() => speakText(word.GermanWord)}>
                    Repeat Word
                  </Button>
                  <Button variant="outline-success" onClick={() => speakText(word.ExampleSentences[0].Sentence)}>
                    Repeat Sentence
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ConversationalGermanQuickLearning;