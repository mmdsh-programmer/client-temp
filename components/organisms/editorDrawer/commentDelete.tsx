import { Button } from "@material-tailwind/react";
import { IComment, IVersion } from "@interface/version.interface";
import { Spinner } from "@components/atoms/spinner";
import { DeleteIcon } from "@components/atoms/icons";
import React from "react";
import useDeleteComment from "@hooks/comment/useDeleteComment";

interface IProps {
  version?: IVersion;
  comment: IComment;
}

const CommentDelete = ({ comment, version }: IProps) => {
  const deleteComment = useDeleteComment();

  const handleDeletecomment = () => {
    if (!version || !comment) return;
    deleteComment.mutate({
      repoId: version.repoId,
      docId: version.documentId,
      commentId: comment?.id,
    });
  };

  return (
    <Button
      {...({} as React.ComponentProps<typeof Button>)}
      className="bg-transparent p-0"
      onClick={handleDeletecomment}
    >
      {deleteComment.isPending ? (
        <Spinner className="h-4 w-4 text-primary" />
      ) : (
        <DeleteIcon className="h-4 w-4 fill-icon-hover" />
      )}
    </Button>
  );
};

export default CommentDelete;
