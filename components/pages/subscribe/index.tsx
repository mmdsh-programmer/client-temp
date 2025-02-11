"use client";

import React from "react";
import SpinnerText from "@components/molecules/spinnerText";
import SubscribePasswordRequest from "@components/organisms/subscribe/subscribePasswordRequest";
import SubscribeRequest from "@components/organisms/subscribe/subscribeRequest";
import useGetUser from "@hooks/auth/useGetUser";
import { useRouter } from "next/navigation";

interface IProps {
  hash: string;
  hasPassword?: string;
}

const SubscribePage = ({ hash, hasPassword }: IProps) => {
  const router = useRouter();
  const { data: userInfo, isLoading } = useGetUser();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <SpinnerText text="در حال بررسی اطلاعات" />;
      </div>
    );
  }

  if (!userInfo) {
    localStorage.setItem(
      "CLASOR:LAST_PAGE",
      `/subscribe/${hash}${hasPassword ? "?hasPassword=true" : ""}`
    );
    router.push("/signin");
  }

  if (userInfo && hash && !hasPassword) {
    return <SubscribeRequest hash={hash} />;
  }

  if (userInfo && hash && hasPassword) {
    return <SubscribePasswordRequest hasPassword={hasPassword} hash={hash} />;
  }

  return null;
};

export default SubscribePage;
