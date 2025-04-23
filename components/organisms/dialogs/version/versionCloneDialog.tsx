import { Spinner, Typography } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";

import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import { selectedDocumentAtom } from "@atom/document";
import { selectedVersionAtom } from "@atom/version";
import { toast } from "react-toastify";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { useForm } from "react-hook-form";
import useGetVersion from "@hooks/version/useGetVersion";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";
import { versionSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCloneDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const getVersion = useRecoilValue(selectedVersionAtom);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: getVersionInfo, isLoading } = useGetVersion(
    repoId,
    getDocument!.id,
    getVersion?.id,
    getVersion?.state,
    true,
    true,
    sharedDocuments === "true" || currentPath === "/admin/sharedDocuments",
    true
  );
  const createVersion = useCreateVersion();

  const form = useForm<IForm>({ resolver: yupResolver(versionSchema) });

  const { register, handleSubmit, reset, clearErrors, formState } = form;
  const { errors } = formState;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!repoId) return;
    createVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionNumber: dataForm.name,
      content: getVersionInfo?.content || "",
      outline: getVersionInfo?.outline || "",
      isDirectAccess:
        currentPath === "/admin/sharedDocuments" ? true : undefined,
      onSuccessHandler: () => {
        toast.success(" نسخه با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };
  return (
    <CreateDialog
      isPending={createVersion.isPending}
      dialogHeader="ایجاد نسخه جدید از این نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-clone-dialog"
    >
      {isLoading ? (
        <Spinner className="h-4 w-4" color="purple" />
      ) : (
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography className="form_label">نام نسخه</Typography>
            <FormInput
              placeholder="نام نسخه"
              register={{ ...register("name") }}
            />
            {errors.name && (
              <Typography className="warning_text">
                {errors.name?.message}
              </Typography>
            )}
          </div>
        </form>
      )}
    </CreateDialog>
  );
};

export default VersionCloneDialog;
