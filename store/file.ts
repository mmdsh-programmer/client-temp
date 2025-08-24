import { create } from "zustand";
import { IFile } from "@interface/file.interface";

export const useFileStore = create<{
  selectedFile:   IFile | { name: string; extension: string; hash: string } | null | undefined;
  setSelectedFile: (file:   IFile | { name: string; extension: string; hash: string } | null | undefined
) => void;
}>((set) => {  
  return {
    selectedFile: null,
    setSelectedFile: (file) => {
      return set({ selectedFile: file });
    },
  };
}); 