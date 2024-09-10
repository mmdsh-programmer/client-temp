import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { categoryAtom } from "@atom/category";
import { documentSetPasswordSchema } from "./validation.yup";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { toast } from "react-toastify";
import useCreateDocumentPassword from "@hooks/document/useCreateDocumentPassword";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
  password: string;
  confirmPassword: string;
}

const DocumentCreatePasswordDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const createPassword = useCreateDocumentPassword();

  const form = useForm<IDataForm>({
    resolver: yupResolver(documentSetPasswordSchema),
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
    <>
      <ConfirmFullHeightDialog
        isPending={createPassword.isPending}
        onSubmit={handleSubmit(onSubmit)}
        setOpen={handleClose}
        dialogHeader="انتخاب رمز عبور سند"
      >
        <form className="flex flex-col gap-5">
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

export default DocumentCreatePasswordDialog;
