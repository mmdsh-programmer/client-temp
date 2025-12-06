import React from "react";
import useLikeComment from "@hooks/core/useLikeComment";
import useDislikeComment from "@hooks/core/useDislikeComment";
import { IComment } from "@interface/version.interface";
import LikeDislikeButtons from "@components/molecules/likeDislikeButton";
import { usePublishStore } from "@store/publish";
import { useDocumentStore } from "@store/document";

interface IProps {
  commentItem: IComment;
  likeButtonClassName?: string;
  dislikeButtonClassName?: string;
  wrapperClassName?: string;
  iconClassName?: string;
  showCounter?: boolean;
  counterClassName?: string;
}

const CommentLikeAndDislike = ({
  commentItem,
  likeButtonClassName,
  dislikeButtonClassName,
  wrapperClassName,
  iconClassName,
  showCounter,
  counterClassName,
}: IProps) => {
  const { publishPageSelectedDocument } = usePublishStore();
  const { selectedDocument } = useDocumentStore();

  const likeHook = useLikeComment();
  const disLikeHook = useDislikeComment();

  const handleLike = () => {
    likeHook.mutate({
      repoId: publishPageSelectedDocument
        ? publishPageSelectedDocument!.repoId
        : selectedDocument!.repoId,
      documentId: publishPageSelectedDocument
        ? publishPageSelectedDocument!.id
        : selectedDocument!.id,
      commentId: commentItem.id,
      postId: publishPageSelectedDocument
        ? publishPageSelectedDocument!.customPostId
        : selectedDocument!.customPostId,
    });
  };

  const handleDisLike = () => {
    disLikeHook.mutate({
      repoId: publishPageSelectedDocument
        ? publishPageSelectedDocument!.repoId
        : selectedDocument!.repoId,
      documentId: publishPageSelectedDocument
        ? publishPageSelectedDocument!.id
        : selectedDocument!.id,
      commentId: commentItem.id,
      postId: publishPageSelectedDocument
        ? publishPageSelectedDocument!.customPostId
        : selectedDocument!.customPostId,
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
