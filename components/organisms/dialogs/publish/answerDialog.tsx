import React, { useRef } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import { Typography } from "@material-tailwind/react";
import QuestionAnswerEditor, {
  IQaEditorRef,
} from "@components/organisms/publishFeedback/PublishQuestionAnswer/questionAnswerEditor";
import { toast } from "react-toastify";

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AnswerDialog = ({ setOpen }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);

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

    console.log(editorData?.content);
  };

  return (
    <CreateDialog
      isPending={false}
      dialogHeader="به این پرسش پاسخ دهید"
      onSubmit={async () => {
        await onSubmit();
      }}
      setOpen={handleClose}
      className=""
    >
      <form className="flex flex-col gap-2">
        <Typography className="text-xs text-gray-800 mb-2">
          پاسخ خود را بنویسید
        </Typography>

        <div className="h-44">
          <QuestionAnswerEditor ref={editorRef} />
        </div>
      </form>
    </CreateDialog>
  );
};

export default AnswerDialog;
