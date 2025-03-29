import React from "react";
import { useRecoilValue } from "recoil";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { selectedDocumentAtom } from "@atom/document";
import { IDocumentMetadata } from "@interface/document.interface";
import useDeleteDocumentPublishLink from "@hooks/document/useDeleteDocumentPublishLink";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  document?: IDocumentMetadata;
}

const DocumentDeletePublishLinkDialog = ({ document, setOpen }: IProps) => {
  const repoId = useRepoId();
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const deletePublishLink = useDeleteDocumentPublishLink();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const selectedDocument = document || getDocument;
    if (!repoId || !selectedDocument) return;
    deletePublishLink.mutate({
      repoId,
      documentId: selectedDocument.id,
      categoryId: selectedDocument.categoryId,
      callBack: () => {
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deletePublishLink.isPending}
      dialogHeader="حذف لینک انتشار"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
      آیا از حذف لینک انتشار "
        <span
          title={(document || getDocument)?.name}
          className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
        >
          {(document || getDocument)?.name}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default DocumentDeletePublishLinkDialog;
