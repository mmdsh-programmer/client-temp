import React from "react";
import { toast } from "react-toastify";
import useArchiveRepo from "@hooks/repository/useArchiveRepo";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IRepo } from "@interface/repo.interface";

interface IProps {
  repo: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoArchiveDialog = ({ repo, setOpen }: IProps) => {
  const { isPending, mutate } = useArchiveRepo();

  const handleClose = () => {
    setOpen(!open);
  };
  const handleSubmit = async () => {
    mutate({
      repoId: repo.id,
      callBack: () => {
        toast.success("مخزن با موفقیت بایگانی شد.");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={isPending}
      dialogHeader={"آرشیو مخزن"}
      onSubmit={handleSubmit}
      setOpen={handleClose}
      className=""
    >
      {repo.name}
    </DeleteDialog>
  );
};

export default RepoArchiveDialog;
