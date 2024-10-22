import React from "react";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import FormInput from "@components/atoms/input/formInput";
import { Typography } from "@material-tailwind/react";
import { repoAtom } from "@atom/repository";
import { repoDeleteSchema } from "./validation.yup";
import { toast } from "react-toastify";
import useDeleteRepo from "@hooks/repository/useDeleteRepo";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  name: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoDeleteDialog = ({ setOpen }: IProps) => {
  const router = useRouter();
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const { isPending, mutate } = useDeleteRepo();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({ resolver: yupResolver(repoDeleteSchema) });

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
        setRepo(null);
        router.push("dashboard");
        window.setTimeout(() => {
          localStorage.removeItem("CLASOR:SELECTED_REPO");
        }, 100);
        toast.success("مخزن با موفقیت حذف شد.");
        handleClose();
      },
    });
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
            title={getRepo?.name}
            className="body_b3 text-primary max-w-[100px] truncate flex items-center px-[2px]"
          >
            {getRepo?.name}
          </span>
          " اطمینان دارید؟
        </div>
        <div className="flex flex-col gap-2">
          <Typography className="warning_text">
            برای تایید "<strong>{getRepo?.name}</strong>" را در کادر پایین تایپ
            نمایید!
          </Typography>
          <FormInput placeholder="عنوان" register={{ ...register("name") }} />
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
