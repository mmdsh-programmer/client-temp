import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryVisibleDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryAtom);

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
        {getCategory?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default CategoryVisibleDialog;
