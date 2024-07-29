import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import { category } from "@atom/category";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryHideDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(category);

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
      callBack: () => {
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
      className=""
    >
      آیا از مخفی سازی"
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {getCategory?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default CategoryHideDialog;
