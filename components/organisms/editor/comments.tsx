import { DeleteIcon, UserIcon } from "@components/atoms/icons";
import ImageComponent from "@components/atoms/image";
import InputAtom from "@components/atoms/input";
import TextareaAtom from "@components/atoms/textarea/textarea";
import LoadingButton from "@components/molecules/loadingButton";
import useCreateComment from "@hooks/core/useCreateComment";
import useDeleteComment from "@hooks/core/useDeleteComment";
import useGetCommentList from "@hooks/core/useGetCommentList";
import { IComment, IVersion } from "@interface/version.interface";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IProps {
  version?: IVersion;
}

interface IForm {
  text: string;
}

const Comments = ({ version }: IProps) => {
  const { data: getComments } = useGetCommentList(version!.postId, 5);
  const addHook = useCreateComment();
  const deleteComment = useDeleteComment();

  const form = useForm<IForm>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const handleDeletecomment = (comment: IComment) => {
    if (!version || !comment) return;
    deleteComment.mutate({
      postId: version.postId,
      commentId: comment?.id,
    });
  };

  const onSubmit = async (dataForm: IForm) => {
    const stringByteLength = Buffer.byteLength(dataForm.text, "utf8");
    if (stringByteLength > 5900) {
      toast.error("تعداد کاراکتر وارد شده بیش از حد مجاز است.");
    } else {
      if (!version) return;
      addHook.mutate({
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
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-2 px-6 py-4 ">
        {getComments?.pages.map((page) => {
          return page.list.map((comment) => {
            return (
              <div className="p-2 flex flex-col gap-4 bg-gray-50 border-[1px] border-normal rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {comment.user.profileImage ? (
                      <ImageComponent
                        className="h-6 w-6 rounded-full"
                        src={comment.user.profileImage}
                        alt={comment.user.name}
                      />
                    ) : (
                      <div className="h-8 w-8 flex justify-center items-center bg-white rounded-full">
                        <UserIcon className="h-5 w-5 fill-icon-hover" />
                      </div>
                    )}
                    <Typography className="title_t4 text-primary">
                      {comment.user.name}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      className="bg-transparent p-0"
                      onClick={() => {
                        return handleDeletecomment(comment);
                      }}
                    >
                      {deleteComment.isPending ? (
                        <Spinner className="h-4 w-4" color="deep-purple" />
                      ) : (
                        <DeleteIcon className="h-4 w-4 fill-icon-hover" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Typography className="body_b3">{comment.text}</Typography>
                </div>
              </div>
            );
          });
        })}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute md:relative !w-[300px] left-0 bg-white shadow-lg md:shadow-none z-[9999] h-full"
      >
        <div className="flex flex-col h-full">
          <div className="border-b-[1px] border-normal" />
          <div className="px-4 py-3 flex flex-grow flex-col justify-end">
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
                loading={false}
                onClick={handleSubmit(onSubmit)}
                className="!h-8 !bg-white !w-auto !rounded-sm shadow-none hover:shadow-none hover:bg-white"
              >
                <Typography className="text__label__button !text-primary px-3 font-medium">
                  ارسال
                </Typography>
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;
