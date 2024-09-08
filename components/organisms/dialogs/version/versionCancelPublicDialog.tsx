import React from "react";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { IVersion } from "@interface/version.interface";
import useCancelPublicVersion from "@hooks/version/useCancelPublicVersion";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  version: IVersion;
}

const VersionCancelPublicDialog = ({ version, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const cancelPublicVersion = useCancelPublicVersion();

  const form = useForm();

  const { register, handleSubmit, reset, clearErrors, formState } = form;
  const { errors } = formState;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    cancelPublicVersion.mutate({
      repoId: getRepo?.id,
      documentId: getDocument!.id,
      versionId: version.id,
      callBack: () => {
        toast.error(" .تایید نسخه لغو شد");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={cancelPublicVersion.isPending}
      dialogHeader={"لغو تایید نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      آیا از لغو تایید نسخه "
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {version?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default VersionCancelPublicDialog;
