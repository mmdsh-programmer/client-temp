import React from "react";
import { Button } from "@material-tailwind/react";
import { DislikeIcon } from "@components/atoms/icons";
import RenderIf from "../renderIf";

interface IProps {
  onClick: () => void;
  dislikeCount: number;
  dislikePending: boolean;
  counterClassName?: string;
  dislikeButtonClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  isDisliked?: boolean;
}

const DislikeButton = ({
  onClick,
  dislikeCount,
  dislikePending,
  counterClassName,
  dislikeButtonClassName,
  iconClassName,
  showCounter,
  isDisliked
}: IProps) => {
  return (
    <Button
      placeholder=""
      onClick={onClick}
      className={`w-8 h-8 p-0 rounded-full bg-transparent hover:bg-gray-700 ${dislikeButtonClassName}`}
      title={dislikeCount.toString()}
      disabled={dislikePending}
      {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <RenderIf isTrue={!!showCounter}>
        <span className={counterClassName}>{dislikeCount.toString()}</span>
      </RenderIf>
      
      <DislikeIcon
        className={`flex-none h-5 w-5 stroke-white ${isDisliked ? " fill-error" : ""} ${iconClassName}`}
      />
    </Button>
  );
};

export default DislikeButton;
