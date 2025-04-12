"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  DashboardIcon,
  UserGroupIcon,
} from "@components/atoms/icons";
import SidebarDocuments from "@components/molecules/sidebarDocuments";
import SidebarRepoList from "@components/molecules/sidebarRepoList";
import { useRouter } from "next/navigation";
import { repoGroupingAtom, repoSearchParamAtom } from "@atom/repository";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ERepoGrouping } from "@interface/enums";
import useGetUser from "@hooks/auth/useGetUser";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};
interface IProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: IProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(0);
  const [getRepoGroup, setRepoGroup] = useRecoilState(repoGroupingAtom);
  const setSearchParam = useSetRecoilState(repoSearchParamAtom);

  const { data: userInfo } = useGetUser();

  const handleOpen = (value) => {
    return setOpen(open === value ? 0 : value);
  };

  return (
    <aside className="sidebar hidden w-[250px] md:flex h-screen flex-col max-w-fit border-l-2 border-l-gray-100 bg-white">
      <div className="p-4 h-[80px] flex items-center justify-center ">
        {children}
      </div>
      <hr className="" />
      <ListItem
        key={ERepoGrouping.DASHBOARD}
        placeholder="sidebar-item"
        className={`sidebar-item-${getRepoGroup} p-2 dashboard hover:!bg-transparent`}
      >
        <Button
          placeholder="sidebar-button"
          className={` bg-transparent justify-start w-full 
                     text-secondary gap-1 px-3 h-[44px]
                     sidebar-button-${getRepoGroup}
                   ${getRepoGroup === ERepoGrouping.DASHBOARD ? "bg-gray-100 !stroke-icon-active hover:!fill-icon-active text-primary" : "!stroke-icon-hover"}
                  hover:bg-gray-100 hover:text-primary hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            router.push("/admin/dashboard");
            setRepoGroup(ERepoGrouping.DASHBOARD);
            setSearchParam(null);
          }}
        >
          <DashboardIcon className="h-6 w-6" />
          <Typography placeholder="sidebar-text" className="title_t3">
            {ERepoGrouping.DASHBOARD}
          </Typography>
        </Button>
      </ListItem>
      <hr className="" />
      <Accordion
        className="personal-document-sidebar max-w-full w-full "
        open={open === 1}
        icon={
          <ChevronLeftIcon
            className={`h-2 w-2 stroke-icon-active ${open === 1 ? "rotate-90" : "-rotate-90"}`}
          />
        }
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          className={`px-3 flex-row-reverse justify-end ${open === 1 ? "border-none" : "border-b-2 border-normal"}`}
          onClick={() => {
            return handleOpen(1);
          }}
        >
          <Typography className="title_t4">اسناد شخصی</Typography>
        </AccordionHeader>
        <AccordionBody>
          <div className="px-3 pb-3 border-b-2 border-normal">
            <SidebarDocuments />
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion
        className="repo-list-sidebar max-w-full w-full "
        open={open === 2}
        icon={
          <ChevronLeftIcon
            className={`h-2 w-2 stroke-icon-active ${open === 2 ? "rotate-90" : "-rotate-90"}`}
          />
        }
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          className={`px-3 flex-row-reverse justify-end ${open === 2 ? "border-none" : "border-b-2 border-normal"}`}
          onClick={() => {
            return handleOpen(2);
          }}
        >
          <Typography className="title_t4">مدیریت مخزن‌ها</Typography>
        </AccordionHeader>
        <AccordionBody>
          <div className="px-3 pb-3 border-b-2 border-normal">
            <SidebarRepoList />
          </div>
        </AccordionBody>
      </Accordion>
      {userInfo?.domainRole === "owner" || userInfo?.domainRole === "participant" ? (
        <>
          <ListItem
            placeholder="sidebar-item"
            className="domain-management-sidebar p-2 dashboard hover:!bg-transparent"
          >
            <Button
              placeholder="sidebar-button"
              className={` bg-transparent justify-start w-full 
                     text-secondary gap-1 px-3 h-[44px]
                  hover:bg-gray-100 hover:text-primary hover:!stroke-icon-active hover:!fill-icon-active`}
              onClick={() => {
                router.push("/admin/domainManagement");
                setSearchParam(null);
              }}
            >
              <UserGroupIcon className="h-6 w-6" />
              <Typography placeholder="sidebar-text" className="title_t3">
                مدیریت دامنه
              </Typography>
            </Button>
          </ListItem>
          <div className="border-b-2 border-normal" />
        </>
      ) : null}

      <ListItem
        placeholder="sidebar-item"
        className="branch-management-sidebar p-2 dashboard hover:!bg-transparent"
      >
        <Button
          placeholder="sidebar-button"
          className={` bg-transparent justify-start w-full 
                     text-secondary gap-1 px-3 h-[44px]
                  hover:bg-gray-100 hover:text-primary hover:!stroke-icon-active hover:!fill-icon-active`}
          onClick={() => {
            router.push("/admin/branchManagement");
            setSearchParam(null);
          }}
        >
          <UserGroupIcon className="h-6 w-6" />
          <Typography placeholder="sidebar-text" className="title_t3">
            مدیریت سازمانی
          </Typography>
        </Button>
      </ListItem>
    </aside>
  );
};

export default Sidebar;
