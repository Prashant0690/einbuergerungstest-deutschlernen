/*
Einbürgerungstest und Deutschlernen
Copyright (C) 2023 Prashant Tiwari

This program is a personal project and free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Project Name: einbuergerungstest-deutschlernen
Folder Name: einbuergerungstest-deutschlernen
*/
import React, { createContext, useState, useContext, useEffect } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Keep the selected state between visits so study sessions can be resumed.
  const [bundesland, setBundesland] = useState(() => {
    return localStorage.getItem("bundesland") || sessionStorage.getItem("bundesland") || "";
  });

  // Use useEffect to save bundesland to session storage whenever it changes
  useEffect(() => {
    localStorage.setItem("bundesland", bundesland);
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
