import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryAtom } from "@atom/category";
import { ICategoryMetadata } from "@interface/category.interface";
import {
  AddRectangleIcon,
  ArrowLeftRectangleIcon,
  CategoryAddIcon,
  DeleteIcon,
  DocumentAddIcon,
  EditIcon,
  HiddenIcon,
  LockIcon,
  TemplateAddIcon,
  VisibleIcon,
} from "@components/atoms/icons";
import { repoAtom } from "@atom/repository";
import { ERoles } from "@interface/enums";

interface UseCategoryMenuListProps {
  category?: ICategoryMetadata;
  toggleModal: (modalName: keyof Modals, value: boolean) => void;
}

type Modals = {
  editCategoryModal: boolean;
  deleteCategoryModal: boolean;
  moveModal: boolean;
  hideModal: boolean;
  visibleModal: boolean;
  categoryAccessModal: boolean;
  createCategoryModal: boolean;
  createDocumentModal: boolean;
  createTemplateModal: boolean;
};

const useCategoryMenuList = ({
  category,
  toggleModal,
}: UseCategoryMenuListProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const setCategory = useSetRecoilState(categoryAtom);

  const createOptions = [
    {
      text: "ساخت زیر دسته بندی",
      icon: <CategoryAddIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("createCategoryModal", true);
        if (category) setCategory(category);
      },
    },
    {
      text: "ساخت سند",
      icon: <DocumentAddIcon className="w-4 h-4" />,
      disabled: getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("createDocumentModal", true);
        if (category) setCategory(category);
      },
    },
    {
      text: "ساخت نمونه سند",
      icon: <TemplateAddIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("createTemplateModal", true);
        if (category) setCategory(category);
      },
    },
  ];

  const menuList = [
    {
      text: "ایجاد",
      subMenu: createOptions,
      onClick: () => {},
      icon: <AddRectangleIcon className="w-4 h-4 fill-icon-active" />,
    },
    {
      text: "ویرایش دسته بندی",
      icon: <EditIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("editCategoryModal", true);
        if (category) setCategory(category);
      },
    },
    {
      text: "انتقال",
      icon: <ArrowLeftRectangleIcon className="w-4 h-4 fill-icon-active" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("moveModal", true);
        if (category) setCategory(category);
      },
    },
    {
      text: category?.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      icon: category?.isHidden ? (
        <VisibleIcon className="w-4 h-4" />
      ) : (
        <HiddenIcon className="w-4 h-4" />
      ),
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal(category?.isHidden ? "visibleModal" : "hideModal", true);
        if (category) setCategory(category);
      },
    },
    {
      text: "دسترسی دسته‌بندی",
      icon: <LockIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("categoryAccessModal", true);
        if (category) setCategory(category);
      },
    },
    {
      text: "حذف دسته بندی",
      icon: <DeleteIcon className="w-4 h-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("deleteCategoryModal", true);
        if (category) setCategory(category);
      },
    },
  ];

  return menuList;
};

export default useCategoryMenuList;
