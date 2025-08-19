import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useAddWhiteList from "@hooks/document/useAddWhiteList";
import { useRepositoryStore } from "@store/repository";
import useAddBlackList from "@hooks/document/useAddBlackList";
import { useDocumentStore } from "@store/document";
import { toast } from "react-toastify";

interface IProps {
  onClose: () => void;
  type: string;
}

const WhiteBlackAlertDialog = ({ type, onClose }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const document = useDocumentStore((state) => {
    return state.selectedDocument;
  });

  const whiteListHook = useAddWhiteList();
  const blackListHook = useAddBlackList();

  const listHook = type === "black-list" ? blackListHook : whiteListHook;

  const handleSubmit = async () => {
    listHook.mutate({
      repoId: getRepo!.id,
      documentId: document!.id,
      usernameList: [],
      callBack: () => {
        toast.success("لیست کاربران با موفقیت خالی شد");
        onClose();
      },
    });
  };
  return (
    <ConfirmDialog
      dialogHeader="اخطار"
      setOpen={onClose}
      isPending={listHook.isPending}
      onSubmit={handleSubmit}
      backToMain
      className="access-publishing-alert-dialog"
    >
      سند مورد نظر از قبل دارای کاربرانی از لیست {type === "black-list" ? "سیاه" : "سفید"} است.
      ابتدا باید این لیست خالی شود. آیا از انجام این کار مطمئن هستید؟
    </ConfirmDialog>
  );
};

export default WhiteBlackAlertDialog;
