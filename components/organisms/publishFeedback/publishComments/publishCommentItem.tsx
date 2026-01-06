import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { FaDateFromTimestamp } from "@utils/index";
import useGetUser from "@hooks/auth/useGetUser";
import { IComment } from "@interface/version.interface";
import useDeleteComment from "@hooks/comment/useDeleteComment";
import LoadingButton from "@components/molecules/loadingButton";
import CommentLikeAndDislike from "@components/organisms/commentLike&Dislike";
import { DeleteIcon } from "@components/atoms/icons";
import { usePublishStore } from "@store/publish";

interface IProps {
  repoId: number;
  documentId: number;
  commentItem: IComment;
}

const PublishCommentItem = ({ repoId, documentId, commentItem }: IProps) => {
  const { data: userInfo } = useGetUser();

  const { publishPageSelectedDocument } = usePublishStore();

  const deleteComment = useDeleteComment();

  const handleDeleteComment = () => {
    deleteComment.mutate({
      repoId,
      docId: documentId,
      commentId: commentItem.id,
    });
  };

  return (
    <Card
      {...({} as React.ComponentProps<typeof Card>)}
      shadow={false}
      className="flex w-full flex-col gap-2.5 rounded-none border-b-2 border-solid border-gray-200 bg-white px-5 pb-5 pt-[30px]"
    >
      <CardHeader
        {...({} as React.ComponentProps<typeof CardHeader>)}
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 mt-0 flex items-center justify-between gap-2 pt-0"
      >
        <div className="flex items-center gap-2">
          <h6 className="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-gray-800 sm:max-w-fit">
            {commentItem.user.name}
          </h6>
          <time
            className="bullet max-w-16 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 sm:max-w-fit"
            dateTime={String(commentItem.timestamp)}
          >
            {FaDateFromTimestamp(commentItem.timestamp)}
          </time>
        </div>
      </CardHeader>
      <CardBody {...({} as React.ComponentProps<typeof CardBody>)} className="p-0">
        <Typography
          {...({} as React.ComponentProps<typeof Typography>)}
          className="word-break text-sm"
        >
          {commentItem.text}
        </Typography>
      </CardBody>
      <CardFooter
        {...({} as React.ComponentProps<typeof CardFooter>)}
        className="flex items-center justify-between gap-2 p-0"
      >
        <RenderIf isTrue={!!userInfo && +userInfo.ssoId === +commentItem.user.ssoId}>
          <LoadingButton
            className="!h-fit !w-fit border-none !p-0 text-[13px] leading-5 text-link"
            onClick={handleDeleteComment}
            loading={deleteComment.isPending}
            disabled={deleteComment.isPending}
          >
            <span className="hidden sm:block"> حذف نظر</span>
            <DeleteIcon className="block h-4 w-4 !fill-gray-500 sm:hidden" />
          </LoadingButton>
        </RenderIf>
        <RenderIf isTrue={commentItem.confirmed}>
          <CommentLikeAndDislike
            commentItem={commentItem}
            wrapperClassName="gap-3 sm:gap-5 mr-auto"
            likeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            dislikeButtonClassName="flex items-center bg-transparent hover:bg-transparent rounded-none p-0 !w-fit"
            iconClassName="w-4 h-4 !stroke-gray-500"
            counterClassName="ml-1 text-base text-gray-500"
            showCounter
            postId={publishPageSelectedDocument!.customPostId}
            repoId={repoId}
            docId={documentId}
          />
        </RenderIf>
      </CardFooter>
    </Card>
  );
};

export default PublishCommentItem;
