import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import PublishCommentItem from "./publishCommentItem";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetCommentList from "@hooks/comment/useGetCommentList";
import useGetUser from "@hooks/auth/useGetUser";
import useGetPublishCommentList from "@hooks/publish/useGetPublishCommentList";
import Error from "@components/organisms/error";

interface IProps {
  repoId: number;
  documentId: number;
}

const PublishCommentList = ({ repoId, documentId }: IProps) => {
  const { data: userInfo } = useGetUser();
  const {
    data: commentList,
    isLoading,
    error,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCommentList(repoId, documentId, 10, !!userInfo);

  const {
    data: publishCommentList,
    isLoading: publishCommentIsLoading,
    error: publishCommentError,
    refetch: publishCommentRefetch,
    hasNextPage: publishCommentHasNextPage,
    isFetchingNextPage: publishCommentIsFetchingNextPage,
    fetchNextPage: publishCommentFetchNextPage,
  } = useGetPublishCommentList(documentId, 10, !userInfo);

  const total = commentList?.pages[0].total || publishCommentList?.pages[0].total || 0;
  const list = commentList || publishCommentList;

  if (isLoading || publishCommentIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  if (error || publishCommentError) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <Error
          error={{
            message: error?.message || publishCommentError?.message || "خطا در دریافت اطلاعات",
          }}
          retry={() => {
            if (error) {
              refetch();
            } else {
              publishCommentRefetch();
            }
          }}
        />
      </div>
    );
  }

  if (total && list) {
    return (
      <>
        {list.pages.map((commentListPage) => {
          return commentListPage.list.map((commentItem) => {
            return (
              <PublishCommentItem
                key={`publish-comment-${commentItem.id}`}
                repoId={repoId}
                documentId={documentId}
                commentItem={commentItem}
              />
            );
          });
        })}
        <RenderIf isTrue={!!hasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
          </div>
        </RenderIf>
        <RenderIf isTrue={!!publishCommentHasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore
              isFetchingNextPage={publishCommentIsFetchingNextPage}
              fetchNextPage={publishCommentFetchNextPage}
            />
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

export default PublishCommentList;
