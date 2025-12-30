import React from "react";
import { TickIcon, XIcon } from "@components/atoms/icons";
import { IAnswerMetadata, IQuestion } from "@interface/qa.interface";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useConfirmAnswer from "@hooks/questionAnswer/useConfirmAnswer";
import useRejectAnswer from "@hooks/questionAnswer/useRejectAnswer";

interface IProps {
  answerItem: IQuestion;
}

const DocumentAnswerConfirmReject = ({ answerItem }: IProps) => {
  const confirmAnswer = useConfirmAnswer();
  const rejectAnswer = useRejectAnswer();

  const answerMetadata = JSON.parse(answerItem.metadata) as IAnswerMetadata;

  const handleConfirm = () => {
    confirmAnswer.mutate({
      repoId: answerMetadata.repoId,
      documentId: answerMetadata.documentId,
      questionId: answerMetadata.questionPostId,
      entityId: answerItem.id,
      callBack: () => {
        toast.success("پاسخ تایید شد.");
      },
    });
  };

  const handleReject = () => {
    rejectAnswer.mutate({
      repoId: answerMetadata.repoId,
      documentId: answerMetadata.documentId,
      questionId: answerMetadata.questionPostId,
      entityId: answerItem.id,
      callBack: () => {
        toast.error("پاسخ حذف شد.");
      },
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="form_label border-none !p-0 !text-gray-500"
        onClick={handleConfirm}
        {...({} as React.ComponentProps<typeof Button>)}
        title="تایید پاسخ"
        disabled={confirmAnswer.isPending || rejectAnswer.isPending}
      >
        <TickIcon className="block h-4 w-4 !fill-green-500" />
      </Button>
      <Button
        variant="text"
        className="form_label border-none !p-0 !text-gray-500"
        onClick={handleReject}
        {...({} as React.ComponentProps<typeof Button>)}
        title="عدم تایید پاسخ"
        disabled={confirmAnswer.isPending || rejectAnswer.isPending}
      >
        <XIcon className="block h-5 w-5 !fill-error" />
      </Button>
    </div>
  );
};

export default DocumentAnswerConfirmReject;
