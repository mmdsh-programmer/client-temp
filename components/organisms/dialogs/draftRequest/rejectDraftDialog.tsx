import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { selectedRequestAtom } from "@atom/releaseDocs";
import { useForm } from "react-hook-form";
import useRejectDraft from "@hooks/release/useRejectDraft";
import { toast } from "react-toastify";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const RejectDraftDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getRequest = useRecoilValue(selectedRequestAtom);

  const rejectRequest = useRejectDraft();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !getRequest) return;
    rejectRequest.mutate({
      repoId: getRepo.id,
      docId: getRequest?.documentId,
      draftId: getRequest.id,
      callBack: () => {
        toast.error("تایید پیش‌نویس رد شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={rejectRequest.isPending}
      dialogHeader="رد تایید پیش‌نویس"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از رد تایید پیش‌نویس "
        <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
          {getRequest?.versionNumber}
        </span>
        " اطمینان دارید؟
      </div>
    </ConfirmDialog>
  );
};

export default RejectDraftDialog;
