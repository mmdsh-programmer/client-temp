import { ITag } from "@interface/tags.interface";
import { atom } from "recoil";
import { logger } from "@utils/index";

export const createTagAtom = atom<boolean | null>({
  key: "createTagAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("createTagAtom", newValue, oldValue);
      });
    },
  ],
});

export const selectedTagAtom = atom<ITag | undefined>({
  key: "selectedTagAtom",
  default: undefined,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("selectedTagAtom", newValue, oldValue);
      });
    },
  ],
});

export const editTagAtom = atom<boolean | null>({
  key: "editTagAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editTagAtom", newValue, oldValue);
      });
    },
  ],
});

export const deleteTagAtom = atom<boolean | null>({
  key: "deleteTagAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("deleteTagAtom", newValue, oldValue);
      });
    },
  ],
});

export const tagDrawerAtom = atom<boolean | null>({
  key: "tagDrawerAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("tagDrawerAtom", newValue, oldValue);
      });
    },
  ],
});