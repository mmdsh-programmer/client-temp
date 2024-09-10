import { atom } from "recoil";
import { logger } from "@utils/index";

export const openShareAccessAtom = atom<boolean | null>({
  key: "openShareAccessAtom",
  default: false,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("openShareAccessAtom", newValue, oldValue);
      });
    },
  ],
});

export const publicRoleAtom = atom<number | null>({
  key: "publicRoleAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("publicRoleAtom", newValue, oldValue);
      });
    },
  ],
});
