import { repoAtom } from "@atom/repository";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import useConfirmVersion from "@hooks/version/useConfirmVersion";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { IVersion } from "@interface/version.interface";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  version: IVersion;
}

const VersionConfirmDialog = ({ version, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const confirmVersion = useConfirmVersion();

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
    confirmVersion.mutate({
      repoId: getRepo?.id,
      documentId: getDocument!.id,
      versionId: version.id,
      callBack: () => {
        toast.success(" نسخه با موفقیت تایید شد.");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={confirmVersion.isPending}
      dialogHeader={"تایید نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      آیا از تایید نسخه "
      <span className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]">
        {version?.versionNumber}
      </span>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default VersionConfirmDialog;
