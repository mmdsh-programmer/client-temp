import React from "react";
import { repoAtom } from "@atom/repository";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { versionSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";
import EditDialog from "@components/templates/dialog/editDialog";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const createVersion = useCreateVersion();

  const form = useForm<IForm>({
    resolver: yupResolver(versionSchema),
  });

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

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    createVersion.mutate({
      repoId: getRepo?.id,
      documentId: getDocument!.id,
      versionNumber: dataForm.name,
      content: "",
      outline: "",
      callBack: () => {
        toast.success(" نسخه با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };
  return (
    <EditDialog
      isPending={createVersion.isPending}
      dialogHeader={"ویرایش نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="min-h-[90%] !min-w-[90%]"
    >
      <Typography variant="h1">ویرایش نسخه</Typography>
    </EditDialog>
  );
};

export default VersionEditDialog;
