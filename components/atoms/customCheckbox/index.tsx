import React from "react";
import { Checkbox } from "@material-tailwind/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ICustomCheckboxProps {
  label: React.ReactNode;
  color?: "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow" | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue" | "indigo" | "deep-purple" | "purple" | "pink" | "red";
  className?: string;
  register: Omit<UseFormRegisterReturn, "ref">;
}

const CustomCheckbox = ({ 
  label, 
  color = "deep-purple", 
  className, 
  register
}: ICustomCheckboxProps) => {
  return (
    <Checkbox
      label={label}
      color={color}
      className={className}
      crossOrigin={undefined}
      onChange={register.onChange}
      onBlur={register.onBlur}
      name={register.name}
    />
  );
};

export default CustomCheckbox; 