"use client";

import React from "react";
import RepoPage from "@components/pages/repository";
import RepositoryTemplate from "@components/templates/repositoryTemplate";
import Tour from "@components/tour";

const Repositories = () => {
  return (
    <RepositoryTemplate>
      <Tour />
      <RepoPage />
    </RepositoryTemplate>
  );
};

export default Repositories;
