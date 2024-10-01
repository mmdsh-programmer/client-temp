import { useSetRecoilState } from "recoil";
import { categoryAtom } from "@atom/category";
import { ICategoryMetadata } from "@interface/category.interface";

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
  const setCategory = useSetRecoilState(categoryAtom);

  const createOptions = [
    {text: "ساخت زیر دسته بندی",
      onClick: () => {
        toggleModal("createCategoryModal", true);
        if (category) setCategory(category);
      },},
    {text: "ساخت سند",
      onClick: () => {
        toggleModal("createDocumentModal", true);
        if (category) setCategory(category);
      },},
    {text: "ساخت نمونه سند",
      onClick: () => {
        toggleModal("createTemplateModal", true);
        if (category) setCategory(category);
      },},
  ];

  const menuList = [
    { text: "ایجاد", subMenu: createOptions, onClick: () => {} },
    {text: "ویرایش دسته بندی",
      onClick: () => {
        toggleModal("editCategoryModal", true);
        if (category) setCategory(category);
      },},
    {text: "انتقال",
      onClick: () => {
        toggleModal("moveModal", true);
        if (category) setCategory(category);
      },},
    {text: category?.isHidden ? "عدم مخفی سازی" : "مخفی سازی",
      onClick: () => {
        toggleModal(category?.isHidden ? "visibleModal" : "hideModal", true);
        if (category) setCategory(category);
      },},
    {text: "دسترسی دسته‌بندی",
      onClick: () => {
        toggleModal("categoryAccessModal", true);
        if (category) setCategory(category);
      },},
    {text: "حذف دسته بندی",
      onClick: () => {
        toggleModal("deleteCategoryModal", true);
        if (category) setCategory(category);
      },},
  ];

  return menuList;
};

export default useCategoryMenuList;
