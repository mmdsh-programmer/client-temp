import React from "react";
import Input from "../../atoms/input/formInput";

interface IProps {
  className?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  classNameLabel?: string;
}

const InputLabel = ({
  className,
  classNameLabel,
  label,
  placeholder,
  type,
}: IProps) => {
  return (
    <div className="flex flex-col text-right">
      {label ? <label className={classNameLabel}>{label}</label> : null}
      <Input type={type} className={className} placeholder={placeholder} />
    </div>
  );
};

export default InputLabel;