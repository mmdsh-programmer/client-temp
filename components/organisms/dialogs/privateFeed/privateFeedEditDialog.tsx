import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { IFeedItem } from "@interface/feeds.interface";
import ImageComponent from "@components/atoms/image";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetFeedImages from "@hooks/publicFeed/useGetFeedImages";
import { Spinner } from "@components/atoms/spinner";
import { useFeedStore } from "@store/feed";
import useUpdatePrivateFeed from "@hooks/privateFeed/useUpdatePrivateFeed";
import { yupResolver } from "@hookform/resolvers/yup";
import { privateFeedSchema } from "./validation.yup";

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
  const { repoFeed: getRepoFeed } = useFeedStore();

  const { data: feedImages, isLoading } = useGetFeedImages(30);
  const updatePrivateFeed = useUpdatePrivateFeed();

  const form = useForm<IForm>({ resolver: yupResolver(privateFeedSchema) });
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
    if (!getRepoFeed) return;

    updatePrivateFeed.mutate({
      repoId: getRepoFeed.value,
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
    <CreateDialog
      isPending={updatePrivateFeed.isPending}
      dialogHeader="ویرایش خبرنامه خصوصی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="m-0 sm:!min-w-[500px] sm:!max-w-[500px]"
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> عنوان</Typography>
          <FormInput
            placeholder="عنوان "
            register={{ ...register("name", { value: feed.name }) }}
          />
          {errors.name && <Typography className="warning_text">{errors.name?.message}</Typography>}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">متن </Typography>
          <TextareaAtom
            placeholder="متن"
            register={{ ...register("content", { value: feed.content }) }}
          />
          {errors.content && (
            <Typography className="warning_text">{errors.content?.message}</Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> لینک</Typography>
          <FormInput placeholder="لینک " register={{ ...register("link", { value: link }) }} />
          {errors.link && <Typography className="warning_text">{errors.link?.message}</Typography>}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">عکس خبرنامه </Typography>
          {isLoading ? (
            <div className="flex h-[50px] w-full items-center justify-center">
              <Spinner className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {feedImages?.pages.map((page) => {
                return page.list.map((hash) => {
                  return (
                    <Button
                      placeholder="button"
                      key={hash}
                      className={`flex flex-grow ${image === hash ? "!bg-secondary !outline-2 !outline-gray-200" : ""} h-[70px] w-[70px] items-center justify-center rounded-lg border-[1px] border-normal bg-primary focus:bg-secondary focus:outline-2 focus:outline-gray-200`}
                      onClick={() => {
                        return setImageHash(hash);
                      }}
                    >
                      <ImageComponent
                        className="max-h-full object-cover"
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

export default PublicFeedEditDialog;
