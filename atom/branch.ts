import { logEffect } from "@utils/index";
import { atom } from "recoil";

export const branchIdAtom = atom<number | null>({
  key: "branchIdAtom",
  default: null,
  effects: [logEffect("branchIdAtom")],
});
