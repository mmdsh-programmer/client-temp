import { IThemeInfo } from "@interface/app.interface";
import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import React from "react";

interface IProps {
  themeInfo?: IThemeInfo;
  projectDescription?: string;
}
const PublishFooter = ({ themeInfo, projectDescription }: IProps) => {
  return (
    <div className="h-[75px] bg-secondary flex items-center px-11">
      <div className="flex h-8 w-full m-auto items-center max-w-3xl justify-between">
        <div className="flex">
          {themeInfo?.logo ? (
            <ImageComponent
              alt="repo-image"
              src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${themeInfo.logo}`}
              className="h-8 w-8"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center">
              <InfoIcon className="h-8 w-8" stroke="#000" />
            </div>
          )}
          <p className="gray-500 text-sm mt-1 mr-2">
            {projectDescription ?? "توضیحات پروژه"}
          </p>
        </div>
        <small className="text-xs">1.16.2.3</small>
      </div>
    </div>
  );
};

export default PublishFooter;
