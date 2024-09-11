import React, { useState } from "react";
import useDeleteFile from "@hooks/files/useDeleteFile";
import useGetFiles from "@hooks/files/useGetFiles";
import useRenameFile from "@hooks/files/useRenameFile";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ClasorFileManagement, IFile } from "cls-file-management";
import useGetUser from "@hooks/auth/useGetUser";
import { useRecoilValue } from "recoil";
import { repoAtom } from "@atom/repository";
import FileManagementDialog from "@components/templates/dialog/fileManagementDialog";

const fileTablePageSize = 20;
interface IProps {
  setSelectedFile?: (file: IFile | null) => void;
  userGroupHash: string;
  resourceId: number;
  type: "private" | "public";
  handleClose: () => void;
  cropMode?: boolean;
  hasPreview?: boolean;
  cardMode?: boolean;
}

const Files = (props: IProps) => {
  const {
    setSelectedFile,
    userGroupHash,
    resourceId,
    type,
    handleClose,
    cropMode,
    hasPreview,
    cardMode,
  } = props;
  const getRepo = useRecoilValue(repoAtom);
  const [page, setPage] = useState<number>(0);
  const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState<string>();
  const [dataType, setDataType] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<IFile | null>(null);

  const queryClient = useQueryClient();
  const { data: userInfo } = useGetUser();
  const {
    data: files,
    isFetching,
    isLoading: isLoadingFiles,
    refetch,
    fetchNextPage,
  } = useGetFiles(
    resourceId,
    userGroupHash,
    fileTablePageSize,
    page * fileTablePageSize,
    name,
    dataType,
  );

  const renameHook = useRenameFile();
  const deleteFile = useDeleteFile();

  const handleDataType = (dtype: string) => {
    setDataType(dtype);
  };

  const handleRenameFile = (file: IFile, dataForm: string) => {
    setIsLoading(true);
    if (resourceId) {
      renameHook.mutate({
        newName: dataForm,
        resourceId,
        hash: file.hash,
        userGroupHash: file.parentHash,
        callBack: () => {
          setIsLoading(false);
          refetch();
        },
      });
    }
  };

  const handleDeleteFile = (file: IFile) => {
    setIsLoading(true);
    if (resourceId && getRepo) {
      deleteFile.mutate({
        repoId: getRepo?.id,
        resourceId,
        userGroupHash,
        fileHash: file.hash,
        type,
        callBack: () => {
          setIsLoading(false);
          refetch();
        },
      });
    }
  };

  const handleFetchNextPage = (nextPage?: boolean) => {
    if (nextPage) {
      fetchNextPage();
    }
  };

  const onSuccess = () => {
    toast.success("آپلود موفق");
    setIsLoading(false);
    setIsError(false);
    refetch();
  };

  const handleUploadFile = async (item: any, showCropper: boolean) => {
    setProcessCount(0);
    setIsLoading(true);
    if (showCropper) {
      try {
        await axios
          .put(
            `${process.env.NEXT_PUBLIC_CLASOR}/fileManagement/resource/${resourceId}/userGroup/${userGroupHash}`,
            item,
            {
              headers: {
                "Content-Type": "multipart/form-data;",
                Authorization: `Bearer ${userInfo?.access_token}`,
                _token_: userInfo?.access_token || "",
                _token_issuer_: "1",
              },
              onUploadProgress(progressEvent: any) {
                const process = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );
                setProcessCount(process);
              },
            },
          )
          .then(async (result: any) => {
            if (result.data.data.result.hash) {
              await onSuccess();
            }
            queryClient.invalidateQueries({
              queryKey: [`getReport-${resourceId}`],
            });
          });
      } catch {
        setIsLoading(false);
        setIsError(true);
        toast.error("آپلود ناموفق");
      } finally {
        setIsLoading(false);
      }
    } else {
      const fileItem = item;
      const file = new FormData();
      file.append("file", fileItem, encodeURIComponent(item.name));
      axios
        .put(
          `${process.env.NEXT_PUBLIC_CLASOR}/fileManagement/resource/${resourceId}/userGroup/${userGroupHash}`,
          file,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
              Authorization: `Bearer ${userInfo?.access_token}`,
              _token_: userInfo?.access_token || "",
              _token_issuer_: "1",
            },
            onUploadProgress(progressEvent: any) {
              const process = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setProcessCount(process);
            },
          },
        )
        .then(async (res: any) => {
          if (res.data.data.result.hash) {
            onSuccess();
            setIsLoading(false);
          }
          queryClient.invalidateQueries({
            queryKey: [`getReport-${resourceId}`],
          });
        })
        .catch((error: any) => {
          toast.error("خطا در بارگذاری فایل");
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  const generateDownloadLink = (file: IFile) => {
    return `${process.env.NEXT_PUBLIC_PODSPACE_API}files/${
      file.hash
    }?&checkUserGroupAccess=true&Authorization=${userInfo?.access_token}&time=${Date.now()}`;
  };

  const handleSelect = () => {
    const fileExtension = selectedImage?.extension.toLowerCase();
    if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jfif" ||
      fileExtension === "svg"
    ) {
      setSelectedFile?.(selectedImage);
      handleClose();
    } else {
      toast.error("فایل انتخاب شده از نوع عکس نمی باشد.");
    }
  };

  return (
    <FileManagementDialog
      dialogClassName="flex flex-col !rounded-none shrink-0 !h-full w-full max-w-full md:!h-[80%] md:min-h-[80%] md:!w-[700px] md:!min-w-[700px] md:!max-w-[700px] lg:!w-[800px] lg:!min-w-[800px] lg:!max-w-[800px] bg-primary md:!rounded-lg"
      dialogBodyClassName="bg-secondary h-[calc(100vh-200px)] md:h-auto overflow-auto md:overflow-hidden p-5 flex-grow"
      dialogHeader="افزودن عکس"
      setOpen={handleClose}
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
