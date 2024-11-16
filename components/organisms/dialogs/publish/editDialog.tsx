import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import QuestionAnswerEditor, {
  IQaEditorRef,
} from "@components/organisms/publishFeedback/PublishQuestionAnswer/questionAnswerEditor";
import { toast } from "react-toastify";
import { config } from "@utils/clasorEditor";
import useUpdateQuestionAnswer from "@hooks/questionAnswer/useUpdateQuestionAnswer";
import EditDialog from "@components/templates/dialog/editDialog";
import { IQAList } from "@interface/qa.interface";

interface IProps {
  item: IQAList;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  isAnswer?: boolean;
}

const PublishQuestionAnswerEditDialog = ({
  item,
  setOpen,
  isAnswer,
}: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);

  const updateQuestionAnswer = useUpdateQuestionAnswer();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async () => {
    const editorData = await editorRef.current?.getData();

    if (editorData && editorData.content.length === 0) {
      return toast.error("متن پاسخ خالی است");
    }

    if (editorData && editorData.content.length > 1400) {
      return toast.error("حداکثر کاراکتر مجاز 1400 کاراکتر میباشید");
    }

    if (!editorData) {
      return toast.error("خطا در دریافت متن پاسخ");
    }

    updateQuestionAnswer.mutate({
      name: item.name,
      content: editorData.content,
      entityId: item.entityId,
      canComment: item.canComment,
      canLike: item.canLike,
      enable: item.enable,
      repliedPostId: item.repliedPostId,
      metadata: item.metadata,
      callBack: async () => {
        toast.success(
          isAnswer
            ? "پاسخ شما با موفقیت ویرایش شد"
            : "سوال شما با موفقیت ویرایش شد"
        );
        editorRef.current?.setData({
          content: "",
          outline: [],
          ...config,
        });

        setOpen(false);
      },
    });
  };

  return (
    <EditDialog
      isPending={updateQuestionAnswer.isPending}
      dialogHeader={
        isAnswer ? "پاسخ خود را ویرایش کنید" : "پرسش خود را ویرایش کنید"
      }
      onSubmit={async () => {
        await onSubmit();
      }}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-2">
        <Typography className="text-xs text-gray-800 mb-2">
          متن خود را بنویسید
        </Typography>

        <div className="h-44">
          <QuestionAnswerEditor defaultValue={item.content} ref={editorRef} />
        </div>
      </form>
    </EditDialog>
  );
};

export default PublishQuestionAnswerEditDialog;
