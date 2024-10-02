import React from "react";
import CheckRepoInfo from "../checkRepoInfo";

interface IProps {
  children: JSX.Element;
}

const EditorContentTemplate = ({ children }: IProps) => {
  return <CheckRepoInfo>{children}</CheckRepoInfo>;
};

export default EditorContentTemplate;
