import { IVersion } from "@interface/version.interface";
import { logEffect } from "@utils/index";
import { atom } from "recoil";

export const publishVersionAtom = atom<IVersion | null>({
  key: "publishVersionAtom",
  default: null,
  effects: [logEffect("publishVersionAtom")],
});

export const publishPageDocumentIdAtom = atom<number | null>({
  key: "publishPageDocumentIdAtom",
  default: null,
  effects: [logEffect("publishPageDocumentIdAtom")],
});
