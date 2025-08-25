"use client";

import { Button, Typography } from "@material-tailwind/react";
import { ETourSection } from "@atom/tour";
import { useTourStore } from "@store/tour";

import CategoryChildren from "./categoryChildren";
import CategoryDocumentCreateMenu from "../../molecules/categoryDocumentCreateMenu";
import CategoryListMode from "@components/molecules/categoryListMode";
import CategoryMenu from "../../molecules/categoryMenu/categoryMenu";
import DocumentMenu from "@components/molecules/documentMenu";
import FilterMobileView from "../advancedFilterView/filterMobileView";
import { InfoIcon } from "@components/atoms/icons";
import React from "react";

const CategoryList = () => {
  const setActiveTour = useTourStore((s) => {
    return s.setActiveTour;
  });
  return (
    <>
      <div className="flex flex-col gap-4 xs:gap-6">
        <div className="category-header flex items-center justify-between px-4 xs:px-0">
          <div className="flex items-center gap-1">
            <Typography className="title_t1 text-primary_normal">لیست اسناد</Typography>
            <Button
              className="category-tour flex items-center justify-center rounded-lg bg-transparent p-0 shadow-none"
              onClick={() => {
                setActiveTour(ETourSection.DOCUMENTS);
              }}
            >
              <InfoIcon className="h-5 w-5 stroke-primary-normal" />
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
      <div className="flex xs:hidden">
        <CategoryDocumentCreateMenu showDrawer />
        <CategoryMenu showDrawer />
        <DocumentMenu showDrawer />
      </div>
    </>
  );
};

export default CategoryList;
