import {
  ArchiveActionIcon,
  BookmarkRepoIcon,
  DeleteIcon,
  EditIcon,
  FileManagementIcon,
  FolderInfoIcon,
  KeyIcon,
  LastVersionIcon,
  LeaveRepoIcon,
  PublishIcon,
  RestoreIcon,
  ShareIcon,
} from "@components/atoms/icons";

import { ERoles } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import React from "react";
import { repoAtom } from "@atom/repository";
import { toPersianDigit } from "@utils/index";
import { useSetRecoilState } from "recoil";

type ModalType =
  | "delete"
  | "restore"
  | "edit"
  | "bookmark"
  | "share"
  | "key"
  | "leave"
  | "archive"
  | "fileManagement"
  | "versionRequests";

export interface MenuItem {
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
}

const useMenuList = (
  repo: IRepo | null,
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
      window.location.pathname === "/admin/dashboard"
        ? createMenuItem(
            "اطلاعات پوشه",
            <FolderInfoIcon className="w-4 h-4" />,
            handleRepoInfo
          )
        : null,
      createMenuItem("ویرایش", <EditIcon className="w-4 h-4" />, () => {
        setModalState("edit", true);
        if (repo) {
          setRepo(repo);
        }
      }),
      !repo?.bookmark
        ? createMenuItem(
            "بوکمارک کردن",
            <BookmarkRepoIcon className="w-4 h-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              if (repo) {
                setRepo(repo);
              }
            }
          )
        : createMenuItem(
            "حذف بوکمارک",
            <BookmarkRepoIcon className="w-4 h-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              if (repo) {
                setRepo(repo);
              }
            }
          ),
      createMenuItem(
        "اشتراک گذاری",
        <ShareIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setModalState("share", true);
          if (repo) {
            setRepo(repo);
          }
        }
      ),
      createMenuItem(
        "مدیریت فایل",
        <FileManagementIcon className="w-4 h-4 fill-icon-active" />,
        () => {
          setModalState("fileManagement", true);
          if (repo) {
            setRepo(repo);
          }
        }
      ),
      createMenuItem(
        "درخواست‌ها",
        <LastVersionIcon className="w-4 h-4" />,
        () => {
          setModalState("versionRequests", true);
          if (repo) {
            setRepo(repo);
          }
        }
      ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="w-4 h-4 fill-icon-active stroke-0" />,
          () => {
            window.open(
              toPersianDigit(`/publish/${repo.id}/${toPersianDigit(
                `${repo.name.replaceAll(/\s+/g, "-")}`
              )}`),
              "_blank"
            );
          }
        ),
    ].filter(Boolean) as MenuItem[];
  };

  const ownerActions = () => {
    if (repo?.isArchived) {
      return [
        createMenuItem("حذف", <DeleteIcon className="w-4 h-4" />, () => {
          setModalState("delete", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        }),
        createMenuItem("بازگردانی", <RestoreIcon className="w-4 h-4" />, () => {
          setModalState("restore", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        }),
      ];
    }

    return [
      ...(ownerAdminActions() as MenuItem[]),
      createMenuItem(
        "کلید های مخزن",
        <KeyIcon className="w-4 h-4 stroke-1" />,
        () => {
          setModalState("key", true);
          if (repo) {
            setRepo(repo);
          }
        }
      ),
      createMenuItem(
        "بایگانی",
        <ArchiveActionIcon className="w-4 h-4 fill-icon-active" />,
        () => {
          setModalState("archive", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        }
      ),
      createMenuItem("حذف", <DeleteIcon className="w-4 h-4" />, () => {
        setModalState("delete", true);
        setOpenRepoActionDrawer(false);
        if (repo) {
          setRepo(repo);
        }
      }),
    ];
  };

  const adminActions = () => {
    return [
      ...ownerAdminActions(),
      createMenuItem(
        "ترک مخزن",
        <LeaveRepoIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setModalState("leave", true);
          if (repo) {
            setRepo(repo);
          }
        }
      ),
    ];
  };

  const defaultActions = () => {
    return [
      window.location.pathname === "dashboard" &&
        createMenuItem(
          "اطلاعات پوشه",
          <FolderInfoIcon className="w-4 h-4" />,
          handleRepoInfo
        ),
      !repo?.bookmark
        ? createMenuItem(
            "بوکمارک کردن",
            <BookmarkRepoIcon className="w-4 h-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              if (repo) {
                setRepo(repo);
              }
            }
          )
        : createMenuItem(
            "حذف بوکمارک",
            <BookmarkRepoIcon className="w-4 h-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              if (repo) {
                setRepo(repo);
              }
            }
          ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="w-4 h-4 fill-icon-active stroke-0" />,
          () => {}
        ),
      createMenuItem(
        "ترک مخزن",
        <LeaveRepoIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setModalState("leave", true);
          if (repo) {
            setRepo(repo);
          }
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
