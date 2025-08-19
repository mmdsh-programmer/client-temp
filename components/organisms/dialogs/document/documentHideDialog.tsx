import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import { useForm } from "react-hook-form";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentHideDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const document = useDocumentStore((state) => {
    return state.selectedDocument;
  });

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
      categoryId: document.categoryId,
      title: document.name,
      description: document?.description,
      documentId: document.id,
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
      className="document-hide-dialog"
    >
      آیا از مخفی سازی"
      <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
        {document?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default DocumentHideDialog;
