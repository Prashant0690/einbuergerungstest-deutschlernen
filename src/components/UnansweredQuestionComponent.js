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
import React, { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa'; // Import the speaker icon
import { getImageUrl } from '../utils/quizUtils'; // Utility function to construct image URL

function UnansweredQuestionComponent({ question, showDetails = false, setSelectedAnswer }) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedOptionIndex(index);
    const selectedGermanOption = question.options[index].germanOption;
    setSelectedAnswer(selectedGermanOption); // Pass the selected German option text to the parent
  };

  // Function to handle speech synthesis
  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE"; // Set language to German
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
              style={{ cursor: "pointer" }}
              size={34}
            />
          </div>
          {showDetails && question.englishQuestion && (
            <h3 className="text-muted">({question.englishQuestion})</h3>
          )}

          {/* Display the answer options */}
          <ul className="list-group mt-3">
            {question.options.map((option, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <input
                  type="radio"
                  name={`option-${question.id}`}
                  value={index}
                  checked={selectedOptionIndex === index}
                  onChange={() => handleOptionChange(index)}
                  disabled={selectedOptionIndex !== null} // Disable after selection
                  className="me-2"
                />
                <span className="me-2">{option.germanOption}</span>
                <FaVolumeUp
                  onClick={() => handleSpeak(option.germanOption)}
                  style={{ cursor: "pointer" }}
                />
                {showDetails && option.englishOption && (
                  <span className="text-muted ms-2">({option.englishOption})</span>
                )}
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
              alt="Answer related"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UnansweredQuestionComponent;