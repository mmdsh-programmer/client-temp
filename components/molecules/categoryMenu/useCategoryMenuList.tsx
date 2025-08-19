import React from "react";
import { useCategoryDrawerStore, useCategoryStore } from "@store/category";
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
import { ERoles } from "@interface/enums";
import { usePathname } from "next/navigation";
import { useRepositoryStore } from "@store/repository";

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

const useCategoryMenuList = ({ category, toggleModal }: UseCategoryMenuListProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const setCategory = useCategoryStore((state) => {
    return state.setCategory;
  });
  const setOpenCategoryActionDrawer = useCategoryDrawerStore((state) => {
    return state.setCategoryDrawer;
  });
  const currentPath = usePathname();

  const createOptions = [
    {
      text: "ساخت زیر دسته بندی",
      icon: <CategoryAddIcon className="h-4 w-4" />,
      disabled: getRepo?.roleName === ERoles.writer || getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("createCategoryModal", true);
        if (category) setCategory(category);
      },
      className: "create-category",
    },
    {
      text: "ساخت سند",
      icon: <DocumentAddIcon className="h-4 w-4" />,
      disabled: getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("createDocumentModal", true);
        if (category) setCategory(category);
      },
      className: "create-document",
    },
    {
      text: "ساخت نمونه سند",
      icon: <TemplateAddIcon className="h-4 w-4" />,
      disabled:
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("createTemplateModal", true);
        if (category) setCategory(category);
      },
      className: "create-template",
    },
  ];

  const menuList = [
    {
      text: "ایجاد",
      subMenu: createOptions,
      onClick: () => {},
      icon: <AddRectangleIcon className="h-4 w-4 fill-icon-active" />,
    },
    {
      text: "ویرایش دسته بندی",
      icon: <EditIcon className="h-4 w-4" />,
      disabled: getRepo?.roleName === ERoles.writer || getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("editCategoryModal", true);
        if (category) setCategory(category);
      },
      className: "edit-category",
    },
    {
      text: "انتقال",
      icon: <ArrowLeftRectangleIcon className="h-4 w-4 fill-icon-active" />,
      disabled: getRepo?.roleName === ERoles.writer || getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("moveModal", true);
        if (category) setCategory(category);
      },
      className: "move-category",
    },
    {
      text: category?.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      icon: category?.isHidden ? (
        <VisibleIcon className="h-4 w-4" />
      ) : (
        <HiddenIcon className="h-4 w-4" />
      ),
      disabled:
        currentPath === "/admin/myDocuments" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal(category?.isHidden ? "visibleModal" : "hideModal", true);
        setOpenCategoryActionDrawer(false);
        if (category) setCategory(category);
      },
      className: `${category?.isHidden ? "hide-category" : "visible-category"}`,
    },
    {
      text: "محدودیت دسترسی روی پنل",
      icon: <LockIcon className="h-4 w-4" />,
      disabled:
        currentPath === "/admin/myDocuments" ||
        getRepo?.roleName === ERoles.writer ||
        getRepo?.roleName === ERoles.viewer ||
        getRepo?.roleName === ERoles.editor,
      onClick: () => {
        toggleModal("categoryAccessModal", true);
        if (category) setCategory(category);
      },
      className: "category-access",
    },
    {
      text: "حذف دسته بندی",
      icon: <DeleteIcon className="h-4 w-4" />,
      disabled: getRepo?.roleName === ERoles.writer || getRepo?.roleName === ERoles.viewer,
      onClick: () => {
        toggleModal("deleteCategoryModal", true);
        setOpenCategoryActionDrawer(false);
        if (category) setCategory(category);
      },
      className: "delete-category",
    },
  ];

  return menuList;
};

export default useCategoryMenuList;
