import React, { useState } from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaVolumeUp } from "react-icons/fa";
import vocabulary from "../data/vocabulary.json"; // Adjust the path if necessary
import "./VocabularyPage.css"; // Assuming you have a separate CSS file for styling

// Map categories to Bootstrap background classes for button outlines
function getCategoryColor(category) {
  switch (category) {
    case "Law and Rights":
      return "border-danger border-3"; // Red
    case "Politics":
      return "border-primary border-3"; // Blue
    case "Economy":
      return "border-success border-3"; // Green
    case "History":
      return "border-warning border-3"; // Orange
    case "Symbols and Identity":
      return "border-purple border-3"; // Purple (custom color)
    case "Society and Culture":
      return "border-info border-3"; // Teal
    case "Education":
      return "border-secondary border-3"; // Gray
    case "Geography":
      return "border-pink border-3"; // Pink (custom color)
    default:
      return "border-dark border-3"; // Default to dark
  }
}

function renderTooltip(props, translation) {
  return <Tooltip {...props}>{translation}</Tooltip>;
}

function VocabularyPage() {
  const [clickedWords, setClickedWords] = useState(new Set());

  const handleWordClick = (word) => {
    setClickedWords((prevClickedWords) => {
      const newClickedWords = new Set(prevClickedWords);

      if (newClickedWords.has(word)) {
        newClickedWords.delete(word); // Remove the word if it's already in the set
      } else {
        newClickedWords.add(word); // Add the word if it's not in the set
      }

      return newClickedWords;
    });
  };

  // Function to handle speech synthesis
  const handleSpeak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "de-DE"; // Set language to German
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="important-words-container">
      <h1 className="mb-4">Important Words for the Einbürgerungstest</h1>
      <p className="lead">
        Here are some important nouns and verbs you should know:
      </p>

      {/* Legend Section */}
      <div className="legend mb-4">
        <h4>Category Legend</h4>
        <div className="d-flex flex-wrap gap-3">
          {vocabulary.vocabulary.map((wordObj, index) => {
            const colorClass = getCategoryColor(wordObj.category);
            const isClicked = clickedWords.has(wordObj.word);

            return (
              <OverlayTrigger
                key={index}
                placement="top"
                overlay={(props) => renderTooltip(props, wordObj.translation)}
              >
                <Button
                  variant={isClicked ? "dark" : "outline-dark"}
                  className={`btn-lg d-flex align-items-center justify-content-between ${colorClass}`}
                  style={{
                    maxWidth: "520px", // Limit the width of the button
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    backgroundColor: isClicked ? "lightpink" : "white",
                    borderColor: isClicked ? "dark" : "lightgrey",
                    color: isClicked ? "white" : "black",
                  }}
                  onClick={() => handleWordClick(wordObj.word)}
                >
                  <span style={{ flex: 1, marginRight: "8px" }}>
                    {wordObj.word}
                  </span>
                  <FaVolumeUp
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the button click event
                      handleSpeak(wordObj.word);
                    }}
                    style={{ flexShrink: 0 }}
                  />
                </Button>
              </OverlayTrigger>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VocabularyPage;