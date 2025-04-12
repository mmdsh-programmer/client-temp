import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedRequestAtom } from "@atom/releaseDocs";
import { useForm } from "react-hook-form";
import useAcceptDraft from "@hooks/release/useAcceptDraft";
import { toast } from "react-toastify";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AcceptDraftDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getRequest = useRecoilValue(selectedRequestAtom);

  const acceptDraft = useAcceptDraft();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !getRequest) return;
    acceptDraft.mutate({
      repoId: getRepo.id,
      docId: getRequest?.documentId,
      draftId: getRequest.id,
      callBack: () => {
        toast.success("پیش‌نویس با موفقیت تایید شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={acceptDraft.isPending}
      dialogHeader="تایید نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-accept-draft-dialog"
      backToMain
    >
      آیا از تایید نسخه "
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {getRequest?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default AcceptDraftDialog;
