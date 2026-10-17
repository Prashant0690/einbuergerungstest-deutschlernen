import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import ConversationalGermanQuickLearning from "../components/ConversationalGermanQuickLearning";

// Main Page Component
function GermanLanguageSprintPage() {
  const [currentView, setCurrentView] = useState("home");

  const handleBackClick = () => {
    setCurrentView("home");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Everyday German practice</h1>
      <p className="lead text-center">
        Learn practical phrases through recall, examples, pronunciation, and spaced review. Choose a pack for everyday replies, conversation words, linking ideas, plans, or regional language.
      </p>

      {currentView !== "home" && (
        <Button variant="link" onClick={handleBackClick}>
          &larr; Back
        </Button>
      )}

      {currentView === "home" && (
        <div className="mt-5 text-center">
          <h2>Start a short recall session</h2>
          <p>
            Think of the German before revealing it, then rate your recall. Each phrase includes a natural example, an English translation, and a usage note.
          </p>
          <Button variant="primary" onClick={() => setCurrentView("VocabularyQuickLearning")}>
            Start practising
          </Button>
        </div>
      )}

      {currentView === "VocabularyQuickLearning" && <ConversationalGermanQuickLearning />}
    </div>
  );
}

export default GermanLanguageSprintPage;
