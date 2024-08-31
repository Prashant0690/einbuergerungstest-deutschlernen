import React, { createContext, useState, useContext, useEffect } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Initialize `bundesland` from session storage if available
  const [bundesland, setBundesland] = useState(() => {
    return sessionStorage.getItem("bundesland") || "";
  });

  // Use useEffect to save bundesland to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("bundesland", bundesland);
  }, [bundesland]);

  return (
    <QuizContext.Provider
      value={{
        bundesland,
        setBundesland,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
