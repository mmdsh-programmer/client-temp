import React from "react";
import Link from "next/link";
import {
  ArchiveIcon,
  BookmarkRepoIcon,
  FolderShareIcon,
  MyFolderIcon,
  PublishIcon,
} from "@components/atoms/icons";
import { Button } from "@components/ui/button";
import { ERepoGrouping } from "@interface/enums";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useRepositoryStore } from "@store/repository";
import { useRepoSearchParamStore } from "@store/repoSearchParam";
import { cn } from "@utils/cn";

const SidebarRepoList = () => {
  const { repoGrouping, setRepoGrouping } = useRepositoryStore();
  const { setSidebarSection } = useSidebarStore();
  const { setRepoSearchParam } = useRepoSearchParamStore();

  const sidebarList = [
    {
      text: ERepoGrouping.MY_REPO,
      icon: <MyFolderIcon className="h-6 w-6 stroke-icon-hover" />,
      className: "myRepoList",
      path: "/admin/myRepoList",
      onClick: () => {
        setRepoGrouping(ERepoGrouping.MY_REPO);
        setSidebarSection(ESidebarSection.MY_REPOS);
        setRepoSearchParam(null);
      },
    },
    {
      text: ERepoGrouping.ACCESS_REPO,
      icon: <FolderShareIcon className="h-6 w-6 fill-icon-hover stroke-0" />,
      className: "myAccessList",
      path: "/admin/accessRepoList",
      onClick: () => {
        setRepoGrouping(ERepoGrouping.ACCESS_REPO);
        setSidebarSection(ESidebarSection.SHARED_REPOS);
        setRepoSearchParam(null);
      },
    },
    {
      text: ERepoGrouping.BOOKMARK_REPO,
      icon: <BookmarkRepoIcon className="h-6 w-6 fill-icon-hover stroke-0" />,
      className: "myBookmarkList",
      path: "/admin/bookmarkRepoList",
      onClick: () => {
        setRepoGrouping(ERepoGrouping.BOOKMARK_REPO);
        setSidebarSection(ESidebarSection.BOOKMARK_REPOS);
        setRepoSearchParam(null);
      },
    },
    {
      text: ERepoGrouping.ARCHIVE_REPO,
      icon: <ArchiveIcon className="h-6 w-6 fill-icon-hover stroke-0" />,
      className: "myArchiveList",
      path: "/admin/archiveRepoList",
      onClick: () => {
        setRepoGrouping(ERepoGrouping.ARCHIVE_REPO);
        setSidebarSection(ESidebarSection.ARCHIVE_REPOS);
        setRepoSearchParam(null);
      },
    },
    {
      text: ERepoGrouping.PUBLISHED_REPO,
      icon: <PublishIcon className="h-6 w-6 fill-icon-hover stroke-0" />,
      className: "myPublishedRepoList",
      path: "/admin/publishedRepoList",
      onClick: () => {
        setRepoGrouping(ERepoGrouping.PUBLISHED_REPO);
        setSidebarSection(ESidebarSection.PUBLISHED_REPOS);
        setRepoSearchParam(null);
      },
    },
  ];

  return (
    <ul className="m-0 flex min-w-[200px] list-none flex-col gap-1 p-0">
      {sidebarList.map((item) => {
        return (
          <li key={item.className} className={cn("p-0", item.className)}>
            <Link href={item.path} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link",
                  repoGrouping === item.text ? "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active" : "",
                  "shadow-none hover:bg-gray-100 hover:text-primary_normal hover:shadow-none hover:[&_svg]:fill-icon-active hover:[&_svg]:stroke-icon-active"
                )}
                onClick={item.onClick}
              >
                {item.icon}
                <span className="title_t3">{item.text}</span>
              </Button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarRepoList;
