import { create } from "zustand";

interface RepoSearchParamState {
  repoSearchParam: string | null;
  setRepoSearchParam: (param: string | null) => void;
}

export const useRepoSearchParamStore = create<RepoSearchParamState>((set) => {
  return {
    repoSearchParam: null,
    setRepoSearchParam: (param) => {
      set({ repoSearchParam: param });
    },
  };
});
