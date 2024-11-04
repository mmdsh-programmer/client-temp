import { logEffect } from "@utils/index";
import { IFile } from "cls-file-management";
import { atom } from "recoil";

export const selectedFileAtom = atom<
  IFile | { name: string; extension: string; hash: string } | null | undefined
>({
  key: "selectedFileAtom",
  default: null,
  effects: [logEffect("selectedFileAtom")],
});
