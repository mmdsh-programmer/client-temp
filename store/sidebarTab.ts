import { create } from "zustand";
import { ESidebarTab } from "@store/sidebar";

interface SidebarTabState {
  sidebarTab: ESidebarTab | null;
  setSidebarTab: (tab: ESidebarTab | null) => void;
}

export const useSidebarTabStore = create<SidebarTabState>((set) => {
  return {
    sidebarTab: null,
    setSidebarTab: (tab) => {
      set({ sidebarTab: tab });
    },
  };
}); 