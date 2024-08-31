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
import React from 'react';
import { FaVolumeUp } from 'react-icons/fa'; // Import the speaker icon
import { getImageUrl } from '../utils/quizUtils'; // Utility function to construct image URL

function AnsweredQuestionComponent({ answerData }) {
  // Destructure the answerData object to get all necessary properties
  const { question, selectedGermanOption, correctAnswer, isCorrect } = answerData;

  if (!question || !selectedGermanOption || !correctAnswer) {
    return <p>No saved answer available for this question.</p>;
  }

  // Function to handle speech synthesis
  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE'; // Set language to German
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          {/* Display the question text */}
          <div className="d-flex align-items-center mb-3">
            <h2 className="me-3">{question.germanQuestion}</h2>
            <FaVolumeUp
              onClick={() => handleSpeak(question.germanQuestion)}
              style={{ cursor: 'pointer' }}
              size={30}
            />
          </div>
          {question.englishQuestion && (
            <h3 className="text-muted">({question.englishQuestion})</h3>
          )}

          {/* Display the answer options */}
          <ul className="list-group mt-3">
            {question.options.map((option, index) => (
              <li
                key={index}
                className={`list-group-item ${
                  selectedGermanOption === option.germanOption
                    ? isCorrect
                      ? 'list-group-item-success' // Green for correct selection
                      : 'list-group-item-danger' // Red for incorrect selection
                    : option.isCorrect
                    ? 'list-group-item-success' // Green for correct option
                    : ''
                }`}
              >
                <div className="d-flex align-items-center">
                  <span className="me-2">{option.germanOption}</span>
                  <FaVolumeUp
                    onClick={() => handleSpeak(option.germanOption)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                {option.englishOption && (
                  <span className="text-muted ms-2">({option.englishOption})</span>
                )}
                {selectedGermanOption === option.germanOption && (
                  <strong> - Your Selection</strong>
                )}
                {option.isCorrect && <strong> - Correct Answer</strong>}
              </li>
            ))}
          </ul>
        </div>

        {/* Display the image if the question has an answerType of 'image' */}
        {question.answerType === 'image' && (
          <div className="col-md-6">
            <img
              src={getImageUrl(question.region, question.id)}
              className="img-fluid"
              alt="Question related"
            />
          </div>
        )}
      </div>

      {/* Additional Details */}
      <div className="mt-4">
        {question.notes && (
          <p>
            <strong>Notes:</strong> {question.notes}
          </p>
        )}
        {question.learningTechniques && (
          <p>
            <strong>Learning Techniques:</strong> {question.learningTechniques}
          </p>
        )}
        {question.importantWords && (
          <div>
            <h6>Important Words:</h6>
            <ul>
              {question.importantWords.nouns?.map((word, index) => (
                <li key={index}>
                  <strong>{word.german}:</strong> {word.english}
                  <FaVolumeUp
                    onClick={() => handleSpeak(word.german)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </li>
              ))}
              {question.importantWords.verbs?.map((word, index) => (
                <li key={index}>
                  <strong>{word.german}:</strong> {word.english}
                  <FaVolumeUp
                    onClick={() => handleSpeak(word.german)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        {question.resources && (
          <div>
            <h6>Resources:</h6>
            <ul>
              {question.resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.description}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnsweredQuestionComponent;