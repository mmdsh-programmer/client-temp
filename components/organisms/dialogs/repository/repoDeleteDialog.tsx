import React from "react";
import { toast } from "react-toastify";
import useDeleteRepo from "@hooks/repository/useDeleteRepo";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IRepo } from "@interface/repo.interface";

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoDeleteDialog = ({ repo, setOpen }: IProps) => {
  const { isPending, mutate } = useDeleteRepo();

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async () => {
    if (!repo) return;
    mutate({
      repoId: repo.id,
      callBack: () => {
        toast.success("مخزن با موفقیت حذف شد.");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={isPending}
      onSubmit={onSubmit}
      dialogHeader="حذف مخزن"
      setOpen={handleClose}
      className=""
    >
      {repo?.name}
    </DeleteDialog>
  );
};

export default RepoDeleteDialog;
