"use client";

import { Button } from "@material-tailwind/react";
import React from "react";
import { login } from "@actions/auth";

interface IProps {
  message?: string;
  description?: string;
}
const LoginRequiredButton = ({ message, description }: IProps) => {
  const handleClick = () => {
    window.localStorage.setItem(
      "CLASOR:LAST_PAGE",
      window.location.pathname
    );
    login();
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {description ? <span className="hidden sm:block mb-6">{description}</span> : null}
      <Button
        placeholder=""
        variant="text"
        className="sm:!px-10 py-5 lg:mt-0 sm:bg-secondary text-white font-iranYekan !max-h-[unset] bg-transparent flex justify-center items-center gap-2 w-[50%] xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 rounded-lg"
        onClick={handleClick}
      >
         <span className="hidden sm:block">{message}</span>
      </Button>
    </div>
  );
};

export default LoginRequiredButton;
