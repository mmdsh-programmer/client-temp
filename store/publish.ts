import { create } from "zustand";
import { IDocumentMetadata } from "@interface/document.interface";
import { IVersion } from "@interface/version.interface";

type SetBoolean = boolean | ((prev: boolean) => boolean);

export const usePublishStore = create<{
  publishVersion: IVersion | null;
  setPublishVersion: (v: IVersion | null) => void;
  publishPageSelectedDocument: IDocumentMetadata | null;
  setPublishPageSelectedDocument: (d: IDocumentMetadata | null) => void;
  openPublishPageSearchContent: boolean;
  setOpenPublishPageSearchContent: (open: SetBoolean) => void;
  openPublishOutlineDrawer: boolean;
  setOpenPublishOutlineDrawer: (open: SetBoolean) => void;
}>((set) => {
  return {
    publishVersion: null,
    setPublishVersion: (v) => {
      return set({ publishVersion: v });
    },
    publishPageSelectedDocument: null,
    setPublishPageSelectedDocument: (d) => {
      return set({ publishPageSelectedDocument: d });
    },
    openPublishPageSearchContent: false,
    setOpenPublishPageSearchContent: (open) => {
      if (typeof open === "function") {
        return set((s) => {
          return { openPublishPageSearchContent: (open as (prev: boolean) => boolean)(s.openPublishPageSearchContent) };
        });
      }
      return set({ openPublishPageSearchContent: open });
    },
    openPublishOutlineDrawer: false,
    setOpenPublishOutlineDrawer: (open) => {
      if (typeof open === "function") {
        return set((s) => {
          return { openPublishOutlineDrawer: (open as (prev: boolean) => boolean)(s.openPublishOutlineDrawer) };
        });
      }
      return set({ openPublishOutlineDrawer: open });
    },
  };
});


