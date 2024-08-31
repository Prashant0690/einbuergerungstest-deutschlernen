import React, { useState, useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { loadGeneralQuestions, loadStateQuestions } from "../data/content";
import {
  processAnswer,
  saveAnswersToSession,
  loadAnswersFromSession,
  updateAnswerArray,
  getImageUrl,
} from "../utils/quizUtils";
import AnsweredQuestionComponent from "../components/AnsweredQuestionComponent";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const QuestionSection = ({
  questions,
  selectedAnswers,
  handleOptionSelect,
  handleSubmitQuiz,
}) => (
  <div className="question-section">
    <button className="btn btn-primary mb-4" onClick={handleSubmitQuiz}>
      Submit Quiz
    </button>

    {questions.map((question, index) => (
      <div
        key={question.id}
        className="mb-5 p-4 border rounded shadow-sm question-container"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <h4 className="mb-3">Question {index + 1} of 34</h4>

        <div className="row">
          <div className="col-md-5">
            {question.answerType === 'image' && (
              <img
                src={getImageUrl(question.region, question.id)}
                className="img-fluid mb-3"
                alt="Answer related"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '5px',
                  backgroundColor: '#fff',
                }}
              />
            )}
          </div>

          <div
            className={`col-md-${question.answerType === 'image' ? '7' : '12'}`}
          >
            <p className="mb-4">{question.germanQuestion}</p>
            <ul className="list-group">
              {question.options.map((option, i) => (
                <li
                  key={i}
                  className={`list-group-item ${
                    selectedAnswers.find((ans) => ans.id === question.id)
                      ?.selectedGermanOption === option.germanOption
                      ? 'list-group-item-info'
                      : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    handleOptionSelect(question, option.germanOption)
                  }
                >
                  {option.germanOption}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ))}

    <div className="d-flex justify-content-center mt-5">
      <button className="btn btn-primary" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  </div>
);

const ResultSection = ({
  questions,
  selectedAnswers,
  handleResetQuiz,
  results,
  getAnswerStatus,
}) => (
  <div className="mt-4">
    <div className="d-flex justify-content-between align-items-center mt-4">
      <h3 className="m-0">Quiz Results</h3>
      <h3 className="results-summary">
        <strong>Correct:</strong> {results.correct} &nbsp;|&nbsp;
        <strong>Incorrect:</strong> {results.incorrect} &nbsp;|&nbsp;
        <strong>Unattempted:</strong> {results.unattempted}
      </h3>

      <button className="btn btn-warning" onClick={handleResetQuiz}>
        New Quiz
      </button>
    </div>

    {/* Review Section */}
    <div className="mt-4">
      {questions.map((question, index) => {
        const savedAnswer = selectedAnswers.find(
          (ans) => ans.id === question.id
        );
        const answerStatus = savedAnswer
          ? savedAnswer.isCorrect
            ? "Correct"
            : "Incorrect"
          : "Unanswered";

        return (
          <div
            key={question.id}
            className="mb-5 p-4 border rounded shadow-sm question-container"
            style={{ backgroundColor: '#f8f9fa' }}
          >
            <h4 className="mb-3">
              Question {index + 1} of 34 -{" "}
              <span
                className={`badge ${
                  answerStatus === "Correct"
                    ? "bg-success"
                    : answerStatus === "Incorrect"
                    ? "bg-danger"
                    : "bg-secondary"
                }`}
              >
                {answerStatus}
              </span>
            </h4>

            <div className="row">
              <div className="col-md-5">
                {question.answerType === "image" && (
                  <img
                    src={getImageUrl(question.region, question.id)}
                    className="img-fluid mb-3"
                    alt="Answer related"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      objectFit: "contain",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "5px",
                      backgroundColor: "#fff",
                    }}
                  />
                )}
              </div>

              <div
                className={`col-md-${
                  question.answerType === "image" ? "7" : "12"
                }`}
              >
                <p>{question.germanQuestion}</p>
                {question.englishQuestion && (
                  <p className="text-muted">({question.englishQuestion})</p>
                )}

                <ul className="list-group">
                  {question.options.map((option, i) => (
                    <li
                      key={i}
                      className={`list-group-item ${
                        savedAnswer?.selectedGermanOption ===
                        option.germanOption
                          ? savedAnswer.isCorrect
                            ? "list-group-item-success"
                            : "list-group-item-danger"
                          : option.isCorrect
                          ? "list-group-item-success"
                          : ""
                      }`}
                    >
                      {option.germanOption}
                      {option.englishOption && (
                        <span className="text-muted ms-2">
                          ({option.englishOption})
                        </span>
                      )}
                      {option.isCorrect && <strong> - Correct Answer</strong>}
                      {savedAnswer?.selectedGermanOption ===
                        option.germanOption && (
                        <strong> - Your Selection</strong>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div className="d-flex justify-content-center mt-5">
      <button className="btn btn-warning" onClick={handleResetQuiz}>
        New Quiz
      </button>
    </div>
  </div>
);

function QuizPage() {
  const { bundesland } = useQuizContext();
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const getStorageKey = (type) => `quiz_${bundesland}_34${type}`;
  const getShowScoreKey = () => `quizShowScore_${bundesland}`;

  const loadSavedData = (type) => {
    const storageKey = getStorageKey(type);
    const savedData = sessionStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : null;
  };

  const saveDataToStorage = (data, type) => {
    const storageKey = getStorageKey(type);
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  };

  const loadShowScore = () => {
    const savedShowScore = sessionStorage.getItem(getShowScoreKey());
    return savedShowScore === "true";
  };

  const saveShowScore = (value) => {
    sessionStorage.setItem(getShowScoreKey(), value);
  };

  const loadNewQuestions = () => {
    const generalQuestions = shuffleArray(loadGeneralQuestions()).slice(0, 30);
    const stateQuestions = shuffleArray(loadStateQuestions()[bundesland] || []).slice(0, 4);
    const allQuestions = [...generalQuestions, ...stateQuestions];

    setQuestions(allQuestions);
    saveDataToStorage(allQuestions, "questions");
    setSelectedAnswers([]); // Reset selected answers for new questions
  };

  useEffect(() => {
    if (!bundesland) {
      setError("Please select a state (Bundesland) to proceed with the quiz.");
      return;
    }

    setError(null);

    const savedQuestions = loadSavedData("questions");
    const savedAnswers = loadSavedData("answers");

    if (savedQuestions && savedQuestions.length === 34) {
      setQuestions(savedQuestions);
      if (savedAnswers) {
        setSelectedAnswers(savedAnswers);
      } else {
        setSelectedAnswers([]);
      }
    } else {
      loadNewQuestions();
    }

    // Load showScore from session storage
    setShowScore(loadShowScore());
  }, [bundesland, refreshKey]);

  const handleOptionSelect = (question, selectedOption) => {
    const newAnswer = processAnswer(question, selectedOption);
    const updatedAnswers = updateAnswerArray(selectedAnswers, newAnswer);
    setSelectedAnswers(updatedAnswers);
    saveDataToStorage(updatedAnswers, "answers");
  };

  const handleResetQuiz = () => {
    if (window.confirm("Are you sure you want to reset the quiz? All progress will be lost.")) {
      const storageKeyQuestions = getStorageKey("questions");
      const storageKeyAnswers = getStorageKey("answers");
      sessionStorage.removeItem(storageKeyQuestions);
      sessionStorage.removeItem(storageKeyAnswers);
      sessionStorage.removeItem(getShowScoreKey()); // Remove showScore from session storage
      setQuestions([]);
      setSelectedAnswers([]);
      setRefreshKey((prevKey) => prevKey + 1);
      setShowScore(false);
    }
  };

  const handleSubmitQuiz = () => {
    setShowScore(true);
    saveShowScore(true); // Save the showScore state to session storage
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;

    selectedAnswers.forEach((answer) => {
      if (answer.isCorrect) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const unattempted = 34 - (correct + incorrect);

    return { correct, incorrect, unattempted };
  };

  const getAnswerStatus = (question) => {
    const savedAnswer = selectedAnswers.find((ans) => ans.id === question.id);
    if (!savedAnswer) return "Unanswered";
    return savedAnswer.isCorrect ? "Correct" : "Incorrect";
  };

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const results = calculateResults();

  return (
    <div className="container mt-4">
      <h2 className="text-center">Quiz</h2>
      <p className="text-center">Selected State: {bundesland}</p>

      {!showScore ? (
        <QuestionSection
          questions={questions}
          selectedAnswers={selectedAnswers}
          handleOptionSelect={handleOptionSelect}
          handleSubmitQuiz={handleSubmitQuiz}
        />
      ) : (
        <ResultSection
          questions={questions}
          selectedAnswers={selectedAnswers}
          handleResetQuiz={handleResetQuiz}
          results={results}
          getAnswerStatus={getAnswerStatus}
        />
      )}
    </div>
  );
}

export default QuizPage;
