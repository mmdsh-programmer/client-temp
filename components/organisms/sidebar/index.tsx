import {
  ArchiveIcon,
  DashboardIcon,
  FolderBookmarkIcon,
  FolderIcon,
  FolderShareIcon,
} from "@components/atoms/icons";
import { Button, List, ListItem, Typography } from "@material-tailwind/react";
import { repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ERepoGrouping } from "@interface/enums";
import React from "react";
import SidebarHeader from "@components/molecules/sidebarHeader";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGroupingAtom);
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);

  const sidebarList = [
    {
      text: ERepoGrouping.DASHBOARD,
      icon: <DashboardIcon className="h-6 w-6" />,
      className: "dashboard",
      onClick: () => {
        setRepoGroup(ERepoGrouping.DASHBOARD);
      },
    },
    {
      text: ERepoGrouping.MY_REPO,
      icon: <FolderIcon className="h-6 w-6" />,
      className: "myRepoList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.MY_REPO);
      },
    },
    {
      text: ERepoGrouping.ACCESS_REPO,
      icon: <FolderShareIcon className="h-6 w-6" />,
      className: "myAccessList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.ACCESS_REPO);
      },
    },
    {
      text: ERepoGrouping.BOOKMARK_REPO,
      icon: <FolderBookmarkIcon className="h-6 w-6" />,
      className: "myBookmarkList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.BOOKMARK_REPO);
      },
    },
    {
      text: ERepoGrouping.ARCHIVE_REPO,
      icon: <ArchiveIcon className="h-6 w-6" />,
      className: "myArchiveList",
      onClick: () => {
        setRepoGroup(ERepoGrouping.ARCHIVE_REPO);
      },
    },
  ];
  return (
    <aside
      className="hidden md:flex h-screen flex-col max-w-fit border-l-2 border-l-gray-100"
    >
      <div className="p-4 h-[80px] flex items-center justify-center ">
        <SidebarHeader />
      </div>
      <hr className="" />
      <div className="p-3">
        <List placeholder="sidebar-list" className="p-0 gap-1">
          {sidebarList.map((item) => {
            return (
              <ListItem
                key={item.text}
                placeholder="sidebar-item"
                className={`p-0 ${item.className}`}
              >
                <Button
                  placeholder="sidebar-button"
                  className={` bg-transparent justify-start w-full 
                     text-secondary gap-1 px-3 h-[44px]
                   ${getRepoGroup === item.text ? "bg-gray-100 !stroke-icon-active text-primary" : "!stroke-icon-hover"}
                  hover:bg-gray-100 hover:text-primary hover:!stroke-icon-active`}
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
      </div>
    </aside>
  );
};

export default Sidebar;
