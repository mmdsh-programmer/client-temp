import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const openShareAccessAtom = atom<boolean | null>({
  key: "openShareAccessAtom",
  default: false,
  effects: [logEffect("openShareAccessAtom")],
});

export const publicRoleAtom = atom<number | null>({
  key: "publicRoleAtom",
  default: null,
  effects: [logEffect("publicRoleAtom")],
});
