import { IDocumentMetadata } from "@interface/document.interface";
import { EDocumentTypes } from "@interface/enums";
import { logger } from "@utils/index";
import { atom } from "recoil";

interface IDocInfo {
  title: string;
  order?: number;
  description?: string;
}

// ----------------------------------
export const documentQueryParams = atom({
  key: "documentQueryParams",
  default: {
    limit: 20,
    page: 1,
    total: 0,
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentQueryParams", newValue, oldValue);
      });
    },
  ],
});

export const selectedDocumentAtom = atom<IDocumentMetadata | null>({
  key: "selectedDocument",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("selectedDocumentAtom", newValue, oldValue);
      });
    },
  ],
});

export const publishDocumentId = atom<number>({
  key: "publishDocumentId",
  default: 0,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("publishDocumentId", newValue, oldValue);
      });
    },
  ],
});

export const tempDocTag = atom<number[]>({
  key: "tempDocTag",
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("tempDocTag", newValue, oldValue);
      });
    },
  ],
});

export const documentType = atom<EDocumentTypes | null>({
  key: "documentType",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentType", newValue, oldValue);
      });
    },
  ],
});

export const documentInfo = atom<IDocInfo | null>({
  key: "documentInfo",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentInfo", newValue, oldValue);
      });
    },
  ],
});

export const documentTemplate = atom<IDocumentMetadata | null>({
  key: "documentTemplate",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentTemplate", newValue, oldValue);
      });
    },
  ],
});

export const documentDrawerAtom = atom<boolean | null>({
  key: "documentDrawerAtom",
  default: null,
});
