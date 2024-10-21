"use client";

import React, { useEffect } from "react";

import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, []);

  return (
    <div className="w-screen h-full flex items-start justify-center bg-slate-50">
      <div className="flex items-center m-auto">
        <Spinner className="h-4 w-4" color="purple" />
        <h1 className="font-bold">در حال بررسی اطلاعات کاربری</h1>
      </div>
    </div>
  );
};

export default LandingPage;
