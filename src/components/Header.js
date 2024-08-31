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
import { NavLink } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { statesList } from "../data/content";
import { Navbar, Nav, Form, FormControl, Container } from 'react-bootstrap';

function Header() {
  const { bundesland, setBundesland } = useQuizContext();

  const handleStateChange = (e) => {
    const state = e.target.value;
    setBundesland(state);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* App Name */}
        <Navbar.Brand as={NavLink} to="/" className="text-warning">
          Einbürgerungstest Quiz App
        </Navbar.Brand>

        {/* Toggler for small screens */}
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav" className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/VocabularyPage">
              Vocabulary
            </Nav.Link>
            <Nav.Link as={NavLink} to="/learningPage">
              Learn
            </Nav.Link>
            <Nav.Link as={NavLink} to="/quiz-selection">
              Quiz
            </Nav.Link>
            <Nav.Link as={NavLink} to="/general-questions">
              General Questions
            </Nav.Link>
            <Nav.Link as={NavLink} to="/state-questions" disabled={!bundesland}>
              State Questions
            </Nav.Link>
          </Nav>

          {/* State Selection Dropdown */}
          <Form className="d-flex">
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
  );
}

export default Header;