import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import QuestionAnswerEditor, {
  IQaEditorRef,
} from "@components/organisms/publishFeedback/PublishQuestionAnswer/questionAnswerEditor";
import { toast } from "react-toastify";
import { config } from "@utils/clasorEditor";
import EditDialog from "@components/templates/dialog/editDialog";
import { IQuestion } from "@interface/qa.interface";
import useUpdateQuestion from "@hooks/questionAnswer/useUpdateQuestion";

interface IProps {
  repoId: number;
  documentId: number;
  question: IQuestion;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const QuestionEditDialog = ({ repoId, documentId, question, setOpen }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);
  const editorData = useRef<{ content: string; outline: string } | null>(null);

  const updateQuestion = useUpdateQuestion();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const data = await editorRef.current?.getData();

    if (!data) {
      return toast.error("خطا در دریافت متن سوال");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editorData.current = data as any;

    if (editorData.current && editorData.current.content.length === 0) {
      return toast.error("متن سوال خالی است");
    }

    if (editorData.current && editorData.current.content.length > 1400) {
      return toast.error("حداکثر کاراکتر مجاز 1400 کاراکتر میباشید");
    }

    updateQuestion.mutate({
      repoId,
      documentId,
      entityId: question.entityId,
      title: question.name,
      content: editorData.current?.content || "",
      callBack: () => {
        toast.success("پرسش شما با موفقیت ویرایش شد");
        editorRef.current?.setData({
          content: "",
          outline: [],
          ...config,
        });
        editorData.current = null;
      },
    });
  };

  return (
    <EditDialog
      isPending={updateQuestion.isPending}
      dialogHeader="پرسش خود را ویرایش کنید"
      onSubmit={async () => {
        await onSubmit();
      }}
      setOpen={handleClose}
      className="!max-w-[unset] xs:!max-w-[unset]"
      customSize="lg"
    >
      <form className="flex flex-col gap-2">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="mb-2 text-xs text-gray-800"
        >
          متن خود را بنویسید
        </Typography>
        <div className="h-52">
          <QuestionAnswerEditor defaultValue={question.content} ref={editorRef} />
        </div>
      </form>
    </EditDialog>
  );
};

export default QuestionEditDialog;
