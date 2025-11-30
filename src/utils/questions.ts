import type { Question } from "../types/quiz";

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: "question-1",
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    id: "question-2",
    text: "Which programming language is primarily used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct: 1,
  },
];

export const QUIZ_ORDER = ["question-1", "question-2"];
