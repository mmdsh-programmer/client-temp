import { EListMode } from "@interface/enums";
import { atom } from "recoil";

export const listModeAtom = atom<EListMode>({
    key: "listModeAtom",
    default: EListMode.table
})