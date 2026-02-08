import React from "react";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editBranchSchema } from "./validation.yup";
import { IBranch } from "@interface/branch.interface";
import EditDialog from "@components/templates/dialog/editDialog";
import useUpdateSubBranch from "@hooks/branch/useUpdateSubBranch";

interface IForm {
  name: string;
  username: string;
}

interface IProps {
  branch: IBranch;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BranchEditDialog = ({ branch, setOpen }: IProps) => {
  const editBranch = useUpdateSubBranch();

  const form = useForm<IForm>({
    resolver: yupResolver(editBranchSchema),
    mode: "onChange"
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    reset,
  } = form;

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const onSubmit = async (dataForm: IForm) => {
    editBranch.mutate({
      branchId: branch.id,
      name: dataForm.name,
      username: dataForm.username,
      parentId: branch.parentId,
      callBack: () => {
        toast.success(`شعبه ${dataForm.name} با موفقیت ویرایش شد.`);
        handleClose();
      },
    });
  };

  return (
    <EditDialog
      isPending={editBranch.isPending}
      dialogHeader="ویرایش شعبه"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
      disabled={!isValid}
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            نام شعبه
          </Typography>
          <FormInput
            placeholder="نام شعبه"
            register={{
              ...register("name", {
                value: branch.title,
              }),
            }}
          />
          {errors.name && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            نوع شعبه
          </Typography>
          <FormInput placeholder={branch.repoTypeName} readOnly />
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            مالک
          </Typography>
          <FormInput
            placeholder="مالک شعبه"
            register={{ ...register("username", { value: branch.userName }) }}
          />
          {errors.username && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.username?.message}
            </Typography>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default BranchEditDialog;
