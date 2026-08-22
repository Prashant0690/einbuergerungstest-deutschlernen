import React, { useEffect, useMemo, useState } from "react";
import { Accordion, Alert, Button, Card, Form, Nav, Spinner } from "react-bootstrap";
import "./GermanCasesPracticePage.css";

const DATA_URL = `${process.env.PUBLIC_URL || ""}/data/German_Cases_400_Practice_Questions.txt`;
const ONE_SENTENCE_SECTION = {
  id: "one-sentence",
  title: "🔥 One Sentence That Contains Almost Everything",
  headline: "",
  body: "",
  bilingualPairs: [],
  questionBlocks: [],
  subcategories: [],
  groupedParts: [],
  subtitle: "Try to analyse this one:",
  german:
    "Wegen des schlechten Wetters gibt mein neuer deutscher Kollege seinem kleinen Sohn einen warmen Mantel, den er gestern in einem großen Kaufhaus gekauft hat.",
  english:
    "Because of the bad weather, my new German colleague gives his little son a warm coat that he bought yesterday in a large department store.",
  breakdown: [
    "wegen des schlechten Wetters → Genitiv",
    "mein neuer deutscher Kollege → Nominativ",
    "seinem kleinen Sohn → Dativ",
    "einen warmen Mantel → Akkusativ",
    "in einem großen Kaufhaus → Dativ because it's Wo?",
    "den → Akkusativ relative pronoun because it refers to the coat being bought",
  ],
};

const BILINGUAL_ROW_REGEX = /^(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*$/;
const NUMBERED_BLOCK_REGEX = /^###\s*(\d+)(?:\.\s*(.*)|.*)$/gm;

function isLikelyAnswerLine(line) {
  if (!line) {
    return false;
  }

  const trimmed = line.trim();
  if (!trimmed) {
    return false;
  }

  if (/^(Identify|Try|Breakdown|a\)|b\)|c\)|d\)|Who\?|Whom\/what\?|To\/for whom\?|Whose\?|Where\?|Where to\?)/i.test(trimmed)) {
    return false;
  }

  return /[.!?]$/.test(trimmed);
}

function parseBilingualRows(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .map((line) => {
      const match = line.match(BILINGUAL_ROW_REGEX);
      if (!match) {
        return null;
      }

      return {
        number: match[1],
        german: match[2],
        english: match[3],
      };
    })
    .filter(Boolean);
}

function parseNumberedBlocks(text) {
  const matches = [...text.matchAll(NUMBERED_BLOCK_REGEX)];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;
    const raw = text.slice(start, end).trim();
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const heading = match[2]?.trim() || "";
    const question = lines[0] || "";
    const answerLabelIndex = lines.findIndex((line) => /^ANSWER:\s*$/i.test(line));
    const noteLabelIndex = lines.findIndex((line) => /^NOTE:\s*$/i.test(line));
    let answer = "";
    let note = "";

    if (answerLabelIndex >= 0) {
      const answerEnd = noteLabelIndex > answerLabelIndex ? noteLabelIndex : lines.length;
      answer = lines.slice(answerLabelIndex + 1, answerEnd).join(" ").trim();
    } else if (lines.length > 1 && isLikelyAnswerLine(lines[1])) {
      answer = lines[1];
    }

    if (noteLabelIndex >= 0) {
      note = lines.slice(noteLabelIndex + 1).join(" ").trim();
    }

    const firstMetaIndex = lines.findIndex((line) => /^ANSWER:\s*$/i.test(line) || /^NOTE:\s*$/i.test(line));
    const details = firstMetaIndex > 1
      ? lines.slice(1, firstMetaIndex)
      : lines.slice(answer ? 2 : 1).filter((line) => !/^ANSWER:\s*$/i.test(line) && !/^NOTE:\s*$/i.test(line));

    return {
      id: `q-${match[1]}`,
      number: match[1],
      heading,
      question,
      answer,
      note,
      details,
    };
  });
}

