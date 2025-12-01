import { RouterProvider } from "./RouterContext";
import { Router } from "./router";
import HomePage from "../pages/HomePage";
import ResultsPage from "../pages/ResultsPage";
import { ROUTES, type TRoutes } from "../types/router";
import { ModalProvider } from "./ModalContext";
import { QuestionPageWrapper } from "../pages/QuestionPageWrapper";

const routes: TRoutes = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: "/question/:questionId", element: <QuestionPageWrapper /> },
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
