import React from "react";
import CategoryDocumentCreateMenu from "../../../molecules/categoryMenu/categoryDocumentCreateMenu";
import CategoryMenu from "../../../molecules/categoryMenu/categoryMenu";
import Text from "@components/atoms/typograghy/text";
import CategoryChildrenDesktop from "../categoryChildren/categoryChildrenDesktop";
import CategoryChildrenMobile from "../categoryChildren/categoryChildrenMobile";
import DocumentMenu from "@components/molecules/documentMenu";

const CategoryList = () => {

  return (
    <>
      <div className="flex flex-col gap-4 xs:gap-6">
        <div className="flex justify-between items-center px-4 xs:px-0">
          <Text className="text-primary text-base -tracking-[0.32px] font-medium">
            لیست اسناد
          </Text>
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
