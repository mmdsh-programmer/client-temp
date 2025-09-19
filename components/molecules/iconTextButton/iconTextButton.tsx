import React from "react";
import { Button, Typography } from "@material-tailwind/react";

interface IProps {
  classNameText?: string;
  classNameButton?: string;
  text: string;
  icon: React.ReactNode;
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
      placeholder=""
      className={`${classNameButton || ""} flex justify-center items-center rounded-lg `}
      onClick={onClick}
      disabled={disabled}
      {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <>
        {icon}
        <Typography
          placeholder=""
          className={classNameText}
          {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
        >
          {text}
        </Typography>
      </>
    </Button>
  );
};

export default IconTextButton;
