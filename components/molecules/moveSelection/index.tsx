import React, { useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ChevronLeftIcon } from "@components/atoms/icons";
import MoveBreadCrumb from "../moveBreadCrumb";
import MoveChildren from "@components/organisms/moveChildren";
import { categoryMoveDestAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";

interface IProps {
  target: "category" | "document";
}

const MoveSelection = ({ target }: IProps) => {
  const getCategoryMoveDest = useRecoilValue(categoryMoveDestAtom);
  const getRepo = useRecoilValue(repoAtom);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={dropdownRef}
      className="w-full relative inline-block"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Button
        onClick={toggleDropdown}
        className={`w-full justify-between pr-3 pl-2 h-12 border-[1px] border-normal
    flex items-center leading-[18.2px] -tracking-[0.13px]
     truncate text-[13px] text-primary font-iranYekan font-normal gap-x-2
    bg-transparent rounded-md focus:outline-none lowercase`}
      >
        {getCategoryMoveDest ? getCategoryMoveDest.name : " انتخاب کنید"}
        <ChevronLeftIcon
          className={`w-2 h-2 stroke-icon-active transform transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        />
      </Button>
      {isOpen && (
        <div className="absolute z-[99999] mt-2 min-w-max w-full p-[1px] rounded-md bg-white ring-1 ring-black ring-opacity-5">
          <MoveBreadCrumb />
          {getRepo ? (
            <MoveChildren target={target} repoId={getRepo.id} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MoveSelection;
