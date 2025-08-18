import { create } from "zustand";

interface BranchState {
  branchId: number | null;
  setBranchId: (id: number | null) => void;
}

export const useBranchStore = create<BranchState>((set) => {
  return {
    branchId: null,
    setBranchId: (id) => {
      set({ branchId: id });
    },
  };
}); 