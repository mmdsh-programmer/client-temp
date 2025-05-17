import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { repoAtom } from "@atom/repository";
import { selectedRequestAtom } from "@atom/releaseDocs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useRejectVersion from "@hooks/release/useRejectVersion";
import { selectedVersionAtom } from "@atom/version";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const RejectVarionDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getRequest = useRecoilValue(selectedRequestAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);

  const rejectRequest = useRejectVersion();

  const { handleSubmit, clearErrors, reset } = useForm();

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo || !getRequest || !getVersion) return;
    rejectRequest.mutate({
      repoId: getRepo.id,
      versionId: getRequest ? getRequest.id : getVersion.id,
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
