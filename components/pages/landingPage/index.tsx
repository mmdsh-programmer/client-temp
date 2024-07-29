"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, []);

  return (
    <div className="main w-screen h-screen flex items-start justify-center bg-slate-50">
      <div className="flex items-center m-auto">
        <h1 className="font-bold">در حال بررسی اطلاعات کاربری</h1>
        <div className=" mr-2 w-8 h-8" />
      </div>
    </div>
  );
};

export default LandingPage;
