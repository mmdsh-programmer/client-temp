import React from "react";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { useRecoilValue } from "recoil";
import useAddWhiteList from "@hooks/document/useAddWhiteList";
import { repoAtom } from "@atom/repository";
import useAddBlackList from "@hooks/document/useAddBlackList";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";

interface IProps {
  onClose: () => void;
  type: string;
}

const WhiteBlackAlertDialog = ({ type, onClose }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const document = useRecoilValue(selectedDocumentAtom);

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
    >
      سند مورد نظر از قبل دارای کاربرانی از لیست{" "}
      {type === "black-list" ? "سیاه" : "سفید"} است. ابتدا باید این لیست خالی
      شود. آیا از انجام این کار مطمئن هستید؟
    </ConfirmDialog>
  );
};

export default WhiteBlackAlertDialog;
