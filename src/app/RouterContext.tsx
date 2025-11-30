import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "../hooks/useRouter";

interface RouterContextValue {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => {
  const router = useRouter();

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

export const useRouterContext = (): RouterContextValue => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useRouterContext must be used within RouterProvider");
  }

  return context;
};
