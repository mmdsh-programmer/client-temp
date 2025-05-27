"use client";

import { PanelIcon } from "@components/atoms/icons";
import { IconButton } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const LoginPanelButton = () => {
  return (
    <Link href="/admin/dashboard" title="پنل ادمین">
      <IconButton className="bg-tertiary" variant="text">
        <PanelIcon className="h-5 w-5 fill-white" />
      </IconButton>
    </Link>
  );
};

export default LoginPanelButton;
