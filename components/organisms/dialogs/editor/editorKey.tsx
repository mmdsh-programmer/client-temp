import React from "react";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { keySchema } from "./validation.yup";
import forge from "node-forge";

interface IForm {
  privateKey: string;
}

interface IProps {
  encryptedContent?: string;
  isPending: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDecryption: (decryptedContent: string) => void;
}

const EditorKey = ({
  setOpen,
  isPending,
  onDecryption,
  encryptedContent,
}: IProps) => {
  const form = useForm<IForm>({
    resolver: yupResolver(keySchema),
  });
  const { register, handleSubmit, formState, reset, clearErrors } = form;
  const { errors } = formState;

  const decryptData = (key: string) => {
    if (!encryptedContent) return;

    const privateKey = forge.pki.privateKeyFromPem(key);

    return forge.util.decodeUtf8(
      privateKey.decrypt(forge.util.decode64(encryptedContent), "RSA-OAEP", {
        md: forge.md.sha256.create(),
      })
    );
  };

  const onSubmit = (data: IForm) => {
    const content = decryptData(data.privateKey);
    onDecryption(content || encryptedContent || "");

    reset({ privateKey: "" });
    clearErrors();
  };

  return (
    <ConfirmDialog
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      dialogHeader="کلید خصوصی سند"
      setOpen={setOpen}
    >
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Typography className="label">کلید خصوصی</Typography>
        <TextareaAtom
          className="mt-3"
          id="repo-private-key"
          placeholder="کلید خصوصی..."
          register={{ ...register("privateKey") }}
        />
        {errors.privateKey ? (
          <Typography className="warning_text mt-2">
            {errors.privateKey?.message}
          </Typography>
        ) : null}
      </form>
    </ConfirmDialog>
  );
};

export default EditorKey;
