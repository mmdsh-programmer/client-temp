import { getMe } from "@actions/auth";
import useDeleteFile from "@hooks/files/useDeleteFile";
import useGetFiles from "@hooks/files/useGetFiles";
import useRenameFile from "@hooks/files/useRenameFile";
import useGetReport from "@hooks/report/useGetReport";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IFile } from "node_modules/cls-file-management/dist";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ClasorFileManagement } from "cls-file-management";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { ArrowRightIcon, XIcon } from "@components/atoms/icons";

const fileTablePageSize = 20;

const { NEXT_PUBLIC_CLASOR } = process.env;

interface IProps {
  setSelectedFile?: (file: any) => void;
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
  const [page, setPage] = useState<number>(0);
  const [processCount, setProcessCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState<string>();
  const [dataType, setDataType] = useState<string>();

  const queryClient = useQueryClient();

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

  const handleDataType = (dtype: string) => {
    setDataType(dtype);
  };

  const { data: dataReport, isFetching: fetchingReport } =
    useGetReport(resourceId);

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
    if (resourceId) {
      deleteFile.mutate({
        resourceId,
        userGroupHash,
        fileHash: file.hash,
        type,
        repoId: resourceId,
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
    const userInfo = await getMe();
    if (showCropper) {
      try {
        await axios
          .put(
            `${NEXT_PUBLIC_CLASOR}fileManagement/resource/${resourceId}/userGroup/${userGroupHash}`,
            item,
            {
              headers: {
                "Content-Type": "multipart/form-data;",
                Authorization: `Bearer ${userInfo.access_token}`,
                _token_: userInfo.access_token || "",
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
          .then(async (result: any) => {
            if (result.data.data.result.hash) {
              await onSuccess();
            }
            queryClient.invalidateQueries(`getReport-${resourceId}`);
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
          `${NEXT_PUBLIC_CLASOR}fileManagement/resource/${resourceId}/userGroup/${userGroupHash}`,
          file,
          {
            headers: {
              "Content-Type": "multipart/form-data;",
              Authorization: `Bearer ${userInfo.access_token}`,
              _token_: userInfo.access_token || "",
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
          queryClient.invalidateQueries(`getReport-${resourceId}`);
        })
        .catch((error: any) => {
          toast.error("خطا در بارگذاری فایل");
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  const generateDownloadLink = async (file: IFile) => {
    const userInfo = await getMe();
    return `${process.env.NEXT_PUBLIC_PODSPACE_API}files/${
      file.hash
    }?&checkUserGroupAccess=true&Authorization=${userInfo.access_token}&time=${Date.now()}`;
  };
  return (
    <Dialog
      placeholder=""
      size="sm"
      open={true}
      handler={handleClose}
      className="p-5 rounded-none h-full max-w-full w-full xs:rounded-md xs:max-h-[600px] xs:h-[80%] xs:max-w-[66%] md-max-w-[40%] flex flex-col"
    >
      <DialogHeader
        placeholder="dialog header"
        className="flex items-center justify-between p-0"
      >
        <div className="flex items-center justify-center">
          <Button
            placeholder="close button"
            className="bg-transparent ml-2 shadow-none hover:shadow-none p-0"
            onClick={handleClose}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          <span className="text-primary text-base font-bold font-iranYekan">
            افزودن عکس
          </span>
        </div>
        <Button
          placeholder="close button"
          className="bg-transparent shadow-none hover:shadow-none p-0"
          onClick={handleClose}
        >
          <XIcon className="fill-gray-200 w-7 h-7" />
        </Button>
      </DialogHeader>
      <DialogBody placeholder="dialog body" className="p-0 flex-grow">
        <ClasorFileManagement
          //   dataReport={dataReport}
          fetchingReport={fetchingReport}
          files={files}
          cropMode={cropMode}
          isFetching={isFetching}
          isLoading={isLoading}
          isError={isError}
          hasPreview={hasPreview}
          processCount={processCount}
          onSelectFile={(file) => {
            return setSelectedFile?.(file);
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
      </DialogBody>
      <DialogFooter
        placeholder="create user dialog footer"
        className="p-0 flex gap-2.5 mt-[30px]"
      >
        <Button
          placeholder=""
          className="bg-purple-normal flex justify-center items-center rounded-lg px-4 py-3 text-[13px] text-white font-iranYekan"
          onClick={handleClose}
        >
          افزودن
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default Files;
