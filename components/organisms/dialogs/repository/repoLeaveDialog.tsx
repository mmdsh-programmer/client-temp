import { usePathname, useRouter } from "next/navigation";

import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import React, { useEffect, useState } from "react";
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
  const [isNavigating, setIsNavigating] = useState(false);

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
        if (currentPath === "/admin/repositories") {
          if (isNavigating) return;
          setIsNavigating(true);
          router.push("/admin/dashboard");
        } else {
          setRepo(null);
          localStorage.removeItem("CLASOR:SELECTED_REPO");
        }
        handleClose();
      },
    });
  };

  useEffect(() => {
    if (isNavigating && currentPath === "/admin/dashboard") {
      setRepo(null);
      setIsNavigating(false);
      localStorage.removeItem("CLASOR:SELECTED_REPO");
    }
  }, [currentPath, isNavigating, setRepo]);

  return (
    <ConfirmDialog
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      dialogHeader="ترک مخزن"
      setOpen={handleClose}
      className="repo-leave-dialog"
    >
      <form className="flex flex-col gap-5">
        <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
          آیا از ترک"
          <span
            title={getRepo?.name}
            className="body_b3 flex max-w-[100px] items-center truncate px-[2px] text-primary_normal"
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
