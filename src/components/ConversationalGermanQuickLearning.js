import React, { useMemo, useState } from "react";
import { Badge, Button, ButtonGroup, Card, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { FaVolumeUp } from "react-icons/fa";
import conversational_german_words from "../data/deutschlearnen/conversational_german_words.json";

const SESSION_SIZES = [8, 12, 20];

function ConversationalGermanQuickLearning() {
  const [viewMode, setViewMode] = useState("list");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sessionSize, setSessionSize] = useState(12);
  const [showTranslations, setShowTranslations] = useState(true);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [learnedWords, setLearnedWords] = useState([]);

  const words = useMemo(
    () => conversational_german_words.map((word) => ({ ...word, normalizedWord: word.GermanWord.toLowerCase() })),
    []
  );

  const categories = useMemo(
    () => ["All", ...new Set(words.map((word) => word.Category).filter(Boolean))],
    [words]
  );

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return words.filter((word) => {
      const categoryMatches = selectedCategory === "All" || word.Category === selectedCategory;
      const textMatches =
        !normalizedQuery ||
        word.normalizedWord.includes(normalizedQuery) ||
        word.EnglishMeanings.some((meaning) => meaning.toLowerCase().includes(normalizedQuery));
      return categoryMatches && textMatches;
    });
  }, [words, selectedCategory, query]);

  const sessionWords = useMemo(() => filteredWords.slice(0, sessionSize), [filteredWords, sessionSize]);
  const orderedSessionWords = useMemo(() => {
    if (!shuffleSeed) return sessionWords;
    return [...sessionWords].sort((a, b) => {
      const aRank = (a.id * 9301 + shuffleSeed) % 233280;
      const bRank = (b.id * 9301 + shuffleSeed) % 233280;
      return aRank - bRank;
    });
  }, [sessionWords, shuffleSeed]);

  const currentFlashcard = orderedSessionWords[flashcardIndex];

  const learnedCount = useMemo(
    () => orderedSessionWords.filter((word) => learnedWords.includes(word.id)).length,
    [orderedSessionWords, learnedWords]
  );

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  };

  const resetFlashcards = () => {
    setFlashcardIndex(0);
    setShuffleSeed(0);
    setShowFlashcardAnswer(false);
  };

  const toggleLearned = () => {
    if (!currentFlashcard) return;
    setLearnedWords((previous) =>
      previous.includes(currentFlashcard.id)
        ? previous.filter((wordId) => wordId !== currentFlashcard.id)
        : [...previous, currentFlashcard.id]
    );
  };

  const shuffleSessionWords = () => {
    if (orderedSessionWords.length < 2) return;
    setShuffleSeed(Math.floor(Math.random() * 100000) + 1);
    setShowFlashcardAnswer(false);
    setFlashcardIndex(0);
  };

  const goToNext = () => {
    if (!orderedSessionWords.length) return;
    setFlashcardIndex((prev) => (prev + 1) % orderedSessionWords.length);
    setShowFlashcardAnswer(false);
  };

  const goToPrevious = () => {
    if (!orderedSessionWords.length) return;
    setFlashcardIndex((prev) => (prev - 1 + orderedSessionWords.length) % orderedSessionWords.length);
    setShowFlashcardAnswer(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem' }}>
        Conversational German Quick Learning
      </h2>

      <Card className="shadow-sm p-3 mb-4">
        <Row className="g-3 align-items-end">
          <Col md={5}>
            <Form.Label className="fw-semibold">Search word or meaning</Form.Label>
            <Form.Control
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                resetFlashcards();
              }}
              placeholder="e.g. really, maybe, doch..."
            />
          </Col>
          <Col md={3}>
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(event) => {
                setSelectedCategory(event.target.value);
                resetFlashcards();
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label className="fw-semibold">Words per session</Form.Label>
            <Form.Select
              value={sessionSize}
              onChange={(event) => {
                setSessionSize(Number(event.target.value));
                resetFlashcards();
              }}
            >
              {SESSION_SIZES.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Check
              type="switch"
              id="show-translations"
              className="mt-4"
              label="Show translations"
              checked={showTranslations}
              onChange={(event) => setShowTranslations(event.target.checked)}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <div className="text-muted">
            Learning set: <strong>{sessionWords.length}</strong> of <strong>{filteredWords.length}</strong> matching words
          </div>
          <ButtonGroup>
            <Button variant={viewMode === "list" ? "primary" : "outline-primary"} onClick={() => setViewMode("list")}>
              List view
            </Button>
            <Button
              variant={viewMode === "flashcards" ? "primary" : "outline-primary"}
              onClick={() => {
                setViewMode("flashcards");
                resetFlashcards();
              }}
            >
              Flashcards
            </Button>
          </ButtonGroup>
        </div>
      </Card>

      {viewMode === "list" && (
        <Row className="g-4">
          {sessionWords.map((word) => (
            <Col sm={12} md={6} key={word.id}>
              <Card className="shadow-sm p-3 h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="info">{word.Category}</Badge>
                    <FaVolumeUp
                      onClick={() => speakText(word.GermanWord)}
                      style={{ cursor: "pointer", fontSize: "1.4rem", color: "#0d6efd" }}
                      title="Hear word"
                    />
                  </div>
                  <h4 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#0d6efd" }}>{word.GermanWord}</h4>
                  {showTranslations && (
                    <p className="mb-3">
                      <em>{word.EnglishMeanings.join(", ")}</em>
                    </p>
                  )}

                  {word.ExampleSentences?.[0] && (
                    <div className="mb-3">
                      <strong>{word.ExampleSentences[0].Sentence}</strong>
                      <FaVolumeUp
                        onClick={() => speakText(word.ExampleSentences[0].Sentence)}
                        style={{ cursor: "pointer", fontSize: "1.1rem", marginLeft: "8px", color: "#0d6efd" }}
                        title="Hear sentence"
                      />
                      {showTranslations && (
                        <p className="text-muted mb-0 mt-1">{word.ExampleSentences[0].Translation}</p>
                      )}
                    </div>
                  )}

                  {word.ExampleSentences?.length > 1 && (
                    <details>
                      <summary className="text-primary" style={{ cursor: "pointer" }}>More examples</summary>
                      {word.ExampleSentences.slice(1).map((example, index) => (
                        <div key={`${word.id}-${index}`} className="mt-2">
                          <strong>{example.Sentence}</strong>
                          {showTranslations && <p className="text-muted mb-0">{example.Translation}</p>}
                        </div>
                      ))}
                    </details>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
          {sessionWords.length === 0 && (
            <Col xs={12}>
              <Card className="p-4 text-center">
                <strong>No words found for this filter.</strong>
                <div className="text-muted">Try another search term or category.</div>
              </Card>
            </Col>
          )}
        </Row>
      )}

      {viewMode === "flashcards" && (
        <Card className="shadow-sm p-3">
          <Card.Body>
            {currentFlashcard ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <strong>Card {flashcardIndex + 1} / {orderedSessionWords.length}</strong>
                  <strong>Learned: {learnedCount}/{orderedSessionWords.length}</strong>
                </div>

                <ProgressBar
                  now={(learnedCount / Math.max(orderedSessionWords.length, 1)) * 100}
                  label={`${Math.round((learnedCount / Math.max(orderedSessionWords.length, 1)) * 100)}%`}
                  className="mb-3"
                />

                <Card
                  className="p-4 text-center mb-3"
                  style={{ cursor: "pointer", minHeight: "240px", backgroundColor: showFlashcardAnswer ? "#f8fbff" : "#fdfdfd" }}
                  onClick={() => setShowFlashcardAnswer((current) => !current)}
                >
                  {!showFlashcardAnswer ? (
                    <>
                      <Badge bg="secondary" className="mb-3">{currentFlashcard.Category}</Badge>
                      <h2 className="mb-3">{currentFlashcard.GermanWord}</h2>
                      <div className="text-muted mb-2">Tap to reveal meaning</div>
                      <FaVolumeUp
                        onClick={(event) => {
                          event.stopPropagation();
                          speakText(currentFlashcard.GermanWord);
                        }}
                        style={{ cursor: "pointer", fontSize: "1.8rem", color: "#0d6efd" }}
                      />
                    </>
                  ) : (
                    <>
                      <h4 className="mb-2">{currentFlashcard.GermanWord}</h4>
                      <p className="mb-2"><em>{currentFlashcard.EnglishMeanings.join(", ")}</em></p>
                      {currentFlashcard.ExampleSentences?.[0] && (
                        <>
                          <p className="fw-semibold mb-1">{currentFlashcard.ExampleSentences[0].Sentence}</p>
                          <p className="text-muted mb-2">{currentFlashcard.ExampleSentences[0].Translation}</p>
                        </>
                      )}
                      {currentFlashcard.UsageTips?.[0] && (
                        <p className="mb-0"><strong>Tip:</strong> {currentFlashcard.UsageTips[0]}</p>
                      )}
                    </>
                  )}
                </Card>

                <div className="d-flex justify-content-between gap-2 flex-wrap">
                  <Button variant="outline-primary" onClick={goToPrevious}>Previous</Button>
                  <Button variant="outline-secondary" onClick={shuffleSessionWords}>Shuffle</Button>
                  <Button
                    variant={learnedWords.includes(currentFlashcard.id) ? "success" : "outline-success"}
                    onClick={toggleLearned}
                  >
                    {learnedWords.includes(currentFlashcard.id) ? "Marked learned" : "Mark as learned"}
                  </Button>
                  <Button variant="primary" onClick={goToNext}>Next</Button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <strong>No flashcards in this filter.</strong>
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      <Card className="mt-4 border-0" style={{ backgroundColor: "#f8f9fa" }}>
        <Card.Body>
          <strong>Coach mode:</strong> Learn 8-12 words per session, repeat each card out loud, and keep only words marked
          as "learned" if you can use them in your own sentence.
        </Card.Body>
      </Card>
    </div>
  );
}

export default ConversationalGermanQuickLearning;