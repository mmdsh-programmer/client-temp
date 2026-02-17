import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import { DeleteIcon, ReloadIcon, TickIcon } from "@components/atoms/icons";

import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  uploadUrl: string;
  onSuccess: (result: string) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  file: File | null;
  uniqueId?: string;
  label?: string;
  fileName?: string;
  errorMessage?: string;
  onDeleteFile?: (file: File) => void;
}

export interface IFileUploaderInput {
  isSet: () => File | null;
  start: () => void;
  remove: () => void;
  reset: () => void;
}

const FileUploaderInput = (props: IProps, ref: Ref<IFileUploaderInput>) => {
  const {
    label,
    fileName,
    uniqueId,
    errorMessage,
    uploadUrl,
    onSuccess,
    onError,
    onCancel,
    file,
    onDeleteFile,
  } = props;
  const xhrRef = useRef<XMLHttpRequest | undefined>(undefined);
  const timeoutRef = useRef(0);
  const [progress, setProgress] = useState<number>(0);
  const [failed, setFailed] = useState<string | null>(null);

  const { data: userInfo, refetch } = useGetUser();
  const onProgress = (e: any) => {
    const contentLength = e.lengthComputable
      ? e.total
      : Number.parseInt(e.target.getResponseHeader("x-decompressed-content-length"), 10);

    const progressUpload = e.loaded / contentLength;
    setProgress(Math.round(progressUpload * 100));
  };

  const handleError = () => {
    setFailed("خطا در بارگذاری");
    if (onError) {
      onError(new Error("Upload failed"));
    }
  };

  const handleCancelUpload = () => {
    timeoutRef.current = window.setTimeout(() => {
      setProgress(0);
      if (xhrRef.current) {
        xhrRef.current.abort();
      }
      onCancel?.();
    }, 100);
  };

  const handleStart = async () => {
    if (!file) {
      return;
    }
    refetch();
    xhrRef.current = new XMLHttpRequest();
    xhrRef.current.upload.addEventListener("progress", onProgress);
    xhrRef.current.upload.addEventListener("error", handleError);
    xhrRef.current.upload.addEventListener("abort", handleCancelUpload);

    xhrRef.current.addEventListener("readystatechange", () => {
      if (xhrRef.current) {
        const { readyState, status } = xhrRef.current;
        if (readyState === 4) {
          if (status === 200) {
            const { response } = xhrRef.current;
            onSuccess(response);
          } else {
            handleError();
          }
        }
      }
    });

    const formData = new FormData();

    xhrRef.current.open("POST", uploadUrl, true);

    const extension = ".png";
    const newFile = new File([file], fileName ? `${fileName}.${extension}` : file.name);

    formData.append("file", newFile);

    xhrRef.current.setRequestHeader("Authorization", `Bearer ${userInfo?.access_token}`);
    xhrRef.current.send(formData);
  };

  useImperativeHandle(ref, () => {
    return {
      isSet() {
        return file;
      },
      async start() {
        handleStart();
      },
      remove() {},
      reset: () => {
        timeoutRef.current = 0;
        setFailed(null);
      },
    };
  });

  const retryUpload = () => {
    setFailed(null);
    handleStart();
  };

  const getButtonJsx = () => {
    if (!file) return;

    const fileSizeInKB = file.size / 1000;
    const fileSizeInMB = fileSizeInKB ? fileSizeInKB / 1000 : undefined;
    return (
      <div
        key={file.name}
        className={`file-${uniqueId ? `-${uniqueId}` : ""} relative flex w-full items-center justify-between overflow-hidden rounded-lg border border-border p-4`}
      >
        {progress > 0 && (
          <div className="absolute inset-0">
            <Progress value={progress} className="h-full rounded-none" />
          </div>
        )}
        {/*  eslint-disable-next-line no-nested-ternary */}
        <div className="relative z-10">
          {failed ? (
            <Button
              size="icon"
              variant="ghost"
              className="uploaded-file__retry-button h-6 w-6"
              onClick={retryUpload}
            >
              <ReloadIcon className="h-6 w-6" />
            </Button>
          ) : progress && progress === 100 ? (
            <Button
              size="icon"
              variant="ghost"
              className="uploaded-file__success-button h-6 w-6"
              disabled
            >
              <TickIcon className="h-5 w-5 fill-[#249e00]" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              className="uploaded-file__delete-button h-5 w-5"
              onClick={() => {
                return onDeleteFile?.(file);
              }}
              disabled={progress > 0}
            >
              <DeleteIcon className="h-5 w-5 fill-icon-hover" />
            </Button>
          )}
        </div>
        <div className="uploaded-file__file-info relative z-10 ml-4 flex max-w-[90%] flex-grow flex-col items-end">
          <p
            className="uploaded-file__file-name title_t2 max-w-full truncate text-primary_normal"
            dir="ltr"
          >
            {file.name}
          </p>
          <p className="uploaded-file__file-size title_t4 flex justify-end text-hint">
            {fileSizeInKB < 1000
              ? `${fileSizeInKB.toFixed(2)} کیلوبایت`
              : `${fileSizeInMB?.toFixed(2)} مگابایت`}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      if (xhrRef.current) {
        xhrRef.current.upload.removeEventListener("progress", onProgress);
        if (onError) {
          xhrRef.current.upload.removeEventListener("error", handleError);
        }
        if (onCancel) {
          xhrRef.current.upload.removeEventListener("abort", onCancel);
        }
        xhrRef.current.onreadystatechange = null;
        xhrRef.current.abort();
      }
    };
  }, []);
  return (
    <div className="uploaded-file flex w-full flex-col">
      <div className="uploaded-file__item flex w-full flex-col">
        {label ? (
          <label className="uploaded-file__label w-full text-base font-bold">{label}</label>
        ) : null}
        <div className="uploaded-file__info btn-group relative flex w-full items-center">
          {getButtonJsx()}
        </div>
      </div>
      <p className="warning_text text-sm">{failed || errorMessage || " "}</p>
    </div>
  );
};

export default React.forwardRef(FileUploaderInput);
