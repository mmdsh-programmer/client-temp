import { ERepoGrouping } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import { atom } from "recoil";

export const repoGrouping = atom<ERepoGrouping>({
  key: "repoGrouping",
  default: ERepoGrouping.MY_REPO,
});

export const repoAtom = atom<IRepo | null>({
  key: "repoAtom",
  default: null
})

export const repoInfoAtom = atom<IRepo | null>({
  key: "repoInfoAtom",
  default: null
})

export const repoActionDrawerAtom = atom<boolean | null>({
  key: "repoActionDrawerAtom",
  default: null
})
