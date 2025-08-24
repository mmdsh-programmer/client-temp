import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { useRepositoryStore } from "@store/repository";
import { useReleaseDocsStore } from "@store/releaseDocs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useRejectVersion from "@hooks/release/useRejectVersion";
import { useVersionStore } from "@store/version";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const RejectVarionDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((s) => {
    return s.repo;
  });
  const getRequest = useReleaseDocsStore((s) => {
    return s.selectedRequest;
  });
  const getVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });

  const rejectRequest = useRejectVersion();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    rejectRequest.mutate({
      repoId: getRepo.id,
      versionId: getRequest ? getRequest.id : getVersion!.id,
      callBack: () => {
        toast.error("عمومی سازی نسخه رد شد");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={rejectRequest.isPending}
      dialogHeader="رد عمومی سازی نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-reject-public-version-dialog"
    >
      <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
        آیا از رد عمومی سازی نسخه "
        <span className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal">
          {getRequest ? getRequest?.versionNumber : getVersion?.versionNumber}
        </span>
        " اطمینان دارید؟
      </div>
    </ConfirmDialog>
  );
};

export default RejectVarionDialog;
