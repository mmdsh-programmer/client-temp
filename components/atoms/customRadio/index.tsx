import React from "react";
import { Radio } from "@material-tailwind/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ICustomRadioProps {
  label: string;
  value: string;
  color?: "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow" | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue" | "indigo" | "deep-purple" | "purple" | "pink" | "red";
  className?: string;
  register: Omit<UseFormRegisterReturn, "ref">;
  containerClassName?: string;
}

const CustomRadio = ({ 
  label, 
  value, 
  color = "deep-purple", 
  className, 
  register,
  containerClassName
}: ICustomRadioProps) => {
  return (
    <Radio
      label={label}
      value={value}
      color={color}
      className={className}
      containerProps={{ className: containerClassName }}
      labelProps={{ className: "text-[13px] truncate" }}
      crossOrigin={undefined}
      onChange={register.onChange}
      onBlur={register.onBlur}
      name={register.name}
    />
  );
};

export default CustomRadio; 