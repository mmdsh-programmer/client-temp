/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import { IPublicKey } from "@interface/repo.interface";
import { devtools } from "zustand/middleware";
import { logger } from "./logger";

interface IDocInfo {
  title: string;
  order?: number;
  description?: string;
}

interface IFormInfo {
  type: "GENERAL" | "EXAM";
  display: "CLASSIC" | "CARD";
}

export const useDocumentStore = create<{
  selectedDocument: IDocumentMetadata | null;
  setSelectedDocument: (doc: IDocumentMetadata | null) => void;
  documentShow: IDocumentMetadata | null;
  setDocumentShow: (doc: IDocumentMetadata | null) => void;
  documentType: EDocumentTypes | null;
  setDocumentType: (type: EDocumentTypes | null) => void;
  documentInfo: IDocInfo | null;
  setDocumentInfo: (info: IDocInfo | null) => void;
  documentFormContentInfo: IFormInfo | null;
  setDocumentFormContentInfo: (info: IFormInfo | null) => void;
  documentKey: IPublicKey | null;
  setDocumentKey: (key: IPublicKey | null) => void;
  documentTemplate: IDocumentMetadata | null;
  setDocumentTemplate: (doc: IDocumentMetadata | null) => void;
  tempDocTag: { name: string; id: number }[];
  setTempDocTag: (
    tags:
      | { name: string; id: number }[]
      | ((prev: { name: string; id: number }[]) => { name: string; id: number }[]),
  ) => void;
}>()(
  devtools(
    logger((set) => {
      return {
        selectedDocument: null,
        setSelectedDocument: (doc) => {
          return (set as any)({ selectedDocument: doc }, false, "selectedDocument");
        },
        documentShow: null,
        setDocumentShow: (doc) => {
          return (set as any)({ documentShow: doc }, false, "documentShow");
        },
        documentType: null,
        setDocumentType: (type) => {
          return set({ documentType: type });
        },
        documentInfo: null,
        setDocumentInfo: (info) => {
          return set({ documentInfo: info });
        },
        documentFormContentInfo: null,
        setDocumentFormContentInfo: (info) => {
          return set({ documentFormContentInfo: info });
        },
        documentKey: null,
        setDocumentKey: (key) => {
          return set({ documentKey: key });
        },
        documentTemplate: null,
        setDocumentTemplate: (doc) => {
          return set({ documentTemplate: doc });
        },
        tempDocTag: [],
        setTempDocTag: (tagsOrUpdater) => {
          return set((state) => {
            const nextTags =
              typeof tagsOrUpdater === "function"
                ? (
                    tagsOrUpdater as (
                      prev: { name: string; id: number }[],
                    ) => { name: string; id: number }[]
                  )(state.tempDocTag)
                : tagsOrUpdater;
            return { tempDocTag: nextTags };
          });
        },
      };
    }),
  ),
);

interface DocumentDrawerState {
  documentDrawer: boolean;
  setDocumentDrawer: (open: boolean) => void;
}

export const useDocumentDrawerStore = create<DocumentDrawerState>((set) => {
  return {
    documentDrawer: false,
    setDocumentDrawer: (open) => {
      set({ documentDrawer: open });
    },
  };
});
