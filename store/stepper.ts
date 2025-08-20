import { create } from "zustand";

export type RepoStepperState = {
  repoActiveStep: number;
  setRepoActiveStep: (step: number | ((prev: number) => number)) => void;
  resetRepoActiveStep: () => void;
};

export const useRepoStepperStore = create<RepoStepperState>((set) => {
  return {
    repoActiveStep: 0,
    setRepoActiveStep: (step) => {
      return set((s) => {
        return {
          repoActiveStep:
            typeof step === "function"
              ? (step as (prev: number) => number)(s.repoActiveStep)
              : step,
        };
      });
    },
    resetRepoActiveStep: () => {
      return set({ repoActiveStep: 0 });
    },
  };
});

export type DocumentStepperState = {
  documentActiveStep: number;
  setDocumentActiveStep: (step: number | ((prev: number) => number)) => void;
  resetDocumentActiveStep: () => void;
};

export const useDocumentStepperStore = create<DocumentStepperState>((set) => {
  return {
    documentActiveStep: 0,
    setDocumentActiveStep: (step) => {
      return set((s) => {
        return {
          documentActiveStep:
            typeof step === "function"
              ? (step as (prev: number) => number)(s.documentActiveStep)
              : step,
        };
      });
    },
    resetDocumentActiveStep: () => {
      return set({ documentActiveStep: 0 });
    },
  };
});
