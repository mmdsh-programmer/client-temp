import React from "react";
import DislikeButton from "@components/atoms/button/dislikeButton";
import LikeButton from "@components/atoms/button/likeButton";

interface IProps {
  likeCount: number;
  dislikeCount: number;
  onLike: () => void;
  onDislike: () => void;
  likePending: boolean;
  dislikePending: boolean;
}

const LikeDislikeButtons = ({
  likeCount,
  dislikeCount,
  onLike,
  onDislike,
  likePending,
  dislikePending,
}: IProps) => {
  return (
    <div className="flex">
      <LikeButton onClick={onLike} likeCount={likeCount} likePending={likePending} />
      <DislikeButton onClick={onDislike} dislikeCount={dislikeCount} dislikePending={dislikePending} />
    </div>
  );
};

export default LikeDislikeButtons;
