import { logEffect } from "@utils/index";
import { atom } from "recoil";

interface IRepoFeed {
  label: string;
  value: number;
}

export const repoFeedAtom = atom<IRepoFeed | null>({
  key: "repoFeedAtom",
  default: null,
  effects: [logEffect("repoFeedAtom")],
});
