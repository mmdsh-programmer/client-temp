import React, { useState } from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { categoryAtom } from "@atom/category";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useDeleteCategory from "@hooks/category/useDeleteCategory";
import { useRecoilValue } from "recoil";
import { Checkbox, Typography } from "@material-tailwind/react";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryAtom);

  const [errorMessage, setErrorMessage] = useState("");
  const [forceDelete, setForceDelete] = useState(false);

  const deleteCategory = useDeleteCategory();

  const handleClose = () => {
    setOpen(false);
    setForceDelete(false);
    setErrorMessage("");
  };

  const handleDelete = async () => {
    if (!getRepo || !getCategory) return;
    deleteCategory.mutate({
      repoId: getRepo?.id,
      parentId: getCategory.parentId,
      categoryId: getCategory.id,
      forceDelete,
      callBack: () => {
        toast.success("دسته بندی حذف شد.");
        handleClose();
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
      className=""
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از حذف"
          <span
            title={getCategory?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {getCategory?.name}
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
            />
            <Typography className="warning_text">
              دسته‌بندی {getCategory?.name} دارای زیرمجموعه می‌باشد، آیا
              می‌خواهید این دسته‌بندی را حذف کنید؟
            </Typography>
          </div>
        ) : null}
      </form>
    </DeleteDialog>
  );
};

export default CategoryDeleteDialog;
