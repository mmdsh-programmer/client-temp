import { decodeKey } from "@utils/index";

import Error from "@components/organisms/error";
import { IThemeInfo } from "@interface/app.interface";
import React from "react";
import { getCustomPostByDomain } from "@service/social";
import PublishHeader from "@components/organisms/header/publishHeader";

interface IProps {
  children: React.ReactNode;
  params: { domain: string };
}

const PublicFeedsLayout = async ({ children, params: { domain } }: IProps) => {
  try {
    const data = await getCustomPostByDomain(decodeKey(domain));

    return (
      <>
        <PublishHeader themeInfo={data as IThemeInfo} />
        <main className="flex w-full h-[calc(100vh-81px)]">
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
