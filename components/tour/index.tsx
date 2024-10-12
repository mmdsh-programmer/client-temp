import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { activeTourAtom, ETourSection } from "@atom/tour";
import RepoTour from "./repoTour";
import DashboardTour from "./dashboardTour";
import CategoryTour from "./categoryTour";
import VersionTour from "./versionTour";

const Tour = () => {
  const getActiveTour = useRecoilValue(activeTourAtom);

  useEffect(() => {
    const tourOverlay = document.createElement("div");
    document.body.append(tourOverlay);
    tourOverlay.classList.add("tour-overlay");
  }, []);

  const tourContent = () => {
    if (getActiveTour === ETourSection.REPO) return <RepoTour />;
    if (getActiveTour === ETourSection.DOCUMENTS) return <CategoryTour />;
    if (getActiveTour === ETourSection.VERSION) return <VersionTour />;
    if (getActiveTour === ETourSection.DASHBOARD) return <DashboardTour />;
    if (getActiveTour === null || getActiveTour === undefined) return null;
  };

  return (
    <div>{tourContent()}</div>
  );
};

export default Tour;
