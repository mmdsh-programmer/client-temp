import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import React from "react";

interface IProps {
  logo?: string;
  projectDescription?: string;
}
const PublishFooter = ({ logo, projectDescription }: IProps) => {
  return (
    <div className="h-[75px] bg-secondary flex items-center px-11">
      <div className="flex h-8 w-full m-auto items-center max-w-3xl justify-between">
        <div className="flex">
          <div className="p-1 rounded-md">
            {logo ? (
              <ImageComponent
                alt="repo-image"
                src={`${process.env.NEXT_PUBLIC_PODSPACE_API}/files/${logo}`}
                className="h-8 w-8"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center">
                <InfoIcon className="h-8 w-8" stroke="#000" />
              </div>
            )}
          </div>
          <p className="text-white text-sm mt-1 mr-2 flex justify-center items-center">
            {projectDescription ?? "توضیحات پروژه"}
          </p>
        </div>
        <small className="text-xs text-white">1.16.2.3</small>
      </div>
    </div>
  );
};

export default PublishFooter;
