import { create } from "zustand";
import { IDocumentMetadata } from "@interface/document.interface";
import { ITag } from "@interface/tags.interface";
import { IPublicKey } from "@interface/repo.interface";
import { EDocumentTypes } from "@interface/enums";

interface DocumentInfo {
  title: string;
  description?: string;
  order?: number;
}

interface DocumentTemplate {
  id: number;
  // ...other fields as needed
}

interface DocumentState {
  selectedDocument: IDocumentMetadata | null;
  setSelectedDocument: (doc: IDocumentMetadata | null) => void;
  documentShow: IDocumentMetadata | null;
  setDocumentShow: (doc: IDocumentMetadata | null) => void;
  tempDocTag: ITag[];
  setTempDocTag: (tags: ITag[]) => void;
  // Document creation wizard state
  documentInfo: DocumentInfo | null;
  setDocumentInfo: (info: DocumentInfo | null) => void;
  documentType: EDocumentTypes | null;
  setDocumentType: (type: EDocumentTypes | null) => void;
  documentKey: IPublicKey | null;
  setDocumentKey: (key: IPublicKey | null) => void;
  documentTemplate: DocumentTemplate | null;
  setDocumentTemplate: (template: DocumentTemplate | null) => void;
  documentActiveStep: number;
  setDocumentActiveStep: (step: number) => void;
}

export const useDocumentStore = create<DocumentState>((set) => {
  return {
    selectedDocument: null,
    setSelectedDocument: (doc) => {
      set({ selectedDocument: doc });
    },
    documentShow: null,
    setDocumentShow: (doc) => {
      set({ documentShow: doc });
    },
    tempDocTag: [],
    setTempDocTag: (tags) => {
      set({ tempDocTag: tags });
    },
    // Document creation wizard state
    documentInfo: null,
    setDocumentInfo: (info) => {
      set({ documentInfo: info });
    },
    documentType: null,
    setDocumentType: (type) => {
      set({ documentType: type });
    },
    documentKey: null,
    setDocumentKey: (key) => {
      set({ documentKey: key });
    },
    documentTemplate: null,
    setDocumentTemplate: (template) => {
      set({ documentTemplate: template });
    },
    documentActiveStep: 0,
    setDocumentActiveStep: (step) => {
      set({ documentActiveStep: step });
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
