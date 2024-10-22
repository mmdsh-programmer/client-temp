import { ArrowRightIcon } from "@components/atoms/icons";
import Link from "next/link";
import React from "react";

const LoginPanelButton = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="group flex items-center bg-transparent hover:bg-purple-normal transition-colors duration-300 justify-center px-4 py-2 rounded-lg text-gray-900 hover:text-white font-iranYekan"
    >
      <ArrowRightIcon className="w-0 group-hover:w-4 h-4 transition-all duration-300" fill="#FFF" />
      <span className="text-sm mr-2">ورود به پنل ادمین</span>
    </Link>
  );
};

export default LoginPanelButton;
