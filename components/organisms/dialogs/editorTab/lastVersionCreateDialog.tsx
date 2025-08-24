import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { useDocumentStore } from "@store/document";
import { toast } from "react-toastify";
import useCreateVersion from "@hooks/version/useCreateVersion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useSearchParams } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";
import { versionSchema } from "../version/validation.yup";

interface IForm {
  name: string;
}

interface IProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const LastVersionCreateDialog = ({ close }: IProps) => {
  const getDocument = useDocumentStore((s) => {
    return s.selectedDocument;
  });
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const repoId = useRepoId();
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
    createVersion.mutate({
      repoId,
      documentId: getDocument!.id,
      versionNumber: dataForm.name,
      content: "",
      outline: "",
      isDirectAccess:
        sharedDocuments === "true" ||
        currentPath === "/admin/sharedDocuments" ||
        (currentPath === "/admin/dashboard" && userInfo?.repository.id !== getDocument?.repoId)
          ? true
          : undefined,
      onSuccessHandler: () => {
        toast.success(" نسخه با موفقیت ایجاد شد.");
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }, 200);
      },
    });
  };

  return (
    <CreateDialog
      isPending={createVersion.isPending}
      dialogHeader="ایجاد نسخه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="version-create-dialog"
    >
      <form className="flex flex-col gap-8">
        <div>
          <Typography className="caption_c1 !warning_text">
            در حال حاضر این سند هیچ نسخه‌ای ندارد. آیا مایلید یک نسخه جدید ایجاد کنید؟
          </Typography>
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">نام نسخه</Typography>
          <FormInput placeholder="نام نسخه" register={{ ...register("name") }} />
          {errors.name && <Typography className="warning_text">{errors.name?.message}</Typography>}
        </div>
      </form>
    </CreateDialog>
  );
};

export default LastVersionCreateDialog;
