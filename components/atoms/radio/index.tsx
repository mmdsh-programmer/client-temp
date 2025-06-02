import { Typography } from "@material-tailwind/react";
import React from "react";

interface IProps {
  checked?: boolean;
  onChange?: any;
  onClick?: any;
  disabled?: boolean;
  label?: string | React.ReactNode;
  name?: string;
  className?: string;
  readOnly?: boolean;
  value?: any;
}

const CustomRadio = ({
  checked,
  onChange,
  disabled,
  label,
  name,
  className,
  readOnly,
  ...props
}: IProps) => {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2">
      <span className={`relative flex h-5 w-5 items-center justify-center`}>
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          className={`peer h-5 w-5 appearance-none rounded-full border border-gray-300 ${readOnly ? "checked:opacity-40" : ""} cursor-pointer bg-white outline-none transition-colors duration-200 checked:border-transparent`}
          {...props}
        />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="6" fill="currentColor" />
        </svg>
      </span>
      {typeof label === "string" ? <Typography className="form_label">{label}</Typography> : label}
    </label>
  );
};

export default CustomRadio;
