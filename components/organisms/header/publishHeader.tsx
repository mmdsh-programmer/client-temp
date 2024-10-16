"use client";

import React from "react";
import { LogoMobileIcon, UserIcon } from "@components/atoms/icons";
import ProfileMenu from "@components/molecules/profileMenu";
import useGetUser from "@hooks/auth/useGetUser";
import { Button } from "@material-tailwind/react";
import { login } from "@actions/auth";

const PublishHeader = () => {
  const { data: userInfo } = useGetUser();

  return (
    <>
      <div className="sticky top-0 w-full h-auto xs:h-20 px-0 xs:px-8 bg-white xs:bg-secondary flex flex-col xs:flex-row justify-between items-center">
        <div className="order-1 xs:order-2 w-full xs:w-auto h-[60px] px-4 xs:p-0 flex justify-between items-center border-b-2 border-gray-200 xs:border-b-0 mr-auto">
          <div className="block h-8 w-20 xs:hidden">
            <LogoMobileIcon className="h-full w-full" />
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
