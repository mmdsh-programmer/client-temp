import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useBookmarkDocument from "@hooks/document/useBookmarkDocument";
import { useForm } from "react-hook-form";
import { useDocumentStore } from "@store/document";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentBookmarkDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const document = useDocumentStore((state) => {
    return state.selectedDocument;
  });

  const bookmarkDocument = useBookmarkDocument();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!repoId || !document) return;
    if (!document.isBookmarked) {
      bookmarkDocument.mutate({
        repoId,
        documentId: document.id,
        categoryId: document.categoryId,
        callBack: () => {
          toast.success("سند مورد نظر به نشان شده ها اضافه شد.");
          handleClose();
        },
      });
    } else {
      bookmarkDocument.mutate({
        repoId,
        documentId: document.id,
        categoryId: document.categoryId,
        detach: true,
        callBack: () => {
          toast.success("سند مورد نظر از نشان شده ها حذف شد.");
          handleClose();
        },
      });
    }
  };

  return (
    <ConfirmDialog
      dialogHeader={document?.isBookmarked ? "حذف نشان‌گذاری" : "نشان‌گذاری سند"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="document-bookmark-dialog"
      isPending={bookmarkDocument.isPending}
    >
      <Typography
        placeholder=""
        className="text-center"
        {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
      >
        {document?.isBookmarked
          ? "آیا از حذف نشان‌گذاری این سند اطمینان دارید؟"
          : "آیا از نشان‌گذاری این سند اطمینان دارید؟"}
      </Typography>
    </ConfirmDialog>
  );
};

export default DocumentBookmarkDialog;
