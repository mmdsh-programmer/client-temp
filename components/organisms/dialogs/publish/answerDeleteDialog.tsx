import React from "react";
import { toast } from "react-toastify";
import { IQuestion } from "@interface/qa.interface";
import DeleteDialog from "@components/templates/dialog/deleteDialog";
import useDeleteAnswer from "@hooks/questionAnswer/useDeleteAnswer";

interface IProps {
  repoId: number;
  documentId: number;
  answer: IQuestion;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const QuestionDeleteDialog = ({ repoId, documentId, answer, setOpen }: IProps) => {
  const deleteAnswer = useDeleteAnswer();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    deleteAnswer.mutate({
      repoId,
      documentId,
      questionId: answer.id,
      entityId: answer.entityId,
      callBack: () => {
        toast.success("پاسخ شما با موفقیت حذف شد");
        handleClose();
      },
    });
  };

  return (
    <DeleteDialog
      isPending={deleteAnswer.isPending}
      dialogHeader="حذف پاسخ"
      onSubmit={onSubmit}
      setOpen={handleClose}
      className="category-delete-dialog"
      backToMain
    >
      <form className="flex flex-col gap-5">
        <div className="flex font-iranYekan text-[13px] leading-[26px] -tracking-[0.13px] text-primary_normal">
          آیا از حذف این پاسخ اطمینان دارید؟
        </div>
      </form>
    </DeleteDialog>
  );
};

export default QuestionDeleteDialog;
