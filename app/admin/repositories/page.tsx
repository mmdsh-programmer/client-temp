"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import RepoPage from "@components/pages/repository";
import RepositoryTemplate from "@components/templates/repositoryTemplate";
import SpinnerText from "@components/molecules/spinnerText";

const Repositories = () => {
  const searchParams = useSearchParams();
  const repoId = searchParams.get("repoId");

  if (!repoId) {
    return <SpinnerText text="خطا در دریافت شناسه‌ی مخرن" />;
  }

  return (
    <RepositoryTemplate>
      <RepoPage repoId={+repoId} />
    </RepositoryTemplate>
  );
};

export default Repositories;
