"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import { DashboardIcon, UserGroupIcon } from "@components/atoms/icons";
import { ChevronLeftIcon } from "lucide-react";
import { ERepoGrouping } from "@interface/enums";
import SidebarDocuments from "@components/molecules/sidebarDocuments";
import SidebarRepoList from "@components/molecules/sidebarRepoList";
import useGetUser from "@hooks/auth/useGetUser";
import { useRouter } from "next/navigation";
import useGetDomainInfo from "@hooks/domain/useGetDomainInfo";
import { useRepositoryStore } from "@store/repository";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useRepoSearchParamStore } from "@store/repoSearchParam";
import { cn } from "@/utils/cn";

interface IProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: IProps) => {
  const router = useRouter();
  const [openItem, setOpenItem] = useState<string>("");
  const { setRepoGrouping } = useRepositoryStore();
  const { setSidebarSection, sidebarSection } = useSidebarStore();
  const { setRepoSearchParam } = useRepoSearchParamStore();

  const { data: userInfo } = useGetUser();
  const { data: getDomainInfo } = useGetDomainInfo();
  const content = JSON.parse(getDomainInfo?.content || "{}");

  const { enablePersonalDocs, enableBranch } = content;

  const navigateTo = (path: string, onClick?: () => void) => {
    router.push(path);
    if (onClick) onClick();
  };

  return (
    <aside className="sidebar hidden h-screen w-[250px] max-w-none flex-shrink-0 flex-col border-l-2 border-l-gray-100 bg-white md:flex">
      <div className="flex h-[80px] items-center justify-center px-2 py-4">{children}</div>
      <hr className="" />

      <div
        key={ERepoGrouping.DASHBOARD}
        className={cn(
          `sidebar-item-${sidebarSection === ESidebarSection.DASHBOARD ? "active" : ""}`,
          "dashboard p-2 hover:bg-transparent",
        )}
      >
        <Button
          variant="ghost"
          className={cn(
            "h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link",
            `sidebar-button-${sidebarSection === ESidebarSection.DASHBOARD ? "active" : ""}`,
            sidebarSection === ESidebarSection.DASHBOARD
              ? "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active hover:[&_svg]:fill-icon-active"
              : "[&_svg]:stroke-icon-hover",
            "shadow-none hover:bg-gray-100 hover:text-primary_normal hover:shadow-none hover:[&_svg]:fill-icon-active hover:[&_svg]:stroke-icon-active",
          )}
          onClick={() => {
            navigateTo("/admin/dashboard", () => {
              setRepoGrouping(ERepoGrouping.DASHBOARD);
              setSidebarSection(ESidebarSection.DASHBOARD);
              setRepoSearchParam(null);
            });
          }}
        >
          <DashboardIcon className="h-6 w-6" />
          <span className="title_t3">{ESidebarSection.DASHBOARD}</span>
        </Button>
      </div>
      <hr className="" />

      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="w-full"
      >
        {(enablePersonalDocs ?? true) ? (
          <AccordionItem value={ESidebarSection.PERSONAL_DOCUMENTS} className="border-none">
            <AccordionTrigger
              className={cn(
                "justify-end px-3 py-4 text-link hover:no-underline [&>svg]:hidden [&[data-state=open]]:border-none",
                openItem !== ESidebarSection.PERSONAL_DOCUMENTS && "border-b-2 border-normal",
              )}
            >
              <div className="flex w-full items-center gap-2">
                <ChevronLeftIcon
                  className={cn(
                    "size-4 transition-transform duration-200 data-[state=closed]:rotate-0 data-[state=open]:-rotate-90",
                  )}
                  data-state={openItem === ESidebarSection.PERSONAL_DOCUMENTS ? "open" : "closed"}
                />
                <span className="title_t4">اسناد شخصی</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <div className="border-b-2 border-normal px-3 pb-3 pt-0">
                <SidebarDocuments />
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : null}

        <AccordionItem value={ESidebarSection.REPOSITORY_MANAGEMENT} className="border-none">
          <AccordionTrigger
            className={cn(
              "justify-end px-3 py-4 text-link hover:no-underline [&>svg]:hidden [&[data-state=open]]:border-none",
              openItem !== ESidebarSection.REPOSITORY_MANAGEMENT && "border-b-2 border-normal",
            )}
          >
            <div className="flex w-full items-center gap-2">
              <ChevronLeftIcon
                className={cn(
                  "size-4 transition-transform duration-200 data-[state=closed]:rotate-0 data-[state=open]:-rotate-90",
                )}
                data-state={openItem === ESidebarSection.REPOSITORY_MANAGEMENT ? "open" : "closed"}
              />
              <span className="title_t4">مدیریت مخزن‌ها</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <div className="border-b-2 border-normal px-3 pb-3 pt-0">
              <SidebarRepoList />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {userInfo?.domainRole === "owner" || userInfo?.domainRole === "participant" ? (
        <>
          <div className={cn("domain-management-sidebar dashboard p-2 hover:bg-transparent")}>
            <Button
              variant="ghost"
              className={cn(
                "h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link",
                sidebarSection === ESidebarSection.DOMAIN_MANAGEMENT &&
                  "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active",
                "shadow-none hover:bg-gray-100 hover:text-primary_normal hover:shadow-none hover:[&_svg]:fill-icon-active hover:[&_svg]:stroke-icon-active",
              )}
              onClick={() => {
                navigateTo("/admin/domainManagement", () => {
                  setSidebarSection(ESidebarSection.DOMAIN_MANAGEMENT);
                  setRepoGrouping(null);
                  setRepoSearchParam(null);
                });
              }}
            >
              <UserGroupIcon className="h-6 w-6" />
              <span className="title_t3">مدیریت دامنه</span>
            </Button>
          </div>
          <div className="border-b-2 border-normal" />
        </>
      ) : null}
      {(enableBranch ?? true) ? (
        <div className={cn("branch-management-sidebar dashboard p-2 hover:bg-transparent")}>
          <Button
            variant="ghost"
            className={cn(
              "h-[44px] w-full justify-start gap-1 bg-transparent px-3 text-link",
              sidebarSection === ESidebarSection.BRANCH_MANAGEMENT &&
                "bg-gray-100 text-primary_normal [&_svg]:stroke-icon-active",
              "shadow-none hover:bg-gray-100 hover:text-primary_normal hover:shadow-none hover:[&_svg]:fill-icon-active hover:[&_svg]:stroke-icon-active",
            )}
            onClick={() => {
              navigateTo("/admin/branchManagement", () => {
                setSidebarSection(ESidebarSection.BRANCH_MANAGEMENT);
                setRepoGrouping(null);
                setRepoSearchParam(null);
              });
            }}
          >
            <UserGroupIcon className="h-6 w-6" />
            <span className="title_t3">مدیریت سازمانی</span>
          </Button>
        </div>
      ) : null}
    </aside>
  );
};

export default Sidebar;
