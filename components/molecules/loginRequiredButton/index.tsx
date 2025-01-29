"use client";

import LoadingButton from "../loadingButton";
import { LoginIcon } from "@components/atoms/icons";
import React from "react";
import { login } from "@actions/auth";

interface IProps{
  message?: string;
  renderSideButton?: React.ReactNode;
}

const LoginRequiredButton = ({ message, renderSideButton }: IProps) => {
  return (
    <>
    {renderSideButton || null}
    <LoadingButton
      className="flex justify-center items-center !w-fit px-2 sm:!px-10 py-5 rounded-lg lg:mt-0 sm:bg-purple-normal text-white font-iranYekan !max-h-[unset] bg-transparent"
      onClick={() => {
        window.localStorage.setItem(
          "CLASOR:LAST_PAGE",
          window.location.pathname
        );
        return login();
      }}
    >
      <span className="hidden sm:block">{message}</span>
      <LoginIcon className="block sm:hidden fill-blue-gray-700 w-5 h-5 xs:w-7 xs:h-7" />
    </LoadingButton>
  </>
  );
};

export default LoginRequiredButton;