import React, { useEffect, useState } from "react";
import { Checkbox, Typography } from "@material-tailwind/react";
import CreateDialog from "@components/templates/dialog/createDialog";
import { DatePicker } from "zaman";
import FormInput from "@components/atoms/input/formInput";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { publicRoleAtom } from "@atom/public";
import { repoAtom } from "@atom/repository";
import { repoShareSchema } from "@components/organisms/dialogs/repository/validation.yup";
import { toast } from "react-toastify";
import useCreatePublicLink from "@hooks/public/useCreatePublicLink";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRepo } from "@interface/repo.interface";

interface IData {
  expireTime: number;
  roleId: number;
  password?: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CreateRepoPublicLink = ({ setOpen }: IProps) => {
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const [hasPassword, setHasPassword] = useState(false);
  const getSelectedRoleId = useRecoilValue(publicRoleAtom);
  const createPublicLink = useCreatePublicLink();

  const form = useForm<{
    expireTime: number;
    roleId: number;
    password?: string;
  }>({ resolver: yupResolver(repoShareSchema) });

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (getSelectedRoleId) {
      setValue("roleId", getSelectedRoleId);
    }
  }, [getSelectedRoleId]);

  const submitCalendar = (selectedTime: onDatePickerChangePayload) => {
    setValue("expireTime", +new Date(selectedTime.value));
  };

  const handleOpen = () => {
    setOpen(false);
  };

  const handleReset = () => {
    reset();
    clearErrors();
  };

  const onSubmit = (data: IData) => {
    if (!getRepo || !getSelectedRoleId) {
      return null;
    }
    createPublicLink.mutate({
      repoId: getRepo.id,
      roleId: getSelectedRoleId,
      expireTime: data.expireTime,
      password: hasPassword ? data.password : undefined,
      callBack: (result) => {
        const objKey = Object.keys(result)[0];
        setRepo({ ...(getRepo as IRepo), [`${objKey}`]: result[objKey] });
        handleReset();
        toast.success("لينك انتشار برای مخزن با موفقيت ايجاد شد.");
        handleOpen();
      },
    });
  };

  return (
    <CreateDialog
      isPending={createPublicLink.isPending}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={() => {
        handleOpen();
      }}
      backToMain
      className=""
      dialogHeader="مدیریت لینک"
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
            containerProps={{ className: "-mr-3" }}
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
            inputClass="rounded-lg border-[1px] outline-none bg-gray-50 h-12 border-normal w-full !font-iranYekan placeholder:!font-iranYekan"
          />
          {errors.expireTime && (
            <Typography className="warning_text">
              {errors.expireTime?.message}
            </Typography>
          )}
        </div>
      </form>
    </CreateDialog>
  );
};

export default CreateRepoPublicLink;
