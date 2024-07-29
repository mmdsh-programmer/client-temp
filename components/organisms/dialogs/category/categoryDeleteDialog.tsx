import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { category } from "@atom/category";
import useDeleteCategory from "@hooks/category/useDeleteCategory";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(category);

  const deleteCategory = useDeleteCategory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!getRepo || !getCategory) return;
    deleteCategory.mutate({
      repoId: getRepo?.id,
      parentId: getCategory.parentId,
      categoryId: getCategory.id,
      forceDelete: true,
      callBack: () => {
        toast.success("دسته بندی حذف شد.");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteCategory.isPending}
      dialogHeader="حذف دسته بندی"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      {getCategory?.name}
    </DeleteDialog>
  );
};

export default CategoryDeleteDialog;
