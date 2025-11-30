import { useRouterContext } from "./RouterContext";
import type { Routes } from "../types/router";

interface RouterProps {
  routes: Routes;
}

export const Router = ({ routes }: RouterProps) => {
  const { currentPath } = useRouterContext();

  const currentRoute = routes.find((route) => route.path === currentPath);

  if (!currentRoute) {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  return <>{currentRoute.element}</>;
};
