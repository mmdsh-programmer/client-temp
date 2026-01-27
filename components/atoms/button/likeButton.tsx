import React from "react";
import { Button } from "@material-tailwind/react";
import { LikeIcon } from "@components/atoms/icons";
import RenderIf from "../renderIf";
import useGetUser from "@hooks/auth/useGetUser";

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
  const {data: userInfo} = useGetUser();
  return (
    <Button
      placeholder=""
      onClick={onClick}
      className={`w-12 h-12 p-0 rounded-full bg-transparent hover:bg-gray-700 ${likeButtonClassName} disabled:opacity-80`}
      title={likeCount.toString()}
      disabled={likePending || !userInfo}
      {...({} as  Omit<React.ComponentProps<typeof Button>, "placeholder">)}
    >
      <RenderIf isTrue={!!showCounter}>
        <span className={counterClassName}>{likeCount.toString()}</span>
      </RenderIf>
      <div className="flex items-center gap-0.5">
      <span>
        {likeCount}
      </span>
      <LikeIcon
        className={`flex-none h-5 w-5 stroke-white ${isLiked ? "fill-success-normal" : ""} ${iconClassName}`}
      />
      </div>
    </Button>
  );
};

export default LikeButton;
