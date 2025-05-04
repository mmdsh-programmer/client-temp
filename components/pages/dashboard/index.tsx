"use client";

import React, { useEffect } from "react";
import { repoAtom } from "@atom/repository";
import { useResetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";
import DashboardDocuments from "@components/organisms/dashboradDocuments";
import DashboardRepositories from "@components/organisms/dashboardRepositories";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";

const DashboardPage = () => {
  const resetRepo = useResetRecoilState(repoAtom);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetCategoryShow = useResetRecoilState(categoryShowAtom);
  const resetDocument = useResetRecoilState(selectedDocumentAtom);
  const resetDocumentShow = useResetRecoilState(documentShowAtom);
  const resetShowVersionList = useResetRecoilState(versionModalListAtom);

  useEffect(() => {
    resetRepo();
    resetCategory();
    resetCategoryShow();
    resetDocument();
    resetDocumentShow();
    resetShowVersionList();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row gap-4 xs:gap-6">
      <div className="w-full max-w-full xl:!max-w-1/2 xl:w-1/2">
        <DashboardDocuments />
      </div>
      <div className="w-full max-w-full xl:!max-w-1/2 xl:w-1/2">
        <DashboardRepositories />
      </div>
      <RepoTypesMobileView />
    </div>
  );
};
export default DashboardPage;
