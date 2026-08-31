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
import { Navbar, Form, Container, Button, Nav } from "react-bootstrap";
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

  const citizenshipLinks = [
    { to: "/", label: "Home" },
    { to: "/general-questions", label: "General 300 Questions" },
    { to: "/state-questions", label: "State Questions", requiresState: true },
    { to: "/quiz-selection", label: "Exam Simulation" },
    { to: "/VocabularyPage", label: "Essential Vocabulary" },
    { to: "/learningPage", label: "Key Topics Overview" },
    { to: "/einbuergerung-sprachsprint", label: "Einbürgerung SprachSprint" },
  ];

  const germanLinks = [
    { to: "/german-learning", label: "Home" },
    { to: "/german-flashcard-sprint", label: "Conversational Flashcard Sprint" },
    { to: "/german-grammar", label: "Grammar Quick Reference" },
    { to: "/german-cases", label: "Cases Master" },
    { to: "/german-modal-verbs", label: "Modal Verbs Master" },
    { to: "/german-wh-questions", label: "WH Questions Master" },
    { to: "/german-cases-practice", label: "Cases Practice 400" },
  ];

  const activeLinks = isGermanLearningSection ? germanLinks : citizenshipLinks;

  return (
    <header className="app-header">
      <Navbar expand="lg" className="top-navbar">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="app-brand d-flex flex-column">
            <span className="brand-kicker">Study Companion</span>
            <strong>Einbürgerungstest & Deutschlernen</strong>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="align-items-center">
            <div className="mode-switch mx-lg-auto">
              <Button
                variant={!isGermanLearningSection ? "primary" : "outline-primary"}
                className="mode-switch-btn"
                onClick={handleEinbuergerungstestClick}
              >
                Citizenship Prep
              </Button>
              <Button
                variant={isGermanLearningSection ? "primary" : "outline-primary"}
                className="mode-switch-btn"
                onClick={handleDeutschlernenClick}
              >
                German Learning & Support
              </Button>
            </div>

            <Form className="d-flex ms-lg-auto state-select-wrap">
              <Form.Select
                value={bundesland}
                onChange={handleStateChange}
                className="form-select state-select"
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

      <nav className="section-nav">
        <Container>
          <Nav className="section-nav-links">
            {activeLinks.map((link) => (
              <NavLink
                key={link.to}
                className={`nav-link ${
                  (link.to === "/german-flashcard-sprint" &&
                    (location.pathname === "/german-flashcard-sprint" || location.pathname === "/deutsch-sprint")) ||
                  location.pathname === link.to
                    ? "active-link"
                    : ""
                } ${link.requiresState && !bundesland ? "disabled-state-link" : ""}`}
                to={link.requiresState && !bundesland ? "#" : link.to}
                aria-disabled={Boolean(link.requiresState && !bundesland)}
                onClick={(event) => {
                  if (link.requiresState && !bundesland) {
                    event.preventDefault();
                  }
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </Nav>
        </Container>
      </nav>
    </header>
  );
}

export default Header;
