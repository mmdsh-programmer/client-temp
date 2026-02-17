import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import ImageComponent from "@components/atoms/image";
import TextareaAtom from "@/components/atoms/textarea";
import { publicFeedSchema } from "./validation.yup";
import { toast } from "react-toastify";
import useCreatePublicFeed from "@hooks/publicFeed/useCreatePublicFeed";
import { useForm } from "react-hook-form";
import useGetFeedImages from "@hooks/publicFeed/useGetFeedImages";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "@components/atoms/spinner";

interface IForm {
  name: string;
  content: string;
  link?: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicFeedCreateDialog = ({ setOpen }: IProps) => {
  const [imageHash, setImageHash] = useState<string | undefined>();

  const { data: feedImages, isLoading } = useGetFeedImages(30);
  const createPublicFeed = useCreatePublicFeed();

  const form = useForm<IForm>({ resolver: yupResolver(publicFeedSchema), mode: "onChange" });
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
      className="custom-dialog m-0 sm:!min-w-[500px] sm:!max-w-[500px]"
      disabled={!isValid}
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            {" "}
            عنوان
          </Typography>
          <FormInput placeholder="عنوان " register={{ ...register("name") }} />
          {errors.name && (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.name?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            توضیحات{" "}
          </Typography>
          <TextareaAtom
            placeholder="توضیحات"
            {...register("content")}
            rows={10}
            className="h-auto max-h-[500px] min-h-[200px]"
          />
          {errors.content && (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.content?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            {" "}
            لینک
          </Typography>
          <FormInput placeholder="لینک " register={{ ...register("link") }} />
          {errors.link && (
            <Typography
              {...({} as React.ComponentProps<typeof Typography>)}
              className="warning_text"
            >
              {errors.link?.message}
            </Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="form_label">
            عکس خبرنامه{" "}
          </Typography>
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
                      {...({} as React.ComponentProps<typeof Button>)}
                      key={hash}
                      className="flex h-[70px] w-[70px] flex-grow items-center justify-center rounded-lg border-[1px] border-normal bg-primary focus:bg-secondary focus:outline-2 focus:outline-gray-200"
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

export default PublicFeedCreateDialog;
