import React, { useState } from "react";
import { Accordion, Button, Card, Col, Form, Nav, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GermanRoleLegend from "../components/GermanRoleLegend";
import "./GermanCasesMasterPage.css";

const cases = [
  { id: "nom", short: "Nom", name: "Nominativ (Subject)", question: "Wer oder was?", role: "who acts?", example: "Die Nachbarin kocht heute.", color: "nom" },
  { id: "acc", short: "Acc", name: "Akkusativ (Direct object)", question: "Wen oder was?", role: "what is affected?", example: "Wir besuchen den neuen Markt.", color: "acc" },
  { id: "dat", short: "Dat", name: "Dativ (Indirect object)", question: "Wem?", role: "to or for whom?", example: "Der Arzt erklärt der Patientin den Plan.", color: "dat" },
  { id: "gen", short: "Gen", name: "Genitiv (Possession)", question: "Wessen?", role: "whose?", example: "Die Farbe des Hauses ist warm.", color: "gen" },
];

const articleCharts = {
  definite: {
    title: "Definite articles",
    subtitle: "der / die / das - a specific noun",
    rows: [["Nom", "der", "die", "das", "die"], ["Acc", "den", "die", "das", "die"], ["Dat", "dem", "der", "dem", "den"], ["Gen", "des", "der", "des", "der"]],
  },
  indefinite: {
    title: "Indefinite articles",
    subtitle: "ein / eine - one or an unspecified noun",
    rows: [["Nom", "ein", "eine", "ein", "-"], ["Acc", "einen", "eine", "ein", "-"], ["Dat", "einem", "einer", "einem", "-"], ["Gen", "eines", "einer", "eines", "-"]],
  },
  negative: {
    title: "Negative articles",
    subtitle: "kein / keine - no or not any",
    rows: [["Nom", "kein", "keine", "kein", "keine"], ["Acc", "keinen", "keine", "kein", "keine"], ["Dat", "keinem", "keiner", "keinem", "keinen"], ["Gen", "keines", "keiner", "keines", "keiner"]],
  },
};

const articleChartNotes = {
  definite: { rule: "Use this when both people know which noun you mean.", german: "Ich sehe den Mann.", english: "I see the man." },
  indefinite: { rule: "Use this when you introduce one non-specific noun.", german: "Ich sehe einen Mann.", english: "I see a man." },
  negative: { rule: "Kein declines like ein and means no / not any.", german: "Ich sehe keinen Mann.", english: "I see no man." },
};

const prepositions = {
  acc: [
    ["durch", "through / via", "durch den Park"],
    ["ohne", "without", "ohne meinen Hund"],
    ["gegen", "against / around", "gegen einen Baum"],
    ["für", "for", "für meine Mutter"],
    ["um", "around / at a time", "um die Ecke"],
    ["bis", "until / as far as", "bis nächsten Freitag"],
  ],
  dat: [
    ["aus", "out of / from", "aus der Schweiz"],
    ["bei", "at / with / near", "bei ihren Eltern"],
    ["mit", "with / by transport", "mit dem Zug"],
    ["nach", "after / to a city", "nach der Schule"],
    ["seit", "since / for a duration", "seit einem Jahr"],
    ["von", "from / of", "von meinem Vater"],
    ["zu", "to a person/place", "zu dem Arzt"],
    ["gegenüber", "opposite / across from", "dem Bahnhof gegenüber"],
  ],
};

const twoWay = [
  ["an", "at / on vertical", "an die Wand", "an der Wand"],
  ["auf", "on horizontal", "auf den Tisch", "auf dem Tisch"],
  ["hinter", "behind", "hinter das Haus", "hinter dem Haus"],
  ["in", "in / into", "in das Kino", "in dem Kino"],
  ["neben", "next to", "neben mich", "neben mir"],
  ["über", "over / above", "über den Tisch", "über dem Tisch"],
  ["unter", "under", "unter den Tisch", "unter dem Tisch"],
  ["vor", "in front of", "vor die Tür", "vor der Tür"],
  ["zwischen", "between", "zwischen die Stühle", "zwischen den Stühlen"],
];

const possessives = [
  ["mein-", "mein", "meine", "mein", "meine"],
  ["dein-", "dein", "deine", "dein", "deine"],
  ["sein-", "sein", "seine", "sein", "seine"],
  ["ihr- / Ihr-", "ihr", "ihre", "ihr", "ihre"],
  ["unser-", "unser", "unsere", "unser", "unsere"],
  ["euer-", "euer", "eure", "euer", "eure"],
];

// Personal pronouns change with their role in the sentence. Possessive bases
// are included here as a bridge to the detailed possessive charts below.
const personalPronouns = [
  ["I", "ich", "mich", "mir", "mein-", "Ich sehe mich im Spiegel.", "I see myself in the mirror."],
  ["you (informal, singular)", "du", "dich", "dir", "dein-", "Ich helfe dir.", "I help you."],
  ["he", "er", "ihn", "ihm", "sein-", "Sie besucht ihn.", "She visits him."],
  ["she", "sie", "sie", "ihr", "ihr-", "Er gibt ihr das Buch.", "He gives her the book."],
  ["it (neuter)", "es", "es", "ihm", "sein-", "Das Kind ist müde. Wir helfen ihm.", "The child is tired. We help them."],
  ["we", "wir", "uns", "uns", "unser-", "Sie sieht uns.", "She sees us."],
  ["you (informal, plural)", "ihr", "euch", "euch", "euer-", "Ich besuche euch.", "I am visiting you all."],
  ["they", "sie", "sie", "ihnen", "ihr-", "Er schreibt ihnen.", "He writes to them."],
  ["you (formal)", "Sie", "Sie", "Ihnen", "Ihr-", "Ich danke Ihnen.", "I thank you (formal)."],
];

const personalPronounQuizQuestions = [
  { prompt: "I am learning German.", sentence: "___ lerne Deutsch.", answer: "Ich", choices: ["Ich", "Mich", "Mir", "Mein"], note: "Ich is the subject doing the action, so it takes Nominativ.", complete: "Ich lerne Deutsch." },
  { prompt: "I see myself in the mirror.", sentence: "Ich sehe ___ im Spiegel.", answer: "mich", choices: ["ich", "mich", "mir", "mein"], note: "Sehen takes a direct object (Wen sehe ich?), so use Akkusativ: mich.", complete: "Ich sehe mich im Spiegel." },
  { prompt: "I help you. (informal, singular)", sentence: "Ich helfe ___.", answer: "dir", choices: ["du", "dich", "dir", "dein"], note: "Helfen takes a Dativ object (Wem helfe ich?), so use dir.", complete: "Ich helfe dir." },
  { prompt: "She visits him.", sentence: "Sie besucht ___.", answer: "ihn", choices: ["er", "ihn", "ihm", "sein"], note: "Besuchen takes a direct object (Wen besucht sie?), so use Akkusativ: ihn.", complete: "Sie besucht ihn." },
  { prompt: "He gives her the book.", sentence: "Er gibt ___ das Buch.", answer: "ihr", choices: ["sie", "ihr", "ihre", "ihnen"], note: "The person receiving the book answers Wem? and takes Dativ: ihr.", complete: "Er gibt ihr das Buch." },
  { prompt: "The child is tired. We help them.", sentence: "Das Kind ist müde. Wir helfen ___.", answer: "ihm", choices: ["es", "ihn", "ihm", "sein"], note: "Das Kind is neuter. Helfen takes Dativ, where neuter es becomes ihm.", complete: "Das Kind ist müde. Wir helfen ihm." },
  { prompt: "She sees us.", sentence: "Sie sieht ___.", answer: "uns", choices: ["wir", "uns", "unser", "ihnen"], note: "We are the direct object (Wen sieht sie?), so use Akkusativ: uns.", complete: "Sie sieht uns." },
  { prompt: "I am visiting you all. (informal, plural)", sentence: "Ich besuche ___.", answer: "euch", choices: ["ihr", "euch", "euer", "ihnen"], note: "You all are the direct object (Wen besuche ich?), so use Akkusativ: euch.", complete: "Ich besuche euch." },
  { prompt: "He writes to them.", sentence: "Er schreibt ___.", answer: "ihnen", choices: ["sie", "ihnen", "ihr", "ihrer"], note: "The people receiving the message answer Wem? and take Dativ: ihnen.", complete: "Er schreibt ihnen." },
  { prompt: "I thank you. (formal)", sentence: "Ich danke ___.", answer: "Ihnen", choices: ["Sie", "Ihnen", "Ihr", "Ihrer"], note: "Danken takes Dativ. Formal you is Ihnen and keeps its capital I.", complete: "Ich danke Ihnen." },
];

const possessiveEndings = [
  ["Nom", "—", "-e", "—", "-e"],
  ["Acc", "-en", "-e", "—", "-e"],
  ["Dat", "-em", "-er", "-em", "-en"],
  ["Gen", "-es", "-er", "-es", "-er"],
];

const possessiveLookup = [
  ["mein-", "Nom", "mein", "meine", "mein", "meine"], ["mein-", "Acc", "meinen", "meine", "mein", "meine"], ["mein-", "Dat", "meinem", "meiner", "meinem", "meinen"], ["mein-", "Gen", "meines", "meiner", "meines", "meiner"],
  ["dein-", "Nom", "dein", "deine", "dein", "deine"], ["dein-", "Acc", "deinen", "deine", "dein", "deine"], ["dein-", "Dat", "deinem", "deiner", "deinem", "deinen"], ["dein-", "Gen", "deines", "deiner", "deines", "deiner"],
  ["sein-", "Nom", "sein", "seine", "sein", "seine"], ["sein-", "Acc", "seinen", "seine", "sein", "seine"], ["sein-", "Dat", "seinem", "seiner", "seinem", "seinen"], ["sein-", "Gen", "seines", "seiner", "seines", "seiner"],
  ["ihr- / Ihr-", "Nom", "ihr", "ihre", "ihr", "ihre"], ["ihr- / Ihr-", "Acc", "ihren", "ihre", "ihr", "ihre"], ["ihr- / Ihr-", "Dat", "ihrem", "ihrer", "ihrem", "ihren"], ["ihr- / Ihr-", "Gen", "ihres", "ihrer", "ihres", "ihrer"],
  ["unser-", "Nom", "unser", "unsere", "unser", "unsere"], ["unser-", "Acc", "unseren", "unsere", "unser", "unsere"], ["unser-", "Dat", "unserem", "unserer", "unserem", "unseren"], ["unser-", "Gen", "unseres", "unserer", "unseres", "unserer"],
  ["euer-", "Nom", "euer", "eure", "euer", "eure"], ["euer-", "Acc", "euren", "eure", "euer", "eure"], ["euer-", "Dat", "eurem", "eurer", "eurem", "euren"], ["euer-", "Gen", "eures", "eurer", "eures", "eurer"],
];

const possessiveMasterGroups = ["mein-", "dein-", "sein-", "ihr- / Ihr-", "unser-", "euer-"].map((stem) => ({
  stem,
  rows: possessiveLookup.filter((row) => row[0] === stem).map((row) => row.slice(1)),
}));
possessiveMasterGroups.splice(4, 0, {
  stem: "Ihr- (formal)",
  rows: possessiveLookup.filter((row) => row[0] === "ihr- / Ihr-").map((row) => row.slice(1).map((cell, index) => index > 0 ? `${cell[0].toUpperCase()}${cell.slice(1)}` : cell)),
});

const articleTypeOptions = [
  { value: "all", label: "All" },
  { value: "definite", label: "Definite" },
  { value: "indefinite", label: "Indefinite" },
  { value: "negative", label: "Negative" },
];

const possessivePronounOptions = [
  { value: "all", label: "All" },
  { value: "mein-", label: "mein" },
  { value: "dein-", label: "dein" },
  { value: "sein-", label: "sein" },
  { value: "ihr- / Ihr-", label: "ihr" },
  { value: "unser-", label: "unser" },
  { value: "euer-", label: "euer" },
  { value: "Ihr", label: "Ihr (formal)" },
];

const adjectiveCharts = [
  {
    id: "strong",
    title: "1. No article",
    rule: "The adjective carries the strong ending because there is no article to show it.",
    rows: [["Nom", "-er", "-e", "-es", "-e"], ["Acc", "-en", "-e", "-es", "-e"], ["Dat", "-em", "-er", "-em", "-en"], ["Gen", "-en", "-er", "-en", "-er"]],
  },
  {
    id: "mixed",
    title: "2. Indefinite article",
    rule: "After ein, kein, or a possessive, the adjective adds the missing case information.",
    rows: [["Nom", "-er", "-e", "-es", "-en"], ["Acc", "-en", "-e", "-es", "-en"], ["Dat", "-en", "-en", "-en", "-en"], ["Gen", "-en", "-en", "-en", "-en"]],
  },
  {
    id: "definite",
    title: "3. Definite article",
    rule: "The article usually shows the case; the adjective is commonly -en after a changed article or in plural.",
    rows: [["Nom", "-e", "-e", "-e", "-en"], ["Acc", "-en", "-e", "-e", "-en"], ["Dat", "-en", "-en", "-en", "-en"], ["Gen", "-en", "-en", "-en", "-en"]],
  },
];

const caseQuizGenders = [
  { id: "masculine", label: "masculine", column: 1 },
  { id: "feminine", label: "feminine", column: 2 },
  { id: "neuter", label: "neuter", column: 3 },
  { id: "plural", label: "plural", column: 4 },
];
const caseQuizPossessives = [...possessives.map(([stem]) => stem), "Ihr (formal)"];
const caseQuizQuestions = cases.flatMap((caseItem) => caseQuizGenders.flatMap((gender) => adjectiveCharts.flatMap((adjective) => ["definite", "indefinite", "negative"].flatMap((articleType) => caseQuizPossessives.map((possessive) => ({
  caseId: caseItem.id,
  genderId: gender.id,
  adjectiveType: adjective.id,
  articleType,
  possessive,
}))))));
const prepositionQuizQuestions = [
  ...prepositions.acc.map(([word, meaning, example]) => ({ word, meaning, answer: "acc", examples: [example] })),
  ...prepositions.dat.map(([word, meaning, example]) => ({ word, meaning, answer: "dat", examples: [example] })),
  ...twoWay.map(([word, meaning, accusativeExample, dativeExample]) => ({ word, meaning, answer: "two-way", examples: [`Wohin? ${accusativeExample}`, `Wo? ${dativeExample}`] })),
];

function shuffleItems(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function makePronounQuizRound() {
  return shuffleItems(personalPronounQuizQuestions).map((question) => ({
    ...question,
    choices: shuffleItems(question.choices),
  }));
}

// Curated, natural examples replace the old combinatorial generator: case
// practice should teach useful language, not merely produce grammatical strings.
const practiceSentences = [
  { id: "nom-1", complexity: "simple", english: ["The train", "arrives", "at eight."], german: ["Der Zug", "kommt", "um acht Uhr an."], roles: ["case-nom", "case-verb", "case-acc"], rule: "Der Zug is the subject (Nominativ). The time phrase um acht Uhr uses Akkusativ after um; the separable verb ankommen wraps around it." },
  { id: "nom-2", complexity: "simple", english: ["My sister", "works", "in Berlin."], german: ["Meine Schwester", "arbeitet", "in Berlin."], roles: ["case-nom", "case-verb", "case-dat"], rule: "Meine Schwester is the subject (Nominativ). In Berlin answers Wo? and takes Dativ." },
  { id: "acc-1", complexity: "simple", english: ["I", "am reading", "the newspaper."], german: ["Ich", "lese", "die Zeitung."], roles: ["case-nom", "case-verb", "case-acc"], rule: "Ich is Nominativ; die Zeitung is the direct object (Akkusativ), answering Wen oder was lese ich?" },
  { id: "acc-2", complexity: "simple", english: ["We", "need", "a new table."], german: ["Wir", "brauchen", "einen neuen Tisch."], roles: ["case-nom", "case-verb", "case-acc"], rule: "Tisch is masculine, so the Akkusativ article changes from ein to einen; the adjective takes -en." },
  { id: "dat-1", complexity: "simple", english: ["He", "is helping", "his neighbor."], german: ["Er", "hilft", "seinem Nachbarn."], roles: ["case-nom", "case-verb", "case-dat"], rule: "Helfen governs Dativ: seinem Nachbarn answers Wem hilft er? Nachbar also takes the n-declension ending." },
  { id: "dat-2", complexity: "simple", english: ["The children", "are playing", "in the garden."], german: ["Die Kinder", "spielen", "im Garten."], roles: ["case-nom", "case-verb", "case-dat"], rule: "Im means in dem. The sentence describes location (Wo?), so the two-way preposition in takes Dativ." },
  { id: "mix-1", complexity: "intermediate", english: ["The teacher", "explains", "the exercise", "to the class."], german: ["Die Lehrerin", "erklärt", "der Klasse", "die Aufgabe."], roles: ["case-nom", "case-verb", "case-dat", "case-acc"], rule: "Die Lehrerin is Nominativ; der Klasse is the Dativ recipient; die Aufgabe is the Akkusativ thing explained." },
  { id: "mix-2", complexity: "intermediate", english: ["I", "am sending", "my friend", "a photo."], german: ["Ich", "schicke", "meinem Freund", "ein Foto."], roles: ["case-nom", "case-verb", "case-dat", "case-acc"], rule: "The recipient meinem Freund is Dativ; ein Foto is the direct object (Akkusativ, neuter form unchanged)." },
  { id: "mix-3", complexity: "intermediate", english: ["She", "buys", "her son", "a warm jacket."], german: ["Sie", "kauft", "ihrem Sohn", "eine warme Jacke."], roles: ["case-nom", "case-verb", "case-dat", "case-acc"], rule: "Ihrem Sohn is the Dativ recipient; eine warme Jacke is the feminine Akkusativ direct object." },
  { id: "mix-4", complexity: "intermediate", english: ["The waiter", "brings", "the guests", "the menu."], german: ["Der Kellner", "bringt", "den Gästen", "die Speisekarte."], roles: ["case-nom", "case-verb", "case-dat", "case-acc"], rule: "Den Gästen is plural Dativ (article den and noun ending -n); die Speisekarte is Akkusativ." },
  { id: "gen-1", complexity: "advanced", english: ["The roof", "of the house", "needs", "repair."], german: ["Das Dach", "des Hauses", "muss", "repariert werden."], roles: ["case-nom", "case-gen", "case-verb", "case-verb"], rule: "Des Hauses is Genitiv and answers Wessen Dach? In the modal passive, muss is in position two and the verb phrase goes to the end." },
  { id: "gen-2", complexity: "advanced", english: ["The advice", "of the doctor", "was", "helpful."], german: ["Der Rat", "des Arztes", "war", "hilfreich."], roles: ["case-nom", "case-gen", "case-verb", "case-other"], rule: "Des Arztes is Genitiv possession. Der Rat is the Nominativ subject; war is the past form of sein, and hilfreich is a predicate adjective (not an object)." },
  { id: "gen-3", complexity: "advanced", english: ["Despite", "the bad weather", ", we", "went for a walk."], german: ["Trotz", "des schlechten Wetters", "gingen wir", "spazieren."], roles: ["case-gen", "case-gen", "case-verb", "case-verb"], rule: "Standard written German uses Genitiv after trotz: des schlechten Wetters. In the main clause, gingen occupies position two." },
  { id: "gen-4", complexity: "advanced", english: ["During", "the long journey", ", they", "read a book."], german: ["Während", "der langen Reise", "lasen sie", "ein Buch."], roles: ["case-gen", "case-gen", "case-verb", "case-acc"], rule: "Während takes Genitiv in formal standard usage: der langen Reise. Ein Buch is the Akkusativ object of lesen." },
];

function CaseTable({ rows, headers, className = "" }) {
  return (
    <div className="table-responsive">
      <Table bordered hover className={`cases-table ${className}`}>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => <tr key={`${row[0]}-${row[1]}-${rowIndex}`}>{row.map((cell, index) => <td key={`${row[0]}-${rowIndex}-${index}`}>{cell}</td>)}</tr>)}
        </tbody>
      </Table>
    </div>
  );
}

