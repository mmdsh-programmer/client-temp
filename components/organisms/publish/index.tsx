import React from "react";
import { repoAtom, repositoryIdAtom } from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CreateRepoPublishLink from "./createRepoPublishLink";
import { Typography } from "@material-tailwind/react";
import LoadingButton from "@components/molecules/loadingButton";
import useDeletePublishLink from "@hooks/publish/useDeletePublishLink";
import { toast } from "react-toastify";

const Publish = () => {
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
    <div className="share-link-content mt-4 w-full overflow-auto bg-white">
      <div className="border-b-[1px] bg-gray-200 w-full" />
      <div className="pt-5">
        {getRepo?.isPublish ? (
          <div className="flex flex-col gap-6">
            <Typography className="title_t3">
              مخزن شما قبلا انتشار یافته. آیا می‌خواهید آن را لغو کنید؟
            </Typography>
            <LoadingButton
              className="self-end bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
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

export default Publish;
