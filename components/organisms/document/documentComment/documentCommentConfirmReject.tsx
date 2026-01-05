import React from "react";
import { TickIcon, XIcon } from "@components/atoms/icons";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { IComment, ICommentItem } from "@interface/version.interface";
import useConfirmComment from "@hooks/comment/useConfirmComment";
import useRejectComment from "@hooks/comment/useRejectComment";
import { useDocumentStore } from "@store/document";

interface IProps {
  commentItem: IComment | ICommentItem;
}

const DocumentCommentConfirmReject = ({ commentItem }: IProps) => {
  const { selectedDocument } = useDocumentStore();
  const confirmComment = useConfirmComment();
  const rejectComment = useRejectComment();

  const handleConfirm = () => {
    confirmComment.mutate({
      repoId: selectedDocument!.repoId,
      documentId: selectedDocument!.id,
      commentId: commentItem.id,
      callBack: () => {
        toast.success("نظر تایید شد.");
      },
    });
  };

  const handleReject = () => {
    rejectComment.mutate({
      repoId: selectedDocument!.repoId,
      documentId: selectedDocument!.id,
      commentId: commentItem.id,
      callBack: () => {
        toast.error("نظر حذف شد.");
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="text"
        className="form_label border-none !p-0 !text-gray-500"
        onClick={handleConfirm}
        {...({} as React.ComponentProps<typeof Button>)}
        title="تایید نظر"
        disabled={confirmComment.isPending || rejectComment.isPending}
      >
        <TickIcon className="block h-4 w-4 !fill-green-500" />
      </Button>
      <Button
        variant="text"
        className="form_label border-none !p-0 !text-gray-500"
        onClick={handleReject}
        {...({} as React.ComponentProps<typeof Button>)}
        title="عدم تایید نظر"
        disabled={confirmComment.isPending || rejectComment.isPending}
      >
        <XIcon className="block h-5 w-5 !fill-error" />
      </Button>
    </div>
  );
};

export default DocumentCommentConfirmReject;
