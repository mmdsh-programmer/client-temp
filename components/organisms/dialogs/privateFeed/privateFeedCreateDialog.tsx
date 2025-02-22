import React, { useState } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextareaAtom from "@components/atoms/textarea/textarea";
import useGetFeedImages from "@hooks/publicFeed/useGetFeedImages";
import ImageComponent from "@components/atoms/image";
import useCreatePrivateFeed from "@hooks/privateFeed/useCreatePrivateFeed";
import SelectAtom, { IOption } from "@components/molecules/select";
import useGetDomainPublishRepoList from "@hooks/domain/useGetDomainPublishRepoList";

interface IForm {
  name: string;
  content: string;
  repoId: number;
  link?: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivateFeedCreateDialog = ({ setOpen }: IProps) => {
  const [imageHash, setImageHash] = useState<string | undefined>();
  const [repoInfo, setRepoInfo] = useState<IOption>();

  const {
    data: publishRepoList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDomainPublishRepoList(30);
  const { data: feedImages, isLoading: ImagesIsLoading } = useGetFeedImages(30);
  const createPrivateFeed = useCreatePrivateFeed();

  const form = useForm<IForm>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = form;

  const repoOptions = publishRepoList?.pages.map((page) => {
    return page.list.map((repo) => {
      return {
        label: repo.name,
        value: repo.id,
      };
    });
  });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!repoInfo) {
      return;
    }
    createPrivateFeed.mutate({
      repoId: +repoInfo.value,
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

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (
      scrollHeight - scrollTop === clientHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <CreateDialog
      isPending={createPrivateFeed.isPending}
      dialogHeader="ایجاد خبرنامه خصوصی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="!h-screen xs:!h-[600px] overflow-y-auto"
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
          <Typography className="form_label">مخزن</Typography>
          {isLoading ? (
            <div className="w-full justify-center items-center flex h-[50px]">
              <Spinner className="h-5 w-5" color="deep-purple" />
            </div>
          ) : (
            <SelectAtom
              className="w-full h-[46px] flex items-center !bg-gray-50 justify-between pr-3 pl-2 rounded-lg border-[1px] border-normal"
              defaultOption={repoOptions?.[0]?.[0]}
              options={repoOptions?.flat()}
              selectedOption={repoInfo}
              setSelectedOption={setRepoInfo}
              onMenuScroll={handleScroll}
              isLoading={isFetchingNextPage}
            />
          )}
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
          {ImagesIsLoading ? (
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

export default PrivateFeedCreateDialog;
