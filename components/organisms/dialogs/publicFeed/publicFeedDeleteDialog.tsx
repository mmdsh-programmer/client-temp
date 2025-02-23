import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IFeedItem } from "@interface/feeds.interface";
import useDeletePublicFeed from "@hooks/publicFeed/useDeletePublicFeed";
import { toast } from "react-toastify";

interface IProps {
  feed: IFeedItem;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicFeedDeleteDialog = ({ setOpen, feed }: IProps) => {

  const deletePublicFeed = useDeletePublicFeed();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    deletePublicFeed.mutate({
      feedId: feed.id,
      callBack: () => {
        toast.error(`خبرنامه ${feed.name} حذف شد`);
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deletePublicFeed.isPending}
      dialogHeader="حذف خبرنامه عمومی"
      onSubmit={handleDelete}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از حذف"
          <span
            title={feed?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {feed?.name}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default PublicFeedDeleteDialog;
