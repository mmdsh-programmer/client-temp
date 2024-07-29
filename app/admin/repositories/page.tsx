"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import useGetRepo from "@hooks/repository/useGetRepo";
import SpinnerText from "@components/molecules/spinnerText";
import RepoPage from "@components/pages/repository";
import RepositoryTemplate from "@components/templates/repositoryTemplate";

const Repositories = () => {
  const searchParams = useSearchParams();
  const repoId = searchParams.get("repoId");
  const setRepo = useSetRecoilState(repoAtom);

  const { isFetching } = useGetRepo(+repoId!, setRepo);

  if (isFetching) {
    return <SpinnerText text="در حال دریافت اطلاعات" />;
  }

  return (
    <RepositoryTemplate>
      <RepoPage />
    </RepositoryTemplate>
  );
};

export default Repositories;
