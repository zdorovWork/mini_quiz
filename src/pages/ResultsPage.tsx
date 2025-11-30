import { useRouterContext } from "../app/state";
import { useQuizState } from "../hooks/useQuizState";
import { resetState } from "../app/state";
import { QUIZ_QUESTIONS } from "../utils/questions";
import { Button, Card, Typography } from "../components";
import { ROUTES } from "../types/router";

const ResultsPage = () => {
  const { replace } = useRouterContext();
  const { state } = useQuizState();

  const handleTryAgain = () => {
    resetState();
    replace(ROUTES.QUESTION_1);
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((question) => {
      const userAnswer = state.answers[question.id];
      if (userAnswer === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const total = QUIZ_QUESTIONS.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <Card>
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <Typography size="xlarge" weight="bold" as="h1">
              Quiz Results
            </Typography>
            <div style={{ marginTop: "16px" }}>
              <Typography size="large" weight="semibold" color="primary">
                Score: {score} / {total}
              </Typography>
            </div>
          </div>

          {state.email && (
            <div
              style={{
                marginBottom: "32px",
                padding: "16px",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
              }}
            >
              <Typography size="small" color="secondary" weight="medium">
                Email
              </Typography>
              <Typography size="medium" weight="medium">
                {state.email}
              </Typography>
            </div>
          )}

          <div style={{ marginBottom: "32px" }}>
            <Typography
              size="large"
              weight="semibold"
              as="h2"
              style={{ marginBottom: "16px" }}
            >
              Your Answers
            </Typography>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {QUIZ_QUESTIONS.map((question, index) => {
                const userAnswer = state.answers[question.id];
                const isCorrect = userAnswer === question.correct;

                return (
                  <div
                    key={question.id}
                    style={{
                      padding: "20px",
                      backgroundColor: "#ffffff",
                      border: `2px solid ${isCorrect ? "#16a34a" : "#dc2626"}`,
                      borderRadius: "8px",
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>
                      <Typography
                        size="small"
                        color="secondary"
                        weight="medium"
                      >
                        Question {index + 1}
                      </Typography>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <Typography size="medium" weight="semibold">
                        {question.text}
                      </Typography>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "20px",
                          }}
                        >
                          {isCorrect ? "✅" : "❌"}
                        </span>
                        <Typography
                          size="small"
                          weight="medium"
                          color="secondary"
                        >
                          Your answer:
                        </Typography>
                      </div>
                      <Typography
                        size="medium"
                        weight="medium"
                        color={isCorrect ? "success" : "error"}
                      >
                        {userAnswer !== null && userAnswer !== undefined
                          ? question.options[userAnswer]
                          : "No answer selected"}
                      </Typography>
                    </div>

                    {!isCorrect && (
                      <div>
                        <Typography
                          size="small"
                          weight="medium"
                          color="secondary"
                        >
                          Correct answer:
                        </Typography>
                        <Typography
                          size="medium"
                          weight="medium"
                          color="success"
                        >
                          {question.options[question.correct]}
                        </Typography>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={handleTryAgain}>
            Try Again
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ResultsPage;
