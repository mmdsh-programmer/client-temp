import React, { useEffect, useState } from "react";
import { Button, Drawer, Typography } from "@material-tailwind/react";
import {
  ArchiveIcon,
  DeleteIcon,
  EditIcon,
  FolderInfoIcon,
  MoreDotIcon,
  RestoreIcon,
  ShareIcon,
  StarIcon,
} from "@components/atoms/icons";
import { IRepo } from "@interface/repo.interface";
import RepoDeleteDialog from "@components/organisms/dialogs/repository/repoDeleteDialog";
import RepoArchiveDialog from "@components/organisms/dialogs/repository/repoArchiveDialog";
import RepoRestoreDialog from "@components/organisms/dialogs/repository/repoRestoreDialog";
import RepoShareDialog from "@components/organisms/dialogs/repository/repoShareDialog";
import ButtonAtom from "@components/atoms/button";
import RepoEditDialog from "@components/organisms/dialogs/repository/repoEditDialog";
import MenuComponent from "../menu";
import { listMode } from "@atom/app";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

interface IProps {
  repo: IRepo;
  archived?: boolean;
  isList?: boolean;
}

const RepoMenu = ({ archived, repo, isList }: IProps) => {
  const router = useRouter();
  const [editRepoModal, setEditRepoModal] = useState(false);
  const [deleteRepoModal, setDeleteRepoModal] = useState(false);
  const [archiveRepoModal, setArchiveRepoModal] = useState(false);
  const [restoreRepoModal, setRestoreRepoModal] = useState(false);
  const [bookmarkRepoModal, setBookmarkRepoModal] = useState(false);
  const [shareRepoModal, setShareRepoModal] = useState(false);
  const [goToRepo, setGoToRepo] = useState(false);
  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState(false);
  const mode = useRecoilValue(listMode);

  const adminRole = repo.roleName === "owner" || repo.roleName === "admin";

  useEffect(() => {
    if (!!goToRepo) {
      router.push(`/admin/repositories?repoId=${repo.id}`);
    }
  }, [goToRepo]);
  const menuList = archived
    ? [
        {
          text: "حذف",
          icon: <DeleteIcon className="w-4 h-4" />,
          onClick: () => {
            setDeleteRepoModal(true);
            setOpenRepoActionDrawer(false);
          },
        },
        {
          text: "بازگردانی",
          icon: <RestoreIcon className="w-4 h-4" />,
          onClick: () => setRestoreRepoModal(true),
        },
      ]
    : adminRole
      ? [
          {
            text: "اطلاعات پوشه",
            icon: <FolderInfoIcon className="w-4 h-4" />,
            onClick: () => setGoToRepo(true),
          },
          {
            text: "ویرایش",
            icon: <EditIcon className="w-4 h-4" />,
            onClick: () => setEditRepoModal(true),
          },
          {
            text: "بایگانی",
            icon: <ArchiveIcon className="w-4 h-4 stroke-black" />,
            onClick: () => {
              setArchiveRepoModal(true);
              setOpenRepoActionDrawer(false);
            },
          },
          {
            text: "اشتراک گذاری",
            icon: <ShareIcon className="w-4 h-4" />,
            onClick: () => setShareRepoModal(true),
          },
          {
            text: "حذف",
            icon: <DeleteIcon className="w-4 h-4" />,
            onClick: () => {
              setDeleteRepoModal(true);
              setOpenRepoActionDrawer(false);
            },
          },
        ]
      : [
          {
            text: "اطلاعات پوشه",
            icon: <FolderInfoIcon className="w-4 h-4" />,
            onClick: () => setGoToRepo(true),
          },
        ];

  return (
    <div className="">
      {isList ? (
        <>
          <div className="hidden xs:flex flex-wrap gap-1 mr-6">
            {adminRole && (
              <>
                <Button
                  placeholder=""
                  className="flex bg-white p-2"
                  onClick={() => {
                    setDeleteRepoModal(true);
                    setOpenRepoActionDrawer(false);
                  }}
                >
                  <DeleteIcon className="w-4 h-4" />
                </Button>
                <Button
                  placeholder=""
                  className="flex bg-white p-2"
                  onClick={() => {
                    setEditRepoModal(true);
                  }}
                >
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button
                  placeholder=""
                  className="flex bg-white p-2"
                  onClick={() => {
                    setShareRepoModal(true);
                  }}
                >
                  <ShareIcon className="w-4 h-4" />
                </Button>
                <Button
                  placeholder=""
                  className="flex bg-white p-2"
                  onClick={() => {
                    setArchiveRepoModal(true);
                    setOpenRepoActionDrawer(false);
                  }}
                >
                  <ArchiveIcon className="w-4 h-4 stroke-gray-900" />
                </Button>
              </>
            )}
            <Button
              placeholder=""
              className="flex xs:hidden bg-white p-2"
              onClick={() => {
                setBookmarkRepoModal(true);
              }}
            >
              <StarIcon className="w-4 h-4 stroke-gray-900" />
            </Button>
          </div>
          <div className="block xs:hidden">
            <div className="flex gap-x-2 justify-end">
              <Button
                className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8"
                placeholder="menu-button"
                onClick={() => {
                  setOpenRepoActionDrawer(true);
                }}
              >
                <MoreDotIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex gap-x-2 justify-end">
          {archived ? null : (
            <ButtonAtom
              className="rounded-lg border-2 border-gray-50 
             bg-white p-1 shadow-none flex justify-center items-center h-8 w-8"
            >
              <StarIcon className="w-4 h-4" />
            </ButtonAtom>
          )}
          <div className="hidden xs:block">
            <MenuComponent variant="small" menuList={menuList}>
              <Button
                className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8"
                placeholder="menu-button"
              >
                <MoreDotIcon className="w-4 h-4" />
              </Button>
            </MenuComponent>
          </div>
          <div className="block xs:hidden">
            <div className="flex gap-x-2 justify-end">
              <Button
                className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8"
                placeholder="menu-button"
                onClick={() => {
                  setOpenRepoActionDrawer(true);
                }}
              >
                <MoreDotIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      <Drawer
        placement="bottom"
        open={openRepoActionDrawer}
        onClose={() => setOpenRepoActionDrawer(false)}
        className="p-4 !h-auto"
        placeholder="repo-action-drawer"
      >
        <ul
          className={`w-full
                   ml-4 font-iranYekan text-primary overflow-hidden p-[2px]`}
        >
          {menuList.map((menuItem, index) => {
            return (
              <li
                key={index}
                className={`cursor-pointer py-2 flex`}
                onClick={menuItem.onClick}
              >
                <div className="flex items-center">
                  {menuItem.icon}
                  <Typography
                    placeholder="menu-item-text"
                    className={`font-iranYekan font-medium text-base mr-2`}
                  >
                    {menuItem.text}
                  </Typography>
                </div>
              </li>
            );
          })}
        </ul>
      </Drawer>

      {editRepoModal && (
        <RepoEditDialog repo={repo} setOpen={setEditRepoModal} />
      )}
      {deleteRepoModal && (
        <RepoDeleteDialog
          repo={repo}
          setOpen={setDeleteRepoModal}
        />
      )}
      {archiveRepoModal && (
        <RepoArchiveDialog repo={repo} setOpen={setArchiveRepoModal} />
      )}
      {restoreRepoModal && (
        <RepoRestoreDialog
          repo={repo}
          setOpen={setRestoreRepoModal}
        />
      )}
      {shareRepoModal && (
        <RepoShareDialog
          repo={repo}
          setOpen={setShareRepoModal}
        />
      )}
    </div>
  );
};

export default RepoMenu;
