import Error from "@components/organisms/error";
import { IThemeInfo } from "@interface/app.interface";
import PublishSlugTemplate from "@components/templates/publishTemplate/publishSlugTemplate";
import React from "react";
import { getThemeAction } from "@actions/theme";

interface IProps {
  children: React.ReactNode;
  params: { id: string; name: string };
}
const PublishSlugLayout = async({ children, params }: IProps) => {
  const { id, name } = params;
  const data = await getThemeAction();

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
    <PublishSlugTemplate id={+id} name={name} themeInfo={data as IThemeInfo}>
      {children}
    </PublishSlugTemplate>
  );
};

export default PublishSlugLayout;
