"use client";

import React from "react";
import CategoryDocumentCreateMenu from "../../molecules/categoryDocumentCreateMenu";
import CategoryMenu from "../../molecules/categoryMenu/categoryMenu";
import DocumentMenu from "@components/molecules/documentMenu";
import { Button, Typography } from "@material-tailwind/react";
import CategoryChildren from "./categoryChildren";
import FilterMobileView from "../advancedFilterView/filterMobileView";
import { activeTourAtom, ETourSection } from "@atom/tour";
import { InfoIcon } from "@components/atoms/icons";
import { useSetRecoilState } from "recoil";
import CategoryListMode from "@components/molecules/categoryListMode";

const CategoryList = () => {
  const setActiveTour = useSetRecoilState(activeTourAtom);
  return (
    <>
      <div className="flex flex-col gap-4 xs:gap-6">
        <div className="category-header flex justify-between items-center px-4 xs:px-0">
          <div className="flex items-center gap-1">
            <Typography className="title_t1 text-primary">
              لیست اسناد
            </Typography>
            <Button
              className="rounded-lg p-0 bg-transparent shadow-none flex justify-center items-center"
              onClick={() => {
                setActiveTour(ETourSection.DOCUMENTS);
              }}
            >
              <InfoIcon className="w-5 h-5 stroke-purple-normal" />
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
      <CategoryDocumentCreateMenu showDrawer />
      <CategoryMenu showDrawer />
      <DocumentMenu showDrawer />
    </>
  );
};

export default CategoryList;
