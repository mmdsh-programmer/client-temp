import React, { useState } from "react";
import {
  ArchiveIcon,
  DeleteIcon,
  EditIcon,
  FolderInfoIcon,
  KeyIcon,
  MoreDotIcon,
  PublishIcon,
  RestoreIcon,
  ShareIcon,
  StarIcon,
} from "@components/atoms/icons";
import { IRepo } from "@interface/repo.interface";
import RepoDeleteDialog from "@components/organisms/dialogs/repository/repoDeleteDialog";
import RepoArchiveDialog from "@components/organisms/dialogs/repository/repoArchiveDialog";
import RepoRestoreDialog from "@components/organisms/dialogs/repository/repoRestoreDialog";
import RepoShareDialog from "@components/organisms/dialogs/repository/repoShareDialog";
import RepoEditDialog from "@components/organisms/dialogs/repository/repoEditDialog";
import { useRouter } from "next/navigation";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listMode } from "@atom/app";
import { repoAtom, repoInfoAtom } from "@atom/repository";
import { EListMode } from "@interface/enums";
import RepoKeyDialog from "@components/organisms/dialogs/repository/repoKey";
import { Button } from "@material-tailwind/react";
import RepoBookmarkDialog from "@components/organisms/dialogs/repository/repoBookmarkDialog";

interface IProps {
  repo: IRepo;
  archived?: boolean;
}

const RepoMenu = ({ archived, repo }: IProps) => {
  const router = useRouter();
  const [editRepoModal, setEditRepoModal] = useState(false);
  const [deleteRepoModal, setDeleteRepoModal] = useState(false);
  const [archiveRepoModal, setArchiveRepoModal] = useState(false);
  const [restoreRepoModal, setRestoreRepoModal] = useState(false);
  const [bookmarkRepoModal, setBookmarkRepoModal] = useState(false);
  const [shareRepoModal, setShareRepoModal] = useState(false);
  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState<
    boolean | null
  >(false);
  const [repoKeyModal, setRepoKeyModal] = useState(false);

  const mode = useRecoilValue(listMode);
  const setRepo = useSetRecoilState(repoAtom);
  const setRepoInfo = useSetRecoilState(repoInfoAtom);

  const adminRole = repo.roleName === "owner" || repo.roleName === "admin";

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
            onClick: () => {
              if (mode === EListMode.card) {
                setRepoInfo(repo);
              } else {
                router.push(`/admin/repositories?repoId=${repo.id}`);
              }
            },
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
            onClick: () => {
              setShareRepoModal(true);

              setRepo(repo);
            },
          },
          {
            text: "لیست کلید های مخزن",
            icon: <KeyIcon className="w-4 h-4 stroke-1" />,
            onClick: () => setRepoKeyModal(true),
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
            onClick: () => {
              if (mode === EListMode.card) {
                setRepoInfo(repo);
              } else {
                router.push(`/admin/repositories?repoId=${repo.id}`);
              }
            },
          },
        ];

  return (
    <>
      <div className="flex items-center gap-1 justify-end">
        {archived ? null : (
          <Button
            placeholder="button"
            className="rounded-lg border-2 border-gray-50 
             bg-white p-1 shadow-none flex justify-center items-center h-8 w-8"
            onClick={() => {
              setBookmarkRepoModal(true);
            }}
          >
            <StarIcon
              className={`w-4 h-4 ${repo.bookmark ? "fill-amber-600 stroke-amber-600" : "stroke-icon-active"}`}
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
      <DrawerTemplate
        openDrawer={openRepoActionDrawer}
        setOpenDrawer={setOpenRepoActionDrawer}
        menuList={menuList}
      />

    </>
  );
};

export default RepoMenu;
