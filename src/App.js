import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import LearningPage from "./pages/LearningPage";
import Header from "./components/Header";
import VocabularyPage from "./pages/VocabularyPage";
import Footer from "./components/Footer";
import GeneralQuestionsPage from "./pages/GeneralQuestionsPage";
import StateQuestionsPage from "./pages/StateQuestionsPage";
import QuizPage from "./pages/QuizPage";
import LegalNoticeModal from "./components/LegalNoticeModal";

function App() {
  const [language, setLanguage] = useState("de");
  const [showLegalNotice, setShowLegalNotice] = useState(false);

  // Check if the user has already agreed to the legal notice
  useEffect(() => {
    const hasAgreed = sessionStorage.getItem("hasAgreedToLegalNotice");
    if (!hasAgreed) {
      setShowLegalNotice(true);
    }
  }, []);

  const toggleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleAgree = () => {
    sessionStorage.setItem("hasAgreedToLegalNotice", "true");
    setShowLegalNotice(false);
  };

  const handleShowLegalNotice = () => {
    setShowLegalNotice(true);
  };

  return (
    <Router basename="/einbuergerungstest-deutschlernen">
      <div className="d-flex flex-column min-vh-100">
        {/* Legal Notice Modal */}
        <LegalNoticeModal show={showLegalNotice} onAgree={handleAgree} />

        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="container mt-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/VocabularyPage" element={<VocabularyPage />} />
            <Route path="/learningPage" element={<LearningPage />} />
            <Route path="/general-questions" element={<GeneralQuestionsPage />} />
            <Route path="/state-questions" element={<StateQuestionsPage />} />
            <Route path="/quiz-selection" element={<QuizPage />} />
          </Routes>
        </div>

        {/* Footer with language toggle */}
        <Footer language={language} toggleLanguage={toggleLanguage} onShowLegalNotice={handleShowLegalNotice} />
      </div>
    </Router>
  );
}

export default App;