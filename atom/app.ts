import { EListMode } from "@interface/enums";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const listModeAtom = atom<EListMode>({
  key: "listModeAtom",
  default: EListMode.table,
  effects: [logEffect("listModeAtom")],
});

export const categoryListModeAtom = atom<"table" | "tree">({
  key: "categoryListModeAtom",
  default: "table",
  effects: [logEffect("categoryListModeAtom")],
});

export const userIdAtom = atom<null | number>({
  key: "userIdAtom",
  default: null,
  effects: [logEffect("userIdAtom")],
});
