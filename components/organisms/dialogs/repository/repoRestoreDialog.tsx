import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import { IRepo } from "@interface/repo.interface";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useRestoreRepo from "@hooks/repository/useRestoreRepo";

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoRestoreDialog = ({
 repo, setOpen 
}: IProps) => {
  const {
 isPending, mutate 
} = useRestoreRepo();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (!repo) return;
    mutate({
      repoId: repo.id,
      callBack: () => {
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
      className=""
    >
      آیا از بازگردانی"
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

export default RepoRestoreDialog;
