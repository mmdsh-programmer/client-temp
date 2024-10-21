import ImageComponent from "@components/atoms/image";
import { InfoIcon } from "@components/atoms/icons";
import ProfileMenu from "@components/molecules/profileMenu";
import React from "react";
import useGetTheme from "@hooks/theme/useGetTheme";

const PublishHeader = () => {
  const { data: themeInfo } = useGetTheme();

  if (themeInfo && "error" in themeInfo) {
    return (
      <div className="sticky top-0 w-full h-auto xs:h-20 px-0 xs:px-8 bg-white xs:bg-secondary flex flex-col xs:flex-row justify-between items-center">
        <div className="order-1 xs:order-2 min-w-full xs:w-auto h-[60px] px-4 xs:p-0 flex justify-between items-center border-b-2 border-gray-200 xs:border-b-0">
          <h1>خطا در دریافت اطلاعات دامنه</h1>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="sticky top-0 w-full h-auto xs:h-20 px-0 xs:px-8 bg-white xs:bg-secondary flex flex-col xs:flex-row justify-between items-center">
        <div className="order-1 xs:order-2 min-w-full xs:w-auto h-[60px] px-4 xs:p-0 flex justify-between items-center border-b-2 border-gray-200 xs:border-b-0">
          <div className="flex h-8 w-8 mr-0 ml-auto items-center">
            {themeInfo?.logo ? (
              <ImageComponent
                alt="repo-image"
                src={`${process.env.NEXT_PUBLIC_PODSPACE_API}files/${themeInfo.logo}`}
                className="h-8 w-10"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center">
                <InfoIcon className="h-8 w-8" stroke="#000" />
              </div>
            )}

            {themeInfo?.projectName ? (
              <h1 className="text-base font-bold mr-2">
                {themeInfo.projectName}
              </h1>
            ) : null}
          </div>
          <div className="flex items-center gap-4 mr-auto">
            <ProfileMenu redirect={false} />
          </div>
        </div>
      </div>
      <hr className="" />
    </>
  );
};

export default PublishHeader;
