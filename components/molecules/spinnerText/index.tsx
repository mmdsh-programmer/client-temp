import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface IProps {
  text: string;
}

const SpinnerText = ({ text }: IProps) => {
  return (
    <div className="flex items-center gap-2">
      <Spinner className="size-8 text-primary" />
      <p className="font-bold text-panel-foreground-primary">{text}</p>
    </div>
  );
};

export default SpinnerText;
