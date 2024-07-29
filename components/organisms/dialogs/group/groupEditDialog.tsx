import React from "react";
import { IGetGroups } from "@interface/group.interface";
import { useRecoilValue } from "recoil";
import EditDialog from "@components/templates/dialog/editDialog";
import { repoAtom } from "@atom/repository";
import useEditGroup from "@hooks/group/useEditGroup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Label from "@components/atoms/typograghy/label";
import WarningText from "@components/atoms/typograghy/warningText";
import FormInput from "@components/atoms/input/formInput";
import { selectedGroupAtom } from "@atom/group";

interface IForm {
  title: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const GroupEditDialog = ({ setOpen }: IProps) => {
  const getRepo = useRecoilValue(repoAtom);
  const group = useRecoilValue(selectedGroupAtom);
  const { isPending, mutate } = useEditGroup();
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
      // description
      // members:
      callBack: () => {
        toast.success("گروه با موفقیت ویرایش شد.");
        handleClose();
      },
    });
  };
  return (
    <EditDialog
      isPending={isPending}
      dialogHeader={"ویرایش گروه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="xs:!min-w-[450px] xs:!max-w-[450px]"
    >
      <form className="flex flex-col gap-2">
        <Label>نام گروه</Label>
        <FormInput
          className="w-full"
          placeholder="نام گروه"
          register={{
            ...register("title", {
              value: group?.title,
            }),
          }}
        />
        {errors.title && <WarningText>{errors.title?.message}</WarningText>}
      </form>
    </EditDialog>
  );
};

export default GroupEditDialog;
