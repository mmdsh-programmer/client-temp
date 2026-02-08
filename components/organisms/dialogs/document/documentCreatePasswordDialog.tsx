import React from "react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { documentSetPasswordSchema } from "./validation.yup";
import { toast } from "react-toastify";
import useCreateDocumentPassword from "@hooks/document/useCreateDocumentPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
  password: string;
  confirmPassword: string;
}

const DocumentCreatePasswordDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const getCategory = useCategoryStore((state) => {
    return state.category;
  });
  const document = useDocumentStore((state) => {
    return state.selectedDocument;
  });

  const createPassword = useCreateDocumentPassword();

  const form = useForm<IDataForm>({
    resolver: yupResolver(documentSetPasswordSchema),
    mode: "onChange"
  });
  const { register, handleSubmit, formState, reset, clearErrors, setError } = form;
  const { errors, isValid } = formState;

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
    createPassword.mutate({
      repoId: getRepo!.id,
      documentId: document!.id,
      categoryId: getCategory?.id || null,
      password: dataForm.password,
      successCallBack: () => {
        toast.success("رمز عبور با موفقیت برای سند مورد نظر اعمال شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmFullHeightDialog
      isPending={createPassword.isPending}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      dialogHeader="انتخاب رمز عبور سند"
      className="document-create-password-dialog"
      disabled={!isValid}
    >
      <form className="create-password-form flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            رمز عبور
          </Typography>
          <FormInput
            type="password"
            placeholder="رمز عبور"
            register={{
              ...register("password"),
            }}
            className="create-password-form__password"
          />
          {errors.password && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.password?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            تکرار رمز عبور
          </Typography>
          <FormInput
            type="password"
            placeholder="تکرار رمز عبور"
            register={{
              ...register("confirmPassword"),
            }}
            className="create-password-form__confirm-password"
          />
          {errors.confirmPassword && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.confirmPassword?.message}
            </Typography>
          )}
        </div>
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentCreatePasswordDialog;
