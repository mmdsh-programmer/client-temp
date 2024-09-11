import { IGetGroups } from "@interface/group.interface";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const createGroupAtom = atom<boolean | null>({
  key: "createGroupAtom",
  default: null,
  effects: [logEffect("createGroupAtom")],
});

export const selectedGroupAtom = atom<IGetGroups | undefined>({
  key: "selectedGroupAtom",
  default: undefined,
  effects: [logEffect("selectedGroupAtom")],
});

export const editGroupAtom = atom<boolean | null>({
  key: "editGroupAtom",
  default: null,
  effects: [logEffect("editGroupAtom")],
});

export const deleteGroupAtom = atom<boolean | null>({
  key: "deleteGroupAtom",
  default: null,
  effects: [logEffect("deleteGroupAtom")],
});

export const groupDrawerAtom = atom<boolean | null>({
  key: "groupDrawerAtom",
  default: null,
  effects: [logEffect("groupDrawerAtom")],
});
