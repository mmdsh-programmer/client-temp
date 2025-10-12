import { Spinner } from "@components/atoms/spinner";
import { Button } from "@material-tailwind/react";

import React from "react";

interface IProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick: (() => void) | (() => Promise<void>);
  disabled?: boolean;
  isPrimary?: boolean;
}

const LoadingButton = ({
  loading,
  children,
  className,
  onClick,
  disabled,
  isPrimary,
}: IProps) => {
  const loadingColor =
    !!isPrimary || isPrimary === undefined ? "text-primary" : "text-error";

  return (
    <Button
      placeholder=""
      variant="text"
      className={`${className || ""} flex justify-center items-center gap-2 w-[50%] xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 rounded-lg`}
      onClick={onClick}
      disabled={disabled}
      {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <>
        {children}
        {loading ? (
          <Spinner
            className={`w-5 h-5 ${loadingColor} ${isPrimary || isPrimary === undefined ? "text-white" : "text-white"}`}
          />
        ) : null}
      </>
    </Button>
  );
};

export default LoadingButton;
