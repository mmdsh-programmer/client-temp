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
import { ChevronLeftIcon, DashboardIcon, UserGroupIcon } from "@components/atoms/icons";
import { ERepoGrouping } from "@interface/enums";
import SidebarDocuments from "@components/molecules/sidebarDocuments";
import SidebarRepoList from "@components/molecules/sidebarRepoList";
import useGetUser from "@hooks/auth/useGetUser";
import { useRouter } from "next/navigation";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { useRepositoryStore } from "@store/repository";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useRepoSearchParamStore } from "@store/repoSearchParam";

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
  const { setRepoGrouping } = useRepositoryStore();
  const { setSidebarSection, sidebarSection } = useSidebarStore();
  const { setRepoSearchParam } = useRepoSearchParamStore();

  const { data: userInfo } = useGetUser();
  const { data: getDomainInfo } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");

  const { enablePersonalDocs, enableBranch } = content;

  const handleOpen = (value) => {
    return setOpen(open === value ? 0 : value);
  };

  const navigateTo = (path, onClick) => {
    router.push(path);
    if (onClick) onClick();
  };

  return (
    <aside className="sidebar hidden h-screen w-[250px] max-w-fit flex-col border-l-2 border-l-gray-100 bg-white md:flex">
      <div className="flex h-[80px] items-center justify-center px-2 py-4">{children}</div>
      <hr className="" />
      <ListItem
        {...({} as React.ComponentProps<typeof ListItem>)}
        key={ERepoGrouping.DASHBOARD}
        className={`sidebar-item-${sidebarSection === ESidebarSection.DASHBOARD ? "active" : ""} dashboard p-2 hover:!bg-transparent`}
      >
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          className={`h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link sidebar-button-${sidebarSection === ESidebarSection.DASHBOARD ? "active" : ""} ${sidebarSection === ESidebarSection.DASHBOARD ? "bg-gray-100 !stroke-icon-active text-primary_normal hover:!fill-icon-active" : "!stroke-icon-hover"} hover:bg-gray-100 hover:!fill-icon-active hover:!stroke-icon-active hover:text-primary_normal`}
          onClick={() => {
            navigateTo("/admin/dashboard", () => {
              setRepoGrouping(ERepoGrouping.DASHBOARD);
              setSidebarSection(ESidebarSection.DASHBOARD);
              setRepoSearchParam(null);
            });
          }}
        >
          <DashboardIcon className="h-6 w-6" />
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t3">
            {ESidebarSection.DASHBOARD}
          </Typography>
        </Button>
      </ListItem>
      <hr className="" />
      {(enablePersonalDocs ?? true) ? (
        <Accordion
          {...({} as React.ComponentProps<typeof Accordion>)}
          className="personal-document-sidebar w-full max-w-full"
          open={open === 1}
          icon={
            <ChevronLeftIcon
              className={`h-2 w-2 stroke-icon-active ${open === 1 ? "rotate-90" : "-rotate-90"}`}
            />
          }
          animate={CUSTOM_ANIMATION}
        >
          <AccordionHeader
            {...({} as React.ComponentProps<typeof AccordionHeader>)}
            className={`flex-row-reverse justify-end px-3 ${open === 1 ? "border-none" : "border-b-2 border-normal"}`}
            onClick={() => {
              return handleOpen(1);
            }}
          >
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t4">اسناد شخصی</Typography>
          </AccordionHeader>
          <AccordionBody {...({} as React.ComponentProps<typeof AccordionBody>)}>
            <div className="border-b-2 border-normal px-3 pb-3">
              <SidebarDocuments />
            </div>
          </AccordionBody>
        </Accordion>
      ) : null}
      <Accordion
        {...({} as React.ComponentProps<typeof Accordion>)}
        className="repo-list-sidebar w-full max-w-full"
        open={open === 2}
        icon={
          <ChevronLeftIcon
            className={`h-2 w-2 stroke-icon-active ${open === 2 ? "rotate-90" : "-rotate-90"}`}
          />
        }
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          {...({} as React.ComponentProps<typeof AccordionHeader>)}
          className={`flex-row-reverse justify-end px-3 ${open === 2 ? "border-none" : "border-b-2 border-normal"}`}
          onClick={() => {
            return handleOpen(2);
          }}
        >
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t4">مدیریت مخزن‌ها</Typography>
        </AccordionHeader>
        <AccordionBody {...({} as React.ComponentProps<typeof AccordionBody>)}>
          <div className="border-b-2 border-normal px-3 pb-3">
            <SidebarRepoList />
          </div>
        </AccordionBody>
      </Accordion>
      {userInfo?.domainRole === "owner" || userInfo?.domainRole === "participant" ? (
        <>
          <ListItem
            {...({} as React.ComponentProps<typeof ListItem>)}
            className="domain-management-sidebar dashboard p-2 hover:!bg-transparent"
          >
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              className={`h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link ${sidebarSection === ESidebarSection.DOMAIN_MANAGEMENT ? "bg-gray-100 !stroke-icon-active text-primary_normal" : ""} hover:bg-gray-100 hover:!fill-icon-active hover:!stroke-icon-active hover:text-primary_normal`}
              onClick={() => {
                navigateTo("/admin/domainManagement", () => {
                  setSidebarSection(ESidebarSection.DOMAIN_MANAGEMENT);
                  setRepoGrouping(null);
                  setRepoSearchParam(null);
                });
              }}
            >
              <UserGroupIcon className="h-6 w-6" />
              <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t3">
                مدیریت دامنه
              </Typography>
            </Button>
          </ListItem>
          <div className="border-b-2 border-normal" />
        </>
      ) : null}
      {(enableBranch ?? true) ? (
        <ListItem
          {...({} as React.ComponentProps<typeof ListItem>)}
          className="branch-management-sidebar dashboard p-2 hover:!bg-transparent"
        >
          <Button
            {...({} as React.ComponentProps<typeof Button>)}
            className={`h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link ${sidebarSection === ESidebarSection.BRANCH_MANAGEMENT ? "bg-gray-100 !stroke-icon-active text-primary_normal" : ""} hover:bg-gray-100 hover:!fill-icon-active hover:!stroke-icon-active hover:text-primary_normal`}
            onClick={() => {
              navigateTo("/admin/branchManagement", () => {
                setSidebarSection(ESidebarSection.BRANCH_MANAGEMENT);
                setRepoGrouping(null);
                setRepoSearchParam(null);
              });
            }}
          >
            <UserGroupIcon className="h-6 w-6" />
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="title_t3">
              مدیریت سازمانی
            </Typography>
          </Button>
        </ListItem>
      ) : null}
    </aside>
  );
};

export default Sidebar;
