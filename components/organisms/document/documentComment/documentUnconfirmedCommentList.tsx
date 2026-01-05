import { Spinner } from "@components/atoms/spinner";
import useGetCommentListByAdmin from "@hooks/comment/useGetCommentListByAdmin";
import { ERoles } from "@interface/enums";
import { useDocumentStore } from "@store/document";
import { useRepositoryStore } from "@store/repository";
import React from "react";
import RenderIf from "@components/atoms/renderIf";
import LoadMore from "@components/molecules/loadMore";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import DocumentUnconfirmedCommentItem from "./documentUnconfirmedCommentItem";

const DocumentUnconfirmedCommentList = () => {
  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();

  const adminOwnerRole = repo?.roleName === ERoles.admin || repo?.roleName === ERoles.owner;

  const {
    data: commentListByAdmin,
    isLoading: adminListIsLoading,
    hasNextPage: adminListHasNextPage,
    isFetchingNextPage: adminListIsFetchingNextPage,
    fetchNextPage: adminListFetchNextPage,
  } = useGetCommentListByAdmin(selectedDocument!.repoId, selectedDocument!.id, 10, adminOwnerRole);

  if (adminListIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
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
              <DocumentUnconfirmedCommentItem key={`comment-${commentItem.id}`} commentItem={commentItem} />
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
