import { repoAtom } from "@atom/repository";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import { IVersion } from "@interface/version.interface";
import useDeleteVersion from "@hooks/version/useDeleteVersion";
import DeleteDialog from "@components/templates/dialog/deleteDialog";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  version: IVersion;
}

const VersionDeleteDialog = ({ version, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const deleteVerion = useDeleteVersion();

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
    deleteVerion.mutate({
      repoId: getRepo?.id,
      documentId: getDocument!.id,
      versionId: version.id,
      state: version.state,
      callBack: () => {
        toast.error(" نسخه حذف شد.");
        handleClose();
      },
    });
  };
  return (
    <DeleteDialog
      isPending={deleteVerion.isPending}
      dialogHeader={"حذف نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      {version?.versionNumber}
    </DeleteDialog>
  );
};

export default VersionDeleteDialog;
