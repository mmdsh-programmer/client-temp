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
  repo?: IRepo;
  showDrawer?: boolean;
}

const RepoMenu = ({ repo, showDrawer }: IProps) => {
  const router = useRouter();

  const mode = useRecoilValue(listMode);
  const setRepo = useSetRecoilState(repoAtom);
  const setRepoInfo = useSetRecoilState(repoInfoAtom);

  const [editRepoModal, setEditRepoModal] = useState(false);
  const [deleteRepoModal, setDeleteRepoModal] = useState(false);
  const [archiveRepoModal, setArchiveRepoModal] = useState(false);
  const [restoreRepoModal, setRestoreRepoModal] = useState(false);
  const [bookmarkRepoModal, setBookmarkRepoModal] = useState(false);
  const [shareRepoModal, setShareRepoModal] = useState(false);
  const [repoKeyModal, setRepoKeyModal] = useState(false);
  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState<
    boolean | null
  >(false);

  const adminRole = repo?.roleName === "owner" || repo?.roleName === "admin";

  const menuList = [
    ...(repo?.isArchived
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
            repo?.isPublish && {
              text: "مخزن منتشرشده",
              icon: <PublishIcon className="w-4 h-4 stroke-black" />,
              onClick: () => {},
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
                  router.push(`/admin/repositories?repoId=${repo?.id}`);
                }
              },
            },
            repo?.isPublish && {
              text: "مخزن منتشرشده",
              icon: <PublishIcon className="w-4 h-4 stroke-black" />,
              onClick: () => {},
            },
          ]
    ).filter(
      (
        item,
      ): item is {
        text: string;
        icon: React.JSX.Element;
        onClick: () => void;
      } => Boolean(item),
    ),
  ];

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
                setBookmarkRepoModal(true);
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

      {editRepoModal && (
        <RepoEditDialog repo={repo} setOpen={setEditRepoModal} />
      )}
      {deleteRepoModal && (
        <RepoDeleteDialog repo={repo} setOpen={setDeleteRepoModal} />
      )}
      {archiveRepoModal && (
        <RepoArchiveDialog repo={repo} setOpen={setArchiveRepoModal} />
      )}
      {restoreRepoModal && (
        <RepoRestoreDialog repo={repo} setOpen={setRestoreRepoModal} />
      )}
      {shareRepoModal && (
        <RepoShareDialog repo={repo} setOpen={setShareRepoModal} />
      )}
      {bookmarkRepoModal && (
        <RepoBookmarkDialog repo={repo} setOpen={setBookmarkRepoModal} />
      )}
      {repoKeyModal && <RepoKeyDialog repo={repo} setOpen={setRepoKeyModal} />}
    </>
  );
};

export default RepoMenu;
