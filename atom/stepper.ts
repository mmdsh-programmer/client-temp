import { atom } from "recoil";

export const repoActiveStep = atom<number>({
  key: "repoActiveStep",
  default: 0,
});

export const documentActiveStep = atom<number>({
  key: "documentActiveStep",
  default: 0,
});
