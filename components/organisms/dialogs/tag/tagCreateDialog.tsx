import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreateTag from "@hooks/tag/useCreateTag";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagCreateDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
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

  const onSubmit = async (dataForm: IForm) => {
    if (!getRepo) return;
    createTag.mutate({
      repoId: getRepo?.id,
      name: dataForm.name,
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
        <FormInput placeholder="نام تگ" register={{ ...register("name") }} />
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
