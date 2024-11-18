import { AdminPanelIcon } from "@components/atoms/icons";
import Link from "next/link";
import React from "react";

const LoginPanelButton = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="border-purple-normal sm:hover:bg-purple-normal flex items-center bg-transparent transition-colors duration-300 justify-center px-4 py-2.5 rounded-lg text-gray-900 hover:text-white font-iranYekan border-none sm:!border sm:border-solid hover:bg-transparent"
    >
      <span className="hidden sm:block text-xs">پنل ادمین</span>
      <AdminPanelIcon className="block fill sm:hidden stroke-blue-gray-700 w-5 h-5 xs:w-7 xs:h-7" />
    </Link>
  );
};

export default LoginPanelButton;
