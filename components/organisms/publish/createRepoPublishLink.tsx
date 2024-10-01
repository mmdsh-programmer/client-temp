import React, { useState } from "react";
import {
  Checkbox,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { DatePicker } from "zaman";
import FormInput from "@components/atoms/input/formInput";
import LoadingButton from "@components/molecules/loadingButton";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { repoAtom, repositoryIdAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreatePublishLink from "@hooks/publish/useCreatePublishLink";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IData {
  expireTime: number;
  password?: string;
}

const CreateRepoPublishLink = () => {
  const setRepositoryAtomId = useSetRecoilState(repositoryIdAtom);
  const getRepo = useRecoilValue(repoAtom);
  const [hasPassword, setHasPassword] = useState(false);
  const createPublishLink = useCreatePublishLink();

  const form = useForm<{
    expireTime: number;
    password?: string;
  }>();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = form;

  const submitCalendar = (selectedTime: onDatePickerChangePayload) => {
    setValue("expireTime", +new Date(selectedTime.value));
  };

  const handleReset = () => {
    reset();
    clearErrors();
  };

  const onSubmit = async (data: IData) => {
    if (!getRepo) {
      return null;
    }

    createPublishLink.mutate({
      repoId: getRepo.id,
      expireTime: data.expireTime,
      password: hasPassword ? data.password : undefined,
      callBack: () => {
        setRepositoryAtomId(getRepo.id);
        handleReset();
        toast.success(" انتشار مخزن با موفقيت انجام شد.");
      },
    });
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body"
        className="flex-grow px-5 py-3 xs:p-0 xs:pb-6"
      >
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Checkbox
              crossOrigin="anonymous"
              label={
                <Typography className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                  افزودن رمز عبور
                </Typography>
              }
              color="deep-purple"
              checked={hasPassword}
              onChange={() => {
                setHasPassword(!hasPassword);
              }}
              containerProps={{className: "-mr-3",}}
            />
            {hasPassword && (
              <>
                <Typography className="label">رمز عبور</Typography>
                <FormInput
                  type="password"
                  register={{ ...register("password") }}
                />
                {errors.password && (
                  <Typography className="warning_text">
                    {errors.password?.message}
                  </Typography>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="label">انتخاب تاریخ</Typography>
            <DatePicker
              onChange={submitCalendar}
              className="z-[999999] delay-200"
              inputClass="rounded-lg px-2 border-[1px] text-[13px] placeholdre:text-[13px] outline-none bg-gray-50 h-12 border-normal w-full font-iranYekan placeholdre:font-iranYekan"
            />
            {errors.expireTime && (
              <Typography className="warning_text">
                {errors.expireTime?.message}
              </Typography>
            )}
          </div>
        </form>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="p-5 xs:p-0 xs:pt-6 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <LoadingButton
          className="bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
          onClick={handleSubmit(onSubmit)}
          loading={createPublishLink.isPending}
        >
          <Typography className="text__label__button text-white">
            ایجاد
          </Typography>
        </LoadingButton>
      </DialogFooter>
    </>
  );
};

export default CreateRepoPublishLink;
