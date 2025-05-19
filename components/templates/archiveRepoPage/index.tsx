"use client";

import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ERepoGrouping } from "@interface/enums";
import { ESidebarSection, sidebarSectionAtom } from "@atom/sidebar";
import { repoGroupingAtom } from "@atom/repository";
import MyRepoList from "@components/organisms/repoList/myRepoList";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import RepoSearch from "@components/molecules/repoSearch";
import RepoMenu from "@components/molecules/repoMenu";

const ArchiveRepoPage = () => {
  const [, setSidebarSection] = useRecoilState(sidebarSectionAtom);
  const setRepoGroup = useSetRecoilState(repoGroupingAtom);

  useEffect(() => {
    setSidebarSection(ESidebarSection.ARCHIVE_REPOS);
    setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
  }, [setSidebarSection, setRepoGroup]);

  return (
    <div className="page-container flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-col pt-4">
        <div className="flex flex-col gap-4 p-4 xs:gap-6 xs:p-0">
          <HeaderListTemplate
            header="مخزن‌های بایگانی‌شده"
            buttonText="ایجاد مخزن جدید"
            renderSearch={<RepoSearch />}
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
