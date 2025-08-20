import { create } from "zustand";
import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import { IPublicKey } from "@interface/repo.interface";

interface IDocInfo {
  title: string;
  order?: number;
  description?: string;
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
  documentKey: IPublicKey | null;
  setDocumentKey: (key: IPublicKey | null) => void;
  documentTemplate: IDocumentMetadata | null;
  setDocumentTemplate: (doc: IDocumentMetadata | null) => void;
}>((set) => {
  return {
    selectedDocument: null,
    setSelectedDocument: (doc) => {
      return set({ selectedDocument: doc });
    },
    documentShow: null,
    setDocumentShow: (doc) => {
      return set({ documentShow: doc });
    },
    documentType: null,
    setDocumentType: (type) => {
      return set({ documentType: type });
    },
    documentInfo: null,
    setDocumentInfo: (info) => {
      return set({ documentInfo: info });
    },
    documentKey: null,
    setDocumentKey: (key) => {
      return set({ documentKey: key });
    },
    documentTemplate: null,
    setDocumentTemplate: (doc) => {
      return set({ documentTemplate: doc });
    },
  };
});

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
