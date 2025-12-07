import React, { useRef } from "react";
import LoadingButton from "@components/molecules/loadingButton";
import { Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useCreateQuestion from "@hooks/questionAnswer/useCreateQuestion";
import { useDocumentStore } from "@store/document";
import QuestionAnswerEditor, {
  IQaEditorRef,
} from "@components/organisms/publishFeedback/publishQuestionAnswer/questionAnswerEditor";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { documentCreateQuestionSchema } from "@components/organisms/document/documentQa/validation.yup";
import FormInput from "@components/atoms/input/formInput";
import { BackIcon } from "@components/atoms/icons";

interface IForm {
  title: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentCreateQuestion = ({ setOpen }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);
  const editorData = useRef<{ content: string; outline: string } | null>(null);

  const { selectedDocument } = useDocumentStore();
  const createQuestionHook = useCreateQuestion();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(documentCreateQuestionSchema),
  });


  const saveQuestion = async (dataForm: IForm) => {
    const data = await editorRef.current?.getData();

    if (!selectedDocument) return;

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
      repoId: selectedDocument.repoId,
      documentId: selectedDocument.id,
      title: dataForm.title,
      content: editorData.current?.content || "",
      callBack: () => {
        toast.success("سوال شما با موفقیت اضافه شد");
        editorRef.current?.setData({
          content: "",
          outline: [],
        });
        editorData.current = null;
        setOpen(false);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Button
        placeholder="button"
        className="justify-start gap-2 bg-transparent p-0"
        onClick={() => {
          setOpen(false);
        }}
        {...({} as Omit<React.ComponentProps<typeof Button>, "placeholder">)}
      >
        <BackIcon className="h-5 w-5 fill-icon-hover" />
        <Typography
          className="text-xs text-primary_normal"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          لیست سوالات
        </Typography>
      </Button>
      <div>
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
                ...register("title"),
              }}
              className="document-edit__form-name"
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
              <QuestionAnswerEditor ref={editorRef} />
            </div>
          </div>
        </div>
        <LoadingButton
          className="!mt-5 mr-auto block !max-h-[unset] !w-fit items-center justify-center rounded-lg bg-primary-normal !px-3 py-5 font-iranYekan text-white lg:mt-0"
          onClick={handleSubmit(saveQuestion)}
          disabled={createQuestionHook.isPending}
          loading={createQuestionHook.isPending}
        >
          ارسال پرسش
        </LoadingButton>
      </div>
    </div>
  );
};

export default DocumentCreateQuestion;
