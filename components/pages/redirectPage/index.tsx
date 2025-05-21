"use client";

import React, { useEffect } from "react";

import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface IProps {
  redirectUrl: string;
}

const RedirectPage = ({ redirectUrl }: IProps) => {
  const router = useRouter();

  useEffect(() => {
    router.push(redirectUrl);
  }, []);

  return (
    <section className="w-full h-full grid place-content-center place-items-center">
      <div className="w-full flex justify-center items-center">
        <Spinner className="h-8 w-8" color="deep-purple" />
      </div>
      <p className="mt-4 text-xl">در حال دریافت اطلاعات</p>
    </section>
  );
};

export default RedirectPage;
