import { create } from "zustand";

export interface ISortProps {
  order?: "asc" | "desc";
  type?: "asc" | "desc";
  name?: "asc" | "desc";
  createdAt?: "asc" | "desc";
}

interface SortState {
  sort: ISortProps;
  setSort: (sort: ISortProps) => void;
}

export const useSortStore = create<SortState>((set) => {
  return {
    sort: {
      order: "asc",
      type: "asc",
      name: "asc",
      createdAt: "asc",
    },
    setSort: (sort) => {
      return set({ sort });
    },
  };
});
