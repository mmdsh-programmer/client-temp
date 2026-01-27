import React from "react";
import { Button } from "@material-tailwind/react";
import { DislikeIcon } from "@components/atoms/icons";
import RenderIf from "../renderIf";
import useGetUser from "@hooks/auth/useGetUser";

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
  isDisliked,
}: IProps) => {
  const { data: userInfo } = useGetUser();
  return (
    <Button
      placeholder=""
      onClick={onClick}
      className={`h-12 w-12 rounded-full bg-transparent p-0 hover:bg-gray-700 disabled:opacity-80 ${dislikeButtonClassName}`}
      title={dislikeCount.toString()}
      disabled={dislikePending || !userInfo}
      {...({} as Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <RenderIf isTrue={!!showCounter}>
        <span className={counterClassName}>{dislikeCount.toString()}</span>
      </RenderIf>
      <div className="flex items-center gap-0.5">
        <span>{dislikeCount}</span>
        <DislikeIcon
          className={`h-5 w-5 flex-none stroke-white ${isDisliked ? "fill-error" : ""} ${iconClassName}`}
        />
      </div>
    </Button>
  );
};

export default DislikeButton;
