"use client";

import React, { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import DashboardDocuments from "@components/organisms/dashboradDocuments";
import DashboardRepositories from "@components/organisms/dashboardRepositories";
import { ERepoGrouping } from "@interface/enums";
import RepoList from "@components/organisms/repoList";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { Spinner } from "@components/atoms/spinner";
import { bulkItemsAtom } from "@atom/bulk";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";

const DashboardPage = () => {
  const { setRepo, repoGrouping } = useRepositoryStore();
  const { setCategory, setCategoryShow } = useCategoryStore();
  const { setSelectedDocument, setDocumentShow } = useDocumentStore();
  const { setVersionModalList } = useVersionStore();
  const resetBulkItems = useResetRecoilState(bulkItemsAtom);

  const { data: getDomainInfo, isLoading } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");

  const { enablePersonalDocs } = content;

  useEffect(() => {
    setRepo(null);
    setCategory(null);
    setCategoryShow(null);
    setSelectedDocument(null);
    setDocumentShow(null);
    setVersionModalList(false);
    resetBulkItems();
  }, []);

  const renderContent = () => {
    if (repoGrouping === ERepoGrouping.DASHBOARD && (enablePersonalDocs ?? true)) {
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
    if (repoGrouping === ERepoGrouping.DASHBOARD && !enablePersonalDocs) {
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
