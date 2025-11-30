import { useRouterContext } from "./RouterContext";
import type { TRoutes } from "../types/router";

interface RouterProps {
  routes: TRoutes;
}

const matchRoute = (routePath: string, currentPath: string): boolean => {
  const routeParts = routePath.split("/").filter(Boolean);
  const currentParts = currentPath.split("/").filter(Boolean);

  if (routeParts.length !== currentParts.length) return false;

  return routeParts.every((routePart, index) => {
    if (routePart.startsWith(":")) return true;
    return routePart === currentParts[index];
  });
};

export const Router = ({ routes }: RouterProps) => {
  const { currentPath } = useRouterContext();

  const currentRoute = routes.find((route) =>
    matchRoute(route.path, currentPath)
  );

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
