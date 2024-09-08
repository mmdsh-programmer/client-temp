import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import useEditDocument from "@hooks/document/useEditDocument";
import { selectedDocumentAtom } from "@atom/document";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { categoryMoveDest } from "@atom/category";
import MoveSelection from "@components/molecules/moveSelection";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentMoveDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);
  const [getCategoryMoveDest, setCategoryMoveDest] =
    useRecoilState(categoryMoveDest);

  const moveDocument = useEditDocument();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
    setCategoryMoveDest(null);
  };

  const onSubmit = async () => {
    if (getCategoryMoveDest?.id === document?.categoryId) {
      toast.error("تغییری در دسته بندی وجود ندارد");
    }
    if (!getRepo || !document) return;
    moveDocument.mutate({
      repoId: getRepo?.id,
      categoryId: getCategoryMoveDest ? getCategoryMoveDest?.id : null,
      title: document.name,
      description: document?.description,
      documentId: document?.id,
      contentType: document.contentType,
      order: document.order,
      isHidden: document.isHidden,
      callBack: () => {
        toast.success(" سند انتقال یافت.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmFullHeightDialog
      isPending={moveDocument.isPending}
      dialogHeader="انتقال سند"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="min-h-[350px]"
    >
      <MoveSelection target="document" />
    </ConfirmFullHeightDialog>
  );
};

export default DocumentMoveDialog;
