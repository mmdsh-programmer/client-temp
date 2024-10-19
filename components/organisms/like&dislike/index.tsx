import React from "react";
import useGetLikeList from "@hooks/core/useGetLikeList";
import useGetDislikeList from "@hooks/core/useGetDislikeList";
import { IVersion } from "@interface/version.interface";
import useLike from "@hooks/core/useLike";
import useDislike from "@hooks/core/useDislike";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";

interface IProps {
  version?: IVersion;
}

const LikeAndDislike = ({ version }: IProps) => {
  const { data: getLikes } = useGetLikeList(version!.postId, 30);
  const { data: getDislikes } = useGetDislikeList(version!.postId, 30);

  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    if (!version) return;
    likeHook.mutate({
      postId: version.postId,
    });
  };

  const handleDisLike = () => {
    if (!version) return;
    disLikeHook.mutate({
      postId: version.postId,
    });
  };

  return (
    <LikeDislikeButtons
      likeCount={getLikes?.pages[0].total || 0}
      dislikeCount={getDislikes?.pages[0].total || 0}
      likePending={likeHook.isPending}
      dislikePending={disLikeHook.isPending}
      onLike={handleLike}
      onDislike={handleDisLike}
    />
  );
};

export default LikeAndDislike;