function ColourSentence({ sentence, showAnswer }) {
  const colours = sentence.roles || (sentence.complexity === "simple"
    ? ["case-nom", "case-verb", "case-acc"]
    : sentence.complexity === "intermediate"
      ? ["case-nom", "case-verb", "case-dat", "case-acc"]
      : ["case-nom", "case-verb", "case-dat", "case-acc", "case-gen"]);

  return (
    <Card className="practice-sentence">
      <Card.Body>
        <p className="practice-prompt"><span className="practice-number">{sentence.id.replace(/\D/g, "")}</span><span className="practice-language practice-english">{sentence.english.join(" ").replace(/\s+([,.!?])/g, "$1")}</span></p>
        {showAnswer ? (
          <div className="practice-answer">
            <p className="practice-language">{renderSentenceTokens(sentence.german, colours, "de")}</p>
            <p className="mb-0"><strong>Teacher’s note:</strong> {sentence.rule || sentence.rules}</p>
          </div>
        ) : (
          <details className="practice-reveal">
            <summary>German answer + teacher’s note</summary>
            <p className="practice-language mt-3">{renderSentenceTokens(sentence.german, colours, "de")}</p>
            <p className="mb-0"><strong>Teacher’s note:</strong> {sentence.rule || sentence.rules}</p>
          </details>
        )}
      </Card.Body>
    </Card>
  );
}

