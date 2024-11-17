import React from "react";
import DislikeButton from "@components/atoms/button/dislikeButton";
import LikeButton from "@components/atoms/button/likeButton";

interface IProps {
  likeCount: number;
  dislikeCount: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike: () => void;
  onDislike: () => void;
  likePending: boolean;
  dislikePending: boolean;
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
  isLiked,
  isDisliked,
  onLike,
  onDislike,
  likePending,
  dislikePending,
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
        showCounter={showCounter}
        counterClassName={counterClassName}
        isLiked={isLiked}
      />
      <DislikeButton
        dislikeButtonClassName={dislikeButtonClassName}
        iconClassName={iconClassName}
        onClick={onDislike}
        dislikeCount={dislikeCount}
        dislikePending={dislikePending || likePending}
        showCounter={showCounter}
        counterClassName={counterClassName}
        isDisliked={isDisliked}
      />
    </div>
  );
};

export default LikeDislikeButtons;
