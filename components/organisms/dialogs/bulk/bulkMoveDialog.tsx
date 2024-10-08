import React from "react";
import { bulkItemsAtom } from "@atom/bulk";
import { categoryMoveDestAtom, categoryShowAtom } from "@atom/category";
import { useRecoilState, useRecoilValue } from "recoil";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import MoveSelection from "@components/molecules/moveSelection";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useMoveBulk from "@hooks/bulk/useMoveBulk";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const BulkMoveDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategoryShow = useRecoilValue(categoryShowAtom);
  const [getBulkItems, setBulkItems] = useRecoilState(bulkItemsAtom);
  const [getCategoryMoveDest, setCategoryMoveDest] =
    useRecoilState(categoryMoveDestAtom);

  const moveBulkHook = useMoveBulk();

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
    if (!getRepo || !getBulkItems.length) return;
    moveBulkHook.mutate({
      repoId: getRepo.id,
      destCategory: getCategoryMoveDest ? getCategoryMoveDest.id : null,
      currentParentId: getCategoryShow ?getCategoryShow.id : null,
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
      className="min-h-[350px]"
    >
      <MoveSelection target="category" />
    </ConfirmFullHeightDialog>
  );
};

export default BulkMoveDialog;
