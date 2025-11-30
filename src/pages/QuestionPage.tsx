import { ComponentProps, useEffect, useState } from "react";
import { useRouterContext } from "../app/state";
import { useQuizState } from "../hooks/useQuizState";
import { QUIZ_QUESTIONS, QUIZ_ORDER } from "../utils/questions";
import QuestionPageLayout from "./components/QuestionPageLayout";
import { Button, Typography } from "../components";
import ButtonList from "./components/QuestionPageLayout/ButtonList";
import { useModal } from "../app/ModalContext";
import { EmailModal } from "./QuestionTwoPage/modals/EmailModal/EmailModal";
import { ROUTES } from "../types/router";

type TEmailModalProps = ComponentProps<
  typeof EmailModal
>["closeModal"] extends (data: infer T | null) => void
  ? T
  : never;

const QuestionPage = () => {
  const { replace, navigate, currentPath } = useRouterContext();
  const {
    state,
    setAnswer,
    isAnsweredQuetionsBeftore,
    getLastAnsweredQuestionId,
    setEmail,
    areAllQuestionsAnswered,
    getNextQuestionId,
  } = useQuizState();

  const { showModal } = useModal<TEmailModalProps>()(EmailModal);

  const questionId = currentPath.split("/").pop() || "";
  const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
  const questionIndex = QUIZ_ORDER.indexOf(questionId);
  const isLastQuestion = questionIndex === QUIZ_ORDER.length - 1;

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setAnswer(questionId, index);
  };

  const handleComplete = async () => {
    if (selectedAnswer === null) return;

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
      navigate(`/question/${nextQuestionId}`);
    }
  };

  useEffect(() => {
    if (!isAnsweredQuetionsBeftore(questionId)) {
      const lastAnsweredQuestionId = getLastAnsweredQuestionId();
      if (lastAnsweredQuestionId) {
        // TODO: move to routes object ROUTES
        replace(`/question/${lastAnsweredQuestionId}`);
      }
    }
  }, [questionId]);

  // TODO: should be reailzed via key
  useEffect(() => {
    setSelectedAnswer(state.answers[questionId] ?? null);
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
            Question {questionIndex + 1} of {QUIZ_ORDER.length}
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
