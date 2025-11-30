import { useEffect, useState } from "react";
import { loadState, saveState } from "../app/state";
import type { QuizState } from "../types/quiz";

interface UseQuizStateReturn {
  state: QuizState;
  setAnswer: (questionId: string, index: number) => void;
  setEmail: (email: string) => void;
  setStep: (step: number) => void;
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

  const setStep = (step: number) => {
    setState((prev) => ({
      ...prev,
      step,
    }));
  };

  return {
    state,
    setAnswer,
    setEmail,
    setStep,
  };
};
