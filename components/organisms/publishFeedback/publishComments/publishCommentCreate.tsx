import React from "react";
import LoadingButton from "@components/molecules/loadingButton";
import PublishForceLogin from "../publishForceLogin";
import PublishForcePublicProfile from "../publishForcePublicProfile";
import { Typography } from "@material-tailwind/react";
import { publishCreateCommentSchema } from "../validation.yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useGetUser from "@hooks/auth/useGetUser";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateComment from "@hooks/comment/useCreateComment";

interface IForm {
  text: string;
}

interface IProps {
  repoId: number;
  documentId: number;
}

const PublishCommentCreate = ({ repoId, documentId }: IProps) => {
  const { data: userInfo } = useGetUser();
  const createComment = useCreateComment();

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
      createComment.mutate({
        repoId,
        docId: documentId,
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

  if (!userInfo) {
    return (
      <div className="">
        <PublishForceLogin customText="برای نوشتن دیدگاه باید وارد پنل کاربری خود شوید" />
      </div>
    );
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

export default PublishCommentCreate;
