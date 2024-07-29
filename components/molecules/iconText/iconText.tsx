import React from "react";

interface IProps {
  className: string;
  text: string;
  icon: JSX.Element;
}

const IconText = ({ className, text, icon }: IProps) => {
  return (
    <>
      {icon}
      <p className={className}>{text}</p>
    </>
  );
};

export default IconText;
