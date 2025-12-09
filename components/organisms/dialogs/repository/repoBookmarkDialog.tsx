import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useBookmarkRepo from "@hooks/repository/useBookmarkRepo";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoBookmarkDialog = ({ setOpen }: IProps) => {
  const { repo, setRepo } = useRepositoryStore();
  const { isPending, mutate } = useBookmarkRepo();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (!repo) return;
    if (!repo.bookmark) {
      mutate({
        repoId: repo.id,
        callBack: () => {
          window.metrics?.track(`repo-${repo.id}-success-bookmark`);
          toast.success("مخزن مورد نظر به نشان شده ها اضافه شد.");
          setRepo({
            ...repo,
            bookmark: true,
          });
          handleClose();
        },
      });
    } else {
      mutate({
        repoId: repo.id,
        detach: true,
        callBack: () => {
          window.metrics?.track(`repo-${repo.id}-success-unbookmark`);
          toast.success("مخزن مورد نظر از نشان شده ها حذف شد.");
          setRepo({
            ...repo,
            bookmark: false,
          });
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
      className="repo-bookmark-dialog"
    >
      آیا از {repo?.bookmark ? " حذف نشان   " : "  نشان‌دار کردن  "}"
      <Typography
        {...({} as React.ComponentProps<typeof Typography>)}
        title={repo?.name}
        className="flex max-w-[100px] items-center truncate px-[2px] font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal"
      >
        {repo?.name}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default RepoBookmarkDialog;
