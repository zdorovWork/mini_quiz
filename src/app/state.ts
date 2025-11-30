import type { QuizState } from "../types/quiz";

export { useRouterContext } from "./RouterContext";

const STORAGE_KEY = "quiz-state";

const defaultState: QuizState = {
  answers: {},
  email: null,
};

const isValidQuizState = (data: unknown): data is QuizState => {
  if (!data || typeof data !== "object") return false;

  const state = data as Partial<QuizState>;

  const hasValidAnswers =
    state.answers !== undefined &&
    typeof state.answers === "object" &&
    !Array.isArray(state.answers);

  const hasValidEmail =
    state.email === null ||
    (typeof state.email === "string" && state.email.length > 0);

  return hasValidAnswers && hasValidEmail;
};

export const loadState = (): QuizState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;

    const parsed = JSON.parse(stored);
    if (!isValidQuizState(parsed)) {
      console.warn("Invalid state structure, using default state");
      return defaultState;
    }

    return parsed;
  } catch (error) {
    console.error("Failed to load state:", error);
    return defaultState;
  }
};

export const saveState = (partial: Partial<QuizState>): void => {
  try {
    const current = loadState();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save state:", error);
  }
};

export const resetState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to reset state:", error);
  }
};
