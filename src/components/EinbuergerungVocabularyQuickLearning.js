import React, { useState, useEffect } from "react";
import { ProgressBar, Button, Card, Row, Col } from "react-bootstrap";
import { FaVolumeUp, FaPlay, FaStop } from "react-icons/fa";
import vocabulary from "../data/vocabulary.json";
import conversational_german_words from "../data/deutschlearnen/conversational_german_words.json"

function EinbuergerungVocabularyQuickLearning() {
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem("currentWordIndex");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const { word, category, translation } = vocabulary.vocabulary[currentWordIndex];

  const speakWord = (wordToSpeak, repetitions = 1, onEndCallback = null) => {
    let count = 0;
    const utterance = new SpeechSynthesisUtterance(wordToSpeak);
    utterance.lang = "de-DE"; // German
    utterance.rate = 0.7; // Slower speech rate
    utterance.pitch = 1; // Normal pitch

    const speakRepeatedly = () => {
      if (count < repetitions) {
        count++;
        speechSynthesis.speak(utterance);
      } else if (onEndCallback) {
        onEndCallback();
      }
    };

    utterance.onend = () => {
      setTimeout(speakRepeatedly, 2000); // 2-second delay between repetitions
    };

    speakRepeatedly();
  };

  const handleNextWord = () => {
    if (currentWordIndex < vocabulary.vocabulary.length - 1) {
      setCurrentWordIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        sessionStorage.setItem("currentWordIndex", newIndex);
        return newIndex;
      });
    }
  };

  const handleReset = () => {
    speechSynthesis.cancel();
    setCurrentWordIndex(0);
    sessionStorage.setItem("currentWordIndex", 0);
  };

  const handlePlayAll = () => {
    const playNext = (index) => {
      if (index < vocabulary.vocabulary.length) {
        setCurrentWordIndex(index);
        speakWord(vocabulary.vocabulary[index].word, 1, () => {
          setTimeout(() => {
            playNext(index + 1);
          }, 3000); // 3-second delay to allow React to update the DOM
        });
      }
    };
    playNext(currentWordIndex);
  };

  useEffect(() => {
    sessionStorage.setItem("currentWordIndex", currentWordIndex);
  }, [currentWordIndex]);

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="text-primary" style={{ fontWeight: 'bold' }}>
          Einbürgerung Vocabulary Quick Learning
        </h2>
      </div>

      {currentWordIndex < vocabulary.vocabulary.length ? (
        <>
          <div className="mb-4">
            <div className="text-center mb-3">
              <h1
                style={{
                  fontSize: "3rem",
                  color: "#007bff",
                  marginBottom: "10px",
                }}
              >
                {word}
              </h1>
              <FaVolumeUp
                onClick={() => speakWord(word, 4)}
                style={{ cursor: "pointer", fontSize: "2.5rem", color: "#007bff" }}
                title="Click to hear pronunciation"
              />
            </div>
            <div className="text-center">
              <p style={{ fontSize: '1.25rem' }}><strong>Category:</strong> {category}</p>
              <p style={{ fontSize: '1.25rem' }}><strong>Translation:</strong> {translation}</p>
            </div>
          </div>

          <ProgressBar
            now={(currentWordIndex / vocabulary.vocabulary.length) * 100}
            label={`${currentWordIndex + 1}/${vocabulary.vocabulary.length}`}
            className="mb-4"
            style={{ height: "1.5rem", fontSize: "1rem" }}
          />

          <div className="text-center">
            <Button
              variant="success"
              onClick={handlePlayAll}
              className="me-2"
              style={{ padding: '10px 20px', fontSize: '1rem' }}
            >
              <FaPlay /> Play All
            </Button>
            <Button
              variant="primary"
              onClick={handleNextWord}
              className="me-2"
              style={{ padding: '10px 20px', fontSize: '1rem' }}
            >
              Next Word
            </Button>
            <Button
              variant="danger"
              onClick={() => speechSynthesis.cancel()}
              className="me-2"
              style={{ padding: '10px 20px', fontSize: '1rem' }}
            >
              <FaStop /> Stop
            </Button>
            <Button
              variant="secondary"
              onClick={handleReset}
              style={{ padding: '10px 20px', fontSize: '1rem' }}
            >
              Reset
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p>All words have been reviewed. Click "Reset" to start over.</p>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      )}

      {/* All Vocabulary Words Section */}
      <div className="mt-5">
        <h4 className="text-primary" style={{ fontWeight: 'bold' }}>All Vocabulary Words</h4>
        <Row className="mt-3">
          {vocabulary.vocabulary.map((wordObj, index) => (
            <Col sm={6} md={4} lg={3} className="mb-4" key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                      {wordObj.word}
                    </span>
                    <FaVolumeUp
                      onClick={() => speakWord(wordObj.word, 4)}
                      style={{ cursor: "pointer", fontSize: "1.8rem", color: "#007bff" }}
                      title="Click to hear pronunciation"
                    />
                  </Card.Title>
                  <Card.Text>
                    <strong>Category:</strong> {wordObj.category}
                  </Card.Text>
                  <Card.Text>
                    <strong>Translation:</strong> {wordObj.translation}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default EinbuergerungVocabularyQuickLearning;