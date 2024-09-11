import React from "react";
import { Button, Typography } from "@material-tailwind/react";

interface IProps {
  classNameText?: string;
  classNameButton?: string;
  text: string;
  icon: JSX.Element | React.ReactNode;
  onClick?: () => any;
}

const IconTextButton = ({
  classNameText,
  classNameButton,
  text,
  icon,
  onClick,
}: IProps) => {
  return (
    <Button
      className={`${classNameButton || ""} flex justify-center items-center rounded-lg `}
      onClick={onClick}
    >
      <>
        {icon}
        <Typography className={classNameText}>{text}</Typography>
      </>
    </Button>
  );
};

export default IconTextButton;
