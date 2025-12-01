import { useEffect } from "react";
import { useRouterContext } from "../../app/state";
import { useQuizState } from "../../hooks/useQuizState";
import { quizService } from "../../utils/quizService";
import { ROUTES } from "../../types/router";

export const useResultsPage = () => {
  const { replace } = useRouterContext();
  const {
    state,
    getLastAnsweredQuestionId,
    areAllQuestionsAnswered,
    resetProgress,
  } = useQuizState();

  const handleTryAgain = () => {
    resetProgress();
    const firstQuestionId = quizService.getFirstQuestionId();
    if (firstQuestionId) {
      replace(`${ROUTES.QUESTION}/${firstQuestionId}`);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizService.getAllQuestions().forEach((question) => {
      const userAnswer = state.answers[question.id];
      if (userAnswer === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const total = quizService.getTotalQuestions();

  useEffect(() => {
    if (!areAllQuestionsAnswered()) {
      const lastAnsweredQuestionId = getLastAnsweredQuestionId();
      if (lastAnsweredQuestionId) {
        replace(`${ROUTES.QUESTION}/${lastAnsweredQuestionId}`);
      }
    }
  }, []);

  return {
    state,
    handleTryAgain,
    score,
    total,
    allQuestions: quizService.getAllQuestions(),
  };
};
