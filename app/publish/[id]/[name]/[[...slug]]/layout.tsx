import React from "react";
import Error from "@components/organisms/error";
import { IThemeInfo } from "@interface/app.interface";
import PublishSlugTemplate from "@components/templates/publishTemplate/publishSlugTemplate";
import { getThemeAction } from "@actions/theme";
import { getRepositoryData } from "./page";
import { toEnglishDigit } from "@utils/index";

interface IProps {
  children: React.ReactNode;
  params: { id: string; name: string };
}
const PublishSlugLayout = async ({ children, params: { id } }: IProps) => {
  const data = await getThemeAction();
  const repository = await getRepositoryData(
    Number.parseInt(toEnglishDigit(decodeURIComponent(id)), 10)
  );

  if (data && "error" in data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Error
          error={{ message: data.errorList?.[0] ?? "خطا در دریافت اطلاعات" }}
        />
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
};

export default PublishSlugLayout;
