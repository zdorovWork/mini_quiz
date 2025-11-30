import { useState } from "react";
import { useRouter } from "../app/state";
import { useQuizState } from "../hooks/useQuizState";
import { QUIZ_QUESTIONS } from "../utils/questions";
import { Button, Card, Typography } from "../components";

const QuestionOnePage = () => {
  const { navigate } = useRouter();
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
      navigate("/question-2");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f9fafb",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <Card>
          <div style={{ marginBottom: "24px" }}>
            <Typography size="small" color="secondary" weight="medium">
              Question 1 of 2
            </Typography>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <Typography size="xlarge" weight="bold" as="h1">
              {question.text}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "primary" : "secondary"}
                fullWidth
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </Button>
            ))}
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            Next
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuestionOnePage;
