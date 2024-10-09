import React, { useState } from "react";
import TabComponent from "@components/molecules/tab";
import { Typography } from "@material-tailwind/react";
import EditorTags from "./editorTags";
import AttachFile from "./attachFile";
import Comments from "./comments";
import { IVersion } from "@interface/version.interface";
import { useRecoilValue } from "recoil";
import { editorModeAtom } from "@atom/editor";

export enum ETabs {
  CHAT = "گفتگو",
  TAGS = "تگ‌ها",
  ATTACH_FILE = "پیوست",
  COMMENTS = "نظرات",
}

interface IProps {
  version?: IVersion;
}

const EditorDrawer = ({ version }: IProps) => {
  const editorMode = useRecoilValue(editorModeAtom);
  const [activeTab, setActiveTab] = useState<string>(ETabs.CHAT);

  const tabList = [
    {
      tabTitle: ETabs.CHAT,
      tabContent: <Typography>تب گفتگو</Typography>,
    },
    {
      tabTitle: ETabs.TAGS,
      tabContent: <EditorTags />,
    },
    {
      tabTitle: ETabs.ATTACH_FILE,
      tabContent: <AttachFile />,
    },
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
