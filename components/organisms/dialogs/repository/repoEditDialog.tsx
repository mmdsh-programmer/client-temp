import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useEditRepo from "@hooks/repository/useEditRepo";
import { IRepo } from "@interface/repo.interface";
import TextareaAtom from "@components/atoms/textarea/textarea";
import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";

interface IProps {
  repo: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IForm {
  name: string;
  description: string;
}

const RepoEditDialog = ({ repo, setOpen }: IProps) => {
  const { isPending, mutate } = useEditRepo();
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
    mutate({
      repoId: repo.id,
      name: dataForm.name,
      description: dataForm.description,
      callBack: () => {
        toast.success("مخزن با موفقیت به روز رسانی شد.");
        handleClose();
      },
    });
  };

  return (
    <EditDialog
      isPending={isPending}
      dialogHeader={"ویرایش مخزن"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="h-full max-w-full w-full"
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="label">عنوان مخزن</Typography>
          <FormInput
            placeholder="عنوان"
            register={{
              ...register("name", {
                value: repo.name,
              }),
            }}
          />
          {errors.name && (
            <Typography className="warning_text">
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="label">توضیحات مخزن</Typography>
          <TextareaAtom
            placeholder="توضیحات"
            register={{
              ...register("description", { value: repo.description }),
            }}
          />
          {errors.name && (
            <Typography className="warning_text">
              {errors.description?.message}
            </Typography>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default RepoEditDialog;
