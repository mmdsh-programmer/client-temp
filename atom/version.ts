import { IDocumentMetadata } from "@interface/document.interface";
import { IRepo } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";
import { atom } from "recoil";
import { logger } from "@utils/index";

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
  key: "versionListAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("versionListAtom", newValue, oldValue);
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
