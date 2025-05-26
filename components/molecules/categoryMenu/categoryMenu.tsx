import React, { useState } from "react";
import { categoryAtom, categoryDrawerAtom } from "@atom/category";
import { useRecoilState, useSetRecoilState } from "recoil";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { ICategoryMetadata } from "@interface/category.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { InvisibleIcon, MoreDotIcon } from "@components/atoms/icons";
import CategoryDialogs from "../categoryDialogs";
import useCategoryMenuList from "./useCategoryMenuList";

interface IProps {
  category?: ICategoryMetadata;
  showDrawer?: boolean;
}

const CategoryMenu = ({ category: categoryProp, showDrawer }: IProps) => {
  const setCategory = useSetRecoilState(categoryAtom);

  const [openCategoryActionDrawer, setOpenCategoryActionDrawer] =
    useRecoilState(categoryDrawerAtom);

  const [modals, setModals] = useState<{
    editCategoryModal: boolean;
    deleteCategoryModal: boolean;
    moveModal: boolean;
    hideModal: boolean;
    visibleModal: boolean;
    categoryAccessModal: boolean;
    createCategoryModal: boolean;
    createDocumentModal: boolean;
    createTemplateModal: boolean;
  }>({
    editCategoryModal: false,
    deleteCategoryModal: false,
    moveModal: false,
    hideModal: false,
    visibleModal: false,
    categoryAccessModal: false,
    createCategoryModal: false,
    createDocumentModal: false,
    createTemplateModal: false,
  });

  const toggleModal = (modalName: keyof typeof modals, value: boolean) => {
    setModals((prev) => {
      return { ...prev, [modalName]: value };
    });
  };

  const menuList = useCategoryMenuList({ category: categoryProp, toggleModal });

  return (
    <>
      {showDrawer ? (
        <div className="category-menu xs:hidden flex">
          <DrawerTemplate
            openDrawer={openCategoryActionDrawer}
            setOpenDrawer={setOpenCategoryActionDrawer}
            menuList={menuList}
          />
        </div>
      ) : (
        <div className="category-menu flex items-center justify-end gap-1">
          {categoryProp?.isHidden ? (
            <InvisibleIcon className="w-4 h-4 flex-none" />
          ): null}
          <MenuTemplate
            setOpenDrawer={() => {
              setCategory(categoryProp || null);
              setOpenCategoryActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
                <MoreDotIcon className="w-4 h-4" />
              </div>
            }
            className="category-menu"
          />
        </div>
      )}
      <CategoryDialogs
        modals={modals}
        toggleModal={(modalName, value) => {
          toggleModal(modalName as keyof typeof modals, value);
        }}
      />
    </>
  );
};

export default CategoryMenu;
