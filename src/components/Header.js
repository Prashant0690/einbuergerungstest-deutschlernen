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
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { statesList } from "../data/content";
import { Navbar, Form, FormControl, Container, Button } from "react-bootstrap";
import "./Header.css";

function Header() {
  const { bundesland, setBundesland } = useQuizContext();
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize useNavigate

  // State to manage the current section
  const [currentSection, setCurrentSection] = useState("Citizenship Test"); // Default to "Citizenship Test"

  // Function to handle state change (Bundesland selection)
  const handleStateChange = (e) => {
    const state = e.target.value;
    setBundesland(state);
  };

  // Function to handle "Citizenship Test" button click
  const handleEinbuergerungstestClick = () => {
    setCurrentSection("Citizenship Test");
    console.log("Citizenship Test button clicked");
    navigate("/"); // Redirect to Citizenship Test HomePage
  };

  // Function to handle "German Learning" button click
  const handleDeutschlernenClick = () => {
    setCurrentSection("German Learning");
    console.log("German Learning button clicked");
    navigate("/german-learning"); // Redirect to German Learning HomePage
  };

  // Helper methods to check the current section
  const isCitizenshipTest = () => currentSection === "Citizenship Test";
  const isGermanLearning = () => currentSection === "German Learning";

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          {/* App Name */}
          <Navbar.Brand as={NavLink} to="/">
            <strong>Einbürgerungstest und Deutschlernen</strong>
          </Navbar.Brand>

          {/* Toggler for small screens */}
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="justify-content-center">
            {/* Buttons for Citizenship Test and German Learning */}
            <Button
              variant={isCitizenshipTest() ? "light" : "outline-light"} // Highlight if selected
              className="me-2"
              onClick={handleEinbuergerungstestClick}
            >
              Citizenship Test
            </Button>
            <Button
              variant={isGermanLearning() ? "light" : "outline-light"} // Highlight if selected
              onClick={handleDeutschlernenClick}
            >
              German Learning
            </Button>
            {/* State Selection Dropdown */}
            <Form className="d-flex ms-auto">
              <FormControl
                as="select"
                value={bundesland}
                onChange={handleStateChange}
                className="form-select"
                style={{ maxWidth: "200px" }}
              >
                <option value="">Select a state...</option>
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </FormControl>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Additional Navigation Links based on the current section */}
      {isCitizenshipTest() && (
        <ul className="nav justify-content-center bg-light py-3">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/" ? "active-link" : ""
              }`}
              to="/"
              exact
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
              }`}
              to="/state-questions"
              disabled={!bundesland}
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
      {isGermanLearning() && (
        <ul className="nav justify-content-center bg-light py-3">
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/" ? "active-link" : ""
              }`}
              to="/german-learning"
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={`nav-link ${
                location.pathname === "/deutsch-sprint" ? "active-link" : ""
              }`}
              to="/deutsch-sprint"
              exact
            >
              deutschlearnen SprachSprint
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
