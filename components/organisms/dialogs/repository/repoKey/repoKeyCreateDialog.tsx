import React, { useState } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import useCreateRepoPublicKey from "@hooks/repository/useCreateRepoPublicKey";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoCreateKeySchema } from "../validation.yup";
import TextareaAtom from "@components/atoms/textarea/textarea";
import forge from "node-forge";
import copy from "copy-to-clipboard";
import { Button, Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";

interface IProps {
  repoId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  name: string;
  publicKey: string;
  privateKey?: string;
}

const RepoKeyCreateDialog = ({ setOpen, repoId }: IProps) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const createRepoKeyHook = useCreateRepoPublicKey();

  const form = useForm<IForm>({
    resolver: yupResolver(repoCreateKeySchema),
  });
  const { register, handleSubmit, formState, reset, clearErrors, setValue } =
    form;
  const { errors } = formState;
  console.log(errors)

  const handleClose = () => {
    reset();
    clearErrors();
    setOpen(false);
  };

  const stripPemHeaders = (pem: string) => {
    return pem.replace(
      /-{5}BEGIN [ A-Z]+-{5}|-{5}END [ A-Z]+-{5}|\r?\n|\r/g,
      ""
    );
  };
  const generateKey = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const { pki } = forge;
    const keypair = pki.rsa.generateKeyPair({
      bits: 2048,
      e: 0x1_00_01,
    });
    const publicKeyPem = stripPemHeaders(pki.publicKeyToPem(keypair.publicKey));
    const privateKeyPem = stripPemHeaders(
      pki.privateKeyToPem(keypair.privateKey)
    );
    setShowPrivateKey(true);
    setValue("publicKey", publicKeyPem);
    setValue("privateKey", privateKeyPem);
    copy(privateKeyPem);
    toast.success("کلید خصوصی با موفقیت کپی شد");
  };

  const clearKeys = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    reset({
      privateKey: "",
      publicKey: "",
    });
    setShowPrivateKey(false);
  };

  const onSubmit = (data: IForm) => {
    createRepoKeyHook.mutate({
      repoId,
      key: data.publicKey,
      name: data.name,
      callBack: () => {
        toast.success("کلید مورد نظر با موفقیت ساخته شد");
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={createRepoKeyHook.isPending}
      dialogHeader={"ساخت کلید"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="h-full xs:h-auto max-w-full w-full !rounded-lg xs:max-w-auto xs:w-auto xs:mb-4"
    >
      <form className="flex flex-col gap-2">
        <Typography className="label">نام کلید</Typography>
        <FormInput
          id="repo-key-name"
          placeholder="نام کلید"
          register={{ ...register("name") }}
        />
        {errors.name ? (
          <Typography className="warning_text">
            {errors.name?.message}
          </Typography>
        ) : null}

        <Typography className="label mt-2">کلید عمومی</Typography>
        <TextareaAtom
          id="repo-public-key"
          placeholder="کلید عمومی..."
          register={{ ...register("publicKey") }}
        />
        {errors.publicKey ? (
          <Typography className="warning_text">
            {errors.publicKey?.message}
          </Typography>
        ) : null}

        {showPrivateKey ? (
          <>
            <Typography className="label mt-2">کلید خصوصی</Typography>
            <TextareaAtom
              id="repo-private-key"
              placeholder="کلید خصوصی..."
              readOnly
              register={{ ...register("privateKey") }}
            />
            <Typography className="text-xs mt-1">
              *کلید خصوصی را کپی کنید. کلید خصوصی ذخیره نخواهد شد*
            </Typography>
          </>
        ) : null}

        <div className="flex justify-end gap-2 mt-2">
          {showPrivateKey ? (
            <Button
              placeholder="button"
              className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal !p-2 !px-3"
              onClick={clearKeys}
            >
              حذف کلید ها
            </Button>
          ) : null}
          <Button
            placeholder="button"
            className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal !p-2 !px-3"
            onClick={generateKey}
          >
            تولید کلید
          </Button>
        </div>
      </form>
    </CreateDialog>
  );
};

export default RepoKeyCreateDialog;
