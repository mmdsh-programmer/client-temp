import React from "react";
import useGetLikeList from "@hooks/core/useGetLikeList";
import useGetDislikeList from "@hooks/core/useGetDislikeList";
import useLike from "@hooks/core/useLike";
import useDislike from "@hooks/core/useDislike";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import useGetPostInfo from "@hooks/core/useGetPostInfo";
import { Spinner } from "@material-tailwind/react";

interface IProps {
  postId: number;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const LikeAndDislike = ({
  postId,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
}: IProps) => {
  const {
    data: getLikes,
    isLoading: isLoadingLikeList,
    isFetching: isFetchingLikeList,
  } = useGetLikeList(postId, 30);

  const {
    data: getDislikes,
    isLoading: isLoadingDislikeList,
    isFetching: isFetchingDislikeList,
  } = useGetDislikeList(postId, 30);

  const {
    data: getPostInfo,
    isLoading: isLoadingPostInfo,
    isFetching: isFetchingPostInfo,
  } = useGetPostInfo(postId);

  const isLoading =
    isLoadingLikeList || isLoadingDislikeList || isLoadingPostInfo;

  const isFetcing =
    isFetchingLikeList || isFetchingDislikeList || isFetchingPostInfo;

  const postInfo = getPostInfo?.[0];

  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    if (!postId) return;
    likeHook.mutate({
      postId,
      like: !postInfo?.liked,
    });
  };

  const handleDisLike = () => {
    if (!postId) return;
    disLikeHook.mutate({
      postId,
      dislike: !postInfo?.disliked,
    });
  };

  if (isLoading) {
    return (
      <div className={`flex items-center w-fit ${wrapperClassName}`}>
        <Spinner className="h-5 w-5" color="deep-purple" />
      </div>
    );
  }

  return (
    <LikeDislikeButtons
      postInfo={postInfo}
      likeCount={getLikes?.pages[0].total || 0}
      dislikeCount={getDislikes?.pages[0].total || 0}
      likePending={likeHook.isPending || isFetcing}
      dislikePending={disLikeHook.isPending || isFetcing}
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

export default LikeAndDislike;
