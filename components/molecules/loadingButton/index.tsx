import React, { Ref } from "react";
import { Button, Spinner } from "@material-tailwind/react";

interface IProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const LoadingButton = ({
  loading,
  children,
  className,
  onClick,
  disabled,
}: IProps) => {
  return (
    <Button
      placeholder=""
      variant="text"
      className={`${className || ""} flex justify-center items-center w-[50%] xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 rounded-lg`}
      onClick={onClick}
      disabled={disabled}
    >
      <>
        {loading && (
          <Spinner className="w-5 h-5 ml-3 text-red-900/80" color="red" />
        )}
        {children}
      </>
    </Button>
  );
};

export default LoadingButton;
