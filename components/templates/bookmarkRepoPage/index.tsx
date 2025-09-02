"use client";

import React, { useCallback, useState } from "react";
import BookmarkRepoList from "@components/organisms/repoList/bookmarkList";
import HeaderListTemplate from "@components/templates/headerListTemplate";
import RepoSearch from "@components/molecules/repoSearch";
import { useRepoActionDrawerStore, useRepositoryStore } from "@store/repository";
import RepoCreateDialogStepper from "@components/organisms/dialogs/repository/repoCreateDialogStepper";
import DrawerTemplate from "../drawerTemplate";
import RepoDialogs from "@components/molecules/repoDialogs";
import useRepoMenuList from "@components/molecules/repoMenu/useRepoMenuList";

const BookmarkRepoPage = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { repo, setRepo } = useRepositoryStore();
  const { openRepoActionDrawer, setOpenRepoActionDrawer } = useRepoActionDrawerStore();

  const handleSetModal = useCallback(
    (modalName: string) => {
      if (repo) {
        setRepo(repo);
        setActiveModal(modalName);
      }
    },
    [repo, setRepo],
  );

  const menuList = useRepoMenuList(repo, handleSetModal).map((item) => {
    return {
      ...item,
      onClick: () => {
        item.onClick();
        setOpenRepoActionDrawer(false);
      },
    };
  });

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
          <div className="xs:hidden">
            <DrawerTemplate
              openDrawer={openRepoActionDrawer}
              setOpenDrawer={setOpenRepoActionDrawer}
              menuList={menuList}
            />
          </div>
          <RepoDialogs
            activeModal={activeModal}
            closeModal={() => {
              return setActiveModal(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookmarkRepoPage;
