"use client";

import React, { useEffect } from "react";
import { ETourSection, useTourStore } from "@store/tour";
import RepoTour from "./repoTour";
import DashboardTour from "./dashboardTour";
import CategoryTour from "./categoryTour";
import VersionTour from "./versionTour";

const Tour = () => {
  const activeTour = useTourStore((state) => {
    return state.activeTour;
  });

  useEffect(() => {
    const tourOverlay = document.createElement("div");
    document.body.append(tourOverlay);
    tourOverlay.classList.add("tour-overlay");
  }, []);

  const tourContent = () => {
    if (activeTour === ETourSection.REPO) return <RepoTour />;
    if (activeTour === ETourSection.DOCUMENTS) return <CategoryTour />;
    if (activeTour === ETourSection.VERSION) return <VersionTour />;
    if (activeTour === ETourSection.DASHBOARD) return <DashboardTour />;
    if (activeTour === null || activeTour === undefined) return null;
  };

  return <div>{tourContent()}</div>;
};

export default Tour;