function renderSentenceTokens(parts, colours, language) {
  return parts.map((part, index) => (
    <span className={`sentence-token ${colours[index]}`} key={`${language}-${index}`}>
      {part.split(/(\[[^\]]+\])/).map((segment, segmentIndex) =>
        segment.startsWith("[") && segment.endsWith("]")
          ? <span className="sentence-adjective" key={`${language}-${index}-${segmentIndex}`}>{segment.slice(1, -1)}</span>
          : segment
      )}
    </span>
  ));
}

function GermanCasesMasterPage() {
  const [visibleSentenceCount, setVisibleSentenceCount] = useState(10);
  const [activeComplexity, setActiveComplexity] = useState("simple");
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [lookupCase, setLookupCase] = useState("");
  const [lookupGender, setLookupGender] = useState("");
  const [adjectiveType, setAdjectiveType] = useState("definite");
  const [articleTypeFilter, setArticleTypeFilter] = useState("all");
  const [possessivePronounFilter, setPossessivePronounFilter] = useState("all");
  const [prepositionQuery, setPrepositionQuery] = useState("");
  const [caseQuizIndex, setCaseQuizIndex] = useState(0);
  const [caseQuizOrder, setCaseQuizOrder] = useState(() => shuffleItems(caseQuizQuestions));
  const [caseQuizAnswers, setCaseQuizAnswers] = useState({ article: "", possessive: "", adjective: "" });
  const [caseQuizChecked, setCaseQuizChecked] = useState(false);
  const [caseQuizScore, setCaseQuizScore] = useState({ correct: 0, answered: 0 });
  const [prepositionQuizIndex, setPrepositionQuizIndex] = useState(0);
  const [prepositionQuizOrder, setPrepositionQuizOrder] = useState(() => shuffleItems(prepositionQuizQuestions));
  const [prepositionQuizAnswer, setPrepositionQuizAnswer] = useState("");
  const [prepositionQuizChecked, setPrepositionQuizChecked] = useState(false);
  const [prepositionQuizScore, setPrepositionQuizScore] = useState({ correct: 0, answered: 0 });
  const [pronounQuizIndex, setPronounQuizIndex] = useState(0);
  const [pronounQuizOrder, setPronounQuizOrder] = useState(makePronounQuizRound);
  const [pronounQuizAnswer, setPronounQuizAnswer] = useState("");
  const [pronounQuizChecked, setPronounQuizChecked] = useState(false);
  const [pronounQuizScore, setPronounQuizScore] = useState({ correct: 0, answered: 0 });

  const genderOptions = [
    { id: "masculine", label: "Masculine", column: 1 },
    { id: "feminine", label: "Feminine", column: 2 },
    { id: "neuter", label: "Neuter", column: 3 },
    { id: "plural", label: "Plural", column: 4 },
  ];
  const sampleNouns = {
    masculine: { label: "masculine", forms: { nom: "Freund", acc: "Freund", dat: "Freund", gen: "Freundes" } },
    feminine: { label: "feminine", forms: { nom: "Kollegin", acc: "Kollegin", dat: "Kollegin", gen: "Kollegin" } },
    neuter: { label: "neuter", forms: { nom: "Kind", acc: "Kind", dat: "Kind", gen: "Kindes" } },
    plural: { label: "plural", forms: { nom: "Freunde", acc: "Freunde", dat: "Freunden", gen: "Freunde" } },
  };
  const selectedCase = cases.find((item) => item.id === lookupCase);
  const selectedGender = genderOptions.find((item) => item.id === lookupGender);
  const selectedAdjectiveChart = adjectiveCharts.find((chart) => chart.id === adjectiveType);
  const findArticleForm = (type) => selectedCase && selectedGender
    ? articleCharts[type].rows.find((row) => row[0] === selectedCase.short)?.[selectedGender.column]
    : "";
  const lookupPossessives = selectedCase && selectedGender
    ? possessiveLookup.filter((row) => row[1] === selectedCase.short).map((row) => ({ stem: row[0], form: row[selectedGender.column + 1] }))
    : [];
  const visibleArticleTypes = articleTypeFilter === "all" ? ["definite", "indefinite", "negative"] : [articleTypeFilter];
  const visiblePossessives = lookupPossessives.filter((item) => possessivePronounFilter === "all"
    || item.stem === possessivePronounFilter
    || (possessivePronounFilter === "Ihr" && item.stem === "ihr- / Ihr-"));
  const adjectiveEnding = selectedCase && selectedGender
    ? selectedAdjectiveChart.rows.find((row) => row[0] === selectedCase.short)?.[selectedGender.column]
    : "";
  const adjectiveNoun = selectedGender && selectedCase ? sampleNouns[lookupGender].forms[lookupCase] : "";
  const adjectiveForm = adjectiveEnding ? `gut${adjectiveEnding.slice(1)}` : "gut";
  const mixedArticleForm = lookupGender === "plural" ? findArticleForm("negative") : findArticleForm("indefinite");
  const adjectiveExample = adjectiveNoun
    ? adjectiveType === "strong" ? `${adjectiveForm} ${adjectiveNoun}`
      : `${adjectiveType === "definite" ? findArticleForm("definite") : mixedArticleForm} ${adjectiveForm} ${adjectiveNoun}`
    : "";
  const filterRows = (rows) => rows.filter((row) => row.join(" ").toLocaleLowerCase().includes(prepositionQuery.trim().toLocaleLowerCase()));
  const matchingAccusativePrepositions = filterRows(prepositions.acc);
  const matchingDativePrepositions = filterRows(prepositions.dat);
  const matchingTwoWayPrepositions = filterRows(twoWay);
  const matchingPrepositionResults = [
    ...matchingAccusativePrepositions.map(([word, meaning, example]) => ({ word, meaning, caseLabel: "Accusative", examples: [example] })),
    ...matchingDativePrepositions.map(([word, meaning, example]) => ({ word, meaning, caseLabel: "Dative", examples: [example] })),
    ...matchingTwoWayPrepositions.map(([word, meaning, accusativeExample, dativeExample]) => ({ word, meaning, caseLabel: "Two-way", examples: [`Wohin? · ${accusativeExample}`, `Wo? · ${dativeExample}`] })),
  ];
  const caseQuizQuestion = caseQuizOrder[caseQuizIndex];
  const caseQuizCase = cases.find((item) => item.id === caseQuizQuestion.caseId);
  const caseQuizGender = caseQuizGenders.find((item) => item.id === caseQuizQuestion.genderId);
  const caseQuizAdjective = adjectiveCharts.find((item) => item.id === caseQuizQuestion.adjectiveType);
  const caseQuizArticle = articleCharts[caseQuizQuestion.articleType].rows.find((row) => row[0] === caseQuizCase.short)?.[caseQuizGender.column] || "—";
  const caseQuizPossessiveRow = possessiveLookup.find((row) => row[0] === (caseQuizQuestion.possessive === "Ihr (formal)" ? "ihr- / Ihr-" : caseQuizQuestion.possessive) && row[1] === caseQuizCase.short);
  const caseQuizPossessive = caseQuizPossessiveRow?.[caseQuizGender.column + 1] || "";
  const caseQuizExpectedPossessive = caseQuizQuestion.possessive === "Ihr (formal)" ? caseQuizPossessive.replace(/^./, (letter) => letter.toUpperCase()) : caseQuizPossessive;
  const caseQuizExpectedAdjective = caseQuizAdjective.rows.find((row) => row[0] === caseQuizCase.short)?.[caseQuizGender.column] || "";
  const prepositionQuizQuestion = prepositionQuizOrder[prepositionQuizIndex];
  const pronounQuizQuestion = pronounQuizOrder[pronounQuizIndex];
  const caseQuizPossessiveClue = {
    "mein-": "my",
    "dein-": "your (informal)",
    "sein-": "his / its",
    "ihr- / Ihr-": "her / their",
    "unser-": "our",
    "euer-": "your (plural)",
    "Ihr (formal)": "your (formal)",
  }[caseQuizQuestion.possessive];

  const selectComplexity = (complexity) => {
    setActiveComplexity(complexity);
    setVisibleSentenceCount(10);
  };

  const checkCaseQuiz = (event) => {
    event.preventDefault();
    if (caseQuizChecked) return;
    setCaseQuizScore((score) => ({ correct: score.correct + caseQuizResults.filter((result) => result.correct).length, answered: score.answered + 1 }));
    setCaseQuizChecked(true);
  };

  const nextCaseQuizQuestion = () => {
    if (caseQuizIndex + 1 >= caseQuizOrder.length) {
      setCaseQuizOrder(shuffleItems(caseQuizQuestions));
      setCaseQuizIndex(0);
    } else {
      setCaseQuizIndex((index) => index + 1);
    }
    setCaseQuizAnswers({ article: "", possessive: "", adjective: "" });
    setCaseQuizChecked(false);
  };

  const nextPrepositionQuizQuestion = () => {
    if (prepositionQuizIndex + 1 >= prepositionQuizOrder.length) {
      setPrepositionQuizOrder(shuffleItems(prepositionQuizQuestions));
      setPrepositionQuizIndex(0);
    } else {
      setPrepositionQuizIndex((index) => index + 1);
    }
    setPrepositionQuizAnswer("");
    setPrepositionQuizChecked(false);
  };

  const checkPrepositionQuiz = (event) => {
    event.preventDefault();
    if (prepositionQuizChecked) return;
    setPrepositionQuizScore((score) => ({ correct: score.correct + (prepositionQuizAnswer === prepositionQuizQuestion.answer ? 1 : 0), answered: score.answered + 1 }));
    setPrepositionQuizChecked(true);
  };

  const checkPronounQuiz = (event) => {
    event.preventDefault();
    if (pronounQuizChecked) return;
    setPronounQuizScore((score) => ({ correct: score.correct + (pronounQuizAnswer === pronounQuizQuestion.answer ? 1 : 0), answered: score.answered + 1 }));
    setPronounQuizChecked(true);
  };

  const nextPronounQuizQuestion = () => {
    if (pronounQuizIndex + 1 >= pronounQuizOrder.length) {
      setPronounQuizOrder(makePronounQuizRound());
      setPronounQuizIndex(0);
    } else {
      setPronounQuizIndex((index) => index + 1);
    }
    setPronounQuizAnswer("");
    setPronounQuizChecked(false);
  };

  const normalizeQuizForm = (value) => value.trim().toLocaleLowerCase().replace(/[–—]/g, "-");
  const caseQuizResults = [
    { key: "article", label: "Article", answer: caseQuizArticle, correct: normalizeQuizForm(caseQuizAnswers.article) === normalizeQuizForm(caseQuizArticle) },
    { key: "possessive", label: "Possessive form", answer: caseQuizExpectedPossessive, correct: caseQuizAnswers.possessive.trim() === caseQuizExpectedPossessive },
    { key: "adjective", label: "Adjective ending", answer: caseQuizExpectedAdjective, correct: normalizeQuizForm(caseQuizAnswers.adjective) === normalizeQuizForm(caseQuizExpectedAdjective) },
  ];

  const clearAllLookups = () => {
    setLookupCase("");
    setLookupGender("");
    setAdjectiveType("definite");
    setArticleTypeFilter("all");
    setPossessivePronounFilter("all");
    setPrepositionQuery("");
  };

  const filteredSentences = practiceSentences.filter((sentence) => sentence.complexity === activeComplexity);

  return (
    <section className="cases-master">
      <header className="cases-hero">
        <p className="cases-eyebrow">GERMAN CASES MASTER REFERENCE</p>
        <h1>See the role. Choose the case.</h1>
        <p className="lead mb-0">A colour-coded guide to the German cases, their articles, endings, and triggers.</p>
        <nav className="cases-learning-path" aria-label="Suggested learning order">
          <a href="#overview"><span>1</span> Find the role</a><i aria-hidden="true">→</i>
          <a href="#personal-pronouns"><span>2</span> Learn pronouns</a><i aria-hidden="true">→</i>
          <a href="#possessives"><span>3</span> Build forms</a><i aria-hidden="true">→</i>
          <a href="#case-practice-quiz"><span>4</span> Practise recall</a>
        </nav>
        <Button as={Link} to="/german-cases-practice" variant="outline-primary" className="mt-3">
          Open Cases Practice 400
        </Button>
      </header>

      <Nav className="cases-jump-nav" aria-label="Cases page sections">
        <Nav.Link href="#overview">Four cases</Nav.Link>
        <Nav.Link href="#personal-pronouns">Personal pronouns</Nav.Link>
        <Nav.Link href="#personal-pronoun-quiz">Pronoun quiz</Nav.Link>
        <Nav.Link href="#articles">Articles</Nav.Link>
        <Nav.Link href="#possessives">Possessives</Nav.Link>
        <Nav.Link href="#adjectives">Adjective endings</Nav.Link>
        <Nav.Link href="#quick-lookup">Quick case finder</Nav.Link>
        <Nav.Link href="#prepositions">Preposition search</Nav.Link>
        <Nav.Link href="#preposition-reference">Preposition table</Nav.Link>
        <Nav.Link href="#sentences">Practice sentences</Nav.Link>
        <Nav.Link href="#case-practice-quiz">Case quiz</Nav.Link>
        <Nav.Link href="#preposition-quiz">Preposition quiz</Nav.Link>
      </Nav>

      <section id="prepositions" className="preposition-top-search">
        <label htmlFor="preposition-search-input">Preposition search</label>
        <Form.Control id="preposition-search-input" type="search" value={prepositionQuery} onChange={(event) => setPrepositionQuery(event.target.value)} placeholder="Search a preposition, meaning, or example…" />
        {prepositionQuery && <Button variant="link" onClick={() => setPrepositionQuery("")}>Clear</Button>}
        <small className="preposition-memory-tip">Two-way: <strong>Wohin?</strong> Akkusativ · <strong>Wo?</strong> Dativ</small>
        {prepositionQuery && <div className="preposition-search-results" aria-live="polite">
          {matchingPrepositionResults.length ? matchingPrepositionResults.map((item) => <article key={`${item.caseLabel}-${item.word}`}>
            <div><strong lang="de">{item.word}</strong><span>{item.caseLabel}</span><small>{item.meaning}</small></div>
            <div className="preposition-search-examples">{item.examples.map((example) => <em lang="de" key={example}>{example}</em>)}</div>
          </article>) : <p className="mb-0">No matches. Try a German preposition, English meaning, or example word.</p>}
        </div>}
      </section>

      <section id="quick-lookup" className="cases-section">
        <div className="case-finder-heading">
          <div><h2>Quick case finder</h2><p>Choose a case and gender to see article and possessive forms, then check the adjective ending.</p></div>
          <Button variant="outline-secondary" onClick={clearAllLookups}>Clear all</Button>
        </div>
        <Card className="case-finder-card"><Card.Body>
          <div className="case-finder-controls">
            <Form.Group controlId="case-finder-case">
              <Form.Label>Case / role</Form.Label>
              <div className="case-finder-select-row"><Form.Select value={lookupCase} onChange={(event) => setLookupCase(event.target.value)}>
                <option value="">Choose a case</option>
                {cases.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
              </Form.Select></div>
            </Form.Group>
            <Form.Group controlId="case-finder-gender">
              <Form.Label>Gender / number</Form.Label>
              <div className="case-finder-select-row"><Form.Select value={lookupGender} onChange={(event) => setLookupGender(event.target.value)}>
                <option value="">Choose gender or number</option>
                {genderOptions.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
              </Form.Select></div>
            </Form.Group>
            <fieldset className="case-finder-radio-control case-finder-adjective-control">
              <legend>Adjective ending</legend>
              {[["strong", "No article"], ["mixed", "Indefinite / ein-word"], ["definite", "Definite article"]].map(([value, label]) => <Form.Check inline type="radio" name="case-adjective-type" id={`adjective-type-${value}`} value={value} checked={adjectiveType === value} onChange={() => setAdjectiveType(value)} label={label} key={value} />)}
            </fieldset>
          </div>

          <div className="case-finder-filter-row case-finder-optional-row">
            <fieldset className="case-finder-radio-control optional-filter">
              <legend>Article type <small>(optional)</small></legend>
              {articleTypeOptions.map(({ value, label }) => <Form.Check inline type="radio" name="case-article-type" id={`case-article-${value}`} value={value} checked={articleTypeFilter === value} onChange={() => setArticleTypeFilter(value)} label={label} key={value} />)}
            </fieldset>
            <fieldset className="case-finder-radio-control optional-filter possessive-filter">
              <legend>Possessive pronoun <small>(optional)</small></legend>
              {possessivePronounOptions.map(({ value, label }) => <Form.Check inline type="radio" name="case-possessive-pronoun" id={`case-possessive-${value.replace(/[^a-z]/gi, "-")}`} value={value} checked={possessivePronounFilter === value} onChange={() => setPossessivePronounFilter(value)} label={label} key={value} />)}
            </fieldset>
          </div>

          {selectedCase && selectedGender ? <div className="case-finder-results" aria-live="polite">
            <div className="case-finder-result-heading"><div><span className={`case-finder-case-tag case-${selectedCase.color}`}>{selectedCase.name}</span><p className="mb-0">{selectedCase.role} · {selectedGender.label.toLowerCase()} · ask <strong>{selectedCase.question}</strong></p></div><span className="case-finder-context">Example noun: <strong>{adjectiveNoun}</strong></span></div>
            <div className="case-finder-result-line">
              <strong>Articles</strong>
              <div className="case-form-inline">
                {visibleArticleTypes.map((type) => <span key={type}><small>{articleTypeOptions.find((option) => option.value === type)?.label}</small><b>{findArticleForm(type) || "— (no plural ein)"}</b></span>)}
              </div>
            </div>
            <div className="case-finder-result-line"><strong>Possessives</strong><div className="case-possessive-results">{visiblePossessives.map((item) => {
              const stemLabel = item.stem === "mein-" ? "my" : item.stem === "dein-" ? "your (informal)" : item.stem === "sein-" ? "his / its" : item.stem === "ihr- / Ihr-" ? "her / their" : item.stem === "unser-" ? "our" : "your (plural)";
              if (possessivePronounFilter === "Ihr" && item.stem === "ihr- / Ihr-") return <span key="formal-ihr"><small>your (formal)</small><strong>{item.form.replace(/^./, (letter) => letter.toUpperCase())}</strong></span>;
              if (possessivePronounFilter !== "all" && item.stem === "ihr- / Ihr-") return <span key={item.stem}><small>{stemLabel}</small><strong>{item.form}</strong></span>;
              return <span key={item.stem}><small>{stemLabel}</small><strong>{item.form}</strong></span>;
            })}{possessivePronounFilter === "all" && <span><small>your (formal)</small><strong>{lookupPossessives.find((item) => item.stem === "ihr- / Ihr-")?.form.replace(/^./, (letter) => letter.toUpperCase())}</strong></span>}{!visiblePossessives.length && <small>Select a case and gender to see the chosen possessive form.</small>}</div></div>
            <div className="case-finder-result-line case-finder-adjective-line">
              <strong>Adjective · {adjectiveEnding}</strong>
              <div><span className="case-finder-example-label">{adjectiveType === "strong" ? "No article" : adjectiveType === "mixed" ? "Indefinite / ein-word" : "Definite article"}</span><strong className="case-finder-example" lang="de">{adjectiveExample}</strong>
                {adjectiveType === "mixed" && <small className="d-block text-muted">Also use this pattern after <em>kein</em> and possessives. Plural has no <em>ein</em>, so the example uses <em>kein</em>.</small>}
              </div>
            </div>
          </div> : <p className="case-finder-empty mb-0">Choose both a case and a gender to see the matching forms. You can clear either choice independently.</p>}
        </Card.Body></Card>
      </section>

      <section id="overview" className="cases-section">
        <h2>The four cases at a glance</h2>
        <p className="text-muted">Ask the German question first. The answer tells you the case.</p>
        <Row className="g-3">
          {cases.map((item) => (
            <Col md={6} xl={3} key={item.id}>
              <article className={`case-card case-${item.color}`}>
                <span className="case-card-label">{item.short}</span>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
                <span>{item.question}</span>
                <span className="case-card-example"><strong>Example:</strong> {item.example}</span>
              </article>
            </Col>
          ))}
        </Row>
      </section>

      <section id="personal-pronouns" className="cases-section reference-cluster">
        <p className="cases-eyebrow">STUDY TOGETHER · PEOPLE WORDS AND THE ARTICLES THEY CHANGE</p>
        <h2>Pronouns & articles</h2>
        <p className="text-muted">Start with the person or thing doing the action. Then compare how articles change with the noun’s role.</p>
        <section className="personal-pronouns-section">
          <h3>Personal pronouns in the four cases</h3>
          <p className="text-muted">Nominativ is the subject, Akkusativ is the direct object, and Dativ is the recipient. Personal pronouns rarely use Genitiv in everyday German; use <em>von + Dativ</em>.</p>
          <div className="pronoun-memory-grid">
            <article><span>1 · Who acts?</span><strong>Nominativ</strong><small><em>Ich lerne Deutsch.</em><br />I am learning German.</small></article>
            <article><span>2 · Who/what is affected?</span><strong>Akkusativ</strong><small><em>Ich sehe dich.</em><br />I see you.</small></article>
            <article><span>3 · To/for whom?</span><strong>Dativ</strong><small><em>Ich helfe dir.</em><br />I am helping you.</small></article>
          </div>
          <Card className="pronoun-notes-card"><Card.Body>
            <div className="pronoun-notes-bottom">
              <div><strong>Remember the biggest changes</strong><p><em>ich → mich → mir</em> · <em>du → dich → dir</em> · <em>er → ihn → ihm</em>. The Dativ plural is <em>ihnen</em>; formal “you” is <em>Ihnen</em> (capital I).</p></div>
              <div><strong>One sentence, three roles</strong><p lang="de"><span className="pronoun-role-subject">Ich</span> gebe <span className="pronoun-role-dative">ihr</span> <span className="pronoun-role-accusative">das Buch</span>.<small>I give her the book. Ich = subject · ihr = recipient · das Buch = thing given.</small></p></div>
            </div>
            <p className="pronoun-possessive-bridge mb-2">The last column gives the owner stem. Match its ending to the <strong>thing owned</strong>: <em>mein Bruder</em>, <em>meine Schwester</em>, <em>mit meinem Kind</em>. Continue to <a href="#possessives">possessive articles</a>.</p>
            <div className="pronoun-table-wrap"><CaseTable headers={["English", "Nominativ · subject", "Akkusativ · direct object", "Dativ · recipient", "Possessive base"]} rows={personalPronouns.map(([meaning, nom, acc, dat, possessive]) => [meaning, nom, acc, dat, possessive])} className="personal-pronoun-table" /></div>
          </Card.Body></Card>
        </section>

        <section id="articles" className="article-reference-panel">
          <hr aria-hidden="true" />
          <Row className="g-2 mt-1 article-chart-row">
            {Object.entries(articleCharts).map(([type, chart]) => {
              const note = articleChartNotes[type];
              return <Col lg={4} md={6} key={type}>
                <Card className={`article-chart article-${type} h-100`}>
                  <Card.Body>
                    <h4>{chart.title}</h4>
                    <p className="text-muted">{chart.subtitle}</p>
                    <CaseTable headers={["Case", "Masc.", "Fem.", "Neuter", "Plural"]} rows={chart.rows} />
                    <aside className="article-chart-note"><strong>When to use it</strong><p>{note.rule}</p><p lang="de"><em>{note.german}</em><small>{note.english}</small></p></aside>
                  </Card.Body>
                </Card>
              </Col>;
            })}
          </Row>
          <p className="article-table-key"><strong>Plural:</strong> the indefinite form is “—”. In Dativ plural, add <strong>-n</strong> when possible (<em>mit den Kindern</em>); Genitiv masculine/neuter often adds <strong>-s / -es</strong> (<em>des Vaters</em>).</p>
        </section>
      </section>

      <section id="possessives" className="cases-section possessive-section">
        <details className="possessive-section-details">
          <summary><strong>Possessive articles</strong><span>The owner stem tells you whose; match the ending to the noun.</span></summary>
          <div className="possessive-notes-card">
          <div className="possessive-template-heading"><span>2 · ENDINGS AT A GLANCE</span><strong>Owner stem + ending for the noun</strong><p>Start with <em>mein-, dein-, sein-, ihr-, unser-, euer-</em>, or formal <em>Ihr-</em>. Then match the case and gender/number of the thing owned.</p></div>
          <CaseTable headers={["Case", "Masculine", "Feminine", "Neuter", "Plural"]} rows={possessiveEndings} className="possessive-ending-table" />
          <div className="possessive-example-notes"><p><strong>Examples:</strong> <em>mein Bruder</em> · <em>meine Schwester</em> · <em>mit meinem Kind</em> · <em>mit meinen Freunden</em></p><p><strong>One small exception:</strong> <em>euer-</em> drops its inner <em>e</em> before an ending: <em>eure, euren, eurem, eurer, eures</em>.</p></div>
          <h3 className="possessive-lookup-heading">4. Full master lookup chart</h3>
          <p className="possessive-lookup-intro">Open an owner stem to compare all four cases at once. The formal <em>Ihr-</em> forms are shown with a capital letter.</p>
          <Accordion className="possessive-lookup">
            {possessiveMasterGroups.map(({ stem, rows }) => <Accordion.Item eventKey={stem} key={stem}>
              <Accordion.Header>{stem} forms</Accordion.Header>
              <Accordion.Body><CaseTable headers={["Case", "Masc.", "Fem.", "Neuter", "Plural"]} rows={rows} /></Accordion.Body>
            </Accordion.Item>)}
          </Accordion>
          <a className="possessive-finder-link" href="#quick-lookup">Need one form? Use the case finder ↑</a>
          </div>
        </details>
      </section>

      <section id="adjectives" className="cases-section">
        <h2>Adjective endings</h2>
        <p className="text-muted">The quick finder gives you one ending and a matching example. Open the charts to compare all forms.</p>
        <details className="case-reference-details">
          <summary>Open all adjective ending charts</summary>
        <Row className="g-4">
          {adjectiveCharts.map((chart) => (
            <Col lg={4} key={chart.title}>
              <Card className="adjective-chart h-100"><Card.Body>
                <h3>{chart.title}</h3>
                <p className="text-muted">{chart.rule}</p>
                <CaseTable headers={["Case", "Masc.", "Fem.", "Neuter", "Plural"]} rows={chart.rows} />
              </Card.Body></Card>
            </Col>
          ))}
        </Row>
        <Card className="case-tip"><Card.Body><strong>Golden rule:</strong> with a definite article, if the article is not its base nominative form (<em>den, dem, der, des</em>) or the noun is plural, use adjective ending <strong>-en</strong>.</Card.Body></Card>
        </details>
      </section>

      <section id="preposition-reference" className="cases-section">
        <h2>Prepositions that choose the case</h2>
        <p className="text-muted">Review fixed-case prepositions, then use <em>Wohin?</em> for direction and <em>Wo?</em> for location with two-way prepositions.</p>
        <details className="case-reference-details">
          <summary>Open accusative, dative, and two-way preposition tables</summary>
          <Row className="g-4 mt-1">
            <Col lg={6}>
              <Card className="preposition-card h-100"><Card.Body>
                <h3 className="case-acc">Always accusative: DOGFU (plus bis)</h3>
                <CaseTable headers={["Prep.", "Meaning", "Example"]} rows={prepositions.acc} />
              </Card.Body></Card>
            </Col>
            <Col lg={6}>
              <Card className="preposition-card h-100"><Card.Body>
                <h3 className="case-dat">Always dative</h3>
                <CaseTable headers={["Prep.", "Meaning", "Example"]} rows={prepositions.dat} />
              </Card.Body></Card>
            </Col>
          </Row>
          <Card className="preposition-card mt-4"><Card.Body>
            <h3>Two-way prepositions: direction or location?</h3>
            <p><strong>Wohin?</strong> (movement to a destination) uses Akkusativ. <strong>Wo?</strong> (static location) uses Dativ.</p>
            <CaseTable headers={["Prep.", "Meaning", "Akkusativ: Wohin?", "Dativ: Wo?"]} rows={twoWay} />
            <p className="mb-0"><strong>Helpful contractions:</strong> <em>an das = ans, in das = ins, an dem = am, in dem = im, zu dem = zum, zu der = zur.</em></p>
          </Card.Body></Card>
        </details>
      </section>

      <section id="sentences" className="cases-section">
        <h2>Practice sentences and reference examples</h2>
        <GermanRoleLegend />
        <div className="practice-toolbar">
          <Nav variant="pills" className="complexity-tabs" aria-label="Sentence complexity">
            <Nav.Item><Nav.Link active={activeComplexity === "simple"} onClick={() => selectComplexity("simple")}>Simple sentences</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={activeComplexity === "intermediate"} onClick={() => selectComplexity("intermediate")}>Intermediate sentences</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link active={activeComplexity === "advanced"} onClick={() => selectComplexity("advanced")}>Advanced sentences</Nav.Link></Nav.Item>
          </Nav>
          <Form.Check
            id="show-all-practice-answers"
            type="switch"
            label="Show all German answers and rules"
            checked={showAllAnswers}
            onChange={() => setShowAllAnswers((visible) => !visible)}
          />
        </div>
        <div className="practice-sentence-list">
          {filteredSentences.slice(0, visibleSentenceCount).map((sentence) => <ColourSentence key={sentence.id} sentence={sentence} showAnswer={showAllAnswers} />)}
        </div>
        {visibleSentenceCount < filteredSentences.length && (
          <Button variant="outline-primary" onClick={() => setVisibleSentenceCount((count) => Math.min(count + 10, filteredSentences.length))}>
            Show 10 more sentences ({visibleSentenceCount} of {filteredSentences.length})
          </Button>
        )}
      </section>

      <section id="case-practice-quiz" className="cases-section cases-quiz-section">
        <div className="quiz-section-heading"><div><span className="quiz-section-label">ACTIVE RECALL · CASES</span><h2>Case Forms: Test Your Knowledge</h2></div><span className="quiz-step-mark">Remember → Answer → Check</span></div>
        <p className="text-muted">Try from memory: read the case, gender, and pattern, then enter the article, possessive form, and adjective ending. Questions are shuffled and cover all {caseQuizQuestions.length.toLocaleString()} combinations before repeating.</p>
        <Card className="case-quiz-card"><Card.Body>
          <div className="quiz-progress-line"><span>Question {caseQuizIndex + 1} of {caseQuizQuestions.length.toLocaleString()}</span><strong>Forms correct: {caseQuizScore.correct} / {caseQuizScore.answered * 3}</strong></div>
          <div className="quiz-progress-track" role="progressbar" aria-label="Case challenge progress" aria-valuenow={caseQuizIndex + 1} aria-valuemin="1" aria-valuemax={caseQuizQuestions.length}><span style={{ width: `${((caseQuizIndex + 1) / caseQuizQuestions.length) * 100}%` }} /></div>
          <div className="quiz-question-context">
            <span><small>Case</small><strong>{caseQuizCase.name}</strong></span>
            <span><small>Gender / number</small><strong>{caseQuizGender.label}</strong></span>
            <span><small>Article type</small><strong>{articleCharts[caseQuizQuestion.articleType].title.replace(" articles", "")}</strong></span>
            <span><small>Possessive meaning</small><strong>{caseQuizPossessiveClue}</strong></span>
            <span><small>Adjective pattern</small><strong>{caseQuizAdjective.title.replace(/^\d\. /, "")}</strong></span>
          </div>
          <p className="case-quiz-prompt">Build the forms for <strong lang="de">{sampleNouns[caseQuizQuestion.genderId].forms[caseQuizQuestion.caseId]}</strong>.</p>
          <Form onSubmit={checkCaseQuiz}>
            <div className="case-quiz-inputs">
              <Form.Group controlId="quiz-article"><Form.Label>Article</Form.Label><Form.Control required disabled={caseQuizChecked} autoComplete="off" value={caseQuizAnswers.article} onChange={(event) => setCaseQuizAnswers((answers) => ({ ...answers, article: event.target.value }))} placeholder="Type the article" /></Form.Group>
              <Form.Group controlId="quiz-possessive"><Form.Label>Possessive form</Form.Label><Form.Control required disabled={caseQuizChecked} autoComplete="off" value={caseQuizAnswers.possessive} onChange={(event) => setCaseQuizAnswers((answers) => ({ ...answers, possessive: event.target.value }))} placeholder="Type the German form" /></Form.Group>
              <Form.Group controlId="quiz-adjective"><Form.Label>Adjective ending</Form.Label><Form.Control required disabled={caseQuizChecked} autoComplete="off" value={caseQuizAnswers.adjective} onChange={(event) => setCaseQuizAnswers((answers) => ({ ...answers, adjective: event.target.value }))} placeholder="e.g. -en" /></Form.Group>
            </div>
            <div className="case-quiz-actions"><Button type="submit" variant="primary" disabled={caseQuizChecked}>Check answers</Button><Button type="button" variant="outline-secondary" onClick={nextCaseQuizQuestion}>Next question</Button></div>
          </Form>
          {caseQuizChecked && <div className="case-quiz-feedback" aria-live="polite">
            <strong>{caseQuizResults.filter((result) => result.correct).length} of 3 correct</strong>
            <div className="case-quiz-result-list">{caseQuizResults.map((result) => <span className={result.correct ? "quiz-correct" : "quiz-incorrect"} key={result.key}><strong>{result.correct ? "✓" : "×"} {result.label}</strong><small>{result.correct ? "Correct" : `Answer: ${result.answer}`}</small></span>)}</div>
            <p className="mb-0 mt-2"><strong>Adjective example:</strong> <span lang="de">{caseQuizAdjective.id === "strong" ? "" : caseQuizAdjective.id === "definite" ? `${articleCharts.definite.rows.find((row) => row[0] === caseQuizCase.short)?.[caseQuizGender.column]} ` : `${caseQuizExpectedPossessive} `}{`gut${caseQuizExpectedAdjective.slice(1)} ${sampleNouns[caseQuizQuestion.genderId].forms[caseQuizQuestion.caseId]}`}</span> · The ending is shown separately so you can focus on the pattern.</p>
          </div>}
        </Card.Body></Card>

      </section>

      <section id="preposition-quiz" className="cases-section cases-quiz-section preposition-practice-section">
        <div className="quiz-section-heading"><div><span className="quiz-section-label">ACTIVE RECALL · PREPOSITIONS</span><h2>Preposition case check</h2></div><span className="quiz-step-mark">Recall the rule, then check</span></div>
        <p className="text-muted">Look at the preposition and recall its case pattern. Nominativ is included as a useful distractor: German prepositions do not take a Nominativ object.</p>
        <Card className="case-quiz-card"><Card.Body>
          <div className="case-quiz-heading"><div><h3>Which case does it take?</h3><p>Use the meaning and examples as clues after you answer.</p></div><span className="practice-question-count">Question {prepositionQuizIndex + 1} / {prepositionQuizQuestions.length} · Score {prepositionQuizScore.correct}/{prepositionQuizScore.answered}</span></div>
          <div className="preposition-quiz-prompt"><strong lang="de">{prepositionQuizQuestion.word}</strong><span>{prepositionQuizQuestion.meaning}</span></div>
          <Form onSubmit={checkPrepositionQuiz}>
            <fieldset className="preposition-quiz-options" disabled={prepositionQuizChecked}><legend>Which case pattern?</legend>
              {[["nom", "Nominativ"], ["acc", "Akkusativ"], ["dat", "Dativ"], ["two-way", "Two-way (Akkusativ for direction, Dativ for location)"]].map(([value, label]) => <Form.Check type="radio" name="preposition-quiz-case" id={`preposition-quiz-${value}`} value={value} checked={prepositionQuizAnswer === value} onChange={() => setPrepositionQuizAnswer(value)} label={label} key={value} required />)}
            </fieldset>
            <div className="case-quiz-actions"><Button type="submit" variant="primary" disabled={prepositionQuizChecked}>Check answer</Button><Button type="button" variant="outline-secondary" onClick={nextPrepositionQuizQuestion}>Next preposition</Button></div>
          </Form>
          {prepositionQuizChecked && <div className={`preposition-quiz-feedback ${prepositionQuizAnswer === prepositionQuizQuestion.answer ? "quiz-correct" : "quiz-incorrect"}`} aria-live="polite">
            <strong>{prepositionQuizAnswer === prepositionQuizQuestion.answer ? "Correct" : `Answer: ${prepositionQuizQuestion.answer === "two-way" ? "Two-way" : prepositionQuizQuestion.answer === "acc" ? "Akkusativ" : "Dativ"}`}</strong>
            <div>{prepositionQuizQuestion.examples.map((example) => <span lang="de" key={example}>{example}</span>)}</div>
            {prepositionQuizQuestion.answer === "two-way" && <small>Movement toward a destination answers <em>Wohin?</em> and takes Akkusativ. A fixed location answers <em>Wo?</em> and takes Dativ.</small>}
          </div>}
        </Card.Body></Card>
      </section>

      <section id="personal-pronoun-quiz" className="cases-section cases-quiz-section pronoun-quiz-section" aria-labelledby="pronoun-quiz-title">
        <div className="quiz-section-heading"><div><span className="quiz-section-label">ACTIVE RECALL · PERSONAL PRONOUNS</span><h2 id="pronoun-quiz-title">Try the forms from memory</h2></div><span className="quiz-step-mark">Question {pronounQuizIndex + 1} / {pronounQuizOrder.length} · Score {pronounQuizScore.correct} / {pronounQuizScore.answered}</span></div>
        <p className="text-muted">Choose the pronoun that fits the German sentence. Use the English meaning as your clue.</p>
        <Card className="case-quiz-card pronoun-quiz"><Card.Body>
          <div className="pronoun-quiz-prompt"><span>{pronounQuizQuestion.prompt}</span><strong lang="de">{pronounQuizQuestion.sentence}</strong></div>
          <Form onSubmit={checkPronounQuiz}>
            <fieldset className="pronoun-quiz-options" disabled={pronounQuizChecked}><legend>Which pronoun belongs in the blank?</legend>
              {pronounQuizQuestion.choices.map((choice, index) => <Form.Check type="radio" name="personal-pronoun-answer" id={`pronoun-quiz-option-${index}`} value={choice} checked={pronounQuizAnswer === choice} onChange={() => setPronounQuizAnswer(choice)} label={choice} key={choice} required />)}
            </fieldset>
            <div className="case-quiz-actions"><Button type="submit" variant="primary" disabled={!pronounQuizAnswer || pronounQuizChecked}>Check answer</Button><Button type="button" variant="outline-secondary" onClick={nextPronounQuizQuestion} disabled={!pronounQuizChecked}>Next question</Button></div>
          </Form>
          {pronounQuizChecked && <div className={`pronoun-quiz-feedback ${pronounQuizAnswer === pronounQuizQuestion.answer ? "quiz-correct" : "quiz-incorrect"}`} aria-live="polite">
            <strong>{pronounQuizAnswer === pronounQuizQuestion.answer ? "Correct" : `Answer: ${pronounQuizQuestion.answer}`}</strong>
            <p>{pronounQuizQuestion.note}</p>
            <p className="mb-0"><em lang="de">{pronounQuizQuestion.complete}</em> — {pronounQuizQuestion.prompt}</p>
          </div>}
        </Card.Body></Card>
      </section>

      <Card className="cases-finish">
        <Card.Body><strong>Use this every time:</strong> 1. Find the noun's role. 2. Ask the matching question. 3. Check the article or preposition. 4. Say one full example aloud.</Card.Body>
      </Card>
    </section>
  );
}

export default GermanCasesMasterPage;
