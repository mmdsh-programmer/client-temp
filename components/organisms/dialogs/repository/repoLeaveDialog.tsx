import { usePathname, useRouter } from "next/navigation";

import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React from "react";
import { useForm } from "react-hook-form";
import useLeaveRepo from "@hooks/repository/useLeaveRepo";
import { useRepositoryStore } from "@store/repository";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoLeaveDialog = ({ setOpen }: IProps) => {
  const router = useRouter();
  const { repo: getRepo, setRepo } = useRepositoryStore();
  const { isPending, mutate } = useLeaveRepo();

  const currentPath = usePathname();

  const { handleSubmit, clearErrors, reset } = useForm<IForm>();

  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    mutate({
      repoId: getRepo.id,
      callBack: () => {
        router.push("/admin/dashboard");
        if (currentPath === "/admin/dashboard") {
          setRepo(null);
          localStorage.removeItem("CLASOR:SELECTED_REPO");
        }
        handleClose();
      },
    });
  };

  return (
    <ConfirmDialog
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      dialogHeader="ترک مخزن"
      setOpen={handleClose}
      className="repo-leave-dialog"
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary_normal font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از ترک"
          <span
            title={getRepo?.name}
            className="body_b3 text-primary_normal max-w-[100px] truncate flex items-center px-[2px]"
          >
            {getRepo?.name}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </ConfirmDialog>
  );
};

export default RepoLeaveDialog;
