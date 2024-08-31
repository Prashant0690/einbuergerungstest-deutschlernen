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

function Footer({ language, toggleLanguage, onShowLegalNotice }) {
  return (
    <footer className="bg-light py-3 mt-4">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">
          {language === "en"
            ? "This is a personal project created to help individuals study for the Einbürgerungstest. This site is for informational purposes only and cannot be used for legal purposes."
            : "Dies ist ein persönliches Projekt, das erstellt wurde, um Einzelpersonen beim Studium für den Einbürgerungstest zu helfen. Diese Website dient nur zu Informationszwecken und kann nicht für rechtliche Zwecke verwendet werden."}
        </p>
        <div className="d-flex align-items-center">
          <button className="btn btn-link" onClick={onShowLegalNotice}>
            Legal Notice
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
    </footer>
  );
}

export default Footer;