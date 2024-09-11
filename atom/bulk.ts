import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

export type IBulkItems = (IDocumentMetadata | ICategoryMetadata)[];


export const bulkItemsAtom = atom<IBulkItems>({
  key: "bulkItemsAtom",
  default: [],
  effects: [logEffect("bulkItemsAtom")],
});

export const bulkMoveAtom = atom<boolean>({
  key: "bulkMoveAtom",
  default: false,
  effects: [logEffect("bulkMoveAtom")],
});

export const bulkDeleteAtom = atom<boolean>({
  key: "bulkDeleteAtom",
  default: false,
  effects: [logEffect("bulkDeleteAtom")],
});
