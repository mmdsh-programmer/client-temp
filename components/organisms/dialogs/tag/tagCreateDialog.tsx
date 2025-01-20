import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreateTag from "@hooks/tag/useCreateTag";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { usePathname, useSearchParams } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";
import { selectedDocumentAtom } from "@atom/document";

interface IForm {
  name: string;
}

interface IProps {
  name?: string | number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagCreateDialog = ({ name, setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const createTag = useCreateTag();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>();

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const repoId = () => {
    if (currentPath === "/admin/myDocuments") {
      return userInfo!.repository.id;
    }
    if (
      (currentPath === "/admin/sharedDocuments" ||
        sharedDocuments === "true") &&
      getDocument
    ) {
      return getDocument!.repoId;
    }
    return getRepo!.id;
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!repoId()) return;
    createTag.mutate({
      repoId: repoId(),
      name: dataForm.name,
      isDirectAccess:
        currentPath === "/admin/sharedDocuments" || sharedDocuments === "true",
      callBack: () => {
        toast.success("تگ با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={createTag.isPending}
      dialogHeader="ساخت تگ"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="h-full xs:h-auto max-w-full w-full !rounded-lg xs:max-w-auto xs:w-auto xs:mb-4 "
    >
      <form className="flex flex-col gap-2 ">
        <Typography className="label">نام تگ</Typography>
        <FormInput
          placeholder="نام تگ"
          register={{ ...register("name", { value: name?.toString() }) }}
        />
        {errors.name && (
          <Typography className="warning_text">
            {errors.name?.message}
          </Typography>
        )}
      </form>
    </CreateDialog>
  );
};

export default TagCreateDialog;
