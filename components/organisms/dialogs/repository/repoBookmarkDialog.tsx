import React from "react";
import { IRepo } from "@interface/repo.interface";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useBookmarkRepo from "@hooks/repository/useBookmarkRepo";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoBookmarkDialog = ({ repo, setOpen }: IProps) => {
  const { isPending, mutate } = useBookmarkRepo();

  const handleClose = () => {
    setOpen(!open);
  };
  const handleSubmit = async () => {
    if (!repo) return;
    if (!repo.bookmark) {
      mutate({
        repoId: repo.id,
        callBack: () => {
          toast.success("مخزن مورد نظر به نشان شده ها اضافه شد.");
          handleClose();
        },
      });
    } else {
      mutate({
        repoId: repo.id,
        detach: true,
        callBack: () => {
          toast.success("مخزن مورد نظر از نشان شده ها حذف شد.");
          handleClose();
        },
      });
    }
  };
  return (
    <ConfirmDialog
      isPending={isPending}
      dialogHeader={repo?.bookmark ? "حذف نشان مخزن" : "نشان‌دار کردن مخزن"}
      onSubmit={handleSubmit}
      setOpen={handleClose}
      className=""
    >
      آیا از {repo?.bookmark ? " حذف نشان   " : "  نشان‌دار کردن  "}"
      <Typography
        title={repo?.name}
        placeholder="name"
        className="text-primary max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]"
      >
        {repo?.name}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default RepoBookmarkDialog;
