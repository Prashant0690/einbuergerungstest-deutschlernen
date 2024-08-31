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