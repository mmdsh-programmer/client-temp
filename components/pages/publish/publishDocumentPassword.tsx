"use client";

import React, { useEffect } from "react";
import FormInput from "@components/atoms/input/formInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { documentPasswordSchema } from "./validation.yup";
import LoadingButton from "@components/molecules/loadingButton";
import useSetPublishDocumentPassword from "@hooks/publish/useSetPublishDocumentPassword";
import { useRouter } from "next/navigation";

interface IProps {
  documentId: number;
  errorMessage?: string;
  documentPassword?: string;
}

interface IDataForm {
  password: string;
}

const PublishDocumentPassword = ({
  documentId,
  documentPassword,
  errorMessage,
}: IProps) => {
  const router = useRouter();
  const form = useForm<IDataForm>({
    resolver: yupResolver(documentPasswordSchema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const saveDocumentPasswordHook = useSetPublishDocumentPassword();

  const onSubmit = (dataForm: IDataForm) => {
    saveDocumentPasswordHook.mutate({
      documentId,
      password: dataForm.password,
      callBack: () => {
        router.refresh();
      },
    });
  };

  useEffect(() => {
    if (errorMessage) {
      reset({ password: documentPassword });
    }
  }, []);

  return (
    <div className="scroller flex justify-center items-center w-full h-full overflow-y-auto">
      <form className="w-[400px] max-w-[400px] h-fit flex flex-col gap-5 px-5 xs:px-0">
        <div className="flex flex-col gap-2">
          <Typography className="form_label">رمز عبور سند</Typography>
          <FormInput
            type="password"
            placeholder="رمز عبور"
            register={{
              ...register("password"),
            }}
          />
          {errors.password && (
            <Typography className="warning_text">
              {errors.password?.message || errorMessage}
            </Typography>
          )}
        </div>

        <LoadingButton
          className="!w-full bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSubmit(onSubmit)}
          loading={saveDocumentPasswordHook.isPending}
        >
          <Typography className="text__label__button text-white">
            تایید
          </Typography>
        </LoadingButton>
      </form>
    </div>
  );
};

export default PublishDocumentPassword;
