"use client";

import React, { useEffect, useState } from "react";

import FormInput from "@components/atoms/input/formInput";
import LoadingButton from "@components/molecules/loadingButton";
import { Typography } from "@material-tailwind/react";
import { documentPasswordSchema } from "./validation.yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useSetPublishDocumentPassword from "@hooks/publish/useSetPublishDocumentPassword";
import { yupResolver } from "@hookform/resolvers/yup";

interface IProps {
  documentId: number;
  errorMessage?: string;
  documentPassword?: string;
}

interface IDataForm {
  password: string;
}

const PublishDocumentPassword = ({ documentId, documentPassword, errorMessage }: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<IDataForm>({
    resolver: yupResolver(documentPasswordSchema),
  });
  const { register, handleSubmit, formState, reset, setError, clearErrors } = form;
  const { errors } = formState;

  const saveDocumentPasswordHook = useSetPublishDocumentPassword();

  const onSubmit = (dataForm: IDataForm) => {
    setLoading(true);
    saveDocumentPasswordHook.mutate({
      documentId,
      password: dataForm.password,
      handleSuccess: () => {
        router.refresh();
      },
      handleError: () => {
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (errorMessage) {
      reset({ password: documentPassword });
      setError("password", { message: errorMessage });
    }
    return () => {
      setLoading(false);
    };
  }, [errorMessage]);

  return (
    <div className="scroller flex h-full w-full items-center justify-center overflow-y-auto">
      <form className="flex h-fit w-[400px] max-w-[400px] flex-col gap-5 px-5 xs:px-0">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            رمز عبور سند
          </Typography>
          <FormInput
            type="password"
            placeholder="رمز عبور"
            register={{
              ...register("password", {
                onChange: () => {
                  if (errorMessage) {
                    clearErrors("password");
                  }
                },
              }),
            }}
          />

          {errors.password ? (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.password?.message}
            </Typography>
          ) : null}
        </div>

        <LoadingButton
          className="!w-full bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={handleSubmit(onSubmit)}
          loading={loading}
        >
          <Typography
            {...({} as React.ComponentProps<typeof Typography>)}
            className="text__label__button text-white"
          >
            تایید
          </Typography>
        </LoadingButton>
      </form>
    </div>
  );
};

export default PublishDocumentPassword;
