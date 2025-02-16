import React, { useState } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextareaAtom from "@components/atoms/textarea/textarea";
import useCreatePublicFeed from "@hooks/feed/useCreatePublicFeed";
import useGetFeedImages from "@hooks/feed/useGetFeedImages";
import ImageComponent from "@components/atoms/image";

interface IForm {
  name: string;
  content: string;
  link?: string
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicFeedCreateDialog = ({ setOpen }: IProps) => {
  const [imageHash, setImageHash] = useState<string | undefined>();
  
  const { data: feedImages, isLoading } = useGetFeedImages(30);
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
      name: dataForm.name,
      content: dataForm.content,
      image: imageHash,
      link: dataForm.link,
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
          <Typography className="form_label">متن </Typography>
          <TextareaAtom
            placeholder="متن"
            register={{ ...register("content") }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> لینک</Typography>
          <FormInput placeholder="لینک " register={{ ...register("link") }} />
          {errors.link && (
            <Typography className="warning_text">
              {errors.link?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">عکس خبرنامه </Typography>
          {isLoading ? (
            <div className="w-full justify-center items-center flex h-[50px]">
              <Spinner className="h-5 w-5" color="deep-purple" />
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {feedImages?.pages.map((page) => {
                return page.list.map((hash) => {
                  return (
                    <Button
                      placeholder="button"
                      key={hash}
                      className="flex flex-grow focus:bg-secondary focus:outline-2 focus:outline-gray-200 justify-center items-center rounded-lg border-[1px] border-normal bg-primary w-[70px] h-[70px]"
                      onClick={() => {
                        return setImageHash(hash);
                      }}
                    >
                      <ImageComponent
                        className="object-cover max-h-full"
                        alt="repo-image"
                        src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${hash}?&checkUserGroupAccess=true&time=${Date.now()})`}
                      />
                    </Button>
                  );
                });
              })}
            </div>
          )}
        </div>
      </form>
    </CreateDialog>
  );
};

export default PublicFeedCreateDialog;
