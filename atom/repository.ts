import { ERepoGrouping } from "@interface/enums";
import { IPublicKey, IRepo } from "@interface/repo.interface";
import { logger } from "@utils/index";
import { atom } from "recoil";

export const repoGrouping = atom<ERepoGrouping>({
  key: "repoGrouping",
  default: ERepoGrouping.DASHBOARD,
});

export const repoAtom = atom<IRepo | null>({
  key: "repoAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        if (newValue) {
          localStorage.setItem(
            "CLASOR:SELECTED_REPO",
            JSON.stringify(newValue),
          );
        } else {
          localStorage.removeItem("CLASOR:SELECTED_REPO");
        }
        logger("repo", newValue, oldValue);
      });
    },
  ],
});

export const repositoryId = atom<number | null>({
  key: "repositoryId",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("repo", oldValue, newValue);
      });
    },
  ],
});

export const repoMenuAtom = atom<IRepo | null>({
  key: "repoMenuAtom",
  default: null,
});

export const repoInfoAtom = atom<IRepo | undefined>({
  key: "repoInfoAtom",
  default: undefined,
});

export const repoActionDrawerAtom = atom<boolean | null>({
  key: "repoActionDrawerAtom",
  default: null,
});

export const repoSearchParamAtom = atom<{
  repoType: ERepoGrouping;
  search?: string;
} | null>({
  key: "repoSearchParamAtom",
  default: null,
});
export const deleteRepoKeyAtom = atom<IPublicKey | null>({
  key: "deleteRepoKeyAtom",
  default: null,
});

export const createRepoKeyAtom = atom<boolean>({
  key: "createRepoKeyAtom",
  default: false,
});
