import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { documentResetPasswordSchema } from "./validation.yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useUpdateDocumentPassword from "@hooks/document/useUpdateDocumentPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { ERoles } from "@interface/enums";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
  oldPassword?: string;
  password: string;
  confirmPassword: string;
}

const DocumentUpdatePasswordDialog = ({ setOpen }: IProps) => {
  const { repo: getRepo } = useRepositoryStore();

  const { category: getCategory } = useCategoryStore();
  const { selectedDocument: document } = useDocumentStore();

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
      oldPassword: getRepo?.roleName !== ERoles.owner? dataForm.oldPassword : undefined,
      newPassword: dataForm.password,
      successCallBack: () => {
        toast.success("رمز عبور سند مورد نظر با موفقیت تعییر کرد.");
        handleClose();
      },
    });
  };
  return (
    <ConfirmFullHeightDialog
      isPending={updatePassword.isPending}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      dialogHeader="تغییر رمز عبور سند"
      className="document-update-password-dialog"
    >
      <form className="flex flex-col gap-5">
        {getRepo?.roleName !== ERoles.owner ? (
          <div className="flex flex-col gap-2">
            <Typography
              placeholder=""
              className="form_label"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              رمز عبور سابق
            </Typography>
            <FormInput
              type="password"
              placeholder="رمز عبور سابق"
              register={{ ...register("oldPassword") }}
              className="old-password"
            />
            {errors.oldPassword && (
              <Typography
                placeholder=""
                className="warning_text"
                {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                {errors.oldPassword?.message}
              </Typography>
            )}
          </div>
        ) : null}
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            رمز عبور
          </Typography>
          <FormInput
            type="password"
            placeholder="رمز عبور"
            register={{ ...register("password") }}
            className="new-password"
          />
          {errors.password && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.password?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            تکرار رمز عبور
          </Typography>
          <FormInput
            type="password"
            placeholder="تکرار رمز عبور"
            register={{ ...register("confirmPassword") }}
            className="confirm-password"
          />
          {errors.confirmPassword && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.confirmPassword?.message}
            </Typography>
          )}
        </div>
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentUpdatePasswordDialog;
