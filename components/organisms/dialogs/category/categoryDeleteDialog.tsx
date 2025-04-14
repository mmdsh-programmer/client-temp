import { Checkbox, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { ICategoryMetadata } from "@interface/category.interface";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useDeleteCategory from "@hooks/category/useDeleteCategory";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  category?: ICategoryMetadata;
}

const CategoryDeleteDialog = ({ setOpen, category }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const [getCategory, setCategory] = useRecoilState(categoryAtom);

  const [errorMessage, setErrorMessage] = useState("");
  const [forceDelete, setForceDelete] = useState(false);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const deleteCategory = useDeleteCategory();

  const handleClose = () => {
    setOpen(false);
    setForceDelete(false);
    setErrorMessage("");
  };

  const handleDelete = async () => {
    const selectedCat = category || getCategory;
    const repoId =
      currentPath === "/admin/myDocuments"
        ? userInfo!.repository.id
        : getRepo!.id;
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
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از حذف"
          <span
            title={(category || getCategory)?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {(category || getCategory)?.name}
          </span>
          " اطمینان دارید؟
        </div>
        {errorMessage === "ریسورس دارای زیرمجموعه است" ? (
          <div className="flex items-center gap-1">
            <Checkbox
              color="deep-purple"
              containerProps={{
                className: "p-[2px]",
              }}
              crossOrigin=""
              onChange={() => {
                return setForceDelete(!forceDelete);
              }}
              checked={!!forceDelete}
              className="category-delete-dialog__checkbox"
            />
            <Typography className="warning_text">
              دسته‌بندی {(category || getCategory)?.name} دارای زیرمجموعه
              می‌باشد، آیا می‌خواهید این دسته‌بندی را حذف کنید؟
            </Typography>
          </div>
        ) : null}
      </form>
    </DeleteDialog>
  );
};

export default CategoryDeleteDialog;
