import React, { useState } from "react";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";

function LegalNoticeModal({ show, onAgree }) {
  const [language, setLanguage] = useState("de");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Modal show={show} onHide={onAgree} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>
          {language === "de" ? "Wichtige Informationen" : "Important Information"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <DropdownButton
            id="dropdown-language-selector"
            title={language === "de" ? "Deutsch" : "English"}
            onSelect={handleLanguageChange}
          >
            <Dropdown.Item eventKey="de">Deutsch</Dropdown.Item>
            <Dropdown.Item eventKey="en">English</Dropdown.Item>
          </DropdownButton>
        </div>

        {language === "de" && (
          <div>
            <p>
              <strong>Nur für Lernzwecke</strong>
            </p>
            <p>
              Diese Website wurde entwickelt, um Ihnen beim Lernen für den "Leben in Deutschland" und "Einbürgerungstest" zu helfen.
              Alle Inhalte und Bilder dienen ausschließlich Bildungszwecken. Die Materialien stammen aus den offiziellen Testmaterialien,
              wie sie im "Gesamtfragenkatalog zum Test Leben in Deutschland und zum Einbürgerungstest" (Stand: 25. Juni 2024) veröffentlicht wurden.
            </p>
            <p>
              Die Originalquelle ist die offizielle Website des Bundesamts für Migration und Flüchtlinge (BAMF):
              <a
                href="https://www.bamf.de/DE/Startseite/startseite_node.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.bamf.de/DE/Startseite/startseite_node.html
              </a>.
            </p>
            <p>
              Übersetzungen und Erklärungen wurden mit KI-Tools wie ChatGPT bereitgestellt.
              Obwohl wir uns um Genauigkeit bemühen, vergleichen Sie bitte mit offiziellen Quellen, um die Richtigkeit zu gewährleisten.
            </p>
            <p>
              Diese Seite ist nicht mit einer Regierungsbehörde verbunden, einschließlich der Bundesrepublik Deutschland oder der Europäischen Union.
              Wenn Sie glauben, dass Inhalte Ihre Rechte verletzen oder Ungenauigkeiten enthalten, kontaktieren Sie uns bitte,
              und wir werden das Problem umgehend beheben.
            </p>
            <p>
              Indem Sie diese Seite weiterhin nutzen, erkennen Sie an, dass die Inhalte nur zu Lernzwecken dienen und keine Rechtsberatung darstellen.
            </p>
          </div>
        )}

        {language === "en" && (
          <div>
            <p>
              <strong>For Learning Purposes Only</strong>
            </p>
            <p>
              This website is designed to assist you in studying for the "Leben in Deutschland" and "Einbürgerungstest".
              All content and images are intended solely for educational purposes. The materials have been sourced from the official test materials
              as published in the "Gesamtfragenkatalog zum Test Leben in Deutschland und zum Einbürgerungstest" (as of June 25, 2024).
            </p>
            <p>
              The original source is the official website of the Federal Office for Migration and Refugees (BAMF):
              <a
                href="https://www.bamf.de/DE/Startseite/startseite_node.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.bamf.de/DE/Startseite/startseite_node.html
              </a>.
            </p>
            <p>
              Translations and explanations have been provided using AI tools like ChatGPT.
              While we strive for accuracy, please cross-reference with official resources to ensure correctness.
            </p>
            <p>
              This site is not affiliated with any government body, including the Federal Republic of Germany or the European Union.
              If you believe any content infringes on your rights or contains inaccuracies, please contact us,
              and we will address the issue promptly.
            </p>
            <p>
              By continuing to use this site, you acknowledge that the content is for learning purposes only and does not constitute legal advice.
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onAgree}>
          {language === "de" ? "Ich Verstehe" : "I Understand"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LegalNoticeModal;