import { useRouterContext } from "../app/state";
import { Button, Card, Typography } from "../components";

const HomePage = () => {
  const { navigate } = useRouterContext();

  const handleStart = () => {
    navigate("/question-1");
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
          <div style={{ marginBottom: "24px", textAlign: "center" }}>
            <Typography size="xlarge" weight="bold" as="h1">
              Welcome to Mini Quiz
            </Typography>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <Typography size="medium" color="secondary" align="center">
              Test your knowledge with our quick 2-question quiz. Your progress
              will be automatically saved, so you can continue later if needed.
            </Typography>
          </div>

          <Button variant="primary" fullWidth onClick={handleStart}>
            Start Quiz
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
