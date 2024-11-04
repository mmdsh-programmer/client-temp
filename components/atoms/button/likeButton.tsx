import React from "react";
import { Button } from "@material-tailwind/react";
import { LikeIcon } from "@components/atoms/icons";
import { IPostInfo } from "@interface/app.interface";

interface IProps {
  onClick: () => void;
  likeCount: number;
  likePending: boolean;
  likeButtonClassName?: string;
  postInfo?: IPostInfo;
  iconClassName?: string;
}

const LikeButton = ({
  onClick,
  likeCount,
  likePending,
  likeButtonClassName,
  postInfo,
  iconClassName,
}: IProps) => {
  return (
    <Button
      onClick={onClick}
      className={`w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700 ${likeButtonClassName}`}
      title={likeCount.toString()}
      disabled={likePending}
    >
      <LikeIcon
        className={`flex-none h-5 w-5 stroke-white ${postInfo?.liked ? "fill-success-normal" : ""} ${iconClassName}`}
      />
    </Button>
  );
};

export default LikeButton;
