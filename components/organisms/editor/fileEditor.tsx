import React, { useEffect, useState } from "react";
import { IFile } from "@interface/file.interface";
import { editorDataAtom, editorModeAtom } from "atom/editor";
import { pdfjs } from "react-pdf";
import { useRecoilState, useRecoilValue } from "recoil";
import Files from "../fileManagement";
import { repoAtom } from "@atom/repository";
import { DownloadIcon, UploadIcon } from "@components/atoms/icons";
import RenderIf from "@components/atoms/renderIf";
import useGetUser from "@hooks/auth/useGetUser";
import PreviewFile from "./previewFile";
import { selectedFileAtom } from "@atom/file";
import { Button, Typography } from "@material-tailwind/react";

export interface IFileHash {
  hash: string;
  fileName: string;
  fileExtension: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const FileEditor = () => {
  const [showFilePicker, setShowFilePicker] = useState(false);

  const getRepo = useRecoilValue(repoAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const [getSelectedFile, setSelectedFile] = useRecoilState(selectedFileAtom);

  const { data: userInfo } = useGetUser();
  const token: string | undefined = userInfo?.access_token;

  const source = `${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${
    getSelectedFile?.hash
  }?&checkUserGroupAccess=true&Authorization=${token}&time=${Date.now()}`;

  useEffect(() => {
    if (editorData?.fileHash) {
      const { hash, fileName, fileExtension } = editorData.fileHash;
      setSelectedFile({
        name: fileName,
        hash,
        extension: fileExtension,
      });
    } else {
      setShowFilePicker(true);
    }
  }, []);

  const repoId = getRepo!.id;
  const { userGroupHash } = getRepo!;

  return (
    <div className="file-Editor h-full">
      {editorMode === "preview" || editorMode === "temporaryPreview" ? (
        <div className="file-editor__preview ">
          <RenderIf isTrue={!!getSelectedFile}>
            <>
              <PreviewFile file={getSelectedFile as IFile} />
              <div className="flex gap-2 mt-4 items-center justify-center">
                <Typography className="title_t2 !text-primary">
                  دانلود فایل
                </Typography>
                <a
                  href={source}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className=""
                  target="_blank"
                  rel="noreferrer"
                >
                  <DownloadIcon className="h-5 w-5 stroke-white" />
                </a>
              </div>
            </>
          </RenderIf>
          <RenderIf isTrue={!getSelectedFile}>
            <div className="empty-file-message w-full text-center">
              <Typography className="font-bold p-20">
                هنوز فایلی بارگذاری نشده است!
              </Typography>
            </div>
          </RenderIf>
        </div>
      ) : (
        <div className="h-full px-8">
          <div
            className={`grid place-content-center place-items-center mx-auto transition-all duration-150 ${
              showFilePicker
                ? "h-0 opacity-0 invisible"
                : "h-full opacity-100 visible"
            } `}
          >
            {getSelectedFile ? (
              <PreviewFile file={getSelectedFile} showIcon />
            ) : null}

            <Button
              className="gap-1 items-center px-2-0 py-0 mt-4 z-50 bg-purple-normal h-12"
              onClick={() => {
                setShowFilePicker(true);
              }}
            >
              <UploadIcon className="h-4 w-4 stroke-white" />
              <Typography className="title_t2 text-white">انتخاب فایل</Typography>
            </Button>
          </div>

          {showFilePicker ? (
            <div className="py-4 overflow-auto">
              <Files
                userGroupHash={userGroupHash}
                resourceId={repoId}
                type="public"
                setSelectedFile={(file) => {
                  setSelectedFile(file);
                  setShowFilePicker(false);
                }}
                handleClose={() => {
                  return setShowFilePicker(false);
                }}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FileEditor;
