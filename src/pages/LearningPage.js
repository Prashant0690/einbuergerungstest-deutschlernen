import React, { useState } from "react";
import { Card } from "react-bootstrap";

// Importing the data
import historyData from "../data/notes/History.json";
import politicsData from "../data/notes/Politics.json";
import societyAndCultureData from "../data/notes/SocietyAndCulture.json";
import lawAndRightsData from "../data/notes/LawAndRights.json";
import geographyData from "../data/notes/Geography.json";
import economyData from "../data/notes/Economy.json";
import symbolsAndIdentityData from "../data/notes/SymbolsAndIdentity.json";

function LearningPage() {
  const [selectedSection, setSelectedSection] = useState("");

  const sections = {
    History: historyData,
    Politics: politicsData,
    "Society and Culture": societyAndCultureData,
    "Law and Rights": lawAndRightsData,
    Geography: geographyData,
    Economy: economyData,
    "Symbols and Identity": symbolsAndIdentityData,
  };

  const handleChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const renderContent = () => {
    if (!selectedSection) return <p>Please select a topic to learn about.</p>;

    const sectionData = sections[selectedSection];
    return (
      <div>
        <h3 className="mb-4">{sectionData.section}</h3>
        {sectionData.subSections.map((subSection, index) => (
          <Card key={index} className="mb-4">
            <Card.Body>
              <h4 className="mb-3">{subSection.title}</h4>
              <div className="language-section mb-4">
                <hr />
                <p>
                  <strong>German:</strong> {subSection.content.german}
                </p>
                <p>
                  <strong>English:</strong> {subSection.content.english}
                </p>
                <hr />
              </div>

              <h5 className="mt-4">Key Points</h5>
              <div className="row mt-3">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    {subSection.keyPoints.map((point, idx) => (
                      <li key={idx} className="mb-2">
                        <hr />
                        {point.german}
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    {subSection.keyPoints.map((point, idx) => (
                      <li key={idx} className="mb-2">
                        <hr />
                        {point.english}
                        <hr />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Learn About Key Topics</h2>
      <p className="lead text-center">
        Select a topic from the dropdown to learn more about the key concepts covered in the Einbürgerungstest.
      </p>

      <div className="row">
        <div className="col-md-4 mx-auto mb-4">
          <select className="form-select" onChange={handleChange}>
            <option value="">Select a Topic</option>
            {Object.keys(sections).map((sectionName, index) => (
              <option key={index} value={sectionName}>
                {sectionName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-10 mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

export default LearningPage;