import React from "react";

interface IProps {
  children: React.ReactNode;
  labelFor?: string;
  className?: string;
}

const Label = ({ children, labelFor, className }: IProps) => {
  return (
    <label
      htmlFor={labelFor}
      className={`${className || ""} !p-0 text-[12px] leading-[16.8px] -tracking-[0.12] text-primary`}
    >
      {children}
    </label>
  );
};

export default Label;
