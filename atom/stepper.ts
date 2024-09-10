import { atom } from "recoil";
import { logger } from "@utils/index";

export const repoActiveStepAtom = atom<number>({
  key: "repoActiveStepAtom",
  default: 0,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("repoActiveStepAtom", newValue, oldValue);
      });
    },
  ],
});

export const documentActiveStepAtom = atom<number>({
  key: "documentActiveStepAtom",
  default: 0,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentActiveStepAtom", newValue, oldValue);
      });
    },
  ],
});

