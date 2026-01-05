import React from "react";
import { TickIcon, XIcon } from "@components/atoms/icons";
import useConfirmQuestion from "@hooks/questionAnswer/useConfirmQuestion";
import { IQuestion, IQuestionMetadata } from "@interface/qa.interface";
import { Button } from "@material-tailwind/react";
import useRejectQuestion from "@hooks/questionAnswer/useRejectQuestion";
import { toast } from "react-toastify";

interface IProps {
  questionItem: IQuestion;
}

const DocumentQuestionConfirmReject = ({ questionItem }: IProps) => {
  const confirmQuestion = useConfirmQuestion();
  const rejectQuestion = useRejectQuestion();

  const questionMetadata = JSON.parse(questionItem.metadata) as IQuestionMetadata;

  const handleConfirm = () => {
    confirmQuestion.mutate({
      repoId: questionMetadata.repoId,
      documentId: questionMetadata.documentId,
      questionId: questionItem.id,
      callBack: () => {
        toast.success("پرسش تایید شد.");
      },
    });
  };

  const handleReject = () => {
    rejectQuestion.mutate({
      repoId: questionMetadata.repoId,
      documentId: questionMetadata.documentId,
      questionId: questionItem.id,
      callBack: () => {
        toast.error("پرسش حذف شد.");
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
        title="تایید پرسش"
        disabled={confirmQuestion.isPending || rejectQuestion.isPending}
      >
        <TickIcon className="block h-4 w-4 !fill-green-500" />
      </Button>
      <Button
        variant="text"
        className="form_label border-none !p-0 !text-gray-500"
        onClick={handleReject}
        {...({} as React.ComponentProps<typeof Button>)}
        title="عدم تایید پرسش"
        disabled={confirmQuestion.isPending || rejectQuestion.isPending}
      >
        <XIcon className="block h-5 w-5 !fill-error" />
      </Button>
    </div>
  );
};

export default DocumentQuestionConfirmReject;
