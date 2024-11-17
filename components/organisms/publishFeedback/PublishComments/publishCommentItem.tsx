import React from "react";
import RenderIf from "@components/atoms/renderIf";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import { IComment } from "@interface/version.interface";
import useDeleteComment from "@hooks/core/useDeleteComment";
import LoadingButton from "@components/molecules/loadingButton";
import CommentLikeAndDislike from "@components/organisms/commentLike&Dislike";

interface IProps {
  postId: number;
  commentItem: IComment;
}

const PublishCommentItem = ({ postId, commentItem }: IProps) => {
  const { data: userInfo } = useGetUser();
  const deleteComment = useDeleteComment();

  const handleDeleteComment = () => {
    deleteComment.mutate({
      postId,
      commentId: commentItem.id,
    });
  };

  return (
    <Card
      shadow={false}
      className="w-full pt-[30px] pb-5 px-5 flex flex-col gap-2.5 border-b-2 border-solid border-gray-200 rounded-none bg-white"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="flex items-center justify-between gap-2 pt-0 mt-0 mx-0"
      >
        <div className="flex items-center gap-2">
          <h6 className="text-sm text-gray-800 font-bold">
            {commentItem.user.name}
          </h6>
          <span className="text-lg text-gray-500">{"\u2022"}</span>
          <time
            className="text-xs text-gray-500"
            dateTime={FaDateFromTimestamp(commentItem.timestamp)}
          >
            {FaDateFromTimestamp(commentItem.timestamp)}
          </time>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <Typography className="text-sm">{commentItem.text}</Typography>
      </CardBody>
      <CardFooter className="flex items-center p-0 gap-2 justify-between">
        <RenderIf
          isTrue={!!userInfo && +userInfo.ssoId === +commentItem.user.ssoId}
        >
          <LoadingButton
            className="border-none !p-0 !h-fit !w-fit text-[13px] leading-5 text-link"
            onClick={handleDeleteComment}
            loading={deleteComment.isPending}
            disabled={deleteComment.isPending}
          >
            حذف نظر
          </LoadingButton>
        </RenderIf>
        <RenderIf isTrue={!!userInfo}>
          <CommentLikeAndDislike
            commentItem={commentItem}
            postId={postId}
            wrapperClassName="gap-5 mr-auto"
            likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            iconClassName="w-7 h-7 !stroke-gray-500"
            counterClassName="ml-1 text-base text-gray-500"
            showCounter
          />
        </RenderIf>
      </CardFooter>
    </Card>
  );
};

export default PublishCommentItem;
