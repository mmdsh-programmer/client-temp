import React from "react";
import {
  AlertIcon,
  LogoMobileIcon,
  ThemeIcon,
} from "@components/atoms/icons";
import Breadcrumb from "@components/molecules/breadcumb";
import ProfileMenu from "@components/molecules/profileMenu";
import { Button } from "@material-tailwind/react";

const Header = () => {

  return (
    <>
      <div className="w-full xs:w-auto !h-32 xs:!h-20 py-4 xs:p-0 xs:mx-8 bg-white xs:bg-inherit flex flex-col-reverse xs:flex-row justify-between items-center flex-grow ">
        <div className="w-full flex items-center h-fit px-4 xs:p-0 mt-4 xs:mt-0">
          <Breadcrumb />
        </div>
        <div className="w-full xs:w-auto px-4 xs:p-0 flex justify-between border-b-2 border-gray-200 pb-3 xs:border-b-0 xs:pb-0">
          <div className="block xs:hidden mt-2">
            <LogoMobileIcon className="h-10 w-20" />
          </div>
          <div className="flex items-center gap-x-2 xs:gap-x-4 mr-auto xs:mr-0">
            <Button className="rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10">
              <AlertIcon className=" h-4 w-4" />
            </Button>
            <Button className="rounded-full bg-white p-1 shadow-lg flex justify-center items-center h-10 w-10">
              <ThemeIcon className=" h-4 w-4" />
            </Button>
            <ProfileMenu />
          </div>
        </div>
      </div>
      <hr className="" />
    </>
  );
};

export default Header;
