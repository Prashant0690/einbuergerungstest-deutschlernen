// src/data/content.js
import generalPart1 from "../data/Einbürgerungstest_General_Part1.json";
import generalPart2 from "../data/Einbürgerungstest_General_Part2.json";
import generalPart3 from "../data/Einbürgerungstest_General_Part3.json";
import BadenWuerttemberg from "../data/Bundesland/Einbürgerungstest_Baden-Wuerttemberg.json";
import Bayern from "../data/Bundesland/Einbürgerungstest_Bayern.json";
import Berlin from "../data/Bundesland/Einbürgerungstest_Berlin.json";
import Brandenburg from "../data/Bundesland/Einbürgerungstest_Brandenburg.json";
import Bremen from "../data/Bundesland/Einbürgerungstest_Bremen.json";
import Hamburg from "../data/Bundesland/Einbürgerungstest_Hamburg.json";
import Hessen from "../data/Bundesland/Einbürgerungstest_Hessen.json";
import MecklenburgVorpommern from "../data/Bundesland/Einbürgerungstest_Mecklenburg-Vorpommern.json";
import Niedersachsen from "../data/Bundesland/Einbürgerungstest_Niedersachsen.json";
import NordrheinWestfalen from "../data/Bundesland/Einbürgerungstest_Nordrhein-Westfalen.json";
import RheinlandPfalz from "../data/Bundesland/Einbürgerungstest_Rheinland-Pfalz.json";
import Saarland from "../data/Bundesland/Einbürgerungstest_Saarland.json";
import Sachsen from "../data/Bundesland/Einbürgerungstest_Sachsen.json";
import SachsenAnhalt from "../data/Bundesland/Einbürgerungstest_Sachsen-Anhalt.json";
import SchleswigHolstein from "../data/Bundesland/Einbürgerungstest_Schleswig-Holstein.json";
import Thueringen from "../data/Bundesland/Einbürgerungstest_Thueringen.json";

// List of states
export const statesList = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen"
];

export const loadGeneralQuestions = () => [
  ...generalPart1.questions,
  ...generalPart2.questions,
  ...generalPart3.questions,
];

export const loadStateQuestions = () => ({
  "Baden-Württemberg": BadenWuerttemberg.state.questions,
  Bayern: Bayern.state.questions,
  Berlin: Berlin.state.questions,
  Brandenburg: Brandenburg.state.questions,
  Bremen: Bremen.state.questions,
  Hamburg: Hamburg.state.questions,
  Hessen: Hessen.state.questions,
  "Mecklenburg-Vorpommern": MecklenburgVorpommern.state.questions,
  Niedersachsen: Niedersachsen.state.questions,
  "Nordrhein-Westfalen": NordrheinWestfalen.state.questions,
  "Rheinland-Pfalz": RheinlandPfalz.state.questions,
  Saarland: Saarland.state.questions,
  Sachsen: Sachsen.state.questions,
  "Sachsen-Anhalt": SachsenAnhalt.state.questions,
  "Schleswig-Holstein": SchleswigHolstein.state.questions,
  Thüringen: Thueringen.state.questions,
});


export const getEnglishStateName = (germanStateName) => {
  const stateNameMapping = {
    All: "General",
    "Baden-Württemberg": "BadenWuerttemberg",
    Bayern: "Bayern",
    Berlin: "Berlin",
    Brandenburg: "Brandenburg",
    Bremen: "Bremen",
    Hamburg: "Hamburg",
    Hessen: "Hessen",
    "Mecklenburg-Vorpommern": "MecklenburgVorpommern",
    Niedersachsen: "Niedersachsen",
    "Nordrhein-Westfalen": "NordrheinWestfalen",
    "Rheinland-Pfalz": "RheinlandPfalz",
    Saarland: "Saarland",
    Sachsen: "Sachsen",
    "Sachsen-Anhalt": "SachsenAnhalt",
    "Schleswig-Holstein": "SchleswigHolstein",
    Thüringen: "Thueringen",
  };

  return stateNameMapping[germanStateName] || null;
};