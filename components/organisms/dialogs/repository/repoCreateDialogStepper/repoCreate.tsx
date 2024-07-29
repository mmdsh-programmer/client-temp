"use client";

import React from "react";
import {
  DialogFooter,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingButton from "@components/molecules/loadingButton";
import useCreateRepo from "@hooks/repository/useCreateRepo";
import { useSetRecoilState } from "recoil";
import { repoActiveStep } from "@atom/stepper";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoCreateSchema } from "../validation.yup";
import CancelButton from "@components/atoms/button/cancelButton";

interface IForm {
  name: string;
  description?: string;
}

interface IProps {
  setRepo: (repo: any) => void;
  handleClose: () => void;
}

const RepoCreateDialog = ({ setRepo, handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStep);

  const { isPending, mutate } = useCreateRepo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({
    resolver: yupResolver(repoCreateSchema),
  });

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const onSubmit = async (dataForm: IForm) => {
    mutate({
      name: dataForm.name,
      description: dataForm.description,
      callBack: (result) => {
        toast.success("مخزن با موفقیت ایجاد شد.");
        handleReset();
        setActiveStep(1);
        setRepo(result.data);
      },
    });
  };

  return (
    <>
      <DialogBody placeholder="dialog body" className="p-0">
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm text-primary font-normal">
              عنوان مخزن
            </label>
            <input
              id="title"
              type="text"
              placeholder="عنوان"
              {...register("name")}
              className="bg-transparent px-[15px] py-[9px] rounded-[4px] focus:px-[15px] focus:outline-none text-[13px] 
              font-iranYekan font-normal text-primary placeholder:text-placeholder w-full
              border border-gray-400 border-solid focus:border-gray-400"
            />
            {errors.name && (
              <Typography
                placeholder="error-message"
                className="text-error font-iranYekan text-xs w-full h-5"
              >
                {errors.name?.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="order" className="text-sm text-primary font-normal">
              توضیحات مخزن
            </label>
            <input
              id="description"
              type="text"
              placeholder="توضیحات"
              className="bg-transparent px-[15px] py-[9px] rounded-[4px] focus:px-[15px] focus:outline-none text-[13px] 
              font-iranYekan font-normal text-primary placeholder:text-placeholder w-full
              border border-gray-400 border-solid focus:border-gray-400"
              {...register("description")}
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter
        placeholder="create user dialog footer"
        className="p-0 flex gap-2.5 mt-[30px]"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="bg-purple-normal flex justify-center items-center rounded-lg px-4 py-3 text-[13px] text-white font-iranYekan"
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
        >
          ادامه
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default RepoCreateDialog;
