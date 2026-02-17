"use client";

import React, { useEffect } from "react";
import CheckPanelUrlData from "@components/templates/checkPanelUrlData";
import DashboardDocuments from "@components/organisms/dashboradDocuments";
import DashboardRepositories from "@components/organisms/dashboardRepositories";
import { Spinner } from "@components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useRepositoryStore } from "@store/repository";
import { ERepoGrouping } from "@interface/enums";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const repoId = searchParams?.get("repoId");
  const { repoGrouping, setRepositoryId } = useRepositoryStore();

  const { data: getDomainInfo, isLoading } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePersonalDocs } = content;

  useEffect(() => {
    if (repoId) {
      setRepositoryId(+repoId);
    }
  }, [repoId]);

  const renderContent = () => {
    if (repoGrouping === ERepoGrouping.DASHBOARD) {
      const showPersonalDocs = enablePersonalDocs ?? true;
      return (
        <div className="flex flex-col gap-4 xl:flex-row xs:gap-6">
          {showPersonalDocs && (
            <div className="xl:!max-w-1/2 w-full max-w-full xl:w-1/2">
              <DashboardDocuments />
            </div>
          )}
          <div className={`w-full max-w-full ${showPersonalDocs ? "xl:!max-w-1/2 xl:w-1/2" : ""}`}>
            <DashboardRepositories />
          </div>
        </div>
      );
    }
  };

  return isLoading ? (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className="size-6 text-primary" />
    </div>
  ) : (
    <>
      <CheckPanelUrlData />
      {renderContent()}
    </>
  );
};
export default DashboardPage;
