/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { IFile } from "cls-file-management";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useDeleteFile from "@hooks/files/useDeleteFile";
import useGetFiles from "@hooks/files/useGetFiles";
import useGetUser from "@hooks/auth/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import DocumentEnableUserGroup from "./documentEnableUserGroup";
import FileUpload from "@components/molecules/fileUpload";
import FileList from "../fileList";
import { selectedDocumentAtom } from "@atom/document";

const fileTablePageSize = 20;

const AttachFile = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: userInfo,
    refetch: refetchUser,
    isFetching: isFetchingUserInfo,
  } = useGetUser();

  const { data: files, refetch } = useGetFiles(
    getDocument!.id,
    getDocument!.attachmentUserGroup || "",
    fileTablePageSize,
    0 * fileTablePageSize
  );

  const deleteFile = useDeleteFile();

  const handleDeleteFile = (file: IFile) => {
    setIsLoading(true);
    if (getDocument && getRepo) {
      deleteFile.mutate({
        repoId: getRepo.id,
        resourceId: getDocument.id,
        fileHash: file.hash,
        type: "private",
        userGroupHash: getDocument.attachmentUserGroup || "",
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
    refetch();
  };

  const handleUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // setProcessCount(0);

    const token = userInfo?.access_token;
    if (!isFetchingUserInfo && token) {
      setIsLoading(true);

      const fileItem = file;
      const fileData = new FormData();
      fileData.append("file", fileItem, encodeURIComponent(fileItem.name));
      axios
        .put(
          `${process.env.NEXT_PUBLIC_CLASOR}/fileManagement/resource/${getDocument?.id}/userGroup/${getDocument?.attachmentUserGroup}`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
              Authorization: `Bearer ${token}`,
              _token_: token || "",
              _token_issuer_: "1",
            },
            onUploadProgress(progressEvent: AxiosProgressEvent) {
              if (progressEvent.total) {
                const process = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
               setProcessCount(process);
              }
            },
          }
        )
        .then(async (res: { data: { data: { result: { hash: string } } } }) => {
          if (res.data.data.result.hash) {
            onSuccess();
            setIsLoading(false);
          }
          queryClient.invalidateQueries({
            queryKey: [`getReport-${getDocument?.attachmentUserGroup}`],
          });
        })
        .catch((error: any) => {
          if (error?.response?.status === 401) {
            refetchUser();
          }
          toast.error("خطا در بارگذاری فایل");
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <DocumentEnableUserGroup />
      <div className="flex flex-col gap-6 justify-between px-6 py-4">
        {userInfo ? (
          <FileList
            files={
              files?.pages?.flatMap((page) => {
                return page?.list;
              }) || []
            }
            onDelete={handleDeleteFile}
            isDeleting={isLoading}
            userToken={userInfo?.access_token}
          />
        ) : null}
        {getDocument?.attachmentUserGroup ? (
          <FileUpload onUpload={handleUploadClick} progress={processCount} />
        ) : null}
      </div>
    </>
  );
};

export default AttachFile;
