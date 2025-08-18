import { create } from "zustand";

interface VersionState {
  versionModalList: boolean;
  setVersionModalList: (val: boolean) => void;
  selectedVersion: any; // You may want to use a more specific type
  setSelectedVersion: (val: any) => void;
}

export const useVersionStore = create<VersionState>((set) => {
  return {
    versionModalList: false,
    setVersionModalList: (val) => {
      set({ versionModalList: val });
    },
    selectedVersion: null,
    setSelectedVersion: (val) => {
      set({ selectedVersion: val });
    },
  };
});
