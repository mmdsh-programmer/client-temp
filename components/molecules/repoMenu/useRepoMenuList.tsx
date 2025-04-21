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
  RepoActivityIcon,
  RestoreIcon,
  ShareIcon,
} from "@components/atoms/icons";

import { ERoles } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import React from "react";
import { repoActivityAtom, repoAtom } from "@atom/repository";
import { toPersianDigit } from "@utils/index";
import { useRecoilState, useSetRecoilState } from "recoil";

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
  | "versionRequests"
  | "repoActivity";

export interface MenuItem {
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: string;
}

const useMenuList = (
  repo: IRepo | null,
  setModalState: (type: ModalType, state: boolean) => void,
  handleRepoInfo: () => void,
  setOpenRepoActionDrawer: React.Dispatch<React.SetStateAction<boolean | null>>,
  showLog?: boolean
): MenuItem[] => {
  const setRepo = useSetRecoilState(repoAtom);
  const [showRepoActivity, setShowRepoActivity] = useRecoilState(repoActivityAtom);

  const createMenuItem = (
    menuText: string,
    menuIcon: React.JSX.Element,
    menuOnClick: () => void,
    className?: string
  ) => {
    return { text: menuText, icon: menuIcon, onClick: menuOnClick, className };
  };

  const ownerAdminActions = () => {
    return [
      window.location.pathname === "/admin/dashboard"
        ? createMenuItem(
            "اطلاعات پوشه",
            <FolderInfoIcon className="w-4 h-4" />,
            handleRepoInfo,
            "repo-menu__item--folder-info"
          )
        : null,
      createMenuItem(
        "ویرایش", 
        <EditIcon className="w-4 h-4" />, 
        () => {
          setModalState("edit", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--edit"
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
            },
            "repo-menu__item--bookmark"
          )
        : createMenuItem(
            "حذف بوکمارک",
            <BookmarkRepoIcon className="w-4 h-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              if (repo) {
                setRepo(repo);
              }
            },
            "repo-menu__item--bookmark-remove"
          ),
      createMenuItem(
        "اشتراک گذاری",
        <ShareIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setModalState("share", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--share"
      ),
      createMenuItem(
        "مدیریت فایل",
        <FileManagementIcon className="w-4 h-4 fill-icon-active" />,
        () => {
          setModalState("fileManagement", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--file-management"
      ),
      createMenuItem(
        "درخواست‌ها",
        <LastVersionIcon className="w-4 h-4" />,
        () => {
          setModalState("versionRequests", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--version-requests"
      ),
      showLog && createMenuItem(
        "فعالیت های مخزن",
        <RepoActivityIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setShowRepoActivity(!showRepoActivity);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--repo-activity"
      ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="w-4 h-4 fill-icon-active stroke-0" />,
          () => {
            const url = toPersianDigit(
              `/publish/${toPersianDigit(
                `${repo.name.replaceAll(/\s+/g, "-")}`
              )}/${repo.id}`
            );
            window.open(url, "_blank");
          },
          "repo-menu__item--publish"
        ),
      createMenuItem(
        "کلید های مخزن",
        <KeyIcon className="w-4 h-4 stroke-1" />,
        () => {
          setModalState("key", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--keys"
      ),
    ].filter(Boolean) as MenuItem[];
  };

  const ownerActions = () => {
    if (repo?.isArchived) {
      return [
        createMenuItem(
          "حذف", 
          <DeleteIcon className="w-4 h-4" />, 
          () => {
            setModalState("delete", true);
            setOpenRepoActionDrawer(false);
            if (repo) {
              setRepo(repo);
            }
          },
          "repo-menu__item--delete"
        ),
        createMenuItem(
          "بازگردانی", 
          <RestoreIcon className="w-4 h-4" />, 
          () => {
            setModalState("restore", true);
            setOpenRepoActionDrawer(false);
            if (repo) {
              setRepo(repo);
            }
          },
          "repo-menu__item--restore"
        ),
      ];
    }

    return [
      ...(ownerAdminActions() as MenuItem[]),
      createMenuItem(
        "بایگانی",
        <ArchiveActionIcon className="w-4 h-4 fill-icon-active" />,
        () => {
          setModalState("archive", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--archive"
      ),
      createMenuItem(
        "حذف", 
        <DeleteIcon className="w-4 h-4" />, 
        () => {
          setModalState("delete", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--delete"
      ),
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
        },
        "repo-menu__item--leave"
      ),
    ];
  };

  const defaultActions = () => {
    return [
      window.location.pathname === "dashboard" &&
        createMenuItem(
          "اطلاعات پوشه",
          <FolderInfoIcon className="w-4 h-4" />,
          handleRepoInfo,
          "repo-menu__item--folder-info"
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
            },
            "repo-menu__item--bookmark"
          )
        : createMenuItem(
            "حذف بوکمارک",
            <BookmarkRepoIcon className="w-4 h-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              if (repo) {
                setRepo(repo);
              }
            },
            "repo-menu__item--bookmark-remove"
          ),
      showLog && createMenuItem(
        "فعالیت های مخزن",
        <RepoActivityIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setShowRepoActivity(!showRepoActivity);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--repo-activity"
      ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="w-4 h-4 fill-icon-active stroke-0" />,
          () => {
            const url = toPersianDigit(
              `/publish/${toPersianDigit(
                `${repo.name.replaceAll(/\s+/g, "-")}`
              )}/${repo.id}`
            );
            window.open(url, "_blank");
          },
          "repo-menu__item--publish"
        ),
      createMenuItem(
        "کلید های مخزن",
        <KeyIcon className="w-4 h-4 stroke-1" />,
        () => {
          setModalState("key", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--keys"
      ),
      createMenuItem(
        "ترک مخزن",
        <LeaveRepoIcon className="w-4 h-4 stroke-icon-active" />,
        () => {
          setModalState("leave", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--leave"
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
