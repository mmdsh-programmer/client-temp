import React, { useRef } from "react";
import QuestionAnswerEditor, { IQaEditorRef } from "./questionAnswerEditor";
import LoadingButton from "@components/molecules/loadingButton";
import PublishForceLogin from "../publishForceLogin";
import { DialogBody, Typography } from "@material-tailwind/react";
import { editorConfig } from "@utils/clasorEditor";
import { toast } from "react-toastify";
import useGetUser from "@hooks/auth/useGetUser";
import useCreateQuestion from "@hooks/questionAnswer/useCreateQuestion";
import { usePublishStore } from "@store/publish";
import InfoDialog from "@components/templates/dialog/infoDialog";
import { useForm } from "react-hook-form";
import FormInput from "@components/atoms/input/formInput";

interface IForm {
  title: string;
}

interface IProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateQuestion = ({ setOpen }: IProps) => {
  const editorRef = useRef<IQaEditorRef | null>(null);
  const editorData = useRef<{ content: string; outline: string } | null>(null);

  const { publishVersion: getPublishVersion } = usePublishStore();
  const { repoId } = getPublishVersion!;
  const { documentId } = getPublishVersion!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const { data: userInfo } = useGetUser();
  const createQuestionHook = useCreateQuestion();

  const saveQuestion = async (dataForm: IForm) => {
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
      title: dataForm.title,
      content: editorData.current?.content || "",
      callBack: () => {
        toast.success("سوال شما با موفقیت اضافه شد");
        editorRef.current?.setData({
          content: "",
          outline: [],
          ...editorConfig,
        });
        editorData.current = null;
        setOpen(false);
      },
    });
  };

  if (!userInfo) {
    return <PublishForceLogin />;
  }

  return (
    <InfoDialog
      dialogHeader="پرسش"
      setOpen={() => {
        setOpen(false);
      }}
      className="document-Qa-dialog flex !h-full w-full max-w-full flex-col !overflow-auto rounded-none bg-primary xs:!h-[550px] xs:!min-w-[750px] xs:!max-w-[750px] xs:rounded-lg"
    >
      <DialogBody
        placeholder="flex flex-col gap-10"
        {...({} as Omit<React.ComponentProps<typeof DialogBody>, "placeholder">)}
      >
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
      </DialogBody>
    </InfoDialog>
  );
};

export default CreateQuestion;
