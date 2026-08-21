import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, OverlayTrigger, ProgressBar, Row, Tooltip } from "react-bootstrap";
import { FaInfoCircle, FaVolumeUp } from "react-icons/fa";
import conversational_german_words from "../data/deutschlearnen/conversational_german_words.json";

const SESSION_SIZES = [20, 40, 60, 98];

const normalize = (text) => text.toLowerCase().trim();

const shuffle = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

function ConversationalGermanQuickLearning() {
  const [query, setQuery] = useState("");
  const [sessionSize, setSessionSize] = useState(40);
  const [promptLanguage, setPromptLanguage] = useState("english");
  const [showFullList, setShowFullList] = useState(false);
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learnedIds, setLearnedIds] = useState([]);

  const filteredWords = useMemo(() => {
    const term = normalize(query);
    if (!term) return conversational_german_words;

    return conversational_german_words.filter((word) => {
      const wordMatch = normalize(word.GermanWord).includes(term);
      const meaningMatch = word.EnglishMeanings.some((meaning) => normalize(meaning).includes(term));
      const noteMatch = normalize(word.Note || "").includes(term);
      return wordMatch || meaningMatch || noteMatch;
    });
  }, [query]);

  const activeSize = showFullList ? filteredWords.length : sessionSize;

  useEffect(() => {
    const nextDeck = shuffle(filteredWords.slice(0, activeSize));
    setDeck(nextDeck);
    setCardIndex(0);
    setShowAnswer(false);
  }, [filteredWords, activeSize]);

  const currentCard = deck[cardIndex];
  const learnedCount = useMemo(
    () => deck.filter((word) => learnedIds.includes(word.id)).length,
    [deck, learnedIds]
  );

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const goNextCard = useCallback(() => {
    if (!deck.length) return;
    setCardIndex((prev) => (prev + 1) % deck.length);
    setShowAnswer(false);
  }, [deck.length]);

  const goPrevCard = useCallback(() => {
    if (!deck.length) return;
    setCardIndex((prev) => (prev - 1 + deck.length) % deck.length);
    setShowAnswer(false);
  }, [deck.length]);

  const toggleLearned = () => {
    if (!currentCard) return;
    setLearnedIds((prev) =>
      prev.includes(currentCard.id)
        ? prev.filter((id) => id !== currentCard.id)
        : [...prev, currentCard.id]
    );
  };

  const reshuffleDeck = () => {
    setDeck((prev) => shuffle(prev));
    setCardIndex(0);
    setShowAnswer(false);
  };

  const onCardClick = () => {
    if (!currentCard) return;
    if (!showAnswer) {
      setShowAnswer(true);
      return;
    }
    goNextCard();
  };

  const promptText =
    promptLanguage === "english"
      ? currentCard?.EnglishMeanings.join(", ")
      : currentCard?.GermanWord;
  const germanText = currentCard?.GermanWord || "";
  const englishText = currentCard?.EnglishMeanings.join(", ") || "";

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-2" style={{ fontWeight: "bold", fontSize: "2rem" }}>
        Conversational German Flashcards
      </h2>
      <p className="text-center text-muted mb-4">
        Manual mode only (no auto switching). Reveal when ready, then move to next card.
      </p>

      <Card className="shadow-sm p-3 mb-4">
        <Row className="g-3 align-items-end">
          <Col md={5}>
            <Form.Label className="fw-semibold">Search</Form.Label>
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search German, English, or note"
            />
          </Col>
          <Col md={2}>
            <Form.Label className="fw-semibold">Cards in session</Form.Label>
            <Form.Select
              value={sessionSize}
              onChange={(event) => setSessionSize(Number(event.target.value))}
              disabled={showFullList}
            >
              {SESSION_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label className="fw-semibold">Show first</Form.Label>
            <Form.Select
              value={promptLanguage}
              onChange={(event) => {
                setPromptLanguage(event.target.value);
                setShowAnswer(false);
              }}
            >
              <option value="english">English</option>
              <option value="german">German</option>
            </Form.Select>
          </Col>
          <Col md={3} className="d-flex gap-2">
            <Button variant="outline-primary" onClick={reshuffleDeck}>
              Randomize order
            </Button>
            <Button
              variant={showFullList ? "primary" : "outline-secondary"}
              onClick={() => setShowFullList((prev) => !prev)}
            >
              {showFullList ? "Full list ON" : "View full list"}
            </Button>
          </Col>
        </Row>
      </Card>

      {currentCard ? (
        <Card className="shadow-sm p-3 mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <strong>
                Card {cardIndex + 1} / {deck.length}
              </strong>
              <div className="d-flex gap-2 align-items-center">
                <Badge bg="success">Learned {learnedCount}</Badge>
                <Badge bg="secondary">Remaining {Math.max(deck.length - learnedCount, 0)}</Badge>
              </div>
            </div>

            <ProgressBar
              now={(learnedCount / Math.max(deck.length, 1)) * 100}
              className="mb-4"
              label={`${Math.round((learnedCount / Math.max(deck.length, 1)) * 100)}%`}
            />

            <Card
              className="p-4 mb-4"
              style={{
                minHeight: "280px",
                border: showAnswer ? "2px solid #9ec5fe" : "2px solid #f4d7a1",
                backgroundColor: showAnswer ? "#f4f8ff" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={onCardClick}
            >
              <div className="p-3 rounded mb-3" style={{ backgroundColor: "#fff7e8", border: "1px solid #ffe0ac" }}>
                <h2 className="mb-1 fw-bold">{promptText}</h2>
                <div className="d-flex justify-content-end">
                  <OverlayTrigger
                    trigger={["hover", "click", "focus"]}
                    placement="top"
                    overlay={<Tooltip id={`note-${currentCard.id}`}>{currentCard.Note}</Tooltip>}
                  >
                    <Button
                      variant="link"
                      className="p-0 text-muted"
                      style={{ textDecoration: "none" }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <FaInfoCircle style={{ fontSize: "1rem" }} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>

              {promptLanguage === "german" && (
                <Button
                  variant="link"
                  className="p-0 mb-3"
                  style={{ textDecoration: "none" }}
                  onClick={() => speakText(currentCard.GermanWord)}
                >
                  <FaVolumeUp style={{ fontSize: "1.2rem" }} /> Hear German
                </Button>
              )}

              {showAnswer ? (
                <div
                  className="p-3 mt-2 rounded"
                  style={{ backgroundColor: "#eaf2ff", border: "1px solid #c9dcff" }}
                >
                  <h2 className="mb-2 fw-bold">
                    {promptLanguage === "english" ? germanText : englishText}
                  </h2>
                  <Button
                    variant="link"
                    className="p-0"
                    style={{ textDecoration: "none" }}
                    onClick={() => speakText(currentCard.GermanWord)}
                  >
                    <FaVolumeUp style={{ fontSize: "1.2rem" }} /> Hear German
                  </Button>
                </div>
              ) : (
                <div className="text-muted">Click once to reveal. Click again to open next word.</div>
              )}
            </Card>

            <div className="d-flex justify-content-between gap-2 flex-wrap">
              <Button variant="outline-primary" onClick={goPrevCard}>
                Previous
              </Button>
              <Button
                variant={learnedIds.includes(currentCard.id) ? "success" : "outline-success"}
                onClick={toggleLearned}
              >
                {learnedIds.includes(currentCard.id) ? "Learned" : "Mark learned"}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setShowAnswer((prev) => !prev)}
              >
                {showAnswer ? "Hide answer" : "Reveal answer"}
              </Button>
              <Button variant="primary" onClick={goNextCard}>
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm p-4 text-center mb-4">
          <strong>No cards found.</strong>
          <div className="text-muted">Try a different search term.</div>
        </Card>
      )}

      {showFullList && filteredWords.length > 0 && (
        <Card className="shadow-sm p-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="mb-0">Full learning board</h5>
              <div className="text-muted">Browse, listen, and jump directly to any word.</div>
            </div>

            <div style={{ maxHeight: "460px", overflowY: "auto", paddingRight: "4px" }}>
              <Row className="g-3">
                {filteredWords.map((word, index) => (
                  <Col key={word.id} xs={12} md={6} lg={4}>
                    <Card
                      className="h-100"
                      style={{
                        border: learnedIds.includes(word.id) ? "1px solid #8fd19e" : "1px solid #e9ecef",
                        backgroundColor: learnedIds.includes(word.id) ? "#f2fbf4" : "#ffffff",
                      }}
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Badge bg={learnedIds.includes(word.id) ? "success" : "secondary"}>#{index + 1}</Badge>
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => speakText(word.GermanWord)}
                            title="Hear German pronunciation"
                          >
                            <FaVolumeUp />
                          </Button>
                        </div>
                        <h5 className="fw-bold mb-2">{word.GermanWord}</h5>
                        <div className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                          {word.EnglishMeanings.join(", ")}
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                              const nextIndex = deck.findIndex((item) => item.id === word.id);
                              if (nextIndex >= 0) {
                                setCardIndex(nextIndex);
                                setShowAnswer(false);
                              }
                            }}
                          >
                            Study this
                          </Button>
                          <Button
                            size="sm"
                            variant={learnedIds.includes(word.id) ? "success" : "outline-success"}
                            onClick={() => {
                              setLearnedIds((prev) =>
                                prev.includes(word.id)
                                  ? prev.filter((id) => id !== word.id)
                                  : [...prev, word.id]
                              );
                            }}
                          >
                            {learnedIds.includes(word.id) ? "Learned" : "Mark learned"}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default ConversationalGermanQuickLearning;
