import React from "react";

function HomePage() {
  return (
    <div className="container mt-4">
      {/* Main Title */}
      <h1 className="mb-4 text-center">
        Welcome to the Einbürgerungstest Quiz App
      </h1>
      <p className="lead text-center">
        Test your knowledge about life in Germany! Learn and practice for the German naturalization test (Einbürgerungstest) with this interactive quiz app.
      </p>

      {/* Introduction Section */}
      <div className="text-center mt-5">
        <h2 className="text-center mb-4">
          About the Einbürgerungstest
        </h2>
        <p className="text-center">
          The Einbürgerungstest (German naturalization test) consists of 300 questions covering a wide range of topics. These questions are divided into key categories that include history, politics, society, and more. Preparing for this test can help you understand the rights, responsibilities, and culture of living in Germany.
        </p>
      </div>

      {/* List of main sections */}
      <div className="mt-5">
        <h2 className="text-center mb-4">Explore Key Topics</h2>
        <div className="list-group">
          <div className="list-group-item">
            <h4 className="mb-1">1. History</h4>
            <p className="mb-1">
              Covers German history, European history, key events, and the role of Germany in the European Union.
            </p>
          </div>

          <div className="list-group-item">
            <h4 className="mb-1">2. Politics</h4>
            <p className="mb-1">
              Includes the structure and functions of the German government, political parties, and constitutional law.
            </p>
          </div>

          <div className="list-group-item">
            <h4 className="mb-1">3. Society and Culture</h4>
            <p className="mb-1">
              Covers German social norms, values, cultural practices, and demographics.
            </p>
          </div>

          <div className="list-group-item">
            <h4 className="mb-1">4. Law and Rights</h4>
            <p className="mb-1">
              Focuses on the fundamental rights of citizens, the judiciary system, and labor laws.
            </p>
          </div>

          <div className="list-group-item">
            <h4 className="mb-1">5. Geography</h4>
            <p className="mb-1">
              Knowledge of Germany's federal states, major rivers, mountains, and European geography.
            </p>
          </div>

          <div className="list-group-item">
            <h4 className="mb-1">6. Economy</h4>
            <p className="mb-1">
              Covers Germany's economic system, key industries, and the role of the European Union in trade.
            </p>
          </div>

          <div className="list-group-item">
            <h4 className="mb-1">7. Symbols and Identity</h4>
            <p className="mb-1">
              National symbols like the flag and anthem, as well as holidays and celebrations in Germany.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-5 text-center">
        <p className="text-muted">
          This app is designed to help individuals prepare for the Einbürgerungstest. It is for educational purposes only and should not be relied upon for legal advice or official guidance.
        </p>
      </div>
    </div>
  );
}

export default HomePage;