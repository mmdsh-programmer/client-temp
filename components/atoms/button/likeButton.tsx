import React from "react";
import { Button } from "@material-tailwind/react";
import { LikeIcon } from "@components/atoms/icons";

interface IProps {
  onClick: () => void;
  likeCount: number;
  likePending: boolean;
}

const LikeButton = ({ onClick, likeCount, likePending }: IProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
      title={likeCount.toString()}
      disabled={likePending}
    >
      <LikeIcon className={`h-5 w-5 ${likeCount > 0 ? "stroke-white fill-success-normal" : "stroke-white"}`} />
    </Button>
  );
};

export default LikeButton;
