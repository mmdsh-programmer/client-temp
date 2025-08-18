import { create } from "zustand";
import { ETourSection } from "@atom/tour";

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