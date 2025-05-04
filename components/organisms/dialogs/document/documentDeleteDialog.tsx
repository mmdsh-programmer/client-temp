import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IDocumentMetadata } from "@interface/document.interface";
import React from "react";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useDeleteDocument from "@hooks/document/useDeleteDocument";
import useGetUser from "@hooks/auth/useGetUser";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";

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
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === getDocument?.repoId)
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
      className="document-delete-dialog"
    >
      <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
        آیا از حذف"
        <span
          title={(document || getDocument)?.name}
          className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
        >
          {(document || getDocument)?.name}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default DocumentDeleteDialog;
