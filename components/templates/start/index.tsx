"use client";

import React, { ReactNode, useEffect } from "react";

import Error from "@app/error";
import PanelUrl from "../panelUrl";
import SpinnerText from "@components/molecules/spinnerText";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import useGetUser from "@hooks/auth/useGetUser";
import { useRouter } from "next/navigation";

interface IProps {
  children: ReactNode;
}

const Start = ({ children }: IProps) => {
  const router = useRouter();
  const { data: userInfo, isLoading, isError, error, refetch } = useGetUser();

  const handleToast = useDebouncedCallback(() => {
    toast.info("لطفا وارد حساب کاربری خود شوید.");
    router.push("/");
  }, 100);
  
  useEffect(() => {
    if (userInfo === null) {
      handleToast();
    }
  }, [userInfo]);

  if (isError) {
    console.log({
      type: "error",
      error: JSON.stringify(error),
    });
    return (
      <div>
        <Error
          error={error}
          reset={() => {
            refetch();
          }}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <SpinnerText text="در حال دریافت اطلاعات" />
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <PanelUrl />
      {children}
    </>
  );
};

export default Start;
