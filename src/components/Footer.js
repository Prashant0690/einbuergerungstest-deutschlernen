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
// Footer.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer({ language, toggleLanguage, onShowLegalNotice }) {
  const currentYear = new Date().getFullYear();
  const [expanded, setExpanded] = useState(false);

  return (
    <footer className="app-footer mt-5">
      <div className="container">
        <div className="footer-compact-row">
          <div className="footer-compact-text">
            <strong>Einbürgerungstest und Deutschlernen</strong>
            <span className="footer-dot-separator">•</span>
            <span className="footer-muted">
              {language === "en"
                ? "Educational purpose only. Verify official details with BAMF."
                : "Nur zu Lernzwecken. Offizielle Informationen mit BAMF abgleichen."}
            </span>
            <span className="footer-dot-separator">•</span>
            <small className="footer-copyright">© {currentYear} Prashant Tiwari</small>
          </div>

          <div className="footer-controls">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded
                ? language === "en"
                  ? "Less"
                  : "Weniger"
                : language === "en"
                ? "More info"
                : "Mehr Infos"}
            </button>
            <button className="btn btn-outline-light btn-sm" onClick={onShowLegalNotice}>
              {language === "en" ? "Legal Notice" : "Rechtlicher Hinweis"}
            </button>
            <select
              className="form-select form-select-sm footer-language-select"
              value={language}
              onChange={toggleLanguage}
              aria-label={language === "en" ? "Language selector" : "Sprachauswahl"}
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
            <div className="footer-social">
              <a
                href="https://github.com/Prashant0690/einbuergerungstest-deutschlernen"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/prashanttiwari-in/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="footer-expanded mt-3">
            <p className="footer-copy mb-2">
              {language === "en"
                ? "Practice faster using these direct sections:"
                : "Lerne schneller mit diesen direkten Bereichen:"}
            </p>
            <div className="footer-links">
              <Link to="/general-questions" className="footer-link-pill">
                {language === "en" ? "General Questions" : "Allgemeine Fragen"}
              </Link>
              <Link to="/state-questions" className="footer-link-pill">
                {language === "en" ? "State Questions" : "Bundesland Fragen"}
              </Link>
              <Link to="/quiz-selection" className="footer-link-pill">
                {language === "en" ? "Mock Exam" : "Probeprüfung"}
              </Link>
              <Link to="/learningPage" className="footer-link-pill">
                {language === "en" ? "Key Topics" : "Wichtige Themen"}
              </Link>
              <a
                href="https://www.bamf.de/DE/Startseite/startseite_node.html"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-pill"
              >
                BAMF
              </a>
            </div>
            <small className="footer-muted d-block mt-2">
              {language === "en"
                ? "Content and images are based on materials provided by BAMF."
                : "Inhalte und Bilder basieren auf Materialien von BAMF."}
            </small>
          </div>
        )}

      </div>
    </footer>
  );
}

export default Footer;