import type { Metadata } from "next";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "ویرایش",
  description: "ویرایش محتوا",
};

const EditLayout = ({ children }: IProps) => {
  return children;
};

export default EditLayout;
