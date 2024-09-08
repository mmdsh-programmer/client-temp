import React from "react";
import SubscribePage from "@components/pages/subscribe";

interface IProps {
  params: {
    hash: string;
    hasPassword?: string;
  };
}

const Subcribe = ({ params: { hash, hasPassword } }: IProps) => {
  return <SubscribePage hash={hash} hasPassword={hasPassword} />;
};

export default Subcribe;
