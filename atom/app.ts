import { EListMode } from "@interface/enums";
import { atom } from "recoil";

export const listMode = atom<EListMode>({
    key: "listMode",
    default: EListMode.table
})