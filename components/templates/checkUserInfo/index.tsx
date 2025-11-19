"use client";

import React from "react";
import AppError from "@app/error";
import SpinnerText from "@components/molecules/spinnerText";
import useAppStartup from "@hooks/useAppStartup";

interface IProps {
  children: React.ReactNode | React.JSX.Element;
}

const CheckUserInfo = ({ children }: IProps) => {
  const { userInfo, isLoading, isError, error, refetch } = useAppStartup();

  if (isError) {
    const renderError = error instanceof Error ? error : new Error(String(error ?? "خطای نامشخص"));
    return (
      <div>
        <AppError
          error={renderError}
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

  return children;
};

export default CheckUserInfo;
