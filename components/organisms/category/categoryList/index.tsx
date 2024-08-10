import React from "react";
import CategoryDocumentCreateMenu from "../../../molecules/categoryDocumentCreateMenu";
import CategoryMenu from "../../../molecules/categoryMenu/categoryMenu";
import CategoryChildrenDesktop from "../categoryChildren/categoryChildrenDesktop";
import CategoryChildrenMobile from "../categoryChildren/categoryChildrenMobile";
import DocumentMenu from "@components/molecules/documentMenu";
import { Typography } from "@material-tailwind/react";

const CategoryList = () => {
  const header = document.querySelector(".category-header");
  const sticky = header?.scrollTop;

  window.addEventListener("scroll", () => {
    if (sticky && window.scrollY > sticky) {
      header?.classList.add("150");
    } else {
      header?.classList.remove("sticky");
    }
  });

  return (
    <>
      <div className="flex flex-col gap-4 xs:gap-6">
        <div className="category-header flex justify-between items-center px-4 xs:px-0">
          <Typography className="title_t1 text-primary">لیست اسناد</Typography>
          <CategoryDocumentCreateMenu />
        </div>
        <div className="hidden xs:block">
          <CategoryChildrenDesktop />
        </div>
        <div className="block xs:hidden">
          <CategoryChildrenMobile />
        </div>
      </div>
      <CategoryDocumentCreateMenu showDrawer={true} />
      <CategoryMenu showDrawer={true} />
      <DocumentMenu showDrawer={true} />
    </>
  );
};

export default CategoryList;
