import React from "react";
import { usePathname } from "next/navigation";
import { toPersianDigit } from "@utils/index";
import { ERoles } from "@interface/enums";
import { IRepo } from "@interface/repo.interface";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { useFeedStore } from "@store/feed";
import { useRepoActivityStore } from "@store/repository";
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

export interface MenuItem {
  text: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: string;
}

const createItem = (
  text: string,
  icon: JSX.Element,
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
      "کلید های مخزن",
      <KeyIcon className="h-4 w-4 stroke-1" />,
      () => {
        return setModal("key");
      },
      "repo-menu__item--keys",
    ),
  ];
};

const getEditorMenuItems = (repo: IRepo, setModal: (modal: string) => void): MenuItem[] => {
  return [
    ...getBaseMenuItems(repo, setModal),
    createItem(
      "ترک مخزن",
      <LeaveRepoIcon className="h-4 w-4 stroke-icon-active" />,
      () => {
        return setModal("leave");
      },
      "repo-menu__item--leave",
    ),
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
    ...getEditorMenuItems(repo, setModal),
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
  ];
};

const getOwnerMenuItems = (repo: IRepo, setModal: (modal: string) => void): MenuItem[] => {
  const items = getAdminMenuItems(repo, setModal).filter((item) => {
    return item.text !== "ترک مخزن";
  });
  return items;
};

const getOwnerDestructiveActions = (repo: IRepo, setModal: (modal: string) => void): MenuItem[] => {
  if (repo.isArchived) {
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
  }
  return [
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
      menuItems = getOwnerMenuItems(repo, setModal);
      break;
    case ERoles.admin:
      menuItems = getAdminMenuItems(repo, setModal);
      break;
    default:
      menuItems = getEditorMenuItems(repo, setModal);
  }

  if (!pathname?.includes("/admin/repositories") && onInfoClick) {
    menuItems.unshift(
      createItem(
        "اطلاعات مخزن",
        <FolderInfoIcon className="h-4 w-4" />,
        onInfoClick,
        "repo-menu__item--folder-info",
      ),
    );
  }

  if (showLog) {
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

  if (repo.isPublish) {
    menuItems.push(
      createItem(
        "مخزن منتشرشده",
        <PublishIcon className="h-4 w-4 fill-icon-active stroke-0" />,
        () => {
          const url = `/publish/${toPersianDigit(repo.name.replaceAll(/\s+/g, "-"))}/${repo.id}`;
          window.open(url, "_blank");
        },
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

  if (repo.roleName === ERoles.owner) {
    const destructiveActions = getOwnerDestructiveActions(repo, setModal);
    menuItems.push(...destructiveActions);
  }

  return menuItems;
};

export default useRepoMenuList;
