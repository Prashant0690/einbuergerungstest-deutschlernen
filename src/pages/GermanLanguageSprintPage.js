import React from "react";
import words from "../data/deutschlearnen/conversational_german_words.json";
import "./GermanLanguageSprintPage.css";

const categories = words.reduce((groups, word) => {
  let group = groups.find((item) => item.title === word.Category);
  if (!group) {
    group = {
      id: word.Category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title: word.Category,
      words: [],
    };
    groups.push(group);
  }
  group.words.push(word);
  return groups;
}, []);

function GermanLanguageSprintPage() {
  return (
    <main className="everyday-german-page">
      <header className="everyday-german-hero">
        <p className="path-kicker">Everyday German · {words.length} phrases</p>
        <h1>Useful words and phrases</h1>
        <p>Browse each phrase with its English meaning and a natural example in both languages.</p>
      </header>

      <nav className="everyday-german-index" aria-label="Phrase categories">
        {categories.map((category) => (
          <a key={category.id} href={`#${category.id}`}>
            {category.title}<span>{category.words.length}</span>
          </a>
        ))}
      </nav>

      {categories.map((category) => (
        <section className="everyday-german-category" id={category.id} key={category.id}>
          <header className="everyday-german-category-heading">
            <h2>{category.title}</h2>
            <span>{category.words.length} phrases</span>
          </header>
          <div className="everyday-german-entries">
            {category.words.map((word) => (
              <article className="everyday-german-entry" key={word.id}>
                <div className="everyday-german-term">
                  <h3 lang="de">{word.GermanWord}</h3>
                  <p>{word.EnglishMeanings.join(" · ")}</p>
                </div>
                <div className="everyday-german-example">
                  <p lang="de">{word.ExampleGerman}</p>
                  <p lang="en">{word.ExampleEnglish}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default GermanLanguageSprintPage;
