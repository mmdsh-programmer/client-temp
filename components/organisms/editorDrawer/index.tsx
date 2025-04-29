import "clasor-content-preview/src/styles/contentPreview.css";

import React, { useState } from "react";
import { IVersion } from "@interface/version.interface";
import AttachFile from "./attachFile";
import Comments from "./comments";
import { EDocumentTypes } from "@interface/enums";
import EditorTags from "./editorTags";
import TabComponent from "@components/molecules/tab";
import { editorModeAtom } from "@atom/editor";
import { selectedDocumentAtom } from "@atom/document";
import { useRecoilValue } from "recoil";
import DocumentEnableUserGroup from "./documentEnableUserGroup";
// import ChatBox from "../chatBox";

export enum ETabs {
  // CHAT = "گفتگو",
  TAGS = "تگ‌ها",
  ATTACH_FILE = "پیوست",
  COMMENTS = "نظرات",
}

interface IProps {
  version?: IVersion;
}

const EditorDrawer = ({ version }: IProps) => {
  const getDocument = useRecoilValue(selectedDocumentAtom);
  const editorMode = useRecoilValue(editorModeAtom);
  const [activeTab, setActiveTab] = useState<string>(ETabs.TAGS);

  const tabList = [
    getDocument?.contentType === EDocumentTypes.classic
      ? {
          tabTitle: ETabs.TAGS,
          tabContent: <EditorTags />,
        }
      : null,
    getDocument?.contentType === EDocumentTypes.classic && getDocument.attachmentUserGroup
      ? {
          tabTitle: ETabs.ATTACH_FILE,
          tabContent: <AttachFile attachmentUserGroup={getDocument.attachmentUserGroup} />,
        }
      : null,
    version?.state !== "draft" && version?.status === "accepted" && editorMode === "preview"
      ? {
          tabTitle: ETabs.COMMENTS,
          tabContent: <Comments version={version} />,
        }
      : null,
    // {
    //   tabTitle: ETabs.CHAT,
    //   tabContent: <ChatBox />,
    // },
  ].filter(Boolean) as {
    tabTitle: ETabs;
    tabContent: React.JSX.Element;
  }[];

  return (
    <>
      <DocumentEnableUserGroup />
      <TabComponent tabList={tabList} activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};

export default EditorDrawer;
