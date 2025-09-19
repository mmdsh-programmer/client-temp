import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useCreateRootBranch from "@hooks/branch/useCreateRootBranch";
import useCreateSubBranch from "@hooks/branch/useCreateSubBranch";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBranchSchema } from "./validation.yup";
import { useBranchStore } from "@store/branch";

interface IForm {
  name: string;
  repoType: string;
  username: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BranchCreateDialog = ({ setOpen }: IProps) => {
  const { branchId: getBranchId } = useBranchStore();

  const createRootBranch = useCreateRootBranch();
  const createSubBranch = useCreateSubBranch();

  const form = useForm<IForm>({
    resolver: yupResolver(createBranchSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    if (getBranchId) {
      createSubBranch.mutate({
        branchId: getBranchId,
        name: dataForm.name,
        repoType: dataForm.repoType,
        username: dataForm.username,
        callBack: () => {
          toast.success(`زیرشعبه ${dataForm.name} با موفقیت ساخته شد.`);
          handleClose();
        },
      });
    } else {
      createRootBranch.mutate({
        name: dataForm.name,
        repoType: dataForm.repoType,
        username: dataForm.username,
        callBack: () => {
          toast.success(`شعبه ${dataForm.name} با موفقیت ساخته شد.`);
          handleClose();
        },
      });
    }
  };

  return (
    <CreateDialog
      isPending={createRootBranch.isPending || createSubBranch.isPending}
      dialogHeader={getBranchId ? "ساخت زیرشعبه" : " ساخت شعبه"}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            نام شعبه
          </Typography>
          <FormInput
            placeholder="نام شعبه"
            register={{ ...register("name") }}
          />
          {errors.name && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            نوع شعبه
          </Typography>
          <FormInput
            placeholder="نوع شعبه"
            register={{ ...register("repoType") }}
          />
          {errors.repoType && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.repoType?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
             مالک 
          </Typography>
          <FormInput
            placeholder="مالک شعبه"
            register={{ ...register("username") }}
          />
          {errors.username && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.username?.message}
            </Typography>
          )}
        </div>
      </form>
    </CreateDialog>
  );
};

export default BranchCreateDialog;
