import type { Question } from "../types/quiz";

const QUIZ_QUESTIONS: Question[] = [
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

const QUIZ_ORDER = ["question-1", "question-2"];

interface QuizService {
  getQuestionById: (id: string) => Question | undefined;
  getQuestionByIndex: (index: number) => Question | undefined;
  getQuestionIndex: (questionId: string) => number;
  getTotalQuestions: () => number;
  getFirstQuestionId: () => string | undefined;
  getNextQuestionId: (currentId: string) => string | undefined;
  isLastQuestion: (questionId: string) => boolean;
  getAllQuestions: () => Question[];
  getQuestionOrder: () => string[];
  isValidQuestionId: (id: string) => boolean;
}

export const createQuizService = (): QuizService => {
  return {
    getQuestionById: (id: string) => {
      return QUIZ_QUESTIONS.find((q) => q.id === id);
    },

    getQuestionByIndex: (index: number) => {
      const questionId = QUIZ_ORDER[index];
      if (!questionId) return undefined;
      return QUIZ_QUESTIONS.find((q) => q.id === questionId);
    },

    getQuestionIndex: (questionId: string) => {
      return QUIZ_ORDER.indexOf(questionId);
    },

    getTotalQuestions: () => {
      return QUIZ_ORDER.length;
    },

    getFirstQuestionId: () => {
      return QUIZ_ORDER[0];
    },

    getNextQuestionId: (currentId: string) => {
      const currentIndex = QUIZ_ORDER.indexOf(currentId);
      return QUIZ_ORDER[currentIndex + 1];
    },

    isLastQuestion: (questionId: string) => {
      const index = QUIZ_ORDER.indexOf(questionId);
      return index === QUIZ_ORDER.length - 1;
    },

    getAllQuestions: () => {
      return QUIZ_ORDER.map((id) =>
        QUIZ_QUESTIONS.find((q) => q.id === id)
      ).filter((q): q is Question => q !== undefined);
    },

    getQuestionOrder: () => {
      return [...QUIZ_ORDER];
    },

    isValidQuestionId: (id: string) => {
      return QUIZ_ORDER.includes(id);
    },
  };
};

export const quizService = createQuizService();
