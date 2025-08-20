import { create } from "zustand";

// Zustand store for public management (replaces public atoms)
export const usePublicStore = create<{
  openShareAccess: boolean | null;
  setOpenShareAccess: (open: boolean | null) => void;
  publicRole: number | null;
  setPublicRole: (role: number | null) => void;
}>((set) => {
  return {
    openShareAccess: false,
    setOpenShareAccess: (open) => {
      return set({ openShareAccess: open });
    },
    publicRole: null,
    setPublicRole: (role) => {
      return set({ publicRole: role });
    },
  };
});
