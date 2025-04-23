"use client";

import { AdminPanelIcon } from "@components/atoms/icons";
import { IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const LoginPanelButton = () => {
  return (
    <Link
      href="/admin/dashboard"
      title="پنل ادمین"
    >
      <IconButton className="bg-tertiary" variant="text">
        <AdminPanelIcon className="block fill-white w-5 h-5 xs:w-6 xs:h-6" />
      </IconButton>
    </Link>
  );
};

export default LoginPanelButton;
