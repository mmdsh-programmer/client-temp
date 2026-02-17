"use client";

import React, { useState } from "react";
import LoadingButton from "@components/molecules/loadingButton";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import forge from "node-forge";
import { toast } from "react-toastify";
import TextareaAtom from "@/components/atoms/textarea";

const documentKeySchema = yup.object({
  privateKey: yup.string().required("وارد کردن کلید خصوصی الزامی است"),
});

interface IProps {
  encryptedContent: string;
  onDecrypted: (content: string) => void;
}

interface IDataForm {
  privateKey: string;
}

const PublishDocumentKey = ({ encryptedContent, onDecrypted }: IProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<IDataForm>({
    resolver: yupResolver(documentKeySchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState, reset, clearErrors, setError } = form;
  const { errors, isValid } = formState;

  const handleDecrypt = (privateKeyPem: string) => {
    try {
      const encryptedData = JSON.parse(encryptedContent);

      if (!encryptedData.key || !encryptedData.iv || !encryptedData.content) {
        toast.error("مشکلی در دریافت محتوای رمزگذاری شده به وجود آمد.");
        return;
      }

      const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

      const encryptedAesKey = forge.util.decode64(encryptedData.key);
      const aesKey = privateKey.decrypt(encryptedAesKey, "RSA-OAEP", {
        md: forge.md.sha256.create(),
      });

      const cipher = forge.cipher.createDecipher("AES-CBC", aesKey);
      const iv = forge.util.decode64(encryptedData.iv);

      cipher.start({ iv });
      cipher.update(forge.util.createBuffer(forge.util.decode64(encryptedData.content)));

      cipher.finish();

      const finalContent = forge.util.decodeUtf8(cipher.output.getBytes());
      return finalContent;
    } catch (error) {
      console.error("Decryption Logic Error:", error);
      setError("privateKey", {
        message: "کلید خصوصی وارد شده اشتباه است",
      });
    }
  };

  const onSubmit = (dataForm: IDataForm) => {
    const content = handleDecrypt(dataForm.privateKey);
    if (!content) {
      return setError("privateKey", {
        message: "کلید خصوصی وارد شده اشتباه است",
      });
    }

    onDecrypted(content);
    reset({ privateKey: "" });
    clearErrors();
  };

  return (
    <div className="scroller flex h-full w-full items-center justify-center overflow-y-auto">
      <form
        className="mt-10 flex h-full w-[400px] max-w-[400px] flex-col items-center gap-5 px-5 xs:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            کلید خصوصی سند
          </Typography>
          <TextareaAtom
            {...register("privateKey")}
            placeholder="-----BEGIN RSA PRIVATE KEY-----"
            className="!w-full"
            dir="ltr"
          />
          {errors.privateKey ? (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text mt-2"
            >
              {errors.privateKey?.message}
            </Typography>
          ) : (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="mt-2 text-xs text-gray-500"
            >
              این سند با کلید عمومی رمزنگاری شده است. برای مشاهده، کلید خصوصی خود را وارد کنید.
            </Typography>
          )}
        </div>

        <LoadingButton
          className="!w-full bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
          onClick={handleSubmit(onSubmit)}
          loading={loading}
          disabled={!isValid}
        >
          <Typography
            {...({} as React.ComponentProps<typeof Typography>)}
            className="text__label__button text-white"
          >
            تایید و رمزگشایی
          </Typography>
        </LoadingButton>
      </form>
    </div>
  );
};

export default PublishDocumentKey;
