import React, { useState } from "react";
import { Spinner } from "@components/atoms/spinner";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import useDislike from "@hooks/core/useDislike";
import useGetDislikeList from "@hooks/core/useGetDislikeList";
import useGetLikeList from "@hooks/core/useGetLikeList";
import useGetPostInfo from "@hooks/core/useGetPostInfo";
import useLike from "@hooks/core/useLike";
import { useVersionStore } from "@store/version";

interface IProps {
  postId: number;
  initLikeCount?: number;
  initDislikeCount?: number;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const LikeAndDislike = ({
  postId,
  initLikeCount,
  initDislikeCount,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
}: IProps) => {
  const [enable, setEnable] = useState(
    typeof initLikeCount === "undefined" && typeof initDislikeCount === "undefined",
  );

  const { selectedVersion } = useVersionStore();

  const {
    data: getLikes,
    isLoading: isLoadingLikeList,
    isFetching: isFetchingLikeList,
  } = useGetLikeList(postId, 30, enable);

  const {
    data: getDislikes,
    isLoading: isLoadingDislikeList,
    isFetching: isFetchingDislikeList,
  } = useGetDislikeList(postId, 30, enable);

  const {
    data: getPostInfo,
    isLoading: isLoadingPostInfo,
    isFetching: isFetchingPostInfo,
  } = useGetPostInfo(postId, enable);

  const isLoading = isLoadingLikeList || isLoadingDislikeList || isLoadingPostInfo;

  const isFetcing = isFetchingLikeList || isFetchingDislikeList || isFetchingPostInfo;

  const postInfo = getPostInfo?.[0];

  const likeCount = enable ? getLikes?.pages[0].total || 0 : initLikeCount || 0;
  const dislikeCount = enable ? getDislikes?.pages[0].total || 0 : initDislikeCount || 0;

  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    if (!postId || !selectedVersion) return;
    likeHook.mutate({
      repoId: selectedVersion.repoId,
      documentId: selectedVersion.documentId,
      postId,
      callBack: () => {
        if (!enable) {
          setEnable(true);
        }
      },
    });
  };

  const handleDisLike = () => {
    if (!postId || !selectedVersion) return;
    disLikeHook.mutate({
      repoId: selectedVersion.repoId,
      documentId: selectedVersion.documentId,
      postId,
      callBack: () => {
        if (!enable) {
          setEnable(true);
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className={`flex w-fit items-center ${wrapperClassName}`}>
        <Spinner className="h-5 w-5 text-primary" />
      </div>
    );
  }

  return (
    <LikeDislikeButtons
      likeCount={likeCount}
      dislikeCount={dislikeCount}
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
      isLiked={postInfo?.liked}
      isDisliked={postInfo?.disliked}
    />
  );
};

export default LikeAndDislike;
