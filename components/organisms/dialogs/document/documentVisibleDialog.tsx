import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import { useForm } from "react-hook-form";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentVisibleDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { selectedDocument: document } = useDocumentStore();

  const visibleDocument = useEditDocument();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !document) return;
    visibleDocument.mutate({
      repoId: getRepo?.id,
      categoryId: document?.categoryId,
      title: document.name,
      description: document?.description,
      documentId: document.id,
      contentType: document.contentType,
      order: document.order,
      isHidden: false,
      callBack: () => {
        toast.success(" سند قابل رویت است.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={visibleDocument.isPending}
      dialogHeader=" عدم مخفی سازی  سند"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="doccument-visible-dialog"
    >
      آیا از عدم مخفی سازی"
      <span className="text-primary_normal max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {document?.name}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default DocumentVisibleDialog;
