import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useDeleteCategory from "@hooks/category/useDeleteCategory";
import { useRecoilValue } from "recoil";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryAtom);

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
