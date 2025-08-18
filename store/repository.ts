import { create } from "zustand";
import { IRepo } from "@interface/repo.interface";
import { ERepoGrouping } from "@interface/enums";

interface RepositoryState {
  repo: IRepo | null;
  setRepo: (repo: IRepo | null) => void;
  repoGrouping: ERepoGrouping | null;
  setRepoGrouping: (group: ERepoGrouping | null) => void;
  repositoryId: number | null;
  setRepositoryId: (id: number | null) => void;
}

export const useRepositoryStore = create<RepositoryState>((set) => {
  return {
    repo: null,
    setRepo: (repo) => {
      set({ repo });
    },
    repoGrouping: ERepoGrouping.DASHBOARD,
    setRepoGrouping: (group) => {
      set({ repoGrouping: group });
    },
    repositoryId: null,
    setRepositoryId: (id) => {
      set({ repositoryId: id });
    },
  };
});

// Zustand store for repoInfo (replaces repoInfoAtom)
export const useRepoInfoStore = create<{
  repoInfo: IRepo | undefined;
  setRepoInfo: (repo: IRepo | undefined) => void;
}>((set) => {
  return {
    repoInfo: undefined,
    setRepoInfo: (repo) => {
      return set({ repoInfo: repo });
    },
  };
});

// Zustand store for repoActionDrawer (replaces repoActionDrawerAtom)
export const useRepoActionDrawerStore = create<{
  openRepoActionDrawer: boolean | null;
  setOpenRepoActionDrawer: (
    open: boolean | null | ((prev: boolean | null) => boolean | null),
  ) => void;
}>((set) => {
  return {
    openRepoActionDrawer: false,
    setOpenRepoActionDrawer: (open) => {
      if (typeof open === "function") {
        set((state) => {
          return {
            openRepoActionDrawer: (open as (prev: boolean | null) => boolean | null)(
              state.openRepoActionDrawer,
            ),
          };
        });
      } else {
        set({ openRepoActionDrawer: open });
      }
    },
  };
});

// Zustand store for repoActivity (replaces repoActivityAtom)
export const useRepoActivityStore = create<{
  showRepoActivity: boolean;
  setShowRepoActivity: (show: boolean) => void;
}>((set) => {
  return {
    showRepoActivity: false,
    setShowRepoActivity: (show) => {
      return set({ showRepoActivity: show });
    },
  };
});
