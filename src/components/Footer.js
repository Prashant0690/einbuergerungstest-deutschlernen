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