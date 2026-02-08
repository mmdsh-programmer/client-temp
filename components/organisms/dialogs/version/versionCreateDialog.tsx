import React, { useState } from "react";
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
import SelectAtom, { IOption } from "@components/molecules/select";

interface IForm {
  versionNumber: string;
}

interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const VersionCreateDialog = ({ close }: IProps) => {
  const [type, setType] = useState<IOption>({
    label: "فرم معمولی",
    value: "GENERAL",
  });

  const [display, setDisplay] = useState<IOption>({
    label: "فرم کلاسیک",
    value: "CLASSIC",
  });

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

  const form = useForm<IForm>({ resolver: yupResolver(versionSchema), mode: "onChange" });
  const { register, handleSubmit, reset, clearErrors, formState } = form;
  const { errors, isValid } = formState;

  const typeOptions = [
    { label: "فرم معمولی", value: "GENERAL" },
    { label: "فرم آزمون", value: "EXAM" },
  ];

  const displayOptions = [
    { label: "فرم کلاسیک", value: "CLASSIC" },
    { label: "فرم کارتی", value: "CARD" },
  ];

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    close(false);
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!repoId) return;
    if (getDocument?.contentType === EDocumentTypes.classic) {
      createVersion.mutate({
        repoId,
        documentId: getDocument!.id,
        versionNumber: dataForm.versionNumber,
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
        versionNumber: dataForm.versionNumber,
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
        versionNumber: dataForm.versionNumber,
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
      disabled={!isValid}
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            نام نسخه
          </Typography>
          <FormInput placeholder="نام نسخه" register={{ ...register("versionNumber") }} />
          {errors.versionNumber && (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.versionNumber?.message}
            </Typography>
          )}
        </div>
        {getDocument?.contentType === EDocumentTypes.form ? (
          <>
            <div className="flex flex-col gap-2">
              <Typography
                placeholder=""
                className="form_label"
                {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                نوع فرم
              </Typography>
              <SelectAtom
                className="document-type__select flex h-[46px] w-full items-center justify-between rounded-lg border-[1px] border-normal !bg-gray-50 pl-2 pr-3"
                defaultOption={typeOptions[0]}
                options={typeOptions}
                selectedOption={type}
                setSelectedOption={setType}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography
                placeholder=""
                className="form_label"
                {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                نمایش فرم
              </Typography>
              <SelectAtom
                className="document-type__select flex h-[46px] w-full items-center justify-between rounded-lg border-[1px] border-normal !bg-gray-50 pl-2 pr-3"
                defaultOption={displayOptions[0]}
                options={displayOptions}
                selectedOption={display}
                setSelectedOption={setDisplay}
              />
            </div>
          </>
        ) : null}
      </form>
    </CreateDialog>
  );
};

export default VersionCreateDialog;
