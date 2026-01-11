import { create } from "zustand";

export enum ETourSection {
  REPO = "repo",
  DOCUMENTS = "documents",
  VERSION = "version",
  DASHBOARD = "dashboard"
}

interface TourState {
  activeTour: ETourSection | null;
  setActiveTour: (tour: ETourSection | null) => void;
}

export const useTourStore = create<TourState>((set) => {
  return {
    activeTour: null,
    setActiveTour: (tour) => {
      set({ activeTour: tour });
    },
  };
}); 