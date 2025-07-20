import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import SelectAtom, { IOption } from "@components/molecules/select";
import CreateDialog from "@components/templates/dialog/createDialog";
import FormInput from "@components/atoms/input/formInput";
import ImageComponent from "@components/atoms/image";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { toast } from "react-toastify";
import useCreatePrivateFeed from "@hooks/privateFeed/useCreatePrivateFeed";
import { useForm } from "react-hook-form";
import useGetDomainPublishRepoList from "@hooks/domain/useGetDomainPublishRepoList";
import useGetFeedImages from "@hooks/publicFeed/useGetFeedImages";
import { useRecoilValue } from "recoil";
import { repoFeedAtom } from "@atom/feed";
import { Spinner } from "@components/atoms/spinner";
import { yupResolver } from "@hookform/resolvers/yup";
import { privateFeedSchema } from "./validation.yup";

interface IForm {
  name: string;
  content: string;
  link?: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrivateFeedCreateDialog = ({ setOpen }: IProps) => {
  const [imageHash, setImageHash] = useState<string | undefined>();
  const [repoInfo, setRepoInfo] = useState<IOption>();
  const getRepoFeed = useRecoilValue(repoFeedAtom);

  const {
    data: publishRepoList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDomainPublishRepoList(30, !repoInfo);
  const { data: feedImages, isLoading: ImagesIsLoading } = useGetFeedImages(30);
  const createPrivateFeed = useCreatePrivateFeed();

  const form = useForm<IForm>({ resolver: yupResolver(privateFeedSchema) });
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
    setRepoInfo(undefined);
  };

  const onSubmit = async (dataForm: IForm) => {
    if (!repoInfo && !getRepoFeed) {
      return;
    }
    createPrivateFeed.mutate({
      repoId: getRepoFeed ? getRepoFeed!.value : +repoInfo!.value,
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
    if (scrollHeight - scrollTop === clientHeight && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderRepo = () => {
    if (getRepoFeed) {
      return <FormInput placeholder={getRepoFeed.label} readOnly />;
    }
    if (isLoading) {
      return (
        <div className="flex h-[50px] w-full items-center justify-center">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      );
    }
    return (
      <SelectAtom
        className="flex h-[46px] w-full items-center justify-between rounded-lg border-[1px] border-normal !bg-gray-50 pl-2 pr-3"
        defaultOption={repoOptions?.[0]?.[0]}
        options={repoOptions?.flat()}
        selectedOption={repoInfo}
        setSelectedOption={setRepoInfo}
        onMenuScroll={handleScroll}
        isLoading={isFetchingNextPage}
      />
    );
  };

  return (
    <CreateDialog
      isPending={createPrivateFeed.isPending}
      dialogHeader="ایجاد خبرنامه خصوصی"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="!h-screen overflow-y-auto xs:!h-[600px]"
    >
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography className="form_label">انتخاب مخزن</Typography>
          {renderRepo()}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> عنوان</Typography>
          <FormInput placeholder="عنوان " register={{ ...register("name") }} />
          {errors.name && <Typography className="warning_text">{errors.name?.message}</Typography>}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">متن </Typography>
          <TextareaAtom placeholder="متن" register={{ ...register("content") }} />
          {errors.content && (
            <Typography className="warning_text">{errors.content?.message}</Typography>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label"> لینک</Typography>
          <FormInput placeholder="لینک " register={{ ...register("link") }} />
          {errors.link && <Typography className="warning_text">{errors.link?.message}</Typography>}
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="form_label">عکس خبرنامه </Typography>
          {ImagesIsLoading ? (
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

export default PrivateFeedCreateDialog;
