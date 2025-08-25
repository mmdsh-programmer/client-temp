import React from "react";
import Error from "@components/organisms/error";
import { ICustomPostData } from "@interface/app.interface";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/clasor";
import PublishHeader from "@components/organisms/header/publishHeader";

interface IProps {
  children: React.ReactNode;
  params: { id: string; name: string; domain: string };
}

const ShareSlugLayout = async ({ children, params }: IProps) => {
  try {
    const isDev = process.env.NODE_ENV === "development";
    let domain: string = "";

    if (isDev) {
      domain = process.env.DOMAIN || "";
    } else {
      domain = decodeKey(params.domain);
    }
    const { content } = await getCustomPostByDomain(domain);
    const { projectName, logo } = JSON.parse(content) as ICustomPostData;

    return (
      <>
        <PublishHeader projectName={projectName} logo={logo} domain={domain} />
        <main className="flex h-[calc(100vh-81px)] w-full">
          <section className="h-full w-full overflow-y-auto">{children}</section>
        </main>
      </>
    );
  } catch (error: unknown) {
    const errorMessage = (error as { message: string }).message ?? "خطای غیر منتظره رخ داده است";
    return (
      <div className="grid h-screen w-screen place-content-center">
        <Error error={{ message: errorMessage }} />
      </div>
    );
  }
};

export default ShareSlugLayout;
