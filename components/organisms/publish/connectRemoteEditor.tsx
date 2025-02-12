"use client";

import React, { useMemo } from "react";

import { EDocumentTypes } from "@interface/enums";
import { IVersion } from "@interface/version.interface";
import RemoteEditor from "clasor-remote-editor";

interface IProps {
  versionData: IVersion;
}

const ConnectRemoteEditor = ({ versionData }: IProps) => {
  const editorUrl = useMemo(() => {
    switch (versionData.contentType) {
      case EDocumentTypes.word:
        return process.env.NEXT_PUBLIC_WORD_EDITOR as string;
      case EDocumentTypes.excel:
        return process.env.NEXT_PUBLIC_EXCEL_EDITOR as string;
      case EDocumentTypes.flowchart:
        return process.env.NEXT_PUBLIC_FLOWCHART_EDITOR as string;
      default:
        return null;
    }
  }, [versionData]);


  return editorUrl ? (
    <div className="remote-editor-container px-1 h-[calc(100vh-156px)]">
      <RemoteEditor
        url={`${editorUrl}?timestamp=${Date.now()}`}
        editorMode="preview"
        loadData={{
          content: versionData.content
        }}
      />

    </div>
  ) : (
    <p className="block text-center">سند مورد نظر پشتیبانی نمیشود</p>
  );
};

export default ConnectRemoteEditor;
