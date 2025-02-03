import {
  categoryAtom,
  categoryMoveDestAtom,
  categoryShowAtom,
} from "@atom/category";
import { useRecoilState, useRecoilValue } from "recoil";

import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import MoveSelection from "@components/molecules/moveSelection";
import React from "react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useEditCategory from "@hooks/category/useEditCategory";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryMoveDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [getCategory, setCategory] = useRecoilState(categoryAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);
  const [getCategoryMoveDest, setCategoryMoveDest] =
    useRecoilState(categoryMoveDestAtom);
    const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const moveCategory = useEditCategory();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
    setCategoryMoveDest(null);
  };

  const onSubmit = async () => {
    const repoId =
    currentPath === "/admin/myDocuments"
      ? userInfo!.repository.id
      : getRepo!.id;

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
      className="min-h-[350px]"
    >
      <MoveSelection target="category" />
    </ConfirmFullHeightDialog>
  );
};

export default CategoryMoveDialog;
