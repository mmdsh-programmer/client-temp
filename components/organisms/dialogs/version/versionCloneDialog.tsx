import React from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { useForm } from "react-hook-form";
import useGetVersion from "@hooks/version/useGetVersion";
import { useRecoilValue } from "recoil";
import { versionSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectedVersionAtom } from "@atom/version";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCloneDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);


  const { data: getVersionInfo, isLoading } = useGetVersion(
    getRepo!.id,
    getDocument!.id,
    getVersion?.id,
    getVersion?.state,
    true,
    true,
    true
  );
  const createVersion = useCreateVersion();

  const form = useForm<IForm>({ resolver: yupResolver(versionSchema) });

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
      content: getVersionInfo?.content || "",
      outline: getVersionInfo?.outline || "",
      callBack: () => {
        toast.success(" نسخه با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };
  return (
    <CreateDialog
      isPending={createVersion.isPending}
      dialogHeader="ایجاد نسخه جدید از این نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      {isLoading ? (
        <Spinner className="h-4 w-4" color="deep-purple" />
      ) : (
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography className="form_label">نام نسخه</Typography>
            <FormInput
              placeholder="نام نسخه"
              register={{ ...register("name") }}
            />
            {errors.name && (
              <Typography className="warning_text">
                {errors.name?.message}
              </Typography>
            )}
          </div>
        </form>
      )}
    </CreateDialog>
  );
};

export default VersionCloneDialog;
