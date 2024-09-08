import React from "react";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { IVersion } from "@interface/version.interface";
import useSetLastVersion from "@hooks/version/useSetLastVersion";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  version: IVersion;
}

const LastVersionDialog = ({ version, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const setLastVersion = useSetLastVersion();

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
    setLastVersion.mutate({
      repoId: getRepo?.id,
      documentId: getDocument!.id,
      versionId: version.id,
      callBack: () => {
        toast.success("به عنوان آخرین نسخه انتخاب شد.");
        handleClose();
      },
    });
  };
  return (
    <ConfirmDialog
      isPending={setLastVersion.isPending}
      dialogHeader={"انتخاب به عنوان آخرین نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <p>آیا از انتخاب این نسخه به عنوان آخرین نسخه سند اطمینان دارید؟</p>
    </ConfirmDialog>
  );
};

export default LastVersionDialog;
