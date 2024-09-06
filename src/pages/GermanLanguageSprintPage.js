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
      <h1 className="text-center">German Language Sprint</h1>
      <p className="lead text-center">
        Quickly learn and test your German vocabulary with an easy-to-use learning mode. Enhance your understanding of key words and phrases used in everyday conversations.
      </p>

      {currentView !== "home" && (
        <Button variant="link" onClick={handleBackClick}>
          &larr; Back
        </Button>
      )}

      {currentView === "home" && (
        <div className="mt-5 text-center">
          <h2>Start Vocabulary Quick Learning</h2>
          <p>Practice important German words and phrases.</p>
          <Button variant="primary" onClick={() => setCurrentView("VocabularyQuickLearning")}>
            Start Quick Learning
          </Button>
        </div>
      )}

      {currentView === "VocabularyQuickLearning" && <ConversationalGermanQuickLearning />}
    </div>
  );
}

export default GermanLanguageSprintPage;