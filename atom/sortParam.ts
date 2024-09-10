import { atom } from "recoil";
import { logger } from "@utils/index";

export interface ISortProps {
  order?: "asc" | "desc";
  type?: "asc" | "desc";
  name?: "asc" | "desc";
  createdAt?: "asc" | "desc";
}

export const sortAtom = atom<ISortProps>({
  key: "sortAtom",
  default: {
    order: "asc",
    type: "asc",
    name: "asc",
    createdAt: "asc",
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("sortAtom", newValue, oldValue);
      });
    },
  ],
});
