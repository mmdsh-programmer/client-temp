"use client";

import React from "react";
import CategoryDocumentCreateMenu from "../../molecules/categoryDocumentCreateMenu";
import CategoryMenu from "../../molecules/categoryMenu/categoryMenu";
import DocumentMenu from "@components/molecules/documentMenu";
import { Typography } from "@material-tailwind/react";
import CategoryChildren from "./categoryChildren";
import FilterMobileView from "../advancedFilterView/filterMobileView";

const CategoryList = () => {
  return (
    <>
      <div className="flex flex-col gap-4 xs:gap-6">
        <div className="category-header flex justify-between items-center px-4 xs:px-0">
          <Typography className="title_t1 text-primary">لیست اسناد</Typography>
          <CategoryDocumentCreateMenu />
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
