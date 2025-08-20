import { create } from "zustand";
import { ERepoGrouping } from "@interface/enums";

interface RepoSearchParamState {
  repoSearchParam: {
    repoType: ERepoGrouping;
    search?: string;
  } | null;
  setRepoSearchParam: (param: {
    repoType: ERepoGrouping;
    search?: string;
  } | null) => void;
}

export const useRepoSearchParamStore = create<RepoSearchParamState>((set) => {
  return {
    repoSearchParam: null,
    setRepoSearchParam: (param) => {
      set({ repoSearchParam: param });
    },
  };
});
