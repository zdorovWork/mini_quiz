import { ComponentProps, useEffect, useState } from "react";
import { useRouterContext } from "../app/state";
import { useQuizState } from "../hooks/useQuizState";
import { quizService } from "../utils/quizService";
import QuestionPageLayout from "./components/QuestionPageLayout";
import { Button, Typography } from "../components";
import ButtonList from "./components/ButtonList";
import { useModal } from "../app/ModalContext";
import { ROUTES } from "../types/router";
import { EmailModal } from "./modals/EmailModal/EmailModal";

type TEmailModalProps = ComponentProps<
  typeof EmailModal
>["closeModal"] extends (data: infer T | null) => void
  ? T
  : never;

const QuestionPage = ({ questionId }: { questionId: string }) => {
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

  if (!question || questionIndex === -1) {
    return (
      <div>
        <Typography>Question not found</Typography>
      </div>
    );
  }

  return (
    <>
      <QuestionPageLayout
        label={
          <Typography size="small" color="secondary" weight="medium">
            Question {questionIndex + 1} of {quizService.getTotalQuestions()}
          </Typography>
        }
        title={
          <Typography size="xlarge" weight="bold" as="h1">
            {question.text}
          </Typography>
        }
        options={
          <ButtonList
            items={question.options}
            selectedIndex={selectedAnswer}
            onItemClick={(index) => handleAnswerSelect(index)}
          />
        }
        nextButton={
          <Button
            variant="primary"
            fullWidth
            onClick={
              isLastQuestion && areAllQuestionsAnswered()
                ? handleComplete
                : handleNext
            }
            disabled={selectedAnswer === null}
          >
            {isLastQuestion && areAllQuestionsAnswered() ? "Complete" : "Next"}
          </Button>
        }
      />
    </>
  );
};

export default QuestionPage;
