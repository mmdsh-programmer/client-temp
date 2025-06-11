"use client";

import React, { useEffect } from "react";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";
import DashboardDocuments from "@components/organisms/dashboradDocuments";
import DashboardRepositories from "@components/organisms/dashboardRepositories";
import { ERepoGrouping } from "@interface/enums";
import RepoList from "@components/organisms/repoList";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { Spinner } from "@components/atoms/spinner";

const DashboardPage = () => {
  const resetRepo = useResetRecoilState(repoAtom);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetCategoryShow = useResetRecoilState(categoryShowAtom);
  const resetDocument = useResetRecoilState(selectedDocumentAtom);
  const resetDocumentShow = useResetRecoilState(documentShowAtom);
  const resetShowVersionList = useResetRecoilState(versionModalListAtom);
  const getRepoGroup = useRecoilValue(repoGroupingAtom);

  const { data: getDomainInfo, isLoading } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");

  const { enablePersonalDocs } = content;

  useEffect(() => {
    resetRepo();
    resetCategory();
    resetCategoryShow();
    resetDocument();
    resetDocumentShow();
    resetShowVersionList();
  }, []);

  const renderContent = () => {
    if (getRepoGroup === ERepoGrouping.DASHBOARD && (enablePersonalDocs ?? true)) {
      return (
        <div className="flex flex-col gap-4 xl:flex-row xs:gap-6">
          <div className="xl:!max-w-1/2 w-full max-w-full xl:w-1/2">
            <DashboardDocuments />
          </div>
          <div className="xl:!max-w-1/2 w-full max-w-full xl:w-1/2">
            <DashboardRepositories />
          </div>
        </div>
      );
    }
    if (getRepoGroup === ERepoGrouping.DASHBOARD && !enablePersonalDocs) {
      return (
        <div className="flex flex-col gap-4 xl:flex-row xs:gap-6">
          <div className="w-full max-w-full">
            <DashboardRepositories />
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-4 xs:gap-6">
        <RepoList />
      </div>
    );
  };

  return isLoading ? (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className="h-6 w-6 text-primary" />
    </div>
  ) : (
    renderContent()
  );
};
export default DashboardPage;
