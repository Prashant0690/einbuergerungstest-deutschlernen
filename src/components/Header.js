import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { statesList } from "../data/content";
import { Navbar, Form, Container, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css";

const citizenshipLinks = [
  ["/learningPage", "Knowledge library"],
  ["/general-questions", "General question bank"],
  ["/state-questions", "State questions", true],
  ["/quiz-selection", "Exam simulation"],
  ["/VocabularyPage", "Citizenship vocabulary"],
  ["/einbuergerung-sprachsprint", "Question sprint"],
];
const germanLinks = [
  ["/everyday-german", "Everyday German"],
  ["/german-grammar", "Grammar essentials"],
  ["/german-cases", "German cases"],
  ["/german-modal-verbs", "Modal verbs"],
  ["/german-wh-questions", "Question words"],
  ["/german-cases-practice", "Cases practice · 400"],
];

function Header() {
  const { bundesland, setBundesland } = useQuizContext();
  const { pathname } = useLocation();
  const renderItems = (items) => items.map(([path, label, needsState]) => {
    const disabled = needsState && !bundesland;
    return <NavDropdown.Item key={path} as={NavLink} to={disabled ? "#" : path} disabled={disabled} onClick={(event) => disabled && event.preventDefault()}>{label}{needsState && !bundesland ? " · choose a state first" : ""}</NavDropdown.Item>;
  });

  return (
    <header className="app-header">
      <Navbar expand="lg" className="top-navbar">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="app-brand">
            <span className="brand-mark" aria-hidden="true">L</span>
            <span className="brand-copy"><span className="brand-kicker">Study companion</span><strong>Life in Germany</strong></span>
          </Navbar.Brand>
          <div className="header-controls">
            <Form.Select aria-label="Choose your federal state" value={bundesland} onChange={(event) => setBundesland(event.target.value)} className="state-select">
              <option value="">Choose Bundesland</option>{statesList.map((state) => <option key={state} value={state}>{state}</option>)}
            </Form.Select>
            <Navbar.Toggle aria-controls="site-navigation"><span className="menu-label">Menu</span></Navbar.Toggle>
          </div>
          <Navbar.Collapse id="site-navigation">
            <Nav className="primary-nav ms-lg-auto">
              <Nav.Link as={NavLink} end to="/">Overview</Nav.Link>
              <NavDropdown title="Citizenship test" id="citizenship-menu" active={pathname === "/citizenship-prep" || citizenshipLinks.some(([path]) => pathname === path)}>{renderItems(citizenshipLinks)}</NavDropdown>
              <NavDropdown title="German learning" id="german-menu" active={pathname === "/german-learning" || germanLinks.some(([path]) => pathname === path || pathname === "/deutsch-sprint")}>{renderItems(germanLinks)}</NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
