import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useCategoryStore } from "@store/category";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { ICategoryMetadata } from "@interface/category.interface";
import { toast } from "react-toastify";
import useDeleteCategory from "@hooks/category/useDeleteCategory";
import Checkbox from "@components/atoms/checkbox";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  category?: ICategoryMetadata;
}

const CategoryDeleteDialog = ({ setOpen, category }: IProps) => {
  const repoId = useRepoId();
  const { category: getCategory, setCategory } = useCategoryStore();

  const [errorMessage, setErrorMessage] = useState("");
  const [forceDelete, setForceDelete] = useState(false);

  const deleteCategory = useDeleteCategory();

  const handleClose = () => {
    setOpen(false);
    setForceDelete(false);
    setErrorMessage("");
  };

  const handleDelete = async () => {
    const selectedCat = category || getCategory;
    if (!repoId || !selectedCat) {
      return;
    }
    deleteCategory.mutate({
      repoId,
      parentId: selectedCat.parentId,
      categoryId: selectedCat.id,
      forceDelete,
      callBack: () => {
        toast.success("دسته بندی حذف شد.");
        handleClose();
        setCategory(null);
      },
      errorCallBack: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteCategory.isPending}
      dialogHeader="حذف دسته بندی"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className="category-delete-dialog"
    >
      <form className="flex flex-col gap-5">
        <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
          آیا از حذف"
          <span
            title={(category || getCategory)?.name}
            className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
          >
            {(category || getCategory)?.name}
          </span>
          " اطمینان دارید؟
        </div>
        {errorMessage === "ریسورس دارای زیرمجموعه است" ? (
          <div className="flex items-center gap-1">
            <Checkbox
              onChange={() => {
                return setForceDelete(!forceDelete);
              }}
              checked={!!forceDelete}
              className="category-delete-dialog__checkbox"
            />
            <Typography className="warning_text">
              دسته‌بندی {(category || getCategory)?.name} دارای زیرمجموعه می‌باشد، آیا می‌خواهید این
              دسته‌بندی را حذف کنید؟
            </Typography>
          </div>
        ) : null}
      </form>
    </DeleteDialog>
  );
};

export default CategoryDeleteDialog;
