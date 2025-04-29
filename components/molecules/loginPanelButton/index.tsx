"use client";

import { UserFillIcon } from "@components/atoms/icons";
import { IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const LoginPanelButton = () => {
  return (
    <Link href="/admin/dashboard" title="پنل ادمین">
      <IconButton className="bg-tertiary" variant="text">
        <UserFillIcon className=" h-4 w-4 fill-white" />
      </IconButton>
    </Link>
  );
};

export default LoginPanelButton;
