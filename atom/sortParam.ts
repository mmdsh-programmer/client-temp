import { atom } from "recoil";

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
});
