import { useRef } from "react";
import { loadState, saveState, resetState } from "../app/state";
import type { QuizState } from "../types/quiz";
import { quizService } from "../utils/quizService";

interface UseQuizStateReturn {
  state: QuizState;
  setAnswer: (questionId: string, index: number) => void;
  setEmail: (email: string) => void;
  isAnsweredQuetionsBeftore: (questionId: string) => boolean;
  areAllQuestionsAnswered: () => boolean;
  getLastAnsweredQuestionId: () => string | undefined;
  getNextQuestionId: (questionId: string) => string | undefined;
  hasAlreadyResults: () => boolean;
  resetProgress: () => void;
  getAnswer: (questionId: string) => number | null;
}

export const useQuizState = () => {
  const stateRef = useRef<QuizState>(loadState());

  const setAnswer = (questionId: string, index: number) => {
    const newState = {
      ...stateRef.current,
      answers: {
        ...stateRef.current.answers,
        [questionId]: index,
      },
    };
    stateRef.current = newState;
    saveState(newState);
  };

  const setEmail = (email: string) => {
    saveState({
      ...stateRef.current,
      email,
    });
  };

  // TODO: can combine with getLastAnsweredQuestionId
  const isAnsweredQuetionsBeftore = (questionId: string) => {
    const questionIndex = quizService.getQuestionIndex(questionId);
    const questionsBefore = quizService
      .getQuestionOrder()
      .slice(0, questionIndex);
    return questionsBefore.every(
      (qId) =>
        stateRef.current.answers[qId] !== null &&
        stateRef.current.answers[qId] !== undefined
    );
  };

  const getLastAnsweredQuestionId = () => {
    return quizService
      .getQuestionOrder()
      .find(
        (qId) =>
          stateRef.current.answers[qId] === null ||
          stateRef.current.answers[qId] === undefined
      );
  };

  const areAllQuestionsAnswered = () => {
    return quizService
      .getQuestionOrder()
      .every(
        (qId) =>
          stateRef.current.answers[qId] !== null &&
          stateRef.current.answers[qId] !== undefined
      );
  };

  const getNextQuestionId = (questionId: string) => {
    return quizService.getNextQuestionId(questionId);
  };

  const hasAlreadyResults = () => {
    return (
      stateRef.current.email !== null && stateRef.current.email !== undefined
    );
  };

  const resetProgress = () => {
    resetState();
    stateRef.current = loadState();
  };

  const getAnswer = (questionId: string) => {
    return stateRef.current.answers[questionId] ?? null;
  };

  return {
    state: stateRef.current,
    setAnswer,
    setEmail,
    isAnsweredQuetionsBeftore,
    getLastAnsweredQuestionId,
    areAllQuestionsAnswered,
    getNextQuestionId,
    hasAlreadyResults,
    resetProgress,
    getAnswer,
  } satisfies UseQuizStateReturn;
};
