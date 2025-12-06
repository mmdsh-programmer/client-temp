import { usePathname, useRouter } from "next/navigation";

import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { toast } from "react-toastify";
import useArchiveRepo from "@hooks/repository/useArchiveRepo";
import { useRepositoryStore } from "@store/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoArchiveDialog = ({ setOpen }: IProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  const { isPending, mutate } = useArchiveRepo();
  const { repo: getRepo, setRepo } = useRepositoryStore();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo.id,
      callBack: () => {
        window.metrics.track(`repo-${getRepo.id}-success-archive`);

        if (currentPath.includes("/admin/repositories")) {
          router.push("/admin/myRepoList");
        }
        toast.success("مخزن با موفقیت بایگانی شد.");
        handleClose();
        setRepo(null);
        localStorage.removeItem("CLASOR:SELECTED_REPO");
      },
    });
  };

  return (
    <DeleteDialog
      isPending={isPending}
      dialogHeader="آرشیو مخزن"
      onSubmit={handleSubmit}
      setOpen={handleClose}
      className="archive-repo-dialog"
      isArchive
    >
      <form className="archive-repo-dialog__form flex flex-col gap-5">
        <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
          آیا از آرشیو"
          <span
            title={getRepo?.name}
            className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
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
