import React from "react";
import { toast } from "react-toastify";
import useArchiveRepo from "@hooks/repository/useArchiveRepo";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IRepo } from "@interface/repo.interface";

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoArchiveDialog = ({ repo, setOpen }: IProps) => {
  const { isPending, mutate } = useArchiveRepo();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (!repo) return;
    mutate({repoId: repo.id,
      callBack: () => {
        toast.success("مخزن با موفقیت بایگانی شد.");
        handleClose();
      },});
  };

  return (
    <DeleteDialog
      isPending={isPending}
      dialogHeader="آرشیو مخزن"
      onSubmit={handleSubmit}
      setOpen={handleClose}
      className=""
      isArchive
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از آرشیو"
          <span
            title={repo?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {repo?.name}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default RepoArchiveDialog;
