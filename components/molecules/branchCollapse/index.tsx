import React from "react";
import { Accordion, AccordionBody, AccordionHeader, Typography } from "@material-tailwind/react";
import { ChevronLeftIcon, FolderIcon } from "@components/atoms/icons";
import BranchMenu from "@components/molecules/branchMenu";
import { IBranch } from "@interface/branch.interface";
import { usePathname, useRouter } from "next/navigation";
import { useBranchStore } from "@store/branch";
import { useRepositoryStore } from "@store/repository";
import { ESidebarSection, useSidebarStore } from "@store/sidebar";
import { useSidebarTabStore } from "@store/sidebarTab";

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

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Accordion open={open}>
      <AccordionHeader
        placeholder="accordionHeader"
        className={`flex border-b-0 p-0 ${className}`}
      >
        <div className="flex w-full min-w-full items-center justify-between gap-2">
          <div className="flex flex-grow items-center">
            <div
              className={`collapse-button flex items-center rounded-[5px] px-2 py-2 ${
                open ? "active-collapse" : ""
              }`}
              onClick={handleOpen}
            >
              <ChevronLeftIcon
                className={`h-3 w-3 stroke-gray-600 transition-transform ${
                  open ? "-rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`w-auto flex-grow justify-start rounded py-1 pr-2 text-right text-sm font-bold ${
                isActive ? "text-dashboard-primary" : ""
              }`}
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
              <div className="flex">
                <FolderIcon
                  className={`h-5 w-5 ${childItem.parentId ? "fill-[#79B8FF]" : "fill-[#FF9500]"} ml-2 flex-none self-start`}
                />
                <Typography
                  title={childItem.title}
                  className="w-[100px] max-w-[100px] truncate"
                  variant="small"
                >
                  {childItem.title}
                </Typography>
              </div>
            </div>
          </div>
          <BranchMenu branchItem={childItem} />
        </div>
      </AccordionHeader>
      <AccordionBody className="px-0 py-1">
        <div className="collapse-content flex flex-col gap-1 pr-4">{open ? children : null}</div>
      </AccordionBody>
    </Accordion>
  );
};

export default BranchCollapse;
