import React from "react";
import { Button } from "@material-tailwind/react";
import { DislikeIcon } from "@components/atoms/icons";
import { IPostInfo } from "@interface/app.interface";

interface IProps {
  onClick: () => void;
  dislikeCount: number;
  dislikePending: boolean;
  dislikeButtonClassName?: string;
  postInfo?: IPostInfo;
  iconClassName?: string;
}

const DislikeButton = ({
  onClick,
  dislikeCount,
  dislikePending,
  dislikeButtonClassName,
  postInfo,
  iconClassName,
}: IProps) => {
  return (
    <Button
      onClick={onClick}
      className={`w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700 ${dislikeButtonClassName}`}
      title={dislikeCount.toString()}
      disabled={dislikePending}
    >
      <DislikeIcon
        className={`flex-none h-5 w-5 stroke-white ${postInfo?.disliked ? " fill-error" : ""} ${iconClassName}`}
      />
    </Button>
  );
};

export default DislikeButton;
