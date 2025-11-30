import { useState } from "react";
import { useRouterContext } from "../app/state";
import { useQuizState } from "../hooks/useQuizState";
import { QUIZ_QUESTIONS } from "../utils/questions";
import { ROUTES } from "../types/router";
import QuestionPageLayout from "./components/QuestionPageLayout";
import { Button, Typography } from "../components";
import ButtonList from "./components/QuestionPageLayout/ButtonList";

const QuestionOnePage = () => {
  const { navigate } = useRouterContext();
  const { state, setAnswer } = useQuizState();
  const question = QUIZ_QUESTIONS[0];

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

  const handleNext = () => {
    if (selectedAnswer !== null) {
      navigate(ROUTES.QUESTION_2);
    }
  };

  return (
    <QuestionPageLayout
      label={
        <Typography size="small" color="secondary" weight="medium">
          Question {1} of {2}
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
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          Next
        </Button>
      }
    />
  );
};

export default QuestionOnePage;
