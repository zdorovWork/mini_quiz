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

  return {
    currentPath,
    navigate,
  };
};
