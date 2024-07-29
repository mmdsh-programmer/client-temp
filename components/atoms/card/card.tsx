import React from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
}

const Card = ({ className, children }: IProps) => {
  return <div className={className}>{children}</div>;
};

export default Card;
