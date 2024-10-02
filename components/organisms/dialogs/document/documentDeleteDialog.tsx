import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteDocument from "@hooks/document/useDeleteDocument";
import { selectedDocumentAtom } from "@atom/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentDeleteDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const deleteDocument = useDeleteDocument();

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
      isPending={deleteDocument.isPending}
      dialogHeader="حذف سند"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از حذف"
        <span
          title={document?.name}
          className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
        >
          {document?.name}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default DocumentDeleteDialog;
