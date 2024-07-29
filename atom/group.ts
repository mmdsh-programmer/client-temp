import { atom } from "recoil";
import { IGetGroups } from "@interface/group.interface";

export const createGroupAtom = atom<boolean | null>({
  key: "createGroupAtom",
  default: null,
});

export const selectedGroupAtom = atom<IGetGroups | undefined>({
  key: "selectedGroupAtom",
  default: undefined,
});

export const editGroupAtom = atom<boolean | null>({
  key: "editGroupAtom",
  default: null,
});

export const deleteGroupAtom = atom<boolean | null>({
  key: "deleteGroupAtom",
  default: null,
});

export const groupDrawerAtom = atom<boolean | null>({
  key: "groupDrawerAtom",
  default: null,
});
