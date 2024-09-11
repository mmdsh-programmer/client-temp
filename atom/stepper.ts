import { atom } from "recoil";
import { logEffect } from "@utils/index";

export const repoActiveStepAtom = atom<number>({
  key: "repoActiveStepAtom",
  default: 0,
  effects: [logEffect("repoActiveStepAtom")],
});

export const documentActiveStepAtom = atom<number>({
  key: "documentActiveStepAtom",
  default: 0,
  effects: [logEffect("documentActiveStepAtom")],
});

