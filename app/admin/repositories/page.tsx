import React from "react";
import RepoPage from "@components/pages/repository";
import RepositoryTemplate from "@components/templates/repositoryTemplate";
const Repositories = () => {
  return (
    <RepositoryTemplate>
      <RepoPage />
    </RepositoryTemplate>
  );
};

export default Repositories;
