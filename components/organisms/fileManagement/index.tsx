/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";
import { ClasorFileManagement, IFile } from "cls-file-management";
import FileManagementDialog from "@components/templates/dialog/fileManagementDialog";
import axios from "axios";
import { repoAtom } from "@atom/repository";
import { toast } from "react-toastify";
import useDeleteFile from "@hooks/files/useDeleteFile";
import useGetFiles from "@hooks/files/useGetFiles";
import useGetUser from "@hooks/auth/useGetUser";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import useRenameFile from "@hooks/files/useRenameFile";

const fileTablePageSize = 20;

interface IProps {
  setSelectedFile?: (
    file?: IFile | null | { name: string; extension: string; hash: string }
  ) => void;
  userGroupHash: string;
  resourceId: number;
  handleClose?: () => void;
  type: "private" | "public";
}

const Files = ({
  setSelectedFile,
  userGroupHash,
  resourceId,
  type,
  handleClose,
}: IProps) => {
  const [page, setPage] = useState<number>(0);
  const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState<string>();
  const [dataType, setDataType] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<IFile | null>(null);

  const queryClient = useQueryClient();
  const getRepo = useRecoilValue(repoAtom);
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
    page * fileTablePageSize,
    name,
    dataType
  );

  const renameHook = useRenameFile();
  const deleteFile = useDeleteFile();

  const handleDataType = useCallback((dtype: string) => {
    return setDataType(dtype);
  }, []);

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
          refetch();
        },
      });
    },
    [renameHook, resourceId, refetch]
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
          refetch();
        },
      });
    },
    [deleteFile, getRepo, resourceId, userGroupHash, type, refetch]
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
    setProcessCount(0);
    const token = userInfo?.access_token;

    if (token) {
      setIsLoading(true);

      const uploadFile = async (fileData: FormData | any) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/fileManagement/resource/${resourceId}/uploadLink`,
            {
              expireTime: (Date.now() + 3600 * 1000).toString(),
              userGroupHash,
              isPublic: false,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                _token_: token || "",
                _token_issuer_: "1",
              },
            }
          );

          if (response.data.data.uploadHash) {
            const uploadLink = response.data.data.uploadHash;
            try {
              const result = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/fileManagement/resource/${resourceId}/uploadLink/${uploadLink}`,
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

              if (result.data.data.result) {
                await onSuccess();
              }
            } catch (error: any) {
              if (error?.result?.status === 401) {
                refetchUser();
              }
              setIsError(true);
              toast.error("خطا در بارگذاری فایل");
            } finally {
              setIsLoading(false);
            }
          }

          queryClient.invalidateQueries({
            queryKey: [`getReport-${resourceId}`],
          });
        } catch (error: any) {
          if (error?.response?.status === 401) {
            refetchUser();
          }
          setIsError(true);
          toast.error("خطا در بارگذاری فایل");
        } finally {
          setIsLoading(false);
        }
      };

      try {
        if (showCropper) {
          await uploadFile(item);
        } else {
          const formData = new FormData();
          formData.append("file", item, encodeURIComponent(item.name));
          await uploadFile(formData);
        }
      } catch (error: any) {
        if (error?.response?.status === 401) {
          refetchUser();
        }
        setIsError(true);
        toast.error("آپلود ناموفق");
      }
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
      dialogClassName="flex flex-col !rounded-none shrink-0 !h-full w-full max-w-full md:!h-[80%] md:min-h-[80%] md:!w-[700px] md:!min-w-[700px] md:!max-w-[700px] lg:!w-[800px] lg:!min-w-[800px] lg:!max-w-[800px] bg-primary md:!rounded-lg"
      dialogBodyClassName="bg-secondary h-[calc(100vh-200px)] md:h-auto overflow-auto md:overflow-hidden p-5 flex-grow"
      dialogHeader="افزودن عکس"
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
        hasPreview={false}
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
        onSearchFile={(search?: string) => {
          setPage(0);
          setName(search);
        }}
      />
    </FileManagementDialog>
  );
};

export default Files;
