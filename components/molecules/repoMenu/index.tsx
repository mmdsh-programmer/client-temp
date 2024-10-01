import React, { useState } from "react";
import {MoreDotIcon,
  StarIcon,} from "@components/atoms/icons";
import { repoInfoAtom } from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "@material-tailwind/react";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { EListMode } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { listModeAtom } from "@atom/app";
import { useRouter } from "next/navigation";
import RepoDialogs from "../repoDialogs";
import useRepoMenuList from "./useRepoMenuList";

interface IProps {
  repo?: IRepo;
  showDrawer?: boolean;
}

const RepoMenu = ({ repo, showDrawer }: IProps) => {
  const router = useRouter();

  const mode = useRecoilValue(listModeAtom);
  const setRepoInfo = useSetRecoilState(repoInfoAtom);

  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState<
    boolean | null
  >(false);

  const [modals, setModals] = useState({
    edit: false,
    delete: false,
    archive: false,
    restore: false,
    bookmark: false,
    share: false,
    key: false,
    leave: false,
  });

  const setModalState = (key: keyof typeof modals, state: boolean) => {
    setModals((prev) => {
      return { ...prev, [key]: state };
    });
  };

  const handleRepoInfo = () => {
    if (mode === EListMode.card) setRepoInfo(repo);
    else router.push(`/admin/repositories?repoId=${repo?.id}`);
  };

  const menuList = useRepoMenuList(repo, setModalState, handleRepoInfo, setOpenRepoActionDrawer);
  return (
    <>
      {!showDrawer ? (
        <div className="flex items-center gap-1 justify-end">
          {repo?.isArchived ? null : (
            <Button
              placeholder="button"
              className="rounded-lg border-2 border-gray-50 
             bg-white p-1 shadow-none flex justify-center items-center h-8 w-8"
              onClick={() => {
                setModalState("bookmark", true);
              }}
            >
              <StarIcon
                className={`w-4 h-4 ${repo?.bookmark ? "fill-amber-600 stroke-amber-600" : "stroke-icon-active"}`}
              />
            </Button>
          )}
          <MenuTemplate
            setOpenDrawer={() => {
              setOpenRepoActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
                <MoreDotIcon className="w-4 h-4" />
              </div>
            }
          />
        </div>
      ) : null}
      <DrawerTemplate
        openDrawer={openRepoActionDrawer}
        setOpenDrawer={setOpenRepoActionDrawer}
        menuList={menuList}
      />
      <RepoDialogs modals={modals} setModalState={setModalState} repo={repo} />
    </>
  );
};

export default RepoMenu;
