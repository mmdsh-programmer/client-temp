import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import useGetQuestionList from "@hooks/questionAnswer/useGetQuestionList";
import { useDocumentStore } from "@store/document";
import DocumentQuestionItem from "./documentQuestionItem";
import DocumentAnswerList from "./documentAnswerList";

const DocumentQuestionList = () => {
  const { selectedDocument } = useDocumentStore();

  const {
    data: questionList,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetQuestionList(selectedDocument!.repoId, selectedDocument!.id, 10);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 bg-white py-8">
        <div className="flex w-full justify-center">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      </div>
    );
  }

  const total = questionList?.pages[0]?.total || 0;

  if (total && questionList) {
    return (
      <>
        {questionList?.pages.map((questionListPage) => {
          return questionListPage.list.map((questionItem) => {
            return (
              <DocumentQuestionItem
                key={`question-${questionItem.id}`}
                questionItem={questionItem}
              >
                <DocumentAnswerList
                  repoId={selectedDocument!.repoId}
                  documentId={selectedDocument!.id}
                  questionItem={questionItem}
                />
              </DocumentQuestionItem>
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
      <EmptyList type={EEmptyList.QUESTION_LIST} />
    </div>
  );
};

export default DocumentQuestionList;
