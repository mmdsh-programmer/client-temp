import { Checkbox, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import CreateDialog from "@components/templates/dialog/createDialog";
import { DatePicker } from "zaman";
import FormInput from "@components/atoms/input/formInput";
import { IRepo } from "@interface/repo.interface";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { publicRoleAtom } from "@atom/public";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useCreatePublicLink from "@hooks/public/useCreatePublicLink";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  hasExpireTime: yup.boolean().required(),
  expireTime: yup.number().when("hasExpireTime", {
    is: true,
    then: (schema) => {
      return schema
        .required("تاریخ انقضا الزامی است")
        .test("is-future-date", "تاریخ انتخاب شده نمی‌تواند قبل از امروز باشد", (value) => {
          if (!value) return true;
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate >= today;
        });
    },
    otherwise: (schema) => {
      return schema.nullable();
    },
  }),
  password: yup.string().optional(),
  roleId: yup.number().required(),
});

interface IData {
  expireTime?: number;
  roleId: number;
  password?: string;
  hasExpireTime: boolean;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CreateRepoPublicLink = ({ setOpen }: IProps) => {
  const [hasPassword, setHasPassword] = useState(false);
  const [getRepo, setRepo] = useRecoilState(repoAtom);
  const getSelectedRoleId = useRecoilValue(publicRoleAtom);
  const createPublicLink = useCreatePublicLink();

  const form = useForm<IData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      hasExpireTime: false,
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const hasExpireTime = watch("hasExpireTime");

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
      expireTime: hasExpireTime && data.expireTime ? data.expireTime : undefined,
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
      className="repo-create-public-link-dialog"
      dialogHeader="مدیریت لینک"
    >
      <form
        className="repo-create-public-link-form flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Checkbox
            crossOrigin="anonymous"
            label={
              <Typography className="text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal ">
                افزودن رمز عبور
              </Typography>
            }
            color="purple"
            checked={hasPassword}
            onChange={() => {
              setHasPassword(!hasPassword);
            }}
            containerProps={{ className: "-mr-3" }}
            className="repo-create-public-link-form__add-password-checkbox"
          />
          {hasPassword && (
            <>
              <Typography className="label">رمز عبور</Typography>
              <FormInput
                type="password"
                register={{ ...register("password") }}
                className="repo-create-public-link-form__password-input"
              />
              {errors.password && (
                <Typography className="warning_text">{errors.password?.message}</Typography>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Checkbox
            crossOrigin="anonymous"
            label={
              <Typography className="text-primary_normal_normal text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] ">
                افزودن تاریخ انقضای لینک
              </Typography>
            }
            color="purple"
            checked={hasExpireTime}
            onChange={() => {
              setValue("hasExpireTime", !hasExpireTime);
            }}
            containerProps={{ className: "-mr-3" }}
            className="repo-create-public-link-form__add-expire-time-checkbox"
          />
          {hasExpireTime ? (
            <>
              <Typography className="label"> انتخاب تاریخ</Typography>
              <DatePicker
                onChange={submitCalendar}
                className="repo-create-public-link-form__date-picker z-[999999] delay-200"
                inputClass="datePicker__input rounded-lg border-[1px] outline-none bg-gray-50 h-12 border-normal w-full !font-iranYekan placeholder:!font-iranYekan"
              />
              {errors.expireTime && (
                <Typography className="warning_text">{errors.expireTime?.message}</Typography>
              )}
            </>
          ) : null}
        </div>
      </form>
    </CreateDialog>
  );
};

export default CreateRepoPublicLink;
