import React from "react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import MoveSelection from "@components/molecules/moveSelection";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useMoveBulk from "@hooks/bulk/useMoveBulk";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useBulkStore } from "@store/bulk";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const BulkMoveDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { categoryShow: getCategoryShow, categoryMoveDest: getCategoryMoveDest, setCategoryMoveDest } = useCategoryStore();
  const { bulkItems: getBulkItems, setBulkItems } = useBulkStore();
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const moveBulkHook = useMoveBulk();

  const repoId =
    currentPath === "/admin/myDocuments"
      ? userInfo!.repository.id
      : getRepo!.id;

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
    setCategoryMoveDest(null);
  };

  const closeBulkMove = () => {
    handleClose();
    setBulkItems([]);
  };

  const onSubmit = async () => {
    if (!repoId || !getBulkItems.length) return;
    moveBulkHook.mutate({
      repoId,
      destCategory: getCategoryMoveDest ? getCategoryMoveDest.id : null,
      currentParentId: getCategoryShow ? getCategoryShow.id : null,
      children: getBulkItems.map((item) => {
        return item.id;
      }),
      callBack: () => {
        toast.success("انتقال با موفقیت انجام شد.");
        closeBulkMove();
      },
    });
  };

  return (
    <ConfirmFullHeightDialog
      isPending={moveBulkHook.isPending}
      dialogHeader="انتقال موارد انتخاب شده"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="bulk-move-dialog min-h-[350px]"
    >
      <MoveSelection target="category" />
    </ConfirmFullHeightDialog>
  );
};

export default BulkMoveDialog;
