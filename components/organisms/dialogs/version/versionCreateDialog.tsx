import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import { toast } from "react-toastify";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { useForm } from "react-hook-form";
import { versionSchema } from "./validation.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useSearchParams } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import { EDocumentTypes } from "@interface/enums";
import useCreateFileVersion from "@hooks/version/useCreateFileVersion";
import useCreateFormVersion from "@hooks/formVersion/useCreateFormVersion";

interface IForm {
  name: string;
}

interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCreateDialog = ({ close }: IProps) => {
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const repoId = useRepoId();
  const createVersion = useCreateVersion();
  const createFileVersionHook = useCreateFileVersion();
  const createFormVersionHook = useCreateFormVersion();

  const form = useForm<IForm>({ resolver: yupResolver(versionSchema) });
  const { register, handleSubmit, reset, clearErrors, formState } = form;
  const { errors } = formState;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    close(false);
  };

  const onSubmit = async (dataForm: IForm) => {
    // eslint-disable-next-line no-useless-escape
    const forbiddenRegex = /^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/;
    if (forbiddenRegex.test(dataForm.name)) {
      toast.error("نام نسخه شامل کاراکتر غیرمجاز است.");
      return;
    }
    if (!repoId) return;
    if (getDocument?.contentType === EDocumentTypes.classic) {
      createVersion.mutate({
        repoId,
        documentId: getDocument!.id,
        versionNumber: dataForm.name,
        content:
          getDocument?.contentType === EDocumentTypes.classic
            ? "<article class='clasor-editor-content'></article>"
            : "",
        outline: "",
        isDirectAccess:
          sharedDocuments === "true" ||
          currentPath === "/admin/sharedDocuments" ||
          (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
            ? true
            : undefined,
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
    } else {
      createFormVersionHook.mutate({
        repoId,
        documentId: getDocument!.id,
        versionNumber: dataForm.name,
        formType: "GENERAL",
        formDisplay: "CLASSIC",
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
      isPending={
        createVersion.isPending ||
        createFileVersionHook.isPending ||
        createFormVersionHook.isPending
      }
      dialogHeader="ایجاد نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-create-dialog"
    >
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
    </CreateDialog>
  );
};

export default VersionCreateDialog;
