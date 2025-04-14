import React, { useState } from "react";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { Checkbox, Typography } from "@material-tailwind/react";
import { categoryAtom } from "@atom/category";
import { selectedDocumentAtom } from "@atom/document";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { DatePicker } from "zaman";
import { onDatePickerChangePayload } from "zaman/dist/types";
import useCreateDocumentPublishLink from "@hooks/document/useCreateDocumentPublishLink";
import useRepoId from "@hooks/custom/useRepoId";

interface IProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IDataForm {
    expireTime?: number;
}

const DocumentCreatePublishLinkDialog = ({ setOpen }: IProps) => {
    const [hasExpireTime, setHasExpireTime] = useState(false);

    const repoId = useRepoId();
    const getCategory = useRecoilValue(categoryAtom);
    const document = useRecoilValue(selectedDocumentAtom);

    const createPublishLink = useCreateDocumentPublishLink();

    const form = useForm<IDataForm>();
    const { handleSubmit, formState, reset, clearErrors, setValue } =
        form;
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
                handleClose();
            }
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
                                <Typography className="warning_text">
                                    {errors.expireTime?.message}
                                </Typography>
                            )}
                        </>
                    ) : null}
                </div>
            </form>
        </ConfirmFullHeightDialog>
    );
};

export default DocumentCreatePublishLinkDialog;
