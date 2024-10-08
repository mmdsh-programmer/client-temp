import React from "react";
import RepoPage from "@components/pages/repository";
import RepositoryTemplate from "@components/templates/repositoryTemplate";
import ErrorBoundary from "@components/errorBoundry";

const Repositories = () => {
  return (
    <ErrorBoundary>
      <RepositoryTemplate>
        <RepoPage />
      </RepositoryTemplate>
    </ErrorBoundary>
  );
};

export default Repositories;
