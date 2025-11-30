import { RouterProvider } from "./RouterContext";
import { Router } from "./router";
import HomePage from "../pages/HomePage";
import QuestionOnePage from "../pages/QuestionOnePage";
import QuestionTwoPage from "../pages/QuestionTwoPage/QuestionTwoPage";
import ResultsPage from "../pages/ResultsPage";
import { ROUTES, type TRoutes } from "../types/router";
import { ModalProvider } from "./ModalContext";

const routes: TRoutes = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.QUESTION_1, element: <QuestionOnePage /> },
  { path: ROUTES.QUESTION_2, element: <QuestionTwoPage /> },
  { path: ROUTES.RESULTS, element: <ResultsPage /> },
];

const App = () => {
  return (
    <ModalProvider>
      <RouterProvider>
        <Router routes={routes} />
      </RouterProvider>
    </ModalProvider>
  );
};

export default App;
