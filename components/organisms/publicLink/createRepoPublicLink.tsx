import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import { DatePicker } from "zaman";
import FormInput from "@components/atoms/input/formInput";
import { IRepo } from "@interface/repo.interface";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { toast } from "react-toastify";
import useCreatePublicLink from "@hooks/public/useCreatePublicLink";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "@components/atoms/checkbox";
import { useRepositoryStore } from "@store/repository";
import { usePublicStore } from "@store/public";

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
  const { repo: getRepo, setRepo } = useRepositoryStore();
  const getSelectedRoleId = usePublicStore((state) => {
    return state.publicRole;
  });
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
            label="افزودن رمز عبور"
            checked={hasPassword}
            onChange={() => {
              setHasPassword(!hasPassword);
            }}
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
            label="افزودن تاریخ انقضای لینک"
            checked={hasExpireTime}
            onChange={() => {
              setValue("hasExpireTime", !hasExpireTime);
            }}
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
