import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import TextareaAtom from "@/components/atoms/textarea";
import copy from "copy-to-clipboard";
import forge from "node-forge";
import { repoCreateKeySchema } from "../validation.yup";
import { toast } from "react-toastify";
import useCreateRepoPublicKey from "@hooks/repository/useCreateRepoPublicKey";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const form = useForm<IForm>({ resolver: yupResolver(repoCreateKeySchema), mode: "onChange" });
  const { register, handleSubmit, formState, reset, clearErrors, setValue } = form;
  const { errors, isValid } = formState;
  const handleClose = () => {
    reset();
    clearErrors();
    setOpen(false);
  };

  const generateKey = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const { rsa } = forge.pki;
    const keypair = rsa.generateKeyPair({
      bits: 2048,
      workers: -1,
    });

    setShowPrivateKey(true);
    const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);
    setValue("publicKey", publicKeyPem);
    setValue("privateKey", privateKeyPem);

    copy(privateKeyPem);
    toast.success("کلید خصوصی با موفقیت کپی شد");
  };

  const clearKeys = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
      dialogHeader="ساخت کلید"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-key-create-dialog xs:max-w-auto h-full w-full max-w-full !rounded-lg xs:mb-4 xs:h-auto xs:w-auto"
      disabled={!isValid}
    >
      <form className="repo-key-create-dialog__form flex flex-col gap-2">
        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label">
          نام کلید
        </Typography>
        <FormInput
          id="repo-key-name"
          placeholder="نام کلید"
          register={{ ...register("name") }}
          className="repo-key-create-dialog__input"
        />
        {errors.name ? (
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
            {errors.name?.message}
          </Typography>
        ) : null}

        <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label mt-2">
          کلید عمومی
        </Typography>
        <TextareaAtom
          id="repo-public-key"
          placeholder="کلید عمومی..."
          { ...register("publicKey") }
          className="repo-public-key__textarea"
        />
        {errors.publicKey ? (
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
            {errors.publicKey?.message}
          </Typography>
        ) : null}

        {showPrivateKey ? (
          <>
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="label mt-2">
              کلید خصوصی
            </Typography>
            <TextareaAtom
              id="repo-private-key"
              placeholder="کلید خصوصی..."
              readOnly
              { ...register("privateKey") }
              className="repo-private-key__textarea"
            />
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="mt-1 text-xs"
            >
              *کلید خصوصی را کپی کنید. کلید خصوصی ذخیره نخواهد شد*
            </Typography>
          </>
        ) : null}

        <div className="mt-2 flex justify-end gap-2">
          {showPrivateKey ? (
            <Button
              {...({} as React.ComponentProps<typeof Button>)}
              className="repo-private-key__delete-button bg-primary-normal !p-2 !px-3 hover:bg-primary-normal active:bg-primary-normal"
              onClick={clearKeys}
            >
              حذف کلید ها
            </Button>
          ) : null}
          <Button
            {...({} as React.ComponentProps<typeof Button>)}
            className="repo-key__generate-button bg-primary-normal !p-2 !px-3 hover:bg-primary-normal active:bg-primary-normal"
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
