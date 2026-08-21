# Einbürgerungstest und Deutschlernen

## Overview

**Einbürgerungstest und Deutschlernen** is a personal project designed to help individuals prepare for the German citizenship test ("Einbürgerungstest") and learn about German culture, language, and society. The application provides interactive quizzes, vocabulary learning tools, and educational resources, allowing users to practice the full range of general and state-specific questions, as well as expand their German vocabulary.

## Features and Usage

### General Questions
- **GeneralQuestionsPage**: Attempt all 300 questions from the official German citizenship test, covering topics such as history, politics, society, law, geography, economy, and symbols.

### Learning Sections
- **LearningPage**: Dive into specific sections and topics, with detailed information on:
  - History
  - Politics
  - Society and Culture
  - Law and Rights
  - Geography
  - Economy
  - Symbols and Identity

### Vocabulary Learning
- **VocabularyPage**: Learn important German words categorized by topic, with English translations and pronunciation tools to aid in language acquisition.

### State-Specific Questions
- **StateQuestionsPage**: Similar to the general questions page but focused on state-specific content. This section includes questions relevant to the selected Bundesland.

### Quiz Mode
- **QuizPage**: Take a mock test with 33 questions, comprising 30 general questions and 3 state-specific questions, aligned with the official exam structure.

## Running the Project Locally

### Prerequisites
- Ensure Node.js and npm are installed on your system.

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prashant0690/einbuergerungstest-deutschlernen.git
   cd einbuergerungstest-deutschlernen
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open the application:**
   Visit `http://localhost:3000/einbuergerungstest-deutschlernen` in your web browser.

   ## Publishing to GitHub Pages

   This repository is already configured for GitHub Pages:
   - `homepage` is set in `package.json`
   - `gh-pages` is configured with `predeploy` and `deploy` scripts

   ### First-time setup (GitHub)
   1. Open **Settings → Pages** in this repository.
   2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
   3. Select branch **gh-pages** and folder **/(root)**, then save.

   ### Publish a new version
   1. Make sure your latest changes are committed to your working branch.
   2. Run:
      ```bash
      npm install
      npm run deploy
      ```
   3. Wait 1-2 minutes, then open:
      `https://prashant0690.github.io/einbuergerungstest-deutschlernen`

   ## Legal Notice

   The content and images used in this project are derived from the official test materials of the "Leben in Deutschland" and "Einbürgerungstest," as published by the Federal Office for Migration and Refugees (BAMF). The source materials were downloaded from the BAMF website and adapted for educational purposes within this application.

This project is intended solely for educational purposes and personal study. It is not affiliated with or endorsed by BAMF or any other official entity. Please refer to the [BAMF website](https://www.bamf.de/DE/Startseite/startseite_node.html) for official information and resources.

## License

This project is licensed under the GNU General Public License v3.0. For more details, see the [LICENSE.md](./LICENSE.md) file.

**Project Name**: einbuergerungstest-deutschlernen  
**Folder Name**: einbuergerungstest-deutschlernen

## Acknowledgments

- Thanks to [BAMF](https://www.bamf.de/DE/Startseite/startseite_node.html) for providing the official content, which is available for download on their website. The content used in this application was adapted from the official test materials published by BAMF in their "Gesamtfragenkatalog zum Test Leben in Deutschland und zum Einbürgerungstest" document.
- Translations and language processing by ChatGPT.

## Contact

- **GitHub**: [https://github.com/Prashant0690/einbuergerungstest-deutschlernen](https://github.com/Prashant0690/einbuergerungstest-deutschlernen)
- **LinkedIn**: [https://www.linkedin.com/in/prashanttiwari-in/](https://www.linkedin.com/in/prashanttiwari-in/)

---

*This project is a personal initiative for educational purposes and is not intended for commercial use.*