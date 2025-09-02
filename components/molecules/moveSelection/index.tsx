import React, { useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import MoveBreadCrumb from "../moveBreadCrumb";
import MoveChildren from "@components/organisms/moveChildren";
import { useCategoryStore } from "@store/category";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  target: "category" | "document";
}

const MoveSelection = ({ target }: IProps) => {
  const repoId = useRepoId();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { categoryMoveDest: getCategoryMoveDest } = useCategoryStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block w-full"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Button
        onClick={toggleDropdown}
        className={`move-${target}__select flex h-12 w-full items-center justify-between gap-x-2 truncate rounded-md border-[1px] border-normal bg-transparent pl-2 pr-3 font-iranYekan text-[13px] font-normal lowercase leading-[18.2px] -tracking-[0.13px] text-primary_normal focus:outline-none`}
      >
        {getCategoryMoveDest ? getCategoryMoveDest.name : " انتخاب کنید"}
        <ChevronLeftIcon
          className={`h-2 w-2 transform stroke-icon-active transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        />
      </Button>
      {isOpen && (
        <div className="z-[99999] mt-2 w-full min-w-max rounded-md bg-white p-[1px] ring-1 ring-black ring-opacity-5">
          <MoveBreadCrumb />
          {repoId ? <MoveChildren target={target} repoId={repoId} /> : null}
        </div>
      )}
    </div>
  );
};

export default MoveSelection;
