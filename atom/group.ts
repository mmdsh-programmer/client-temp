import { IGetGroups } from "@interface/group.interface";
import { atom } from "recoil";
import { logger } from "@utils/index";

export const createGroupAtom = atom<boolean | null>({
  key: "createGroupAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("createGroupAtom", newValue, oldValue);
      });
    },
  ],
});

export const selectedGroupAtom = atom<IGetGroups | undefined>({
  key: "selectedGroupAtom",
  default: undefined,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("selectedGroupAtom", newValue, oldValue);
      });
    },
  ],
});

export const editGroupAtom = atom<boolean | null>({
  key: "editGroupAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("editGroupAtom", newValue, oldValue);
      });
    },
  ],
});

export const deleteGroupAtom = atom<boolean | null>({
  key: "deleteGroupAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("deleteGroupAtom", newValue, oldValue);
      });
    },
  ],
});

export const groupDrawerAtom = atom<boolean | null>({
  key: "groupDrawerAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("groupDrawerAtom", newValue, oldValue);
      });
    },
  ],
});
