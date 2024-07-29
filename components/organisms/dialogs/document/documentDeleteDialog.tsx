import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteCategory from "@hooks/category/useDeleteCategory";
import useDeleteDocument from "@hooks/document/useDeleteDocument";
import { selectedDocumentAtom } from "@atom/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const deleteDocument = useDeleteDocument();

  const deleteCategory = useDeleteCategory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!getRepo || !document) return;
    deleteDocument.mutate({
      repoId: getRepo?.id,
      parentId: document.categoryId,
      callBack: () => {
        toast.success("سند حذف شد.");
        handleClose();
      },
      documentId: document.id,
    });
  };

  return (
    <DeleteDialog
      isPending={deleteCategory.isPending}
      dialogHeader="حذف سند"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      {document?.name}
    </DeleteDialog>
  );
};

export default DocumentDeleteDialog;
