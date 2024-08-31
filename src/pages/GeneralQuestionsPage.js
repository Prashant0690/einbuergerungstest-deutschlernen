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
import React, { useState, useEffect } from 'react';
import { loadGeneralQuestions } from '../data/content'; // Directly load general questions
import AnsweredQuestionComponent from '../components/AnsweredQuestionComponent';
import UnansweredQuestionComponent from '../components/UnansweredQuestionComponent';
import {
  processAnswer,
  saveAnswersToSession,
  loadAnswersFromSession,
  updateAnswerArray
} from '../utils/quizUtils'; // Import utility functions

function GeneralQuestionsPage() {
  const [questions, setQuestions] = useState(loadGeneralQuestions()); // Load questions directly
  const [originalQuestions] = useState(questions); // Store original questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem('GeneralQuesPageCurrentQuestionIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [isRandomMode, setIsRandomMode] = useState(false); // State to manage random mode
  const [showEnglish, setShowEnglish] = useState(false); // Toggle for showing English translations
  const [answeredQuestions, setAnsweredQuestions] = useState(
    loadAnswersFromSession('answeredQuestions') // Load answered questions from sessionStorage
  );

  // Save current question index to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('GeneralQuesPageCurrentQuestionIndex', currentQuestionIndex);
  }, [currentQuestionIndex]);

  // Shuffle the questions when random mode is activated
  const shuffleQuestions = (questionsArray) => {
    return [...questionsArray].sort(() => Math.random() - 0.5);
  };

  const handleRandomMode = () => {
    if (!isRandomMode) {
      const shuffled = shuffleQuestions(questions);
      setQuestions(shuffled); // Set shuffled questions
      setCurrentQuestionIndex(0); // Reset to the first question in the shuffled order
    } else {
      setQuestions(originalQuestions); // Revert to the original order when random mode is disabled
      setCurrentQuestionIndex(0); // Reset to the first question in the original order
    }
    setIsRandomMode(!isRandomMode);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  };

  const handleNext = () => {
    if (isRandomMode) {
      // In random mode, select the next random question
      const nextIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestionIndex(nextIndex);
    } else {
      // In normal mode, select the next question in order
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  const handlePagination = (index) => {
    setCurrentQuestionIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  const handleDirectJump = (event) => {
    const index = parseInt(event.target.value, 10) - 1;
    if (!isNaN(index) && index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  // Save answer to session storage and update the state
  const saveAnswer = (questionId, region, selectedOptionIndex) => {
    const question = questions.find((q) => q.id === questionId && q.region === region);
    const selectedGermanOption = question.options[selectedOptionIndex]?.germanOption;

    if (!selectedGermanOption) return; // Prevent errors if no option is selected

    // Process the answer
    const newAnswer = processAnswer(question, selectedGermanOption);

    // Update the answered questions array
    const updatedAnswers = updateAnswerArray(answeredQuestions, newAnswer);

    // Save updated answers to state and session storage
    setAnsweredQuestions(updatedAnswers);
    saveAnswersToSession('answeredQuestions', updatedAnswers);
  };

  // Check the answer status of a question
  const getAnswerStatus = (questionId, region) => {
    const answered = answeredQuestions.find((q) => q.id === questionId && q.region === region);
    if (answered) {
      return answered.isCorrect ? 'correct' : 'incorrect';
    }
    return 'unanswered';
  };

  // Get the saved answer for the current question
  const getSavedAnswer = (questionId, region) => {
    return answeredQuestions.find((q) => q.id === questionId && q.region === region);
  };

  const renderPagination = () => {
    const paginationRange = 5;
    const totalQuestions = questions.length;
    const start = Math.max(0, currentQuestionIndex - paginationRange);
    const end = Math.min(totalQuestions, currentQuestionIndex + paginationRange + 1);

    return (
      <nav>
        <ul className="pagination justify-content-center">
          {start > 0 && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePagination(start - paginationRange)}>
                &laquo;
              </button>
            </li>
          )}
          {questions.slice(start, end).map((_, index) => {
            const actualIndex = start + index;
            const answerStatus = getAnswerStatus(questions[actualIndex].id, questions[actualIndex].region);

            let buttonStyle = {};
            if (answerStatus === 'correct') {
              buttonStyle = { backgroundColor: '#d4edda', borderColor: '#28a745' }; // Green for correct answers
            } else if (answerStatus === 'incorrect') {
              buttonStyle = { backgroundColor: '#f8d7da', borderColor: '#dc3545' }; // Red for incorrect answers
            }

            return (
              <li key={actualIndex} className={`page-item ${actualIndex === currentQuestionIndex ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePagination(actualIndex)} style={buttonStyle}>
                  {actualIndex + 1}
                </button>
              </li>
            );
          })}
          {end < totalQuestions && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePagination(end)}>
                &raquo;
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  if (!questions || questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answerStatus = getAnswerStatus(currentQuestion.id, currentQuestion.region);
  const savedAnswer = getSavedAnswer(currentQuestion.id, currentQuestion.region);
  const isAnswered = answerStatus !== 'unanswered'; // Determine if the current question has been answered

  return (
    <div className="container mt-4">
      {/* Pagination at the top center */}
      {!isRandomMode && <div className="mb-2 d-flex justify-content-center">{renderPagination()}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          {/* Show Previous button only if not in random mode */}
          {!isRandomMode && (
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
          )}
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleNext}
            disabled={!isRandomMode && currentQuestionIndex >= questions.length - 1}
          >
            Next
          </button>
        </div>
        <h2>
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <div className="d-flex align-items-center">
          <button
            className={`btn btn-${isRandomMode ? 'warning' : 'light'} btn-sm me-2`}
            onClick={handleRandomMode}
          >
            {isRandomMode ? 'Stop Random' : 'Start Random'}
          </button>
          <button
            className={`btn btn-${isAnswered ? 'warning' : showEnglish ? 'warning' : 'light'} btn-sm`}
            onClick={() => setShowEnglish(!showEnglish)}
            disabled={isAnswered} // Disable if the question is answered
          >
            {isAnswered ? 'Show English' : showEnglish ? 'Hide English' : 'Show English'}
          </button>
          <input
            type="number"
            className="form-control form-control-sm ms-2"
            placeholder="Go to question"
            min="1"
            max="300"
            value={currentQuestionIndex + 1}
            onChange={handleDirectJump}
            style={{ width: '100px' }}
          />
        </div>
      </div>

      {/* Render the correct component based on whether the question has been answered */}
      {isAnswered ? (
        <AnsweredQuestionComponent
          answerData={savedAnswer} />
          ) : (
            <UnansweredQuestionComponent
              question={currentQuestion}
              showDetails={showEnglish}
              setSelectedAnswer={(selectedGermanOption) => {
                const selectedOptionIndex = currentQuestion.options.findIndex(
                  (option) => option.germanOption === selectedGermanOption
                );
                saveAnswer(currentQuestion.id, currentQuestion.region, selectedOptionIndex);
              }}
            />
          )}

          {/* Pagination at the bottom center */}
          {!isRandomMode && <div className="mt-4 d-flex justify-content-center">{renderPagination()}</div>}
        </div>
      );
    }

    export default GeneralQuestionsPage;