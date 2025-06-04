import { useContext } from "react";
import type React from "react";

export function useSafeContext<T>(
  Context: React.Context<T>,
  contextDisplayName: string,
): NonNullable<T> {
  const context = useContext(Context);

  if (!context) {
    throw Error(`${contextDisplayName} not available in the tree.`);
  }

  return context;
}
