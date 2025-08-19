import React from "react";
import { useCategoryStore } from "@store/category";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { toast } from "react-toastify";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryVisibleDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const [getCategory, setCategory] = [
    useCategoryStore((state) => {
      return state.category;
    }),
    useCategoryStore((state) => {
      return state.setCategory;
    }),
  ];

  const editCategory = useEditCategory();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !getCategory) return;
    editCategory.mutate({
      repoId: getRepo?.id,
      categoryId: getCategory?.id,
      parentId: getCategory.parentId,
      name: getCategory.name,
      description: getCategory?.description,
      order: null,
      isHidden: false,
      currentParentId: null,
      callBack: () => {
        setCategory(null);
        toast.success("دسته بندی قابل رویت است.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={editCategory.isPending}
      dialogHeader=" عدم مخفی سازی دسته بندی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="category-visible-dialog"
    >
      آیا از عدم مخفی سازی"
      <span className="text-primary_normal max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {getCategory?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default CategoryVisibleDialog;
