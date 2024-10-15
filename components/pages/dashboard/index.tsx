import React, { useEffect } from "react";
import RepoCards from "@components/organisms/repoTypesCards";
import RepoList from "@components/organisms/repoList";
import RepoTypesMobileView from "@components/molecules/repoTypesMobileView";
import { repoAtom } from "@atom/repository";
import { useResetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionListAtom } from "@atom/version";

const DashboardPage = () => {
  const resetRepo = useResetRecoilState(repoAtom);
  const resetCategory = useResetRecoilState(categoryAtom);
  const resetCategoryShow = useResetRecoilState(categoryShowAtom);
  const resetDocument = useResetRecoilState(selectedDocumentAtom);
  const resetDocumentShow = useResetRecoilState(documentShowAtom);
  const resetShowVersionList = useResetRecoilState(versionListAtom);

  useEffect(() => {
    resetRepo();
    resetCategory();
    resetCategoryShow();
    resetDocument();
    resetDocumentShow();
    resetShowVersionList();
  }, []);

  return (
    <div className="flex flex-col gap-4 xs:gap-6 ">
      <RepoCards />
      <RepoList />
      <RepoTypesMobileView />
    </div>
  );
};
export default DashboardPage;
