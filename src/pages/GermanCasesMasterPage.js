import React, { useState } from "react";
import { Card, Col, Nav, Row, Table } from "react-bootstrap";
import "./GermanCasesMasterPage.css";

const cases = [
  { id: "nom", short: "Nom", name: "Nominativ", question: "Wer oder was?", role: "Subject - who acts?", example: "Die Nachbarin kocht heute.", color: "nom" },
  { id: "acc", short: "Acc", name: "Akkusativ", question: "Wen oder was?", role: "Direct object - what is affected?", example: "Wir besuchen den neuen Markt.", color: "acc" },
  { id: "dat", short: "Dat", name: "Dativ", question: "Wem?", role: "Indirect object - to or for whom?", example: "Der Arzt erklärt der Patientin den Plan.", color: "dat" },
  { id: "gen", short: "Gen", name: "Genitiv", question: "Wessen?", role: "Possession - whose?", example: "Die Farbe des Hauses ist warm.", color: "gen" },
];

const articles = [
  ["Nom", "der / ein / kein", "die / eine / keine", "das / ein / kein", "die / - / keine"],
  ["Acc", "den / einen / keinen", "die / eine / keine", "das / ein / kein", "die / - / keine"],
  ["Dat", "dem / einem / keinem", "der / einer / keiner", "dem / einem / keinem", "den / - / keinen (+n)"],
  ["Gen", "des / eines / keines (+s)", "der / einer / keiner", "des / eines / keines (+s)", "der / - / keiner"],
];

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

function GermanCasesMasterPage() {
  const [activeCase, setActiveCase] = useState("nom");
  const active = cases.find((item) => item.id === activeCase);

  return (
    <section className="cases-master">
      <header className="cases-hero">
        <p className="cases-eyebrow">GERMAN CASES MASTER REFERENCE</p>
        <h1>See the role. Choose the case.</h1>
        <p className="lead mb-0">A colour-coded guide to the German cases, their articles, endings, and triggers.</p>
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
              <button
                type="button"
                className={`case-card case-${item.color} ${activeCase === item.id ? "is-active" : ""}`}
                onClick={() => setActiveCase(item.id)}
              >
                <span className="case-card-label">{item.short}</span>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
                <span>{item.question}</span>
              </button>
            </Col>
          ))}
        </Row>
        <Card className={`case-detail case-${active.color} mt-3`}>
          <Card.Body>
            <p className="cases-eyebrow mb-1">{active.short} - {active.name}</p>
            <h3>{active.role}</h3>
            <p className="case-question">{active.question}</p>
            <p className="mb-0"><strong>Example:</strong> {active.example}</p>
          </Card.Body>
        </Card>
      </section>

      <section id="articles" className="cases-section">
        <h2>Master article chart</h2>
        <p>Definite, indefinite, and negative articles follow the same case pattern.</p>
        <CaseTable headers={["Case", "Masculine", "Feminine", "Neuter", "Plural"]} rows={articles} />
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
        <h3 className="mt-4">3. Stem overview</h3>
        <CaseTable headers={["Stem", "Nom. Masc.", "Nom. Fem.", "Nom. Neuter", "Nom. Plural"]} rows={possessives} />
        <h3 className="mt-4">4. Full master lookup chart</h3>
        <p>Use this only when you need a quick confirmation. The stem plus template method above is the main tool.</p>
        <CaseTable headers={["Stem", "Case", "Masc.", "Fem.", "Neuter", "Plural"]} rows={possessiveLookup} />
        <Card className="case-tip mt-3"><Card.Body><strong><em>euer</em> shortcut:</strong> drop the inner <em>e</em> before a vowel ending: <em>eure, euren, eurem, eurer</em>.</Card.Body></Card>
      </section>

      <section id="adjectives" className="cases-section">
        <h2>Adjective ending quick check</h2>
        <p>Look at the article first. When it already shows the case clearly, the adjective is usually <strong>-en</strong> after a changed definite article or in plural.</p>
        <CaseTable
          headers={["Article type", "Nom. Masc.", "Acc. Masc.", "Dat. (all)", "Gen. (all)"]}
          rows={[
            ["No article", "kalter Kaffee", "kalten Kaffee", "kaltem Kaffee", "kalten Kaffees"],
            ["ein / kein / mein", "ein großer Hund", "einen großen Hund", "einem großen Hund", "eines großen Hundes"],
            ["der / die / das", "der alte Tisch", "den alten Tisch", "dem alten Tisch", "des alten Tisches"],
          ]}
        />
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
        <p>Use these after the tables. Identify each colour, say the question, and then make your own sentence with the same pattern.</p>
        <div className="sentence-map">
          <div><span className="sentence-label">English</span><span>The teacher</span><span>explains</span><span>the child</span><span>the way</span><span>to the library.</span></div>
          <div><span className="sentence-label">Deutsch</span><span className="case-nom">Der Lehrer</span><span className="case-verb">erklärt</span><span className="case-dat">dem Kind</span><span className="case-acc">den Weg</span><span>zur Bibliothek.</span></div>
          <div><span className="sentence-label">Role</span><span className="case-nom">Nom</span><span>Verb</span><span className="case-dat">Dat</span><span className="case-acc">Acc</span><span>Place</span></div>
        </div>
        <div className="case-example-grid mt-3">
          <p><span className="case-nom">Die Kollegin</span> arbeitet heute von zu Hause. <small>Find the subject: Wer arbeitet?</small></p>
          <p>Ich lese <span className="case-acc">einen interessanten Artikel</span>. <small>Find the direct object: Wen oder was lese ich?</small></p>
          <p>Wir schicken <span className="case-dat">unserer Großmutter</span> <span className="case-acc">eine Karte</span>. <small>Find the receiver, then the thing.</small></p>
          <p>Wegen <span className="case-gen">des starken Regens</span> bleibt der Zug stehen. <small>Genitive after <em>wegen</em>.</small></p>
        </div>
      </section>

      <Card className="cases-finish">
        <Card.Body><strong>Use this every time:</strong> 1. Find the noun's role. 2. Ask the matching question. 3. Check the article or preposition. 4. Say one full example aloud.</Card.Body>
      </Card>
    </section>
  );
}

export default GermanCasesMasterPage;
