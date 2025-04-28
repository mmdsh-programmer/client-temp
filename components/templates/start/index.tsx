"use client";

import React, { ReactNode } from "react";
import Error from "@app/error";
import PanelUrl from "../panelUrl";
import SpinnerText from "@components/molecules/spinnerText";
import { useRouter } from "next/navigation";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  children: ReactNode;
}

const Start = ({ children }: IProps) => {
  const router = useRouter();
  const { data: userInfo, isLoading, isError, error, refetch } = useGetUser();

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
    router.push("/");
  }

  return (
    <>
      <PanelUrl />
      {children}
    </>
  );
};

export default Start;
