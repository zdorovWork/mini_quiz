export interface Question {
  id: string;
  text: string;
  options: string[];
  correct: number;
}

export interface QuizState {
  answers: Record<string, number | null>;
  email: string | null;
  step: number;
}
