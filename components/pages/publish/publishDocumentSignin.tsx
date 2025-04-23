"use client";

import React, { useEffect } from "react";

import { Spinner } from "@material-tailwind/react";
import { login } from "@actions/auth";

const PublishDocumentSignin = () => {
  useEffect(() => {
    window.localStorage.setItem("CLASOR:LAST_PAGE", window.location.href);
    login();
  }, []);

  return (
    <section className="w-full h-full grid place-content-center place-items-center">
      <div className="w-full flex justify-center items-center">
        <Spinner className="h-8 w-8" color="purple" />
      </div>
      <p className="mt-4 text-xl">در حال دریافت اطلاعات کاربری</p>
    </section>
  );
};

export default PublishDocumentSignin;
