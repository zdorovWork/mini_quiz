export const ROUTES = {
  HOME: "/",
  QUESTION: "/question",
  RESULTS: "/results",
};

export type TRoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export type TRoute = {
  path: TRoutePath;
  element: JSX.Element;
};

export type TRoutes = TRoute[];
