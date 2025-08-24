/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ChangeEvent, useState } from "react";
import FileList from "../fileList";
import FileUpload from "@components/molecules/fileUpload";
import { IFile } from "cls-file-management";
import axios from "axios";
import { toast } from "react-toastify";
import useDeleteFile from "@hooks/files/useDeleteFile";
import useGetFiles from "@hooks/files/useGetFiles";
import useGetUser from "@hooks/auth/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import useRepoId from "@hooks/custom/useRepoId";
import useCreateUploadLink from "@hooks/files/useCreateUploadLink";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";

const fileTablePageSize = 20;

const AttachFile = ({
  attachmentUserGroup,
}: {
  attachmentUserGroup: string;
}) => {
  const repoId = useRepoId();
  const { selectedDocument: getDocument } = useDocumentStore();
  const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: userInfo,
    refetch: refetchUser,
    isFetching: isFetchingUserInfo,
  } = useGetUser();

  const {
    data: files,
    refetch,
    isLoading: isLoadingFiles,
  } = useGetFiles(getDocument!.id, attachmentUserGroup, fileTablePageSize);

  const createUploadLink = useCreateUploadLink();
  const deleteFile = useDeleteFile();

  const handleDeleteFile = (file: IFile) => {
    setIsLoading(true);
    if (getDocument && repoId) {
      deleteFile.mutate({
        repoId,
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

    const token = userInfo?.access_token;
    if (!isFetchingUserInfo && token) {
      setIsLoading(true);

      const fileItem = file;
      const fileData = new FormData();
      fileData.append("file", fileItem, encodeURIComponent(fileItem.name));
      if (!getDocument?.attachmentUserGroup) {
        toast.error("یوزرگروپ سند یافت نشد.");
        return;
      }

      createUploadLink.mutate({
        resourceId: getDocument!.id,
        userGroupHash: getDocument.attachmentUserGroup,
        successCallBack: async (uploadHash) => {
          try {
            const result = await axios.post(
              `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${uploadHash}`,
              fileData,
              {
                headers: {
                  "Content-Type": "multipart/form-data;",
                  Authorization: `Bearer ${token}`,
                  _token_: token || "",
                  _token_issuer_: "1",
                },
                onUploadProgress(progressEvent: any) {
                  const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setProcessCount(progress);
                },
              }
            );
            if (result.data.result) {
              await onSuccess();
            }
          } catch (error: any) {
            if (error?.result?.status === 401) {
              refetchUser();
            }
            toast.error("خطا در بارگذاری فایل");
          } finally {
            setIsLoading(false);
          }
        },
      });

      queryClient.invalidateQueries({
        queryKey: [`getReport-${getDocument?.attachmentUserGroup}`],
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 justify-between px-6 py-4">
        {isLoadingFiles ? (
          <div className="h-full flex justify-center">
            <Spinner className="h-5 w-5 text-primary" />
          </div>
        ) : userInfo ? (
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
  );
};

export default AttachFile;
