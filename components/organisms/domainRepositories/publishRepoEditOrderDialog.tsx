import React from "react";
import { IRepo } from "@interface/repo.interface";
import EditDialog from "@components/templates/dialog/editDialog";
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import { useForm } from "react-hook-form";
import useEditRepoOrder from "@hooks/domain/useEditRepoOrder";
import { toast } from "react-toastify";

interface IDataForm {
  order: number | null;
}

interface IProps {
  repo: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublishRepoEditOrderDialog = ({ repo, setOpen }: IProps) => {
  const editRepoOrder = useEditRepoOrder();

  const form = useForm<IDataForm>();
  const {
    register,
    handleSubmit,
    setError,
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

  const onSubmit = (dataForm: IDataForm) => {
    if (!repo) return;
    editRepoOrder.mutate({
      repoId: repo.id,
      order: dataForm.order,
      callBack: () => {
        handleClose();
        toast.success("مخزن با موفقیت اولویت بندی شد.");
      },
    });
  };

  return (
    <EditDialog
      isPending={editRepoOrder.isPending}
      dialogHeader="ویرایش اولویت مخزن"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="repo-edit-order-dialog"
    >
      <form className="repo-edit-order-dialog__form flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            نام مخزن
          </Typography>
          <FormInput value={repo.name} disabled className="repo-edit-order-dialog__form-name" />
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            placeholder=""
            className="form_label"
            {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
          >
            اولویت مخزن
          </Typography>
          <FormInput
            placeholder="اولویت مخزن"
            type="number"
            min={0}
            register={{
              ...register("order", {
                valueAsNumber: true,
              }),
            }}
            className="repo-edit-order-dialog__form-order"
          />
          {errors.order && (
            <Typography
              placeholder=""
              className="warning_text"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              {errors.order?.message}
            </Typography>
          )}
        </div>
      </form>
    </EditDialog>
  );
};

export default PublishRepoEditOrderDialog;
