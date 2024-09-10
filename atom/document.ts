import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import { IPublicKey } from "@interface/repo.interface";
import { atom } from "recoil";
import { logger } from "@utils/index";

interface IDocInfo {
  title: string;
  order?: number;
  description?: string;
}

// ----------------------------------
export const documentQueryParamsAtom = atom({
  key: "documentQueryParamsAtom",
  default: {
    limit: 20,
    page: 1,
    total: 0,
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentQueryParamsAtom", newValue, oldValue);
      });
    },
  ],
});

export const selectedDocumentAtom = atom<IDocumentMetadata | null>({
  key: "selectedDocumentAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("selectedDocumentAtom", newValue, oldValue);
      });
    },
  ],
});

export const publishDocumentIdAtom = atom<number>({
  key: "publishDocumentIdAtom",
  default: 0,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("publishDocumentIdAtom", newValue, oldValue);
      });
    },
  ],
});

export const tempDocTagAtom = atom<number[]>({
  key: "tempDocTagAtom",
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("tempDocTagAtom", newValue, oldValue);
      });
    },
  ],
});

export const documentTypeAtom = atom<EDocumentTypes | null>({
  key: "documentTypeAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentTypeAtom", newValue, oldValue);
      });
    },
  ],
});

export const documentInfoAtom = atom<IDocInfo | null>({
  key: "documentInfoAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentInfoAtom", newValue, oldValue);
      });
    },
  ],
});

export const documentKeyAtom = atom<IPublicKey | null>({
  key: "documentKeyAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentKeyAtom", newValue, oldValue);
      });
    },
  ],
});

export const documentTemplateAtom = atom<IDocumentMetadata | null>({
  key: "documentTemplateAtom",
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((newValue, oldValue) => {
        logger("documentTemplateAtom", newValue, oldValue);
      });
    },
  ],
});

export const documentDrawerAtom = atom<boolean | null>({
  key: "documentDrawerAtom",
  default: null,
});
