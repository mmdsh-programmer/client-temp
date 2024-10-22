"use client";

import React, { useEffect } from "react";
import SpinnerText from "@components/molecules/spinnerText";
import SubscribePasswordRequest from "@components/organisms/subscribe/subscribePasswordRequest";
import SubscribeRequest from "@components/organisms/subscribe/subscribeRequest";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  hash: string;
  hasPassword?: string;
}

const SubscribePage = ({ hash, hasPassword }: IProps) => {
  const { data: userInfo, isLoading } = useGetUser();

  useEffect(() => {
    if (!userInfo) {
      localStorage.setItem(
        "CLASOR:LAST_PAGE",
        `/subscribe/${hash}${hasPassword ? "?hasPassword=true" : ""}`
      );
    }
  }, []);

  if (isLoading) {
    return <SpinnerText text="در حال بررسی اطلاعات" />;
  }

  if (userInfo && hash && !hasPassword) {
    return <SubscribeRequest hash={hash} />;
  }
  if (userInfo && hash && hasPassword) {
    <SubscribePasswordRequest hasPassword={hasPassword} hash={hash} />;
  }

  return null;
};

export default SubscribePage;
