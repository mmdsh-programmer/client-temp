import React, { useRef } from "react";
import { login } from "@actions/auth";
import LoadingButton from "@components/molecules/loadingButton";
import useGetUser from "@hooks/auth/useGetUser";
import { Typography } from "@material-tailwind/react";
import QuestionAnswerEditor, { IQaEditorRef } from "./questionAnswerEditor";
import { toast } from "react-toastify";
import useCreateQuestionAnswer from "@hooks/questionAnswer/useCreateQuestionAnswer";

interface IProps {
  postId: number;
}

const CreateQuestion = ({ postId }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);
  const { data: userInfo } = useGetUser();
  const createQuestionHook = useCreateQuestionAnswer();

  const saveQuestion = async () => {
    const editorData = await editorRef.current?.getData();

    if (editorData && editorData.content.length === 0) {
      return toast.error("متن سوال خالی است");
    }

    if (editorData && editorData.content.length > 1400) {
      return toast.error("حداکثر کاراکتر مجاز 1400 کاراکتر میباشید");
    }

    if (!editorData) {
      return toast.error("خطا در دریافت متن سوال");
    }

    createQuestionHook.mutate({
      name: `post-${postId}-user-${userInfo?.ssoId}-question`,
      content: editorData.content,
      repliedPostId: postId,
      metadata: JSON.stringify({ isQuestion: true }),
      callBack: () => {
        toast.success("سوال شما با موفقیت اضافه شد");
      },
    });
  };

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center gap-6">
        <Typography className="text-sm text-gray-800 font-bold">
          برای پرسیدن سوال باید وارد پنل کاربری یا در سایت عضو شوید
        </Typography>

        <LoadingButton
          className="flex justify-center items-center px-10 py-5 rounded-lg lg:mt-0 bg-purple-normal text-white font-iranYekan !max-h-[unset]"
          onClick={() => {
            window.localStorage.setItem(
              "CLASOR:LAST_PAGE",
              window.location.pathname
            );
            return login();
          }}
        >
          ورود به پنل
        </LoadingButton>
      </div>
    );
  }

  return (
    <div>
      <Typography className="text-xs text-gray-800 mb-2">
        پرسش خود را بنویسید
      </Typography>

      <div className="h-44">
        <QuestionAnswerEditor ref={editorRef} />
      </div>

      <LoadingButton
        className="block !w-fit !mt-5 mr-auto justify-center items-center !px-3 py-5 rounded-lg lg:mt-0 bg-purple-normal text-white font-iranYekan !max-h-[unset]"
        onClick={saveQuestion}
        disabled={createQuestionHook.isPending}
        loading={createQuestionHook.isPending}
      >
        ارسال پرسش
      </LoadingButton>
    </div>
  );
};

export default CreateQuestion;
