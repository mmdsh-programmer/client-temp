/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClasorFileManagement } from "cls-file-management";
import React, { useCallback, useState } from "react";
import FileManagementDialog from "@components/templates/dialog/fileManagementDialog";
import axios from "axios";
import { toast } from "react-toastify";
import useCreateUploadLink from "@hooks/files/useCreateUploadLink";
import useDeleteFile from "@hooks/files/useDeleteFile";
import useGetFiles from "@hooks/files/useGetFiles";
import useGetUser from "@hooks/auth/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import useRenameFile from "@hooks/files/useRenameFile";
import { useRepositoryStore } from "@store/repository";
import { IFile } from "@interface/file.interface";
import useRepoPublicFile from "@hooks/files/useRepoPublicFile";

const fileTablePageSize = 20;

interface IProps {
  setSelectedFile?: (
    file?: IFile | null | { name: string; extension: string; hash: string },
  ) => void;
  userGroupHash: string;
  resourceId: number;
  handleClose?: () => void;
  type: "private" | "public";
  dialogHeader?: string;
  hasPreview?: boolean
}

const Files = ({
  setSelectedFile,
  userGroupHash,
  resourceId,
  type,
  handleClose,
  dialogHeader,
  hasPreview
}: IProps) => {
  const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState<string>();
  const [dataType, setDataType] = useState<{
    order: "NAME" | "CREATED" | "UPDATED" | "SIZE" | "TYPE" | null;
    isDesc: boolean;
  }>({ order: "CREATED", isDesc: true });
  const [selectedImage, setSelectedImage] = useState<IFile | null>(null);

  const queryClient = useQueryClient();
  const getRepo = useRepositoryStore((state) => {
    return state.repo;
  });
  const { data: userInfo, refetch: refetchUser } = useGetUser();

  const {
    data: files,
    isFetching,
    refetch,
    fetchNextPage,
  } = useGetFiles(
    resourceId,
    userGroupHash,
    fileTablePageSize,
    name,
    dataType.order,
    dataType.isDesc,
  );

  const createUploadLink = useCreateUploadLink();
  const renameHook = useRenameFile();
  const deleteFile = useDeleteFile();
  const repoPublicFile = useRepoPublicFile();

  const handleDataType = useCallback(
    (params: {
      order: "NAME" | "CREATED" | "UPDATED" | "SIZE" | "TYPE" | null;
      isDesc: boolean;
    }) => {
      const { isDesc, order } = params;
      return setDataType({ order, isDesc });
    },
    [],
  );

  const handlePublicFile = useCallback(
    (file: IFile) => {
      setIsLoading(true);
      repoPublicFile.mutate({
        repoId: getRepo!.id,
        userGroupHash,
        hashList: [file.hash],
        callBack: () => {
          setIsLoading(false);
          queryClient.invalidateQueries({
            queryKey: [`getFiles-${userGroupHash}`],
          });
        },
      });
    },
    [deleteFile, getRepo, resourceId, userGroupHash, type, refetch],
  );

  const handleRenameFile = useCallback(
    (file: IFile, newName: string) => {
      setIsLoading(true);
      renameHook.mutate({
        newName,
        resourceId,
        hash: file.hash,
        userGroupHash: file.parentHash,
        callBack: () => {
          setIsLoading(false);
          queryClient.invalidateQueries({
            queryKey: [`getFiles-${userGroupHash}`],
          });
        },
      });
    },
    [renameHook, resourceId, refetch],
  );

  const handleDeleteFile = useCallback(
    (file: IFile) => {
      setIsLoading(true);
      deleteFile.mutate({
        repoId: getRepo!.id,
        resourceId,
        userGroupHash,
        fileHash: file.hash,
        type,
        callBack: () => {
          setIsLoading(false);
          queryClient.invalidateQueries({
            queryKey: [`getFiles-${userGroupHash}`],
          });
        },
      });
    },
    [deleteFile, getRepo, resourceId, userGroupHash, type, refetch],
  );

  const handleFetchNextPage = useCallback(() => {
    return fetchNextPage();
  }, [fetchNextPage]);

  const onSuccess = useCallback(() => {
    toast.success("آپلود موفق");
    setIsLoading(false);
    setIsError(false);
    refetch();
  }, [refetch]);

  const handleUploadFile = async (item: any, showCropper: boolean) => {
    const token = userInfo?.access_token;

    if (!token) {
      toast.error("توکن نامعتبر است");
      return;
    }

    setProcessCount(0);
    setIsLoading(true);

    const uploadFile = async (fileData: FormData | any) => {
      createUploadLink.mutate({
        resourceId,
        userGroupHash,
        isPublic: false,
        successCallBack: async (uploadHash) => {
          try {
            const result = await axios.post(
              `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${uploadHash}`,
              fileData,
              {
                headers: {
                  "Content-Type": "multipart/form-data;",
                },
                onUploadProgress(progressEvent: any) {
                  const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                  setProcessCount(progress);
                },
              },
            );
            if (result.data.result) {
              onSuccess();
              queryClient.invalidateQueries({
                queryKey: [`getReport-${resourceId}`],
              });
            }
          } catch (error: any) {
            setIsError(true);
            toast.error("خطا در بارگذاری فایل");
          } finally {
            setIsLoading(false);
          }
        },
      });
    };

    try {
      if (showCropper) {
        await uploadFile(item);
      } else {
        const formData = new FormData();
        formData.append("file", item, item.name);
        await uploadFile(formData);
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        refetchUser();
      }
      setIsError(true);
      toast.error("آپلود ناموفق");
      setIsError(false);
    }
  };

  const generateDownloadLink = (file: IFile) => {
    return `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${file.hash}?&checkUserGroupAccess=true&Authorization=${userInfo?.access_token}&time=${Date.now()}`;
  };

  const handleSelect = () => {
    // const fileExtension = selectedImage?.extension.toLowerCase();
    // const imageExtensions = ["png", "jpg", "jfif", "svg"];
    setSelectedFile?.(selectedImage);
    handleClose?.();

    // if (fileExtension && imageExtensions.includes(fileExtension)) {
    // } else {
    //   toast.error("فایل انتخاب شده از نوع عکس نمی باشد.");
    // }
  };

  return (
    <FileManagementDialog
      dialogClassName="flex flex-col !rounded-none shrink-0 !h-dvh w-full max-w-full md:!h-[80%] md:min-h-[80%] md:!w-[700px] md:!min-w-[700px] md:!max-w-[700px] lg:!w-[800px] lg:!min-w-[800px] lg:!max-w-[800px] bg-primary md:!rounded-lg"
      dialogBodyClassName="bg-white h-[calc(100dvh-200px)] md:h-auto overflow-auto md:overflow-hidden p-5 flex-grow"
      dialogHeader={`${dialogHeader || "افزودن عکس"}`}
      setOpen={() => {
        return handleClose?.();
      }}
      handleSelect={handleSelect}
    >
      <ClasorFileManagement
        files={files}
        cropMode={false}
        isFetching={isFetching}
        isLoading={isLoading}
        isError={isError}
        hasPreview={hasPreview || false}
        processCount={processCount}
        onSelectFile={(file: IFile) => {
          setSelectedImage(file);
        }}
        getDataType={handleDataType}
        generateDownloadLink={generateDownloadLink}
        onFetchNextPage={handleFetchNextPage}
        onRenameFile={handleRenameFile}
        onDeleteFile={handleDeleteFile}
        onUploadFile={handleUploadFile}
        onPublicFile={handlePublicFile}
        onSearchFile={(search?: string) => {
          setName(search);
        }}
      />
    </FileManagementDialog>
  );
};

export default Files;
