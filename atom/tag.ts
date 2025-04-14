import { ITag } from "@interface/tags.interface";
import { atom } from "recoil";
import { logEffect } from "@utils/index";
import { IDomainTag } from "@interface/domain.interface";

export const createTagAtom = atom<boolean | null>({
  key: "createTagAtom",
  default: null,
  effects: [logEffect("createTagAtom")],
});

export const selectedTagAtom = atom<ITag | IDomainTag | undefined>({
  key: "selectedTagAtom",
  default: undefined,
  effects: [logEffect("selectedTagAtom")],
});

export const editTagAtom = atom<boolean | null>({
  key: "editTagAtom",
  default: null,
  effects: [logEffect("editTagAtom")],
});

export const deleteTagAtom = atom<boolean | null>({
  key: "deleteTagAtom",
  default: null,
  effects: [logEffect("deleteTagAtom")],
});

export const tagDrawerAtom = atom<boolean | null>({
  key: "tagDrawerAtom",
  default: null,
  effects: [logEffect("tagDrawerAtom")],
});
