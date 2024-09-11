import React, { useState } from "react";
import { categoryAtom, categoryDrawerAtom } from "@atom/category";
import { useRecoilState, useSetRecoilState } from "recoil";

import CategoryAccessDialog from "@components/organisms/dialogs/category/categoryAccessDialog";
import CategoryCreateDialog from "@components/organisms/dialogs/category/categoryCreateDialog";
import CategoryDeleteDialog from "@components/organisms/dialogs/category/categoryDeleteDialog";
import CategoryEditDialog from "@components/organisms/dialogs/category/categoryEditDialog";
import CategoryHideDialog from "@components/organisms/dialogs/category/categoryHideDialog";
import CategoryMoveDialog from "@components/organisms/dialogs/category/categoryMoveDialog";
import CategoryVisibleDialog from "../../organisms/dialogs/category/categoryVisibleDialog";
import DocumentCreate from "@components/organisms/dialogs/document/documentCreate";
import DrawerTemplate from "@components/templates/drawerTemplate";
import { ICategoryMetadata } from "@interface/category.interface";
import MenuTemplate from "@components/templates/menuTemplate";
import { MoreDotIcon } from "@components/atoms/icons";

interface IProps {
  category?: ICategoryMetadata;
  showDrawer?: boolean;
}

const CategoryMenu = ({ category: categoryProp, showDrawer }: IProps) => {
  const setCategory = useSetRecoilState(categoryAtom);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [moveModal, setMoveModal] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [categoryAccessModal, setCategoryAccessModal] = useState(false);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [createDocumentModal, setCreateDocumentModal] = useState(false);
  const [createTemplateModal, setCreateTemplateModal] = useState(false);
  const [openCategoryActionDrawer, setOpenCategoryActionDrawer] =
    useRecoilState(categoryDrawerAtom);

  const createOptions = [
    {
      text: "ساخت زیر دسته بندی",
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
  ];

  const menuList: {
    text: string;
    icon?: React.JSX.Element;
    onClick: () => void;
    subMenu?: { text: string; icon?: React.JSX.Element; onClick: () => void }[];
  }[] = [
    {
      text: "ایجاد",
      subMenu: createOptions,
      onClick: () => {},
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
      text: "انتقال",
      onClick: () => {
        setMoveModal(true);
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
    {
      text: "حذف دسته بندی",
      onClick: () => {
        setDeleteCategoryModal(true);
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
          icon={
            <div className="rounded-lg bg-white p-1 shadow-none border-2 border-gray-50 flex justify-center items-center h-8 w-8">
              <MoreDotIcon className="w-4 h-4" />
            </div>
          }
        />
      )}
      {visibleModal && (
        <CategoryVisibleDialog
          setOpen={() => {
            setVisibleModal(false);
          }}
        />
      )}
      {editCategoryModal && (
        <CategoryEditDialog
          setOpen={() => {
            setEditCategoryModal(false);
          }}
        />
      )}
      {deleteCategoryModal && (
        <CategoryDeleteDialog
          setOpen={() => {
            setDeleteCategoryModal(false);
          }}
        />
      )}
      {createCategoryModal && (
        <CategoryCreateDialog
          setOpen={() => {
            setCreateCategoryModal(false);
          }}
        />
      )}
      {hideModal && (
        <CategoryHideDialog
          setOpen={() => {
            setHideModal(false);
          }}
        />
      )}
      {createDocumentModal && (
        <DocumentCreate
          isTemplate={false}
          setOpen={() => setCreateDocumentModal(false)}
        />
      )}
      {createTemplateModal && (
        <DocumentCreate
          isTemplate={true}
          setOpen={() => setCreateTemplateModal(false)}
        />
      )}
      {moveModal && (
        <CategoryMoveDialog
          setOpen={() => {
            setMoveModal(false);
          }}
        />
      )}
      {categoryAccessModal && (
        <CategoryAccessDialog
          setOpen={() => {
            setCategoryAccessModal(false);
          }}
        />
      )}
    </>
  );
};

export default CategoryMenu;
