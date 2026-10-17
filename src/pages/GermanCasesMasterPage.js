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

const prepositions = {
  acc: [
    ["durch", "through / via", "durch den Park"],
    ["ohne", "without", "ohne meinen Hund"],
    ["gegen", "against / around", "gegen einen Baum"],
    ["für", "for", "für meine Mutter"],
    ["um", "around / at a time", "um die Ecke"],
  ],
  dat: [
    ["aus", "out of / from", "aus der Schweiz"],
    ["bei", "at / with / near", "bei ihren Eltern"],
    ["mit", "with / by transport", "mit dem Zug"],
    ["nach", "after / to a city", "nach der Schule"],
    ["seit", "since / for a duration", "seit einem Jahr"],
    ["von", "from / of", "von meinem Vater"],
    ["zu", "to a person/place", "zu dem Arzt"],
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

const pronounDerivations = [
  ["ich", "mein-", "Mein Hund schläft.", "mein- + no ending (Nom. masculine) = mein"],
  ["du", "dein-", "Wo ist deine Tasche?", "dein- + -e (Nom. feminine) = deine"],
  ["er / es", "sein-", "Er hilft seinem Vater.", "sein- + -em (Dat. masculine) = seinem"],
  ["sie", "ihr-", "Sie sucht ihren Bruder.", "ihr- + -en (Acc. masculine) = ihren"],
  ["wir", "unser-", "Unser Auto steht draußen.", "unser- + no ending (Nom. neuter) = unser"],
  ["ihr", "euer-", "Eure Kinder spielen im Garten.", "euer- + -e, drop inner e = eure"],
  ["sie / Sie", "ihr- / Ihr-", "Wie ist Ihr Name?", "Ihr- + no ending (Nom. masculine) = Ihr"],
];

const einTemplate = [
  ["Nom", "ein (-)", "eine (-e)", "ein (-)", "meine (-e)"],
  ["Acc", "einen (-en)", "eine (-e)", "ein (-)", "meine (-e)"],
  ["Dat", "einem (-em)", "einer (-er)", "einem (-em)", "meinen (-en)"],
  ["Gen", "eines (-es)", "einer (-er)", "eines (-es)", "meiner (-er)"],
];

const possessiveLookup = [
  ["mein-", "Nom", "mein", "meine", "mein", "meine"], ["mein-", "Acc", "meinen", "meine", "mein", "meine"], ["mein-", "Dat", "meinem", "meiner", "meinem", "meinen"], ["mein-", "Gen", "meines", "meiner", "meines", "meiner"],
  ["dein-", "Nom", "dein", "deine", "dein", "deine"], ["dein-", "Acc", "deinen", "deine", "dein", "deine"], ["dein-", "Dat", "deinem", "deiner", "deinem", "deinen"], ["dein-", "Gen", "deines", "deiner", "deines", "deiner"],
  ["sein-", "Nom", "sein", "seine", "sein", "seine"], ["sein-", "Acc", "seinen", "seine", "sein", "seine"], ["sein-", "Dat", "seinem", "seiner", "seinem", "seinen"], ["sein-", "Gen", "seines", "seiner", "seines", "seiner"],
  ["ihr- / Ihr-", "Nom", "ihr", "ihre", "ihr", "ihre"], ["ihr- / Ihr-", "Acc", "ihren", "ihre", "ihr", "ihre"], ["ihr- / Ihr-", "Dat", "ihrem", "ihrer", "ihrem", "ihren"], ["ihr- / Ihr-", "Gen", "ihres", "ihrer", "ihres", "ihrer"],
  ["unser-", "Nom", "unser", "unsere", "unser", "unsere"], ["unser-", "Acc", "unseren", "unsere", "unser", "unsere"], ["unser-", "Dat", "unserem", "unserer", "unserem", "unseren"], ["unser-", "Gen", "unseres", "unserer", "unseres", "unserer"],
  ["euer-", "Nom", "euer", "eure", "euer", "eure"], ["euer-", "Acc", "euren", "eure", "euer", "eure"], ["euer-", "Dat", "eurem", "eurer", "eurem", "euren"], ["euer-", "Gen", "eures", "eurer", "eures", "eurer"],
];

const adjectiveCharts = [
  {
    title: "1. No article",
    rule: "The adjective carries the strong ending because there is no article to show it.",
    rows: [["Nom", "-er", "-e", "-es", "-e"], ["Acc", "-en", "-e", "-es", "-e"], ["Dat", "-em", "-er", "-em", "-en"], ["Gen", "-en", "-er", "-en", "-er"]],
  },
  {
    title: "2. Indefinite article",
    rule: "After ein, kein, or a possessive, the adjective adds the missing case information.",
    rows: [["Nom", "-er", "-e", "-es", "-en"], ["Acc", "-en", "-e", "-es", "-en"], ["Dat", "-en", "-en", "-en", "-en"], ["Gen", "-en", "-en", "-en", "-en"]],
  },
  {
    title: "3. Definite article",
    rule: "The article usually shows the case; the adjective is commonly -en after a changed article or in plural.",
    rows: [["Nom", "-e", "-e", "-e", "-en"], ["Acc", "-en", "-e", "-e", "-en"], ["Dat", "-en", "-en", "-en", "-en"], ["Gen", "-en", "-en", "-en", "-en"]],
  },
];

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
            <summary>Show German answer and rules</summary>
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
  const [articleVisibility, setArticleVisibility] = useState({
    definite: true,
    indefinite: true,
    negative: true,
  });
  const [visibleSentenceCount, setVisibleSentenceCount] = useState(10);
  const [activeComplexity, setActiveComplexity] = useState("simple");
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const toggleArticle = (type) => {
    setArticleVisibility((current) => ({ ...current, [type]: !current[type] }));
  };

  const selectComplexity = (complexity) => {
    setActiveComplexity(complexity);
    setVisibleSentenceCount(10);
  };

  const filteredSentences = practiceSentences.filter((sentence) => sentence.complexity === activeComplexity);

  return (
    <section className="cases-master">
      <header className="cases-hero">
        <p className="cases-eyebrow">GERMAN CASES MASTER REFERENCE</p>
        <h1>See the role. Choose the case.</h1>
        <p className="lead mb-0">A colour-coded guide to the German cases, their articles, endings, and triggers.</p>
        <Button as={Link} to="/german-cases-practice" variant="outline-primary" className="mt-3">
          Open Cases Practice 400
        </Button>
      </header>

      <Nav className="cases-jump-nav" aria-label="Cases page sections">
        <Nav.Link href="#overview">Four cases</Nav.Link>
        <Nav.Link href="#articles">Articles</Nav.Link>
        <Nav.Link href="#possessives">Possessives</Nav.Link>
        <Nav.Link href="#adjectives">Adjective endings</Nav.Link>
        <Nav.Link href="#prepositions">Prepositions</Nav.Link>
        <Nav.Link href="#sentences">Practice sentences</Nav.Link>
      </Nav>

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

      <section id="articles" className="cases-section">
        <h2>Master article chart</h2>
        <p>Keep all three article systems visible, or focus only on the one you are practising.</p>
        <Form className="article-controls" aria-label="Article chart filters">
          {Object.entries(articleCharts).map(([type, chart]) => (
            <Form.Check
              inline
              key={type}
              id={`article-${type}`}
              type="checkbox"
              label={chart.title}
              checked={articleVisibility[type]}
              onChange={() => toggleArticle(type)}
            />
          ))}
        </Form>
        <Row className="g-4">
          {Object.entries(articleCharts).filter(([type]) => articleVisibility[type]).map(([type, chart]) => (
            <Col lg={4} key={type}>
              <Card className={`article-chart article-${type} h-100`}>
                <Card.Body>
                  <h3>{chart.title}</h3>
                  <p className="text-muted">{chart.subtitle}</p>
                  <CaseTable headers={["Case", "Masc.", "Fem.", "Neuter", "Plural"]} rows={chart.rows} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="g-3">
          <Col md={6}><Card className="case-tip h-100"><Card.Body><strong>Dative plural</strong><br />Add <strong>-n</strong> to the noun when possible: <em>mit den Kindern</em>.</Card.Body></Card></Col>
          <Col md={6}><Card className="case-tip h-100"><Card.Body><strong>Genitive masculine/neuter</strong><br />The noun often adds <strong>-s</strong> or <strong>-es</strong>: <em>des Vaters</em>.</Card.Body></Card></Col>
        </Row>
      </section>

      <section id="possessives" className="cases-section">
        <h2>Possessive articles: stem + <em>ein</em> ending</h2>
        <p className="text-muted">This is the fastest way to form any possessive article: select the owner stem, then apply the ending from the master <em>ein</em> template.</p>
        <h3>1. Pronoun, stem, and derivation</h3>
        <CaseTable headers={["Pronoun", "Stem", "Example sentence", "How it is formed"]} rows={pronounDerivations} />
        <h3 className="mt-4">2. Master <em>ein</em> template</h3>
        <p>This table supplies the ending. Replace <em>ein-</em> with <em>mein-, dein-, sein-, ihr-, unser-</em>, or <em>euer-</em>.</p>
        <CaseTable headers={["Case", "Masculine", "Feminine", "Neuter", "Plural"]} rows={einTemplate} />
        <Card className="case-tip mt-3"><Card.Body><strong>Derive it in three steps:</strong> <em>with my sister</em> means Dative + feminine. The template gives <strong>-er</strong>; add it to <em>mein-</em> to form <strong>mit meiner Schwester</strong>.</Card.Body></Card>
        <h3 className="mt-4">3. Owner stem overview</h3>
        <p>Choose the stem that matches the owner. The ending then comes from the template above.</p>
        <div className="stem-grid">{possessives.map(([stem]) => <span key={stem}>{stem}</span>)}</div>
        <h3 className="mt-4">4. Full master lookup chart</h3>
        <p>Use this only when you need a quick confirmation. Each owner stem is grouped and can be opened separately.</p>
        <Accordion className="possessive-lookup">
          {possessives.map(([stem], index) => (
            <Accordion.Item eventKey={stem} key={stem}>
              <Accordion.Header>{stem} possessive forms</Accordion.Header>
              <Accordion.Body>
                <CaseTable headers={["Case", "Masc.", "Fem.", "Neuter", "Plural"]} rows={possessiveLookup.slice(index * 4, index * 4 + 4).map((row) => row.slice(1))} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <Card className="case-tip mt-3"><Card.Body><strong><em>euer</em> shortcut:</strong> drop the inner <em>e</em> before a vowel ending: <em>eure, euren, eurem, eurer</em>.</Card.Body></Card>
      </section>

      <section id="adjectives" className="cases-section">
        <h2>Adjective ending quick check</h2>
        <p>Choose the article type first. Then use the matching full chart.</p>
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
      </section>

      <section id="prepositions" className="cases-section">
        <h2>Prepositions that choose the case</h2>
        <Row className="g-4">
          <Col lg={6}>
            <Card className="preposition-card h-100"><Card.Body>
              <h3 className="case-acc">Always accusative: DOGFU</h3>
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
          <p><strong>Wohin?</strong> (motion to a destination) uses Accusative. <strong>Wo?</strong> (static location) uses Dative.</p>
          <CaseTable headers={["Prep.", "Meaning", "Accusative: Wohin?", "Dative: Wo?"]} rows={twoWay} />
          <p className="mb-0"><strong>Helpful contractions:</strong> <em>an das = ans, in das = ins, an dem = am, in dem = im, zu dem = zum, zu der = zur.</em></p>
        </Card.Body></Card>
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

      <Card className="cases-finish">
        <Card.Body><strong>Use this every time:</strong> 1. Find the noun's role. 2. Ask the matching question. 3. Check the article or preposition. 4. Say one full example aloud.</Card.Body>
      </Card>
    </section>
  );
}

export default GermanCasesMasterPage;
