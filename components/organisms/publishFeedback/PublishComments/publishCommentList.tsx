import EmptyList, { EEmptyList } from "@components/molecules/emptyList";

import LoadMore from "@components/molecules/loadMore";
import PublishCommentItem from "./publishCommentItem";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@material-tailwind/react";
import useGetPublishCommentList from "@hooks/publish/useGetPublishCommentList";

interface IProps {
  postId: number;
}

const PublishCommentList = ({ postId }: IProps) => {
  const {
    isLoading,
    data: commentList,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPublishCommentList(postId, 10);

  const total = commentList?.pages[0].count || 0;

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="w-full flex justify-center">
          <Spinner className="h-6 w-6" color="purple" />
        </div>
      </div>
    );
  }

  if (total && commentList) {
    return (
      <>
        {commentList.pages.map((commentListPage) => {
          return commentListPage.result.map((commentItem) => {
            return (
              <PublishCommentItem
                postId={postId}
                key={`publish-comment-${commentItem.id}`}
                commentItem={commentItem}
              />
            );
          });
        })}

        <RenderIf isTrue={!!hasNextPage}>
          <div className="w-full flex justify-center pb-2 bg-white">
            <LoadMore
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </RenderIf>
      </>
    );
  }

  return (
    <div className="py-8 bg-white">
      <EmptyList type={EEmptyList.COMMENTS} />
    </div>
  );
};

export default PublishCommentList;
