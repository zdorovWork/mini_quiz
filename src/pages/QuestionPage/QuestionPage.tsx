import { Button, Typography } from "../../components";
import ButtonList from "./components/ButtonList";
import QuestionPageLayout from "./components/QuestionPageLayout";
import { useQuestionPage } from "./useQuestionPage";

const QuestionPage = ({ questionId }: { questionId: string }) => {
  const {
    question,
    questionIndex,
    isLastQuestion,
    selectedAnswer,
    handleAnswerSelect,
    handleComplete,
    handleNext,
    areAllQuestionsAnswered,
    totalQuestions,
  } = useQuestionPage(questionId);

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
            Question {questionIndex + 1} of {totalQuestions}
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
