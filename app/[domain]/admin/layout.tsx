import BaseTemplate from "@components/templates/baseTemplate";
import ErrorBoundary from "@components/errorBoundry";
import { ICustomPostData } from "@interface/app.interface";
import React from "react";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";
// import PushNotification from "@components/organisms/pushNotification";

interface IProps {
  children: React.ReactNode;
  params: Promise<{
    domain: string;
  }>;
}

const AdminLayout = async ({ children, params }: IProps) => {
  const awaitedParams = await params;
  const isDev = process.env.NODE_ENV === "development";
  let domainUrl: string = "";

  if (isDev) {
    domainUrl = process.env.DOMAIN || "";
  } else {
    const { domain } = awaitedParams;
    domainUrl = decodeKey(domain);
  }

  let domainInfo: ICustomPostData = {} as ICustomPostData;
  try {
    const { content } = await getCustomPostByDomain(domainUrl);
    domainInfo = JSON.parse(content ?? "{}") as ICustomPostData;
  } catch {
    domainInfo = {} as ICustomPostData;
  }

  return (
    <ErrorBoundary>
      {/* <PushNotification /> */}
      <BaseTemplate domainInfo={domainInfo}>{children}</BaseTemplate>
    </ErrorBoundary>
  );
};

export default AdminLayout;
