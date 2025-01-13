import React from "react";
import { bulkItemsAtom } from "@atom/bulk";
import { categoryShowAtom } from "@atom/category";
import { useRecoilState, useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import useDeleteBulk from "@hooks/bulk/useDeleteBulk";
import { useForm } from "react-hook-form";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import CategoryDeleteDialog from "../category/categoryDeleteDialog";
import DocumentDeleteDialog from "../document/documentDeleteDialog";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItemsAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const bulkDeleteHook = useDeleteBulk();

  const repoId =
  currentPath === "/admin/myDocuments"
    ? userInfo!.repository.id
    : getRepo!.id;

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const close = () => {
    setBulkItems([]);
  };

  const onSubmit = () => {
    if (!repoId) return;
    bulkDeleteHook.mutate({
      repoId,
      children: getBulkItems.map((item) => {
        return item.id;
      }),
      parentId: getCategoryShow?.id,
      forceDelete: true,
      callBack: close,
    });
  };

  if (getBulkItems.length === 1) {
    if (getBulkItems[0].type === "category") {
      return (
        <CategoryDeleteDialog setOpen={close} category={getBulkItems[0]} />
      );
    }
    return <DocumentDeleteDialog setOpen={close} document={getBulkItems[0]} />;
  }

  return (
    <DeleteDialog
      isPending={bulkDeleteHook.isPending}
      dialogHeader="حذف موارد انتخاب‌ شده"
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
