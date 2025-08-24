import { create } from "zustand";

export type CategoryListMode = "table" | "tree";

export const useAppStore = create<{
  categoryListMode: CategoryListMode;
  setCategoryListMode: (mode: CategoryListMode) => void;
}>((set) => {
  return {
    categoryListMode: "table",
    setCategoryListMode: (mode) => {
      return set({ categoryListMode: mode });
    },
  };
});


