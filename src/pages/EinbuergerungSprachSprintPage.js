import React, { useState } from "react";
import { loadGeneralQuestions, loadStateQuestions } from '../data/content';
import vocabulary from "../data/vocabulary.json";
import { useQuizContext } from "../context/QuizContext";
import { Button } from 'react-bootstrap';
import EinbuergerungVocabularyQuickLearning from "../components/EinbuergerungVocabularyQuickLearning";
import EinbuergerungQuestionQuickLearning from "../components/EinbuergerungQuestionQuickLearning";

// Main Page Component
function EinbuergerungSprachSprintPage() {
  const { bundesland } = useQuizContext();
  const [currentView, setCurrentView] = useState("home");

  const handleBackClick = () => {
    setCurrentView("home");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Einbürgerung SprachSprint</h1>
      <p className="lead text-center">
        This page is designed to help you quickly learn and test your knowledge in preparation for the Einbürgerungstest. Utilize the quick learning mode to enhance your understanding of vocabulary, general questions, and state-specific questions.
      </p>

      {currentView !== "home" && (
        <Button variant="link" onClick={handleBackClick}>
          &larr; Back
        </Button>
      )}

      {currentView === "home" && (
        <>
          <VocabularySection setCurrentView={setCurrentView} />
          <GeneralQuestionsSection setCurrentView={setCurrentView} />
          {bundesland && <StateQuestionsSection setCurrentView={setCurrentView} />}
        </>
      )}

      {currentView === "VocabularyQuickLearning" && <EinbuergerungVocabularyQuickLearning />}
      {currentView === "VocabularyTestYourProgress" && <VocabularyTestYourProgress />}
      {currentView === "GeneralQuestionsQuickLearning" && <EinbuergerungQuestionQuickLearning />}
      {currentView === "GeneralQuestionsTestYourProgress" && <GeneralQuestionsTestYourProgress />}
    </div>
  );
}

// Vocabulary Section Component
function VocabularySection({ setCurrentView }) {
  return (
    <div className="mt-5">
      <h2>Vocabulary Quick Learning</h2>
      <p>
        Learn important words and phrases that will help you in the Einbürgerungstest. You can practice their pronunciation and meaning.
      </p>
      <Button variant="primary" onClick={() => setCurrentView("VocabularyQuickLearning")}>Quick Learning</Button>
      <Button variant="secondary" className="ms-3" onClick={() => setCurrentView("VocabularyTestYourProgress")}>Test Your Progress</Button>
    </div>
  );
}

// General Questions Section Component
function GeneralQuestionsSection({ setCurrentView }) {
  return (
    <div className="mt-5">
      <h2>General Questions Quick Learning</h2>
      <p>
        Go through 300 general questions that are part of the Einbürgerungstest. Practice with quick learning mode or test your progress.
      </p>
      <Button variant="primary" onClick={() => setCurrentView("GeneralQuestionsQuickLearning")}>Quick Learning</Button>
      <Button variant="secondary" className="ms-3" onClick={() => setCurrentView("GeneralQuestionsTestYourProgress")}>Test Your Progress</Button>
    </div>
  );
}

// State Questions Section Component
function StateQuestionsSection({ setCurrentView }) {
  return (
    <div className="mt-5">
      <h2>State Questions Quick Learning</h2>
      <p>
        Practice with state-specific questions. Utilize the quick learning mode or test your progress.
      </p>
      <Button variant="primary" onClick={() => setCurrentView("StateQuestionsQuickLearning")}>Quick Learning</Button>
      <Button variant="secondary" className="ms-3" onClick={() => setCurrentView("StateQuestionsTestYourProgress")}>Test Your Progress</Button>
    </div>
  );
}

// Vocabulary Quick Learning Component
function VocabularyQuickLearning() {
  return (
    <div>
      <h2>Vocabulary Quick Learning</h2>
      <p>Practice pronunciation and meanings of important words for the Einbürgerungstest.</p>
    </div>
  );
}

// Vocabulary Test Your Progress Component
function VocabularyTestYourProgress() {
  return (
    <div>
      <h2>Vocabulary Progress Test</h2>
      <p>Test your progress with vocabulary words. See how many you can get right within the time limit!</p>
    </div>
  );
}

// General Questions Quick Learning Component
function GeneralQuestionsQuickLearning() {
  return (
    <div>
      <h2>General Questions Quick Learning</h2>
      <p>Practice with the 300 general questions for the Einbürgerungstest.</p>
    </div>
  );
}

// General Questions Test Your Progress Component
function GeneralQuestionsTestYourProgress() {
  return (
    <div>
      <h2>General Questions Progress Test</h2>
      <p>Test your progress with the general questions. Answer within the time limit and see how you perform!</p>
    </div>
  );
}

export default EinbuergerungSprachSprintPage;