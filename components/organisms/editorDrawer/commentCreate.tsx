import React from "react";
import InputAtom from "@components/atoms/input";
import LoadingButton from "@components/molecules/loadingButton";
import useCreateComment from "@hooks/core/useCreateComment";
import { IVersion } from "@interface/version.interface";
import { Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
        postId: version.postId,
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
      className="comment-create gap-2 justify-center items-center rounded-lg !w-[300px] left-0 bg-white shadow-lg md:shadow-none z-[9999]"
    >
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 flex flex-grow flex-col gap-4 justify-end">
          <div className="border-b-[1px] border-normal" />
          <div className="flex items-center gap-2 !h-12 pr-3 pl-2 !bg-gray-50 border-[1px] !border-normal rounded-lg">
            <InputAtom
              id="username"
              register={{ ...register("text") }}
              className="!w-auto h-auto overflow-hidden !p-0 border-none"
              placeholder="نظر خود را بنویسید."
            />
            {errors.text && (
              <Typography className="warning_text">
                {errors.text?.message}
              </Typography>
            )}
            <LoadingButton
              loading={createComment.isPending}
              onClick={handleSubmit(onSubmit)}
              className="!h-8 !bg-white !w-[70px] !rounded-sm shadow-none hover:shadow-none hover:bg-white"
              isPrimary
            >
              <Typography className="text__label__button !text-primary px-3 font-medium">
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
