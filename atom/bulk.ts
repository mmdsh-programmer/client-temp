import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { atom } from "recoil";
import { logger } from "@utils/index";

export type IBulkItems = (IDocumentMetadata | ICategoryMetadata)[];

export const bulkItemsAtom = atom<IBulkItems>({
  key: "bulkItemsAtom",
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("bulkItemsAtom", newValue, oldValue);
      });
    },
  ],
});

export const bulkMoveAtom = atom<boolean>({
  key: "bulkMoveAtom",
  default: false,
});

export const bulkDeleteAtom = atom<boolean>({
  key: "bulkDeleteAtom",
  default: false,
});
