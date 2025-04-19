import FileUploaderInput, {
  IFileUploaderInput,
} from "@components/organisms/fileUploader";
import React, { ChangeEvent, useRef, useState } from "react";

import ConfirmFullHeightDialog from "@components/templates/dialog/confirmFullHeightDialog";
import { IPodspaceResult } from "@interface/app.interface";
import TextareaAtom from "@components/atoms/textarea/textarea";
import { Typography } from "@material-tailwind/react";
import { UploadIcon } from "@components/atoms/icons";
import { feedBackSchema } from "./validation.yup";
import { toast } from "react-toastify";
import useAddUserToFeedbackGroupHash from "@hooks/feedback/useAddUserToFeedbackGroupHash";
import { useForm } from "react-hook-form";
import useSendFeedback from "@hooks/feedback/useSendFeedback";
import { yupResolver } from "@hookform/resolvers/yup";

export interface IFileDetail {
  errorMessage?: string;
  inputFile: IFileUploaderInput | null;
  id: string;
  file: File | null;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedbackDialog = ({ setOpen }: IProps) => {
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
  const { register, handleSubmit, setValue, formState, getValues, reset } =
    form;
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
        fileHashList: data.fileHashList || [], // Ensure fileHashList is always an array
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target?.files?.[0];
    if (newFile) {
      fileIndex.current += 1;
      if (fileInfo) {
        setFileInfo([
          ...fileInfo,
          {
            inputFile: null,
            id: `${Date.now()}`,
            file: newFile,
          },
        ]);
      } else {
        setFileInfo([
          {
            inputFile: null,
            id: `${Date.now()}`,
            file: newFile,
          },
        ]);
      }
    }
  };

  return (
    <ConfirmFullHeightDialog
      isPending={loading || sendFeedBackHook.isPending}
      dialogHeader="ارسال نظر و بازخورد"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={setOpen}
      className="feedback__dialog xs:max-h-[600px]"
    >
      <form className="feedback__form flex flex-col gap-4 ">
        <div className="feedback__form-content flex flex-col gap-2">
          <Typography className="form_label text-primary_normal"> متن بازخورد</Typography>
          <TextareaAtom
            placeholder="لطفا متن خود را وارد کنید"
            register={{ ...register("content") }}
            className="feedback__form-content-textarea"
          />
          {errors.content && (
            <Typography className="warning_text">
              {errors.content?.message}
            </Typography>
          )}
        </div>
        {fileIndex.current < 6 ? (
          <div className="flex flex-col gap-4 ">
            <label
              htmlFor="input-file"
              className="h-[150px] flex flex-col gap-2 justify-center items-center rounded-lg border-normal border-[1px] cursor-pointer"
            >
              <div className="h-10 w-10 flex flex-col justify-center items-center rounded-lg border-normal border-[1px]">
                <UploadIcon className="h-5 w-5" />
              </div>
              <div className="flex gap-[3px]">
                <Typography className="select_option__text text-primary_normal">
                  برای آپلود کلیک کنید
                </Typography>
                <Typography className="select_option__text">
                  یا بکشید و رها کنید
                </Typography>
              </div>
              <input
                type="file"
                id="input-file"
                className="feedback__upload-file-input hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>
        ) : null}
        <div className="feedback__form-file-list flex flex-col gap-2">
          <Typography className="title_t3 text-hint">
            مشاهده همه فایل‌ها
          </Typography>
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
