import { bulkItems } from "atom/bulk";
import { category } from "atom/category";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import useDeleteBulk from "@hooks/bulk/useDeleteBulk";
import { useForm } from "react-hook-form";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { Typography } from "@material-tailwind/react";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkDeleteDialog = ({ setOpen }: IProps) => {
  const bulkDeleteHook = useDeleteBulk();

  const getRepo = useRecoilValue(repoAtom);
  const [getCategory, setCategory] = useRecoilState(category);
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItems);

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };
  const close = () => {
    setCategory(null);
    setBulkItems([]);
  };
  const onSubmit = () => {
    if (!getRepo) return;
    bulkDeleteHook.mutate({
      repoId: getRepo.id,
      children: getBulkItems.map((item) => {
        return item.id;
      }),
      parentId: getCategory?.id,
      forceDelete: true,
      callBack: close,
    });
  };

  return (
    <DeleteDialog
      isPending={bulkDeleteHook.isPending}
      dialogHeader="حذف دسته بندی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
    >
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف موارد انتخاب شده مطمئن هستید؟
      </div>
    </DeleteDialog>
  );
};

export default BulkDeleteDialog;
