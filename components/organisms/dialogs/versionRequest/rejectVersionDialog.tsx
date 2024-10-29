import React from "react";
import { repoAtom } from "@atom/repository";
import { useRecoilValue } from "recoil";
import { selectedRequestAtom } from "@atom/releaseDocs";
import { useForm } from "react-hook-form";
import useRejectVersion from "@hooks/release/useRejectVersion";
import { toast } from "react-toastify";
import DeleteDialog from "@components/templates/dialog/deleteDialog";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const RejectVarionDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getRequest = useRecoilValue(selectedRequestAtom);

  const rejectRequest = useRejectVersion();

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
        toast.error("عمومی سازی نسخه رد شد");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={rejectRequest.isPending}
      dialogHeader="رد عمومی سازی نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
        آیا از رد عمومی سازی نسخه "
        <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
          {getRequest?.versionNumber}
        </span>
        " اطمینان دارید؟
      </div>
    </DeleteDialog>
  );
};

export default RejectVarionDialog;
