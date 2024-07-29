import React from "react";
import { Spinner } from "@material-tailwind/react";
import Text from "@components/atoms/typograghy/text";

interface IProps {
  text: string;
}

const SpinnerText = ({ text }: IProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-8 h-8" color="deep-purple" />
      <Text className="font-bold mr-2"> {text}</Text>
    </div>
  );
};

export default SpinnerText;
