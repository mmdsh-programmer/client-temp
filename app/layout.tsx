import { decodeKey } from "@utils/index";
import "../styles/globals.css";

import type { Metadata } from "next";
import React from "react";
import { getCustomPostByDomain } from "@service/clasor";

interface IProps {
  children: React.ReactNode;
}
export async function generateMetadata({ params }): Promise<Metadata> {
  const domain = decodeKey(params.domain);
  try {
    const { content } = await getCustomPostByDomain(domain);
    const domainInfo = JSON.parse(content ?? "{}");
    return {
      title: domainInfo.projectName,
      description: domainInfo.projectDescription,
    };
  } catch {
    return {
      title: "کلاسور",
      description: "کلاسور",
    };
  }
}

const RootLayout = ({ children }: IProps) => {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
