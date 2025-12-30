import React from "react";
import LoadingButton from "@components/molecules/loadingButton";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-tailwind/react";
import { CreateCommentSchema } from "./validation.yup";
import PublishForcePublicProfile from "../publishFeedback/publishForcePublicProfile";
import useCreatePostComment from "@hooks/core/useCreatePostComment";
import { useQaStore } from "@store/qa";

interface IForm {
  text: string;
}

const PostCommentCreate = () => {
  const { selectedQuestion } = useQaStore();

  const { data: userInfo } = useGetUser();
  const createComment = useCreatePostComment();

  const form = useForm<IForm>({
    resolver: yupResolver(CreateCommentSchema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (dataForm: IForm) => {
    const stringByteLength = Buffer.byteLength(dataForm.text, "utf8");
    if (stringByteLength > 5900) {
      toast.error("تعداد کاراکتر وارد شده بیش از حد مجاز است.");
    } else {
      createComment.mutate({
        postId: selectedQuestion!.id,
        text: dataForm.text,
        callBack: () => {
          toast.success("نظر شما با موفقیت ارسال شد.");
          reset();
        },
      });
    }
  };

  if (userInfo?.private) {
    return <PublishForcePublicProfile customText="برای نوشتن دیدگاه باید پروفایل شما عمومی باشد" />;
  }

  return (
    <div>
      <Typography
        {...({} as React.ComponentProps<typeof Typography>)}
        className="mb-2 text-xs text-gray-800"
      >
        نظر خود را بنویسید
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
        <input
          id="commentText"
          {...register("text")}
          className="!w-full rounded-lg border-2 border-solid border-gray-200 bg-gray-100 px-2 py-2.5 font-iranYekan text-xs text-gray-800 outline-none focus:outline-none"
        />
        {errors.text && (
          <Typography {...({} as React.ComponentProps<typeof Typography>)} className="warning_text">
            {errors.text?.message}
          </Typography>
        )}

        <LoadingButton
          className="!mt-5 mr-auto block !max-h-[unset] !w-fit items-center justify-center rounded-lg bg-primary-normal !px-3 py-5 font-iranYekan text-white lg:mt-0"
          onClick={handleSubmit(onSubmit)}
          disabled={createComment.isPending}
          loading={createComment.isPending}
        >
          ارسال نظر
        </LoadingButton>
      </form>
    </div>
  );
};

export default PostCommentCreate;
