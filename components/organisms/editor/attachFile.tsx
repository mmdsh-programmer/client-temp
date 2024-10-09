/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { selectedDocumentAtom } from "@atom/document";
// import DocumentEnableUserGroup from "./documentEnableUserGroup";
import useGetFiles from "@hooks/files/useGetFiles";
import { repoAtom } from "@atom/repository";
import { categoryShowAtom } from "@atom/category";
import useDeleteFile from "@hooks/files/useDeleteFile";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { IFile } from "cls-file-management";
import { DeleteIcon, DownloadIcon } from "@components/atoms/icons";

const fileTablePageSize = 20;

const AttachFile = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryShowAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: userInfo,
    refetch: refetchUser,
    isFetching: isFetchingUserInfo,
  } = useGetUser();

  const {
    data: files,
    isFetching,
    refetch,
    fetchNextPage,
  } = useGetFiles(
    getCategory ? getCategory!.id : getRepo!.id,
    getCategory?.userGroupHash ||(getRepo?.userGroupHash || ""),
    fileTablePageSize,
    0 * fileTablePageSize
  );

  const deleteFile = useDeleteFile();

  const handleDeleteFile = (file: IFile) => {
    setIsLoading(true);
    if (getCategory && getRepo) {
      deleteFile.mutate({
        repoId: getRepo?.id,
        resourceId: getCategory ? getCategory.id : getRepo.id,
        fileHash: file.hash,
        type: getCategory ? "private" : "public",
        userGroupHash: getCategory.userGroupHash || getRepo.userGroupHash|| "",
        callBack: () => {
          setIsLoading(false);
          refetch();
        },
      });
    }
  };

  const onSuccess = () => {
    toast.success("آپلود موفق");
    setIsLoading(false);
    setIsError(false);
    refetch();
  };

  const onUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setProcessCount(0);
    refetchUser();
    const token = userInfo?.access_token;
    if (!isFetchingUserInfo && token) {
      setIsLoading(true);

      const fileItem = file;
      const fileData = new FormData();
      fileData.append("file", fileItem, encodeURIComponent(fileItem.name));
      axios
        .put(
          `${process.env.NEXT_PUBLIC_CLASOR}/fileManagement/resource/${getCategory?.id || getRepo?.id}/userGroup/${getCategory?.userGroupHash || getRepo?.userGroupHash}`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
              Authorization: `Bearer ${token}`,
              _token_: token || "",
              _token_issuer_: "1",
            },
            onUploadProgress(progressEvent: any) {
              const process = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProcessCount(process);
            },
          }
        )
        .then(async (res: any) => {
          if (res.data.data.result.hash) {
            onSuccess();
            setIsLoading(false);
          }
          queryClient.invalidateQueries({
            queryKey: [`getReport-${getCategory?.userGroupHash || getRepo?.userGroupHash}`],
          });
        })
        .catch(() => {
          toast.error("خطا در بارگذاری فایل");
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {/* <DocumentEnableUserGroup /> */}
      <div className="flex flex-col h-full justify-between px-6 py-4">
        <div>
          {files?.pages.map((page) => {
            return page.list.map((file) => {
              const fileSizeInKB = file.size / 1000;
              const fileSizeInMB = fileSizeInKB
                ? fileSizeInKB / 1000
                : undefined;
              return (
                <div
                  key={file.name}
                  className={` w-full flex justify-between items-center p-4 rounded-lg border-normal border-[1px]
                
                `}
                >
                  <div className="flex flex-col flex-grow items-start max-w-[90%]">
                    <Typography
                      className="title_t2 text-primary truncate max-w-full"
                      dir="ltr"
                    >
                      {file.name}
                    </Typography>
                    <div className="flex items-center gap-1">
                      <a
                        className="p-0 bg-transparent"
                        download
                        href={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${
                          file.hash
                        }?&checkUserGroupAccess=true&Authorization=${userInfo?.access_token}&time=${Date.now()}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <DownloadIcon className="h-5 w-5 pt-1" />
                      </a>
                      <Typography className="title_t4 flex justify-end text-hint">
                        {fileSizeInKB < 1000
                          ? `${fileSizeInKB.toFixed(2)} کیلوبایت`
                          : `${fileSizeInMB?.toFixed(2)} مگابایت`}
                      </Typography>
                    </div>
                  </div>
                  <Button
                    className="bg-transparent p-0"
                    onClick={() => {
                        return handleDeleteFile?.(file);
                    }}
                    disabled={processCount > 0}
                  >
                    <DeleteIcon className="h-5 w-5 fill-icon-hover" />
                  </Button>
                </div>
              );
            });
          })}
        </div>

        <label
          htmlFor="input-file"
          className=" gap-2 justify-center items-center rounded-lg border-normal border-[1px] cursor-pointer"
        >
          <div className="!w-full !h-12 flex justify-center items-center bg-purple-light rounded-lg hover:bg-purple-light active:bg-purple-light">
            <Typography className="text__label__button text-purple-normal">
              بارگذاری فایل ضمیمه
            </Typography>
          </div>
          <input
            type="file"
            id="input-file"
            className="hidden"
            onChange={onUploadClick}
            accept="image/*"
          />
        </label>
      </div>
    </>
  );
};

export default AttachFile;
