import { useState } from "react";
import { useRouter } from "../app/state";
import { useQuizState } from "../hooks/useQuizState";
import { QUIZ_QUESTIONS } from "../utils/questions";
import { validateEmail } from "../utils/validation";
import { Button, Card, Typography, Modal, Input } from "../components";

const QuestionTwoPage = () => {
  const { navigate } = useRouter();
  const { state, setAnswer, setEmail } = useQuizState();
  const question = QUIZ_QUESTIONS[1];

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(
    state.answers[question?.id ?? ""] ?? null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState(state.email || "");
  const [emailError, setEmailError] = useState("");

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

  const handleComplete = () => {
    if (selectedAnswer !== null) {
      setIsModalOpen(true);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmailInput(value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSaveEmail = () => {
    if (!emailInput.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(emailInput)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmail(emailInput);
    setIsModalOpen(false);
    navigate("/results");
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
              Question 2 of 2
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
            onClick={handleComplete}
            disabled={selectedAnswer === null}
          >
            Complete
          </Button>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ marginBottom: "24px" }}>
          <Typography size="large" weight="bold" as="h2">
            Enter Your Email
          </Typography>
          <Typography size="small" color="secondary">
            We'll send your quiz results to this email address
          </Typography>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <Input
            type="email"
            value={emailInput}
            onChange={handleEmailChange}
            placeholder="your.email@example.com"
            error={emailError}
          />
        </div>

        <Button variant="primary" fullWidth onClick={handleSaveEmail}>
          Save & Continue
        </Button>
      </Modal>
    </div>
  );
};

export default QuestionTwoPage;
