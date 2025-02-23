import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react";
import { ChevronLeftIcon, FolderIcon } from "@components/atoms/icons";
import BranchMenu from "@components/molecules/branchMenu";
import { IBranch } from "@interface/branch.interface";
import { branchIdAtom } from "@atom/branch";
import { useSetRecoilState } from "recoil";

interface IProps {
  children: React.JSX.Element;
  className?: string;
  isActive: boolean;
  childItem: IBranch;
}

const BranchCollapse = ({
  children,
  className,
  isActive,
  childItem,
}: IProps) => {
  const [open, setOpen] = React.useState(false);
  const setBranchId = useSetRecoilState(branchIdAtom);

  const handleOpen = () => {
    setOpen(!open);
    setBranchId(childItem.id);
  };

  return (
    <Accordion open={open}>
      <AccordionHeader
        onClick={handleOpen}
        placeholder="accordionHeader"
        className={`flex border-b-0 p-0 ${className}`}
      >
        <div className="flex gap-2 min-w-full w-full justify-between items-center">
          <div className="flex items-center flex-grow">
            <div
              className={`collapse-button flex items-center rounded-[5px] py-2 px-2 ${
                open ? "active-collapse" : ""
              }`}
            >
              <ChevronLeftIcon
                className={`stroke-gray-600 w-3 h-3 transition-transform ${
                  open ? "-rotate-90" : ""
                }`}
              />
            </div>
            <div
              className={`w-auto flex-grow justify-start rounded pr-2 py-1 text-sm font-bold text-right ${
                isActive ? "text-dashboard-primary" : ""
              }`}
            >
              <div className="flex">
                <FolderIcon
                  className={`w-5 h-5 ${childItem.parentId ? "fill-[#79B8FF]" : "fill-[#FF9500]"}
                     ml-2 flex-none self-start`}
                />
                <Typography
                  title={childItem.title}
                  className="max-w-[100px] w-[100px] truncate"
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
      <AccordionBody className="py-1 px-0">
        <div className="pr-4 collapse-content flex flex-col gap-1">
          {open ? children : null}
        </div>
      </AccordionBody>
    </Accordion>
  );
};

export default BranchCollapse;
