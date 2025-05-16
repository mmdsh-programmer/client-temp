import {
  ArchiveIcon,
  BookmarkRepoIcon,
  FolderShareIcon,
  MyFolderIcon,
  PublishIcon,
} from "@components/atoms/icons";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ERepoGrouping } from "@interface/enums";
import { ESidebarSection, sidebarSectionAtom } from "@atom/sidebar";
import React from "react";
import { useRouter } from "next/navigation";

const SidebarRepoList = () => {
  const router = useRouter();
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGroupingAtom);
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);
  const [, setSidebarSection] = useRecoilState(sidebarSectionAtom);

  const sidebarList = [
    {
      text: ERepoGrouping.MY_REPO,
      icon: <MyFolderIcon className="h-6 w-6 stroke-icon-hover" />,
      className: "myRepoList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.MY_REPO);
        setSidebarSection(ESidebarSection.REPOSITORY_MANAGEMENT);
      },
    },
    {
      text: ERepoGrouping.ACCESS_REPO,
      icon: <FolderShareIcon className="h-6 w-6 fill-icon-hover stroke-0" />,
      className: "myAccessList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.ACCESS_REPO);
        setSidebarSection(ESidebarSection.REPOSITORY_MANAGEMENT);
      },
    },
    {
      text: ERepoGrouping.BOOKMARK_REPO,
      icon: <BookmarkRepoIcon className="h-6 w-6 fill-icon-hover stroke-0" />,
      className: "myBookmarkList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.BOOKMARK_REPO);
        setSidebarSection(ESidebarSection.REPOSITORY_MANAGEMENT);
      },
    },
    {
      text: ERepoGrouping.ARCHIVE_REPO,
      icon: <ArchiveIcon className="h-6 w-6 stroke-0 fill-icon-hover" />,
      className: "myArchiveList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
        setSidebarSection(ESidebarSection.REPOSITORY_MANAGEMENT);
      },
    },
    {
      text: ERepoGrouping.PUBLISHED_REPO,
      icon: <PublishIcon className="h-6 w-6 fill-icon-hover stroke-0" />,
      className: "myPublishedRepoList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.PUBLISHED_REPO);
        setSidebarSection(ESidebarSection.REPOSITORY_MANAGEMENT);
      },
    },
  ];

  return (
    <List placeholder="sidebar-list" className="min-w-[200px] p-0 gap-1">
      {sidebarList.map((item) => {
        return (
          <ListItem
            key={item.className}
            placeholder="sidebar-item"
            className={`p-0 ${item.className}`}
          >
            <Button
              placeholder="sidebar-button"
              className={`bg-transparent justify-start w-full 
                     text-link gap-1 px-3 h-[44px]
                ${
                  getRepoGroup === item.text
                    ? "bg-gray-100 !stroke-icon-active text-primary_normal"
                    : ""
                }
                  hover:bg-gray-100 hover:text-primary_normal hover:!stroke-icon-active hover:!fill-icon-active`}
              onClick={() => {
                router.push("/admin/dashboard");
                item.onClick();
                setSearchParam(null);
              }}
            >
              {item.icon}
              <Typography placeholder="sidebar-text" className="title_t3">
                {item.text}
              </Typography>
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SidebarRepoList;
