import React from "react";
import SubscribePage from "@components/pages/subscribe";

interface IProps {
  params: {
    hash: string;
  };
  searchParams: {
    hasPassword?: string;
  };
}

const Subscribe = ({ params: { hash }, searchParams: { hasPassword } }: IProps) => {
  return <SubscribePage hash={hash} hasPassword={hasPassword} />;
};

export default Subscribe;
