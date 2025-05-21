import React, { useState } from "react";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
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
import { CopyIcon } from "@components/atoms/icons";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

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
            color="deep-purple"
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
          <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Typography className="form_label"> لینک منتشرشده سند</Typography>
            <div className="flex h-10 flex-grow items-center justify-between gap-2 overflow-hidden rounded-lg border-[1px] border-normal bg-gray-50 pl-2 pr-3">
              <Typography
                className="font-300 w-full cursor-pointer truncate text-sm text-placeholder"
                dir="ltr"
              >
                {toPersianDigit(
                  `${window.location.origin}/share/${toPersianDigit(
                    `${getRepo?.name.replaceAll(/\s+/g, "-")}`,
                  )}/${getRepo?.id}/${document?.name.replaceAll(/\s+/g, "-")}/${document?.id}`,
                )}
              </Typography>
              <div className="flex items-center">
                <Button
                  className="repo-link-wrapper__copy-link-button h-7 w-8 rounded-none bg-white p-0"
                  onClick={() => {
                    const url = toPersianDigit(
                      `${window.location.origin}/share/${toPersianDigit(
                        `${getRepo?.name.replaceAll(/\s+/g, "-")}`,
                      )}/${getRepo?.id}/${document?.name.replaceAll(/\s+/g, "-")}/${document?.id}`,
                    );
                    copy(url);
                    toast.success("لینک مخزن کپی شد");
                  }}
                >
                  <CopyIcon className="h-4 w-4 fill-icon-active" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            className="text__label__button w-fit bg-transparent p-0 !text-[12px] text-[#0C8CE9]"
            onClick={() => {
              const url = toPersianDigit(
                `/share/${toPersianDigit(
                  `${getRepo?.name.replaceAll(/\s+/g, "-")}`,
                )}/${getRepo?.id}/${document?.name.replaceAll(/\s+/g, "-")}/${document?.id}`,
              );
              window.open(url, "_blank");
            }}
          >
            ورود به صفحه سند منتشرشده
          </Button>
          </div>
        ) : null}
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default DocumentCreatePublishLinkDialog;
