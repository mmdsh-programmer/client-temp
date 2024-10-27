import React from "react";
import { Button } from "@material-tailwind/react";
import { DislikeIcon } from "@components/atoms/icons";

interface IProps {
  onClick: () => void;
  dislikeCount: number;
  dislikePending: boolean;
}

const DislikeButton = ({ onClick, dislikeCount, dislikePending }: IProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700"
      title={dislikeCount.toString()}
      disabled={dislikePending}
    >
      <DislikeIcon className={`h-5 w-5 ${dislikeCount > 0 ? "stroke-error" : "stroke-icon-active"}`} />
    </Button>
  );
};

export default DislikeButton;
