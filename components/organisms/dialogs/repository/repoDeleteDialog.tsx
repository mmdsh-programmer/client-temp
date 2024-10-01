import React from "react";
import { toast } from "react-toastify";
import useDeleteRepo from "@hooks/repository/useDeleteRepo";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import { IRepo } from "@interface/repo.interface";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { repoAtom } from "@atom/repository";
import { Typography } from "@material-tailwind/react";
import FormInput from "@components/atoms/input/formInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoDeleteSchema } from "./validation.yup";

interface IForm {
  name: string;
}

interface IProps {
  repo?: IRepo;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoDeleteDialog = ({repo, setOpen}: IProps) => {
  const router = useRouter();
  const setRepo = useSetRecoilState(repoAtom);
  const {isPending, mutate} = useDeleteRepo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({resolver: yupResolver(repoDeleteSchema),});

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
        toast.success("مخزن با موفقیت حذف شد.");
        handleClose();
      },});
  };

  return (
    <DeleteDialog
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      dialogHeader="حذف مخزن"
      setOpen={handleClose}
      className="!-mb-[50vh] xs:!mb-0"
    >
      <form className="flex flex-col gap-5">
        <div className="flex text-primary font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px]">
          آیا از حذف"
          <span
            title={repo?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {repo?.name}
          </span>
          " اطمینان دارید؟
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="warning_text">
            برای تایید "<strong>{repo?.name}</strong>" را در کادر پایین تایپ
            نمایید!
          </Typography>
          <FormInput
            placeholder="عنوان"
            register={{...register("name"),}}
          />
          {errors.name && (
            <Typography className="warning_text">
              {errors.name?.message}
            </Typography>
          )}
        </div>
      </form>
    </DeleteDialog>
  );
};

export default RepoDeleteDialog;
