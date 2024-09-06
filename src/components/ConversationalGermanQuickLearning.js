import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaVolumeUp } from "react-icons/fa";
import conversational_german_words from "../data/deutschlearnen/conversational_german_words.json";

function ConversationalGermanQuickLearning() {
  const words = conversational_german_words;

  // Function to speak the text using SpeechSynthesis API
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE"; // German language
    utterance.rate = 0.85; // Slower rate for easier learning
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
                  {/* German Word Section */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#007bff" }}>
                        {word.GermanWord}
                      </h4>
                      <p style={{ fontSize: "1.3rem", fontWeight: "500", color: "#495057" }}>
                        <em>{word.EnglishMeanings.join(", ")}</em>
                      </p>
                    </div>
                    <FaVolumeUp
                      onClick={() => speakText(word.GermanWord)}
                      style={{ cursor: "pointer", fontSize: "2rem", color: "#007bff" }}
                      title="Click to hear word"
                    />
                  </div>

                  {/* Example Sentences Section */}
                  <div className="mb-4">
                    <h5 style={{ fontWeight: "600", color: "#007bff" }}>Example Sentences:</h5>
                    {word.ExampleSentences.map((example, i) => (
                      <div key={i} className="mb-3">
                        <strong style={{ fontSize: "1.2rem", color: "#343a40" }}>{example.Sentence}</strong>
                        <FaVolumeUp
                          onClick={() => speakText(example.Sentence)}
                          style={{ cursor: "pointer", fontSize: "1.5rem", marginLeft: "10px", color: "#007bff" }}
                          title="Click to hear sentence"
                        />
                        <br />
                        <em style={{ fontSize: "1rem", color: "#6c757d" }}>
                          Translation: {example.Translation}
                        </em>
                      </div>
                    ))}
                  </div>

                  {/* Notes Section */}
                  {word.Notes && (
                    <div>
                      <h6 style={{ fontWeight: "600", color: "#6c757d" }}>Notes:</h6>
                      <p style={{ fontSize: "1rem", color: "#495057" }}>{word.Notes.join(", ")}</p>
                    </div>
                  )}

                  {/* Usage Tips Section */}
                  {word.UsageTips && (
                    <div>
                      <h6 style={{ fontWeight: "600", color: "#6c757d" }}>Usage Tips:</h6>
                      <p style={{ fontSize: "1rem", color: "#495057" }}>{word.UsageTips.join(", ")}</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ConversationalGermanQuickLearning;