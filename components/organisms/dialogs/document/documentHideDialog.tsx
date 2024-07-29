import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { useForm } from "react-hook-form";
import useEditDocument from "@hooks/document/useEditDocument";
import { selectedDocumentAtom } from "@atom/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentHideDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom)

  const hideDocument = useEditDocument();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !document) return;
    hideDocument.mutate({
      repoId: getRepo?.id,
      categoryId: document?.id,
      title: document.name,
      description: document?.description,
      documentId: 0,
      contentType: document.contentType,
      order: document.order,
      isHidden: true,
      callBack: () => {
        toast.success(" سند مخفی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={hideDocument.isPending}
      dialogHeader="مخفی سازی سند"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      آیا از مخفی سازی"
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {document?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default DocumentHideDialog;
