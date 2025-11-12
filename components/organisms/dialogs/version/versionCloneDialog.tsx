"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import { usePathname, useSearchParams } from "next/navigation";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { useDocumentStore } from "@store/document";
import { useVersionStore } from "@store/version";
import { toast } from "react-toastify";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { useForm } from "react-hook-form";
import useGetVersion from "@hooks/version/useGetVersion";
import useRepoId from "@hooks/custom/useRepoId";
import { versionSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useGetUser from "@hooks/auth/useGetUser";
import { Spinner } from "@components/atoms/spinner";
import { getMe } from "@actions/auth";
import { EDocumentTypes } from "@interface/enums";
import useCreateFileVersion from "@hooks/version/useCreateFileVersion";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCloneDialog = ({ setOpen }: IProps) => {
  const repoId = useRepoId();
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const getVersion = useVersionStore((s) => {
    return s.selectedVersion;
  });
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const { data: getVersionInfo, isLoading } = useGetVersion(
    repoId!,
    getDocument!.id,
    getVersion?.id,
    getVersion?.state,
    false,
    false,
    sharedDocuments === "true" ||
      currentPath === "/admin/sharedDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId),
    true,
  );
  const createVersion = useCreateVersion();
  const createFileVersionHook = useCreateFileVersion();

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
    const info = await getMe();
    if (getDocument?.contentType === EDocumentTypes.classic) {
      createVersion.mutate({
        accessToken: info.access_token,
        repoId,
        documentId: getDocument!.id,
        versionNumber: dataForm.name,
        content: getVersionInfo?.content || "",
        outline: getVersionInfo?.outline || "",
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
            ? true
            : undefined,
        username: userInfo?.username,
        onSuccessHandler: () => {
          toast.success(" نسخه با موفقیت ایجاد شد.");
          handleClose();
        },
      });
    } else if (getDocument?.contentType === EDocumentTypes.file) {
      createFileVersionHook.mutate({
        repoId,
        documentId: getDocument!.id,
        versionNumber: dataForm.name,
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
            ? true
            : undefined,
        callBack: () => {
          handleClose();
          toast.success("نسخه مورد نظر با موفقیت ایجاد گردید.");
        },
      });
    }
  };

  return (
    <CreateDialog
      isPending={createVersion.isPending || createFileVersionHook.isPending}
      dialogHeader="ایجاد نسخه جدید از این نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-clone-dialog"
    >
      {isLoading ? (
        <Spinner className="mx-auto h-8 w-8 text-primary" />
      ) : (
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
              نام نسخه
            </Typography>
            <FormInput placeholder="نام نسخه" register={{ ...register("name") }} />
            {errors.name && (
              <Typography
                {...({} as React.ComponentProps<typeof Typography>)}
                className="warning_text"
              >
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
