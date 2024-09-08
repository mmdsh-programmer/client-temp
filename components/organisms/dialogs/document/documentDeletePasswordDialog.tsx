import React from "react";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import { category } from "@atom/category";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { documentDeletePasswordSchema } from "./validation.yup";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { toast } from "react-toastify";
import useDeleteDocumentPassword from "@hooks/document/useDeleteDocumentPassword";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
  oldPassword: string;
}

const DocumentDeletePasswordDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  const getCategory = useRecoilValue(category);
  const document = useRecoilValue(selectedDocumentAtom);

  const deletePassword = useDeleteDocumentPassword();

  const form = useForm<IDataForm>({
    resolver: yupResolver(documentDeletePasswordSchema),
  });
  const { register, handleSubmit, formState, reset, clearErrors, setError } =
    form;
  const { errors } = formState;

  const handleClose = () => {
    reset();
    clearErrors();
    setOpen(false);
  };

  const onSubmit = (dataForm: IDataForm) => {
    deletePassword.mutate({
      repoId: getRepo!.id,
      categoryId: getCategory?.id || null,
      documentId: document!.id,
      password: dataForm.oldPassword,
      successCallBack: () => {
        toast.success("رمز عبور سند مورد نظر با موفقیت حذف شد");
        handleClose();
      },
    });
  };
  return (
    <>
      <ConfirmFullHeightDialog
        isPending={deletePassword.isPending}
        onSubmit={handleSubmit(onSubmit)}
        setOpen={handleClose}
        dialogHeader="حذف رمز عبور سند"
      >
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Typography className="form_label">رمز عبور سابق</Typography>
            <FormInput
              type="password"
              placeholder="رمز عبور سابق"
              register={{
                ...register("oldPassword"),
              }}
            />
            {errors.oldPassword && (
              <Typography className="warning_text">
                {errors.oldPassword?.message}
              </Typography>
            )}
          </div>
        </form>
      </ConfirmFullHeightDialog>
    </>
  );
};

export default DocumentDeletePasswordDialog;
