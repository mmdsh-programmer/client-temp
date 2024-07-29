"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { repoGrouping } from "@atom/repository";
import SidebarHeader from "@components/molecules/sidebarHeader";
import {
  ArchiveIcon,
  DashboardIcon,
  FolderBookmarkIcon,
  FolderIcon,
  FolderShareIcon,
} from "@components/atoms/icons";
import { ERepoGrouping } from "@interface/enums";

const Sidebar = () => {
  const router = useRouter();
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGrouping);

  const sidebarList = [
    {
      text: ERepoGrouping.DASHBOARD,
      icon: <DashboardIcon className="h-6 w-6" />,
      onClick: () => {
        setRepoGroup(ERepoGrouping.DASHBOARD);
      },
    },
    {
      text: ERepoGrouping.MY_REPO,
      icon: <FolderIcon className="h-6 w-6" />,
      onClick: () => {
        setRepoGroup(ERepoGrouping.MY_REPO);
      },
    },
    {
      text: ERepoGrouping.ACCESS_REPO,
      icon: <FolderShareIcon className="h-6 w-6" />,
      onClick: () => {
        setRepoGroup(ERepoGrouping.ACCESS_REPO);
      },
    },
    {
      text: ERepoGrouping.BOOKMARK_REPO,
      icon: <FolderBookmarkIcon className="h-6 w-6" />,
      onClick: () => {
        setRepoGroup(ERepoGrouping.BOOKMARK_REPO);
      },
    },
    {
      text: ERepoGrouping.ARCHIVE_REPO,
      icon: <ArchiveIcon className="h-6 w-6" />,
      onClick: () => {
        setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
      },
    },
  ];
  return (
    <aside className="hidden md:flex h-screen flex-col bg-white max-w-fit border-l-2 border-l-gray-100">
      <div className="p-4 h-[80px] flex items-center justify-center ">
        <SidebarHeader />
      </div>
      <hr className="" />
      <div className="p-4">
        <List placeholder="sidebar-list">
          {sidebarList.map((item) => {
            return (
              <ListItem
                key={item.text}
                placeholder="sidebar-item"
                className="p-0"
              >
                <Button
                  placeholder="sidebar-button"
                  className={`!shadow-none bg-transparent font-iranYekan mb-[2px] w-full 
                    flex items-center text-sm text-secondary
                   ${getRepoGroup === item.text ? "bg-gray-100 !stroke-[#0E0E0F] text-primary" : "!stroke-[#71717A]"}
                  hover:bg-gray-100 hover:text-primary hover:!stroke-[#0E0E0F]`}
                  onClick={() => {
                    router.push("/admin/dashboard");
                    item.onClick();
                  }}
                >
                  {item.icon}
                  <Typography
                    placeholder="sidebar-text"
                    className="whitespace-nowrap font-iranYekan mr-2"
                  >
                    {item.text}
                  </Typography>
                </Button>
              </ListItem>
            );
          })}
        </List>
      </div>
    </aside>
  );
};

export default Sidebar;
