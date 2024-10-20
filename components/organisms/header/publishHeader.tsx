"use client";

import { InfoIcon, UserIcon } from "@components/atoms/icons";

import { Button } from "@material-tailwind/react";
import ImageComponent from "@components/atoms/image";
import ProfileMenu from "@components/molecules/profileMenu";
import React from "react";
import { login } from "@actions/auth";
import useGetTheme from "@hooks/theme/useGetTheme";
import useGetUser from "@hooks/auth/useGetUser";

const PublishHeader = () => {
  const { data: userInfo } = useGetUser();
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
            {userInfo ? (
              <ProfileMenu />
            ) : (
              <Button
                placeholder=""
                onClick={() => {
                  return login();
                }}
                className="userProfile rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10 border-[1px] border-normal"
              >
                <UserIcon className="h-4 w-4 fill-gray-400" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <hr className="" />
    </>
  );
};

export default PublishHeader;
