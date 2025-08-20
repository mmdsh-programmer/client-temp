"use client";

import React, { useEffect } from "react";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import RepoSearch from "@components/molecules/repoSearch";
import RepoMenu from "@components/molecules/repoMenu";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import MyRepoList from "@components/organisms/repoList/myRepoList";
import RepoCreateDialogStepper from "@components/organisms/dialogs/repository/repoCreateDialogStepper";

const ArchiveRepoPage = () => {
  const { setRepo } = useRepositoryStore();
  const { setCategory, setCategoryShow } = useCategoryStore();
  const { setSelectedDocument, setDocumentShow } = useDocumentStore();
  const { setVersionModalList } = useVersionStore();

  useEffect(() => {
    setRepo(null);
    setCategory(null);
    setCategoryShow(null);
    setSelectedDocument(null);
    setDocumentShow(null);
    setVersionModalList(false);
  }, []);

  return (
    <div className="page-container flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col pt-4">
        <div className="flex flex-col gap-4 p-4 xs:gap-6 xs:p-0">
          <HeaderListTemplate
            header="مخزن‌های بایگانی‌شده"
            buttonText="ایجاد مخزن جدید"
            renderSearch={<RepoSearch />}
            renderDialog={(close: () => void) => {
              return <RepoCreateDialogStepper close={close} />;
            }}
            className="repo-list-header"
          />
          <MyRepoList archived />
          <RepoMenu showDrawer />
        </div>
      </div>
    </div>
  );
};

export default ArchiveRepoPage;
