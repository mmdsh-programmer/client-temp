import { Typography } from "@material-tailwind/react";
import React from "react";

interface IProps {
  name: string;
  extension: string;
}

const FileLabel = ({ name, extension }: IProps) => {
  return (
    <Typography className="label">
      {name}.{extension}
    </Typography>
  );
};

export default FileLabel;
