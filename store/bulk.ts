import { ICategoryMetadata } from "@interface/category.interface";
import { IDocumentMetadata } from "@interface/document.interface";
import { create } from "zustand";

export type IBulkItems = (IDocumentMetadata | ICategoryMetadata)[];

interface BulkState {
  bulkItems: IBulkItems;
  setBulkItems: (items: IBulkItems) => void;
}

export const useBulkStore = create<BulkState>((set) => {
  return {
    bulkItems: [],
    setBulkItems: (items) => {
      return set({ bulkItems: items });
    },
  };
});
