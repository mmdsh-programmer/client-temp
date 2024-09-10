import { atom } from "recoil";

export const repoActiveStepAtom = atom<number>({
  key: "repoActiveStepAtom",
  default: 0,
});

export const documentActiveStepAtom = atom<number>({
  key: "documentActiveStepAtom",
  default: 0,
});

