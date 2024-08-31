// src/utils/quizUtils.js

import { getEnglishStateName } from "../data/content";

export const getImageUrl = (region, id) => {
  if (region === "All") {
    console.log("Image", `${process.env.PUBLIC_URL}/images/General/All${id}.png`)
    return `${process.env.PUBLIC_URL}/images/General/All${id}.jpg`;
  } else {
    console.log("Image",`${process.env.PUBLIC_URL}/images/Bundesland/${getEnglishStateName(region)}${id}.png`)
    return `${process.env.PUBLIC_URL}/images/Bundesland/${getEnglishStateName(region)}${id}.jpg`;
  }
};

// Method to handle answer processing
export const processAnswer = (question, selectedGermanOption) => {
  const correctAnswer = question.options.find(
    (option) => option.isCorrect
  ).germanOption;
  return {
    id: question.id, // The unique identifier for the question
    region: question.region, // The region or category of the question
    question, // The full question object
    selectedGermanOption, // The user's selected option in German
    correctAnswer, // The correct answer option in German
    isCorrect: selectedGermanOption === correctAnswer, // Boolean indicating if the user's selection is correct
  };
};

export const saveAnswersToSession = (key, answersArray) => {
  sessionStorage.setItem(key, JSON.stringify(answersArray));
};

export const loadAnswersFromSession = (key) => {
  const saved = sessionStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
};

export const updateAnswerArray = (prevAnswers, newAnswer) => {
  const existingIndex = prevAnswers.findIndex(
    (answer) => answer.id === newAnswer.id && answer.region === newAnswer.region
  );

  if (existingIndex !== -1) {
    // Update existing answer
    const updatedAnswers = [...prevAnswers];
    updatedAnswers[existingIndex] = newAnswer;
    return updatedAnswers;
  } else {
    // Add new answer
    return [...prevAnswers, newAnswer];
  }
};
