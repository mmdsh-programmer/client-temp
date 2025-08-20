import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeletePrivateFeed from "@hooks/privateFeed/useDeletePrivateFeed";
import { IFeedItem } from "@interface/feeds.interface";
import React from "react";
import { toast } from "react-toastify";
import { useFeedStore } from "@store/feed";

interface IProps {
  feed: IFeedItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicFeedDeleteDialog = ({ setOpen, feed }: IProps) => {
  const { repoFeed: getRepoFeed } = useFeedStore();
  const deletePrivateFeed = useDeletePrivateFeed();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!getRepoFeed) return;

    deletePrivateFeed.mutate({
      repoId: getRepoFeed.value,
      feedId: feed.id,
      callBack: () => {
        toast.success(`خبرنامه ${feed.name} حذف شد`);
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deletePrivateFeed.isPending}
      dialogHeader="حذف خبرنامه خصوصی"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-5">
        <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
          آیا از حذف"
          <span
            title={feed?.name}
            className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
          >
            {feed?.name}
          </span>
          "  اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default PublicFeedDeleteDialog;
