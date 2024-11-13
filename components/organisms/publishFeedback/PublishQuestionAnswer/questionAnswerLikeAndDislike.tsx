import React from "react";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import useDislike from "@hooks/core/useDislike";
import useLike from "@hooks/core/useLike";
import { IQAList } from "@interface/qa.interface";
import { useRecoilValue } from "recoil";
import { publishVersionAtom } from "@atom/publish";

interface IProps {
  item: IQAList;
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
  const getPublishVersion = useRecoilValue(publishVersionAtom);
  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    likeHook.mutate({
      postId: item.id,
      like: !item.userPostInfo.liked,
      parentPostId: getPublishVersion?.postId,
    });
  };

  const handleDisLike = () => {
    disLikeHook.mutate({
      postId: item.id,
      dislike: !item.userPostInfo.disliked,
      parentPostId: getPublishVersion?.postId,
    });
  };

  return (
    <LikeDislikeButtons
      likeCount={item.numOfLikes}
      dislikeCount={item.numOfLikes}
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
    />
  );
};

export default QuestionAnswerLikeAndDislike;
