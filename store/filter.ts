import { create } from "zustand";
import { IChildrenFilter, IRepoResourceFilter } from "@interface/app.interface";

interface FilterState {
  filterChildren: IChildrenFilter | null;
  setFilterChildren: (filter: IChildrenFilter | null) => void;
  filterReport: IRepoResourceFilter | null;
  setFilterReport: (filter: IRepoResourceFilter | null) => void;
}

export const useFilterStore = create<FilterState>((set) => {
  return {
    filterChildren: null,
    setFilterChildren: (filter) => {
      return set({ filterChildren: filter });
    },
    filterReport: null,
    setFilterReport: (filter) => {
      return set({ filterReport: filter });
    },
  };
});
