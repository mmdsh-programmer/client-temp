import Link from "next/link";
import React from "react";

const LoginPanelButton = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="border border-purple-normal hover:bg-purple-500 flex items-center bg-transparent hover:bg-purple-normal transition-colors duration-300 justify-center px-4 py-2 rounded-lg text-gray-900 hover:text-white font-iranYekan"
    >
      <span className="text-xs xs:text-sm mr-2">پنل ادمین</span>
    </Link>
  );
};

export default LoginPanelButton;
