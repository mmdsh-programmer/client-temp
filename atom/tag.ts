import { ITag } from "@interface/tags.interface";
import { atom } from "recoil";

export const createTagAtom = atom<boolean | null>({
  key: "createTagAtom",
  default: null,
});

export const selectedTagAtom = atom<ITag | undefined>({
  key: "selectedTagAtom",
  default: undefined,
});

export const editTagAtom = atom<boolean | null>({
  key: "editTagAtom",
  default: null,
});

export const deleteTagAtom = atom<boolean | null>({
  key: "deleteTagAtom",
  default: null,
});

export const tagDrawerAtom = atom<boolean | null>({
  key: "tagDrawerAtom",
  default: null,
});
