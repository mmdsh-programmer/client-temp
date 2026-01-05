import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";
import DocumentQuestionItem from "./documentQuestionItem";
import DocumentAnswerList from "./documentAnswerList";
import { useRepositoryStore } from "@store/repository";
import { ERoles } from "@interface/enums";
import useGetQuestionListByAdmin from "@hooks/questionAnswer/useGetQuestionListByAdmin";
import DocumentUnconfirmedQuestionItem from "./documentUnconfirmedQuestionItem";

const DocumentUnconfirmedQuestionList = () => {
  const { repo } = useRepositoryStore();
  const { selectedDocument } = useDocumentStore();

  const adminOwnerRole = repo?.roleName === ERoles.admin || repo?.roleName === ERoles.owner;

  const {
    data: questionListByAdmin,
    isLoading: adminListIsLoading,
    hasNextPage: adminListHasNextPage,
    isFetchingNextPage: adminListIsFetchingNextPage,
    fetchNextPage: adminListFetchNextPage,
  } = useGetQuestionListByAdmin(
    selectedDocument!.repoId,
    selectedDocument!.id,
    false,
    10,
    adminOwnerRole,
  );

  if (adminListIsLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  const totalUnconfirmed = questionListByAdmin?.pages[0]?.total || 0;

  if (totalUnconfirmed > 0) {
    return (
      <>
        {questionListByAdmin?.pages.map((page) => {
          return page.list.map((questionItem) => {
            return (
              <DocumentUnconfirmedQuestionItem
                key={`question-${questionItem.id}`}
                questionItem={questionItem}
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
      <EmptyList type={EEmptyList.QUESTION_LIST} />
    </div>
  );
};

export default DocumentUnconfirmedQuestionList;
