import { RouterProvider } from "./RouterContext";
import { Router } from "./router";
import HomePage from "../pages/HomePage";
import QuestionOnePage from "../pages/QuestionOnePage";
import QuestionTwoPage from "../pages/QuestionTwoPage";
import ResultsPage from "../pages/ResultsPage";
import { ROUTES, type TRoutes } from "../types/router";

const routes: TRoutes = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.QUESTION_1, element: <QuestionOnePage /> },
  { path: ROUTES.QUESTION_2, element: <QuestionTwoPage /> },
  { path: ROUTES.RESULTS, element: <ResultsPage /> },
];

const App = () => {
  return (
    <RouterProvider>
      <Router routes={routes} />
    </RouterProvider>
  );
};

export default App;
