import { usePathname, useRouter } from "next/navigation";

import DeleteDialog from "@components/templates/dialog/deleteDialog";
import React from "react";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useArchiveRepo from "@hooks/repository/useArchiveRepo";
import { useRecoilState } from "recoil";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoArchiveDialog = ({ setOpen }: IProps) => {
  const router = useRouter();
  const currentPath = usePathname();

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
        router.push("/admin/dashboard");

        if (currentPath === "/admin/dashboard") {
          setRepo(null);
          localStorage.removeItem("CLASOR:SELECTED_REPO");
        }
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
        <div className="flex text-primary_normal font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از آرشیو"
          <span
            title={getRepo?.name}
            className="body_b3 text-primary_normal max-w-[100px] truncate flex items-center px-[2px]"
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
