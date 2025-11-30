import { useEffect, useState } from "react";
import { loadState, saveState } from "../app/state";
import type { QuizState } from "../types/quiz";
import { QUIZ_ORDER } from "../utils/questions";

interface UseQuizStateReturn {
  state: QuizState;
  setAnswer: (questionId: string, index: number) => void;
  setEmail: (email: string) => void;
  isAnsweredQuetionsBeftore: (questionId: string) => boolean;
  areAllQuestionsAnswered: () => boolean;
  getLastAnsweredQuestionId: () => string | undefined;
  getNextQuestionId: (questionId: string) => string | undefined;
}

export const useQuizState = (): UseQuizStateReturn => {
  const [state, setState] = useState<QuizState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setAnswer = (questionId: string, index: number) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: index,
      },
    }));
  };

  const setEmail = (email: string) => {
    setState((prev) => ({
      ...prev,
      email,
    }));
  };

  // TODO: can combine with getLastAnsweredQuestionId
  const isAnsweredQuetionsBeftore = (questionId: string) => {
    const questionsBefore = QUIZ_ORDER.slice(0, QUIZ_ORDER.indexOf(questionId));
    return questionsBefore.every(
      (qId) => state.answers[qId] !== null && state.answers[qId] !== undefined
    );
  };

  const getLastAnsweredQuestionId = () => {
    return QUIZ_ORDER.find(
      (qId) => state.answers[qId] === null || state.answers[qId] === undefined
    );
  };

  const areAllQuestionsAnswered = () => {
    return QUIZ_ORDER.every(
      (qId) => state.answers[qId] !== null && state.answers[qId] !== undefined
    );
  };

  const getNextQuestionId = (questionId: string) => {
    const questionIndex = QUIZ_ORDER.indexOf(questionId);
    return QUIZ_ORDER[questionIndex + 1];
  };

  return {
    state,
    setAnswer,
    setEmail,
    isAnsweredQuetionsBeftore,
    getLastAnsweredQuestionId,
    areAllQuestionsAnswered,
    getNextQuestionId,
  };
};
