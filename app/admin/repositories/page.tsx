"use client";

import React from "react";
import RepoPage from "@components/pages/repository";
import RepositoryTemplate from "@components/templates/repositoryTemplate";
import ErrorBoundary from "@components/errorBoundry";
import Tour from "@components/tour";

const Repositories = () => {
  return (
    <ErrorBoundary>
      <Tour />
      <RepositoryTemplate>
        <RepoPage />
      </RepositoryTemplate>
    </ErrorBoundary>
  );
};

export default Repositories;
