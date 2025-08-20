import { create } from "zustand";
import { IDocumentMetadata } from "@interface/document.interface";
import { IVersion } from "@interface/version.interface";

// Zustand store for version management (replaces version atoms)
export const useVersionStore = create<{
  selectedVersion: IVersion | null;
  setSelectedVersion: (version: IVersion | null) => void;
  compareVersion: {
    version: { 
      data: IVersion;
      document: IDocumentMetadata;
      repoId: number;
    } | null;
    compare: {
      data: IVersion;
      document: IDocumentMetadata;
      repoId: number;
    } | null;
  } | null;
  setCompareVersion: (compare: {
    version: { 
      data: IVersion;
      document: IDocumentMetadata;
      repoId: number;
    } | null;
    compare: {
      data: IVersion;
      document: IDocumentMetadata;
      repoId: number;
    } | null;
  } | null) => void;
  versionModalList: boolean;
  setVersionModalList: (modal: boolean) => void;
  versionDrawer: boolean | null;
  setVersionDrawer: (drawer: boolean | null) => void;
}>((set) => {
  return {
    selectedVersion: null,
    setSelectedVersion: (version) => {
      return set({ selectedVersion: version });
    },
    compareVersion: null,
    setCompareVersion: (compare) => {
      return set({ compareVersion: compare });
    },
    versionModalList: false,
    setVersionModalList: (modal) => {
      return set({ versionModalList: modal });
    },
    versionDrawer: null,
    setVersionDrawer: (drawer) => {
      return set({ versionDrawer: drawer });
    },
  };
});
