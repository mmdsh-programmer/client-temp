import React from "react";
import { repoAtom } from "@atom/repository";
import FormInput from "@components/atoms/input/formInput";
import CreateDialog from "@components/templates/dialog/createDialog";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { versionSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { toast } from "react-toastify";
import { selectedDocumentAtom } from "@atom/document";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom)

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
    <CreateDialog
      isPending={createVersion.isPending}
      dialogHeader={"ایجاد نسخه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
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
    </CreateDialog>
  );
};

export default VersionCreateDialog;
