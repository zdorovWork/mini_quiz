export const ROUTES = {
  HOME: "/",
  QUESTION_1: "/question-1",
  QUESTION_2: "/question-2",
  RESULTS: "/results",
};

export type TRoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export type TRoute = {
  path: TRoutePath;
  element: JSX.Element;
};

export type TRoutes = TRoute[];
