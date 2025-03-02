import React, { useRef } from "react";
import CreateDialog from "@components/templates/dialog/createDialog";
import { Typography } from "@material-tailwind/react";
import QuestionAnswerEditor, {
  IQaEditorRef,
} from "@components/organisms/publishFeedback/PublishQuestionAnswer/questionAnswerEditor";
import { toast } from "react-toastify";
import useCreateQuestionAnswer from "@hooks/questionAnswer/useCreateQuestionAnswer";
import { config } from "@utils/clasorEditor";
import useGetUser from "@hooks/auth/useGetUser";
import PublishForcePublicProfile from "@components/organisms/publishFeedback/publishForcePublicProfile";

interface IProps {
  postId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AnswerDialog = ({ postId, setOpen }: IProps) => {
  const { data: userInfo } = useGetUser();
  const editorRef = useRef<IQaEditorRef | null>(null);

  const createAnswerHook = useCreateQuestionAnswer();

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

    createAnswerHook.mutate({
      name: `post-${postId}-answer`,
      content: editorData.content,
      repliedPostId: postId,
      metadata: JSON.stringify({ isQuestion: false }),
      callBack: () => {
        toast.success("پاسخ شما با موفقیت اضافه شد");
        setOpen(false);
        editorRef.current?.setData({
          content: "",
          outline: [],
          ...config,
        });
      },
    });
  };

  return (
    <CreateDialog
      isPending={createAnswerHook.isPending}
      dialogHeader="به این پرسش پاسخ دهید"
      onSubmit={async () => {
        await onSubmit();
      }}
      setOpen={handleClose}
      className="!max-w-[unset] xs:!max-w-[unset]"
      customSize="lg"
      showFooter={!userInfo?.private}
    >
      {userInfo?.private ? (
        <PublishForcePublicProfile customText="برای نوشتن پاسخ باید پروفایل کاربری شما عمومی باشد" />
      ) : (
        <form className="flex flex-col gap-2">
          <Typography className="text-xs text-gray-800 mb-2">
            پاسخ خود را بنویسید
          </Typography>

          <div className="h-52">
            <QuestionAnswerEditor ref={editorRef} />
          </div>
        </form>
      )}
    </CreateDialog>
  );
};

export default AnswerDialog;
