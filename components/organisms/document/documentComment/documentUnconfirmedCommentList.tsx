import React from "react";
import { Spinner } from "@components/atoms/spinner";
import useGetCommentListByAdmin from "@hooks/comment/useGetCommentListByAdmin";
import { useDocumentStore } from "@store/document";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import DocumentUnconfirmedCommentItem from "./documentUnconfirmedCommentItem";
import Error from "@components/organisms/error";

const DocumentUnconfirmedCommentList = () => {
  const { selectedDocument } = useDocumentStore();

  const {
    data: commentListByAdmin,
    isLoading: adminListIsLoading,
    error: adminListError,
    refetch: adminListRefetch,
    hasNextPage: adminListHasNextPage,
    isFetchingNextPage: adminListIsFetchingNextPage,
    fetchNextPage: adminListFetchNextPage,
  } = useGetCommentListByAdmin(selectedDocument!.repoId, selectedDocument!.id, 10, true);

  if (adminListIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  if (adminListError) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <Error
          error={{ message: adminListError?.message || "خطا در دریافت اطلاعات" }}
          retry={() => {
            adminListRefetch();
          }}
        />
      </div>
    );
  }
  const totalUnconfirmed = commentListByAdmin?.pages[0]?.total || 0;

  if (totalUnconfirmed > 0) {
    return (
      <>
        {commentListByAdmin?.pages.map((commentListPage) => {
          return commentListPage.list.map((commentItem) => {
            return (
              <DocumentUnconfirmedCommentItem
                key={`comment-${commentItem.id}`}
                commentItem={commentItem}
              />
            );
          });
        })}
        <RenderIf isTrue={!!adminListHasNextPage}>
          <div className="flex w-full justify-center bg-white pb-2">
            <LoadMore
              isFetchingNextPage={adminListIsFetchingNextPage}
              fetchNextPage={adminListFetchNextPage}
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

export default DocumentUnconfirmedCommentList;
