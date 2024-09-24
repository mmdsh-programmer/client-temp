import { IPublicKey, IRepo } from "@interface/repo.interface";
import { ERepoGrouping } from "@interface/enums";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const repoGroupingAtom = atom<ERepoGrouping>({
  key: "repoGroupingAtom",
  default: ERepoGrouping.DASHBOARD,
  effects: [logEffect("repoGroupingAtom")],
});

export const repoAtom = atom<IRepo | null>({
  key: "repoAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue) {
          localStorage.setItem(
            "CLASOR:SELECTED_REPO",
            JSON.stringify(newValue),
          );
        } else {
          localStorage.removeItem("CLASOR:SELECTED_REPO");
        }
      });
    },
    logEffect("repoAtom"),
  ],
});

export const repositoryIdAtom = atom<number | null>({
  key: "repositoryIdAtom",
  default: null,
  effects: [logEffect("repositoryIdAtom")],
});

export const repoMenuAtom = atom<IRepo | null>({
  key: "repoMenuAtom",
  default: null,
  effects: [logEffect("repoMenuAtom")],
});

export const repoInfoAtom = atom<IRepo | undefined>({
  key: "repoInfoAtom",
  default: undefined,
  effects: [logEffect("repoInfoAtom")],
});

export const repoActionDrawerAtom = atom<boolean | null>({
  key: "repoActionDrawerAtom",
  default: null,
  effects: [logEffect("repoActionDrawerAtom")],
});

export const repoSearchParamAtom = atom<{
  repoType: ERepoGrouping;
  search?: string;
} | null>({
  key: "repoSearchParamAtom",
  default: null,
  effects: [logEffect("repoSearchParamAtom")],
});

export const deleteRepoKeyAtom = atom<IPublicKey | null>({
  key: "deleteRepoKeyAtom",
  default: null,
  effects: [logEffect("deleteRepoKeyAtom")],
});

export const createRepoKeyAtom = atom<boolean>({
  key: "createRepoKeyAtom",
  default: false,
  effects: [logEffect("createRepoKeyAtom")],
});
