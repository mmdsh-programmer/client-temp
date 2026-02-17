import React, { ChangeEvent, useRef, useState } from "react";
import FileUploaderInput, { IFileUploaderInput } from "@components/organisms/fileUploader";
import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import TextareaAtom from "@components/atoms/textarea";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import useAddUserToFeedbackGroupHash from "@hooks/feedback/useAddUserToFeedbackGroupHash";
import useSendFeedback from "@hooks/feedback/useSendFeedback";
import { extractFileFromUnknown, validateBeforeUpload } from "@utils/uploadGuards";
import { IPodspaceResult } from "@interface/app.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { feedBackSchema } from "./validation.yup";
import { UploadIcon } from "@components/atoms/icons";

export interface IFileDetail {
  errorMessage?: string;
  inputFile: IFileUploaderInput | null;
  id: string;
  file: File | null;
}

interface IProps {
  trigger: React.ReactNode;
}

const FeedbackDialog = ({ trigger }: IProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<IFileDetail[] | null>(null);
  const fileIndex = useRef(0);

  const sendFeedBackHook = useSendFeedback();
  const addUserHook = useAddUserToFeedbackGroupHash();

  const form = useForm<{
    content: string;
    fileHashList?: { hash: string; fileName: string; fileExtension: string }[];
  }>({
    defaultValues: { fileHashList: [] },
    resolver: yupResolver(feedBackSchema),
  });
  const { register, handleSubmit, setValue, formState, getValues, reset } = form;
  const { errors } = formState;

  const handleClose = () => {
    setOpen(false);
    setFileInfo([]);
    reset();
  };

  const sendFeedBack = async () => {
    try {
      const data = getValues();
      await sendFeedBackHook.mutateAsync({
        ...data,
        fileHashList: data.fileHashList || [],
        callBack: () => {
          handleClose();
        },
      });
      toast.success("بازخورد شما با موفقیت ثبت شد.");
    } catch (error) {
      console.error("Error sending feedback:", error);
      toast.error("خطا در ثبت بازخورد مورد نظر.");
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      if (!fileInfo) {
        sendFeedBack();
        return;
      }

      const emptyFileIndex = fileInfo?.findIndex((f) => {
        return !f.inputFile?.isSet();
      });

      if (emptyFileIndex !== -1 && fileInfo.length > 1) {
        fileInfo[emptyFileIndex].errorMessage = "فایل مورد نظر را انتخاب کنید.";
        setFileInfo([...fileInfo]);
        return;
      }

      setLoading(true);

      await addUserHook.mutateAsync();

      for (const info of fileInfo) {
        info.inputFile?.start();
      }
    } catch {
      handleClose();
      setLoading(false);
    }
  };

  const checkAllIsReady = () => {
    if (!fileInfo) return;
    const fileHashList = getValues("fileHashList");
    if (fileHashList?.length === fileInfo.length) {
      sendFeedBack();
    }
  };

  const onUploadSuccess = (response: string) => {
    const res = JSON.parse(response);
    const { hash, name, extension } = res.result as IPodspaceResult;

    if (hash) {
      const fileHashList = getValues("fileHashList") || [];
      setValue("fileHashList", [
        ...fileHashList,
        { hash, fileName: name, fileExtension: extension },
      ]);
      checkAllIsReady();
    }
  };

  const handleDeleteFile = (file: File) => {
    const { name } = file;
    fileIndex.current -= 1;
    setFileInfo((oldValue) => {
      if (oldValue === null) return [];
      return oldValue.filter((fileResult) => {
        return fileResult.file?.name !== name;
      });
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target?.files?.[0];

    let fileToUpload = newFile;
    const file = await extractFileFromUnknown(newFile);
    if (file) {
      const { valid, message, sanitizedFile } = await validateBeforeUpload(file);
      if (!valid) {
        toast.error(message || "آپلود این فایل مجاز نیست");
        return;
      }
      if (sanitizedFile) {
        fileToUpload = sanitizedFile;
      }
    }

    if (fileToUpload) {
      fileIndex.current += 1;
      if (fileInfo) {
        setFileInfo([
          ...fileInfo,
          {
            inputFile: null,
            id: `${Date.now()}`,
            file: fileToUpload,
          },
        ]);
      } else {
        setFileInfo([
          {
            inputFile: null,
            id: `${Date.now()}`,
            file: fileToUpload,
          },
        ]);
      }
    }
  };

  return (
    <ConfirmFullHeightDialog
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      isPending={loading || sendFeedBackHook.isPending}
      dialogHeader="ارسال نظر و بازخورد"
      onSubmit={handleSubmit(onSubmit)}
      className="feedback__dialog xs:max-h-[600px]"
    >
      <form className="feedback__form flex flex-col gap-4">
        <div className="feedback__form-content flex flex-col gap-2">
          <Label className="form_label text-base font-medium text-primary_normal">
            متن بازخورد
          </Label>
          <TextareaAtom
            placeholder="لطفا متن خود را وارد کنید"
            {...register("content")}
            className="feedback__form-content-textarea"
          />
          {errors.content && (
            <span className="warning_text text-sm text-red-500">{errors.content?.message}</span>
          )}
        </div>
        {fileIndex.current < 6 ? (
          <div className="flex flex-col gap-4">
            <Label
              htmlFor="input-file"
              className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-[1px] border-normal hover:bg-gray-50"
            >
              <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg border-[1px] border-normal bg-white">
                <UploadIcon className="h-5 w-5 stroke-[#667585]" />
              </div>
              <div className="flex gap-[3px]">
                <span className="select_option__text text-sm font-medium text-[#0369CD]">
                  برای آپلود کلیک کنید
                </span>
              </div>
              <Input
                type="file"
                id="input-file"
                className="feedback__upload-file-input hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Label>
          </div>
        ) : null}
        <div className="feedback__form-file-list flex flex-col gap-2">
          <Label className="title_t3 text-sm font-medium text-hint">مشاهده همه فایل‌ها</Label>
          {fileInfo?.map((info, index) => {
            return (
              <FileUploaderInput
                key={info.id}
                uploadUrl={`${process.env.NEXT_PUBLIC_PODSPACE_API}/usergroups/${process.env.NEXT_PUBLIC_USERGROUP}/files`}
                onSuccess={onUploadSuccess}
                onDeleteFile={(file) => {
                  handleDeleteFile(file);
                }}
                uniqueId={info.id}
                file={info.file}
                errorMessage={fileInfo[index].errorMessage}
                ref={(ref) => {
                  if (fileInfo[index]) fileInfo[index].inputFile = ref;
                }}
              />
            );
          })}
        </div>
      </form>
    </ConfirmFullHeightDialog>
  );
};

export default FeedbackDialog;