function parseSectionSubcategories(sectionBody) {
  const lines = sectionBody.split("\n");
  const headingIndexes = lines
    .map((line, index) => (/^(##|#)\s+\d+\.\s+/.test(line.trim()) ? index : -1))
    .filter((index) => index >= 0);

  return headingIndexes.map((startIndex, index) => {
    const endIndex = index + 1 < headingIndexes.length ? headingIndexes[index + 1] : lines.length;
    const blockLines = lines.slice(startIndex, endIndex);
    const heading = blockLines[0].replace(/^#+\s*/, "").trim();
    const blockBodyLines = blockLines.slice(1);
    const blockBody = blockBodyLines.join("\n");
    const bilingualPairs = parseBilingualRows(blockBody);
    const questionBlocks = parseNumberedBlocks(blockBody);
    const additionalInfo = blockBodyLines
      .filter((line) => !BILINGUAL_ROW_REGEX.test(line.trim()))
      .filter((line) => !/^#\s*\|\s*German\s*\|\s*English\s*$/i.test(line.trim()))
      .join("\n")
      .trim();

    return {
      id: `subcategory-${index + 1}`,
      heading,
      additionalInfo,
      bilingualPairs,
      questionBlocks,
    };
  });
}

function parseSectionGroups(sectionBody) {
  const lines = sectionBody.split("\n");
  const headingIndexes = lines
    .map((line, index) => (/^(##|#)\s+(Part\s+[A-Z]|[🟢🟡🟠🔵🔴])/.test(line.trim()) ? index : -1))
    .filter((index) => index >= 0);

  return headingIndexes.map((startIndex, index) => {
    const endIndex = index + 1 < headingIndexes.length ? headingIndexes[index + 1] : lines.length;
    const blockLines = lines.slice(startIndex, endIndex);
    const heading = blockLines[0].replace(/^#+\s*/, "").trim();
    const blockBody = blockLines.slice(1).join("\n").trim();
    const firstQuestionIndex = blockBody.search(/^###\s*\d+/m);
    const intro = firstQuestionIndex >= 0 ? blockBody.slice(0, firstQuestionIndex).trim() : blockBody;
    const questionText = firstQuestionIndex >= 0 ? blockBody.slice(firstQuestionIndex).trim() : "";

    return {
      id: `group-${index + 1}`,
      heading,
      intro,
      questionBlocks: parseNumberedBlocks(questionText),
    };
  });
}

function parseDocument(content) {
  if (!content) {
    return { intro: "", sections: [] };
  }

  const normalized = content.replace(/\r\n/g, "\n");
  const sectionMatches = [...normalized.matchAll(/^SECTION\s+\d+\s+—.*$/gm)];

  if (!sectionMatches.length) {
    return {
      intro: normalized.trim(),
      sections: [],
    };
  }

  const introLines = normalized.slice(0, sectionMatches[0].index).split("\n");
  const cleanedIntroLines =
    introLines.length >= 2 &&
    introLines[0].trim() === "GERMAN CASES — 400 PRACTICE QUESTIONS" &&
    /^=+$/.test(introLines[1].trim())
      ? introLines.slice(2)
      : introLines;
  const intro = cleanedIntroLines.join("\n").trim();
  const sections = sectionMatches.map((match, index) => {
    const start = match.index;
    const end = index + 1 < sectionMatches.length ? sectionMatches[index + 1].index : normalized.length;
    const sectionBody = normalized.slice(start, end).trim();
    const lines = sectionBody.split("\n");
    const title = lines[0]?.trim() || `Section ${index + 1}`;
    const headline = lines.find((line) => line.startsWith("# "))?.replace(/^#\s*/, "").trim() || "";
    const bilingualPairs = parseBilingualRows(sectionBody);
    const questionBlocks = parseNumberedBlocks(sectionBody);
    const subcategories = parseSectionSubcategories(sectionBody);
    const groupedParts = parseSectionGroups(sectionBody);

    return {
      id: `section-${index + 1}`,
      title,
      headline,
      body: sectionBody,
      bilingualPairs,
      questionBlocks,
      subcategories,
      groupedParts,
    };
  });

  return { intro, sections };
}

function GermanCasesPracticePage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [visibleQuestionCountBySection, setVisibleQuestionCountBySection] = useState({});
  const [activeSectionOneSubcategory, setActiveSectionOneSubcategory] = useState(null);

  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      try {
        const textResponse = await fetch(DATA_URL);

        if (!textResponse.ok) {
          throw new Error(`Unable to load practice file (${textResponse.status})`);
        }

        const text = await textResponse.text();

        if (active) {
          setContent(text);
          setError("");
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load the practice file.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      active = false;
    };
  }, []);
  const parsedText = useMemo(() => parseDocument(content), [content]);
  const { intro, sections } = useMemo(() => {
    const section1 = parsedText.sections.find((section) => section.id === "section-1");

    return {
      intro: parsedText.intro,
      sections: [section1, ONE_SENTENCE_SECTION].filter(Boolean),
    };
  }, [parsedText]);

  return (
    <section className="cases-practice-page">
      <header className="cases-practice-hero">
        <p className="cases-eyebrow">GERMAN CASES PRACTICE</p>
        <h1>400 practice questions and answers</h1>
        <p className="lead mb-0">All sections are kept in the same structure as your source document.</p>
      </header>

      {loading && (
        <div className="cases-practice-loading">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {!loading && error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <div className="cases-practice-switch mt-4">
            <Form.Check
              id="show-all-cases-practice-answers"
              type="switch"
              label="Show all answers"
              checked={showAllAnswers}
              onChange={() => setShowAllAnswers((current) => !current)}
            />
          </div>

          <Nav className="cases-jump-nav" aria-label="Practice sections">
            {sections.map((section) => (
              <Nav.Link href={`#${section.id}`} key={section.id}>
                {section.title}
              </Nav.Link>
            ))}
          </Nav>

          {intro && (
            <Card className="cases-practice-card mb-4">
              <Card.Body>
                <pre className="cases-practice-pre">{intro}</pre>
              </Card.Body>
            </Card>
          )}

          {sections.map((section) => (
            <section className="cases-section" id={section.id} key={section.id}>
              <Card className="cases-practice-card">
                <Card.Body>
                  <h2>{section.title}</h2>
                  {section.headline && <p className="text-muted mb-3">{section.headline}</p>}

                  {section.id === "one-sentence" && (
                    <Card className="cases-part-card">
                      <Card.Body>
                        <h3 className="cases-subcategory-title">{section.subtitle}</h3>
                        <p className="qa-prompt section-one-prompt">{section.german}</p>
                        <p className="qa-answer-text">{section.english}</p>
                        <div className="prompt-details">
                          <p className="mb-2"><strong>Breakdown:</strong></p>
                          {section.breakdown.map((line) => (
                            <p className="mb-1" key={line}>{line}</p>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  )}

                  {section.id === "section-1" && !!section.subcategories.length && (
                    <Accordion
                      activeKey={activeSectionOneSubcategory}
                      onSelect={(eventKey) =>
                        setActiveSectionOneSubcategory((current) =>
                          current === eventKey ? null : eventKey
                        )
                      }
                      className="cases-subcategory-accordion"
                    >
                      {section.subcategories.map((subcategory) => (
                        <Accordion.Item
                          eventKey={subcategory.id}
                          key={`${section.id}-${subcategory.id}`}
                          className="cases-subcategory"
                        >
                          <Accordion.Header>{subcategory.heading}</Accordion.Header>
                          <Accordion.Body>
                            {subcategory.additionalInfo && (
                              <pre className="cases-practice-pre cases-subcategory-info">{subcategory.additionalInfo}</pre>
                            )}

                            {!!subcategory.bilingualPairs.length && (
                              <div className="qa-grid">
                                {subcategory.bilingualPairs.map((item) => (
                                  <Card className="qa-card" key={`${section.id}-${subcategory.id}-${item.number}`}>
                                    <Card.Body>
                                      <p className="qa-prompt section-one-prompt">
                                        <span className="section-one-number">{item.number}:</span> {item.english}
                                      </p>
                                      {showAllAnswers ? (
                                        <p className="qa-answer-text mb-0">{item.german}</p>
                                      ) : (
                                        <details className="qa-reveal">
                                          <summary>Show answer</summary>
                                          <p className="qa-answer-text mt-2 mb-0">{item.german}</p>
                                        </details>
                                      )}
                                    </Card.Body>
                                  </Card>
                                ))}
                              </div>
                            )}

                            {!!subcategory.questionBlocks.length && (
                              <div className="prompt-list">
                                {subcategory.questionBlocks.map((block) => (
                                  <Card className="prompt-card" key={`${section.id}-${subcategory.id}-${block.id}`}>
                                    <Card.Body>
                                      <p className="qa-prompt section-one-prompt">
                                        <span className="section-one-number">{block.number}:</span> {block.question || "Prompt in section details below."}
                                      </p>
                                      {block.answer ? (
                                        showAllAnswers ? (
                                          <p className="qa-answer-text mb-0">{block.answer}</p>
                                        ) : (
                                          <details className="qa-reveal">
                                            <summary>Show answer</summary>
                                            <p className="qa-answer-text mt-2 mb-0">{block.answer}</p>
                                          </details>
                                        )
                                      ) : (
                                        <p className="source-note mb-0">No explicit answer is present in the source text for this prompt.</p>
                                      )}
                                      {!!block.details.length && (
                                        <div className="prompt-details">
                                          {block.details.map((line, index) => (
                                            <p className="mb-1" key={`${block.id}-line-${index}`}>{line}</p>
                                          ))}
                                        </div>
                                      )}
                                    </Card.Body>
                                  </Card>
                                ))}
                              </div>
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  )}

                  {section.id !== "section-1" && !!section.groupedParts.length && (
                    <>
                      {section.groupedParts.map((group) => (
                        <Card className="cases-part-card" key={`${section.id}-${group.id}`}>
                          <Card.Body>
                            <h3 className="cases-subcategory-title">{group.heading}</h3>
                            {group.intro && <pre className="cases-practice-pre cases-subcategory-info">{group.intro}</pre>}
                            <div className="prompt-list">
                              {group.questionBlocks
                                .slice(0, visibleQuestionCountBySection[`${section.id}-${group.id}`] || 20)
                                .map((block) => (
                                  <Card className="prompt-card" key={`${section.id}-${group.id}-${block.id}`}>
                                    <Card.Body>
                                      <p className="qa-prompt">
                                        <span className="section-one-number">{block.number}:</span> {block.question || "Prompt in section details below."}
                                      </p>
                                      {!!block.details.length && (
                                        <div className="prompt-details">
                                          {block.details.map((line, index) => (
                                            <p className="mb-1" key={`${block.id}-line-${index}`}>{line}</p>
                                          ))}
                                        </div>
                                      )}
                                      {block.answer ? (
                                        showAllAnswers ? (
                                          <p className="qa-answer-text mb-0">{block.answer}</p>
                                        ) : (
                                          <details className="qa-reveal">
                                            <summary>Show answer</summary>
                                            <p className="qa-answer-text mt-2 mb-0">{block.answer}</p>
                                          </details>
                                        )
                                      ) : (
                                        <p className="source-note mb-0">No explicit answer is present in the source text for this prompt.</p>
                                      )}
                                      {block.note && (
                                        <p className="qa-note mb-0">
                                          <strong>Note:</strong> {block.note}
                                        </p>
                                      )}
                                    </Card.Body>
                                  </Card>
                                ))}
                            </div>
                            {group.questionBlocks.length > (visibleQuestionCountBySection[`${section.id}-${group.id}`] || 20) && (
                              <Button
                                variant="outline-primary"
                                onClick={() =>
                                  setVisibleQuestionCountBySection((current) => ({
                                    ...current,
                                    [`${section.id}-${group.id}`]: (current[`${section.id}-${group.id}`] || 20) + 20,
                                  }))
                                }
                              >
                                Show 20 more prompts
                              </Button>
                            )}
                          </Card.Body>
                        </Card>
                      ))}
                    </>
                  )}

                  {section.id !== "section-1" && !section.groupedParts.length && !!section.questionBlocks.length && (
                    <>
                      <div className="prompt-list">
                        {section.questionBlocks
                          .slice(0, visibleQuestionCountBySection[section.id] || 20)
                          .map((block) => (
                            <Card className="prompt-card" key={`${section.id}-${block.id}`}>
                              <Card.Body>
                                <p className="qa-prompt">
                                  <span className="section-one-number">{block.number}:</span> {block.question || "Prompt in section details below."}
                                </p>
                                {!!block.details.length && (
                                  <div className="prompt-details">
                                    {block.details.map((line, index) => (
                                      <p className="mb-1" key={`${block.id}-line-${index}`}>{line}</p>
                                    ))}
                                  </div>
                                )}
                                {block.answer ? (
                                  showAllAnswers ? (
                                    <p className="qa-answer-text mb-0">{block.answer}</p>
                                  ) : (
                                    <details className="qa-reveal">
                                      <summary>Show answer</summary>
                                      <p className="qa-answer-text mt-2 mb-0">{block.answer}</p>
                                    </details>
                                  )
                                ) : (
                                  <p className="source-note mb-0">No explicit answer is present in the source text for this prompt.</p>
                                )}
                                {block.note && (
                                  <p className="qa-note mb-0">
                                    <strong>Note:</strong> {block.note}
                                  </p>
                                )}
                              </Card.Body>
                            </Card>
                          ))}
                      </div>
                    </>
                  )}

                  {!section.bilingualPairs.length && !section.questionBlocks.length && !section.subcategories.length && !section.groupedParts.length && (
                    <pre className="cases-practice-pre">{section.body}</pre>
                  )}
                </Card.Body>
              </Card>
            </section>
          ))}
        </>
      )}
    </section>
  );
}

export default GermanCasesPracticePage;
