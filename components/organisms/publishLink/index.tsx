import React from "react";
import CreateRepoPublishLink from "./createRepoPublishLink";
import LoadingButton from "@components/molecules/loadingButton";
import { Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useDeletePublishLink from "@hooks/publish/useDeletePublishLink";
import { CopyIcon } from "@components/atoms/icons";
import { toPersianDigit } from "@utils/index";
import copy from "copy-to-clipboard";
import { useRepositoryStore } from "@store/repository";

const PublishLink = () => {
  const { repo: getRepo, setRepo } = useRepositoryStore();
  const deletePublishLink = useDeletePublishLink();

  const handleDelete = () => {
    if (!getRepo) return;
    deletePublishLink.mutate({
      repoId: getRepo?.id,
      callBack: () => {
        setRepo({
          ...getRepo,
          isPublish: false,
        });
        toast.success("درخواست شما برای لغو انتشار مخزن با موفقیت انجام شد.");
      },
    });
  };

  return (
    <div className="repo-publish-link mt-4 w-full bg-white">
      <div className="w-full bg-gray-200" />
      <div className="px-2 pt-6">
        {getRepo?.isPublish ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Typography className="form_label"> لینک منتشرشده مخزن</Typography>
                <div className="flex h-10 flex-grow items-center justify-between gap-2 overflow-hidden rounded-lg border-[1px] border-normal bg-gray-50 pl-2 pr-3">
                  <Typography
                    className="font-300 w-full cursor-pointer truncate text-sm text-placeholder"
                    dir="ltr"
                  >
                    {toPersianDigit(
                      `${window.location.origin}/publish/${toPersianDigit(`${getRepo?.name.replaceAll(/\s+/g, "-")}`)}/${getRepo?.id}`,
                    )}
                  </Typography>
                  <div className="flex items-center">
                    <Button
                      className="repo-link-wrapper__copy-link-button h-7 w-8 rounded-none bg-white p-0"
                      onClick={() => {
                        const url = toPersianDigit(
                          `${window.location.origin}/publish/${toPersianDigit(`${getRepo?.name.replaceAll(/\s+/g, "-")}`)}/${getRepo?.id}`,
                        );
                        copy(url);
                        toast.success("لینک مخزن کپی شد");
                      }}
                    >
                      <CopyIcon className="h-4 w-4 fill-icon-active" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                className="text__label__button w-fit bg-transparent p-0 !text-[12px] text-[#0C8CE9]"
                onClick={() => {
                  const url = toPersianDigit(
                    `/publish/${toPersianDigit(`${getRepo?.name.replaceAll(/\s+/g, "-")}`)}/${getRepo?.id}`,
                  );
                  window.open(url, "_blank");
                }}
              >
                ورود به صفحه مخزن منتشرشده
              </Button>
            </div>
            <Typography className="title_t3">
              مخزن شما انتشار یافته. آیا می‌خواهید آن را لغو کنید؟
            </Typography>
            <LoadingButton
              className="repo-publish-link__delete-publish-button self-end bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
              onClick={handleDelete}
              loading={deletePublishLink.isPending}
            >
              <Typography className="text__label__button text-white">لغو انتشار</Typography>
            </LoadingButton>
          </div>
        ) : (
          <CreateRepoPublishLink />
        )}
      </div>
    </div>
  );
};

export default PublishLink;
