import { Button, Typography } from "@material-tailwind/react";
import { DownloadIcon, UploadIcon } from "@components/atoms/icons";
import React, { useEffect, useState } from "react";
import { editorDataAtom, editorModeAtom } from "atom/editor";
import { usePathname, useSearchParams } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";

import Files from "../fileManagement";
import { IFile } from "@interface/file.interface";
import PreviewFile from "./previewFile";
import RenderIf from "@components/atoms/renderIf";
import { repoAtom } from "@atom/repository";
import { selectedDocumentAtom } from "@atom/document";
import { selectedFileAtom } from "@atom/file";
import useGetUser from "@hooks/auth/useGetUser";
import useRepoId from "@hooks/custom/useRepoId";

export interface IFileHash {
  hash: string;
  fileName: string;
  fileExtension: string;
}

const FileEditor = () => {
  const [showFilePicker, setShowFilePicker] = useState(false);
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const sharedDocuments = searchParams?.get("sharedDocuments");

  const getRepo = useRecoilValue(repoAtom);
  const editorData = useRecoilValue(editorDataAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const [getSelectedFile, setSelectedFile] = useRecoilState(selectedFileAtom);
  const selectedDocument = useRecoilValue(selectedDocumentAtom);

  const repoId = useRepoId();
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
  }, [editorData]);

  const userGroupHash = () => {
    if (
      currentPath === "/admin/myDocuments" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id === selectedDocument?.repoId)
    ) {
      return userInfo!.repository.userGroupHash;
    }
    if (
      currentPath === "/admin/sharedDocuments" ||
      sharedDocuments === "true" ||
      (currentPath === "/admin/dashboard" && userInfo?.repository.id !== selectedDocument?.repoId)
    ) {
      return selectedDocument!.userGroupHash as string;
    }
    return getRepo!.userGroupHash;
  };

  return (
    <div className="file-Editor h-full">
      {editorMode === "preview" || editorMode === "temporaryPreview" ? (
        <div className="file-editor__preview ">
          <RenderIf isTrue={!!getSelectedFile}>
            <>
              <PreviewFile file={getSelectedFile as IFile} />
              <div className="mt-4 flex items-center justify-center gap-2">
                <Typography className="title_t2 !text-primary_normal">دانلود فایل</Typography>
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
              <Typography className="p-20 font-bold">هنوز فایلی بارگذاری نشده است!</Typography>
            </div>
          </RenderIf>
        </div>
      ) : (
        <div className="h-full px-8">
          <div
            className={`mx-auto grid place-content-center place-items-center transition-all duration-150 ${
              showFilePicker ? "invisible h-0 opacity-0" : "visible h-full opacity-100"
            } `}
          >
            {getSelectedFile ? <PreviewFile file={getSelectedFile} showIcon /> : null}

            <Button
              className="px-2-0 z-50 mt-4 h-12 items-center gap-1 bg-primary-normal py-0"
              onClick={() => {
                setShowFilePicker(true);
              }}
            >
              <UploadIcon className="h-4 w-4 !stroke-white" />
              <Typography className="title_t2 text-white">انتخاب فایل</Typography>
            </Button>
          </div>

          {showFilePicker ? (
            <div className="overflow-auto py-4">
              <Files
                userGroupHash={userGroupHash()}
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
