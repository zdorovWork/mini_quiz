import { Context, useContext } from "react";

export const useStrictContext = <T extends Record<string, unknown>>(
  context: Context<T | null>,
  name?: string
): T => {
  const strictContext = useContext(context);

  if (!strictContext) {
    throw new Error("There is no provided context " + name);
  }

  return strictContext;
};
