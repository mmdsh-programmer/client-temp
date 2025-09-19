import React from "react";
import {
  ArchiveIcon,
  BookmarkRepoIcon,
  FolderShareIcon,
  MyFolderIcon,
  PublishIcon,
} from "@components/atoms/icons";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { ERepoGrouping } from "@interface/enums";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import Link from "next/link";
import { useRepositoryStore } from "@store/repository";
import { useRepoSearchParamStore } from "@store/repoSearchParam";

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
    <List {...({} as React.ComponentProps<typeof List>)} className="min-w-[200px] gap-1 p-0">
      {sidebarList.map((item) => {
        return (
          <ListItem
            {...({} as React.ComponentProps<typeof ListItem>)}
            key={item.className}
            className={`p-0 ${item.className}`}
          >
            <Link href={item.path} className="w-full">
              <Button
                {...({} as React.ComponentProps<typeof Button>)}
                className={`h-[44px] w-full justify-start 
                     gap-1 bg-transparent px-3 text-link
                ${
                  repoGrouping === item.text
                    ? "bg-gray-100 !stroke-icon-active text-primary_normal"
                    : ""
                }
                  hover:bg-gray-100 hover:!fill-icon-active hover:!stroke-icon-active hover:text-primary_normal`}
                onClick={item.onClick}
              >
                {item.icon}
                <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t3">
                  {item.text}
                </Typography>
              </Button>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SidebarRepoList;
