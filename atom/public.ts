import { IRoles } from "@interface/users.interface";
import { atom } from "recoil";

export const openShareAccessAtom = atom<boolean | null>({
  key: "openShareAccessAtom",
  default: false,
});

export const publicRoleAtom = atom<number | null>({
  key: "publicRoleAtom",
  default: null,
});
