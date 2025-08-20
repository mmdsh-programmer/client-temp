import { create } from "zustand";
import { IVersion } from "@interface/version.interface";

// Zustand store for release docs management (replaces releaseDocs atoms)
export const useReleaseDocsStore = create<{
  acceptVersion: boolean | null;
  setAcceptVersion: (accept: boolean | null) => void;
  rejectVersion: boolean | null;
  setRejectVersion: (reject: boolean | null) => void;
  versionRequestDrawer: boolean | null;
  setVersionRequestDrawer: (drawer: boolean | null) => void;
  selectedRequest: IVersion | undefined;
  setSelectedRequest: (request: IVersion | undefined) => void;
}>((set) => {
  return {
    acceptVersion: null,
    setAcceptVersion: (accept) => {
      return set({ acceptVersion: accept });
    },
    rejectVersion: null,
    setRejectVersion: (reject) => {
      return set({ rejectVersion: reject });
    },
    versionRequestDrawer: null,
    setVersionRequestDrawer: (drawer) => {
      return set({ versionRequestDrawer: drawer });
    },
    selectedRequest: undefined,
    setSelectedRequest: (request) => {
      return set({ selectedRequest: request });
    },
  };
});
