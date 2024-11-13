import React from "react";
import { Button } from "@material-tailwind/react";
import { LikeIcon } from "@components/atoms/icons";
import { IPostInfo } from "@interface/app.interface";
import RenderIf from "../renderIf";

interface IProps {
  onClick: () => void;
  likeCount: number;
  likePending: boolean;
  counterClassName?: string;
  likeButtonClassName?: string;
  postInfo?: IPostInfo;
  iconClassName?: string;
  showCounter?: boolean;
}

const LikeButton = ({
  onClick,
  likeCount,
  likePending,
  counterClassName,
  likeButtonClassName,
  postInfo,
  iconClassName,
  showCounter,
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
        className={`flex-none h-5 w-5 stroke-white ${postInfo?.liked ? "fill-success-normal" : ""} ${iconClassName}`}
      />
    </Button>
  );
};

export default LikeButton;
