import React from "react";
import SubscribePage from "@components/pages/subscribe";

interface IProps {
  params: Promise<{
    hash: string;
  }>;
  searchParams: Promise<{
    hasPassword?: string;
  }>;
}

const Subscribe = async ({ params, searchParams }: IProps) => {
  const awaitedParams = await params;
  const { hash } = awaitedParams;

  const awaitedSearchParams = await searchParams;
  const { hasPassword } = awaitedSearchParams;

  return <SubscribePage hash={hash} hasPassword={hasPassword} />;
};

export default Subscribe;
