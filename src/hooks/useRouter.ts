import { useEffect, useState } from "react";

interface UseRouterReturn {
  currentPath: string;
  navigate: (path: string) => void;
}

export const useRouter = (): UseRouterReturn => {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return { currentPath, navigate };
};
