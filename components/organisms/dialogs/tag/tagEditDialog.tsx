import { usePathname, useSearchParams } from "next/navigation";

import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { selectedTagAtom } from "@atom/tag";
import { toast } from "react-toastify";
import useEditTag from "@hooks/tag/useEditTag";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";

interface IForm {
  name: string;
}
interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const TagEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const getTag = useRecoilValue(selectedTagAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);

  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const { data: userInfo } = useGetUser();
  const { isPending, mutate } = useEditTag();

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
    if (!repoId() || !getTag) return;
    mutate({
      repoId: repoId(),
      name: dataForm.name,
      tagId: getTag.id,
      isDirectAccess:
        currentPath === "/admin/sharedDocuments" || sharedDocuments === "true",
      callBack: () => {
        toast.success("تگ با موفقیت به روز رسانی شد.");
        handleClose();
      },
    });
  };
  return (
    <EditDialog
      isPending={isPending}
      dialogHeader="ویرایش تگ"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
      backToMain
    >
      <form className="flex flex-col gap-2">
        <Typography className="label">نام تگ</Typography>
        <FormInput
          placeholder="نام تگ"
          register={{
            ...register("name", {
              value: getTag?.name,
            }),
          }}
        />
        {errors.name && (
          <Typography className="warning_text">
            {errors.name?.message}
          </Typography>
        )}
      </form>
    </EditDialog>
  );
};

export default TagEditDialog;
