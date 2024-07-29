import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { logger } from "@utils/index";
import { atom } from "recoil";

export type IBulkItems = (IDocumentMetadata | ICategoryMetadata)[];

export const bulkItems = atom<IBulkItems>({
  key: "bulkItems",
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("bulkItems", newValue, oldValue);
      });
    },
  ],
});

export const bulkMove = atom<boolean>({
  key: "bulkMove",
  default: false,
});

export const bulkDelete = atom<boolean>({
  key: "bulkDelete",
  default: false,
});
