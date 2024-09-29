import { IDocumentMetadata } from "@interface/document.interface";
import { IRepo } from "@interface/repo.interface";
import { IVersion } from "@interface/version.interface";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const selectedVersionAtom = atom<IVersion | null>({
  key: "selectedVersionAtom",
  default: null,
  effects: [logEffect("selectedVersionAtom")],
});

export const versionListAtom = atom<boolean | null>({
  key: "versionListAtom",
  default: null,
  effects: [logEffect("versionListAtom")],
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
  effects: [logEffect("compareVersionAtom")],
});

export const versionModalListAtom = atom<boolean | null>({
  key: "versionModalList",
  default: null,
  effects: [logEffect("versionModalList")],
});

export const versionDrawerAtom = atom<boolean | null>({
  key: "versionDrawerAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logEffect("versionDrawerAtom");
      });
    },
  ],
});