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
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer({ language, toggleLanguage, onShowLegalNotice }) {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-light py-3 mt-4">
      <div className="container">
        <div className="row">
          {/* Project Information */}
          <div className="col-md-6 d-flex flex-column">
            <p className="mb-0">
              {language === "en"
                ? "This is a personal project created to help individuals study for the Einbürgerungstest. This site is for informational purposes only and cannot be used for legal purposes."
                : "Dies ist ein persönliches Projekt, das erstellt wurde, um Einzelpersonen beim Studium für den Einbürgerungstest zu helfen. Diese Website dient nur zu Informationszwecken und kann nicht für rechtliche Zwecke verwendet werden."}
            </p>
            <small className="text-muted">
              {language === "en"
                ? `Content and images are based on materials provided by BAMF.`
                : `Inhalte und Bilder basieren auf Materialien, die von BAMF bereitgestellt wurden.`}
            </small>
          </div>

          {/* Notice and Language Selection */}
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <button className="btn btn-link" onClick={onShowLegalNotice}>
              {language === "en" ? "Notice" : "Hinweis"}
            </button>
            <select
              className="form-select form-select-sm ms-3"
              value={language}
              onChange={toggleLanguage}
              style={{ width: "150px" }}
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {/* Social Links and Date */}
        <div className="row mt-3">
          <div className="col-md-12 d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">
                {language === "en"
                  ? `© ${currentYear} Prashant Tiwari`
                  : `© ${currentYear} Prashant Tiwari`}
              </small>
            </div>
            <div>
              <a
                href="https://github.com/Prashant0690/einbuergerungstest-deutschlernen"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-dark"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/prashanttiwari-in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;