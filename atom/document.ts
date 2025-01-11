import { EDocumentTypes } from "@interface/enums";
import { IDocumentMetadata } from "@interface/document.interface";
import { IPublicKey } from "@interface/repo.interface";
import { atom } from "recoil";
import { logEffect } from "@utils/index";

interface IDocInfo {
  title: string;
  order?: number;
  description?: string;
}

export const documentQueryParamsAtom = atom({
  key: "documentQueryParamsAtom",
  default: {
    limit: 20,
    page: 1,
    total: 0,
  },
  effects: [logEffect("documentQueryParamsAtom")],
});

export const selectedDocumentAtom = atom<IDocumentMetadata | null>({
  key: "selectedDocumentAtom",
  default: null,
  effects: [logEffect("selectedDocumentAtom")],
});

export const documentShowAtom = atom<IDocumentMetadata | null>({
  key: "documentShowAtom",
  default: null,
  effects: [logEffect("documentShowAtom")],
});

export const publishDocumentIdAtom = atom<number>({
  key: "publishDocumentIdAtom",
  default: 0,
  effects: [logEffect("publishDocumentIdAtom")],
});

export const tempDocTagAtom = atom<{name: string; id: number}[]>({
  key: "tempDocTagAtom",
  default: [],
  effects: [logEffect("tempDocTagAtom")],
});

export const documentTypeAtom = atom<EDocumentTypes | null>({
  key: "documentTypeAtom",
  default: null,
  effects: [logEffect("documentTypeAtom")],
});

export const documentInfoAtom = atom<IDocInfo | null>({
  key: "documentInfoAtom",
  default: null,
  effects: [logEffect("documentInfoAtom")],
});

export const documentKeyAtom = atom<IPublicKey | null>({
  key: "documentKeyAtom",
  default: null,
  effects: [logEffect("documentKeyAtom")],
});

export const documentTemplateAtom = atom<IDocumentMetadata | null>({
  key: "documentTemplateAtom",
  default: null,
  effects: [logEffect("documentTemplateAtom")],
});

export const documentDrawerAtom = atom<boolean | null>({
  key: "documentDrawerAtom",
  default: null,
  effects: [logEffect("documentDrawerAtom")],
});


