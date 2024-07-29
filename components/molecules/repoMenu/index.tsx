import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import MenuTemplate from "@components/templates/menuTemplate";
import DrawerTemplate from "@components/templates/drawerTemplate";

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
  const [openRepoActionDrawer, setOpenRepoActionDrawer] = useState<
    boolean | null
  >(false);

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
          <div className="hidden xs:flex flex-wrap gap-2 mr-6">
            {adminRole && (
              <>
                {menuList.map((item, index) => {
                  return (
                    index !== 0 && (
                      <ButtonAtom
                        className="bg-white !p-2 border-[1px] border-normal"
                        onClick={() => {
                          item.onClick();
                          setOpenRepoActionDrawer(false);
                        }}
                      >
                        {item.icon}
                      </ButtonAtom>
                    )
                  );
                })}
              </>
            )}
            <ButtonAtom
              className="bg-white !p-2 border-[1px] border-normal"
              onClick={() => {
                setBookmarkRepoModal(true);
              }}
            >
              <StarIcon className="w-4 h-4 stroke-gray-900" />
            </ButtonAtom>
          </div>
          <div className="flex xs:hidden">
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
        </>
      ) : (
        <div className="flex items-center gap-x-2 justify-end">
          {archived ? null : (
            <ButtonAtom
              className="rounded-lg border-2 border-gray-50 
             bg-white p-1 shadow-none flex justify-center items-center h-8 w-8"
            >
              <StarIcon className="w-4 h-4" />
            </ButtonAtom>
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
      )}
      <div className="xs:hidden flex">
        <DrawerTemplate
          openDrawer={openRepoActionDrawer}
          setOpenDrawer={setOpenRepoActionDrawer}
          menuList={menuList}
        />
      </div>

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
    </div>
  );
};

export default RepoMenu;
