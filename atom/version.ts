import { IDocumentMetadata } from "@interface/document.interface";
import { IVersion } from "@interface/version.interface";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const selectedVersionAtom = atom<IVersion | null>({
  key: "selectedVersionAtom",
  default: null,
  effects: [logEffect("selectedVersionAtom")],
});

export const compareVersionAtom = atom<{
  version: { 
    data: IVersion;
    document: IDocumentMetadata;
    repoId: number;
  } | null;
  compare: {
    data: IVersion;
    document: IDocumentMetadata;
    repoId: number;
  } | null;
} | null>({
  key: "compareVersionAtom",
  default: null,
  effects: [logEffect("compareVersionAtom")],
});

export const versionModalListAtom = atom<boolean>({
  key: "versionModalList",
  default: false,
  effects: [logEffect("versionModalList")],
});

export const versionDrawerAtom = atom<boolean | null>({
  key: "versionDrawerAtom",
  default: null,
  effects: [logEffect("versionDrawerAtom")],
});
