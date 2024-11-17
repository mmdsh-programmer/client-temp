import React from "react";
import { Button } from "@material-tailwind/react";
import { LikeIcon } from "@components/atoms/icons";
import RenderIf from "../renderIf";

interface IProps {
  onClick: () => void;
  likeCount: number;
  likePending: boolean;
  counterClassName?: string;
  likeButtonClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  isLiked?: boolean;
}

const LikeButton = ({
  onClick,
  likeCount,
  likePending,
  counterClassName,
  likeButtonClassName,
  iconClassName,
  showCounter,
  isLiked,
}: IProps) => {
  return (
    <Button
      onClick={onClick}
      className={`w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700 ${likeButtonClassName}`}
      title={likeCount.toString()}
      disabled={likePending}
    >
      <RenderIf isTrue={!!showCounter}>
        <span className={counterClassName}>{likeCount.toString()}</span>
      </RenderIf>

      <LikeIcon
        className={`flex-none h-5 w-5 stroke-white ${isLiked ? "fill-success-normal" : ""} ${iconClassName}`}
      />
    </Button>
  );
};

export default LikeButton;
