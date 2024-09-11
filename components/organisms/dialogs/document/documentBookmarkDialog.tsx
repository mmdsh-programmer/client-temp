import React from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { repoAtom } from "@atom/repository";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { useForm } from "react-hook-form";
import { selectedDocumentAtom } from "@atom/document";
import { Typography } from "@material-tailwind/react";
import useBookmarkDocument from "@hooks/document/useBookmarkDocument";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const DocumentBookmarkDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const bookmarkDocument = useBookmarkDocument();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !document) return;
    if (!document.isBookmarked) {
      bookmarkDocument.mutate({
        repoId: getRepo.id,
        documentId: document.id,
        categoryId: document.categoryId,
        callBack: () => {
          toast.success("سند مورد نظر به نشان شده ها اضافه شد.");
          handleClose();
        },
      });
    } else {
      bookmarkDocument.mutate({
        repoId: getRepo.id,
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
      isPending={bookmarkDocument.isPending}
      dialogHeader={
        document?.isBookmarked ? "حذف نشان سند" : "نشان‌دار کردن سند"
      }
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      آیا از{" "}
      {document?.isBookmarked ? " حذف نشان سند  " : " نشان‌دار کردن سند "}"
      <Typography
        title={document?.name}
        placeholder="name"
        className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]"
      >
        {document?.name}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default DocumentBookmarkDialog;
