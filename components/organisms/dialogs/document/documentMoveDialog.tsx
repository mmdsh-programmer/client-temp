import React from "react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import MoveSelection from "@components/molecules/moveSelection";
import { toast } from "react-toastify";
import useEditDocument from "@hooks/document/useEditDocument";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { useRepositoryStore } from "@store/repository";
import { useDocumentStore } from "@store/document";
import { useCategoryStore } from "@store/category";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentMoveDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();
  const { selectedDocument: document } = useDocumentStore();
  const { categoryShow, categoryMoveDest: getCategoryMoveDest, setCategoryMoveDest } = useCategoryStore();
  const currentPath = usePathname();

  const { data: userInfo } = useGetUser();
  const moveDocument = useEditDocument();

  const repoId =
    currentPath === "/admin/myDocuments" ||
    (currentPath === "/admin/dashboard" && userInfo?.repository.id === document?.repoId)
      ? userInfo!.repository.id
      : getRepo!.id;

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
    if (!repoId || !document) return;
    moveDocument.mutate({
      repoId,
      categoryId: getCategoryMoveDest ? getCategoryMoveDest?.id : null,
      title: document.name,
      description: document?.description,
      documentId: document?.id,
      contentType: document.contentType,
      order: document.order,
      isHidden: document.isHidden,
      currentParentId: categoryShow?.id,
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
      className="document-move-dialog min-h-[350px]"
    >
      <MoveSelection target="document" />
    </ConfirmFullHeightDialog>
  );
};

export default DocumentMoveDialog;
