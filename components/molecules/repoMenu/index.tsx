import React, { useState } from "react";
import { BookmarkIcon, InfoIcon, MoreDotIcon } from "@components/atoms/icons";
import { repoActionDrawerAtom, repoAtom, repoInfoAtom } from "@atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "@material-tailwind/react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { IRepo } from "@interface/repo.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { usePathname } from "next/navigation";
import RepoDialogs from "../repoDialogs";
import useRepoMenuList, { MenuItem } from "./useRepoMenuList";
import { activeTourAtom, ETourSection } from "@atom/tour";

interface IProps {
  repo?: IRepo;
  showDrawer?: boolean;
}

const RepoMenu = ({ repo, showDrawer }: IProps) => {
  const currentPath = usePathname();

  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const setRepoInfo = useSetRecoilState(repoInfoAtom);
  const setActiveTour = useSetRecoilState(activeTourAtom);

  const [openRepoActionDrawer, setOpenRepoActionDrawer] =
    useRecoilState(repoActionDrawerAtom);

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
  });

  const setModalState = (key: keyof typeof modals, state: boolean) => {
    setModals((prev) => {
      return { ...prev, [key]: state };
    });
  };

  const handleRepoInfo = () => {
   setRepoInfo(repo);
  };

  const menuList = useRepoMenuList(
    repo || getRepo,
    setModalState,
    handleRepoInfo,
    setOpenRepoActionDrawer
  ).filter(Boolean) as MenuItem[];

  return (
    <>
      {!showDrawer ? (
        <div className="repo-menu flex items-center gap-1 justify-end">
          {currentPath === "/admin/repositories" ? (
            <Button
              placeholder="button"
              className="rounded-lg border-2 border-gray-50 
             bg-white p-1 shadow-none flex justify-center items-center h-8 w-8"
              onClick={() => {
                setActiveTour(ETourSection.REPO);
              }}
            >
              <InfoIcon className="w-4 h-4 stroke-purple-normal" />
            </Button>
          ) : null}
          <div
            className="repoInformationTab repoActions flex items-center gap-1 justify-end"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {repo?.bookmark ? (
              <BookmarkIcon className="w-4 h-4  fill-amber-600 stroke-amber-600" />
            ) : null}
            <MenuTemplate
              setOpenDrawer={() => {
                setOpenRepoActionDrawer(true);
                setRepo(repo || null);
              }}
              menuList={menuList}
              icon={
                <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
                  <MoreDotIcon className="w-4 h-4" />
                </div>
              }
            />
          </div>
        </div>
      ) : (
        <div className="repo-menu xs:hidden flex">
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
