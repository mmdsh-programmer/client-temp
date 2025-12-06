import React from "react";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import useLike from "@hooks/core/useLike";
import useDislike from "@hooks/core/useDislike";
import { IQuestion } from "@interface/qa.interface";

interface IProps {
  item: IQuestion;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const QuestionAnswerLikeAndDislike = ({
  item,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
}: IProps) => {
  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    likeHook.mutate({
      postId: item.id,
    });
  };

  const handleDisLike = () => {
    disLikeHook.mutate({
      postId: item.id,
    });
  };

  return (
    <LikeDislikeButtons
      likePending={likeHook.isPending}
      dislikePending={disLikeHook.isPending}
      likeCount={item.numOfLikes}
      dislikeCount={item.numOfDisLikes}
      onLike={handleLike}
      onDislike={handleDisLike}
      wrapperClassName={wrapperClassName}
      likeButtonClassName={likeButtonClassName}
      dislikeButtonClassName={dislikeButtonClassName}
      iconClassName={iconClassName}
      showCounter={showCounter}
      counterClassName={counterClassName}
      isLiked={item.userPostInfo.liked}
      isDisliked={item.userPostInfo.disliked}
    />
  );
};

export default QuestionAnswerLikeAndDislike;
