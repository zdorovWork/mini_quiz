import { useEffect, useState } from "react";

interface UseRouterReturn {
  currentPath: string;
  navigate: (path: string) => void;
  replace: (path: string) => void;
  getParam: (paramName: string) => string | null;
}

export const useRouter = (): UseRouterReturn => {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const replace = (path: string) => {
    window.history.replaceState({}, "", path);
    setCurrentPath(path);
  };

  const getParam = (paramName: string): string | null => {
    const pathParts = currentPath.split("/").filter(Boolean);
    const paramIndex = pathParts.findIndex((part) => part === paramName);
    const value = pathParts[paramIndex + 1];
    return paramIndex !== -1 && value ? value : null;
  };

  return {
    currentPath,
    navigate,
    replace,
    getParam,
  };
};
