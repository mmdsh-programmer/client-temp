import Error from "@components/organisms/error";
import { ICustomPostData } from "@interface/app.interface";
import PublishSlugTemplate from "@components/templates/publishTemplate/publishSlugTemplate";
import React from "react";
import { decodeKey } from "@utils/index";
import { getCustomPostByDomain } from "@service/social";

interface IProps {
  children: React.ReactNode;
  params: { id: string; name: string; domain: string,  };
}

const PublishSlugLayout = async ({ children, params }: IProps) => {
  try {
    const domain = decodeKey(params.domain);
    const data = await getCustomPostByDomain(domain);

    const { projectName, logo } = JSON.parse(data.data) as ICustomPostData;


    return (
      <PublishSlugTemplate
        projectName={projectName}
        logo={logo}
        domain={domain}
      >
        {children}
      </PublishSlugTemplate>
    );
  } catch (error: unknown) {
    const errorMessage = (error as { message: string }).message ?? "خطای غیر منتظره رخ داده است";
    return (
      <div className="w-screen h-screen grid place-content-center">
        <Error error={{ message: errorMessage }} />
      </div>
    );
  }
};

export default PublishSlugLayout;
