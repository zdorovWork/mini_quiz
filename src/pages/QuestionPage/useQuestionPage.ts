import { useState, useEffect } from "react";
import { useRouterContext } from "../../app/state";
import { useQuizState } from "../../hooks/useQuizState";
import { quizService } from "../../utils/quizService";
import { useModal } from "../../app/ModalContext";
import { ROUTES } from "../../types/router";
import { EmailModal } from "./modals/EmailModal/EmailModal";
import { ComponentProps } from "react";

type TEmailModalProps = ComponentProps<
  typeof EmailModal
>["closeModal"] extends (data: infer T | null) => void
  ? T
  : never;

export const useQuestionPage = (questionId: string) => {
  const { replace, navigate } = useRouterContext();
  const {
    state,
    setAnswer,
    isAnsweredQuetionsBeftore,
    getLastAnsweredQuestionId,
    setEmail,
    areAllQuestionsAnswered,
    getNextQuestionId,
    hasAlreadyResults,
    getAnswer,
  } = useQuizState();

  const { showModal } = useModal<TEmailModalProps>()(EmailModal);

  const question = quizService.getQuestionById(questionId);
  const questionIndex = quizService.getQuestionIndex(questionId);
  const isLastQuestion = quizService.isLastQuestion(questionId);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    getAnswer(questionId)
  );

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setAnswer(questionId, index);
  };

  const handleComplete = async () => {
    if (selectedAnswer === null) return;

    if (hasAlreadyResults()) {
      navigate(ROUTES.RESULTS);
      return;
    }

    const result = await showModal({
      initialEmail: state.email || undefined,
    });
    if (result) {
      setEmail(result.email);
      navigate(ROUTES.RESULTS);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const nextQuestionId = getNextQuestionId(questionId);
    if (nextQuestionId) {
      navigate(`${ROUTES.QUESTION}/${nextQuestionId}`);
    }
  };

  useEffect(() => {
    if (!isAnsweredQuetionsBeftore(questionId)) {
      const lastAnsweredQuestionId = getLastAnsweredQuestionId();
      if (lastAnsweredQuestionId) {
        replace(`${ROUTES.QUESTION}/${lastAnsweredQuestionId}`);
      }
    }
  }, [questionId]);

  return {
    question,
    questionIndex,
    isLastQuestion,
    selectedAnswer,
    handleAnswerSelect,
    handleComplete,
    handleNext,
    areAllQuestionsAnswered,
    totalQuestions: quizService.getTotalQuestions(),
  };
};
