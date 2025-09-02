import React from "react";
import { useCategoryStore } from "@store/category";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import MoveSelection from "@components/molecules/moveSelection";
import { toast } from "react-toastify";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryMoveDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();

  const {
    category: getCategory,
    setCategory,
    categoryShow: getCategoryShow,
    categoryMoveDest: getCategoryMoveDest,
    setCategoryMoveDest,
  } = useCategoryStore();
  const moveCategory = useEditCategory();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
    setCategoryMoveDest(null);
  };

  const onSubmit = async () => {
    if (
      getCategoryMoveDest?.id === getCategory?.parentId ||
      getCategoryMoveDest?.id === getCategory?.id
    ) {
      toast.error("تغییری در دسته بندی وجود ندارد");
    }

    if (!repoId || !getCategory) {
      return;
    }
    moveCategory.mutate({
      repoId,
      categoryId: getCategory?.id,
      parentId: getCategoryMoveDest ? getCategoryMoveDest.id : null,
      description: getCategory.description,
      isHidden: getCategory.isHidden,
      name: getCategory.name,
      order: getCategory.order || null,
      currentParentId: getCategoryShow ? getCategoryShow.id : null,
      callBack: () => {
        toast.success("دسته بندی مورد نظر با موفقیت انتقال یافت.");
        handleClose();
        setCategory(null);
      },
    });
  };

  return (
    <ConfirmFullHeightDialog
      isPending={moveCategory.isPending}
      dialogHeader="انتقال دسته‌بندی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="category-move-dialog min-h-[350px]"
    >
      <MoveSelection target="category" />
    </ConfirmFullHeightDialog>
  );
};

export default CategoryMoveDialog;
