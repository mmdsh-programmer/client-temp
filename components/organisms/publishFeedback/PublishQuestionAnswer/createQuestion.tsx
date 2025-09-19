import QuestionAnswerEditor, { IQaEditorRef } from "./questionAnswerEditor";
import React, { useRef } from "react";

import LoadingButton from "@components/molecules/loadingButton";
import PublishForceLogin from "../publishForceLogin";
import PublishForcePublicProfile from "../publishForcePublicProfile";
import { Typography } from "@material-tailwind/react";
import { config } from "@utils/clasorEditor";
import { toast } from "react-toastify";
import useCreateQuestionAnswer from "@hooks/questionAnswer/useCreateQuestionAnswer";
import useGetUser from "@hooks/auth/useGetUser";

interface IProps {
  postId: number;
}

const CreateQuestion = ({ postId }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);
  const editorData = useRef<{ content: string; outline: string } | null>(null);
  const { data: userInfo } = useGetUser();
  const createQuestionHook = useCreateQuestionAnswer();

  const saveQuestion = async () => {
    await editorRef.current?.getData();
    await editorRef.current?.on("getData", (value: string) => {
      console.log("----------------- value -----------------", value);
      if (value) {
        editorData.current = JSON.parse(value);
      }

      if (editorData.current && editorData.current.content.length === 0) {
        return toast.error("متن سوال خالی است");
      }

      if (editorData.current && editorData.current.content.length > 1400) {
        return toast.error("حداکثر کاراکتر مجاز 1400 کاراکتر میباشید");
      }

      if (!editorData.current?.content) {
        return toast.error("خطا در دریافت متن سوال");
      }

      createQuestionHook.mutate({
        name: `post-${postId}-user-${userInfo?.ssoId}-question`,
        content: editorData.current.content,
        repliedPostId: postId,
        metadata: JSON.stringify({ isQuestion: true }),
        callBack: () => {
          toast.success("سوال شما با موفقیت اضافه شد");
          editorRef.current?.setData({
            content: "",
            outline: [],
            ...config,
          });
        },
      });
    });
  };

  if (!userInfo) {
    return <PublishForceLogin />;
  }

  if (userInfo.private) {
    return <PublishForcePublicProfile />;
  }

  return (
    <div>
      <Typography {...({} as React.ComponentProps<typeof Typography>)} className="mb-2 text-xs text-gray-800">پرسش خود را بنویسید</Typography>

      <div className="h-52">
        <QuestionAnswerEditor ref={editorRef} />
      </div>

      <LoadingButton
        className="!mt-5 mr-auto block !max-h-[unset] !w-fit items-center justify-center rounded-lg bg-primary-normal !px-3 py-5 font-iranYekan text-white lg:mt-0"
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
