import React from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useLeaveRepo from "@hooks/repository/useLeaveRepo";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoLeaveDialog = ({ setOpen }: IProps) => {
  const router = useRouter();
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const { isPending, mutate } = useLeaveRepo();

  const { handleSubmit, clearErrors, reset } = useForm<IForm>();

  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  const onSubmit = async () => {
    if (!getRepo) return;
    mutate({repoId: getRepo.id,
      callBack: () => {
        setRepo(null);
        router.push("dashboard");
        window.setTimeout(() => {
          localStorage.removeItem("CLASOR:SELECTED_REPO");
        }, 100);
        handleClose();
      },});
  };

  return (
    <ConfirmDialog
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      dialogHeader="ترک مخزن"
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
           آیا از ترک"
          <span
            title={getRepo?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
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
