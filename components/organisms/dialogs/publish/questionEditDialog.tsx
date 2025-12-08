import React, { useRef } from "react";
import { Typography } from "@material-tailwind/react";
import QuestionAnswerEditor, {
  IQaEditorRef,
} from "@components/organisms/publishFeedback/publishQuestionAnswer/questionAnswerEditor";
import { toast } from "react-toastify";
import { config } from "@utils/clasorEditor";
import EditDialog from "@components/templates/dialog/editDialog";
import { IQuestion } from "@interface/qa.interface";
import useUpdateQuestion from "@hooks/questionAnswer/useUpdateQuestion";
import { useForm } from "react-hook-form";
import FormInput from "@components/atoms/input/formInput";

interface IForm {
  title: string;
}
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (dataForm: IForm) => {
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
      title: dataForm.title,
      content: editorData.current?.content || "",
      callBack: () => {
        toast.success("پرسش شما با موفقیت ویرایش شد");
        editorRef.current?.setData({
          content: "",
          outline: [],
          ...config,
        });
        editorData.current = null;
        setOpen(false);
      },
    });
  };

  return (
    <EditDialog
      isPending={updateQuestion.isPending}
      dialogHeader="پرسش خود را ویرایش کنید"
      onSubmit={handleSubmit(onSubmit)}
      setOpen={handleClose}
      className="!max-w-[unset] xs:!max-w-[unset]"
      customSize="lg"
      backToMain
    >
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography
              placeholder=""
              className="form_label"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              عنوان
            </Typography>
            <FormInput
              placeholder="عنوان "
              register={{
                ...register("title", {
                  value: question.name,
                }),
              }}
              className="question-edit__form-name"
            />
            {errors.title && (
              <Typography
                placeholder=""
                className="warning_text"
                {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
              >
                {errors.title?.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Typography
              placeholder=""
              className="form_label"
              {...({} as Omit<React.ComponentProps<typeof Typography>, "placeholder">)}
            >
              متن خود را وارد نمایید
            </Typography>
            <div className="h-52">
              <QuestionAnswerEditor defaultValue={question.content} ref={editorRef} />
            </div>
          </div>
        </div>
      </form>
    </EditDialog>
  );
};

export default QuestionEditDialog;
