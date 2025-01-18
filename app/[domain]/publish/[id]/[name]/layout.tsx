import { decodeKey, toEnglishDigit } from "@utils/index";

import Error from "@components/organisms/error";
import { IThemeInfo } from "@interface/app.interface";
import PublishSlugTemplate from "@components/templates/publishTemplate/publishSlugTemplate";
import React from "react";
import { getCustomPostByDomain } from "@service/social";
import { getPublishRepositoryInfo } from "@service/clasor";

interface IProps {
  children: React.ReactNode;
  params: { id: string; name: string; domain: string };
}

const PublishSlugLayout = async ({ children, params: { id, domain } }: IProps) => {
  try {
    const [data, repository] = await Promise.all([
      getCustomPostByDomain(decodeKey(domain)),
      getPublishRepositoryInfo(
        Number.parseInt(toEnglishDigit(decodeURIComponent(id)), 10)
      ),
    ]);

    return (
      <PublishSlugTemplate
        repoId={repository.id}
        repoName={repository.name}
        themeInfo={data as IThemeInfo}
      >
        {children}
      </PublishSlugTemplate>
    );
  } catch {
    return (
      <div className="w-screen h-screen grid place-content-center">
        <Error error={{ message: "خطای غیر منتظره رخ داده است" }} />
      </div>
    );
  }
};

export default PublishSlugLayout;
