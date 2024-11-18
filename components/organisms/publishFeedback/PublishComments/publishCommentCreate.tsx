import React from "react";
import LoadingButton from "@components/molecules/loadingButton";
import useGetUser from "@hooks/auth/useGetUser";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import PublishForceLogin from "../publishForceLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishCreateCommentSchema } from "../validation.yup";
import PublishForcePublicProfile from "../publishForcePublicProfile";
import useCreatePublishComment from "@hooks/publish/useCreatePublishComment";

interface IForm {
  text: string;
}

interface IProps {
  postId: number;
  isQuestionAnswerComments?: boolean;
}

const PublishCommentCreate = ({ postId, isQuestionAnswerComments }: IProps) => {
  const { data: userInfo } = useGetUser();

  const createComment = useCreatePublishComment();

  const form = useForm<IForm>({
    resolver: yupResolver(publishCreateCommentSchema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (dataForm: IForm) => {
    const stringByteLength = Buffer.byteLength(dataForm.text, "utf8");
    if (stringByteLength > 5900) {
      toast.error("تعداد کاراکتر وارد شده بیش از حد مجاز است.");
    } else {
      if (!postId) return;
      createComment.mutate({
        postId,
        text: dataForm.text,
        shouldConfirm: !isQuestionAnswerComments,
        callBack: () => {
          toast.success("نظر شما با موفقیت ارسال شد.");
          reset();
        },
      });
    }
  };

  if (!userInfo) {
    return (
      <PublishForceLogin customText="برای نوشتن دیدگاه باید وارد پنل کاربری خود شوید" />
    );
  }

  if (userInfo.private) {
    return (
      <PublishForcePublicProfile customText="برای نوشتن دیدگاه باید پروفایل شما عمومی باشد" />
    );
  }

  return (
    <div>
      <Typography className="text-xs text-gray-800 mb-2">
        نظر خود را بنویسید
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center shadow-lg md:shadow-none"
      >
        <input
          id="commentText"
          {...register("text")}
          className="!w-full font-iranYekan border-2 border-solid border-gray-200 text-xs text-gray-800 outline-none focus:outline-none py-2.5 px-2 rounded-lg"
        />
        {errors.text && (
          <Typography className="warning_text">
            {errors.text?.message}
          </Typography>
        )}

        <LoadingButton
          className="block !w-fit !mt-5 mr-auto justify-center items-center !px-3 py-5 rounded-lg lg:mt-0 bg-purple-normal text-white font-iranYekan !max-h-[unset]"
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

export default PublishCommentCreate;
