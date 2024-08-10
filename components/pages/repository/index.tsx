"use client";

import React from "react";
import RepoInfo from "@components/organisms/repoInfo";
import RepoMobileCards from "@components/organisms/repoMobileCards";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bulkItems } from "@atom/bulk";
import CategoryList from "@components/organisms/category/categoryList";
import { repoAtom } from "@atom/repository";
import useGetRepo from "@hooks/repository/useGetRepo";
import SpinnerText from "@components/molecules/spinnerText";

interface IProps {
  repoId: number;
}

const RepoPage = ({ repoId }: IProps) => {
  const setRepo = useSetRecoilState(repoAtom);
  const getBulkItems = useRecoilValue(bulkItems);

  const { isLoading } = useGetRepo(repoId, setRepo);

  if (isLoading) {
    return <SpinnerText text="در حال دریافت اطلاعات" />;
  }

  return (
    <div className="flex flex-col gap-4 xs:gap-6">
      <RepoInfo />
      <CategoryList />
      <RepoMobileCards />
    </div>
  );
};

export default RepoPage;
