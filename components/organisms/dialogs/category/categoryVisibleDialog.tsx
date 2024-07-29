import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";
import { ICategoryMetadata } from "@interface/category.interface";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  category?: ICategoryMetadata
}

const CategoryVisibleDialog = ({ setOpen, category }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  const editCategory = useEditCategory();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !category) return;
    editCategory.mutate({
      repoId: getRepo?.id,
      categoryId: category?.id,
      parentId: category.parentId,
      name: category.name,
      description: category?.description,
      order: null,
      isHidden: false,
      callBack: () => {
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
      className=""
    >
      آیا از عدم مخفی سازی"
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {category?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default CategoryVisibleDialog;
