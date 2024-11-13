import React from "react";
import DislikeButton from "@components/atoms/button/dislikeButton";
import LikeButton from "@components/atoms/button/likeButton";
import { IPostInfo } from "@interface/app.interface";

interface IProps {
  likeCount: number;
  dislikeCount: number;
  onLike: () => void;
  onDislike: () => void;
  likePending: boolean;
  dislikePending: boolean;
  postInfo?: IPostInfo;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const LikeDislikeButtons = ({
  likeCount,
  dislikeCount,
  onLike,
  onDislike,
  likePending,
  dislikePending,
  postInfo,
  wrapperClassName,
  likeButtonClassName,
  dislikeButtonClassName,
  iconClassName,
  showCounter,
  counterClassName,
}: IProps) => {
  return (
    <div className={`flex ${wrapperClassName}`}>
      <LikeButton
        likeButtonClassName={likeButtonClassName}
        iconClassName={iconClassName}
        onClick={onLike}
        likeCount={likeCount}
        likePending={likePending || dislikePending}
        postInfo={postInfo}
        showCounter={showCounter}
        counterClassName={counterClassName}
      />
      <DislikeButton
        dislikeButtonClassName={dislikeButtonClassName}
        iconClassName={iconClassName}
        onClick={onDislike}
        dislikeCount={dislikeCount}
        dislikePending={dislikePending || likePending}
        postInfo={postInfo}
        showCounter={showCounter}
        counterClassName={counterClassName}
      />
    </div>
  );
};

export default LikeDislikeButtons;
