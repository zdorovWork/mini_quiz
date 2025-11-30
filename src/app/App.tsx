import { Router } from "./router";
import HomePage from "../pages/HomePage";
import QuestionOnePage from "../pages/QuestionOnePage";
import QuestionTwoPage from "../pages/QuestionTwoPage";
import ResultsPage from "../pages/ResultsPage";
import type { Routes } from "../types/router";

const routes: Routes = [
  { path: "/", element: <HomePage /> },
  { path: "/question-1", element: <QuestionOnePage /> },
  { path: "/question-2", element: <QuestionTwoPage /> },
  { path: "/results", element: <ResultsPage /> },
];

const App = () => {
  return <Router routes={routes} />;
};

export default App;
