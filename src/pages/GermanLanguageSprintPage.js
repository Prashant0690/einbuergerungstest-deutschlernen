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
      <h1 className="text-center">Conversational German Flashcard Sprint</h1>
      <p className="lead text-center">
        Train fast, everyday German with a random flashcard flow built for real conversations, web series, and movies.
      </p>

      {currentView !== "home" && (
        <Button variant="link" onClick={handleBackClick}>
          &larr; Back
        </Button>
      )}

      {currentView === "home" && (
        <div className="mt-5 text-center">
          <h2>Start 98-Word Conversation Drill</h2>
          <p>
            Practice in full manual mode: reveal answers when you want, then move forward with next.
            You can choose German-first or English-first and also open the full 98-word list.
          </p>
          <Button variant="primary" onClick={() => setCurrentView("VocabularyQuickLearning")}>
            Start Flashcard Sprint
          </Button>
        </div>
      )}

      {currentView === "VocabularyQuickLearning" && <ConversationalGermanQuickLearning />}
    </div>
  );
}

export default GermanLanguageSprintPage;