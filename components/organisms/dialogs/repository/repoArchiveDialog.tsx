import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { toast } from "react-toastify";
import useArchiveRepo from "@hooks/repository/useArchiveRepo";
import { useRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoArchiveDialog = ({ setOpen }: IProps) => {
  const { isPending, mutate } = useArchiveRepo();
  const [getRepo, setRepo] = useRecoilState(repoAtom);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo.id,
      callBack: () => {
        toast.success("مخزن با موفقیت بایگانی شد.");
        handleClose();
        setRepo(null);
      },
    });
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
            title={getRepo?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {getRepo?.name}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default RepoArchiveDialog;
