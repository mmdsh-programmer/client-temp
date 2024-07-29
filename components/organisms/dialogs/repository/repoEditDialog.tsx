import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useEditRepo from "@hooks/repository/useEditRepo";
import { IRepo } from "@interface/repo.interface";
import Label from "@components/atoms/typograghy/label";
import WarningText from "@components/atoms/typograghy/warningText";
import TextareaAtom from "@components/atoms/textarea/textarea";
import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";

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
          <Label>عنوان مخزن</Label>
          <FormInput
            className="w-full"
            placeholder="عنوان"
            register={{
              ...register("name", {
                value: repo.name,
              }),
            }}
          />
          {errors.name && <WarningText>{errors.name?.message}</WarningText>}
        </div>
        <div className="flex flex-col gap-2">
          <Label>توضیحات مخزن</Label>
          <TextareaAtom
            className="w-full"
            placeholder="توضیحات"
            register={{
              ...register("description", { value: repo.description }),
            }}
          />
          {errors.name && (
            <WarningText>{errors.description?.message}</WarningText>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default RepoEditDialog;
