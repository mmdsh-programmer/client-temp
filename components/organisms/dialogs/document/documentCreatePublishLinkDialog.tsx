import { Checkbox, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { DatePicker } from "zaman";
import { categoryAtom } from "@atom/category";
import { onDatePickerChangePayload } from "zaman/dist/types";
import { selectedDocumentAtom } from "@atom/document";
import useCreateDocumentPublishLink from "@hooks/document/useCreateDocumentPublishLink";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import useRepoId from "@hooks/custom/useRepoId";
import { toPersianDigit } from "@utils/index";
import { repoAtom } from "@atom/repository";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
  expireTime?: number;
}

const DocumentCreatePublishLinkDialog = ({ setOpen }: IProps) => {
  const [hasExpireTime, setHasExpireTime] = useState(false);
  const [isCreateLink, setIsCreateLink] = useState(false);

  const getRepo = useRecoilValue(repoAtom);

  const repoId = useRepoId();
  const getCategory = useRecoilValue(categoryAtom);
  const document = useRecoilValue(selectedDocumentAtom);

  const createPublishLink = useCreateDocumentPublishLink();

  const form = useForm<IDataForm>();
  const { handleSubmit, formState, reset, clearErrors, setValue } = form;
  const { errors } = formState;

  const handleClose = () => {
    reset();
    clearErrors();
    setOpen(false);
  };

  const submitCalendar = (selectedTime: onDatePickerChangePayload) => {
    setValue("expireTime", +new Date(selectedTime.value));
  };

  const onSubmit = (dataForm: IDataForm) => {
    if (!repoId || !document) {
      return null;
    }
    createPublishLink.mutate({
      repoId,
      categoryId: getCategory?.id,
      documentId: document.id,
      expireTime: hasExpireTime ? dataForm.expireTime : undefined,
      callBack: () => {
        return setIsCreateLink(true);
      },
    });
  };

  return (
    <ConfirmFullHeightDialog
      isPending={createPublishLink.isPending}
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      dialogHeader="ایجاد لینک انتشار"
      className="create-publish-link-dialog"
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Checkbox
            crossOrigin="anonymous"
            label={
              <Typography className="text-[13px] font-medium leading-[19.5px] -tracking-[0.13px] text-primary_normal ">
                افزودن تاریخ انقضای لینک
              </Typography>
            }
            color="purple"
            checked={hasExpireTime}
            onChange={() => {
              setHasExpireTime(!hasExpireTime);
            }}
            containerProps={{ className: "-mr-3" }}
            className="expire-time__checkbox"
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
                <Typography className="warning_text">{errors.expireTime?.message}</Typography>
              )}
            </>
          ) : null}
        </div>
        {isCreateLink ? (
          <div
            className="text__label__button !text-[10px] text-[#0C8CE9] cursor-pointer"
            onClick={() => {
              const url = toPersianDigit(
                `/share/${toPersianDigit(
                  `${getRepo?.name.replaceAll(/\s+/g, "-")}`,
                )}/${getRepo?.id}/${document?.name.replaceAll(/\s+/g, "-")}/${document?.id}`,
              );
              window.open(url, "_blank");
            }}
          >
            لینک منتشرشده سند
          </div>
        ) : null}
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentCreatePublishLinkDialog;
