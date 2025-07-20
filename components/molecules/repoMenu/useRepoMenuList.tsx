import {
  ArchiveActionIcon,
  BookmarkRepoIcon,
  DeleteIcon,
  EditIcon,
  FeedIcon,
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
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { repoFeedAtom } from "@atom/feed";

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
  | "repoActivity"
  | "privateFeed";

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
  showLog?: boolean,
): MenuItem[] => {
  const setRepo = useSetRecoilState(repoAtom);
  const [showRepoActivity, setShowRepoActivity] = useRecoilState(repoActivityAtom);
  const setRepoFeed = useSetRecoilState(repoFeedAtom);

  const { data: getDomainInfo } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePrivateFeed } = content;

  const createMenuItem = (
    menuText: string,
    menuIcon: React.JSX.Element,
    menuOnClick: () => void,
    className?: string,
  ) => {
    return { text: menuText, icon: menuIcon, onClick: menuOnClick, className };
  };

  const ownerAdminActions = () => {
    return [
      window.location.pathname === "/admin/dashboard"
        ? createMenuItem(
            "اطلاعات پوشه",
            <FolderInfoIcon className="h-4 w-4" />,
            handleRepoInfo,
            "repo-menu__item--folder-info",
          )
        : null,
      createMenuItem(
        "ویرایش",
        <EditIcon className="h-4 w-4" />,
        () => {
          setModalState("edit", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--edit",
      ),
      !repo?.bookmark
        ? createMenuItem(
            "بوکمارک کردن",
            <BookmarkRepoIcon className="h-4 w-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              setOpenRepoActionDrawer(false);
              if (repo) {
                setRepo(repo);
              }
            },
            "repo-menu__item--bookmark",
          )
        : createMenuItem(
            "حذف بوکمارک",
            <BookmarkRepoIcon className="h-4 w-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              setOpenRepoActionDrawer(false);
              if (repo) {
                setRepo(repo);
              }
            },
            "repo-menu__item--bookmark-remove",
          ),
      createMenuItem(
        "اشتراک گذاری",
        <ShareIcon className="h-4 w-4 stroke-icon-active" />,
        () => {
          setModalState("share", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--share",
      ),
      createMenuItem(
        "مدیریت فایل",
        <FileManagementIcon className="h-4 w-4 fill-icon-active" />,
        () => {
          setModalState("fileManagement", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--file-management",
      ),
      createMenuItem(
        "درخواست‌ها",
        <LastVersionIcon className="h-4 w-4" />,
        () => {
          setModalState("versionRequests", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--version-requests",
      ),
      // showLog && createMenuItem(
      //   "فعالیت های مخزن",
      //   <RepoActivityIcon className="w-4 h-4 stroke-icon-active" />,
      //   () => {
      //     setShowRepoActivity(!showRepoActivity);
      //     if (repo) {
      //       setRepo(repo);
      //     }
      //   },
      //   "repo-menu__item--repo-activity"
      // ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="h-4 w-4 fill-icon-active stroke-0" />,
          () => {
            const url = toPersianDigit(
              `/publish/${toPersianDigit(`${repo.name.replaceAll(/\s+/g, "-")}`)}/${repo.id}`,
            );
            window.open(url, "_blank");
          },
          "repo-menu__item--publish",
        ),
      createMenuItem(
        "کلید های مخزن",
        <KeyIcon className="h-4 w-4 stroke-1" />,
        () => {
          setModalState("key", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--keys",
      ),
    ].filter(Boolean) as MenuItem[];
  };

  const ownerActions = () => {
    if (repo?.isArchived) {
      return [
        createMenuItem(
          "حذف",
          <DeleteIcon className="h-4 w-4" />,
          () => {
            setModalState("delete", true);
            setOpenRepoActionDrawer(false);
            if (repo) {
              setRepo(repo);
            }
          },
          "repo-menu__item--delete",
        ),
        createMenuItem(
          "بازگردانی",
          <RestoreIcon className="h-4 w-4" />,
          () => {
            setModalState("restore", true);
            setOpenRepoActionDrawer(false);
            if (repo) {
              setRepo(repo);
            }
          },
          "repo-menu__item--restore",
        ),
      ];
    }

    return [
      ...(ownerAdminActions() as MenuItem[]),
      enablePrivateFeed && repo?.isPublish
        ? createMenuItem(
            "ایجاد خبرنامه خصوصی",
            <FeedIcon className="h-4 w-4" />,
            () => {
              setModalState("privateFeed", true);
              setOpenRepoActionDrawer(false);
              if (repo) {
                setRepoFeed({ label: repo.name, value: repo.id });
                setRepo(repo);
              }
            },
            "repo-menu__item--private-feed",
          )
        : null,
      createMenuItem(
        "بایگانی",
        <ArchiveActionIcon className="h-4 w-4 fill-icon-active" />,
        () => {
          setModalState("archive", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--archive",
      ),
      createMenuItem(
        "حذف",
        <DeleteIcon className="h-4 w-4" />,
        () => {
          setModalState("delete", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--delete",
      ),
    ];
  };

  const adminActions = () => {
    return [
      ...ownerAdminActions(),
      createMenuItem(
        "ترک مخزن",
        <LeaveRepoIcon className="h-4 w-4 stroke-icon-active" />,
        () => {
          setModalState("leave", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--leave",
      ),
    ];
  };

  const defaultActions = () => {
    return [
      window.location.pathname === "dashboard" &&
        createMenuItem(
          "اطلاعات پوشه",
          <FolderInfoIcon className="h-4 w-4" />,
          handleRepoInfo,
          "repo-menu__item--folder-info",
        ),
      !repo?.bookmark
        ? createMenuItem(
            "بوکمارک کردن",
            <BookmarkRepoIcon className="h-4 w-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              if (repo) {
                setRepo(repo);
              }
            },
            "repo-menu__item--bookmark",
          )
        : createMenuItem(
            "حذف بوکمارک",
            <BookmarkRepoIcon className="h-4 w-4 fill-icon-active stroke-0" />,
            () => {
              setModalState("bookmark", true);
              setOpenRepoActionDrawer(false);
              if (repo) {
                setRepo(repo);
              }
            },
            "repo-menu__item--bookmark-remove",
          ),
      createMenuItem(
        "اشتراک گذاری",
        <ShareIcon className="h-4 w-4 stroke-icon-active" />,
        () => {
          setModalState("share", true);
          setOpenRepoActionDrawer(false);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--share",
      ),
      showLog &&
        createMenuItem(
          "فعالیت های مخزن",
          <RepoActivityIcon className="h-4 w-4 stroke-icon-active" />,
          () => {
            setShowRepoActivity(!showRepoActivity);
            if (repo) {
              setRepo(repo);
            }
          },
          "repo-menu__item--repo-activity",
        ),
      repo?.isPublish &&
        createMenuItem(
          "مخزن منتشرشده",
          <PublishIcon className="h-4 w-4 fill-icon-active stroke-0" />,
          () => {
            const url = toPersianDigit(
              `/publish/${toPersianDigit(`${repo.name.replaceAll(/\s+/g, "-")}`)}/${repo.id}`,
            );
            window.open(url, "_blank");
          },
          "repo-menu__item--publish",
        ),
      createMenuItem(
        "کلید های مخزن",
        <KeyIcon className="h-4 w-4 stroke-1" />,
        () => {
          setModalState("key", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--keys",
      ),
      createMenuItem(
        "ترک مخزن",
        <LeaveRepoIcon className="h-4 w-4 stroke-icon-active" />,
        () => {
          setModalState("leave", true);
          if (repo) {
            setRepo(repo);
          }
        },
        "repo-menu__item--leave",
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
