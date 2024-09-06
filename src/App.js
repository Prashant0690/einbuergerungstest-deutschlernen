/*
Einbürgerungstest und Deutschlernen
Copyright (C) 2023 Prashant Tiwari

This program is a personal project and free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Project Name: einbuergerungstest-deutschlernen
Folder Name: einbuergerungstest-deutschlernen
*/
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CitizenshipTestHomePage from "./pages/CitizenshipTestHomePage";
import GermanLearningHomePage from "./pages/GermanLearningHomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import LearningPage from "./pages/LearningPage";
import Header from "./components/Header";
import VocabularyPage from "./pages/VocabularyPage";
import Footer from "./components/Footer";
import GeneralQuestionsPage from "./pages/GeneralQuestionsPage";
import StateQuestionsPage from "./pages/StateQuestionsPage";
import QuizPage from "./pages/QuizPage";
import LegalNoticeModal from "./components/LegalNoticeModal";
import EinbuergerungSprachSprintPage from "./pages/EinbuergerungSprachSprintPage";
import GermanLanguageSprintPage from "./pages/GermanLanguageSprintPage";


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
            <Route path="/" element={<CitizenshipTestHomePage />} />
            <Route path="/VocabularyPage" element={<VocabularyPage />} />
            <Route path="/learningPage" element={<LearningPage />} />
            <Route
              path="/general-questions"
              element={<GeneralQuestionsPage />}
            />
            <Route path="/state-questions" element={<StateQuestionsPage />} />
            <Route path="/quiz-selection" element={<QuizPage />} />

            <Route
              path="/german-learning"
              element={<GermanLearningHomePage />}
            />

            <Route path="/einbuergerung-sprachsprint" element={<EinbuergerungSprachSprintPage />} />
            <Route path="/deutsch-sprint" element={<GermanLanguageSprintPage />} />
          </Routes>
        </div>

        {/* Footer with language toggle */}
        <Footer
          language={language}
          toggleLanguage={toggleLanguage}
          onShowLegalNotice={handleShowLegalNotice}
        />
      </div>
    </Router>
  );
}

export default App;