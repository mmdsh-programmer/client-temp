import React, { useState, useCallback } from "react";
import { InvisibleIcon, MoreDotIcon } from "@components/atoms/icons";
import { useCategoryDrawerStore, useCategoryStore } from "@store/category";
import { ICategoryMetadata } from "@interface/category.interface";
import useCategoryMenuList from "./useCategoryMenuList";
import CategoryDialogs from "../categoryDialogs";
import MenuTemplate from "@components/templates/menuTemplate";

interface IProps {
  category: ICategoryMetadata;
}

const CategoryMenu = ({ category }: IProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { setCategory } = useCategoryStore();
  const { setCategoryDrawer } = useCategoryDrawerStore();

  const handleSetModal = useCallback(
    (modalName: string) => {
      setCategory(category);
      setActiveModal(modalName);
    },
    [category, setCategory],
  );

  const menuList = useCategoryMenuList(category, handleSetModal);

  const closeModal = () => {
    setActiveModal(null);
    setCategory(null);
  };

  return (
    <>
      <div className="category-menu flex items-center justify-end gap-1">
        {category?.isHidden ? <InvisibleIcon className="h-4 w-4 flex-none" /> : null}
        <MenuTemplate
          menuList={menuList}
          onMobileClick={() => {
            setCategoryDrawer(true);
            setCategory(category);
          }}
          icon={
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-50 bg-white p-1 shadow-none">
              <MoreDotIcon className="h-4 w-4" />
            </div>
          }
        />
      </div>
      <CategoryDialogs activeModal={activeModal} closeModal={closeModal} />
    </>
  );
};

export default CategoryMenu;
