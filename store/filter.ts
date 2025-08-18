import { create } from "zustand";
import { IChildrenFilter, IReportFilter } from "@interface/app.interface";

interface FilterState {
  filterChildren: IChildrenFilter | null;
  setFilterChildren: (filter: IChildrenFilter | null) => void;
  filterReport: IReportFilter | null;
  setFilterReport: (filter: IReportFilter | null) => void;
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
