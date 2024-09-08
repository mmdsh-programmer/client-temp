import React from "react";
import { FolderEmptyIcon } from "@components/atoms/icons";
import { Button, Typography } from "@material-tailwind/react";

interface IProps {
  error: any;
  retry?: () => void;
}

const Error = ({ error, retry }: IProps) => {
  console.log("hhhaaayyaaaaaa", error);
  return (
    <div className="flex flex-col h-full mx-auto justify-center items-center gap-3 my-2">
      <FolderEmptyIcon className="h-16 w-16 stroke-gray-300" />
      <div className="flex flex-col gap-1">
        <Typography className="title_t3 text-primary">
          {error?.message || "خطای نامشخصی رخ داد"}
        </Typography>
      </div>
      {retry ? (
        <Button
          onClick={retry}
          className="mt-2 py-3 bg-purple-normal hover:bg-purple-normal active:bg-purple-normal flex justify-center items-center w-[50%] xs:w-[100px] h-12 xs:h-8 px-3 xs:px-1 rounded-lg"
        >
          تلاش مجدد
        </Button>
      ) : null}
    </div>
  );
};

export default Error;
