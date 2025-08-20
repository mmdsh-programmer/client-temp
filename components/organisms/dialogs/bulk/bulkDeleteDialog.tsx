import CategoryDeleteDialog from "../category/categoryDeleteDialog";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import DocumentDeleteDialog from "../document/documentDeleteDialog";
import React from "react";
import useDeleteBulk from "@hooks/bulk/useDeleteBulk";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useBulkStore } from "@store/bulk";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkDeleteDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { categoryShow: getCategoryShow } = useCategoryStore();
  const { bulkItems: getBulkItems, setBulkItems } = useBulkStore();
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
      className="bulk-delete-dialog"
    >
      <div className="flex text-primary_normal font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف موارد انتخاب شده مطمئن هستید؟
      </div>
    </DeleteDialog>
  );
};

export default BulkDeleteDialog;
