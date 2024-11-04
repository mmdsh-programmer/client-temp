import { IDocumentMetadata } from "@interface/document.interface";
import { IVersion } from "@interface/version.interface";
import { logEffect } from "@utils/index";
import { atom } from "recoil";

export const publishVersionAtom = atom<IVersion | null>({
  key: "publishVersionAtom",
  default: null,
  effects: [logEffect("publishVersionAtom")],
});

export const publishPageSelectedDocumentAtom = atom<IDocumentMetadata | null>({
  key: "publishPageSelectedDocument",
  default: null,
  effects: [logEffect("publishPageSelectedDocument")],
});

export const openPublishPageSearchContent = atom<boolean>({
  key: "openPublishPageSearchContent",
  default: false,
  effects: [logEffect("openPublishPageSearchContent")],
});
