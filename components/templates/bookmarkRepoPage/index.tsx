"use client";

import React, { useEffect } from "react";
import BookmarkRepoList from "@components/organisms/repoList/bookmarkList";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import RepoSearch from "@components/molecules/repoSearch";
import RepoMenu from "@components/molecules/repoMenu";
import { repoAtom } from "@atom/repository";
import { useResetRecoilState } from "recoil";
import { categoryAtom, categoryShowAtom } from "@atom/category";
import { documentShowAtom, selectedDocumentAtom } from "@atom/document";
import { versionModalListAtom } from "@atom/version";
import RepoCreateDialogStepper from "@components/organisms/dialogs/repository/repoCreateDialogStepper";

const BookmarkRepoPage = () => {
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
    <div className="page-container flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col pt-4">
        <div className="flex flex-col gap-4 p-4 xs:gap-6 xs:p-0">
          <HeaderListTemplate
            header="مخزن‌های نشان‌شده"
            buttonText="ایجاد مخزن جدید"
            renderSearch={<RepoSearch />}
            renderDialog={(close: () => void) => {
              return <RepoCreateDialogStepper close={close} />;
            }}
            className="repo-list-header"
          />
          <BookmarkRepoList />
          <RepoMenu showDrawer />
        </div>
      </div>
    </div>
  );
};

export default BookmarkRepoPage;
