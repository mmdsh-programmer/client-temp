import {
  Checkbox,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { repoAtom, repositoryIdAtom } from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { DatePicker } from "zaman";
import LoadingButton from "@components/molecules/loadingButton";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { toast } from "react-toastify";
import useCreatePublishLink from "@hooks/publish/useCreatePublishLink";
import { useForm } from "react-hook-form";

interface IData {
  expireTime?: number;
  password?: string;
  hasExpireTime: boolean;
}

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
    }
  }),
  password: yup.string().optional()
});

const CreateRepoPublishLink = () => {
  const setRepositoryAtomId = useSetRecoilState(repositoryIdAtom);
  const getRepo = useRecoilValue(repoAtom);
  const createPublishLink = useCreatePublishLink();

  const form = useForm<IData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      hasExpireTime: false
    }
  });

  const {
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const hasExpireTime = watch("hasExpireTime");

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
      expireTime: data.hasExpireTime && data.expireTime ? data.expireTime : undefined,
      password: undefined,
      callBack: () => {
        setRepositoryAtomId(getRepo.id);
        handleReset();
        toast.success("انتشار مخزن با موفقيت انجام شد.");
      },
    });
  };

  return (
    <>
      <DialogBody
        placeholder="dialog body publish-repo"
        className="repo-create-publish-link__dialog-body flex-grow px-5 py-3 xs:p-0 xs:pb-6"
      >
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <Checkbox
              crossOrigin="anonymous"
              label={
                <Typography className="text-primary_normal font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                  افزودن تاریخ انقضای لینک
                </Typography>
              }
              color="purple"
              checked={hasExpireTime}
              onChange={() => {
                setValue("hasExpireTime", !hasExpireTime);
              }}
              containerProps={{ className: "-mr-3" }}
              className="repo-create-publish-link__checkbox"
            />
            {hasExpireTime ? (
              <>
                <Typography className="label"> انتخاب تاریخ</Typography>
                <DatePicker
                  onChange={submitCalendar}
                  className="z-[999999] delay-200"
                  inputClass="datePicker__input rounded-lg border-[1px] outline-none bg-gray-50 h-12 border-normal w-full !font-iranYekan placeholder:!font-iranYekan"
                />
                {errors.expireTime && (
                  <Typography className="warning_text">
                    {errors.expireTime?.message}
                  </Typography>
                )}
              </>
            ) : null}
          </div>
        </form>
      </DialogBody>
      <DialogFooter
        placeholder="dialog footer"
        className="dialog-footer p-5 xs:p-0 xs:pt-6 flex gap-2 xs:gap-3 border-t-none xs:border-t-[0.5px] border-normal"
      >
        <LoadingButton
          className="repo-create-publish-link__create-button bg-primary-normal hover:bg-primary-normal active:bg-primary-normal"
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

