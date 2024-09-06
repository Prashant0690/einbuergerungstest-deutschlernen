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
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function CitizenshipTestHomePage() {
  return (
    <div className="container mt-4">
      {/* Main Title */}
      <h1 className="mb-4 text-center display-4">
        Welcome to the Einbürgerungstest Quiz App
      </h1>
      <p className="lead text-center">
        Test your knowledge about life in Germany! Prepare for the German
        citizenship test (Einbürgerungstest) with this comprehensive and
        interactive quiz app. Ideal for anyone looking to learn about German
        history, politics, culture, and more.
      </p>

      {/* Introduction Section */}
      <div className="text-center mt-5">
        <h2 className="mb-4">About the Einbürgerungstest</h2>
        <p>
          The Einbürgerungstest (German naturalization test) is a crucial step
          for those seeking German citizenship. It consists of 300 questions
          covering various topics, including history, politics, society, law,
          and geography. Preparing for this test will help you gain a deeper
          understanding of the rights, responsibilities, and culture associated
          with living in Germany.
        </p>
      </div>

      {/* List of main sections */}
      <div className="mt-5">
        <h2 className="text-center mb-4">Explore Key Topics</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">1. History</h4>
                <p className="card-text">
                  Learn about Germany's rich history, including its role in
                  European history, major events, and its place in the European
                  Union.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">2. Politics</h4>
                <p className="card-text">
                  Understand the structure and functions of the German
                  government, political parties, and constitutional law.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">3. Society and Culture</h4>
                <p className="card-text">
                  Dive into the social norms, values, cultural practices, and
                  demographics of Germany.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">4. Law and Rights</h4>
                <p className="card-text">
                  Focus on the fundamental rights of citizens, the judiciary
                  system, and labor laws in Germany.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">5. Geography</h4>
                <p className="card-text">
                  Explore Germany's federal states, major rivers, mountains, and
                  the country's place in European geography.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">6. Economy</h4>
                <p className="card-text">
                  Gain insights into Germany's economic system, key industries,
                  and the role of the European Union in trade.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mx-auto">
            <div className="card mb-3">
              <div className="card-body">
                <h4 className="card-title">7. Symbols and Identity</h4>
                <p className="card-text">
                  Learn about Germany's national symbols, including the flag and
                  anthem, as well as holidays and cultural celebrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links to Other Pages */}
      <div className="mt-5">
        <h2 className="text-center mb-4">Useful Links</h2>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/general-questions">General Questions</Link> - Practice
            the 300 general questions included in the Einbürgerungstest.
          </li>
          <li className="list-group-item">
            <Link to="/state-questions">State-Specific Questions</Link> - Focus
            on questions specific to your Bundesland.
          </li>
          <li className="list-group-item">
            <Link to="/quiz-selection">Quiz</Link> - Take a full 34-question
            quiz, including 30 general and 4 state-specific questions.
          </li>
          <li className="list-group-item">
            <Link to="/VocabularyPage">Vocabulary</Link> - Learn important words
            and phrases that are essential for understanding the
            Einbürgerungstest and daily life in Germany.
          </li>
          <li className="list-group-item">
            <Link to="/learningPage">Learning</Link> - Delve deeper into each
            section of the test, with detailed explanations and resources.
          </li>
        </ul>
      </div>

      {/* Footer Note */}
      <div className="mt-5 text-center">
        <p className="text-muted">
          This app is designed to help individuals prepare for the
          Einbürgerungstest. It is for educational purposes only and should not
          be relied upon for legal advice or official guidance. In the future,
          this app may be expanded to include useful notes and resources for
          learning German.
        </p>
      </div>
    </div>
  );
}

export default CitizenshipTestHomePage;
