import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextareaAtom from "@components/atoms/textarea/textarea";
import useCreatePublicFeed from "@hooks/feed/useCreatePublicFeed";

interface IForm {
  name: string;
  content: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicFeedCreateDialog = ({ setOpen }: IProps) => {
  const domainId = process.env.NEXT_PUBLIC_DOMAIN_ID as string;
  const createPublicFeed = useCreatePublicFeed();

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
    createPublicFeed.mutate({
      domainId: +domainId,
      name: dataForm.name,
      content: dataForm.content,
      callBack: () => {
        toast.success(`خبرنامه ${dataForm.name} با موفقیت ساخته شد.`);
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={createPublicFeed.isPending}
      dialogHeader="ایجاد خبرنامه عمومی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> عنوان</Typography>
          <FormInput placeholder="عنوان " register={{ ...register("name") }} />
          {errors.name && (
            <Typography className="warning_text">
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> </Typography>
          <TextareaAtom
            placeholder="متن"
            register={{ ...register("content") }}
          />
        </div>
      </form>
    </CreateDialog>
  );
};

export default PublicFeedCreateDialog;
