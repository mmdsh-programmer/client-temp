import React from "react";
import { toast } from "react-toastify";
import { IQuestion, IQuestionMetadata } from "@interface/qa.interface";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteQuestion from "@hooks/questionAnswer/useDeleteQuestion";

interface IProps {
  question: IQuestion;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const QuestionDeleteDialog = ({ question, setOpen }: IProps) => {
  const deleteQuestion = useDeleteQuestion();

  const questionMetadata = JSON.parse(question.metadata) as IQuestionMetadata;
  const { repoId, documentId } = questionMetadata;

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    deleteQuestion.mutate({
      repoId,
      documentId,
      entityId: question.entityId,
      callBack: () => {
        toast.success("پرسش شما با موفقیت حذف شد");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteQuestion.isPending}
      dialogHeader="حذف پرسش"
      onSubmit={onSubmit}
      setOpen={handleClose}
      className="category-delete-dialog"
      backToMain
    >
      <form className="flex flex-col gap-5">
        <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
          آیا از حذف این پرسش اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default QuestionDeleteDialog;
