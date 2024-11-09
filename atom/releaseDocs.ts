import { IVersion } from "@interface/version.interface";
import { logEffect } from "@utils/index";
import { atom } from "recoil";

export const acceptVersionAtom = atom<boolean | null>({
  key: "acceptVersionAtom",
  default: null,
  effects: [logEffect("acceptVersionAtom")],
});

export const rejectVersionAtom = atom<boolean | null>({
  key: "rejectVersionAtom",
  default: null,
  effects: [logEffect("rejectVersionAtom")],
});

export const versionRequestDrawerAtom = atom<boolean | null>({
  key: "versionRequestDrawerAtom",
  default: null,
  effects: [logEffect("versionRequestDrawerAtom")],
});

export const selectedRequestAtom = atom<IVersion | undefined>({
  key: "selectedRequestAtom",
  default: undefined,
  effects: [logEffect("selectedRequestAtom")],
});
