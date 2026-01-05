import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import PostCommentItem from "./postCommentItem";
import useGetPostCommentList from "@hooks/comment/useGetPostCommentList";
import { useQaStore } from "@store/qa";

const PostCommentList = () => {
  const { selectedQuestion } = useQaStore();

  const {
    isLoading,
    data: commentList,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPostCommentList(selectedQuestion!.id, 30);

  const total = commentList?.pages[0].total || 0;

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  if (total && commentList) {
    return (
      <>
        {commentList.pages.map((commentListPage) => {
          return commentListPage.list.map((commentItem) => {
            return (
              <PostCommentItem key={`post-comment-${commentItem.id}`} commentItem={commentItem} />
            );
          });
        })}

        <RenderIf isTrue={!!hasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
          </div>
        </RenderIf>
      </>
    );
  }

  return (
    <div className="bg-white py-8">
      <EmptyList type={EEmptyList.COMMENTS} />
    </div>
  );
};

export default PostCommentList;
