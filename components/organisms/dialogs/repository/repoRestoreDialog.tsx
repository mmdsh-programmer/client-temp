import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useRestoreRepo from "@hooks/repository/useRestoreRepo";
import { useRepositoryStore } from "@store/repository";
import { useRouter } from "next/navigation";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoRestoreDialog = ({ setOpen }: IProps) => {
  const router = useRouter();
  const { repo: getRepo } = useRepositoryStore();

  const { isPending, mutate } = useRestoreRepo();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo.id,
      callBack: () => {
        window.metrics.track(`repo-${getRepo.id}-success-restore`);

        router.push(`/admin/repositories?repoId=${getRepo.id}`);
        toast.success("مخزن با موفقیت بازگردانی شد.");
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={isPending}
      dialogHeader="بازگردانی مخزن"
      onSubmit={handleSubmit}
      setOpen={handleClose}
      className="repo-restore-dialog"
    >
      آیا از بازگردانی"
      <Typography
        {...({} as React.ComponentProps<typeof Typography>)}
        title={getRepo?.name}
        className="text-primary_normal max-w-[100px] truncate font-iranYekan text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] flex items-center px-[2px]"
      >
        {getRepo?.name}
      </Typography>
      " اطمینان دارید؟
    </ConfirmDialog>
  );
};

export default RepoRestoreDialog;
