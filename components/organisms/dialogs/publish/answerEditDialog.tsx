import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import QuestionAnswerEditor, {
  IQaEditorRef,
} from "@components/organisms/publishFeedback/publishQuestionAnswer/questionAnswerEditor";
import { toast } from "react-toastify";
import { editorConfig } from "@utils/clasorEditor";
import EditDialog from "@components/templates/dialog/editDialog";
import { IQuestion } from "@interface/qa.interface";
import useUpdateAnswer from "@hooks/questionAnswer/useUpdateAnswer";

interface IProps {
  repoId: number;
  documentId: number;
  answer: IQuestion;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AnswerEditDialog = ({ repoId, documentId, answer, setOpen }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);
  const editorData = useRef<{ content: string; outline: string } | null>(null);

  const updateAnswer = useUpdateAnswer();

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

    updateAnswer.mutate({
      repoId,
      documentId,
      questionId: answer.id,
      entityId: answer.entityId,
      title: answer.name,
      content: editorData.current?.content || "",
      callBack: () => {
        toast.success("پاسخ شما با موفقیت ویرایش شد");
        editorRef.current?.setData({
          content: "",
          outline: [],
          ...editorConfig,
        });
        editorData.current = null;
        handleClose();
      },
    });
  };

  return (
    <EditDialog
      isPending={updateAnswer.isPending}
      dialogHeader="پاسخ خود را ویرایش کنید"
      onSubmit={async () => {
        await onSubmit();
      }}
      setOpen={handleClose}
      className="!max-w-[unset] xs:!max-w-[unset]"
      customSize="lg"
      backToMain
    >
      <form className="flex flex-col gap-2">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="mb-2 text-xs text-gray-800"
        >
          متن خود را بنویسید
        </Typography>
        <div className="h-52">
          <QuestionAnswerEditor defaultValue={answer.content} ref={editorRef} />
        </div>
      </form>
    </EditDialog>
  );
};

export default AnswerEditDialog;
