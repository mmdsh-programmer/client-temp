import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { categoryAtom } from "@atom/category";
import { documentResetPasswordSchema } from "./validation.yup";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useUpdateDocumentPassword from "@hooks/document/useUpdateDocumentPassword";
import { yupResolver } from "@hookform/resolvers/yup";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const DocumentUpdatePasswordDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  const getCategory = useRecoilValue(categoryAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const updatePassword = useUpdateDocumentPassword();

  const form = useForm<IDataForm>({
    resolver: yupResolver(documentResetPasswordSchema),
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
    if (dataForm.password !== dataForm.confirmPassword) {
      setError("confirmPassword", {
        message: "تکرار رمز عبور با رمز عبور یکسان نیست",
      });

      return;
    }

    updatePassword.mutate({
      repoId: getRepo!.id,
      documentId: document!.id,
      categoryId: getCategory?.id || null,
      oldPassword: dataForm.oldPassword,
      newPassword: dataForm.password,
      successCallBack: () => {
        toast.success("رمز عبور سند مورد نظر با موفقیت تعییر کرد.");
        handleClose();
      },
    });
  };
  return (
    <>
      <ConfirmFullHeightDialog
        isPending={updatePassword.isPending}
        onSubmit={handleSubmit(onSubmit)}
        setOpen={handleClose}
        dialogHeader="تغییر رمز عبور سند"
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
          <div className="flex flex-col gap-2">
            <Typography className="form_label">رمز عبور</Typography>
            <FormInput
              type="password"
              placeholder="رمز عبور"
              register={{
                ...register("password"),
              }}
            />
            {errors.password && (
              <Typography className="warning_text">
                {errors.password?.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="form_label">تکرار رمز عبور</Typography>
            <FormInput
              type="password"
              placeholder="تکرار رمز عبور"
              register={{
                ...register("confirmPassword"),
              }}
            />
            {errors.confirmPassword && (
              <Typography className="warning_text">
                {errors.confirmPassword?.message}
              </Typography>
            )}
          </div>
        </form>
      </ConfirmFullHeightDialog>
    </>
  );
};

export default DocumentUpdatePasswordDialog;
