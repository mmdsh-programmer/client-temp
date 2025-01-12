import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteDocument from "@hooks/document/useDeleteDocument";
import { selectedDocumentAtom } from "@atom/document";
import { IDocumentMetadata } from "@interface/document.interface";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  document?: IDocumentMetadata;
}

const DocumentDeleteDialog = ({ document, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const deleteDocument = useDeleteDocument();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const repoId =
    currentPath === "/admin/myDocuments"
      ? userInfo!.repository.id
      : getRepo!.id;

    const selectedDocument = document || getDocument;
    if (!repoId || !selectedDocument) return;
    deleteDocument.mutate({
      repoId,
      parentId: selectedDocument.categoryId,
      documentId: selectedDocument.id,
      callBack: () => {
        toast.success("سند حذف شد.");
        handleClose();
      },
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

export default DocumentDeleteDialog;
