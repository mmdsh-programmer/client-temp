import React from "react";
import {
  ArchiveIcon,
  DeleteIcon,
  EditIcon,
  FolderInfoIcon,
  KeyIcon,
  LeaveRepoIcon,
  PublishIcon,
  RestoreIcon,
  ShareIcon,
} from "@components/atoms/icons";
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import { IRepo } from "@interface/repo.interface";
import { ERoles } from "@interface/enums";

type ModalType =
  | "delete"
  | "restore"
  | "edit"
  | "share"
  | "key"
  | "leave"
  | "archive";

interface MenuItem {
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
}

const useMenuList = (
  repo: IRepo | undefined,
  setModalState: (type: ModalType, state: boolean) => void,
  handleRepoInfo: () => void,
  setOpenRepoActionDrawer: React.Dispatch<React.SetStateAction<boolean | null>>
): MenuItem[] => {
  const setRepo = useSetRecoilState(repoAtom);

  const createMenuItem = (
    menuText: string,
    menuIcon: React.JSX.Element,
    menuOnClick: () => void
  ) => {
    return { text: menuText, icon: menuIcon, onClick: menuOnClick };
  };

  const ownerAdminActions = () => {
    return [
      window.location.pathname === "/admin/dashboard" &&
        createMenuItem(
          "اطلاعات پوشه",
          <FolderInfoIcon className="w-4 h-4" />,
          handleRepoInfo
        ),
      createMenuItem("ویرایش", <EditIcon className="w-4 h-4" />, () => {
        setModalState("edit", true);
      }),
      createMenuItem("اشتراک گذاری", <ShareIcon className="w-4 h-4" />, () => {
        setModalState("share", true);
        if (repo) {
          setRepo(repo);
        }
      }),
      createMenuItem(
        "لیست کلید های مخزن",
        <KeyIcon className="w-4 h-4 stroke-1" />,
        () => {
          setModalState("key", true);
        }
      ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="w-4 h-4 stroke-icon-active" />,
          () => {}
        ),
    ].filter(Boolean) as MenuItem[];
  };

  const ownerActions = () => {
    if (repo?.isArchived) {
      return [
        createMenuItem("حذف", <DeleteIcon className="w-4 h-4" />, () => {
          setModalState("delete", true);
          setOpenRepoActionDrawer(false);
        }),
        createMenuItem("بازگردانی", <RestoreIcon className="w-4 h-4" />, () => {
          setModalState("restore", true);
          setOpenRepoActionDrawer(false);
        }),
      ];
    }

    return [
      ...(ownerAdminActions() as MenuItem[]),
      createMenuItem(
        "بایگانی",
        <ArchiveIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setModalState("archive", true);
          setOpenRepoActionDrawer(false);
        }
      ),
      createMenuItem("حذف", <DeleteIcon className="w-4 h-4" />, () => {
        setModalState("delete", true);
        setOpenRepoActionDrawer(false);
      }),
    ];
  };

  const adminActions = () => {
    if (!repo?.isArchived) {
      return [
        ...ownerAdminActions(),
        createMenuItem(
          "ترک مخزن",
          <LeaveRepoIcon className="w-4 h-4 stroke-icon-active" />,
          () => {
            setModalState("leave", true);
          }
        ),
      ];
    }
  };

  const defaultActions = () => {
    return [
      window.location.pathname === "dashboard" &&
        createMenuItem(
          "اطلاعات پوشه",
          <FolderInfoIcon className="w-4 h-4" />,
          handleRepoInfo
        ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="w-4 h-4 stroke-icon-active" />,
          () => {}
        ),
      createMenuItem(
        "ترک مخزن",
        <LeaveRepoIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setModalState("leave", true);
        }
      ),
    ];
  };

  if (repo?.roleName === ERoles.owner) {
    return ownerActions() as MenuItem[];
  }
  if (repo?.roleName === ERoles.admin) {
    return adminActions() as MenuItem[];
  }
  return defaultActions() as MenuItem[];
};

export default useMenuList;
