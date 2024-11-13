import React from "react";
import { Button } from "@material-tailwind/react";
import { DislikeIcon } from "@components/atoms/icons";
import { IPostInfo } from "@interface/app.interface";
import RenderIf from "../renderIf";

interface IProps {
  onClick: () => void;
  dislikeCount: number;
  dislikePending: boolean;
  counterClassName?: string;
  dislikeButtonClassName?: string;
  postInfo?: IPostInfo;
  iconClassName?: string;
  showCounter?: boolean;
}

const DislikeButton = ({
  onClick,
  dislikeCount,
  dislikePending,
  counterClassName,
  dislikeButtonClassName,
  postInfo,
  iconClassName,
  showCounter,
}: IProps) => {
  return (
    <Button
      onClick={onClick}
      className={`w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700 ${dislikeButtonClassName}`}
      title={dislikeCount.toString()}
      disabled={dislikePending}
    >
      <RenderIf isTrue={!!showCounter}>
        <span className={counterClassName}>{dislikeCount.toString()}</span>
      </RenderIf>
      
      <DislikeIcon
        className={`flex-none h-5 w-5 stroke-white ${postInfo?.disliked ? " fill-error" : ""} ${iconClassName}`}
      />
    </Button>
  );
};

export default DislikeButton;
