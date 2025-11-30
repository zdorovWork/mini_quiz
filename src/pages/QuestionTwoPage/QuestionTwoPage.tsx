import { ComponentProps, useState } from "react";
import { useRouterContext } from "../../app/RouterContext";
import { useQuizState } from "../../hooks/useQuizState";
import { QUIZ_QUESTIONS } from "../../utils/questions";
import { ROUTES } from "../../types/router";
import QuestionPageLayout from "../components/QuestionPageLayout";
import { Button, Typography } from "../../components";
import ButtonList from "../components/QuestionPageLayout/ButtonList";
import { EmailModal } from "./modals/EmailModal/EmailModal";
import { useModal } from "../../app/ModalContext";

type TEmailModalProps = ComponentProps<
  typeof EmailModal
>["closeModal"] extends (data: infer T | null) => void
  ? T
  : never;

const QuestionTwoPage = () => {
  const { navigate } = useRouterContext();
  const { state, setAnswer, setEmail } = useQuizState();
  const question = QUIZ_QUESTIONS[1];

  const { showModal } = useModal<TEmailModalProps>()(EmailModal);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    state.answers[question?.id ?? ""] ?? null
  );

  if (!question) {
    return (
      <div>
        <Typography>Question not found</Typography>
      </div>
    );
  }

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setAnswer(question.id, index);
  };

  const handleComplete = async () => {
    if (selectedAnswer !== null) {
      const result = await showModal({
        initialEmail: state.email || undefined,
      });
      if (result) {
        setEmail(result.email);
        navigate(ROUTES.RESULTS);
      }
    }
  };

  return (
    <QuestionPageLayout
      label={
        <Typography size="small" color="secondary" weight="medium">
          Question {2} of {2}
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
          onClick={handleComplete}
          disabled={selectedAnswer === null}
        >
          Complete
        </Button>
      }
    />
  );
};

export default QuestionTwoPage;
