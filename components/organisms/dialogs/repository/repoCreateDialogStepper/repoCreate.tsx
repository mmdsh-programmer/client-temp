import {
 DialogBody, DialogFooter, Typography 
} from "@material-tailwind/react";

import CancelButton from "@components/atoms/button/cancelButton";
import FormInput from "@components/atoms/input/formInput";
import LoadingButton from "@components/molecules/loadingButton";
import React from "react";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { repoActiveStepAtom } from "@atom/stepper";
import { repoAtom } from "@atom/repository";
import { repoCreateSchema } from "../validation.yup";
import { toast } from "react-toastify";
import useCreateRepo from "@hooks/repository/useCreateRepo";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";

interface IForm {
  name: string;
  description?: string;
}

interface IProps {
  handleClose: () => void;
}

const RepoCreateDialog = ({ handleClose }: IProps) => {
  const setActiveStep = useSetRecoilState(repoActiveStepAtom);
  const setRepo = useSetRecoilState(repoAtom);

  const {
 isPending, mutate 
} = useCreateRepo();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IForm>({resolver: yupResolver(repoCreateSchema),});

  const handleReset = () => {
    clearErrors();
    reset();
  };

  const onSubmit = async (dataForm: IForm) => {
    mutate({
      name: dataForm.name,
      description: dataForm.description,
      callBack: (result) => {
        if (result.id) {
          toast.success("مخزن با موفقیت ایجاد شد.");
          setRepo(result);
          setTimeout(() => {
            handleReset();
            setActiveStep(1);
          }, 100);
        } else {
          toast.error("ساخت مخزن با خطا مواجه شد.");
        }
      },
    });
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-6"
      >
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography className="label">عنوان مخزن</Typography>
            <FormInput
              placeholder="عنوان مخزن"
              register={{ ...register("name") }}
              id="repo-name"
            />
            {errors.name && (
              <Typography className="warning_text">
                {errors.name?.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="label">توضیحات مخزن</Typography>
            <TextareaAtom
              placeholder="توضیحات مخزن"
              register={{...register("description"),}}
            />
            {errors.description && (
              <Typography className="warning_text">
                {errors.description?.message}
              </Typography>
            )}
          </div>
        </form>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:px-6 xs:py-4 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <CancelButton onClick={handleClose} disabled={isPending}>
          انصراف
        </CancelButton>
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
        >
          <Typography className="text__label__button text-white font-iranYekan">
            ادامه
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default RepoCreateDialog;
