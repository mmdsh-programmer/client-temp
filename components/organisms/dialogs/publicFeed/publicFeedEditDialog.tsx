import React from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { IFeedItem } from "@interface/feeds.interface";
import useUpdatePublicFeed from "@hooks/feed/useUpdatePublicFeed";

interface IForm {
  name: string;
  content: string;
}

interface IProps {
  feed: IFeedItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicFeedEditDialog = ({ feed, setOpen }: IProps) => {
  const domainId = process.env.NEXT_PUBLIC_DOMAIN_ID as string;
  const updatePublicFeed = useUpdatePublicFeed();

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
    updatePublicFeed.mutate({
      domainId: +domainId,
      feedId: feed.id,
      name: dataForm.name,
      content: dataForm.content,
      callBack: () => {
        toast.success(`خبرنامه ${dataForm.name} با موفقیت بروزرسانی شد.`);
        handleClose();
      },
    });
  };

  return (
    <CreateDialog
      isPending={updatePublicFeed.isPending}
      dialogHeader="ویرایش خبرنامه عمومی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> عنوان</Typography>
          <FormInput
            placeholder="عنوان "
            register={{ ...register("name", { value: feed.name }) }}
          />
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
            register={{ ...register("content", { value: feed.content }) }}
          />
        </div>
      </form>
    </CreateDialog>
  );
};

export default PublicFeedEditDialog;
