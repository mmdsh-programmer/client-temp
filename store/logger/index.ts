/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";

type SetArgument<T> = Partial<T> | ((state: T) => Partial<T> | T) | T;

type Action = { type?: string } | string;

export const logger = <T>(config: StateCreator<T>, name?: string): StateCreator<T> => {
  return (set, get, api) => {
    return config(
      (args: SetArgument<T>, replace?: boolean, action?: Action) => {
        const actionName = typeof action === "string" ? action : action?.type || "N/A";

        console.group(name || "Zustand Action");
        console.log("  Action:", actionName);
        console.log("  prev state", get());

        (set as any)(args, replace, action);

        console.log("  next state", get());
        console.groupEnd();
      },
      get,
      api,
    );
  };
};
