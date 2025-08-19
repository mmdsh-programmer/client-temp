import React, { useState } from "react";
import { useCategoryDrawerStore, useCategoryStore } from "@store/category";
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
  const setCategory = useCategoryStore((state) => {
    return state.setCategory;
  });
  const openCategoryActionDrawer = useCategoryDrawerStore((state) => {
    return state.categoryDrawer;
  });
  const setOpenCategoryActionDrawer = useCategoryDrawerStore((state) => {
    return state.setCategoryDrawer;
  });

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
        <div className="category-menu flex xs:hidden">
          <DrawerTemplate
            openDrawer={openCategoryActionDrawer}
            setOpenDrawer={(open) => {
              return setOpenCategoryActionDrawer(!!open);
            }}
            menuList={menuList}
          />
        </div>
      ) : (
        <div className="category-menu flex items-center justify-end gap-1">
          {categoryProp?.isHidden ? <InvisibleIcon className="h-4 w-4 flex-none" /> : null}
          <MenuTemplate
            setOpenDrawer={() => {
              setCategory(categoryProp || null);
              setOpenCategoryActionDrawer(true);
            }}
            menuList={menuList}
            icon={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
                <MoreDotIcon className="h-4 w-4" />
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
