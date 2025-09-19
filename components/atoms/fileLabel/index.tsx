import { Typography } from "@material-tailwind/react";
import React from "react";

interface IProps {
  name: string;
  extension: string;
}

const FileLabel = ({ name, extension }: IProps) => {
  return (
    <Typography
      placeholder=""
      className="label"
      {...({} as  Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
    >
      {name}.{extension}
    </Typography>
  );
};

export default FileLabel;
