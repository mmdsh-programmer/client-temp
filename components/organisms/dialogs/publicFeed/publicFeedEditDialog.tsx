import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Spinner } from "@components/atoms/spinner";

import EditDialog from "@components/templates/dialog/editDialog";
import FormInput from "@components/atoms/input/formInput";
import { IFeedItem } from "@interface/feeds.interface";
import ImageComponent from "@components/atoms/image";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { publicFeedSchema } from "./validation.yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetFeedImages from "@hooks/publicFeed/useGetFeedImages";
import useUpdatePublicFeed from "@hooks/publicFeed/useUpdatePublicFeed";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  name: string;
  content: string;
  link?: string;
}

interface IProps {
  feed: IFeedItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicFeedEditDialog = ({ feed, setOpen }: IProps) => {
  const { link, image } = JSON.parse(feed.metadata);
  const [imageHash, setImageHash] = useState<string | undefined>();

  const { data: feedImages, isLoading } = useGetFeedImages(30);
  const updatePublicFeed = useUpdatePublicFeed();

  const form = useForm<IForm>({ resolver: yupResolver(publicFeedSchema) });

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
      feedId: feed.id,
      name: dataForm.name,
      content: dataForm.content,
      image: imageHash,
      link: dataForm.link,
      callBack: () => {
        toast.success(`خبرنامه ${dataForm.name} با موفقیت بروزرسانی شد.`);
        handleClose();
      },
    });
  };

  return (
    <EditDialog
      isPending={updatePublicFeed.isPending}
      dialogHeader="ویرایش خبرنامه عمومی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="custom-dialog sm:!min-w-[500px] sm:!max-w-[500px] m-0"
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
          <Typography className="form_label">توضیحات </Typography>
          <TextareaAtom
            placeholder="توضیحات"
            register={{ ...register("content", { value: feed.content }) }}
            rows={15}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> لینک</Typography>
          <FormInput
            placeholder="لینک "
            register={{ ...register("link", { value: link }) }}
          />
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
              <Spinner className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {feedImages?.pages.map((page) => {
                return page.list.map((hash) => {
                  return (
                    <Button
                      placeholder="button"
                      key={hash}
                      className={`flex flex-grow ${image === hash ? "!bg-secondary !outline-2 !outline-gray-200" : ""} focus:bg-secondary focus:outline-2 focus:outline-gray-200 
                        justify-center items-center rounded-lg border-[1px] 
                        border-normal bg-primary w-[70px] h-[70px]`}
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
    </EditDialog>
  );
};

export default PublicFeedEditDialog;
