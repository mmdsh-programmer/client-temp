import { EListMode } from "@interface/enums";
import { atom } from "recoil";
import { logger } from "@utils/index";

export const listModeAtom = atom<EListMode>({
    key: "listModeAtom",
    default: EListMode.table,
    effects: [
        ({ onSet }) => {
            onSet((newValue, oldValue) => {
                logger("listModeAtom", newValue, oldValue);
            });
        },
    ],
})