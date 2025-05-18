import React from "react";
import { Typography } from "@material-tailwind/react";
import InputAtom from "@components/atoms/input";
import { IDomainTheme } from "@interface/domain.interface";

interface ColorInputProps {
  label: string;
  color: string;
  fieldName: keyof IDomainTheme;
  description: string;
  onColorChange: (color: string, field: keyof IDomainTheme) => void;
}

const ColorInput = ({ label, color, fieldName, description, onColorChange }: ColorInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography className="form_label">{label}</Typography>
      <div className="flex h-9 w-full flex-grow items-center gap-2 overflow-hidden rounded-lg border-[1px] border-normal bg-gray-50 pl-0 pr-2">
        <Typography className="ml-3 !w-full flex-grow">{color}</Typography>
        <InputAtom
          placeholder="جستجو ..."
          type="color"
          className="search-repo__input ml-3 !h-12 !w-12 !min-w-10 cursor-pointer !overflow-hidden border-none bg-gray-50 outline-none focus:border-none"
          value={color}
          onChange={(e) => {
            onColorChange(e.target.value, fieldName);
          }}
        />
      </div>
      <Typography className="caption_c2 text-gray-500 pr-2">
        {description}
      </Typography>
    </div>
  );
};

export default ColorInput; 