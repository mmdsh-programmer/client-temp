import { BookmarkIcon, InfoIcon, MoreDotIcon } from "@components/atoms/icons";
import React, { useState } from "react";
import useRepoMenuList, { MenuItem } from "./useRepoMenuList";
import { Button } from "@material-tailwind/react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { IRepo } from "@interface/repo.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { usePathname } from "next/navigation";
import { useRepoInfoStore, useRepositoryStore, useRepoActionDrawerStore } from "@store/repository";
import { useTourStore } from "@store/tour";
import { ETourSection } from "@atom/tour";
import RepoDialogs from "../repoDialogs";

interface IProps {
  repo?: IRepo;
  showDrawer?: boolean;
  showLog?: boolean;
}

const RepoMenu = ({ repo, showDrawer, showLog = false }: IProps) => {
  const currentPath = usePathname();

  const [modals, setModals] = useState({
    edit: false,
    delete: false,
    archive: false,
    restore: false,
    bookmark: false,
    share: false,
    key: false,
    leave: false,
    fileManagement: false,
    versionRequests: false,
    privateFeed: false,
  });

  const repoState = useRepositoryStore();
  const { setRepo } = repoState;
  const getRepo = repoState.repo;
  const setRepoInfo = useRepoInfoStore((state) => {
    return state.setRepoInfo;
  });
  const setActiveTour = useTourStore((state) => {
    return state.setActiveTour;
  });
  const openRepoActionDrawer = useRepoActionDrawerStore((state) => {
    return state.openRepoActionDrawer;
  });
  const setOpenRepoActionDrawer = useRepoActionDrawerStore((state) => {
    return state.setOpenRepoActionDrawer;
  });

  const setModalState = (type: string, state: boolean) => {
    setModals((prev) => {
      return { ...prev, [type]: state };
    });
  };

  const handleRepoInfo = () => {
    setRepoInfo(repo);
  };

  const menuList = useRepoMenuList(
    repo || getRepo,
    setModalState,
    handleRepoInfo,
    setOpenRepoActionDrawer,
    showLog,
  ).filter(Boolean) as MenuItem[];

  return (
    <>
      {!showDrawer ? (
        <div className="repo-menu flex items-center justify-end gap-1">
          {currentPath === "/admin/repositories" ? (
            <Button
              placeholder="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none"
              onClick={() => {
                setActiveTour(ETourSection.REPO);
              }}
            >
              <InfoIcon className="h-4 w-4 stroke-primary-normal" />
            </Button>
          ) : null}
          <div
            className="repoInformationTab repoActions flex items-center justify-end gap-1"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {repo?.bookmark ? (
              <BookmarkIcon className="h-4 w-4 fill-amber-600 stroke-amber-600" />
            ) : null}
            <MenuTemplate
              setOpenDrawer={() => {
                setOpenRepoActionDrawer(true);
                setRepo(repo || null);
              }}
              menuList={menuList}
              icon={
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
                  <MoreDotIcon className="h-4 w-4" />
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <div className="repo-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={openRepoActionDrawer}
            setOpenDrawer={setOpenRepoActionDrawer}
            menuList={menuList}
          />
        </div>
      )}
      <RepoDialogs modals={modals} setModalState={setModalState} />
    </>
  );
};

export default RepoMenu;
