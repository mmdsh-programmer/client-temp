import { atom } from "recoil";
import { IVersion } from "interface/version.interface";
import { logEffect } from "@utils/index";

export const editorModalAtom = atom<boolean>({
  key: "editorModalAtom",
  default: false,
  effects: [logEffect("editorModalAtom")],
});

export const editorModeAtom = atom<"edit" | "preview" | "temporaryPreview">({
  key: "editorModeAtom",
  default: "preview",
  effects: [logEffect("editorModeAtom")],
});

export const editorDataAtom = atom<IVersion | null>({
  key: "editorDataAtom",
  default: null,
  effects: [logEffect("editorDataAtom")],
});

export const editorListDrawerAtom = atom<boolean>({
  key: "editorListDrawerAtom",
  default: false,
  effects: [logEffect("editorListDrawerAtom")],
});

export const editorDecryptedContentAtom = atom<string | null>({
  key: "editorDecryptedContentAtom",
  default: null,
  effects: [logEffect("editorDecryptedContentAtom")],
});

export const editorPublicKeyAtom = atom<string | null>({
  key: "editorPublicKeyAtom",
  default: null,
  effects: [logEffect("editorPublicKeyAtom")],
});

export const postIdAtom = atom<number | null>({
  key: "postIdAtom",
  default: null,
});
