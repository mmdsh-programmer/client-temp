import React, { ChangeEvent, useState } from "react";
import { useRecoilValue } from "recoil";
// import { selectedDocumentAtom } from "@atom/document";
import useGetFiles from "@hooks/files/useGetFiles";
import { repoAtom } from "@atom/repository";
import { categoryShowAtom } from "@atom/category";
import useDeleteFile from "@hooks/files/useDeleteFile";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import { IFile } from "cls-file-management";
import DocumentEnableUserGroup from "./documentEnableUserGroup";
import FileUpload from "@components/molecules/fileUpload";
import FileList from "../fileList";

const fileTablePageSize = 20;

const AttachFile = () => {
  const getRepo = useRecoilValue(repoAtom);
  const getCategory = useRecoilValue(categoryShowAtom);
  // const getDocument = useRecoilValue(selectedDocumentAtom);
  // const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

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
    getCategory?.userGroupHash || getRepo?.userGroupHash || "",
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
        userGroupHash: getCategory.userGroupHash || getRepo.userGroupHash || "",
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
    // setIsError(false);
    refetch();
  };

  const handleUploadClick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // setProcessCount(0);
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
              // setProcessCount(process);
            },
          }
        )
        .then(async (res: any) => {
          if (res.data.data.result.hash) {
            onSuccess();
            setIsLoading(false);
          }
          queryClient.invalidateQueries({
            queryKey: [
              `getReport-${getCategory?.userGroupHash || getRepo?.userGroupHash}`,
            ],
          });
        })
        .catch(() => {
          toast.error("خطا در بارگذاری فایل");
          // setIsError(true);
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
                return page.list;
              }) || []
            }
            onDelete={handleDeleteFile}
            isDeleting={isLoading}
            userToken={userInfo?.access_token}
          />
        ) : null}
        <FileUpload onUpload={handleUploadClick} />
      </div>
    </>
  );
};

export default AttachFile;
