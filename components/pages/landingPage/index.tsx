"use client";

import React, { useEffect } from "react";

import SpinnerText from "@components/molecules/spinnerText";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard");
  }, []);

  return (
      <div className="flex items-center justify-center h-screen">
        <SpinnerText text="در حال بررسی اطلاعات کاربری" />
      </div>
  );
};

export default LandingPage;
