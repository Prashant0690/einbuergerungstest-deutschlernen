import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaVolumeUp } from "react-icons/fa";
import { loadGeneralQuestions } from '../data/content';
import { getImageUrl } from '../utils/quizUtils'; // Utility function to get image URL

function EinbuergerungQuestionQuickLearning() {
  const questions = loadGeneralQuestions();

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE"; // Set language to German
    utterance.rate = 0.8; // Adjust the rate to slow down the speech slightly
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
        Einbürgerung Question Quick Learning
      </h2>
      <Row className="g-4">
        {questions.map((question, index) => {
          const correctOption = question.options.find(option => option.isCorrect);
          const questionImage = question.answerType === 'image' ? getImageUrl(question.region, question.id) : null;

          return (
            <Col sm={12} md={6} key={index}>
              <Card className="shadow-sm p-3 h-100">
                <Card.Body>
                  <Card.Header className="d-flex justify-content-between align-items-center mb-3" style={{ backgroundColor: "#f0f0f0", borderRadius: '5px', padding: '10px' }}>
                    <span style={{ fontWeight: '600', fontSize: '1.2rem', color: '#007bff' }}>
                      Frage {index + 1}
                    </span>
                    <FaVolumeUp
                      onClick={() => {
                        speakText(question.germanQuestion);
                        setTimeout(() => {
                          speakText(correctOption.germanOption);
                        }, 3000); // 3-second delay between question and answer
                      }}
                      style={{ cursor: "pointer", fontSize: "1.8rem", color: "#007bff" }}
                      title="Click to hear question and answer"
                    />
                  </Card.Header>
                  <Card.Title className="mb-3" style={{ fontSize: "1.5rem", fontWeight: "700", color: "#343a40", lineHeight: '1.5' }}>
                    {question.germanQuestion}
                  </Card.Title>
                  <Card.Subtitle className="mb-4" style={{ fontSize: "1.3rem", fontWeight: "600", color: "#007bff" }}>
                    <small><strong>Richtige Antwort:</strong></small>
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-4" style={{ fontSize: "1.3rem", fontWeight: "600", color: "#495057" }}>
                    {correctOption.germanOption}
                  </Card.Subtitle>

                  {question.englishQuestion && (
                    <Card.Text className="text-muted" style={{ fontSize: "1rem", fontStyle: "italic" }}>
                      <small><strong>Translation:</strong> {question.englishQuestion}</small>
                    </Card.Text>
                  )}
                  {correctOption.englishOption && (
                    <Card.Text className="text-muted" style={{ fontSize: "1rem", fontStyle: "italic" }}>
                      <small><strong>Correct Answer Translation:</strong> {correctOption.englishOption}</small>
                    </Card.Text>
                  )}

                  {/* Important Words Section */}
                  {question.importantWords && (
                    <div style={{ backgroundColor: "#e9f5ff", padding: "10px", borderRadius: "5px" }}>
                      <h6 style={{ fontWeight: "bold", color: "#007bff" }}>Wichtige Wörter:</h6>
                      <ul className="mb-0">
                        {question.importantWords.nouns && question.importantWords.nouns.map((word, i) => (
                          <li key={i} style={{ fontSize: "1rem" }}>
                            <strong>{word.german}:</strong> {word.english}
                          </li>
                        ))}
                        {question.importantWords.verbs && question.importantWords.verbs.map((word, i) => (
                          <li key={i} style={{ fontSize: "1rem" }}>
                            <strong>{word.german}:</strong> {word.english}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="outline-primary" onClick={() => speakText(question.germanQuestion)}>
                    Repeat Question
                  </Button>
                  <Button variant="outline-success" onClick={() => speakText(correctOption.germanOption)}>
                    Repeat Answer
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

export default EinbuergerungQuestionQuickLearning;