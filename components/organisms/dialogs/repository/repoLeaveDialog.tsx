import React from "react";
import { IRepo } from "@interface/repo.interface";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import { useForm } from "react-hook-form";
import ConfirmDialog from "@components/templates/dialog/confirmDialog";
import useLeaveRepo from "@hooks/repository/useLeaveRepo";

interface IForm {
  name: string;
}

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoLeaveDialog = ({ repo, setOpen }: IProps) => {
  const router = useRouter();
  const setRepo = useSetRecoilState(repoAtom);
  const { isPending, mutate } = useLeaveRepo();

  const { handleSubmit, clearErrors, reset } = useForm<IForm>();

  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  const onSubmit = async () => {
    if (!repo) return;
    mutate({repoId: repo.id,
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
            title={repo?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {repo?.name}
          </span>
          " اطمینان دارید؟
        </div>
      </form>
    </ConfirmDialog>
  );
};

export default RepoLeaveDialog;
