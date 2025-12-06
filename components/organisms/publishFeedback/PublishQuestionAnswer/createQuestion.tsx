import React, { useRef } from "react";
import QuestionAnswerEditor, { IQaEditorRef } from "./questionAnswerEditor";
import LoadingButton from "@components/molecules/loadingButton";
import PublishForceLogin from "../publishForceLogin";
import { Typography } from "@material-tailwind/react";
import { config } from "@utils/clasorEditor";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import useCreateQuestion from "@hooks/questionAnswer/useCreateQuestion";

interface IProps {
  repoId: number;
  documentId: number;
}

const CreateQuestion = ({ repoId, documentId }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);
  const editorData = useRef<{ content: string; outline: string } | null>(null);
  const { data: userInfo } = useGetUser();
  const createQuestionHook = useCreateQuestion();

  const saveQuestion = async () => {
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

    createQuestionHook.mutate({
      repoId,
      documentId,
      title: `question-repoId-${repoId}-docId-${documentId}-user-${userInfo?.ssoId}`,
      content: editorData.current?.content || "",
      callBack: () => {
        toast.success("سوال شما با موفقیت اضافه شد");
        editorRef.current?.setData({
          content: "",
          outline: [],
          ...config,
        });
        editorData.current = null;
      },
    });
  };

  if (!userInfo) {
    return <PublishForceLogin />;
  }

  return (
    <div>
      <Typography
        {...({} as React.ComponentProps<typeof Typography>)}
        className="mb-2 text-xs text-gray-800"
      >
        پرسش خود را بنویسید
      </Typography>
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
