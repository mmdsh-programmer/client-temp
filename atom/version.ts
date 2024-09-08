import { IDocumentMetadata } from "@interface/document.interface";
import { IRepo } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";
import { logger } from "@utils/index";
import { atom } from "recoil";

export const selectedVersionAtom = atom<IVersion | null>({
  key: "selectedVersionAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("selectedVersionAtom", newValue, oldValue);
      });
    },
  ],
});

export const versionListAtom = atom<boolean | null>({
  key: "versionList",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("versionList", newValue, oldValue);
      });
    },
  ],
});

export const compareVersionAtom = atom<{
  version: {
    data: IVersion;
    document: IDocumentMetadata;
    repo: IRepo;
  } | null;
  compare: {
    data: IVersion;
    document: IDocumentMetadata;
    repo: IRepo;
  } | null;
} | null>({
  key: "compareVersionAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("compareVersionAtom", newValue, oldValue);
      });
    },
  ],
});

export const versionModalListAtom = atom<"SHOW" | "HIDE" | null>({
  key: "versionModalList",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("versionModalList", newValue, oldValue);
      });
    },
  ],
});
