import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { selectedRequestAtom } from "@atom/releaseDocs";
import { useForm } from "react-hook-form";
import useAcceptVersion from "@hooks/release/useAcceptVersion";
import { toast } from "react-toastify";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const RejectDraft = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getRequest = useRecoilValue(selectedRequestAtom);

  const acceptRequest = useAcceptVersion();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !getRequest) return;
    acceptRequest.mutate({
      repoId: getRepo.id,
      docId: getRequest.documentId,
      versionId: getRequest.id,
      callBack: () => {
        toast.success("نسخه با موفقیت عمومی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={acceptRequest.isPending}
      dialogHeader=" عمومی سازی نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      آیا از عمومی سازی نسخه "
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {getRequest?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default RejectDraft;
