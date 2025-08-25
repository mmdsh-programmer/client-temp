import React from "react";
import { Button } from "@material-tailwind/react";
import { DocumentExcelIcon } from "@components/atoms/icons";
import { IRemoteEditorRef } from "clasor-remote-editor";
import { IVersion } from "@interface/version.interface";
import { useEditorStore } from "@store/editor";
import { useDocumentStore } from "@store/document";

interface IProps {
  editorRef: React.RefObject<IRemoteEditorRef>;
  version: IVersion;
}

const DownloadExcel = ({ editorRef, version }: IProps) => {
  const editorMode = useEditorStore((state) => {
    return state.editorMode;
  });
  const getSelectedDocument = useDocumentStore((state) => {
    return state.selectedDocument;
  });

  const handleExcelDownload = () => {
    editorRef.current?.saveExcel({
      fileName: `${getSelectedDocument?.name}-${version.versionNumber}`,
    });
  };

  return (
    <Button
      className="h-8 w-8 rounded-full bg-transparent p-0 hover:bg-gray-700"
      title="دانلود اکسل"
      onClick={handleExcelDownload}
      disabled={!(editorMode === "preview" || editorMode === "temporaryPreview")}
    >
      <DocumentExcelIcon className="h-5 w-5 fill-white" />
    </Button>
  );
};

export default DownloadExcel;
