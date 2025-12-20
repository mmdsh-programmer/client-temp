/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { ChangeEvent, useState } from "react";
import FileUpload from "@components/molecules/fileUpload";
import axios from "axios";
import { toast } from "react-toastify";
import useGetFiles from "@hooks/files/useGetFiles";
import useGetUser from "@hooks/auth/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import useCreateUploadLink from "@hooks/files/useCreateUploadLink";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";
import FileItem from "@components/molecules/fileItem";

const fileTablePageSize = 20;

const AttachFile = ({ attachmentUserGroup }: { attachmentUserGroup: string }) => {
  const { selectedDocument: getDocument } = useDocumentStore();
  const [processCount, setProcessCount] = useState(0);

  const queryClient = useQueryClient();

  const { data: userInfo, refetch: refetchUser, isFetching: isFetchingUserInfo } = useGetUser();

  const {
    data: files,
    refetch,
    isLoading: isLoadingFiles,
  } = useGetFiles(getDocument!.id, attachmentUserGroup, fileTablePageSize);

  const createUploadLink = useCreateUploadLink();

  const onSuccess = () => {
    toast.success("آپلود موفق");
    refetch();
  };

  const handleUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const token = userInfo?.access_token;
    if (!isFetchingUserInfo && token) {

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
        isPublic: false,
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
                  const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setProcessCount(progress);
                },
              },
            );
            if (result.data.result) {
              await onSuccess();
            }
          } catch (error: any) {
            if (error?.result?.status === 401) {
              refetchUser();
            }
            toast.error("خطا در بارگذاری فایل");
          }
        },
      });

      queryClient.invalidateQueries({
        queryKey: [`getReport-${getDocument?.attachmentUserGroup}`],
      });
    }
  };

  const fileList =
    files?.pages?.flatMap((page) => {
      return page?.list;
    }) || [];

  return (
    <div className="flex h-full flex-col justify-between gap-6 px-6 py-4">
      {isLoadingFiles ? (
        <div className="flex h-full justify-center">
          <Spinner className="h-5 w-5 text-primary" />
        </div>
      ) : userInfo ? (
        <div className="flex h-[calc(100vh-320px)] flex-col gap-4 overflow-auto">
          {fileList.map((file) => {
            return <FileItem key={file.name} file={file} />;
          })}
        </div>
      ) : null}
      {getDocument?.attachmentUserGroup ? (
        <FileUpload onUpload={handleUploadClick} progress={processCount} />
      ) : null}
    </div>
  );
};

export default AttachFile;
