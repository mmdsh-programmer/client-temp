import React from "react";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import { IQAList } from "@interface/qa.interface";
import useLike from "@hooks/core/useLike";
import useDislike from "@hooks/core/useDislike";

interface IProps {
  postInfo: IQAList;
  parentPostId: number;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const QuestionAnswerLikeAndDislike = ({
  postInfo,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
  parentPostId,
}: IProps) => {
  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    likeHook.mutate({
      postId: postInfo.id,
      like: !postInfo.userPostInfo.liked,
      parentPostId,
    });
  };

  const handleDisLike = () => {
    disLikeHook.mutate({
      postId: postInfo.id,
      dislike: !postInfo.userPostInfo.disliked,
      parentPostId,
    });
  };

  return (
    <LikeDislikeButtons
      likeCount={postInfo.numOfLikes}
      dislikeCount={postInfo.numOfDisLikes}
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
      isLiked={postInfo.userPostInfo.liked}
      isDisliked={postInfo.userPostInfo.disliked}
    />
  );
};

export default QuestionAnswerLikeAndDislike;
