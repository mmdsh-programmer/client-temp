import { IRoles } from "@interface/users.interface";
import { atom } from "recoil";

export const openShareAccess = atom<boolean | null>({
  key: "openShareAccess",
  default: false,
});

export const publicRole = atom<number | null>({
  key: "publicRole",
  default: null,
});
