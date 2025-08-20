import { create } from "zustand";

interface IRepoFeed {
  label: string;
  value: number;
}

export const useFeedStore = create<{
  repoFeed: IRepoFeed | null;
  setRepoFeed: (feed: IRepoFeed | null) => void;
}>((set) => {
  return {
    repoFeed: null,
    setRepoFeed: (feed) => {
      return set({ repoFeed: feed });
    },
  };
});
