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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { statesList } from "../data/content";
import { Navbar, Form, Container, Button } from "react-bootstrap";
import "./Header.css";

function Header() {
  const { bundesland, setBundesland } = useQuizContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleStateChange = (e) => {
    const state = e.target.value;
    setBundesland(state);
  };

  const handleEinbuergerungstestClick = () => {
    navigate("/");
  };

  const handleDeutschlernenClick = () => {
    navigate("/german-learning");
  };

  const isGermanLearningSection =
    location.pathname.startsWith("/german-") || location.pathname === "/deutsch-sprint";

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg" className="top-navbar">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="app-brand">
            <strong>Einbürgerungstest und Deutschlernen</strong>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="justify-content-center">
            <Button
              variant={!isGermanLearningSection ? "warning" : "outline-light"}
              className="me-2"
              onClick={handleEinbuergerungstestClick}
            >
              Citizenship Test
            </Button>
            <Button
              variant={isGermanLearningSection ? "warning" : "outline-light"}
              onClick={handleDeutschlernenClick}
            >
              German Learning
            </Button>

            <Form className="d-flex ms-auto">
              <Form.Select
                value={bundesland}
                onChange={handleStateChange}
                className="form-select state-select"
                style={{ maxWidth: "200px" }}
              >
                <option value="">Select a state...</option>
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {!isGermanLearningSection && (
        <ul className="nav justify-content-center bg-light py-3 section-nav">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/" ? "active-link" : ""
              }`}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/general-questions" ? "active-link" : ""
              }`}
              to="/general-questions"
            >
              General 300 Questions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/state-questions" ? "active-link" : ""
              } ${!bundesland ? "disabled-state-link" : ""}`}
              to={bundesland ? "/state-questions" : "#"}
              aria-disabled={!bundesland}
              onClick={(event) => {
                if (!bundesland) {
                  event.preventDefault();
                }
              }}
            >
              State Questions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/quiz-selection" ? "active-link" : ""
              }`}
              to="/quiz-selection"
            >
              Quiz
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/VocabularyPage" ? "active-link" : ""
              }`}
              to="/VocabularyPage"
            >
              Essential Vocabulary
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/learningPage" ? "active-link" : ""
              }`}
              to="/learningPage"
            >
              Key Topics Overview
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/einbuergerung-sprachsprint" ? "active-link" : ""
              }`}
              to="/einbuergerung-sprachsprint"
            >
              Einbürgerung SprachSprint
            </NavLink>
          </li>
        </ul>
      )}
      {isGermanLearningSection && (
        <ul className="nav justify-content-center bg-light py-3 section-nav">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/german-learning" ? "active-link" : ""
              }`}
              to="/german-learning"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
              location.pathname === "/german-flashcard-sprint" || location.pathname === "/deutsch-sprint"
                ? "active-link"
                : ""
              }`}
            to="/german-flashcard-sprint"
            >
              Conversational Flashcard Sprint
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/german-grammar" ? "active-link" : ""
              }`}
              to="/german-grammar"
            >
              Grammar Quick Reference
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/german-cases" ? "active-link" : ""
              }`}
              to="/german-cases"
            >
              Cases Master
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/german-cases-practice" ? "active-link" : ""
              }`}
              to="/german-cases-practice"
            >
              Cases Practice 400
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
