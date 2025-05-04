"use client";

import React, { useEffect } from "react";
import { repoAtom, repoGroupingAtom } from "@atom/repository";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";
import DashboardDocuments from "@components/organisms/dashboradDocuments";
import DashboardRepositories from "@components/organisms/dashboardRepositories";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";
import { ERepoGrouping } from "@interface/enums";
import RepoList from "@components/organisms/repoList";

const DashboardPage = () => {
  const resetRepo = useResetRecoilState(repoAtom);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetCategoryShow = useResetRecoilState(categoryShowAtom);
  const resetDocument = useResetRecoilState(selectedDocumentAtom);
  const resetDocumentShow = useResetRecoilState(documentShowAtom);
  const resetShowVersionList = useResetRecoilState(versionModalListAtom);
  const getRepoGroup = useRecoilValue(repoGroupingAtom);

  useEffect(() => {
    resetRepo();
    resetCategory();
    resetCategoryShow();
    resetDocument();
    resetDocumentShow();
    resetShowVersionList();
  }, []);

  return getRepoGroup === ERepoGrouping.DASHBOARD ? (
    <div className="flex flex-col gap-4 xl:flex-row xs:gap-6">
      <div className="xl:!max-w-1/2 w-full max-w-full xl:w-1/2">
        <DashboardDocuments />
      </div>
      <div className="xl:!max-w-1/2 w-full max-w-full xl:w-1/2">
        <DashboardRepositories />
      </div>
      <RepoTypesMobileView />
    </div>
  ) : (
    <div className="flex flex-col gap-4 xs:gap-6 ">
      <RepoList />
      <RepoTypesMobileView />
    </div>
  );
};
export default DashboardPage;
