import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { useCategoryStore } from "@store/category";
import { useRepositoryStore } from "@store/repository";
import { toast } from "react-toastify";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryHideDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const getCategory = useCategoryStore((state) => {
    return state.category;
  });
  const setCategory = useCategoryStore((state) => {
    return state.setCategory;
  });

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
      isHidden: true,
      currentParentId: null,
      callBack: () => {
        setCategory(null);
        toast.success("دسته بندی مخفی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={editCategory.isPending}
      dialogHeader="مخفی سازی دسته بندی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="category-hide-dialog"
    >
      آیا از مخفی سازی"
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {getCategory?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default CategoryHideDialog;
