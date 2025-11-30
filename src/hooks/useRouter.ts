import { useEffect, useState } from "react";

interface UseRouterReturn {
  currentPath: string;
  navigate: (path: string) => void;
}

const NAVIGATE_EVENT = "navigate";

export const useRouter = (): UseRouterReturn => {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.pathname
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleNavigate = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener(NAVIGATE_EVENT, handleNavigate);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener(NAVIGATE_EVENT, handleNavigate);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
  };

  return {
    currentPath,
    navigate,
  };
};
