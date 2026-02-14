"use client";

import React from "react";
import Link from "next/link";
import { PanelIcon } from "@components/atoms/icons";
import { Button } from "@components/ui/button";

const LoginPanelButton = () => {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="hover:bg-tertiary/90 bg-tertiary text-white"
    >
      <Link href="/admin/dashboard" title="پنل ادمین">
        <PanelIcon className="h-5 w-5 fill-white" />
      </Link>
    </Button>
  );
};

export default LoginPanelButton;
