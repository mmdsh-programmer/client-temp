import { atom } from "recoil";
import { logEffect } from "@utils/index";
import { IUser } from "@interface/users.interface";

export const selectedUserAtom = atom<null | IUser>({
    key: "selectedUserAtom",
    default: null,
    effects: [logEffect("selectedUserAtom")],
  });
  