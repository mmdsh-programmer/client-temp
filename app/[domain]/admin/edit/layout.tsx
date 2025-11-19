import React from "react";
import CheckUserInfo from "@components/templates/checkUserInfo";

interface IProps {
  children: React.ReactNode;
}

const EditLayout = ({ children }: IProps) => {
  return <CheckUserInfo>{children}</CheckUserInfo>;
};

export default EditLayout;
