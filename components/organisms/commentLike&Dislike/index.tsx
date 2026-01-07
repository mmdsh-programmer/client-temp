import React, { useEffect, useState } from "react";
import useDislikeComment from "@hooks/like&dislike/useDislikeComment";
import { IComment } from "@interface/version.interface";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import useLikeComment from "@hooks/like&dislike/useLikeComment";

interface IProps {
  commentItem: IComment;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
  postId: number;
  repoId: number;
  docId: number;
}

const CommentLikeAndDislike = ({
  commentItem,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
  postId,
  repoId,
  docId,
}: IProps) => {
  const [localItem, setLocalItem] = useState<IComment>(commentItem);

  const likeHook = useLikeComment();
  const disLikeHook = useDislikeComment();

  const handleLike = () => {
    likeHook.mutate({
      commentId: commentItem.id,
      postId,
      repoId,
      docId,
      callBack: () => {
        if (!localItem.liked) {
          setLocalItem({
            ...localItem,
            liked: !localItem.liked,
            disliked: false,
            numOfLikes: localItem.numOfLikes + 1,
            numOfDislikes:
              localItem.disliked && localItem.numOfDislikes > 0
                ? localItem.numOfDislikes - 1
                : localItem.numOfDislikes,
          });
        }
      },
    });
  };

  const handleDisLike = () => {
    disLikeHook.mutate({
      commentId: commentItem.id,
      repoId,
      docId,
      postId,
      callBack: () => {
        if (!localItem.disliked) {
          setLocalItem({
            ...localItem,
            disliked: !localItem.disliked,
            liked: false,
            numOfDislikes: localItem.numOfDislikes + 1,
            numOfLikes:
              localItem.liked && localItem.numOfLikes > 0
                ? localItem.numOfLikes - 1
                : localItem.numOfLikes,
          });
        }
      },
    });
  };

  useEffect(() => {
    setLocalItem(commentItem);
  }, []);

  return (
    <LikeDislikeButtons
      likeCount={localItem.numOfLikes}
      dislikeCount={localItem.numOfDislikes}
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
      isLiked={localItem.liked}
      isDisliked={localItem.disliked}
    />
  );
};

export default CommentLikeAndDislike;
