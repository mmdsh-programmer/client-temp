import { atom } from "recoil";

export interface ISortProps {
  order?: "asc" | "desc";
  type?: "asc" | "desc";
  name?: "asc" | "desc";
  createdAt?: "asc" | "desc";
}

export const sort = atom<ISortProps>({
  key: "sort",
  default: {
    order: "asc",
    type: "asc",
    name: "asc",
    createdAt: "asc",
  },
});
