import React, { useState } from "react";
import {
  Checkbox,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { repoAtom, repositoryIdAtom } from "@atom/repository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DatePicker } from "zaman";
import LoadingButton from "@components/molecules/loadingButton";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { toast } from "react-toastify";
import useCreatePublishLink from "@hooks/publish/useCreatePublishLink";
import { useForm } from "react-hook-form";

interface IData {
  expireTime: number;
}

const CreateRepoPublishLink = () => {
  const [hasExpireTime, setHasExpireTime] = useState(false);

  const setRepositoryAtomId = useSetRecoilState(repositoryIdAtom);
  const getRepo = useRecoilValue(repoAtom);
  const createPublishLink = useCreatePublishLink();

  const form = useForm<{
    expireTime: number;
    password?: string;
  }>();

  const {
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
      expireTime:
        hasExpireTime && data.expireTime ? data.expireTime : undefined,
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
                <Typography className="text-primary font-medium text-[13px] leading-[19.5px] -tracking-[0.13px] ">
                  افزودن تاریخ انقضای لینک
                </Typography>
              }
              color="deep-purple"
              checked={hasExpireTime}
              onChange={() => {
                setHasExpireTime(!hasExpireTime);
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
          className="repo-create-publish-link__create-button bg-purple-normal hover:bg-purple-normal active:bg-purple-normal"
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
