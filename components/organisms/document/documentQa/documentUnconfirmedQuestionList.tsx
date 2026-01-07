import React from "react";
import EmptyList, { EEmptyList } from "@components/molecules/emptyList";
import LoadMore from "@components/molecules/loadMore";
import RenderIf from "@components/atoms/renderIf";
import { Spinner } from "@components/atoms/spinner";
import { useDocumentStore } from "@store/document";
import useGetQuestionListByAdmin from "@hooks/questionAnswer/useGetQuestionListByAdmin";
import DocumentUnconfirmedQuestionItem from "./documentUnconfirmedQuestionItem";
import Error from "@components/organisms/error";

const DocumentUnconfirmedQuestionList = () => {
  const { selectedDocument } = useDocumentStore();

  const {
    data: questionListByAdmin,
    isLoading: adminListIsLoading,
    error: adminListError,
    refetch: adminListRefetch,
    hasNextPage: adminListHasNextPage,
    isFetchingNextPage: adminListIsFetchingNextPage,
    fetchNextPage: adminListFetchNextPage,
  } = useGetQuestionListByAdmin(selectedDocument!.repoId, selectedDocument!.id, false, 10, true);

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
