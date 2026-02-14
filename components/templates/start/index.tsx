"use client";

import React, { ReactNode } from "react";
import AppError from "@app/error";
import PanelUrl from "@components/templates/panelUrl";
import SpinnerText from "@components/molecules/spinnerText";
import useAppStartup from "@hooks/useAppStartup";

interface IProps {
  children: ReactNode;
}

const Start = ({ children }: IProps) => {
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

  return (
    <>
      <PanelUrl />
      {children}
    </>
  );
};

export default Start;
