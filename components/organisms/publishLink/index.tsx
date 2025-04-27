import { repoAtom, repositoryIdAtom } from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";

import CreateRepoPublishLink from "./createRepoPublishLink";
import LoadingButton from "@components/molecules/loadingButton";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useDeletePublishLink from "@hooks/publish/useDeletePublishLink";

const PublishLink = () => {
  const setRepositoryAtomId = useSetRecoilState(repositoryIdAtom);
  const getRepo = useRecoilValue(repoAtom);
  const deletePublishLink = useDeletePublishLink();

  const handleDelete = () => {
    if (!getRepo) return;
    deletePublishLink.mutate({repoId: getRepo?.id,
      callBack: () => {
        setRepositoryAtomId(getRepo.id);
        toast.success("درخواست شما برای لغو انتشار مخزن با موفقیت انجام شد.");
      },});
  };

  return (
    <div className="repo-publish-link mt-4 w-full overflow-auto bg-white">
      <div className=" bg-gray-200 w-full" />
      <div className="pt-6 px-2">
        {getRepo?.isPublish ? (
          <div className="flex flex-col gap-6">
            <Typography className="title_t3">
              مخزن شما قبلا انتشار یافته. آیا می‌خواهید آن را لغو کنید؟
            </Typography>
            <LoadingButton
              className="repo-publish-link__delete-publish-button self-end bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
              onClick={handleDelete}
              loading={deletePublishLink.isPending}
            >
              <Typography className="text__label__button text-white">
                لغو انتشار
              </Typography>
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
