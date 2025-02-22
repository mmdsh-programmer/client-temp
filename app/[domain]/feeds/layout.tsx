import Error from "@components/organisms/error";
import PublishHeader from "@components/organisms/header/publishHeader";
import React from "react";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";

interface IProps {
  children: React.ReactNode;
  params: { domain: string };
}

const PublicFeedsLayout = async ({ children, params }: IProps) => {
  try {
    const domain = decodeKey(params.domain);
    const { content } = await getCustomPostByDomain(domain);
    const { projectName, logo } = JSON.parse(content);
    return (
      <>
        <PublishHeader projectName={projectName} logo={logo} domain={domain} />
        <main className="flex w-full h-[calc(100vh-81px)] bg-white">
          <section className="h-full w-full px-4 xs:px-8">{children}</section>
        </main>
      </>
    );
  } catch {
    return (
      <div className="w-screen h-screen grid place-content-center">
        <Error error={{ message: "خطای غیر منتظره رخ داده است" }} />
      </div>
    );
  }
};

export default PublicFeedsLayout;
