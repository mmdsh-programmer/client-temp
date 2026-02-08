import React from "react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { documentDeletePasswordSchema } from "./validation.yup";
import { toast } from "react-toastify";
import useDeleteDocumentPassword from "@hooks/document/useDeleteDocumentPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRepositoryStore } from "@store/repository";
import { useCategoryStore } from "@store/category";
import { useDocumentStore } from "@store/document";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
  oldPassword: string;
}

const DocumentDeletePasswordDialog = ({ setOpen }: IProps) => {
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const getCategory = useCategoryStore((state) => {
    return state.category;
  });
  const document = useDocumentStore((state) => {
    return state.selectedDocument;
  });

  const deletePassword = useDeleteDocumentPassword();

  const form = useForm<IDataForm>({
    resolver: yupResolver(documentDeletePasswordSchema),
    mode: "onChange"
  });
  const { register, handleSubmit, formState, reset, clearErrors } = form;
  const { errors, isValid } = formState;

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
    <ConfirmFullHeightDialog
      isPending={deletePassword.isPending}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      dialogHeader="حذف رمز عبور سند"
      className="document-delete-password-dialog"
      disabled={!isValid}
    >
      <form className="delete-password-form flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            رمز عبور سابق
          </Typography>
          <FormInput
            type="password"
            placeholder="رمز عبور سابق"
            register={{
              ...register("oldPassword"),
            }}
            className="delete-password-form__old-password"
          />
          {errors.oldPassword && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.oldPassword?.message}
            </Typography>
          )}
        </div>
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentDeletePasswordDialog;
