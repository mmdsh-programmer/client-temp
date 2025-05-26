import React from "react";
import { Button, Typography } from "@material-tailwind/react";

interface IProps {
  classNameText?: string;
  classNameButton?: string;
  text: string;
  icon: JSX.Element | React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: () => any;
  disabled?: boolean;
}

const IconTextButton = ({
  classNameText,
  classNameButton,
  text,
  icon,
  onClick,
  disabled,
}: IProps) => {
  return (
    <Button
      className={`${classNameButton || ""} flex justify-center items-center rounded-lg `}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        {icon}
        <Typography className={classNameText}>{text}</Typography>
      </>
    </Button>
  );
};

export default IconTextButton;
