import React from "react";
import { Button, ButtonProps } from "@components/ui/button";
import { Spinner } from "@components/ui/spinner";
import { cn } from "@utils/cn";

export interface IProps extends ButtonProps {
  loading?: boolean;
  buttonClassName?: string;
  spinnerClassName?: string;
}

const LoadingButton = ({
  loading,
  children,
  disabled,
  spinnerClassName,
  buttonClassName,
  ...props
}: IProps) => {
  return (
    <Button disabled={disabled || loading} className={cn(buttonClassName)} {...props}>
      {loading ? <Spinner className={cn("size-5", spinnerClassName)} /> : null}
      {children}
    </Button>
  );
};

export default LoadingButton;
