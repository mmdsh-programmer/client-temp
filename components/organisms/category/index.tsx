"use client";

import { Button, Typography } from "@material-tailwind/react";
import { ETourSection, activeTourAtom } from "@atom/tour";

import CategoryChildren from "./categoryChildren";
import CategoryDocumentCreateMenu from "../../molecules/categoryDocumentCreateMenu";
import CategoryListMode from "@components/molecules/categoryListMode";
import CategoryMenu from "../../molecules/categoryMenu/categoryMenu";
import DocumentMenu from "@components/molecules/documentMenu";
import FilterMobileView from "../advancedFilterView/filterMobileView";
import { InfoIcon } from "@components/atoms/icons";
import React from "react";
import { useSetRecoilState } from "recoil";

const CategoryList = () => {
  const setActiveTour = useSetRecoilState(activeTourAtom);
  return (
    <>
      <div className="flex flex-col gap-4 xs:gap-6">
        <div className="category-header flex justify-between items-center px-4 xs:px-0">
          <div className="flex items-center gap-1">
            <Typography className="title_t1 text-primary_normal">
              لیست اسناد
            </Typography>
            <Button
              className="category-tour rounded-lg p-0 bg-transparent shadow-none flex justify-center items-center"
              onClick={() => {
                setActiveTour(ETourSection.DOCUMENTS);
              }}
            >
              <InfoIcon className="w-5 h-5 stroke-primary-normal" />
            </Button>
          </div>
          <div className="flex gap-2">
            <CategoryDocumentCreateMenu />
            <CategoryListMode />
          </div>
          <div className="flex xs:!hidden">
            <FilterMobileView />
          </div>
        </div>
        <CategoryChildren />
      </div>
      <div className="xs:hidden flex">
        <CategoryDocumentCreateMenu showDrawer />
        <CategoryMenu showDrawer />
        <DocumentMenu showDrawer />
      </div>
    </>
  );
};

export default CategoryList;
