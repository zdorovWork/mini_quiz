import { useRouterContext } from "../../app/state";
import QuestionPage from "./QuestionPage";

export const QuestionPageWrapper = () => {
  const { currentPath } = useRouterContext();
  const questionId = currentPath.split("/").pop() || "";

  if (!questionId) {
    return <div>Question not found</div>;
  }

  return <QuestionPage questionId={questionId} key={questionId} />;
};
