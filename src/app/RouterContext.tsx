import { createContext, ReactNode } from "react";
import { useRouter } from "../hooks/useRouter";
import { useStrictContext } from "../hooks/useStrictContext";

type TRouterContextValue = {
  currentPath: string;
  navigate: (path: string) => void;
};

const RouterContext = createContext<TRouterContextValue | null>(null);

interface RouterProviderProps {
  children: ReactNode;
}

export const RouterProvider = ({ children }: RouterProviderProps) => {
  const router = useRouter();

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

export const useRouterContext = (): TRouterContextValue => {
  const context = useStrictContext<TRouterContextValue>(
    RouterContext,
    "RouterContext"
  );

  return context;
};
