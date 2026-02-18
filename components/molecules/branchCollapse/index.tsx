"use client";

import React from "react";
import BranchMenu from "@components/molecules/branchMenu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@components/ui/collapsible";
import { ChevronLeftIcon, FolderIcon } from "@components/atoms/icons";
import { IBranch } from "@interface/branch.interface";
import { usePathname, useRouter } from "next/navigation";
import { useBranchStore } from "@store/branch";
import { useRepositoryStore } from "@store/repository";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useSidebarTabStore } from "@store/sidebarTab";
import { cn } from "@utils/cn";

interface IProps {
  children: React.JSX.Element;
  className?: string;
  isActive: boolean;
  childItem: IBranch;
}

const BranchCollapse = ({ children, className, isActive, childItem }: IProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const [open, setOpen] = React.useState(false);
  const { setBranchId } = useBranchStore();
  const { setRepoGrouping } = useRepositoryStore();
  const { setSidebarSection } = useSidebarStore();
  const { setSidebarTab: setActiveTab } = useSidebarTabStore();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className={cn("flex border-b-0 p-0", className)}>
        <div className="flex w-full min-w-full items-center justify-between gap-2">
          <div className="flex flex-grow items-center">
            <CollapsibleTrigger asChild>
              <div className={cn("collapse-button flex cursor-pointer items-center rounded-[5px] px-2 py-2", open && "active-collapse")}>
                <ChevronLeftIcon
                  className={cn("h-3 w-3 stroke-gray-600 transition-transform", open && "-rotate-90")}
                />
              </div>
            </CollapsibleTrigger>

            <div
              className={cn(
                "w-auto flex-grow cursor-pointer justify-start rounded py-1 pr-2 text-right text-sm font-bold",
                isActive && "text-dashboard-primary"
              )}
              onClick={() => {
                if (window.innerWidth < 480 && currentPath !== "/admin/branchManagement") {
                  router.push("/admin/branchManagement");
                }
                setRepoGrouping(null);
                setSidebarSection(ESidebarSection.BRANCH_MANAGEMENT);
                setActiveTab(null);
                setBranchId(childItem.id);
              }}
            >
              <div className="flex items-center">
                <FolderIcon
                  className={cn("h-5 w-5 ml-2 flex-none self-start", childItem.parentId ? "fill-[#79B8FF]" : "fill-[#FF9500]")}
                />
                <span title={childItem.title} className="block w-[100px] max-w-[100px] truncate">
                  {childItem.title}
                </span>
              </div>
            </div>
          </div>
          <BranchMenu branchItem={childItem} />
        </div>
      </div>
      <CollapsibleContent className="px-0 py-1">
        <div className="collapse-content flex flex-col gap-1 pr-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BranchCollapse;
