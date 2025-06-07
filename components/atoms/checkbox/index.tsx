/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Typography } from "@material-tailwind/react";

interface IProps {
  checked?: boolean;
  onChange?: any;
  onClick?: any;
  disabled?: boolean;
  label?: string;
  name?: string;
  className?: string;
  readOnly?: boolean;
}

const CustomCheckbox = ({
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
      <span className={`${className} relative flex h-5 w-5 items-center justify-center`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          className={`peer h-5 w-5 appearance-none rounded-md border border-gray-300 ${readOnly ? "checked:opacity-40" : ""} cursor-pointer bg-white outline-none transition-colors duration-200 checked:border-transparent checked:!bg-primary-normal`}
          {...props}
        />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <Typography className="form_label">{label}</Typography>
    </label>
  );
};

export default CustomCheckbox;
