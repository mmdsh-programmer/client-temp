import React from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { IComment, IVersion } from "@interface/version.interface";
import useDeleteComment from "@hooks/core/useDeleteComment";
import { DeleteIcon } from "@components/atoms/icons";

interface IProps {
  version?: IVersion;
  comment: IComment;
}

const CommentDelete = ({ comment, version }: IProps) => {
  const deleteComment = useDeleteComment();

  const handleDeletecomment = () => {
    if (!version || !comment) return;
    deleteComment.mutate({
      postId: version.postId,
      commentId: comment?.id,
    });
  };

  return (
    <Button className="bg-transparent p-0" onClick={handleDeletecomment}>
      {deleteComment.isPending ? (
        <Spinner className="h-4 w-4" color="deep-purple" />
      ) : (
        <DeleteIcon className="h-4 w-4 fill-icon-hover" />
      )}
    </Button>
  );
};

export default CommentDelete;
