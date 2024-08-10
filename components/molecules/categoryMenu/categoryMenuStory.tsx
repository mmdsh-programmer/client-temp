import React, { useState } from "react";
import { category, categoryDrawerAtom } from "@atom/category";
import DrawerTemplate from "@components/templates/drawerTemplate";
import MenuTemplate from "@components/templates/menuTemplate";
import { ICategoryMetadata } from "@interface/category.interface";
import { useRecoilState, useSetRecoilState } from "recoil";
import CategoryVisibleDialog from "../../organisms/dialogs/category/categoryVisibleDialog";
import CategoryEditDialog from "@components/organisms/dialogs/category/categoryEditDialog";
import CategoryDeleteDialog from "@components/organisms/dialogs/category/categoryDeleteDialog";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import CategoryHideDialog from "@components/organisms/dialogs/category/categoryHideDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";

interface IProps {
  category?: ICategoryMetadata;
  showDrawer?: boolean;
}

const CategoryMenuStory = ({ category: categoryProp, showDrawer }: IProps) => {
  const setCategory = useSetRecoilState(category);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [moveModal, setMoveModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [CategoryAccessModal, setCategoryAccessModal] = useState(false);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);

  const [createDocumentModal, setCreateDocumentModal] = useState(false);
  const [createTemplateModal, setCreateTemplateModal] = useState(false);
  const [openCategoryActionDrawer, setOpenCategoryActionDrawer] =
    useRecoilState(categoryDrawerAtom);

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
  }[] = [
    {
      text: "ساخت زیردسته بندی",
      onClick: () => {
        setCreateCategoryModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
    {
      text: "ساخت سند",
      onClick: () => {
        setCreateDocumentModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
    {
      text: "ساخت  نمونه سند",
      onClick: () => {
        setCreateTemplateModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
    {
      text: "انتقال",
      onClick: () => {
        setMoveModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
    {
      text: "ویرایش دسته بندی",
      onClick: () => {
        setEditCategoryModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
    {
      text: "حذف دسته بندی",
      onClick: () => {
        setDeleteCategoryModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
    {
      text: categoryProp?.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      onClick: () => {
        categoryProp?.isHidden ? setVisibleModal(true) : setHideModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
    {
      text: "دسترسی دسته‌بندی",
      onClick: () => {
        setCategoryAccessModal(true);
        if (categoryProp) {
          setCategory(categoryProp);
        }
      },
    },
  ];

  return (
    <>
      {!!showDrawer ? (
        <div className="xs:hidden flex">
          <DrawerTemplate
            openDrawer={openCategoryActionDrawer}
            setOpenDrawer={setOpenCategoryActionDrawer}
            menuList={menuList}
          />
        </div>
      ) : (
        <MenuTemplate
          setOpenDrawer={() => {
            setCategory(categoryProp || null);
            setOpenCategoryActionDrawer(true);
          }}
          menuList={menuList}
        />
      )}
    </>
  );
};

export default CategoryMenuStory;
