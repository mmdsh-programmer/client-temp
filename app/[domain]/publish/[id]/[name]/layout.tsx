import React from "react";
import Error from "@components/organisms/error";
import { IThemeInfo } from "@interface/app.interface";
import PublishSlugTemplate from "@components/templates/publishTemplate/publishSlugTemplate";
import { getThemeAction } from "@actions/theme";
import { toEnglishDigit } from "@utils/index";
import { getRepositoryData } from "@utils/publish";

interface IProps {
  children: React.ReactNode;
  params: { id: string; name: string };
}

const PublishSlugLayout = async ({ children, params: { id } }: IProps) => {
  try {
    const [data, repository] = await Promise.all([
      getThemeAction(),
      getRepositoryData(
        Number.parseInt(toEnglishDigit(decodeURIComponent(id)), 10)
      ),
    ]);

    if ("error" in data || "error" in repository) {
      let errorMessage = "خطا در دریافت اطلاعات";
      
      if ("error" in data && data.errorList?.[0]) {
        const [firstError] = data.errorList ?? [];
        errorMessage = firstError;
      } else if ("error" in repository && repository.errorList?.[0]) {
        const [firstError] = repository.errorList ?? [];
        errorMessage = firstError;
      }

      return (
        <div className="w-screen h-screen grid place-content-center">
          <Error error={{ message: errorMessage }} />
        </div>
      );
    }

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
