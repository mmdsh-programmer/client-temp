import { IVersion } from "@interface/version.interface";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import useCreateComment from "@hooks/comment/useCreateComment";
import { useForm } from "react-hook-form";

interface IForm {
  text: string;
}

interface IProps {
  version?: IVersion;
}

const CommentCreate = ({ version }: IProps) => {
  const createComment = useCreateComment();

  const form = useForm<IForm>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (dataForm: IForm) => {
    const stringByteLength = Buffer.byteLength(dataForm.text, "utf8");
    if (stringByteLength > 5900) {
      toast.error("تعداد کاراکتر وارد شده بیش از حد مجاز است.");
    } else {
      if (!version) return;
      createComment.mutate({
        repoId: version.repoId,
        docId: version.documentId,
        ...dataForm,
        callBack: () => {
          toast.success("نظر شما با موفقیت ارسال شد.");
          reset();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="comment-create left-0 z-[9999] !w-[300px] items-center justify-center gap-2 rounded-lg bg-white shadow-lg md:shadow-none"
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-grow flex-col justify-end gap-4 px-4 py-3">
          <div className="border-b-[1px] border-normal" />
          <div className="flex !h-12 items-center gap-2 rounded-lg border-[1px] !border-normal !bg-gray-50 pl-2 pr-3">
            <InputAtom
              id="username"
              register={{ ...register("text") }}
              className="h-auto !w-auto overflow-hidden border-none !p-0"
              placeholder="نظر خود را بنویسید."
            />
            {errors.text && (
              <Typography
                {...({} as React.ComponentProps<typeof Typography>)}
                className="warning_text"
              >
                {errors.text?.message}
              </Typography>
            )}
            <LoadingButton
              loading={createComment.isPending}
              onClick={handleSubmit(onSubmit)}
              className="!h-8 !w-[70px] !rounded-sm !bg-white shadow-none hover:bg-white hover:shadow-none"
              isPrimary
            >
              <Typography
                {...({} as React.ComponentProps<typeof Typography>)}
                className="text__label__button px-3 font-medium !text-primary_normal"
              >
                ارسال
              </Typography>
            </LoadingButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentCreate;
