import React, { useState } from "react";
import { Spinner } from "@components/atoms/spinner";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import useDislike from "@hooks/like&dislike/useDislike";
import useLike from "@hooks/like&dislike/useLike";
import { IDocumentMetadata } from "@interface/document.interface";
import useGetPublishDocumentSocial from "@hooks/publish/useGetPublishDocumentSocial";

interface IProps {
  document: IDocumentMetadata | null;
  initLikeCount?: number;
  initDislikeCount?: number;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const PublishLikeAndDislike = ({
  document,
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

  const { data: getDocumentSocial, isLoading } = useGetPublishDocumentSocial(document!.id);

  const likeHook = useLike();
  const disLikeHook = useDislike();

  const handleLike = () => {
    if (!document?.id) return;
    likeHook.mutate({
      repoId: document.repoId,
      documentId: document.id,
      postId: document.customPostId,
      callBack: () => {
        if (!enable) {
          setEnable(true);
        }
      },
    });
  };

  const handleDisLike = () => {
    if (!document?.id) return;
    disLikeHook.mutate({
      repoId: document.repoId,
      documentId: document.id,
      postId: document.customPostId,
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
      likeCount={getDocumentSocial?.info.numOfLikes || 0}
      dislikeCount={getDocumentSocial?.info.numOfDisLikes || 0}
      likePending={likeHook.isPending || isLoading}
      dislikePending={disLikeHook.isPending || isLoading}
      onLike={handleLike}
      onDislike={handleDisLike}
      wrapperClassName={wrapperClassName}
      likeButtonClassName={likeButtonClassName}
      dislikeButtonClassName={dislikeButtonClassName}
      iconClassName={iconClassName}
      showCounter={showCounter}
      counterClassName={counterClassName}
      isLiked={getDocumentSocial?.info.userPostInfo?.liked || false}
      isDisliked={getDocumentSocial?.info.userPostInfo?.disliked || false}
    />
  );
};

export default PublishLikeAndDislike;
