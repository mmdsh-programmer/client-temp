import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import useAddPartyToDomain from "@hooks/domainParticipants/useAddPartyToDomain";

interface IForm {
  username: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddDomainParticipantDialog = ({ setOpen }: IProps) => {

  const addPartyToDomain = useAddPartyToDomain();

  const form = useForm<IForm>();
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
    addPartyToDomain.mutate({
      userNameList: dataForm.username,
      callBack: () => {
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={addPartyToDomain.isPending}
      dialogHeader="افزودن کاربر جدید"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-2">
        <Typography className="form_label">اعضای دامنه </Typography>
        <FormInput
          placeholder="نام کاربری را وارد کنید..."
          register={{ ...register("username") }}
          />
        {errors.username && (
          <Typography className="warning_text">
            {errors.username?.message}
          </Typography>
        )}
      </form>
    </CreateDialog>
  );
};

export default AddDomainParticipantDialog;
