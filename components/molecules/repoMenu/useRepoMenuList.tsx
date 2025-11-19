import React from "react";
import { usePathname } from "next/navigation";
import { toPersianDigit } from "@utils/index";
import { ERoles } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { useFeedStore } from "@store/feed";
import { useRepoActivityStore } from "@store/repository";
import {
  AlertIcon,
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
  LockIcon,
  PublishIcon,
  RepoActivityIcon,
  RestoreIcon,
  ShareIcon,
} from "@components/atoms/icons";

export interface MenuItem {
  text: string;
  icon?: React.JSX.Element;
  onClick: () => void;
  className?: string;
}

const createItem = (
  text: string,
  icon: React.JSX.Element,
  onClick: () => void,
  className?: string,
): MenuItem => {
  return { text, icon, onClick, className };
};

const getBaseMenuItems = (repo: IRepo, setModal: (modal: string) => void): MenuItem[] => {
  return [
    createItem(
      repo.bookmark ? "حذف بوکمارک" : "بوکمارک کردن",
      <BookmarkRepoIcon className="h-4 w-4 fill-icon-active stroke-0" />,
      () => {
        return setModal("bookmark");
      },
      repo.bookmark ? "repo-menu__item--bookmark" : "repo-menu__item--bookmark-remove",
    ),
    createItem(
      "اشتراک گذاری",
      <ShareIcon className="h-4 w-4 stroke-icon-active" />,
      () => {
        return setModal("share");
      },
      "repo-menu__item--share",
    ),
    createItem(
      "اعلانات من",
      <AlertIcon className="h-4 w-4 stroke-1" />,
      () => {
        setModal("myNotif");
      },
      "repo-menu__item--my-notif",
    ),
    createItem(
      "کلید های مخزن",
      <KeyIcon className="h-4 w-4 stroke-1" />,
      () => {
        return setModal("key");
      },
      "repo-menu__item--keys",
    ),
    ...(repo.isPublish
      ? [
          createItem(
            "مخزن منتشرشده",
            <PublishIcon className="h-4 w-4 fill-icon-active stroke-0" />,
            () => {
              const url = toPersianDigit(
                `/publish/${toPersianDigit(`${repo.name.replaceAll(/\s+/g, "-")}`)}/${repo.id}`,
              );
              window.open(url, "_blank");
            },
          ),
        ]
      : []),
  ];
};

const getAdminMenuItems = (repo: IRepo, setModal: (modal: string) => void): MenuItem[] => {
  return [
    createItem(
      "ویرایش",
      <EditIcon className="h-4 w-4" />,
      () => {
        setModal("edit");
      },
      "repo-menu__item--edit",
    ),
    createItem(
      "مدیریت فایل",
      <FileManagementIcon className="h-4 w-4 fill-icon-active" />,
      () => {
        return setModal("fileManagement");
      },
      "repo-menu__item--file-management",
    ),
    createItem(
      "درخواست‌ها",
      <LastVersionIcon className="h-4 w-4" />,
      () => {
        return setModal("versionRequests");
      },
      "repo-menu__item--version-requests",
    ),
    ...getBaseMenuItems(repo, setModal),
  ];
};

const getOwnerMenuItems = (repo: IRepo, setModal: (modal: string) => void): MenuItem[] => {
  return [
    ...getAdminMenuItems(repo, setModal),
    createItem(
      "درخواست‌های دسترسی سند",
      <LockIcon className="h-4 w-4" />,
      () => {
        return setModal("documentWhiteList");
      },
      "repo-menu__document-white-list",
    ),
    createItem(
      "بایگانی",
      <ArchiveActionIcon className="h-4 w-4 fill-icon-active" />,
      () => {
        return setModal("archive");
      },
      "repo-menu__item--archive",
    ),
    createItem(
      "حذف",
      <DeleteIcon className="h-4 w-4" />,
      () => {
        return setModal("delete");
      },
      "repo-menu__item--delete",
    ),
  ].filter((item) => {
    return item.text !== "ترک مخزن";
  });
};

const getOwnerDestructiveActions = (setModal: (modal: string) => void): MenuItem[] => {
  return [
    createItem(
      "بازگردانی",
      <RestoreIcon className="h-4 w-4" />,
      () => {
        return setModal("restore");
      },
      "repo-menu__item--restore",
    ),
    createItem(
      "حذف",
      <DeleteIcon className="h-4 w-4" />,
      () => {
        return setModal("delete");
      },
      "repo-menu__item--delete",
    ),
  ];
};

const useRepoMenuList = (
  repo: IRepo | null,
  setModal: (modalName: string) => void,
  options: {
    showLog?: boolean;
    onInfoClick?: () => void;
  } = {},
): MenuItem[] => {
  const pathname = usePathname();
  const { data: getDomainInfo } = useGetDomainInfo();
  const { setRepoFeed } = useFeedStore();
  const { showRepoActivity, setShowRepoActivity } = useRepoActivityStore();

  if (!repo) return [];

  const { showLog, onInfoClick } = options;
  const content = JSON.parse(getDomainInfo?.content || "{}");
  const { enablePrivateFeed } = content;

  let menuItems: MenuItem[] = [];

  switch (repo.roleName) {
    case ERoles.owner:
      if (repo.isArchived) {
        menuItems = getOwnerDestructiveActions(setModal);
      } else menuItems = getOwnerMenuItems(repo, setModal);
      break;
    case ERoles.admin:
      menuItems = getAdminMenuItems(repo, setModal);
      break;
    default:
      menuItems = getBaseMenuItems(repo, setModal);
  }

  if (!pathname?.includes("/admin/repositories") && onInfoClick && !repo.isArchived) {
    menuItems.unshift(
      createItem(
        "اطلاعات مخزن",
        <FolderInfoIcon className="h-4 w-4" />,
        onInfoClick,
        "repo-menu__item--folder-info",
      ),
    );
  }

  if (showLog && !repo.isArchived) {
    menuItems.push(
      createItem(
        "فعالیت های مخزن",
        <RepoActivityIcon className="h-4 w-4 stroke-icon-active" />,
        () => {
          setShowRepoActivity(!showRepoActivity);
        },
        "repo-menu__item--repo-activity",
      ),
    );
  }

  if (repo.roleName === ERoles.owner && enablePrivateFeed && repo.isPublish && !repo.isArchived) {
    menuItems.push(
      createItem(
        "ایجاد خبرنامه خصوصی",
        <FeedIcon className="h-4 w-4" />,
        () => {
          setRepoFeed({ label: repo.name, value: repo.id });
          setModal("privateFeed");
        },
        "repo-menu__item--private-feed",
      ),
    );
  }

  if (repo.roleName !== ERoles.owner && !repo.isArchived) {
    menuItems.push(
      createItem(
        "ترک مخزن",
        <LeaveRepoIcon className="h-4 w-4 stroke-icon-active" />,
        () => {
          return setModal("leave");
        },
        "repo-menu__item--leave",
      ),
    );
  }

  return menuItems;
};

export default useRepoMenuList;
