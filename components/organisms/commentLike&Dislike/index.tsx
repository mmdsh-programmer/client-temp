import React from "react";
import useLikeComment from "@hooks/core/useLikeComment";
import useDislikeComment from "@hooks/core/useDislikeComment";
import { IComment } from "@interface/version.interface";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";

interface IProps {
  commentItem: IComment;
  postId: number;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const CommentLikeAndDislike = ({
  commentItem,
  postId,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
}: IProps) => {
  const likeHook = useLikeComment();
  const disLikeHook = useDislikeComment();

  const handleLike = () => {
    likeHook.mutate({
      commentId: commentItem.id,
      postId,
      dislike: commentItem.liked,
    });
  };

  const handleDisLike = () => {
    disLikeHook.mutate({
      commentId: commentItem.id,
      postId,
      dislike: !commentItem.disliked,
    });
  };

  return (
    <LikeDislikeButtons
      likeCount={commentItem.numOfLikes}
      dislikeCount={commentItem.numOfDislikes}
      likePending={likeHook.isPending}
      dislikePending={disLikeHook.isPending}
      onLike={handleLike}
      onDislike={handleDisLike}
      wrapperClassName={wrapperClassName}
      likeButtonClassName={likeButtonClassName}
      dislikeButtonClassName={dislikeButtonClassName}
      iconClassName={iconClassName}
      showCounter={showCounter}
      counterClassName={counterClassName}
      isLiked={commentItem.liked}
      isDisliked={commentItem.disliked}
    />
  );
};

export default CommentLikeAndDislike;
