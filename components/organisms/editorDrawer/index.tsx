import React, { RefObject, useState } from "react";
import TabComponent from "@components/molecules/tab";
import { Typography } from "@material-tailwind/react";
import EditorTags from "./editorTags";
import AttachFile from "./attachFile";
import { IOutline, IVersion } from "@interface/version.interface";
import { useRecoilValue } from "recoil";
import { editorModeAtom } from "@atom/editor";
import Comments from "./comments";
import { selectedDocumentAtom } from "@atom/document";
import { EDocumentTypes } from "@interface/enums";
import { Outline } from "clasor-content-preview";
import { IRemoteEditorRef } from "clasor-remote-editor";
import "clasor-content-preview/src/styles/contentPreview.css";

export enum ETabs {
  OUTLINE = "فهرست",
  CHAT = "گفتگو",
  TAGS = "تگ‌ها",
  ATTACH_FILE = "پیوست",
  COMMENTS = "نظرات",
}

interface IProps {
  version?: IVersion;
  editorRef: RefObject<IRemoteEditorRef>;
}

const EditorDrawer = ({ version, editorRef }: IProps) => {
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const [activeTab, setActiveTab] = useState<string>(ETabs.OUTLINE);

  const outlineList = version?.outline?.startsWith("{\"root\": {\"root\"")
    ? "[]"
    : version?.outline;

  const tabList = [
    {
      tabTitle: ETabs.OUTLINE,
      tabContent: (
        <Outline
          outline={outlineList || "[]"}
          classicEditor
          handleClick={(value: IOutline) => {
            return editorRef.current?.setHeader(value);
          }}
        />
      ),
    },
    {
      tabTitle: ETabs.CHAT,
      tabContent: <Typography>تب گفتگو</Typography>,
    },
    getDocument?.contentType === EDocumentTypes.classic
      ? {
          tabTitle: ETabs.TAGS,
          tabContent: <EditorTags />,
        }
      : null,
    getDocument?.contentType === EDocumentTypes.classic
      ? {
          tabTitle: ETabs.ATTACH_FILE,
          tabContent: <AttachFile />,
        }
      : null,
    version?.state !== "draft" &&
    version?.status === "accepted" &&
    editorMode === "preview"
      ? {
          tabTitle: ETabs.COMMENTS,
          tabContent: <Comments version={version} />,
        }
      : null,
  ].filter(Boolean) as {
    tabTitle: ETabs;
    tabContent: React.JSX.Element;
  }[];

  return (
    <TabComponent
      tabList={tabList}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

export default EditorDrawer;
