import React, { useEffect, useState } from "react";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import useLike from "@hooks/like&dislike/useLike";
import useDislike from "@hooks/like&dislike/useDislike";
import { IQuestion } from "@interface/qa.interface";

interface IProps {
  repoId: number;
  documentId: number;
  item: IQuestion;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const QuestionAnswerLikeAndDislike = ({
  repoId,
  documentId,
  item,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
}: IProps) => {
  const [localItem, setLocalItem] = useState<IQuestion>(item);

  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    likeHook.mutate({
      repoId,
      documentId,
      postId: item.id,
      callBack: () => {
        if (!localItem.userPostInfo.liked) {
          setLocalItem({
            ...localItem,
            userPostInfo: {
              ...localItem.userPostInfo,
              liked: !localItem.userPostInfo.liked,
              disliked: false,
            },
            numOfLikes: localItem.numOfLikes + 1,
            numOfDisLikes: localItem.numOfDisLikes > 0 ? localItem.numOfDisLikes - 1 : 0,
          });
        }
      },
    });
  };

  const handleDisLike = () => {
    disLikeHook.mutate({
      repoId,
      documentId,
      postId: localItem.id,
      callBack: () => {
        if (!localItem.userPostInfo.disliked) {
          setLocalItem({
            ...localItem,
            userPostInfo: {
              ...localItem.userPostInfo,
              disliked: !localItem.userPostInfo.disliked,
              liked: false,
            },
            numOfDisLikes: localItem.numOfDisLikes + 1,
            numOfLikes: localItem.numOfLikes > 0 ? localItem.numOfLikes - 1 : 0,
          });
        }
      },
    });
  };

  useEffect(() => {
    setLocalItem(item);
  }, [item]);

  return (
    <LikeDislikeButtons
      likePending={likeHook.isPending}
      dislikePending={disLikeHook.isPending}
      likeCount={localItem.numOfLikes}
      dislikeCount={localItem.numOfDisLikes}
      onLike={handleLike}
      onDislike={handleDisLike}
      wrapperClassName={wrapperClassName}
      likeButtonClassName={likeButtonClassName}
      dislikeButtonClassName={dislikeButtonClassName}
      iconClassName={iconClassName}
      showCounter={showCounter}
      counterClassName={counterClassName}
      isLiked={localItem.userPostInfo.liked}
      isDisliked={localItem.userPostInfo.disliked}
    />
  );
};

export default QuestionAnswerLikeAndDislike;
