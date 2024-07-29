import React from "react";
import { repoAtom } from "@atom/repository";
import FormInput from "@components/atoms/input/formInput";
import Label from "@components/atoms/typograghy/label";
import WarningText from "@components/atoms/typograghy/warningText";
import EditDialog from "@components/templates/dialog/editDialog";
import useCreateGroup from "@hooks/group/useCreateGroup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

interface IForm {
  title: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GroupCreateDialog = ({setOpen}: IProps) => {
  const getRepo = useRecoilValue(repoAtom);

  const { isPending, mutate } = useCreateGroup();
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
    mutate({
      repoId: getRepo.id,
      title: dataForm.title,
      callBack: () => {
        toast.success("گروه با موفقیت ایجاد شد.");
        handleClose();
      },
    });
  };
  return (
    <EditDialog
      isPending={isPending}
      dialogHeader={"ایجاد گروه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="xs:!min-w-[450px] xs:!max-w-[450px]"
    >
      <form className="flex flex-col gap-2">
        <Label> نام گروه </Label>
        <FormInput
          className="w-full"
          placeholder="نام گروه"
          register={{
            ...register("title"),
          }}
        />
        {errors.title && <WarningText>{errors.title?.message}</WarningText>}
      </form>
    </EditDialog>
  );
};

export default GroupCreateDialog;
