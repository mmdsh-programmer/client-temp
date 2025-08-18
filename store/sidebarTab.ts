import { create } from "zustand";
import { ESidebarTab } from "@store/sidebar";

interface SidebarTabState {
  sidebarTab: ESidebarTab;
  setSidebarTab: (tab: ESidebarTab) => void;
}

export const useSidebarTabStore = create<SidebarTabState>((set) => {
  return {
    sidebarTab: ESidebarTab.MAIN,
    setSidebarTab: (tab) => {
      set({ sidebarTab: tab });
    },
  };
}); 