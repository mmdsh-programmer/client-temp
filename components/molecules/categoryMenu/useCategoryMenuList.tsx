import React from "react";
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
import { MenuItem } from "@components/templates/menuTemplate";

const createItem = (
  text: string,
  icon: React.JSX.Element,
  onClick: () => void,
  className?: string,
  options: { disabled?: boolean; subMenu?: MenuItem[] } = {},
): MenuItem => {
  return {
    text,
    icon,
    onClick,
    disabled: options.disabled || false,
    subMenu: options.subMenu,
    className,
  };
};

const useCategoryMenuList = (
  category: ICategoryMetadata | null,
  setModal: (modalName: string) => void,
): MenuItem[] => {
  const repo = useRepositoryStore((s) => {
    return s.repo;
  });
  const pathname = usePathname();

  if (!category) return [];

  const role = repo?.roleName;

  const createSubMenuItems: MenuItem[] = [
    createItem(
      "ساخت زیر دسته بندی",
      <CategoryAddIcon className="h-4 w-4" />,
      () => {
        setModal("createCategory");
      },
      "create-category",
      { disabled: role === ERoles.writer || role === ERoles.viewer },
    ),
    createItem(
      "ساخت سند",
      <DocumentAddIcon className="h-4 w-4" />,
      () => {
        setModal("createDocument");
      },
      "create-document",
      { disabled: role === ERoles.viewer },
    ),
    createItem(
      "ساخت نمونه سند",
      <TemplateAddIcon className="h-4 w-4" />,
      () => {
        setModal("createTemplate");
      },
      "create-template",
      { disabled: role === ERoles.writer || role === ERoles.viewer || role === ERoles.editor },
    ),
  ];

  const menuItems: MenuItem[] = [
    createItem("ایجاد", <AddRectangleIcon className="h-4 w-4 fill-icon-active" />, () => {}, "", {
      subMenu: createSubMenuItems,
    }),
    createItem(
      "ویرایش دسته بندی",
      <EditIcon className="h-4 w-4" />,
      () => {
        window.metrics?.track("category:edit_dialog");
        setModal("editCategory");
      },
      "edit-category",
      { disabled: role === ERoles.writer || role === ERoles.viewer },
    ),
    createItem(
      "انتقال",
      <ArrowLeftRectangleIcon className="h-4 w-4 fill-icon-active" />,
      () => {
        window.metrics?.track("category:move_dialog");
        setModal("move");
      },
      "move-category",
      { disabled: role === ERoles.writer || role === ERoles.viewer },
    ),
    createItem(
      category.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      category.isHidden ? <VisibleIcon className="h-4 w-4" /> : <HiddenIcon className="h-4 w-4" />,
      () => {
        window.metrics?.track(
          category.isHidden ? "category:visible_dialog" : "category:hide_dialog",
        );
        setModal(category.isHidden ? "visible" : "hide");
      },
      `${category?.isHidden ? "hide-category" : "visible-category"}`,
      {
        disabled:
          pathname === "/admin/dashboard" ||
          pathname === "/admin/myDocuments" ||
          role === ERoles.writer ||
          role === ERoles.viewer,
      },
    ),
    createItem(
      "محدودیت دسترسی روی پنل",
      <LockIcon className="h-4 w-4" />,
      () => {
        window.metrics?.track("category:accessRestriction_dialog");
        setModal("accessCategory");
      },
      "category-access",
      {
        disabled:
          pathname === "/admin/dashboard" ||
          pathname === "/admin/myDocuments" ||
          role === ERoles.writer ||
          role === ERoles.viewer ||
          role === ERoles.editor,
      },
    ),
  ];

  menuItems.push(
    createItem(
      "حذف دسته بندی",
      <DeleteIcon className="h-4 w-4" />,
      () => {
        window.metrics?.track("category:delete_dialog");
        setModal("deleteCategory");
      },
      "delete-category",
      { disabled: role === ERoles.writer || role === ERoles.viewer },
    ),
  );

  return menuItems;
};

export default useCategoryMenuList;
