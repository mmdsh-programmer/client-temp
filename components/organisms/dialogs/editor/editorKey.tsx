import React from "react";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { keySchema } from "./validation.yup";
import forge from "node-forge";
import { toast } from "react-toastify";

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
  const { register, handleSubmit, formState, reset, clearErrors, setError } =
    form;
  const { errors } = formState;

  const decryptData = (key: string) => {
    if (!encryptedContent) {
      toast.error("مشکلی در دریافت محتوای رمزگذاری شده به وجود آمد.");
      return;
    }

    try {
      const privateKey = forge.pki.privateKeyFromPem(key);

      // Ensure content is in expected JSON shape; otherwise return raw content
      let encrypted: { key: string; iv: string; content: string } | null = null;
      try {
        const parsed = JSON.parse(encryptedContent);
        if (
          parsed &&
          typeof parsed === "object" &&
          "key" in parsed &&
          "iv" in parsed &&
          "content" in parsed
        ) {
          encrypted = parsed as { key: string; iv: string; content: string };
        }
      } catch {
        // not JSON → treat as plain content
      }

      if (!encrypted) {
        return encryptedContent;
      }

      // Decrypt the AES key using RSA private key
      const aesKey = privateKey.decrypt(forge.util.decode64(encrypted.key), "RSA-OAEP", {
        md: forge.md.sha256.create()
      });

      // Create decipher for AES decryption
      const decipher = forge.cipher.createDecipher("AES-CBC", aesKey);
      const iv = forge.util.decode64(encrypted.iv);
      decipher.start({iv});

      // Decrypt the content
      const encryptedBytes = forge.util.decode64(encrypted.content);
      decipher.update(forge.util.createBuffer(encryptedBytes));
      decipher.finish();

      return forge.util.decodeUtf8(decipher.output.getBytes());
    } catch (error) {
      console.error("Decryption error:", error);
      setError("privateKey", {
        message: "کلید خصوصی وارد شده اشتباه است",
      });
    }
  };

  const onSubmit = (data: IForm) => {
    const content = decryptData(data.privateKey);
    if (!content) {
      return setError("privateKey", {
        message: "کلید خصوصی وارد شده اشتباه است",
      });
    }

    onDecryption(content);
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
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">کلید خصوصی</Typography>
        <TextareaAtom
          className="mt-3"
          id="repo-private-key"
          placeholder="کلید خصوصی..."
          register={{ ...register("privateKey") }}
        />
        {errors.privateKey ? (
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text mt-2">
            {errors.privateKey?.message}
          </Typography>
        ) : null}
      </form>
    </ConfirmDialog>
  );
};

export default EditorKey;
